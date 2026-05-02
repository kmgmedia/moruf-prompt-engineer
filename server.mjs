import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import { Resend } from "resend";
import { google } from "googleapis";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  return next();
});

dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "morufbadebola@gmail.com";
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const MEETING_LINK =
  process.env.BOOKING_MEETING_LINK || "https://meet.google.com/";
const DEFAULT_BOOKING_DURATION_MINUTES = 30;

const formatMeetingDateTime = (meetingDate, meetingTime) => {
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

const isGoogleCalendarConfigured = () =>
  Boolean(
    process.env.GOOGLE_CALENDAR_CLIENT_ID &&
      process.env.GOOGLE_CALENDAR_CLIENT_SECRET &&
      process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  );

const getOAuthClient = () => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  );
  auth.setCredentials({
    refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  });
  return auth;
};

const getCalendarClient = () =>
  google.calendar({ version: "v3", auth: getOAuthClient() });

const getCalendarId = () => process.env.GOOGLE_CALENDAR_ID || "primary";

const getBookingDurationMinutes = () => {
  const value = Number(process.env.BOOKING_DURATION_MINUTES || "30");
  return Number.isFinite(value) && value > 0
    ? value
    : DEFAULT_BOOKING_DURATION_MINUTES;
};

const getTimezoneOffsetMinutes = (timezone) => {
  if (timezone === "Africa/Johannesburg") {
    return 120;
  }
  return 60;
};

const buildEndDateTimeLocal = (meetingDate, meetingTime, durationMinutes) => {
  const [hours, minutes] = meetingTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const endMinutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${meetingDate}T${endHours}:${endMinutes}:00`;
};

const toOffsetIsoString = (dateTimeLocal, timezone) => {
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

const createGoogleCalendarBooking = async ({
  customerEmail,
  customerName,
  description,
  meetingDate,
  meetingTime,
  projectType,
  timezone,
}) => {
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();
  const durationMinutes = getBookingDurationMinutes();
  const startDateTime = `${meetingDate}T${meetingTime}:00`;
  const endDateTime = buildEndDateTimeLocal(
    meetingDate,
    meetingTime,
    durationMinutes,
  );
  const timeMin = toOffsetIsoString(startDateTime, timezone);
  const timeMax = toOffsetIsoString(endDateTime, timezone);

  const events = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime",
  });

  if ((events.data.items || []).length > 0) {
    throw new Error("This time slot is no longer available. Please pick another one.");
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
        `Client: ${customerName}`,
        `Email: ${customerEmail}`,
        `Project type: ${projectType}`,
        `Project notes: ${description || "Not provided"}`,
      ].join("\n"),
      start: {
        dateTime: startDateTime,
        timeZone: timezone,
      },
      end: {
        dateTime: endDateTime,
        timeZone: timezone,
      },
      attendees: [{ email: customerEmail }],
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
  };
};

app.post("/api/chatbot-response", async (req, res) => {
  try {
    const { message, systemPrompt, conversationHistory } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const messages = [];

    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }

    if (Array.isArray(conversationHistory)) {
      messages.push(...conversationHistory);
    }

    messages.push({ role: "user", content: message });

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const botResponse =
      response.choices[0]?.message?.content ||
      "I couldn't generate a response.";

    return res.status(200).json({
      success: true,
      response: botResponse,
      usage: {
        promptTokens: response.usage?.prompt_tokens,
        completionTokens: response.usage?.completion_tokens,
        totalTokens: response.usage?.total_tokens,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("OpenAI API error:", error.message);
    } else {
      console.error("OpenAI API error: Unknown error");
    }
    return res.status(500).json({
      error: "Failed to generate response",
      success: false,
    });
  }
});

app.post("/api/lead", async (req, res) => {
  try {
    const { name, email, projectType, description, intent, messages } =
      req.body || {};

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "Missing required fields (name, email)" });
    }

    const intentLabel =
      {
        client: "Potential Client",
        recruiter: "Recruiter/Hiring Manager",
        browsing: "Portfolio Browser",
      }[intent] || "Unknown";

    const projectTypeLabel =
      {
        automation: "Automation System",
        api_integration: "API Integration",
        web_app: "Web Application",
        web_system: "Web System",
        recruiting: "Job/Recruiting",
        not_sure: "Not Sure Yet",
      }[projectType] || projectType;

    const conversationHistory = messages
      ? messages
          .map((msg) => `${String(msg.role).toUpperCase()}: ${msg.text}`)
          .join("\n\n")
      : "No conversation history";

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: NOTIFY_EMAIL,
      subject: `New Lead: ${name} (${intentLabel})`,
      html: `
        <h2 style="color: #000;">New Chatbot Lead</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Lead Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Intent:</strong> ${intentLabel}</p>
          <p><strong>Project Type:</strong> ${projectTypeLabel}</p>
          <p><strong>Description:</strong> ${description || "Not provided"}</p>
          <p><strong>Source:</strong> Chatbot</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Conversation History</h3>
          <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; font-size: 12px;">
${conversationHistory}
          </pre>
        </div>
      `,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <h2>Hey ${name}</h2>
        <p>I've received your information and I'm already thinking about your project.</p>
        <h3>What happens next:</h3>
        <ol>
          <li>I'll review our chat and your project details</li>
          <li>I'll send you a calendar link to book a 20-30 min discovery call</li>
          <li>During our call, we'll explore your vision and map out the best solution</li>
        </ol>
        <p><strong>If this is urgent,</strong> feel free to reach out directly at <a href="mailto:${NOTIFY_EMAIL}">${NOTIFY_EMAIL}</a></p>
        <p style="margin-top: 30px; color: #666;">Looking forward to connecting!<br/><strong>Moruf</strong></p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Lead captured successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error processing lead:", error.message);
    } else {
      console.error("Error processing lead: Unknown error");
    }
    return res.status(500).json({
      error: "Failed to process lead",
      success: false,
    });
  }
});

app.post("/api/book-call", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      description,
      meetingDate,
      meetingTime,
      timezone,
    } = req.body || {};

    if (!name || !email || !phone || !projectType || !meetingDate || !meetingTime) {
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
          "Booking was saved, but the client confirmation email could not be sent. Add a verified RESEND_FROM_EMAIL and try again.",
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Submission received successfully",
      googleCalendarEnabled,
      clientConfirmationWarning,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending email:", error.message);
    } else {
      console.error("Error sending email: Unknown error");
    }
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to process submission",
      success: false,
    });
  }
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
