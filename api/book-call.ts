import { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import {
  createGoogleCalendarBooking,
  isGoogleCalendarConfigured,
} from "../src/lib/googleCalendar.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "morufbadebola@gmail.com";
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const MEETING_LINK =
  process.env.BOOKING_MEETING_LINK || "https://meet.google.com/";
const CRM_WEBHOOK_URL =
  process.env.CRM_WEBHOOK_URL ||
  process.env.N8N_LEAD_WEBHOOK_URL ||
  process.env.N8N_WEBHOOK_URL ||
  "";

interface BookCallFormData {
  name: string;
  email: string;
  projectType: string;
  description: string;
  phone?: string;
  meetingDate: string;
  meetingTime: string;
  timezone?: string;
}

const formatMeetingDateTime = (meetingDate: string, meetingTime: string) => {
  if (!meetingDate || !meetingTime) {
    return "Not provided";
  }

  const date = new Date(`${meetingDate}T00:00:00`);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return `${formattedDate} at ${meetingTime}`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      projectType,
      description,
      phone,
      meetingDate,
      meetingTime,
      timezone,
    }: BookCallFormData = req.body;

    if (
      !name ||
      !email ||
      !projectType ||
      !phone ||
      !meetingDate ||
      !meetingTime
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const selectedSlot = formatMeetingDateTime(meetingDate, meetingTime);
    const timezoneLabel = timezone || "Africa/Lagos";
    const googleCalendarEnabled = isGoogleCalendarConfigured();

    const calendarBooking = googleCalendarEnabled
      ? await createGoogleCalendarBooking({
          customerEmail: email,
          customerName: name,
          description,
          meetingDate,
          meetingTime,
          projectType,
          timezone: timezoneLabel,
        })
      : null;

    const finalMeetingLink = calendarBooking?.meetingLink || MEETING_LINK;

    let crmSync = {
      attempted: false,
      success: false,
      error: "",
    };

    if (CRM_WEBHOOK_URL) {
      crmSync.attempted = true;
      try {
        const webhookResponse = await fetch(CRM_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "lead.booked",
            lead: {
              name,
              email,
              phone,
              projectType,
              description: description || "Not provided",
              source: "book_call_form",
              status: "booked",
              meetingDate,
              meetingTime,
              timezone: timezoneLabel,
              meetingLink: finalMeetingLink,
              createdAt: new Date().toISOString(),
            },
          }),
        });

        if (!webhookResponse.ok) {
          throw new Error(`Webhook failed with status ${webhookResponse.status}`);
        }

        crmSync.success = true;
      } catch (webhookError) {
        crmSync.error =
          webhookError instanceof Error
            ? webhookError.message
            : "Unknown webhook error";
        console.error("Book-call CRM webhook error:", crmSync.error);
      }
    }

    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New Call Booking: ${name}`,
      html: `
        <h2>New Call Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Selected Slot:</strong> ${selectedSlot}</p>
        <p><strong>Timezone:</strong> ${timezoneLabel}</p>
        <p><strong>Meeting Link:</strong> <a href="${finalMeetingLink}">${finalMeetingLink}</a></p>
        <p><strong>Description:</strong> ${description || "Not provided"}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    let clientConfirmationWarning = "";

    try {
      await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: email,
        subject: "Your discovery call is booked",
        html: `
          <h2>Thanks, ${name}!</h2>
          <p>Your discovery call has been booked successfully.</p>
          <p><strong>Date and time:</strong> ${selectedSlot}</p>
          <p><strong>Timezone:</strong> ${timezoneLabel}</p>
          <p><strong>Meeting link:</strong> <a href="${finalMeetingLink}">${finalMeetingLink}</a></p>
          <h3>What happens next:</h3>
          <ol>
            <li>Keep this email for your selected slot.</li>
            <li>Use the meeting link above at the scheduled time.</li>
            <li>If you need to update anything, reply to this email.</li>
          </ol>
          <p>Looking forward to speaking with you.</p>
          <p>Moruf</p>
        `,
      });
    } catch (clientEmailError) {
      clientConfirmationWarning =
        clientEmailError instanceof Error
          ? clientEmailError.message
          : "Client confirmation email could not be sent.";

      console.error(
        "Client confirmation email error:",
        clientConfirmationWarning,
      );

      if (!googleCalendarEnabled) {
        throw new Error(
          "Booking was saved, but the client confirmation email could not be sent. Add a verified RESEND_FROM_EMAIL in Vercel and redeploy.",
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Booking received successfully",
      googleCalendarEnabled,
      crmSync,
      clientConfirmationWarning,
    });
  } catch (error) {
    console.error("Error sending booking email:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to process booking",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
