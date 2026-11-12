import type { CapturedData } from "@/lib/chatbot/types";

export const CHAT_BOOK_INTENT_REGEX =
  /\b(book here|book in chat|book via chat|book through chat|take my details|book directly|here in chat|book right here|skip the form|in this chat|chat booking|via this chat|through this chat|prefer chat|prefer to book here|want to book here|can i book here|book a call here|help me(?: to)? book|i want to book|i(?:'d| would)(?: like)? to book|can (?:you )?(?:help me )?book|book a (?:discovery )?call|schedule (?:a )?(?:discovery )?call|set up (?:a )?(?:discovery )?call|let(?:'s| us) (?:book|schedule)|ready to book|book now|start booking|begin booking)\b/i;

export const BOOKING_TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

export type BookingField =
  | "name"
  | "email"
  | "phone"
  | "project_type"
  | "description"
  | "date"
  | "time"
  | "timezone";

export const getNextBookingField = (
  data: CapturedData,
): BookingField | "confirm" => {
  if (!data.name) return "name";
  if (!data.email) return "email";
  if (!data.phone) return "phone";
  if (!data.projectType) return "project_type";
  if (!data.problem) return "description";
  if (!data.timezone) return "timezone";
  if (!data.meetingDate) return "date";
  if (!data.meetingTime) return "time";
  return "confirm";
};

export const getBookingStepPrompt = (
  field: BookingField,
  data: CapturedData,
): string => {
  switch (field) {
    case "name":
      return "Sure! Let me take your booking details right here.\n\nWhat is your full name?";
    case "email":
      return `Nice to meet you, ${data.name}! What is your email address?`;
    case "phone":
      return "What is your phone number? (include country code, e.g. +234...)";
    case "project_type":
      return "What best describes what you need?\n\n1. AI Chatbot / Assistant\n2. Automation System / Workflow\n3. API Integration / System Connection\n4. Dashboard / Data System\n5. Web Application\n6. Other";
    case "description":
      return "Tell me a little about your project: your current process, the challenge, and what you'd like to achieve. (Type 'skip' if we've already covered it.)";
    case "date":
      return "What date works for the call? Pick one below, or type a date like 2026-05-20 (weekdays only, within the next 30 days).";
    case "time":
      return "What time works best? Choose one below (all times are in your selected timezone):";
    case "timezone":
      return "What is your timezone? This helps me show you the correct available time slots.";
  }
};

export const getBookingStepQuickReplies = (
  field: BookingField,
): string[] | null => {
  if (field === "time") return [...BOOKING_TIME_SLOTS];
  if (field === "date") return getUpcomingWeekdayOptions();
  if (field === "description") return ["Skip"];
  if (field === "timezone")
    return ["Africa/Lagos (WAT)", "Africa/Johannesburg (SAST)"];
  return null;
};

