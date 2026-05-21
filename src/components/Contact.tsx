import { FormEvent, useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";

const CONTACT_EMAIL = "morufbadebola@gmail.com";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const apiUrl = apiBase ? `${apiBase}/api/lead` : "/api/lead";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          projectType: "not_sure",
          description: workflow,
          intent: "client",
          source: "contact_form",
          status: "new_lead",
          messages: [
            {
              role: "user",
              text: workflow,
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to send your inquiry.");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setWorkflow("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to send your inquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-border/40 bg-gradient-to-b from-background to-muted/30 px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="min-w-0 space-y-7 pt-4 animate-fade-in sm:space-y-8 lg:pt-6">
            <div className="space-y-4 sm:space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary sm:tracking-[0.35em]">
                Contact
              </p>
              <div className="space-y-3">
                <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                  Ready to build{" "}
                  <span className="block italic text-primary">
                    smarter AI systems?
                  </span>
                </h2>
                <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base md:text-lg md:leading-8">
                  Tell me what you want to automate, improve, or launch. I will
                  help you shape the right AI workflow, chatbot, dashboard, API
                  integration, or full-stack system for the job.
                </p>
              </div>
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex max-w-full items-center gap-3 break-all font-mono text-xs text-primary transition-colors hover:text-primary/80 sm:text-sm"
            >
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>

            <div className="flex gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/moruf-adebola/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card/40 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                X
              </a>
              <a
                href="https://github.com/kmgmedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-[570px] rounded-xl border border-border/80 bg-card/70 p-5 shadow-2xl shadow-black/25 backdrop-blur sm:p-6 md:min-h-[575px] md:p-10 lg:p-11"
          >
            <div className="flex h-full flex-col justify-center space-y-5 sm:space-y-6 md:space-y-7">
              <label className="block space-y-3 pt-2 sm:pt-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.3em]">
                  Your Name
                </span>
                <input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                    setSubmitted(false);
                  }}
                  required
                  placeholder="Jane Smith"
                  className="h-12 w-full rounded-lg border border-border bg-background/35 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-primary focus:bg-background/50 sm:h-[54px]"
                />
              </label>

              <label className="block space-y-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.3em]">
                  Email Address
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                    setSubmitted(false);
                  }}
                  required
                  placeholder="jane@company.com"
                  className="h-12 w-full rounded-lg border border-border bg-background/35 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-primary focus:bg-background/50 sm:h-[54px]"
                />
              </label>

              <label className="block space-y-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.3em]">
                  Tell Me About Your Project
                </span>
                <textarea
                  value={workflow}
                  onChange={(event) => {
                    setWorkflow(event.target.value);
                    setError("");
                    setSubmitted(false);
                  }}
                  required
                  rows={5}
                  placeholder="I need an AI chatbot, workflow automation, dashboard, API integration, or web system that helps us..."
                  className="min-h-[124px] w-full resize-none rounded-lg border border-border bg-background/35 px-4 py-4 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-primary focus:bg-background/50 sm:min-h-[132px]"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-glow sm:mt-3 sm:h-[54px] sm:px-5 sm:text-xs sm:tracking-[0.2em]"
              >
                {loading ? "Sending..." : "Send My Inquiry"}
                <Send className="h-4 w-4" />
              </button>

              {submitted && (
                <p className="text-sm font-medium text-primary">
                  Your inquiry has been sent. I will get back to you soon.
                </p>
              )}

              {error && (
                <p className="text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
