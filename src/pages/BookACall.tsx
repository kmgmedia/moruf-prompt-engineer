import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MessageSquare,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import {
  BOOKING_TIMEZONE_OPTIONS,
  TIME_SLOTS,
  buildCalendarDays,
  formatSelectedDate,
  getMonthLabel,
  isWeekday,
} from "@/lib/booking";

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

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    meetingDate: "",
    meetingTime: "",
    timezone: initialTimezone,
  });

  const calendarRef = useRef<HTMLDivElement>(null);
  const selectedDateLabel = useMemo(
    () => formatSelectedDate(formData.meetingDate),
    [formData.meetingDate],
  );
  const calendarDays = useMemo(
    () => buildCalendarDays(visibleMonth),
    [visibleMonth],
  );

  useEffect(() => {
    if (!isCalendarOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isCalendarOpen]);

  const fetchAvailability = async (date: string, timezone: string) => {
    setAvailabilityLoading(true);
    setBookedSlots([]);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const apiUrl = apiBase ? `${apiBase}/api/availability` : "/api/availability";
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    if (name === "timezone" && formData.meetingDate) {
      fetchAvailability(formData.meetingDate, value);
    }
  };

  const handleDateSelect = (meetingDate: string) => {
    if (!isWeekday(meetingDate)) {
      setError("Please choose a weekday between Monday and Friday.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      meetingDate,
      meetingTime: "",
    }));
    setError("");
    setIsCalendarOpen(false);
    fetchAvailability(meetingDate, formData.timezone);
  };

  const handleTimeSelect = (meetingTime: string) => {
    setFormData((prev) => ({
      ...prev,
      meetingTime,
    }));
    setError("");
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
      !formData.projectType ||
      !formData.meetingDate ||
      !formData.meetingTime
    ) {
      setError("Please fill in all required fields and choose a date and time.");
      return;
    }

    if (!isWeekday(formData.meetingDate)) {
      setError("Please choose a weekday between Monday and Friday.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const apiUrl = apiBase ? `${apiBase}/api/book-call` : "/api/book-call";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to submit form");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    setBookedSlots([]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      description: "",
      meetingDate: "",
      meetingTime: "",
      timezone: initialTimezone,
    });
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <AnimatedBackground opacity={0.6} subtle={true} />
        <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8 animate-fade-in">
            <div className="rounded-full bg-primary/10 border border-primary/20 p-6">
              <Check className="w-16 h-16 text-primary" />
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                You are booked.{" "}
                <span className="text-primary">Check your email</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your selected call slot has been received, and the meeting link
                has been sent to your email.
              </p>
            </div>

            <Card className="p-8 md:p-10 bg-primary/5 border-primary/20 max-w-2xl">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Your selected slot:</strong>
                </p>
                <p className="text-foreground">
                  {selectedDateLabel} at {formData.meetingTime} ({formData.timezone})
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold flex-shrink-0">1.</span>
                    <span>You will receive the meeting link in your email.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold flex-shrink-0">2.</span>
                    <span>Moruf will also get a booking notification with your selected slot.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold flex-shrink-0">3.</span>
                    <span>If anything changes, you can reply to the email and update the booking details.</span>
                  </li>
                </ul>
              </div>
            </Card>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Check your email at <strong>{formData.email}</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                  Back to Home
                </Button>
                <Button
                  onClick={handleSubmitAnother}
                  className="flex-1 bg-primary hover:bg-primary/90 shadow-glow"
                >
                  Submit Another Request
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Helmet>
        <title>Book a Call | Moruf Adebola</title>
        <meta name="description" content="Schedule a free discovery call with Moruf Adebola to discuss AI automation, chatbot development, or intelligent workflow systems for your business." />
        <link rel="canonical" href="https://www.morufdesigndev.com/book-call" />
        <meta property="og:url" content="https://www.morufdesigndev.com/book-call" />
        <meta property="og:title" content="Book a Call | Moruf Adebola" />
        <meta property="og:description" content="Schedule a free discovery call with Moruf Adebola to discuss AI automation, chatbot development, or intelligent workflow systems for your business." />
      </Helmet>
      <AnimatedBackground opacity={0.6} subtle={true} />
      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 hover:text-white hover:bg-primary/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Let's Talk
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Book your
              <span className="text-primary"> discovery call</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose a date and time, share a few project details, and the meeting
              link will be sent straight to your email.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-primary/5 border-primary/20 text-center">
              <div className="flex justify-center mb-4">
                <CalendarDays className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Pick a Slot</h3>
              <p className="text-sm text-muted-foreground">
                Open the calendar card and choose your date
              </p>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20 text-center">
              <div className="flex justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Share Details</h3>
              <p className="text-sm text-muted-foreground">
                Add your project information below
              </p>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20 text-center">
              <div className="flex justify-center mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Get the Link</h3>
              <p className="text-sm text-muted-foreground">
                Receive the meeting link in your email
              </p>
            </Card>
          </div>

          <Card className="p-8 md:p-12 bg-card border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Your Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Your Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 123 456 7890"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative" ref={calendarRef}>
                  <label className="block text-sm font-semibold mb-3">
                    Pick a Date *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left transition-colors hover:border-primary/50"
                  >
                    <span className="flex items-center gap-3">
                      <span className="rounded-lg bg-primary/10 p-2 text-primary">
                        <CalendarDays className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {selectedDateLabel || "Select a weekday"}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          Monday to Friday only
                        </span>
                      </span>
                    </span>
                  </button>

                  {isCalendarOpen && (
                    <Card className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 border-primary/20 bg-card/95 backdrop-blur p-5 shadow-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={() => handleMonthChange(-1)}
                          aria-label="Previous month"
                          className="rounded-lg border border-border p-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <p className="font-semibold">{getMonthLabel(visibleMonth)}</p>
                        <button
                          type="button"
                          onClick={() => handleMonthChange(1)}
                          aria-label="Next month"
                          className="rounded-lg border border-border p-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-wide text-muted-foreground mb-3">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <span key={day}>{day}</span>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day) => {
                          const selected = formData.meetingDate === day.dateString;
                          return (
                            <button
                              key={day.dateString}
                              type="button"
                              disabled={!day.isSelectable}
                              onClick={() => handleDateSelect(day.dateString)}
                              className={`aspect-square rounded-xl text-sm transition-colors ${
                                selected
                                  ? "bg-primary text-primary-foreground"
                                  : day.isSelectable
                                    ? "bg-background border border-border hover:border-primary/50 hover:bg-primary/5"
                                    : day.inCurrentMonth
                                      ? "bg-muted/40 text-muted-foreground/50 cursor-not-allowed"
                                      : "bg-transparent text-muted-foreground/30 cursor-not-allowed"
                              }`}
                            >
                              {day.dayNumber}
                            </button>
                          );
                        })}
                      </div>

                      <p className="text-xs text-muted-foreground mt-4">
                        Available for the next 30 days. Weekdays only.
                      </p>
                    </Card>
                  )}
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-semibold mb-3">Timezone *</label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                  >
                    {BOOKING_TIMEZONE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-2">
                    Available for West and South Africa timezones.
                  </p>
                </div>
              </div>

              {formData.meetingDate && (
                <Card className="p-5 bg-primary/5 border-primary/20">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Clock3 className="w-5 h-5" />
                      <span className="font-semibold">Choose a Time *</span>
                    </div>
                    {availabilityLoading && (
                      <span className="text-xs text-muted-foreground animate-pulse">
                        Checking availability...
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedDateLabel || "Selected date"} in {formData.timezone}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {TIME_SLOTS.map((slot) => {
                      const selected = formData.meetingTime === slot;
                      const isBooked = bookedSlots.includes(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked || availabilityLoading}
                          onClick={() => handleTimeSelect(slot)}
                          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : isBooked
                                ? "border-border bg-muted/40 text-muted-foreground/40 cursor-not-allowed"
                                : availabilityLoading
                                  ? "border-border bg-background opacity-50 cursor-wait"
                                  : "border-border bg-background hover:border-primary/50 hover:bg-primary/5"
                          }`}
                        >
                          <span className={isBooked ? "line-through" : ""}>{slot}</span>
                          {isBooked && (
                            <span className="block text-xs mt-0.5">Booked</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {bookedSlots.length > 0 && !availabilityLoading && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Greyed out slots are already booked. Please choose an available time.
                    </p>
                  )}
                </Card>
              )}

              <div>
                <label htmlFor="projectType" className="block text-sm font-semibold mb-3">
                  What do you need help with? *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="chatbot">AI Chatbot / Assistant</option>
                  <option value="automation">Automation System / Workflow</option>
                  <option value="integration">API Integration / System Connection</option>
                  <option value="dashboard">Dashboard / Data System</option>
                  <option value="webapp">Web Application</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Tell me more about your project
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your current process, challenges, and what you're trying to achieve..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 shadow-glow"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book This Call"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookACall;
