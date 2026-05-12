export const DEFAULT_NOTIFY_EMAIL = "morufbadebola@gmail.com";

export const BOOKING_TIMEZONE_OPTIONS = [
  { value: "Africa/Lagos", label: "Africa/Lagos (WAT)" },
  { value: "Africa/Johannesburg", label: "Africa/Johannesburg (SAST)" },
] as const;

export const BOOKING_WINDOW_DAYS = 30;

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

export const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getMaxDateString = () => {
  const now = new Date();
  now.setDate(now.getDate() + BOOKING_WINDOW_DAYS);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isWeekday = (dateString: string) => {
  if (!dateString) {
    return false;
  }

  const selected = new Date(`${dateString}T00:00:00`);
  const day = selected.getDay();
  return day >= 1 && day <= 5;
};

export const formatSelectedDate = (dateString: string) => {
  if (!dateString) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
};

export const formatMeetingDateTime = (
  meetingDate: string,
  meetingTime: string,
): string => {
  if (!meetingDate || !meetingTime) {
    return "Not provided";
  }

  return `${formatSelectedDate(meetingDate)} at ${meetingTime}`;
};

export const getMonthLabel = (monthDate: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(monthDate);

export interface CalendarDay {
  dateString: string;
  dayNumber: number;
  inCurrentMonth: boolean;
  isSelectable: boolean;
}

export const buildCalendarDays = (monthDate: Date): CalendarDay[] => {
  const firstOfMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth(),
    1,
  );
  const startDay = firstOfMonth.getDay();
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - startDay);

  const today = new Date(`${getTodayDateString()}T00:00:00`);
  const maxDate = new Date(`${getMaxDateString()}T00:00:00`);
  const days: CalendarDay[] = [];

  for (let index = 0; index < 42; index += 1) {
    const current = new Date(gridStart);
    current.setDate(gridStart.getDate() + index);

    const dateString = `${current.getFullYear()}-${String(
      current.getMonth() + 1,
    ).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;
    const inCurrentMonth = current.getMonth() === monthDate.getMonth();
    const isWithinRange = current >= today && current <= maxDate;
    const selectable = inCurrentMonth && isWithinRange && isWeekday(dateString);

    days.push({
      dateString,
      dayNumber: current.getDate(),
      inCurrentMonth,
      isSelectable: selectable,
    });
  }

  return days;
};
