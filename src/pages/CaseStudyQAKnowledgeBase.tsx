import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bot,
  Brain,
  Camera,
  CheckCircle2,
  Database,
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
  pipelineStages,
  architectureLayers,
  workflowFlows,
  keyFeatures,
  businessOutcomes,
  implementationNotes,
  impactItems,
  tools,
  takeaways,
  dashboardScreenshots,
} from "@/data/qaKnowledgeBaseData";

const CaseStudyQAKnowledgeBase = () => {
  const navigate = useNavigate();

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
              <Database className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              QA Ingest & AI Knowledge Base Assistant
            </h1>
            <p className="text-xl text-muted-foreground">
              A two-part n8n automation system that captures question-answer pairs,
              enriches them with trust metadata and AI-generated tags, then powers a
              grounded chat assistant through Data Table retrieval.
            </p>
          </header>

          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/qa-knowledge-base.svg?v=2"
              alt="QA Ingest and AI Knowledge Base Assistant"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-12">
            <div className="space-y-3 pt-2">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-foreground/90 leading-relaxed">
                This project turns Q&A collection into an operational knowledge-base
                pipeline. Instead of collecting static form submissions, the workflow
                validates contributor trust, enriches the entry with AI tagging, and
                stores the structured data in an n8n Data Table.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                A second workflow exposes that knowledge through Ruth's Assistant, a
                public chat agent with memory and a Data Table tool. When a user asks
                a question, the assistant searches the stored Q&A entries and answers
                from retrieved context.
              </p>
            </div>

            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The team needed a way to collect answers once, preserve source
                    quality, and reuse that knowledge through a conversational assistant.
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

            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                The Solution
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                I structured the system as two connected workflows: an ingest pipeline
                for collecting and enriching Q&A records, and a retrieval pipeline for
                answering user questions from the stored database.
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

            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-primary" />
                Automation Pipeline
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The system starts with a form submission and ends with a chat assistant
                that can retrieve the stored answer later. Each node has one job:
                capture, validate, enrich, store, search, or respond.
              </p>
              <div className="relative">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent z-10" />
                <div className="overflow-x-auto custom-scrollbar px-3 pb-3">
                  <div className="flex items-stretch gap-2 min-w-max">
                    {pipelineStages.map((stage, index) => (
                      <div key={stage.label} className="flex items-center gap-2">
                        <Card className="p-3 bg-primary/5 border-primary/20 flex flex-col items-center text-center w-28">
                          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center mb-2">
                            <stage.icon className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-xs font-bold text-foreground leading-tight">
                            {stage.label}
                          </p>
                          <p className="text-xs text-foreground/50 mt-0.5 leading-tight">
                            {stage.sublabel}
                          </p>
                        </Card>
                        {index < pipelineStages.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-primary/50 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Brain className="w-7 h-7 text-primary" />
                System Architecture
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The architecture separates intake, validation, intelligence, and
                retrieval so the system can be extended without reworking the whole flow.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {architectureLayers.map((layer) => (
                  <Card key={layer.layer} className={`p-5 border ${layer.color}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${layer.color}`}
                      >
                        <layer.icon className={`w-5 h-5 ${layer.textColor}`} />
                      </div>
                      <p className={`font-bold text-sm uppercase tracking-wider ${layer.textColor}`}>
                        {layer.layer}
                      </p>
                    </div>
                    <ul className="space-y-1.5">
                      {layer.components.map((component) => (
                        <li
                          key={component}
                          className="flex items-center gap-2 text-sm text-foreground/80"
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${layer.textColor}`} />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Bot className="w-7 h-7 text-primary" />
                Workflow Design
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workflowFlows.map((flow) => (
                  <Card
                    key={flow.flow}
                    className="p-5 bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                        <flow.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-2">{flow.flow}</h4>
                        <p className="text-xs text-foreground/50 mb-1">
                          <span className="font-semibold text-foreground/70">Trigger:</span>{" "}
                          {flow.trigger}
                        </p>
                        <p className="text-xs text-foreground/50 mb-1">
                          <span className="font-semibold text-foreground/70">Action:</span>{" "}
                          {flow.action}
                        </p>
                        <p className="text-xs text-primary/80 font-medium">{flow.outcome}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="space-y-4">
                {keyFeatures.map((feature) => (
                  <div key={feature.title} className="space-y-1">
                    <p className="text-foreground/90 font-semibold flex items-start gap-2">
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

            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-primary" />
                Business Outcomes
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {businessOutcomes.map((outcome) => (
                  <Card key={outcome.label} className="p-5 bg-primary/5 border-primary/20 text-center">
                    <outcome.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{outcome.metric}</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{outcome.label}</p>
                    <p className="text-xs text-foreground/50 mt-1 leading-tight">
                      {outcome.context}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Zap className="w-7 h-7 text-primary" />
                Implementation Notes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {implementationNotes.map((note) => (
                  <Card
                    key={note.title}
                    className="p-5 bg-muted/20 border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <note.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${note.color}`} />
                      <div>
                        <p className="font-bold text-foreground mb-1">{note.title}</p>
                        <p className="text-sm text-foreground/75 leading-relaxed">{note.detail}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Camera className="w-7 h-7 text-primary" />
                Screenshots
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Key views from the system: the Data Table screenshot, ingest workflow,
                chat retrieval workflow, and the AI tag enrichment output.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardScreenshots.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden"
                  >
                    {item.src ? (
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-64 object-cover object-top"
                      />
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center gap-2 px-4 text-center">
                        <Camera className="w-8 h-8 text-primary/30" />
                        <p className="text-sm font-semibold text-foreground/60">{item.label}</p>
                        <p className="text-xs text-foreground/40 leading-snug">
                          {item.description}
                        </p>
                        <span className="text-xs text-foreground/30 mt-1">
                          Screenshot coming soon
                        </span>
                      </div>
                    )}
                    {item.src && (
                      <div className="px-4 py-3 border-t border-primary/10">
                        <p className="text-sm font-semibold text-foreground/80">{item.label}</p>
                        <p className="text-xs text-foreground/50 leading-snug mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Play className="w-7 h-7 text-primary" />
                Demo Video
              </h2>
              <div className="w-full h-64 md:h-80 rounded-xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="w-7 h-7 text-primary ml-1" />
                </div>
                <div className="text-center px-4">
                  <p className="text-sm font-medium text-foreground/60">
                    Demo video coming soon
                  </p>
                  <p className="text-xs text-foreground/40 mt-1">
                    Full walkthrough: form submission to Data Table entry to chat retrieval
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The workflow turns a simple form into a reusable knowledge system:
                    records are structured, source trust is visible, and the assistant can
                    retrieve stored answers on demand.
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

            <div className="space-y-4 pt-2">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-5">
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

            <div className="pt-8 border-t border-border flex flex-col md:flex-row gap-3">
              <Button onClick={() => navigate("/")} size="lg" className="bg-primary hover:bg-primary/90">
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

export default CaseStudyQAKnowledgeBase;
