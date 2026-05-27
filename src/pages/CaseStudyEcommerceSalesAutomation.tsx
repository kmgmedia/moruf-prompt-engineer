import {
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Brain,
  Camera,
  CheckCircle2,
  Lightbulb,
  Play,
  ShoppingCart,
  TrendingUp,
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
  conversationFlows,
  keyFeatures,
  businessOutcomes,
  impactItems,
  tools,
  takeaways,
  dashboardScreenshots,
} from "@/data/ecommerceSalesData";

const CaseStudyEcommerceSalesAutomation = () => {
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
              <ShoppingCart className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              E-Commerce Sales Automation System
            </h1>
            <p className="text-xl text-muted-foreground">
              AI-Powered Sales Chatbot for a High-Volume Dropshipping Business
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              A Gemini-powered sales automation system that engages customers in real time,
              detects purchase intent, delivers personalized product recommendations, and
              recovers abandoned sessions — generating measurable revenue lift 24/7.
            </p>
          </header>

          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/ecommerce-chatbot.png"
              alt="E-Commerce Sales Automation System"
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
                A fast-growing dropshipping business was losing potential revenue at every
                stage of the customer journey — unanswered questions causing cart abandonment,
                no 24/7 engagement capability, and support costs scaling unsustainably with growth.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                I designed and implemented an AI-powered sales system using Gemini API and LangChain
                that handles the full customer conversation lifecycle — from initial product inquiry
                through purchase completion and post-sale support.
              </p>
            </div>

            {/* PROBLEM */}
            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <ShoppingCart className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The business was losing conversions at every point where customers needed
                    a timely, relevant response — and no manual process could scale to fix it.
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
                I built a structured conversational AI system that handles real buying scenarios —
                not a generic FAQ bot. Each message is classified by intent and routed to a
                specific response strategy designed to progress the customer toward a purchase.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">The system handles:</p>
              <ul className="space-y-2 pl-4">
                {solutionItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">&bull;</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONVERSATION PIPELINE */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Brain className="w-7 h-7 text-primary" />
                Conversation Pipeline
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Every customer message travels through a 6-stage pipeline — from receipt
                through intent classification, context retrieval, AI generation, response
                strategy application, and final delivery.
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
                <BarChart2 className="w-7 h-7 text-primary" />
                System Architecture
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Four distinct layers — channel, intelligence, business logic, and data —
                each with a clear responsibility that separates concerns and enables
                independent modification of any layer without breaking the others.
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

            {/* CONVERSATION FLOWS */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <ShoppingCart className="w-7 h-7 text-primary" />
                Conversation Flow Design
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Four distinct conversation flows handle the core buying scenarios — each
                with a specific trigger, action strategy, and measured outcome.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {conversationFlows.map((flow) => (
                  <Card key={flow.flow} className="p-5 bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                        <flow.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-2">{flow.flow}</h4>
                        <p className="text-xs text-foreground/50 mb-1"><span className="font-semibold text-foreground/70">Trigger:</span> {flow.trigger}</p>
                        <p className="text-xs text-foreground/50 mb-1"><span className="font-semibold text-foreground/70">Action:</span> {flow.action}</p>
                        <p className="text-xs text-primary/80 font-medium">{flow.outcome}</p>
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
                <TrendingUp className="w-7 h-7 text-primary" />
                Business Outcomes
              </h2>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardScreenshots.map((item) => (
                  <div key={item.label} className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
                    {item.src ? (
                      <img src={item.src} alt={item.label} className="w-full h-64 object-cover object-top" />
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
              <div className="w-full h-64 md:h-80 rounded-xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="w-7 h-7 text-primary ml-1" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground/60">Demo video coming soon</p>
                  <p className="text-xs text-foreground/40 mt-1">Live conversation demo — product inquiry → recommendation → conversion</p>
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
                    The system delivered measurable business results within the first month
                    of deployment — not just automation, but revenue-generating automation.
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
                onClick={() => window.open("https://saleschatbotfile.vercel.app/", "_blank")}
                size="lg"
                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
              >
                View Live Project &rarr;
              </Button>
            </div>

          </section>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudyEcommerceSalesAutomation;
