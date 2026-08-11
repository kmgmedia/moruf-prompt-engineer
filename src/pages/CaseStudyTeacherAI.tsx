import { Helmet } from "react-helmet-async";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Camera,
  CheckCircle2,
  GitBranch,
  Lightbulb,
  Monitor,
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
  systemPipelineStages,
  architectureLayers,
  triggerTypes,
  dashboardFeatures,
  businessOutcomes,
  keyFeatures,
  impactItems,
  tools,
  takeaways,
  dashboardScreenshots,
} from "@/data/aiWorkflowEngineData";

const CaseStudyTeacherAI = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Helmet>
        <title>Intelligent Workflow Automation System | Moruf Adebola</title>
        <meta name="description" content="Case study: Intelligent workflow automation engine with event-driven pipeline orchestration and trigger-based task management for business process automation." />
        <link rel="canonical" href="https://www.morufstackdev.com.ng/case-study/intelligent-workflow-systems" />
        <meta property="og:url" content="https://www.morufstackdev.com.ng/case-study/intelligent-workflow-systems" />
        <meta property="og:title" content="Intelligent Workflow Automation System | Moruf Adebola" />
        <meta property="og:description" content="Case study: Intelligent workflow automation engine with event-driven pipeline orchestration and trigger-based task management for business process automation." />
      </Helmet>
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
              <GitBranch className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI Workflow Automation Engine
            </h1>
            <p className="text-xl text-muted-foreground">
              A multi-trigger n8n automation engine with a React operational dashboard —
              built to replace manual business handoffs with observable, configurable,
              always-on automation infrastructure.
            </p>
          </header>

          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/workflow-engine.png"
              alt="AI Workflow Automation Engine"
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
                Business operations run on manual handoffs. A form gets submitted — someone
                has to check it, route it, act on it. An API event fires — someone has to
                process it. These gaps are where time, money, and leads disappear daily.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                I designed and built a workflow automation engine that closes those gaps:
                a multi-trigger n8n orchestration system paired with a React admin dashboard
                that operators use to monitor, configure, and control the automation
                infrastructure — without touching code.
              </p>
              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                <p className="text-sm font-semibold text-primary mb-1">Positioning Note</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  The React dashboard here is not a UI project. It is the <strong>operational control plane</strong> of
                  the automation infrastructure — the interface through which non-technical operators
                  manage, monitor, and troubleshoot a live automation system. Full-stack built as
                  AI operational infrastructure.
                </p>
              </div>
            </div>

            {/* PROBLEM */}
            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Manual workflows don't fail dramatically — they fail incrementally.
                    Handoffs get missed. Events go unprocessed. Teams lose hours to
                    repetitive actions that should have been automated months ago.
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
                I built an automation engine where every business event — form submission,
                API callback, scheduled job — flows through a unified trigger layer,
                gets classified by intent, and executes the right workflow automatically.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">The engine enables:</p>
              <ul className="space-y-2 pl-4">
                {solutionItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">&bull;</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SYSTEM PIPELINE */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-primary" />
                System Pipeline
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Every event — regardless of its source — travels the same 7-stage pipeline.
                The classify stage is where the engine decides which workflow branch runs.
                Everything downstream is deterministic from that point.
              </p>
              <div className="relative">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent z-10" />
                <div className="overflow-x-auto custom-scrollbar px-3 pb-3">
                  <div className="flex items-stretch gap-2 min-w-max">
                    {systemPipelineStages.map((stage, index) => (
                      <div key={stage.label} className="flex items-center gap-2">
                        <Card className="p-3 bg-primary/5 border-primary/20 flex flex-col items-center text-center w-28">
                          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center mb-2">
                            <stage.icon className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-xs font-bold text-foreground leading-tight">{stage.label}</p>
                          <p className="text-xs text-foreground/50 mt-0.5 leading-tight">{stage.sublabel}</p>
                        </Card>
                        {index < systemPipelineStages.length - 1 && (
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
                <Zap className="w-7 h-7 text-primary" />
                System Architecture
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Four isolated layers — each with clear ownership. The React client layer
                is the operational control plane; n8n owns orchestration; integration
                handles external APIs; data persists execution state.
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

            {/* TRIGGER TYPES */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Zap className="w-7 h-7 text-primary" />
                Trigger Architecture
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The engine accepts three trigger types through the same unified entry point.
                The classify layer routes each type to the correct workflow branch —
                zero shared state between trigger types.
              </p>
              <div className="space-y-4">
                {triggerTypes.map((trigger) => (
                  <Card key={trigger.type} className={`p-5 border ${trigger.color.split(" ")[1]}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${trigger.color.split(" ")[0]}`}>
                        <trigger.icon className={`w-5 h-5 ${trigger.color.split(" ")[2]}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold mb-1 ${trigger.color.split(" ")[2]}`}>{trigger.type}</h4>
                        <p className="text-sm text-foreground/80 leading-relaxed mb-3">{trigger.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {trigger.examples.map((ex) => (
                            <span key={ex} className="text-xs bg-muted/40 text-foreground/60 px-2 py-0.5 rounded-full">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* DASHBOARD AS INFRASTRUCTURE */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Monitor className="w-7 h-7 text-primary" />
                React Dashboard: The Operational Control Plane
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                This is not a reporting dashboard. It is the interface through which
                non-technical operators manage a live automation infrastructure —
                monitoring workflow health, inspecting execution history, and
                adjusting config without opening a codebase.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardFeatures.map((item) => (
                  <Card key={item.feature} className="p-5 bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">{item.feature}</h4>
                        <p className="text-sm text-foreground/75 leading-relaxed">{item.description}</p>
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
                The value of automation infrastructure isn't the technology — it's
                what it eliminates. These are the outcomes that mattered operationally.
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
                The React operational dashboard, n8n automation workflow, execution log
                viewer, and error alert panel.
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
                A live walkthrough of the automation engine — triggering a workflow,
                watching it execute in n8n, and monitoring it through the React dashboard.
              </p>
              <div className="w-full h-64 md:h-80 rounded-xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="w-7 h-7 text-primary ml-1" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground/60">Demo video coming soon</p>
                  <p className="text-xs text-foreground/40 mt-1">
                    Live walkthrough — trigger → classify → execute → log → dashboard
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
                    The engine turned a series of disconnected manual steps into a
                    unified, observable, operator-controlled automation infrastructure
                    running 24/7 without developer involvement.
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

export default CaseStudyTeacherAI;
