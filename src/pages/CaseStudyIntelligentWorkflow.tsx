import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  GitBranch,
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
    title: "AI Job Intelligence & Resume Automation System",
    description:
      "A scheduled pipeline that scrapes, scores, and generates resumes end-to-end without manual intervention.",
    link: "/case-study/ai-job-intelligence",
  },
  {
    title: "QA Ingest & AI Knowledge Base Assistant",
    description:
      "A trigger-based workflow that captures, validates, and enriches Q&A submissions automatically.",
    link: "/case-study/qa-knowledge-base-assistant",
  },
  {
    title: "GatePass System",
    description:
      "Real-time event-driven workflows for guest verification and check-in coordination.",
    link: "/case-study/gatepass-system",
  },
];

const CaseStudyIntelligentWorkflow = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Intelligent Workflow Automation System | Moruf Adebola</title>
        <meta
          name="description"
          content="Case study: Intelligent workflow automation engine with event-driven pipeline orchestration and trigger-based task management for business process automation."
        />
        <link
          rel="canonical"
          href="https://www.morufstackdev.com.ng/case-study/intelligent-workflow-systems"
        />
        <meta
          property="og:url"
          content="https://www.morufstackdev.com.ng/case-study/intelligent-workflow-systems"
        />
        <meta
          property="og:title"
          content="Intelligent Workflow Automation System | Moruf Adebola"
        />
        <meta
          property="og:description"
          content="Case study: Intelligent workflow automation engine with event-driven pipeline orchestration and trigger-based task management for business process automation."
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
              <GitBranch className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Workflow Automation
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Automate Repetitive Processes and Structure Operations
            </h1>
            <p className="text-xl text-muted-foreground">
              Building AI-powered workflows that replace manual handoffs with
              observable, always-on automation
            </p>
          </header>
          <div className="w-full h-1 bg-gradient-primary rounded-full" />
          <section className="space-y-6">
            <Card className="p-6 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    The Problem: Manual Handoffs Everywhere
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Businesses lose time and money because:
                  </p>
                  <ul className="space-y-2 text-foreground/90 ml-4">
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>
                        Form submissions and events sit unprocessed until
                        someone notices them
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>
                        Teams have no visibility into whether a workflow ran,
                        failed, or silently stalled
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>
                        Simple operational changes require developer time
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
                        <span>Hours lost to repetitive manual actions</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Missed handoffs and stalled processes</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Operations that can't scale without more headcount</span>
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
                    The Solution: Intelligent Workflow Systems
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I build automation engines that:
                  </p>
                  <ul className="space-y-3 text-foreground/90">
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Route every event to the right action automatically</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Give operators live visibility into workflow health</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Stay configurable without touching code</span>
                    </li>
                  </ul>
                  <div className="mt-6 space-y-3">
                    <p className="text-foreground/90 font-semibold">
                      These systems are designed to be:
                    </p>
                    <div className="grid md:grid-cols-3 gap-3 text-foreground/90">
                      <div className="flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>Observable, not a black box</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>Configurable by operators, not just developers</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>Always-on, with zero manual monitoring</span>
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
                      Multi-trigger automation engines (webhook, cron, manual)
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Operational dashboards for monitoring live workflow status
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Intent classification that routes events to the right branch
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Full execution audit trails for debugging and compliance
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
                    Manual handoffs eliminated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Triggers execute within seconds of the event
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    24/7 uptime
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Workflows run without developer monitoring
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Full operational visibility
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Every execution logged and inspectable
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Zero-code configuration
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Operators adjust rules without a developer
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
                    title: "Map the manual handoffs",
                    desc: "Identify where events sit unprocessed and who currently has to act on them",
                  },
                  {
                    num: 2,
                    title: "Design the trigger and classification layer",
                    desc: "Define how webhooks, schedules, and manual runs get routed to the right workflow",
                  },
                  {
                    num: 3,
                    title: "Build the automation engine",
                    desc: "Connect triggers to execution using n8n or custom orchestration",
                  },
                  {
                    num: 4,
                    title: "Layer in an operational dashboard",
                    desc: "Give operators live status, logs, and config controls without code access",
                  },
                  {
                    num: 5,
                    title: "Test and monitor in production",
                    desc: "Validate against real events and add alerting for failures",
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
                      Observability Is Non-Negotiable
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Automation that runs silently is automation waiting to
                      fail silently — logging and error surfacing has to be
                      part of the build from day one.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Configurable Systems Outlast Hardcoded Ones
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Every hardcoded threshold becomes a future maintenance
                      ticket. Parameterizing rules means the system adapts
                      through configuration, not redeployment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Classification Is the Decision That Scales
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      A single entry point with a routing layer is far more
                      maintainable than separate endpoints — new workflow
                      types plug in without touching existing ones.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="pt-8 border-t border-border">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Automate the Manual Work?
              </h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                If repetitive handoffs are costing your team hours, let's
                build a workflow system that runs itself.
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
export default CaseStudyIntelligentWorkflow;
