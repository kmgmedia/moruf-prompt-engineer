import {
  ArrowLeft,
  AlertCircle,
  Building2,
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
  "Searching through property documents manually",
  "Responding repeatedly to similar enquiries",
  "Handling late-night client questions",
  "Managing fragmented property information",
];

const solutionItems = [
  "Search property listings conversationally",
  "Retrieve accurate property details instantly",
  "Access market and location information",
  "Automate enquiry handling and lead engagement",
  "Generate operational summaries automatically",
];

const keyFeatures = [
  {
    title: "AI-Powered Property Search",
    description:
      'Users can ask natural language questions such as "Show me 3-bedroom apartments in Lekki under 50M." The system retrieves and ranks relevant property information instantly.',
  },
  {
    title: "Conversational Assistant with Memory",
    description:
      "The assistant maintains conversational context, creating more natural and personalized interactions for users.",
  },
  {
    title: "Intelligent Document Retrieval",
    description:
      "Property documents, reports, and listing data are transformed into searchable knowledge using vector embeddings and semantic retrieval.",
  },
  {
    title: "Workflow Automation",
    description:
      "The system automates property enquiry handling, lead interaction logging, daily operational reporting, contact routing, and follow-ups.",
  },
  {
    title: "Multi-Channel Architecture",
    description:
      "The platform supports internal staff usage, website chat integration, webhook/API integrations, and future WhatsApp deployment.",
  },
];

const architectureItems = [
  "AI retrieval workflows",
  "Vector database search",
  "Context-aware conversational logic",
  "Automated operational reporting",
];

const impactItems = [
  "Faster property information retrieval",
  "Reduced manual response workload",
  "Improved lead engagement availability",
  "Centralized access to property intelligence",
  "24/7 conversational assistance capability",
];

const implementationItems = [
  "Retrieval-Augmented Generation (RAG)",
  "Vector similarity search",
  "Conversational AI orchestration",
  "Metadata-based document handling",
  "Automated logging and reporting workflows",
  "API-driven chat integration",
];

const tools = [
  "n8n",
  "OpenAI GPT-4.1 Mini",
  "Pinecone Vector Database",
  "React.js",
  "Gmail API",
  "Webhooks & APIs",
  "Vector Search Architecture",
];

const takeaways = [
  {
    title: "AI Systems Become Powerful When Connected to Operational Workflows",
    description:
      "The value of the system comes from connecting intelligence directly to lead handling, reporting, and communication workflows.",
  },
  {
    title: "Conversational Interfaces Improve Information Accessibility",
    description:
      "Natural language search makes property information easier to access for both internal teams and clients.",
  },
  {
    title: "Workflow Automation Enhances Scalability",
    description:
      "Automating repetitive communication and reporting tasks helps real estate teams respond faster without increasing manual workload.",
  },
  {
    title: "AI Retrieval Systems Require Structured Context Design",
    description:
      "Accurate AI responses depend on clean document ingestion, metadata design, and thoughtful retrieval architecture.",
  },
];

const CaseStudyPropertyIntelligence = () => {
  const navigate = useNavigate();
  const projectLink = "https://realestatewebsite-main.vercel.app/";

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
              <Building2 className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI Property Intelligence & Conversational Assistant
            </h1>
            <p className="text-xl text-muted-foreground">
              An AI-powered real estate assistant designed to help agencies
              automate property discovery, improve response speed, and provide
              intelligent client engagement across web and internal platforms.
            </p>
          </header>

          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/property-intelligence.png"
              alt="AI Property Intelligence Assistant"
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
                Real estate teams often manage large volumes of listings, market
                reports, legal documents, and client enquiries across multiple
                channels. Responding quickly while maintaining accuracy becomes
                difficult as operations scale.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                NaijaRealty needed a system that could centralize property
                knowledge, support conversational search, and automate
                repetitive communication workflows.
              </p>
            </div>

            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Agents and support teams spent significant time on manual
                    search and repeated communication tasks. This created delays
                    in response time, inconsistent communication, and missed
                    sales opportunities.
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
                I designed and implemented an AI-powered property intelligence
                system that combines conversational AI, vector search, and
                workflow automation to deliver fast and context-aware property
                assistance.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                The system enables users to:
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
                    The solution combines AI retrieval workflows, vector
                    database search, context-aware conversational logic, and
                    automated operational reporting.
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
                    Property data is processed through structured ingestion
                    pipelines, embedded into a vector database, and retrieved
                    dynamically based on user intent and conversational context.
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
                    The system improved access to property intelligence and
                    reduced the amount of manual communication required from the
                    real estate team.
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
                The workflow architecture was designed using modular automation
                and retrieval components to ensure scalability and
                maintainability.
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

export default CaseStudyPropertyIntelligence;
