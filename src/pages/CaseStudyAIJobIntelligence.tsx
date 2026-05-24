import {
  ArrowLeft,
  Search,
  Lightbulb,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const problemItems = [
  "Time-consuming manual job discovery and filtering",
  "Repetitive, manual resume rewrites per application",
  "Scattered application tracking across platforms",
  "Low throughput due to manual verification and formatting",
];

const solutionItems = [
  "Automated scraping and normalization of job listings",
  "AI-based relevance scoring and keyword extraction",
  "Programmatic resume rewriting with ATS-safe HTML",
  "Google Docs generation and centralized application logging",
];

const keyFeatures = [
  {
    title: "AI-powered job relevance filtering",
    description:
      "Role-fit scoring and rationale extraction using OpenAI to reduce noise and prioritise opportunities.",
  },
  {
    title: "Automated resume customization",
    description:
      "Targeted rewriting of a master resume to emphasize role-specific skills and responsibilities while preserving ATS safety.",
  },
  {
    title: "LinkedIn scraping and batch ingestion",
    description:
      "Apify actors collect listings, normalize payloads, and deduplicate using deterministic fingerprints.",
  },
  {
    title: "Google Docs generation & logging",
    description:
      "Create a role-specific Google Doc per application and persist metadata to Google Sheets for audit and analytics.",
  },
  {
    title: "Batch processing with operational controls",
    description:
      "Configurable batch windows, retry/backoff, and observable status for each pipeline stage.",
  },
];

const architectureItems = [
  "Scraper (Apify) -> Ingest queue -> n8n orchestrator",
  "OpenAI evaluator with JSON-schema validation",
  "Resume processor and Google Docs HTML pipeline",
  "Google Sheets logging and audit trails",
];

const impactItems = [
  "Dramatically reduced time spent per tailored application",
  "Higher interview-per-application ratio through stronger fit filtering",
  "Scalable application throughput without additional manual effort",
  "Full audit trail for iteration and prompt tuning",
];

const implementationItems = [
  "n8n orchestration with idempotent nodes",
  "Apify scraping actors with fingerprinting",
  "OpenAI structured prompts and response validation",
  "Google Docs API HTML uploads and Sheets logging",
  "HTML sanitization and ATS formatting rules",
];

const tools = [
  "n8n",
  "OpenAI API",
  "Apify",
  "Google Docs API",
  "Google Sheets API",
  "JavaScript / Node.js",
  "REST APIs",
];

const takeaways = [
  {
    title: "Treat LLMs as deterministic filters, not final answers",
    description:
      "Wrap model outputs with schema checks and deterministic prompts to maintain reliability in automated pipelines.",
  },
  {
    title: "Operational controls reduce cost and error surface",
    description:
      "Batching, rate-limit-aware scheduling, and idempotency make automation predictable and maintainable.",
  },
  {
    title: "Auditability unlocks iterative improvements",
    description:
      "Capture structured metadata at each step to tune fit thresholds and prompt variants based on downstream signals.",
  },
];

const CaseStudyAIJobIntelligence = () => {
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
              <Search className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI Job Intelligence & Resume Automation System
            </h1>
            <p className="text-xl text-muted-foreground">
              An operational AI pipeline that discovers opportunities, evaluates
              fit, and generates role-specific resumes with centralized
              application tracking.
            </p>
          </header>

          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/jobscraping1.png"
              alt="AI Job Intelligence & Resume Automation System"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                The system automates discovery and application workflows by
                combining scheduled scraping, AI-based relevance scoring, and
                programmatic resume generation. It reduces repetitive work and
                provides a single source of truth for all applications.
              </p>
            </div>

            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Engineers spend excessive time finding, qualifying, and
                    tailoring applications. Manual workflows limit throughput
                    and introduce inconsistency in role alignment and formatting
                    required by ATS systems.
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
                I built a workflow intelligence system that applies
                deterministic AI evaluation and automated resume generation to
                move high-quality opportunities through a consistent, auditable
                pipeline.
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
                    The pipeline is composed of scraping, evaluation, rewrite,
                    generation, and logging stages. Each stage persists status
                    for recoverability and metrics collection.
                  </p>
                  <ul className="space-y-2 mb-4">
                    {architectureItems.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-primary mt-1">&bull;</span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The automation reduced manual effort and increased the rate
                    of meaningful outreach by focusing time on high-fit
                    opportunities and removing repetitive resume edits.
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
                Implementation focused on deterministic prompt templates,
                structured response validation, idempotent nodes, and secure
                credential handling across integrations.
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
                {tools.map((tool, i) => (
                  <Card
                    key={i}
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
            </div>
          </section>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudyAIJobIntelligence;
