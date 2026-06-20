import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
const CaseStudyEmotionalAI = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Conversational AI & Decision Support Systems | Moruf Adebola</title>
        <meta name="description" content="Case study: AI systems for real-time intelligent conversations and decision support, designed for customer service automation and emotional context handling." />
        <link rel="canonical" href="https://www.morufdesigndev.com/case-study/emotional-ai" />
        <meta property="og:url" content="https://www.morufdesigndev.com/case-study/emotional-ai" />
        <meta property="og:title" content="Conversational AI & Decision Support Systems | Moruf Adebola" />
        <meta property="og:description" content="Case study: AI systems for real-time intelligent conversations and decision support, designed for customer service automation and emotional context handling." />
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
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Conversational AI
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI Systems That Handle Conversations and Support Decisions
            </h1>
            <p className="text-xl text-muted-foreground">
              Building intelligent systems for real-time conversations and
              smarter decision-making
            </p>
          </header>
          <div className="w-full h-1 bg-gradient-primary rounded-full" />
          <section className="space-y-6">
            <Card className="p-6 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    The Problem: Lost Opportunities and Manual Effort
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Businesses lose time and opportunities because:
                  </p>
                  <ul className="space-y-2 text-foreground/90 ml-4">
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>
                        Customer questions aren't answered fast enough
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Conversations lack consistency</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Decisions rely too much on manual effort</span>
                    </li>
                  </ul>
                  <div className="mt-6 space-y-2 border-l-4 border-destructive/50 pl-4">
                    <p className="text-foreground/90 font-semibold">
                      The cost?
                    </p>
                    <ul className="space-y-2 text-foreground/90">
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Lost customer engagement and sales</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Inefficient decision-making</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Inability to scale operations</span>
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
                    The Solution: Intelligent Conversational Systems
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I build AI systems that:
                  </p>
                  <ul className="space-y-3 text-foreground/90">
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Handle conversations in real-time</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Generate structured, context-aware responses</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Support decision-making with intelligent outputs
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 space-y-3">
                    <p className="text-foreground/90 font-semibold">
                      These systems are designed to be:
                    </p>
                    <div className="grid md:grid-cols-3 gap-3 text-foreground/90">
                      <div className="flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>Reliable and consistent</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>Scalable at any size</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-primary font-bold">→</span>
                        <span>Context-aware and smart</span>
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
                      AI chatbots and virtual assistants
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Automated response systems
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Context-aware conversation flows
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Systems that generate insights based on input
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
                    Faster response times
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Instant answers to customer inquiries 24/7
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Improved user engagement
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Better conversations that keep users engaged
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Consistent communication
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Same quality and tone across all interactions
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Better decision support
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Systems that generate intelligent insights
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
                    title: "Define conversation goals",
                    desc: "Understand what the system needs to accomplish",
                  },
                  {
                    num: 2,
                    title: "Design interaction flows",
                    desc: "Plan how users will interact with the system",
                  },
                  {
                    num: 3,
                    title: "Implement context + memory handling",
                    desc: "Build systems that remember context in conversations",
                  },
                  {
                    num: 4,
                    title: "Integrate into your platform",
                    desc: "Connect system to your website or app",
                  },
                  {
                    num: 5,
                    title: "Test and refine responses",
                    desc: "Continuously improve based on real interactions",
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
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Conversation Quality Directly Affects Growth
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Fast, consistent, and context-aware interactions improve
                      user engagement and reduce lost opportunities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Context Awareness Is Essential for Reliability
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      AI systems perform better when they preserve context and
                      respond based on structured intent and conversation state.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Scalable AI Requires Defined Interaction Flows
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Clear flow design improves response consistency and makes
                      conversational systems easier to maintain at scale.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Decision Support Improves With Structured Outputs
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Systems that return actionable, well-formed outputs help
                      teams make better decisions with less manual effort.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="pt-8 border-t border-border">
              <h2 className="text-2xl font-bold mb-4">
                Need a System That Actually Works?
              </h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Need a system that can handle conversations or assist decisions?
                Let's build one that actually works.
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
export default CaseStudyEmotionalAI;
