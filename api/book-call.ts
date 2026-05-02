import { VercelRequest, VercelResponse } from "@vercel/node";
import { google } from "googleapis";
import { Resend } from "resend";

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

const DEFAULT_BOOKING_DURATION_MINUTES = 30;
let googleCalendarUnavailable = false;

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

interface CalendarBookingInput {
  customerEmail: string;
  customerName: string;
  description?: string;
  meetingDate: string;
  meetingTime: string;
  projectType: string;
  timezone: string;
}

interface CalendarBookingResult {
  eventId: string;
  htmlLink: string;
  meetingLink: string;
  startIso: string;
  endIso: string;
}

const getOAuthClient = () => {
  const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Google Calendar OAuth environment variables.");
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({ refresh_token: refreshToken });
  return auth;
};

const getCalendarClient = () => {
  const auth = getOAuthClient();
  return google.calendar({ version: "v3", auth });
};

const getCalendarId = () => process.env.GOOGLE_CALENDAR_ID || "primary";

const getBookingDurationMinutes = () => {
  const value = Number(process.env.BOOKING_DURATION_MINUTES || "30");
  return Number.isFinite(value) && value > 0
    ? value
    : DEFAULT_BOOKING_DURATION_MINUTES;
};

const getTimezoneOffsetMinutes = (timezone: string) => {
  if (timezone === "Africa/Johannesburg") {
    return 120;
  }

  return 60;
};

const buildEndDateTimeLocal = (
  meetingDate: string,
  meetingTime: string,
  durationMinutes: number,
) => {
  const [hours, minutes] = meetingTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const endMinutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${meetingDate}T${endHours}:${endMinutes}:00`;
};

const toOffsetIsoString = (dateTimeLocal: string, timezone: string) => {
  const offsetMinutes = getTimezoneOffsetMinutes(timezone);
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60)
    .toString()
    .padStart(2, "0");
  const remainderMinutes = (Math.abs(offsetMinutes) % 60)
    .toString()
    .padStart(2, "0");

  return `${dateTimeLocal}${sign}${offsetHours}:${remainderMinutes}`;
};

const isGoogleCalendarConfigured = () =>
  !googleCalendarUnavailable &&
  Boolean(
    process.env.GOOGLE_CALENDAR_CLIENT_ID &&
      process.env.GOOGLE_CALENDAR_CLIENT_SECRET &&
      process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  );

const createGoogleCalendarBooking = async (
  input: CalendarBookingInput,
): Promise<CalendarBookingResult> => {
  try {
    const calendar = getCalendarClient();
    const calendarId = getCalendarId();
    const durationMinutes = getBookingDurationMinutes();
    const startDateTime = `${input.meetingDate}T${input.meetingTime}:00`;
    const endDateTime = buildEndDateTimeLocal(
      input.meetingDate,
      input.meetingTime,
      durationMinutes,
    );
    const timeMin = toOffsetIsoString(startDateTime, input.timezone);
    const timeMax = toOffsetIsoString(endDateTime, input.timezone);

    const events = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
    });

    if ((events.data.items || []).length > 0) {
      throw new Error(
        "This time slot is no longer available. Please pick another one.",
      );
    }

    const requestId = `booking-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)}`;

    const event = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: {
        summary: "Discovery Call with Moruf Adebola",
        description: [
          "Project discovery call",
          "",
          "Agenda:",
          "- Quick introductions",
          "- Understand project goals",
          "- Review current challenges",
          "- Discuss solution options",
          "- Align on next steps",
          "",
          `Client: ${input.customerName}`,
          `Email: ${input.customerEmail}`,
          `Project type: ${input.projectType}`,
          `Project notes: ${input.description || "Not provided"}`,
        ].join("\n"),
        start: {
          dateTime: startDateTime,
          timeZone: input.timezone,
        },
        end: {
          dateTime: endDateTime,
          timeZone: input.timezone,
        },
        attendees: [{ email: input.customerEmail }],
        conferenceData: {
          createRequest: {
            requestId,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
    });

    const meetingLink =
      event.data.hangoutLink ||
      event.data.conferenceData?.entryPoints?.find(
        (entry) => entry.entryPointType === "video",
      )?.uri ||
      "";

    if (!event.data.id || !event.data.htmlLink || !meetingLink) {
      throw new Error(
        "Google Calendar booking was created, but the meeting link could not be generated.",
      );
    }

    return {
      eventId: event.data.id,
      htmlLink: event.data.htmlLink,
      meetingLink,
      startIso: timeMin,
      endIso: timeMax,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.toLowerCase().includes("invalid_grant")) {
      googleCalendarUnavailable = true;
    }

    throw error;
  }
};

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
    let calendarBooking = null;

    try {
      await loadGoogleCalendarHelpers();
    } catch (loadErr) {
      console.error("Failed to load Google Calendar helpers:", loadErr);
    }

    const googleCalendarEnabled =
      typeof isGoogleCalendarConfigured === "function"
        ? isGoogleCalendarConfigured()
        : false;

    if (googleCalendarEnabled) {
      try {
        calendarBooking = await createGoogleCalendarBooking({
          customerEmail: email,
          customerName: name,
          description,
          meetingDate,
          meetingTime,
          projectType,
          timezone: timezoneLabel,
        });
      } catch (calendarError) {
        console.error(
          "Google Calendar booking error:",
          calendarError instanceof Error
            ? calendarError.message
            : calendarError,
        );
      }
    }

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
          throw new Error(
            `Webhook failed with status ${webhookResponse.status}`,
          );
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
      error:
        error instanceof Error ? error.message : "Failed to process booking",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
