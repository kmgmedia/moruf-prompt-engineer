import {
  ArrowLeft,
  Zap,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
const CaseStudyEcommerceSalesAutomation = () => {
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
                System Integration
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Connecting Your Tools into One Intelligent System
            </h1>
            <p className="text-xl text-muted-foreground">
              Eliminate manual handoffs and sync data across your entire
              operation
            </p>
          </header>
          <div className="w-full h-1 bg-gradient-primary rounded-full" />
          <section className="space-y-6">
            <Card className="p-6 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    The Problem: Disconnected Tools and Systems
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Most businesses use multiple tools:
                  </p>
                  <ul className="space-y-2 text-foreground/90 ml-4">
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>CRM systems</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Analytics dashboards</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Messaging platforms</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Spreadsheets and databases</span>
                    </li>
                  </ul>
                  <div className="mt-6 space-y-2 border-l-4 border-destructive/50 pl-4">
                    <p className="text-foreground/90 font-semibold">
                      But they don't talk to each other.
                    </p>
                    <p className="text-foreground/90 mt-3 font-semibold">
                      Result:
                    </p>
                    <ul className="space-y-2 text-foreground/90">
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Manual data entry</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Duplicated work</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-destructive">○</span>
                        <span>Disconnected systems with no visibility</span>
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
                    The Solution: Connected System Architecture
                  </h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I build systems that:
                  </p>
                  <ul className="space-y-3 text-foreground/90">
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Connect your tools through APIs</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Automate data flow between platforms</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Eliminate manual handoffs completely</span>
                    </li>
                  </ul>
                  <p className="text-foreground/90 leading-relaxed mt-4 font-semibold">
                    Everything becomes one connected system instead of scattered
                    tools.
                  </p>
                </div>
              </div>
            </Card>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <GitBranch className="w-8 h-8 text-primary" />
                What This Looks Like
              </h2>
              <Card className="p-6 bg-muted/30 space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      API integrations between all platforms
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Automated data syncing in real-time
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Backend systems that orchestrate workflows
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-foreground/90">
                      Real-time updates across all tools
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
                    Eliminate repetitive data entry
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Data syncs automatically across systems
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Save hours of manual work weekly
                  </p>
                  <p className="text-sm text-muted-foreground">
                    No more manual data transfers or updates
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Improve data accuracy
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Single source of truth across all tools
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    Create real-time visibility
                  </p>
                  <p className="text-sm text-muted-foreground">
                    See your entire operation at a glance
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
                    title: "Analyze your current tools and stack",
                    desc: "Understand what you're currently using",
                  },
                  {
                    num: 2,
                    title: "Identify integration gaps",
                    desc: "Find where manual work and disconnections exist",
                  },
                  {
                    num: 3,
                    title: "Design system architecture",
                    desc: "Build a blueprint for your connected system",
                  },
                  {
                    num: 4,
                    title: "Build and connect APIs",
                    desc: "Implement integrations and data flows",
                  },
                  {
                    num: 5,
                    title: "Deploy and monitor",
                    desc: "Launch system and ensure continuous operation",
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
                Tired of Switching Between Tools?
              </h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Tired of switching between tools and doing things manually?
                Let's connect your systems properly.
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
export default CaseStudyEcommerceSalesAutomation;
