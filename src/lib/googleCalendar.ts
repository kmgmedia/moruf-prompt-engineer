import { google } from "googleapis";

const DEFAULT_BOOKING_DURATION_MINUTES = 30;

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
  createdStart?: string;
  createdTimeZone?: string;
  createdMatchesRequested?: boolean;
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

const toInstantMs = (dateTimeLocal: string, timezone: string) => {
  const isoWithOffset = toOffsetIsoString(dateTimeLocal, timezone);
  const parsed = Date.parse(isoWithOffset);

  if (Number.isNaN(parsed)) {
    throw new Error(`Unable to parse date/time value: ${isoWithOffset}`);
  }

  return parsed;
};

export const isGoogleCalendarConfigured = () =>
  Boolean(
    process.env.GOOGLE_CALENDAR_CLIENT_ID &&
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET &&
    process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  );

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const extractMeetLink = (data: { hangoutLink?: string | null; conferenceData?: { entryPoints?: Array<{ entryPointType?: string | null; uri?: string | null }> | null } | null }) =>
  data.hangoutLink ||
  data.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri ||
  null;

export const createGoogleCalendarBooking = async (
  input: CalendarBookingInput,
): Promise<CalendarBookingResult> => {
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

  let meetingLink = extractMeetLink(event.data);

  if (!meetingLink) {
    const statusCode = event.data.conferenceData?.createRequest?.status?.statusCode;
    if (statusCode === "pending") {
      await sleep(2500);
      const refreshed = await calendar.events.get({ calendarId, eventId: event.data.id! });
      meetingLink = extractMeetLink(refreshed.data);
    }
    if (!meetingLink) {
      console.warn("Google Meet link not available after creation", {
        statusCode,
        hangoutLink: event.data.hangoutLink,
        conferenceData: event.data.conferenceData,
        htmlLink: event.data.htmlLink,
      });
    }
  }

  if (!event.data.id || !event.data.htmlLink) {
    throw new Error(
      "Google Calendar booking failed: missing event ID or HTML link.",
    );
  }

  const createdStart = event.data.start?.dateTime || "";
  const createdTimeZone = event.data.start?.timeZone || "";
  const requestedLocal = `${input.meetingDate}T${input.meetingTime}:00`;

  const createdMatchesRequested =
    Boolean(createdStart) &&
    createdTimeZone === input.timezone &&
    toInstantMs(requestedLocal, input.timezone) === Date.parse(createdStart);

  if (!createdMatchesRequested) {
    console.warn("Google Calendar event time mismatch", {
      requestedLocal,
      requestedTimezone: input.timezone,
      createdStart,
      createdTimeZone,
    });
  }

  return {
    eventId: event.data.id,
    htmlLink: event.data.htmlLink,
    meetingLink: meetingLink || event.data.htmlLink || "",
    startIso: timeMin,
    endIso: timeMax,
    createdStart: createdStart || undefined,
    createdTimeZone: createdTimeZone || undefined,
    createdMatchesRequested,
  };
};
