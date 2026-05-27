import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Brain,
  Building2,
  Camera,
  CheckCircle2,
  GitBranch,
  Lightbulb,
  Play,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import {
  problemItems,
  solutionItems,
  keyFeatures,
  retrievalPipelineSteps,
  chunkingStrategies,
  vectorSearchSteps,
  orchestrationSteps,
  fallbackHandlers,
  businessOutcomes,
  dashboardScreenshots,
  impactItems,
  tools,
  takeaways,
} from "@/data/propertyIntelligenceData";

const CaseStudyPropertyIntelligence = () => {
  const navigate = useNavigate();
  const projectLink = "https://realestatewebsite-main.vercel.app/";

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground opacity={0.6} subtle={true} />
      <div className="container mx-auto px-4 pt-20 pb-16 max-w-4xl relative z-10">
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
              <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI Property Intelligence Assistant
            </h1>
            <p className="text-xl text-muted-foreground">
              RAG-powered real estate assistant combining vector search, workflow orchestration,
              and conversational AI to automate property discovery and lead engagement.
            </p>
          </header>

          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/property-intelligence.png"
              alt="AI Property Intelligence Assistant"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-12">

            {/* OVERVIEW */}
            <div className="space-y-3 pt-2">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-foreground/90 leading-relaxed">
                NaijaRealty managed hundreds of property listings, market reports, and legal
                documents across disconnected systems. Agents spent hours manually searching
                for information, and client enquiries after business hours went unanswered —
                directly costing the business leads and revenue.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                The goal was to build an AI system that could make all of that property
                knowledge instantly searchable through natural conversation — and connect it
                to an automated workflow that captured leads, notified agents, and ran 24/7
                without manual intervention.
              </p>
            </div>

            {/* PROBLEM */}
            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The real estate team was operating reactively — losing hours to manual search,
                    missing after-hours leads, and working with fragmented, unsearchable data.
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

            {/* SOLUTION */}
            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                The Solution
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                I designed and implemented a RAG-powered property intelligence system
                orchestrated with n8n — combining vector search, OpenAI generation, and
                automated lead workflows into a single operational pipeline.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">The system enables users to:</p>
              <ul className="space-y-2 pl-4">
                {solutionItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">&bull;</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RETRIEVAL PIPELINE */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-primary" />
                Retrieval Pipeline
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Every user query travels through an 8-stage pipeline — from raw property
                data to a grounded AI response. No hallucination. No guessing. Only
                responses backed by retrieved context.
              </p>
              <div className="relative">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent z-10" />
                <div className="overflow-x-auto custom-scrollbar px-3 pb-3">
                  <div className="flex items-stretch gap-2 min-w-max">
                    {retrievalPipelineSteps.map((step, index) => (
                      <div key={step.label} className="flex items-center gap-2">
                        <Card className="p-3 bg-primary/5 border-primary/20 flex flex-col items-center text-center w-28">
                          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center mb-2">
                            <step.icon className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-xs font-bold text-foreground leading-tight">{step.label}</p>
                          <p className="text-xs text-foreground/50 mt-0.5 leading-tight">{step.sublabel}</p>
                        </Card>
                        {index < retrievalPipelineSteps.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-primary/50 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* EMBEDDINGS FLOW */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Brain className="w-7 h-7 text-primary" />
                Embeddings Flow
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Property documents are transformed into 1536-dimension vectors using
                OpenAI's <code className="text-primary text-sm bg-primary/10 px-1.5 py-0.5 rounded">text-embedding-ada-002</code> model.
                The same model is used at both ingestion time and query time — ensuring the
                vector space is consistent and similarity scores are meaningful.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    stage: "Ingestion",
                    color: "bg-blue-500/10 border-blue-500/30 text-blue-400",
                    steps: [
                      "Load raw document (PDF, listing, report)",
                      "Extract and clean text content",
                      "Apply chunking strategy by document type",
                      "Generate embedding via OpenAI Ada-002",
                      "Upsert vector + metadata to Pinecone",
                    ],
                  },
                  {
                    stage: "Query Time",
                    color: "bg-primary/10 border-primary/30 text-primary",
                    steps: [
                      "Receive user natural language query",
                      "Generate query embedding (same model)",
                      "Apply metadata pre-filters",
                      "Run cosine similarity search in Pinecone",
                      "Return top-k results above threshold",
                    ],
                  },
                  {
                    stage: "Response Generation",
                    color: "bg-green-500/10 border-green-500/30 text-green-400",
                    steps: [
                      "Assemble retrieved chunks into context block",
                      "Prepend conversation history",
                      "Pass context + query to GPT-4.1 Mini",
                      "Apply response formatting rules",
                      "Return grounded, source-backed answer",
                    ],
                  },
                ].map((col) => (
                  <Card key={col.stage} className={`p-4 border ${col.color.split(" ")[0]} ${col.color.split(" ")[1]}`}>
                    <p className={`text-sm font-bold uppercase tracking-wider mb-3 ${col.color.split(" ")[2]}`}>
                      {col.stage}
                    </p>
                    <ul className="space-y-2">
                      {col.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${col.color.split(" ")[2]}`} />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>

            {/* CHUNKING STRATEGY */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-primary" />
                Chunking Strategy
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Generic chunking produces generic retrieval. Each document type in this
                system uses a tailored chunking strategy designed around how the data will
                actually be queried.
              </p>
              <div className="space-y-3">
                {chunkingStrategies.map((chunk) => (
                  <Card key={chunk.docType} className="p-5 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <chunk.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h4 className="font-bold text-foreground">{chunk.docType}</h4>
                          <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-medium">
                            {chunk.strategy}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/75 leading-relaxed">{chunk.detail}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* VECTOR SEARCH ARCHITECTURE */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Zap className="w-7 h-7 text-primary" />
                Vector Search Architecture
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The search layer uses a two-pass approach — structured metadata filtering
                first, then semantic similarity — to deliver both precision and speed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vectorSearchSteps.map((step) => (
                  <Card key={step.step} className="p-5 bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-primary/60 tracking-widest">STEP {step.step}</span>
                        <h4 className="font-bold text-foreground mb-1 mt-0.5">{step.title}</h4>
                        <p className="text-sm text-foreground/75 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* ORCHESTRATION LOGIC */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-primary" />
                Orchestration Logic
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The intelligence layer is orchestrated entirely in n8n. Every message
                triggers a workflow that classifies intent, routes to the right pipeline,
                generates a response, and handles downstream actions — all without code
                running on a custom server.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {orchestrationSteps.map((step, index) => (
                  <div key={step.phase} className="flex flex-col sm:flex-row items-center gap-2 sm:contents">
                    <Card className={`p-4 border ${step.color.split(" ")[0]} ${step.color.split(" ")[1]} w-full sm:col-span-1 flex flex-col items-center text-center`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step.color.split(" ")[0]}`}>
                        <step.icon className={`w-4 h-4 ${step.color.split(" ")[2]}`} />
                      </div>
                      <p className={`text-xs font-bold uppercase tracking-wider ${step.color.split(" ")[2]}`}>
                        {step.phase}
                      </p>
                      <p className="text-xs text-foreground/60 mt-1 leading-tight">{step.description}</p>
                    </Card>
                    {index < orchestrationSteps.length - 1 && (
                      <div className="flex sm:hidden justify-center">
                        <ArrowRight className="w-4 h-4 text-primary/50 rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="hidden sm:flex items-center justify-between px-4">
                {orchestrationSteps.map((_step, index) => (
                  index < orchestrationSteps.length - 1 && (
                    <ArrowRight key={index} className="w-4 h-4 text-primary/40 flex-1 max-w-8" />
                  )
                ))}
              </div>
            </div>

            {/* KEY FEATURES */}
            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="space-y-4">
                {keyFeatures.map((feature) => (
                  <div key={feature.title} className="space-y-1">
                    <p className="text-foreground/90 font-semibold flex items-start gap-2">
                      <span className="text-primary">&bull;</span>
                      <span>{feature.title}</span>
                    </p>
                    <p className="text-foreground/80 leading-relaxed pl-5">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FALLBACK HANDLING */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-primary" />
                Fallback Handling
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Production AI systems fail gracefully or they fail badly. Every failure
                scenario in this system has an explicit handler — no silent errors, no
                confident hallucinations, no dead ends for the user.
              </p>
              <div className="space-y-3">
                {fallbackHandlers.map((handler) => (
                  <Card key={handler.trigger} className="p-5 bg-muted/20 border-border/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <handler.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${handler.color}`} />
                      <div>
                        <p className="text-sm font-bold text-foreground mb-1">
                          Trigger: <span className="text-foreground/70 font-normal">{handler.trigger}</span>
                        </p>
                        <p className="text-sm text-foreground/75 leading-relaxed">{handler.response}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* BUSINESS OUTCOMES */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <BarChart2 className="w-7 h-7 text-primary" />
                Business Outcomes
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The system was built for measurable operational impact — not just technical
                impressiveness. These are the outcomes that mattered to the client.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {businessOutcomes.map((outcome) => (
                  <Card key={outcome.label} className="p-5 bg-primary/5 border-primary/20 text-center">
                    <outcome.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{outcome.metric}</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{outcome.label}</p>
                    <p className="text-xs text-foreground/50 mt-1 leading-tight">{outcome.context}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* DASHBOARD SCREENSHOTS */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Camera className="w-7 h-7 text-primary" />
                Screenshots
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Key views from the system — the chat interface, n8n orchestration workflow,
                Pinecone vector index, and the automated lead log.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardScreenshots.map((item) => (
                  <div
                    key={item.label}
                    className="h-48 rounded-xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-2 px-4 text-center"
                  >
                    <Camera className="w-8 h-8 text-primary/30" />
                    <p className="text-sm font-semibold text-foreground/60">{item.label}</p>
                    <p className="text-xs text-foreground/40 leading-snug">{item.description}</p>
                    <span className="text-xs text-foreground/30 mt-1">Screenshot coming soon</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DEMO VIDEO */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Play className="w-7 h-7 text-primary" />
                Demo Video
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                A full walkthrough of the system — from a natural language property query
                through vector retrieval, AI response generation, and automated lead capture.
              </p>
              <div className="w-full h-64 md:h-80 rounded-xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="w-7 h-7 text-primary ml-1" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground/60">Demo video coming soon</p>
                  <p className="text-xs text-foreground/40 mt-1">
                    Full RAG pipeline walkthrough — query → retrieval → response → lead log
                  </p>
                </div>
              </div>
            </div>

            {/* RESULTS & IMPACT */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The system transformed NaijaRealty from a reactive, manual operation into
                    a proactive, always-on intelligence platform.
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

            {/* TECH STACK */}
            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tools.map((tool) => (
                  <Card key={tool} className="p-3 bg-primary/5 border-primary/20 text-center">
                    <p className="font-semibold text-foreground text-sm">{tool}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* KEY TAKEAWAYS */}
            <div className="space-y-4 pt-2">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-5">
                  {takeaways.map((takeaway) => (
                    <div key={takeaway.title}>
                      <h4 className="font-semibold text-lg mb-2 text-primary">{takeaway.title}</h4>
                      <p className="text-foreground/90 text-sm leading-relaxed">{takeaway.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="pt-8 border-t border-border flex flex-col md:flex-row gap-3">
              <Button onClick={() => navigate("/")} size="lg" className="bg-primary hover:bg-primary/90">
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
