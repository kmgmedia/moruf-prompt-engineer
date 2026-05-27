import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Brain,
  Camera,
  CheckCircle2,
  GitBranch,
  Lightbulb,
  Play,
  Search,
  TrendingUp,
  Wrench,
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
  evaluationPipeline,
  operationalControls,
  realWorldChallenges,
  businessOutcomes,
  keyFeatures,
  impactItems,
  tools,
  takeaways,
  dashboardScreenshots,
} from "@/data/aiJobIntelligenceData";

const CaseStudyAIJobIntelligence = () => {
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
              <Search className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI Job Intelligence & Resume Automation System
            </h1>
            <p className="text-xl text-muted-foreground">
              An end-to-end AI pipeline that discovers job opportunities, scores role fit
              with GPT-4, generates ATS-safe resumes programmatically, and maintains a full
              audit trail — from scheduled scrape to ready-to-submit Google Doc.
            </p>
          </header>

          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/jobscraping1.png"
              alt="AI Job Intelligence & Resume Automation System"
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
                Job searching at volume is a data problem. Hundreds of listings go live
                daily — most irrelevant. Tailoring a resume to each relevant role takes
                45–60 minutes manually, making scale impossible without automation.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                I built a fully automated intelligence pipeline: scheduled LinkedIn scraping,
                GPT-4 relevance scoring with structured JSON output, deterministic resume
                rewriting, Google Docs generation, and a Sheets audit log — all orchestrated
                in n8n with operational controls for reliability at scale.
              </p>
            </div>

            {/* PROBLEM */}
            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The manual job application workflow had four compounding bottlenecks —
                    discovery, evaluation, tailoring, and tracking — each one limiting
                    throughput and introducing inconsistency.
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
                I designed a multi-stage automation pipeline in n8n that treats the job
                application workflow as a data pipeline — each stage deterministic,
                observable, and recoverable.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">The pipeline enables:</p>
              <ul className="space-y-2 pl-4">
                {solutionItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">&bull;</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PIPELINE VISUALIZATION */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-primary" />
                Automation Pipeline
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Every run executes an 8-stage pipeline — triggered by the frontend dashboard,
                instantly acknowledged, then processed fully in the background. From LinkedIn
                URL to ready-to-submit Google Doc, each stage is observable and recoverable.
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
                          <p className="text-xs font-bold text-foreground leading-tight">{stage.label}</p>
                          <p className="text-xs text-foreground/50 mt-0.5 leading-tight">{stage.sublabel}</p>
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

            {/* ARCHITECTURE LAYERS */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Brain className="w-7 h-7 text-primary" />
                System Architecture
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The pipeline is composed of four distinct layers — each with a clear
                responsibility boundary and no cross-layer coupling.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {architectureLayers.map((layer) => (
                  <Card key={layer.layer} className={`p-5 border ${layer.color}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${layer.color}`}>
                        <layer.icon className={`w-5 h-5 ${layer.textColor}`} />
                      </div>
                      <p className={`font-bold text-sm uppercase tracking-wider ${layer.textColor}`}>
                        {layer.layer}
                      </p>
                    </div>
                    <ul className="space-y-1.5">
                      {layer.components.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm text-foreground/80">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${layer.textColor}`} />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>

            {/* EVALUATION PIPELINE */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Brain className="w-7 h-7 text-primary" />
                AI Evaluation Pipeline
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The evaluation stage is where most job search automation breaks down —
                generic prompts produce generic scores. This system uses structured,
                deterministic prompting with schema-validated output to make scoring
                reliable enough to trust in an automated flow.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {evaluationPipeline.map((step) => (
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

            {/* OPERATIONAL CONTROLS */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Zap className="w-7 h-7 text-primary" />
                Operational Controls
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Production automation fails not at the AI layer — it fails at the
                infrastructure layer. These controls are what keep the pipeline running
                reliably week after week without manual intervention.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {operationalControls.map((control) => (
                  <Card key={control.title} className="p-5 bg-muted/20 border-border/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <control.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${control.color}`} />
                      <div>
                        <p className="font-bold text-foreground mb-1">{control.title}</p>
                        <p className="text-sm text-foreground/75 leading-relaxed">{control.detail}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* REAL-WORLD CHALLENGES */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Wrench className="w-7 h-7 text-primary" />
                Real-World Engineering Challenges
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Building this pipeline surfaced five production-level problems that don't
                appear in tutorials — each one required diagnosing the exact failure point
                and applying a targeted fix without disrupting the rest of the workflow.
              </p>
              <div className="space-y-4">
                {realWorldChallenges.map((item, index) => (
                  <Card key={index} className="p-5 bg-muted/20 border-border/50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/15 flex items-center justify-center mt-0.5">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <p className="font-bold text-foreground">{item.problem}</p>
                        <p className="text-sm text-foreground/70 leading-relaxed">{item.detail}</p>
                        <div className="flex items-start gap-2 pt-1">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-green-400/90 leading-relaxed">{item.fix}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
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

            {/* BUSINESS OUTCOMES */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <BarChart2 className="w-7 h-7 text-primary" />
                Business Outcomes
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The system was designed for throughput and quality — not just automation for
                its own sake. These are the outcomes that defined whether it worked.
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

            {/* SCREENSHOTS */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Camera className="w-7 h-7 text-primary" />
                Screenshots
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Key views from the system — the n8n pipeline, GPT-4 evaluation output,
                Sheets audit log, and a generated Google Doc resume.
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
                        <p className="text-xs text-foreground/40 leading-snug">{item.description}</p>
                        <span className="text-xs text-foreground/30 mt-1">Screenshot coming soon</span>
                      </div>
                    )}
                    {item.src && (
                      <div className="px-4 py-3 border-t border-primary/10">
                        <p className="text-sm font-semibold text-foreground/80">{item.label}</p>
                        <p className="text-xs text-foreground/50 leading-snug mt-0.5">{item.description}</p>
                      </div>
                    )}
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
                A full pipeline walkthrough — from scheduled trigger through scraping,
                GPT-4 evaluation, resume generation, and the final Sheets audit log entry.
              </p>
              <div className="w-full h-64 md:h-80 rounded-xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="w-7 h-7 text-primary ml-1" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground/60">Demo video coming soon</p>
                  <p className="text-xs text-foreground/40 mt-1">
                    Full pipeline walkthrough — scrape → evaluate → rewrite → generate → log
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
                    The pipeline transformed a 4-hour-per-week manual workflow into a
                    fully automated system that runs on schedule and delivers ready-to-submit
                    documents without human intervention.
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
            </div>

          </section>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudyAIJobIntelligence;
