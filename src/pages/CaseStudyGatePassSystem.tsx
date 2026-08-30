import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart2,
  Camera,
  CheckCircle2,
  Clock,
  GitBranch,
  Lightbulb,
  Play,
  ScanLine,
  Shield,
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
  keyFeatures,
  howItWorksSteps,
  operationsFlow,
  architectureLayers,
  apiEndpoints,
  scalabilityPoints,
  impactItems,
  implementationItems,
  tools,
  takeaways,
  dashboardScreenshots,
} from "@/data/gatepassSystemData";

const CaseStudyGatePassSystem = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Helmet>
        <title>GatePass Digital Access Control System | Moruf Adebola</title>
        <meta name="description" content="Case study: Digital gate pass management system with QR scanning, real-time API, and role-based access control for secure facility management." />
        <link rel="canonical" href="https://www.morufstackdev.com.ng/case-study/gatepass-system" />
        <meta property="og:url" content="https://www.morufstackdev.com.ng/case-study/gatepass-system" />
        <meta property="og:title" content="GatePass Digital Access Control System | Moruf Adebola" />
        <meta property="og:description" content="Case study: Digital gate pass management system with QR scanning, real-time API, and role-based access control for secure facility management." />
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
              <ScanLine className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">GatePass System</h1>
            <p className="text-xl text-muted-foreground">Smart Event Access & Guest Verification System</p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              An operational event access platform designed to streamline guest check-in, improve
              event entry coordination, and reduce gate management chaos during live events.
            </p>
          </header>

          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/gatepass-system.png"
              alt="GatePass System dashboard"
              className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-12">

            {/* OVERVIEW */}
            <div className="space-y-3 pt-2">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-foreground/90 leading-relaxed">
                Managing guest entry at large events often becomes chaotic due to manual verification
                processes, overcrowding, unverified attendees, and poor coordination between event
                organizers and gate personnel.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Traditional methods such as printed guest lists, manual name confirmation, and
                unstructured gate operations slow down event entry and create poor guest experiences.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                GatePass System was designed to modernize event access operations through QR-based
                guest verification, real-time attendance tracking, and operational check-in workflows.
              </p>
            </div>

            {/* PROBLEM */}
            <Card className="p-6 md:p-8 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <BadgeCheck className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Event organizers and planners frequently struggle with inefficient guest entry
                    systems that lead to delays, overcrowding, and unauthorized access.
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
                I designed and implemented a smart event check-in and guest verification system
                focused on improving operational efficiency during live events.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">The system enables event teams to:</p>
              <ul className="space-y-2 pl-4">
                {solutionItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">&bull;</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HOW IT WORKS */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-primary" />
                How It Works
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The GatePass system follows a structured 6-step operational flow: from guest
                registration before the event to post-event reporting.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {howItWorksSteps.map((step) => (
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

            {/* EVENT OPERATIONS FLOW */}
            <div className="space-y-6 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Clock className="w-7 h-7 text-primary" />
                Event Operations Flow
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Every event runs through three distinct operational phases, each with clearly defined tasks and outcomes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {operationsFlow.map((phase, index) => (
                  <div key={phase.phase} className="relative">
                    <Card className="p-5 bg-primary/5 border-primary/20 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">{index + 1}</span>
                        </div>
                        <h4 className="font-bold text-foreground">{phase.phase}</h4>
                      </div>
                      <ul className="space-y-2">
                        {phase.steps.map((step) => (
                          <li key={step} className="flex items-start gap-2 text-sm text-foreground/80">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                    {index < operationsFlow.length - 1 && (
                      <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SYSTEM ARCHITECTURE */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <GitBranch className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-1">System Architecture</h2>
                  <p className="text-foreground/80 text-sm">
                    Three-layer architecture connecting the client interface, API logic, and data storage.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {architectureLayers.map((layer, index) => (
                  <div key={layer.layer}>
                    <Card className={`p-4 border ${layer.color}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <layer.icon className={`w-5 h-5 ${layer.textColor}`} />
                        <span className={`text-sm font-bold uppercase tracking-wider ${layer.textColor}`}>
                          {layer.layer}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {layer.components.map((comp) => (
                          <span key={comp} className={`text-xs px-3 py-1.5 rounded-full border font-medium ${layer.color} ${layer.textColor}`}>
                            {comp}
                          </span>
                        ))}
                      </div>
                    </Card>
                    {index < architectureLayers.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowRight className="w-4 h-4 text-primary rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-foreground/75 text-sm mt-4 leading-relaxed">
                Designed to support scalable event operations while maintaining fast verification
                speed during high-volume guest entry periods.
              </p>
            </Card>

            {/* API MAP */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Shield className="w-7 h-7 text-primary" />
                API Map
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Six core REST endpoints covering event management, guest registration, check-in
                verification, and attendance reporting.
              </p>
              <div className="space-y-3">
                {apiEndpoints.map((api) => (
                  <Card key={api.endpoint} className="p-4 bg-muted/20 border-border/50 hover:border-primary/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded border w-fit ${api.color}`}>
                        {api.method}
                      </span>
                      <code className="text-sm font-mono text-primary font-semibold">{api.endpoint}</code>
                      <span className="text-sm text-foreground/70 sm:ml-auto">{api.description}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* DASHBOARD SCREENSHOTS */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Camera className="w-7 h-7 text-primary" />
                Dashboard Screenshots
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The GatePass dashboard gives event organizers a live view of gate activity,
                attendance counts, and check-in status across all entry points.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardScreenshots.map((label) => (
                  <div key={label} className="h-48 rounded-xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                    <Camera className="w-8 h-8 opacity-30" />
                    <span className="text-sm font-medium opacity-60">{label}</span>
                    <span className="text-xs opacity-40">Screenshot coming soon</span>
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
                Watch the GatePass system in action: from QR code generation through live event
                check-in and post-event reporting.
              </p>
              <div className="w-full h-64 md:h-80 rounded-xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="w-7 h-7 text-primary ml-1" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground/60">Demo video coming soon</p>
                  <p className="text-xs text-foreground/40 mt-1">Full walkthrough of the GatePass event workflow</p>
                </div>
              </div>
            </div>

            {/* SCALABILITY */}
            <div className="space-y-5 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-primary" />
                Scalability
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                GatePass was architected to handle events of any size, from intimate private
                gatherings to large-scale public events with thousands of simultaneous check-ins.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scalabilityPoints.map((point) => (
                  <Card key={point.title} className="p-5 bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <point.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">{point.title}</h4>
                        <p className="text-sm text-foreground/75 leading-relaxed">{point.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* RESULTS & IMPACT */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The system improved event entry operations by reducing manual verification
                    processes and creating a more structured guest access experience.
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

            {/* TECHNICAL IMPLEMENTATION */}
            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                Technical Implementation
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Built around operational reliability, fast access verification, and scalable event workflows.
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

            {/* TECH STACK */}
            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                <div className="space-y-4">
                  {takeaways.map((takeaway) => (
                    <div key={takeaway.title}>
                      <h4 className="font-semibold text-lg mb-2 text-primary">{takeaway.title}</h4>
                      <p className="text-foreground/90 text-sm leading-relaxed">{takeaway.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="pt-8 border-t border-border">
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

export default CaseStudyGatePassSystem;
