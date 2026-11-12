import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe,
  Loader2,
  Mail,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import avatar from "@/assets/about-moruf.jpeg";
import {
  BOOKING_TIMEZONE_OPTIONS,
  TIME_SLOTS,
  buildCalendarDays,
  getMonthLabel,
  getTodayDateString,
  isWeekday,
} from "@/lib/booking";

const PROJECT_TYPES = [
  { value: "chatbot", label: "AI Chatbot / Assistant" },
  { value: "automation", label: "Automation / Workflow" },
  { value: "integration", label: "API Integration" },
  { value: "dashboard", label: "Dashboard / Data" },
  { value: "webapp", label: "Web Application" },
  { value: "other", label: "Other" },
] as const;

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg bg-background border border-border text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition";

const formatShortDate = (dateString: string) =>
  dateString
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(new Date(`${dateString}T00:00:00`))
    : "";

const formatLongDate = (dateString: string) =>
  dateString
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(`${dateString}T00:00:00`))
    : "";

const emptyForm = (timezone: string) => ({
  name: "",
  email: "",
  phone: "",
  projectType: "",
  description: "",
  meetingDate: "",
  meetingTime: "",
  timezone,
});

const BookACall = () => {
  const navigate = useNavigate();
  const browserTimezone =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "Africa/Lagos";
  const initialTimezone = BOOKING_TIMEZONE_OPTIONS.some(
    (option) => option.value === browserTimezone,
  )
    ? browserTimezone
    : "Africa/Lagos";

  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [formData, setFormData] = useState(() => emptyForm(initialTimezone));

  const calendarDays = useMemo(
    () => buildCalendarDays(visibleMonth),
    [visibleMonth],
  );

  const currentMonthStart = useMemo(() => {
    const today = new Date(`${getTodayDateString()}T00:00:00`);
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, []);
  const canGoBack = visibleMonth > currentMonthStart;
  const canGoForward = useMemo(
    () =>
      buildCalendarDays(
        new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1),
      ).some((d) => d.isSelectable),
    [visibleMonth],
  );

  const fetchAvailability = async (date: string, timezone: string) => {
    setAvailabilityLoading(true);
    setBookedSlots([]);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const apiUrl = apiBase
        ? `${apiBase}/api/availability`
        : "/api/availability";
      const response = await fetch(
        `${apiUrl}?date=${date}&timezone=${encodeURIComponent(timezone)}`,
      );
      if (response.ok) {
        const data = await response.json();
        setBookedSlots(data.bookedSlots || []);
      }
    } catch {
      // fail silently — all slots remain selectable
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const updateField = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleTimezoneChange = (timezone: string) => {
    setFormData((prev) => ({ ...prev, timezone, meetingTime: "" }));
    if (formData.meetingDate) fetchAvailability(formData.meetingDate, timezone);
  };

  const handleDateSelect = (meetingDate: string) => {
    if (!isWeekday(meetingDate)) return;
    setFormData((prev) => ({ ...prev, meetingDate, meetingTime: "" }));
    setError("");
    fetchAvailability(meetingDate, formData.timezone);
  };

  const handleMonthChange = (direction: -1 | 1) => {
    setVisibleMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + direction);
      return new Date(next.getFullYear(), next.getMonth(), 1);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.projectType
    ) {
      setError("Please fill in your name, email, phone and what you need.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.meetingDate || !formData.meetingTime) {
      setStep(1);
      setError("Please choose a date and time.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const apiUrl = apiBase ? `${apiBase}/api/book-call` : "/api/book-call";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit form");
      }

      const link: string =
        data?.meetingLink || data?.calendarBooking?.meetingLink || "";
      setMeetingLink(
        /^https:\/\/meet\.google\.com\/[a-z0-9-]+/i.test(link) ? link : "",
      );
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBookAnother = () => {
    setSubmitted(false);
    setMeetingLink("");
    setBookedSlots([]);
    setStep(1);
    setFormData(emptyForm(initialTimezone));
  };

  const timezoneLabel =
    BOOKING_TIMEZONE_OPTIONS.find((o) => o.value === formData.timezone)
      ?.label ?? formData.timezone;

  const helmet = (
    <Helmet>
      <title>Book a Call | Moruf Adebola</title>
      <meta
        name="description"
        content="Schedule a free discovery call with Moruf Adebola to discuss AI automation, chatbot development, or intelligent workflow systems for your business."
      />
      <link rel="canonical" href="https://www.morufstackdev.com.ng/book-call" />
      <meta property="og:url" content="https://www.morufstackdev.com.ng/book-call" />
      <meta property="og:title" content="Book a Call | Moruf Adebola" />
      <meta
        property="og:description"
        content="Schedule a free discovery call with Moruf Adebola to discuss AI automation, chatbot development, or intelligent workflow systems for your business."
      />
    </Helmet>
  );

  if (submitted) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        {helmet}
        <AnimatedBackground opacity={0.4} subtle={true} />
        <div className="container mx-auto px-4 py-16 max-w-lg relative z-10">
          <div className="rounded-2xl border border-border bg-card/90 backdrop-blur p-6 sm:p-8 text-center animate-fade-in">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-7 w-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">You're booked!</h1>
            <p className="mt-2 text-muted-foreground">
              Looking forward to speaking with you, {formData.name.split(" ")[0]}.
            </p>

            <div className="mt-6 space-y-3 rounded-xl border border-border bg-background/60 p-4 text-left text-sm">
              <p className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                {formatLongDate(formData.meetingDate)}
              </p>
              <p className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 shrink-0 text-primary" />
                {formData.meetingTime} · 30 min · {timezoneLabel}
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span className="break-all">
                  Details sent to {formData.email}
                </span>
              </p>
            </div>

            {meetingLink ? (
              <Button
                asChild
                className="mt-6 w-full bg-primary hover:bg-primary/90 shadow-glow"
              >
                <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                  <Video className="mr-2 h-4 w-4" />
                  Open Google Meet link
                </a>
              </Button>
            ) : (
              <p className="mt-6 text-sm text-muted-foreground">
                Your Google Meet link is in your email.
              </p>
            )}

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to home
              </Button>
              <Button variant="ghost" onClick={handleBookAnother}>
                Book another
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {helmet}
      <AnimatedBackground opacity={0.4} subtle={true} />
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-5xl relative z-10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </button>

        <div className="grid overflow-hidden rounded-2xl border border-border bg-card/90 backdrop-blur animate-fade-in lg:grid-cols-[300px_1fr]">
          {/* Call info */}
          <aside className="border-b border-border p-6 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3 lg:block">
              <img
                src={avatar}
                alt="Moruf Adebola"
                className="h-12 w-12 rounded-full object-cover lg:h-14 lg:w-14"
              />
              <div className="lg:mt-4">
                <p className="text-sm text-muted-foreground">Moruf Adebola</p>
                <h1 className="text-xl font-bold leading-tight">
                  Discovery call
                </h1>
              </div>
            </div>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 shrink-0" />
                30 minutes · Free
              </li>
              <li className="flex items-center gap-3">
                <Video className="h-4 w-4 shrink-0" />
                Google Meet, link sent by email
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0" />
                <div className="relative">
                  <select
                    aria-label="Timezone"
                    value={formData.timezone}
                    onChange={(e) => handleTimezoneChange(e.target.value)}
                    className="appearance-none rounded-md border border-border bg-background py-1 pl-2.5 pr-8 text-foreground hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {BOOKING_TIMEZONE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
                  />
                </div>
              </li>
            </ul>

            <p className="mt-5 hidden text-sm leading-relaxed text-muted-foreground lg:block">
              A short chat about your business, the problem you want to solve,
              and how AI or automation could help. No pressure, no sales pitch.
            </p>

            {formData.meetingDate && formData.meetingTime && (
              <div className="mt-5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2.5 text-sm">
                <p className="font-medium text-foreground">
                  {formatShortDate(formData.meetingDate)} · {formData.meetingTime}
                </p>
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-0.5 text-xs text-primary hover:underline"
                  >
                    Change time
                  </button>
                )}
              </div>
            )}
          </aside>

          {/* Steps */}
          <section className="p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Step {step} of 2
            </p>

            {step === 1 ? (
              <>
                <h2 className="mt-1 text-lg font-semibold">
                  Pick a date & time
                </h2>

                <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_180px]">
                  {/* Calendar */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {getMonthLabel(visibleMonth)}
                      </p>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleMonthChange(-1)}
                          disabled={!canGoBack}
                          aria-label="Previous month"
                          className="rounded-md p-1.5 hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMonthChange(1)}
                          disabled={!canGoForward}
                          aria-label="Next month"
                          className="rounded-md p-1.5 hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase text-muted-foreground">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <span key={i} className="py-1">
                          {day}
                        </span>
                      ))}
                    </div>
                    <div className="mt-1 grid grid-cols-7 gap-1">
                      {calendarDays.map((day) => {
                        const selected =
                          formData.meetingDate === day.dateString;
                        if (!day.inCurrentMonth) {
                          return <span key={day.dateString} />;
                        }
                        return (
                          <button
                            key={day.dateString}
                            type="button"
                            disabled={!day.isSelectable}
                            onClick={() => handleDateSelect(day.dateString)}
                            aria-pressed={selected}
                            className={`aspect-square rounded-full text-sm transition-colors ${
                              selected
                                ? "bg-primary font-semibold text-primary-foreground"
                                : day.isSelectable
                                  ? "bg-primary/10 font-medium text-primary hover:bg-primary/20"
                                  : "text-muted-foreground/40"
                            }`}
                          >
                            {day.dayNumber}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <p className="mb-3 text-sm font-medium">
                      {formData.meetingDate
                        ? formatShortDate(formData.meetingDate)
                        : "Available times"}
                    </p>
                    {!formData.meetingDate ? (
                      <p className="text-sm text-muted-foreground">
                        Select a highlighted day to see times.
                      </p>
                    ) : availabilityLoading ? (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Checking availability…
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
                        {TIME_SLOTS.filter(
                          (slot) => !bookedSlots.includes(slot),
                        ).map((slot) => {
                          const selected = formData.meetingTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => updateField("meetingTime", slot)}
                              aria-pressed={selected}
                              className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-primary/30 text-primary hover:border-primary hover:bg-primary/10"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                        {TIME_SLOTS.every((slot) =>
                          bookedSlots.includes(slot),
                        ) && (
                          <p className="col-span-full text-sm text-muted-foreground">
                            Fully booked. Please pick another day.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <p className="mt-5 text-sm text-red-500">{error}</p>
                )}

                <div className="mt-8 flex justify-end">
                  <Button
                    type="button"
                    disabled={!formData.meetingDate || !formData.meetingTime}
                    onClick={() => {
                      setError("");
                      setStep(2);
                    }}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                  >
                    Continue
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="mt-1 text-lg font-semibold">Your details</h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">
                      Full name
                    </span>
                    <input
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Jane Doe"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">
                      Email
                    </span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="jane@company.com"
                      className={inputClass}
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-sm font-medium">
                      Phone / WhatsApp
                    </span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+234 801 234 5678"
                      className={inputClass}
                    />
                  </label>
                </div>

                <fieldset className="mt-5">
                  <legend className="mb-2 text-sm font-medium">
                    What do you need help with?
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => {
                      const selected = formData.projectType === type.value;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateField("projectType", type.value)}
                          aria-pressed={selected}
                          className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <label className="mt-5 block">
                  <span className="mb-1.5 block text-sm font-medium">
                    Anything I should know?{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </span>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Your current process, the challenge, and what you'd like to achieve."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </label>

                {error && (
                  <p className="mt-4 text-sm text-red-500">{error}</p>
                )}

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(1)}
                    disabled={loading}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 shadow-glow"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Booking…
                      </>
                    ) : (
                      "Confirm booking"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </section>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          You'll get a Google Meet link by email right after booking.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default BookACall;
