import {
  ArrowLeft,
  BadgeCheck,
  GitBranch,
  Globe2,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useState } from "react";

const problemItems = [
  "Understand how the GatePass System works",
  "See the benefits of digital guest verification",
  "Explore event service pricing and packages",
  "View operational workflows before booking",
  "Contact the team easily for event inquiries",
  "Build trust in the reliability of the system",
];

const solutionItems = [
  "Explore GatePass event solutions and capabilities",
  "Understand the event check-in workflow",
  "View service pricing and packages",
  "Learn the benefits of digital guest access systems",
  "Submit inquiries for upcoming events",
  "Build confidence in the operational process before booking",
];

const keyFeatures = [
  {
    title: "Product-Centered Landing Experience",
    description:
      "The website was structured to communicate the operational value of the GatePass System clearly to event planners and clients.",
  },
  {
    title: "Service & Pricing Presentation",
    description:
      "Visitors can explore available packages, operational offerings, and event service structures directly from the platform.",
  },
  {
    title: "Event Workflow Communication",
    description:
      "The website explains how digital guest verification and event check-in operations function during live events.",
  },
  {
    title: "Mobile-Responsive Experience",
    description:
      "The interface was optimized for mobile and desktop accessibility to support event organizers browsing from multiple devices.",
  },
  {
    title: "Lead Generation & Inquiry Flow",
    description:
      "The platform supports direct customer inquiries and acts as a digital acquisition channel for new event bookings.",
  },
  {
    title: "Brand Positioning & Trust Building",
    description:
      "The website establishes GatePass as a structured and professional event operations solution rather than a simple QR code service.",
  },
];

const architectureItems = [
  "Responsive frontend architecture",
  "Service presentation workflows",
  "Inquiry and lead capture flow",
  "Event operations communication structure",
  "Mobile-first layout optimization",
  "Brand-focused UI system",
];

const impactItems = [
  "Improved product presentation and clarity",
  "Better communication of operational workflows",
  "Stronger digital brand positioning",
  "Improved customer inquiry accessibility",
  "Centralized access to pricing and service information",
  "Enhanced trust and professionalism for prospective clients",
];

const implementationItems = [
  "Responsive web interface design",
  "Product-focused content architecture",
  "Conversion-oriented landing structure",
  "Mobile-first frontend development",
  "Service communication strategy",
  "Inquiry workflow integration",
];

const tools = [
  "React.js",
  "Frontend UI Architecture",
  "Responsive Web Design",
  "Modern Landing Page Structure",
  "Mobile-Responsive Layout Systems",
  "Product Presentation Architecture",
  "Web Interaction Design",
];

const takeaways = [
  {
    title: "Product Websites Should Communicate Operational Value",
    description:
      "A strong product website should explain not only what a system is, but how it improves real operational workflows.",
  },
  {
    title: "Clear Service Presentation Improves Conversion Potential",
    description:
      "Structuring pricing, workflows, and service explanations properly helps potential customers understand the value of the product faster.",
  },
  {
    title: "Digital Trust Matters for Operational Products",
    description:
      "Professional presentation and clear workflow communication help event organizers feel more confident adopting operational technology solutions.",
  },
  {
    title: "Product Positioning Is Part of System Design",
    description:
      "The website plays a critical role in how the overall GatePass ecosystem is perceived by clients and event planners.",
  },
];

const CaseStudyGatePassWebsite = () => {
  const navigate = useNavigate();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const projectLink = "https://www.gatepasscheckin.com.ng/";

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
              <Globe2 className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              GatePass Website
            </h1>
            <p className="text-xl text-muted-foreground">
              Product Marketing & Event Operations Showcase Platform
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              A modern product website designed to present the GatePass event
              access system, educate event planners, showcase operational
              capabilities, and drive customer enquiries for digital event
              check-in services.
            </p>
          </header>

          <div className="relative w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/gatepass-website.png"
              alt="GatePass Website product landing page"
              className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setHeroImageLoaded(true)}
              onError={(e) => {
                setHeroImageLoaded(false);
                e.currentTarget.style.display = "none";
              }}
            />
            {!heroImageLoaded && (
              <div className="absolute text-center px-6 pointer-events-none">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-background/15 border border-primary-foreground/30">
                  <Globe2 className="h-10 w-10 text-primary-foreground" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">
                  Product Website
                </p>
                <p className="mt-2 text-primary-foreground/80">
                  Service storytelling, pricing, and event inquiry flows
                </p>
              </div>
            )}
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-foreground/90 leading-relaxed">
                Event service businesses often struggle to communicate their
                operational value clearly online. Many event technology products
                rely heavily on word-of-mouth marketing and lack a structured
                digital presence that explains how the system works, what
                problems it solves, and why organizers should trust it during
                live events.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                The GatePass Website was designed as the public-facing platform
                for the GatePass System, helping event planners, coordinators,
                and clients understand the product, explore pricing, and engage
                with the service digitally.
              </p>
            </div>

            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <BadgeCheck className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Without a centralized product website, explaining the
                    service repeatedly through direct messages and calls became
                    inefficient and limited scalability.
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
                I designed and developed a dedicated product website focused on
                presenting the GatePass ecosystem in a clear, modern, and
                operationally-driven way.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                The website acts as both a marketing platform and a client
                onboarding channel, helping visitors quickly understand the
                value of digital event access management.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                The platform enables visitors to:
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
                    The website combines product presentation, responsive UI
                    architecture, inquiry workflows, and service communication
                    structures.
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
                    The platform was designed to communicate operational clarity
                    while maintaining a clean and modern user experience.
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
                    The website improved how the GatePass brand communicates its
                    services digitally and created a more professional customer
                    onboarding experience.
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
                The platform was developed with a focus on responsive user
                experience, structured information architecture, and clear
                operational storytelling.
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

            <div className="pt-8 border-t border-border flex gap-3 flex-col md:flex-row">
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Case Studies
              </Button>
              <Button
                onClick={() => window.open(projectLink, "_blank")}
                size="lg"
                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
              >
                View Project &rarr;
              </Button>
            </div>
          </section>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudyGatePassWebsite;
