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
              Project Tracker Dashboard: Real-Time Analytics with AI-Assisted
              Architecture
            </h1>
            <p className="text-xl text-muted-foreground">
              Building a production-ready dashboard with AI-driven component
              design and optimal performance
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

          <section className="space-y-6">
            {/* Challenge */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Building a modern dashboard from scratch involves countless
                    architectural decisions: component structure, state
                    management, performance optimization, and real-time data
                    syncing. Without a clear blueprint, teams risk creating
                    bloated, unmaintainable code. The goal was to create a
                    production-ready dashboard that is not only functional and
                    performant, but also demonstrates best practices in modern
                    React/Next.js development.
                  </p>
                </div>
              </div>
            </Card>

            {/* Approach */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                My Prompt Engineering Approach
              </h2>

              <div className="space-y-6 pl-4 border-l-4 border-primary/30">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    1. AI-Powered Component Architecture Design
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    I used strategic prompts to define optimal component
                    hierarchies before writing a single line of code. By asking
                    the AI to think through reusability, performance, and
                    maintainability, I ensured the component structure was
                    scalable from day one.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <code className="text-sm whitespace-pre-wrap">
                      {`Prompt: "Design React components for a project tracker dashboard. 
Focus on: 
- Reusability across different data types
- Performance (minimize re-renders)
- Type safety with TypeScript
- Accessibility standards
Output the component hierarchy, responsibilities, and data flow."`}
                    </code>
                  </Card>
                  <p className="text-sm text-foreground/80 mt-2">
                    <strong>Result:</strong> Clean, modular component structure
                    with zero tech debt
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    2. Prompt-Driven UI/UX Decision Framework
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Instead of guessing design patterns, I used systematic
                    prompts to evaluate UX decisions: layout choices, color
                    schemes, interactive elements, and information hierarchy.
                    This ensured every design choice was intentional and
                    evidence-based.
                  </p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        <strong>Layout:</strong> Why cards vs. tables vs. grids
                        for different data types
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        <strong>Interactions:</strong> When to use filters,
                        sorting, or real-time updates
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        <strong>Feedback:</strong> How to communicate loading
                        states and errors clearly
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    3. AI-Assisted Authentication Flow Optimization
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    I leveraged prompts to design secure, user-friendly
                    authentication patterns. The prompts helped me think through
                    edge cases, session management, and error states that are
                    often overlooked in rushed implementations.
                  </p>
                  <Card className="p-4 bg-muted/50 mt-3">
                    <code className="text-sm whitespace-pre-wrap">
                      {`Key patterns identified:
- Session persistence without compromising security
- Graceful error handling for network failures
- Protected routes and role-based access
- Logout cleanup and token invalidation`}
                    </code>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    4. Performance Optimization Through Structured Prompting
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    I used targeted prompts to identify performance bottlenecks
                    before they existed: lazy loading strategies, pagination vs.
                    infinite scroll, caching patterns, and real-time sync
                    efficiency.
                  </p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        Virtualization for large lists (only render visible
                        items)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        Smart caching to minimize API calls
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        Debounced search and filters
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Results */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <div className="space-y-3">
                    <p className="text-foreground/90 leading-relaxed">
                      The dashboard launched as a fully production-ready
                      application with exceptional performance and user
                      experience:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            Lightning-fast performance
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Sub-200ms page load times with real-time data
                            syncing
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            100% responsive design
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Seamless experience across all devices without
                            performance degradation
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            Secure authentication with Supabase
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Enterprise-grade security without complexity
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            Real-time data synchronization
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Live updates with no manual refresh required
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            Minimal technical debt
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Structured architecture enables easy feature
                            additions and maintenance
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tech Stack & Tools</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "React.js",
                  "TypeScript",
                  "Next.js",
                  "Tailwind CSS",
                  "Supabase",
                  "Vercel",
                  "Sonner",
                  "Component Architecture",
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

            {/* Takeaways */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 md:p-8 bg-muted/30">
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">1.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>
                        Architecture decisions should be intentional:
                      </strong>{" "}
                      Using AI prompts to evaluate component design before
                      coding eliminates large-scale refactoring and technical
                      debt later.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">2.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>
                        Performance should be built in, not added later:
                      </strong>{" "}
                      Strategic prompting about optimization patterns during
                      design phase results in inherently fast applications.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">3.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>AI helps think through edge cases:</strong>{" "}
                      Prompts systematically surface authentication, error
                      handling, and state management concerns that humans easily
                      overlook.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">4.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>
                        Modern tech stacks enable rapid development:
                      </strong>{" "}
                      Combining Next.js, Tailwind, and Supabase with thoughtful
                      architecture accelerates time-to-production without
                      sacrificing quality.
                    </p>
                  </li>
                </ol>
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
