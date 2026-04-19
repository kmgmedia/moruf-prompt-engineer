import {
  ArrowLeft,
  Zap,
  Clock,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
const CaseStudyTeacherAI = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
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
              <Zap className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Workflow Automation
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Automating Repetitive Work with Intelligent Workflow Systems
            </h1>
            <p className="text-xl text-muted-foreground">
              How to replace manual effort with structured AI automation
            </p>
          </header>
          <div className="w-full h-1 bg-gradient-primary rounded-full" />
          <section className="space-y-6">
            <Card className="p-6 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    The Problem: Manual Work Kills Time and Consistency
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Teams spend hours on repetitive work:
                  </p>
                  <ul className="space-y-2 text-foreground/90 ml-4">
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Writing the same content repeatedly</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Repeating the same processes manually</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Managing tasks that could be automated</span>
                    </li>
                  </ul>
                  <div className="mt-6 space-y-2 border-l-4 border-destructive/50 pl-4">
                    <p className="text-foreground/90 font-semibold">
                      This leads to:
                    </p>
                    <ul className="space-y-2 text-foreground/90">
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Wasted time</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Inconsistent output</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Slower operations</span>
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
                    The Solution: AI-Powered Workflow Systems
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I design intelligent workflow systems that:
                  </p>
                  <ul className="space-y-3 text-foreground/90">
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Automate repetitive tasks</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Structure how information is created and processed
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Ensure consistency across all operations</span>
                    </li>
                  </ul>
                  <p className="text-foreground/90 leading-relaxed mt-4 font-semibold">
                    These systems don't just "assist" — they replace manual
                    effort with structured automation.
                  </p>
                </div>
              </div>
            </Card>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Gauge className="w-8 h-8 text-primary" />
                What This Looks Like
              </h2>
              <Card className="p-6 bg-muted/30 space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Automated content and document generation
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Structured workflows for internal operations
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      AI-assisted task execution pipelines
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Systems that maintain tone, format, and consistency
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
                    Reduce manual workload significantly
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Free up your team from repetitive tasks
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Save hours every week
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Automated processes handle what used to take days
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Improve consistency and quality
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Standardized outputs across all operations
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Focus on higher-value work
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Teams spend time on strategy, not repetition
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
                    title: "Map your current workflow",
                    desc: "Understand existing processes and pain points",
                  },
                  {
                    num: 2,
                    title: "Identify repetitive bottlenecks",
                    desc: "Find where automation can have the biggest impact",
                  },
                  {
                    num: 3,
                    title: "Design structured AI flows",
                    desc: "Build workflows that maintain consistency",
                  },
                  {
                    num: 4,
                    title: "Integrate with your existing tools",
                    desc: "Connect to your current systems seamlessly",
                  },
                  {
                    num: 5,
                    title: "Test, refine, and optimize",
                    desc: "Continuously improve based on real-world usage",
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
            <div className="pt-8 border-t border-border">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Reduce Manual Work?
              </h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Want to reduce manual work in your workflow? Let's design a
                system that handles it for you.
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
export default CaseStudyTeacherAI;
