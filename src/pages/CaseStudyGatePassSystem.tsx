import {
  ArrowLeft,
  BadgeCheck,
  GitBranch,
  Lightbulb,
  ScanLine,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const problemItems = [
  "Manual guest verification using printed lists",
  "Slow check-in processes during peak arrival periods",
  "Difficulty identifying invited vs uninvited guests",
  "Lack of real-time attendance visibility",
  "Poor coordination between event staff at entry points",
  "Limited post-event attendance records and reporting",
];

const solutionItems = [
  "Verify guest access instantly using QR codes",
  "Track attendance in real time",
  "Reduce unauthorized event access",
  "Improve crowd coordination at event entrances",
  "Manage guest data digitally instead of manually",
  "Generate attendance records for post-event reporting",
];

const keyFeatures = [
  {
    title: "QR-Based Guest Verification",
    description:
      "Each invited guest receives a unique QR code that can be scanned and validated instantly during check-in.",
  },
  {
    title: "Real-Time Event Check-In",
    description:
      "The system processes guest verification in real time, helping event staff reduce queues and speed up entry operations.",
  },
  {
    title: "Attendance Tracking",
    description:
      "Event organizers can monitor attendance activity and track guest check-in status throughout the event.",
  },
  {
    title: "Operational Gate Management",
    description:
      "The workflow supports structured coordination between ushers, access personnel, and event management teams during live operations.",
  },
  {
    title: "Unauthorized Access Prevention",
    description:
      "The system helps reduce gate-crashing and duplicate check-ins through digital verification workflows.",
  },
  {
    title: "Digital Guest Data Management",
    description:
      "Guest information is managed digitally, eliminating dependency on printed lists and manual tracking methods.",
  },
];

const architectureItems = [
  "QR code generation and validation workflows",
  "Real-time guest verification logic",
  "Attendance tracking system",
  "Operational event check-in workflows",
  "Role-based event coordination processes",
  "Data logging and reporting architecture",
];

const impactItems = [
  "Faster guest entry and reduced queue times",
  "Improved coordination during event operations",
  "Reduced unauthorized guest access",
  "Better visibility into attendance activity",
  "Digitized event guest management workflows",
  "Improved overall guest check-in experience",
];

const implementationItems = [
  "QR code generation and validation",
  "Real-time event access workflows",
  "Guest attendance state management",
  "Event operation coordination logic",
  "Check-in activity logging",
  "API-driven verification workflows",
  "Mobile-friendly event operation interfaces",
];

const tools = [
  "Node.js",
  "React.js",
  "QR Verification Workflows",
  "REST APIs",
  "Database Management Systems",
  "Real-Time Check-In Architecture",
  "Web-Based Operational Dashboard",
  "Event Access Logic Systems",
];

const takeaways = [
  {
    title: "Operational Software Requires Workflow Thinking",
    description:
      "Building event systems is not only about interfaces. It requires understanding real-world crowd flow, verification speed, and operational coordination.",
  },
  {
    title: "Real-Time Systems Improve User Experience",
    description:
      "Fast guest verification and structured check-in processes significantly improve the event entry experience for both organizers and attendees.",
  },
  {
    title: "Digital Access Control Reduces Operational Chaos",
    description:
      "Replacing manual guest handling with structured verification workflows improves event organization and reduces gate management issues.",
  },
  {
    title: "Scalable Event Systems Depend on Reliable Verification Logic",
    description:
      "Accurate guest validation, attendance tracking, and operational workflows are critical for maintaining reliability during large-scale events.",
  },
];

const CaseStudyGatePassSystem = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
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

        <article className="space-y-8 animate-fade-in">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ScanLine className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              GatePass System
            </h1>
            <p className="text-xl text-muted-foreground">
              Smart Event Access & Guest Verification System
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              An operational event access platform designed to streamline guest
              check-in, improve event entry coordination, and reduce gate
              management chaos during live events.
            </p>
          </header>

          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/gatepass-system.png"
              alt="GatePass System dashboard"
              className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-foreground/90 leading-relaxed">
                Managing guest entry at large events often becomes chaotic due
                to manual verification processes, overcrowding, unverified
                attendees, and poor coordination between event organizers and
                gate personnel.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Traditional methods such as printed guest lists, manual name
                confirmation, and unstructured gate operations slow down event
                entry and create poor guest experiences.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                GatePass System was designed to modernize event access
                operations through QR-based guest verification, real-time
                attendance tracking, and operational check-in workflows.
              </p>
            </div>

            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <BadgeCheck className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Event organizers and planners frequently struggle with
                    inefficient guest entry systems that lead to delays,
                    overcrowding, and unauthorized access.
                  </p>
                  <ul className="space-y-2">
                    {problemItems.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-destructive mt-1">&bull;</span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                The Solution
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                I designed and implemented a smart event check-in and guest
                verification system focused on improving operational efficiency
                during live events.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                The system combines QR-based guest access, real-time
                verification workflows, and attendance tracking to create a
                faster and more structured entry experience.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                The system enables event teams to:
              </p>
              <ul className="space-y-2 pl-4">
                {solutionItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">&bull;</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="space-y-4">
                {keyFeatures.map((feature) => (
                  <div key={feature.title} className="space-y-1">
                    <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                      <span className="text-primary">&bull;</span>
                      <span>{feature.title}</span>
                    </p>
                    <p className="text-foreground/80 leading-relaxed pl-5">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <GitBranch className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    System Architecture
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The platform combines event access workflows, QR validation
                    systems, real-time attendance tracking, and operational
                    management logic.
                  </p>
                  <ul className="space-y-2 mb-4">
                    {architectureItems.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-primary mt-1">&bull;</span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-foreground/90 leading-relaxed">
                    The system was designed to support scalable event operations
                    while maintaining fast verification speed during high-volume
                    guest entry periods.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Results & Impact
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The system improved event entry operations by reducing
                    manual verification processes and creating a more structured
                    guest access experience.
                  </p>
                  <ul className="space-y-3">
                    {impactItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-primary font-bold">&#10003;</span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                Technical Implementation
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The system architecture was designed around operational
                reliability, fast access verification, and scalable event
                workflows.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                Core implementation areas included:
              </p>
              <ul className="space-y-2 pl-4">
                {implementationItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">&bull;</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tools.map((tool) => (
                  <Card
                    key={tool}
                    className="p-3 bg-primary/5 border-primary/20 text-center"
                  >
                    <p className="font-semibold text-foreground text-sm">
                      {tool}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  {takeaways.map((takeaway) => (
                    <div key={takeaway.title}>
                      <h4 className="font-semibold text-lg mb-2 text-primary">
                        {takeaway.title}
                      </h4>
                      <p className="text-foreground/90 text-sm leading-relaxed">
                        {takeaway.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="pt-8 border-t border-border">
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Case Studies
              </Button>
            </div>
          </section>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudyGatePassSystem;