const pad = (n: number) => String(n).padStart(2, "0");
const toIsoDate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Next few weekdays (starting tomorrow) as "YYYY-MM-DD (Mon 18 May)" options. */
export const getUpcomingWeekdayOptions = (count = 6): string[] => {
  const options: string[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (options.length < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    const label = d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    options.push(`${toIsoDate(d)} (${label})`);
  }
  return options;
};

export const BOOKING_DESCRIPTION_SKIPPED = "(skipped)";

export interface ValidationResult {
  valid: boolean;
  value?: string;
  error?: string;
}

export const validateBookingInput = (
  field: BookingField,
  input: string,
): ValidationResult => {
  const trimmed = input.trim();

  switch (field) {
    case "name": {
      if (trimmed.length < 2)
        return {
          valid: false,
          error: "Please enter your full name (at least 2 characters).",
        };
      // A question, email, number or long sentence isn't a name.
      if (
        /[?@\d]/.test(trimmed) ||
        trimmed.split(/\s+/).length > 5
      )
        return {
          valid: false,
          error: "Please just type your full name (e.g. Jane Doe).",
        };
      return { valid: true, value: trimmed };
    }

    case "email": {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
        return {
          valid: false,
          error:
            "That doesn't look like a valid email. Please try again (e.g. name@example.com).",
        };
      return { valid: true, value: trimmed.toLowerCase() };
    }

    case "phone": {
      const digits = trimmed.replace(/[\s\-+()]/g, "");
      if (digits.length < 7)
        return { valid: false, error: "Please enter a valid phone number." };
      return { valid: true, value: trimmed };
    }

    case "project_type": {
      const map: Record<string, string> = {
        "1": "chatbot",
        "ai chatbot": "chatbot",
        chatbot: "chatbot",
        assistant: "chatbot",
        "2": "automation",
        automation: "automation",
        workflow: "automation",
        "3": "integration",
        api: "integration",
        "api integration": "integration",
        integration: "integration",
        "4": "dashboard",
        dashboard: "dashboard",
        data: "dashboard",
        "5": "webapp",
        "web app": "webapp",
        "web application": "webapp",
        webapp: "webapp",
        "6": "other",
        other: "other",
      };
      const key = trimmed.toLowerCase().replace(/\s+/g, " ");
      const matched = map[key] ?? map[trimmed.split(".")[0].trim()];
      if (!matched)
        return {
          valid: false,
          error:
            "Please choose a number from 1–6 or describe your project type.",
        };
      return { valid: true, value: matched };
    }

    case "description": {
      if (/^(skip|none|no|n\/a|na|-)$/i.test(trimmed))
        return { valid: true, value: BOOKING_DESCRIPTION_SKIPPED };
      if (trimmed.length < 3)
        return {
          valid: false,
          error: "Please add a short description, or type 'skip'.",
        };
      return { valid: true, value: trimmed };
    }

    case "date": {
      let iso = trimmed.match(/\d{4}-\d{2}-\d{2}/)?.[0];
      if (!iso && /\btomorrow\b/i.test(trimmed)) {
        const t = new Date();
        t.setDate(t.getDate() + 1);
        iso = toIsoDate(t);
      }
      if (!iso)
        return {
          valid: false,
          error:
            "Please pick one of the dates below, or type it like 2026-05-20.",
        };
      const date = new Date(`${iso}T00:00:00`);
      if (isNaN(date.getTime()))
        return {
          valid: false,
          error: "That doesn't look like a valid date. Please try again.",
        };
      const day = date.getDay();
      if (day === 0 || day === 6)
        return {
          valid: false,
          error: "Please choose a weekday (Monday to Friday).",
        };
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 30);
      if (date < today)
        return { valid: false, error: "Please choose a future date." };
      if (date > maxDate)
        return {
          valid: false,
          error: "Please choose a date within the next 30 days.",
        };
      return { valid: true, value: iso };
    }

    case "time": {
      const validSlots = [...BOOKING_TIME_SLOTS] as string[];
      if (!validSlots.includes(trimmed))
        return {
          valid: false,
          error: `Please choose one of the available time slots: ${validSlots.join(", ")}.`,
        };
      return { valid: true, value: trimmed };
    }

    case "timezone": {
      const lower = trimmed.toLowerCase();
      if (
        lower.includes("johannesburg") ||
        lower.includes("sast") ||
        lower.includes("south africa")
      )
        return { valid: true, value: "Africa/Johannesburg" };
      if (
        lower.includes("lagos") ||
        lower.includes("wat") ||
        lower.includes("nigeria") ||
        lower.includes("west africa")
      )
        return { valid: true, value: "Africa/Lagos" };
      return {
        valid: false,
        error:
          "Please choose: Africa/Lagos (WAT) or Africa/Johannesburg (SAST).",
      };
    }
  }
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  chatbot: "AI Chatbot / Assistant",
  automation: "Automation System / Workflow",
  integration: "API Integration / System Connection",
  dashboard: "Dashboard / Data System",
  webapp: "Web Application",
  other: "Other",
};

export const buildBookingSummary = (data: CapturedData): string => {
  return [
    "Here is your booking summary:\n",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Project type: ${PROJECT_TYPE_LABELS[data.projectType ?? ""] ?? data.projectType}`,
    ...(data.problem && data.problem !== BOOKING_DESCRIPTION_SKIPPED
      ? [`Project details: ${data.problem}`]
      : []),
    `Date: ${data.meetingDate}`,
    `Time: ${data.meetingTime}`,
    `Timezone: ${data.timezone}`,
    "\nShall I confirm this booking?",
  ].join("\n");
};

export const BOOKING_FIELD_TO_DATA_KEY: Record<BookingField, keyof CapturedData> = {
  name: "name",
  email: "email",
  phone: "phone",
  project_type: "projectType",
  description: "problem",
  date: "meetingDate",
  time: "meetingTime",
  timezone: "timezone",
};

export interface ChatBookingResult {
  success: boolean;
  meetingLink?: string;
  message: string;
}

export const submitChatBooking = async (
  data: Required<
    Pick<
      CapturedData,
      "name" | "email" | "phone" | "projectType" | "meetingDate" | "meetingTime" | "timezone"
    >
  > & { description?: string },
  apiBase: string,
): Promise<ChatBookingResult> => {
  const apiUrl = apiBase ? `${apiBase}/api/book-call` : "/api/book-call";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      projectType: data.projectType,
      description: data.description ?? "",
      meetingDate: data.meetingDate,
      meetingTime: data.meetingTime,
      timezone: data.timezone,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      (errorData as { error?: string })?.error ?? "Booking failed",
    );
  }

  const result = (await response.json()) as {
    meetingLink?: string;
    calendarBooking?: { meetingLink?: string; htmlLink?: string };
    clientConfirmationWarning?: string;
  };
  const meetingLink =
    result.meetingLink ||
    result.calendarBooking?.meetingLink ||
    result.calendarBooking?.htmlLink ||
    "";

  const lines = [
    "Your discovery call is booked!",
    "",
    `Date: ${data.meetingDate}`,
    `Time: ${data.meetingTime} (${data.timezone})`,
  ];

  if (meetingLink) {
    lines.push(`Meeting link: ${meetingLink}`);
  }

  lines.push(
    "",
    result.clientConfirmationWarning
      ? `I couldn't send the confirmation email to ${data.email}, so please save the link above. I'll follow up with you directly.`
      : `I've also sent the meeting link and details to ${data.email}. Looking forward to speaking with you!`,
  );

  return { success: true, meetingLink, message: lines.join("\n") };
};
