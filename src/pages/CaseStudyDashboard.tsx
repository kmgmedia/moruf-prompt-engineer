import {
  ArrowLeft,
  BarChart3,
  Target,
  Lightbulb,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const CaseStudyDashboard = () => {
  const navigate = useNavigate();
  const projectLink = "https://dashboard-auth-full-stack.vercel.app/";

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
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Project Tracker Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-Time Analytics & Workflow Management System
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/dashboard.png"
              alt="Project Tracker Dashboard"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-8">
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-foreground/90 leading-relaxed">
                A modern dashboard system designed to manage projects, visualize
                real-time data, and support efficient workflow tracking with
                high performance and scalability.
              </p>
            </div>

            {/* Challenge */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Building a production-ready dashboard requires careful
                    decisions around component architecture, state management,
                    performance optimization, and real-time data handling.
                    Without a structured approach, systems quickly become
                    difficult to scale and maintain.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    The goal was to design a system that is fast, reliable, and
                    maintainable while supporting real-time data updates and
                    secure user access.
                  </p>
                </div>
              </div>
            </Card>

            {/* Solution */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                The Solution
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                I designed and developed a responsive dashboard application with
                a focus on performance, scalability, and clean architecture.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                The system enables:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Real-time project tracking and data visualization
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Secure authentication and access control
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Efficient data handling with minimal latency
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Scalable component structure for long-term maintainability
                  </span>
                </li>
              </ul>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="space-y-3">
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Real-time data synchronization with live updates</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Secure authentication and protected routes using Supabase
                  </span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Clean and responsive UI optimized for usability</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Modular component architecture for scalability</span>
                </p>
              </div>
            </div>

            {/* System Design */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">System Design</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The application was built with a structured approach to
                    ensure maintainability and performance from the ground up.
                  </p>
                  <p className="text-foreground/90 leading-relaxed font-semibold mb-3">
                    This includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">
                        Component-based architecture for reusability and
                        scalability
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">
                        Efficient state and data flow management
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">
                        Optimized rendering to reduce unnecessary updates
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">
                        Performance-first design decisions for speed and
                        responsiveness
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The system delivered strong performance and usability
                    metrics:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Sub-200ms page load times
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Fully responsive across all devices
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Real-time updates without manual refresh
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Scalable architecture with minimal technical debt
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Technical Implementation */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                Technical Implementation
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                The system leverages modern frontend technologies and backend
                services to deliver a reliable and performant experience.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                This includes:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Secure authentication and session management
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Real-time data synchronization and efficient API usage
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Optimized UI rendering and state handling
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Clean deployment pipeline for production readiness
                  </span>
                </li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "React.js",
                  "TypeScript",
                  "Next.js",
                  "Tailwind CSS",
                  "Supabase",
                  "Vercel",
                  "Sonner",
                ].map((tech, i) => (
                  <Card
                    key={i}
                    className="p-3 bg-primary/5 border-primary/20 text-center"
                  >
                    <p className="font-semibold text-foreground text-sm">
                      {tech}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Structured Design Prevents Technical Debt
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Thoughtful architecture decisions made upfront eliminate
                      the need for costly refactoring later, keeping systems
                      maintainable and scalable.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Performance Built In From Day One
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Optimizations and performance considerations must be part
                      of the initial design, not added as an afterthought to
                      meet struggling systems.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Modern Tools Enable Rapid Development
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Using the right tech stack (React, Next.js, Supabase,
                      Tailwind) accelerates development without compromising
                      quality or maintainability.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Real-Time Data Requires Thoughtful Architecture
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Implementing real-time features successfully depends on
                      clean state management, efficient synchronization
                      patterns, and careful consideration of edge cases.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

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
              View Live Project →
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CaseStudyDashboard;
