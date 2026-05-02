import { google } from "googleapis";

const DEFAULT_BOOKING_DURATION_MINUTES = 30;
let googleCalendarUnavailable = false;

export interface CalendarBookingInput {
  customerEmail: string;
  customerName: string;
  description?: string;
  meetingDate: string;
  meetingTime: string;
  projectType: string;
  timezone: string;
}

export interface CalendarBookingResult {
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

export const isGoogleCalendarConfigured = () =>
  !googleCalendarUnavailable &&
  Boolean(
    process.env.GOOGLE_CALENDAR_CLIENT_ID &&
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET &&
    process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  );

export const createGoogleCalendarBooking = async (
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
