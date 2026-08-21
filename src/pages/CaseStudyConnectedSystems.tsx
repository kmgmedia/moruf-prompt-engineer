import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Network,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { RelatedCaseStudies } from "@/components/RelatedCaseStudies";

const relatedCaseStudies = [
  {
    title: "AI Property Intelligence Assistant",
    description:
      "Connected property listings, vector search, and Gmail into one automated lead-response pipeline.",
    link: "/case-study/property-intelligence-assistant",
  },
  {
    title: "AI Job Intelligence & Resume Automation System",
    description:
      "Tied LinkedIn scraping, GPT scoring, and Google Docs/Sheets into a single hands-off pipeline.",
    link: "/case-study/ai-job-intelligence",
  },
  {
    title: "Byway Backend API System",
    description:
      "A structured REST API layer built for secure, scalable data exchange between services.",
    link: "/case-study/byway-backend-api",
  },
];

const CaseStudyConnectedSystems = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Connected Systems & API Integration | Moruf Adebola</title>
        <meta
          name="description"
          content="Case study: how I connect tools, sync data, and eliminate manual handoffs across systems using APIs, webhooks, and automation pipelines."
        />
        <link
          rel="canonical"
          href="https://www.morufstackdev.com.ng/case-study/connected-systems-integration"
        />
        <meta
          property="og:url"
          content="https://www.morufstackdev.com.ng/case-study/connected-systems-integration"
        />
        <meta
          property="og:title"
          content="Connected Systems & API Integration | Moruf Adebola"
        />
        <meta
          property="og:description"
          content="Case study: how I connect tools, sync data, and eliminate manual handoffs across systems using APIs, webhooks, and automation pipelines."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 hover:text-white hover:bg-primary/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <article className="space-y-8 animate-fade-in">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Network className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Systems Integration
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Connected Systems & API Integration
            </h1>
            <p className="text-xl text-muted-foreground">
              Connecting tools, syncing data, and eliminating manual handoffs
              across the systems a business already runs on
            </p>
          </header>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-6">
            <Card className="p-6 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    The Problem: Tools That Don't Talk to Each Other
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Most businesses aren't short on tools — they're short on
                    connections between them:
                  </p>
                  <ul className="space-y-2 text-foreground/90 ml-4">
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>
                        Data gets copied by hand between spreadsheets, CRMs,
                        and inboxes
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>
                        Updates in one system don't reflect in another until
                        someone notices
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>
                        Every new integration is a one-off script nobody
                        wants to maintain
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 space-y-2 border-l-4 border-destructive/50 pl-4">
                    <p className="text-foreground/90 font-semibold">
                      The cost?
                    </p>
                    <ul className="space-y-2 text-foreground/90">
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Hours lost to manual data entry every week</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Stale or conflicting data across systems</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>
                          Growth bottlenecked by manual handoffs between tools
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    The Solution: Wire Systems Together, Not People
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I connect the tools a business already uses through APIs,
                    webhooks, and automation pipelines so that:
                  </p>
                  <ul className="space-y-3 text-foreground/90">
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Data written once syncs everywhere it's needed,
                        automatically
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Events in one system trigger the right action in
                        another, in real time
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Manual handoffs disappear instead of being managed
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 space-y-3">
                    <p className="text-foreground/90 font-semibold">
                      These integrations are built to be:
                    </p>
                    <div className="grid md:grid-cols-3 gap-3 text-foreground/90">
                      <div className="flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>Resilient to API changes and failures</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>Observable, not a black box</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>Easy to extend as new tools get added</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                What This Looks Like
              </h2>
              <Card className="p-6 bg-muted/30 space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      REST API and webhook integrations between platforms
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Two-way data sync between CRMs, sheets, and databases
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Automated pipelines connecting scraping, AI, and storage
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Vector search and retrieval layered on existing data
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Impact</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Hours reclaimed weekly
                  </p>
                  <p className="text-sm text-muted-foreground">
                    No more copying data between systems by hand
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Data that's always current
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Every system reflects the same source of truth
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Fewer dropped handoffs
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Events route automatically instead of waiting on a person
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Integrations that scale
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Adding a new tool doesn't mean rebuilding the pipeline
                  </p>
                </Card>
              </div>
            </div>

            <Card className="p-6 bg-muted/50">
              <h2 className="text-2xl font-bold mb-4">How I Build It</h2>
              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "Map the systems and data flow",
                    desc: "Identify which tools hold what data and where handoffs currently break down",
                  },
                  {
                    num: 2,
                    title: "Design the integration contract",
                    desc: "Define how systems will exchange data — REST, webhooks, or scheduled sync",
                  },
                  {
                    num: 3,
                    title: "Build the automation pipeline",
                    desc: "Connect systems through n8n, custom APIs, or direct integrations",
                  },
                  {
                    num: 4,
                    title: "Add observability and error handling",
                    desc: "Make failures visible instead of silent, with retries where it matters",
                  },
                  {
                    num: 5,
                    title: "Test against real data and scale",
                    desc: "Validate with production-like volume before handing it off",
                  },
                ].map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-background font-bold text-sm">
                        {step.num}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {step.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <RelatedCaseStudies items={relatedCaseStudies} />

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Integration Debt Compounds Quietly
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Manual handoffs don't fail loudly — they just keep
                      costing hours until someone finally automates them.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Observability Matters as Much as the Connection
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      An integration nobody can debug is worse than no
                      integration — visibility into failures is part of the
                      build, not an afterthought.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Build for the Next Tool, Not Just This One
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Pipelines designed around a clear data contract make it
                      cheap to add the next system instead of starting over.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="pt-8 border-t border-border">
              <h2 className="text-2xl font-bold mb-4">
                Need Your Systems Talking to Each Other?
              </h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                If manual handoffs are costing your team hours every week,
                let's connect your tools properly.
              </p>
              <div className="flex gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Book a Call
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/")}
                  className="hover:text-white hover:bg-primary/20 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          </section>
        </article>
      </div>
      <Footer />
    </div>
  );
};
export default CaseStudyConnectedSystems;
