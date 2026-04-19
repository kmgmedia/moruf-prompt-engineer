import {
  ArrowLeft,
  Zap,
  Target,
  Lightbulb,
  TrendingUp,
  Clock,
  Users,
  BookOpen,
  FileText,
  Mail,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const CaseStudyTeacherAI = () => {
  const navigate = useNavigate();
  const projectLink = "https://teacher-ai-assistant-cr.streamlit.app/";

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
              <Zap className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI Teaching Assistant & Workflow System
            </h1>
            <p className="text-xl text-muted-foreground">
              Reducing administrative workload and improving communication
              consistency for educators at scale.
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/teacher-ai.png"
              alt="AI Assistant for Teachers Interface"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-6">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Overview</h2>
              <p className="text-foreground/90 leading-relaxed">
                Teachers at Sandton Preparatory School needed a way to reduce
                repetitive administrative tasks while maintaining high-quality,
                personalized communication with students and parents.
              </p>
            </div>

            {/* Challenge */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Teachers were spending 4–6 hours weekly on tasks such as
                    writing lesson notes, student reports, and parent
                    communication. This reduced time available for actual
                    teaching and student engagement.
                  </p>
                </div>
              </div>
            </Card>

            {/* Solution */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Solution</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I designed and implemented an AI-powered system that
                    automates key teaching workflows while preserving each
                    teacher's unique voice and communication style.
                  </p>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The system enables teachers to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground/90">
                    <li>
                      Generate structured lesson notes tailored to each grade
                      level
                    </li>
                    <li>
                      Create consistent and professional student progress
                      reports
                    </li>
                    <li>
                      Draft personalized parent communication quickly and
                      efficiently
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Key Features */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4 pl-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Automated lesson note generation with structured learning
                      objectives
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Consistent student report creation with personalized
                      insights
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Streamlined parent communication with tone-controlled
                      outputs
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Integration with Google Sheets for student data access and
                      tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Design */}
            <Card className="p-6 bg-muted/30 border-primary/10">
              <h2 className="text-2xl font-bold mb-4">System Design</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The solution combines AI processing, structured workflows, and a
                simple user interface to ensure ease of use and scalability.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Teachers interact with the system through a Streamlit-based
                interface, where inputs are processed and transformed into
                structured outputs using controlled AI logic and predefined
                templates.
              </p>
            </Card>

            {/* Approach */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                Technical Implementation
              </h2>

              <p className="text-foreground/90 leading-relaxed">
                At the core of the system is a structured AI workflow that
                ensures reliable and context-aware outputs.
              </p>

              <Card className="p-6 bg-muted/30 border-primary/10">
                <p className="text-foreground/90 leading-relaxed mb-4">
                  This includes:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground/90">
                      Context-aware input handling for lesson, student, and
                      communication data
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground/90">
                      Role-based behavior design to maintain consistent tone and
                      style
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground/90">
                      Multi-step processing to generate accurate and structured
                      responses
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground/90">
                      Template-driven output formatting for usability and
                      clarity
                    </span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Results */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The system delivered measurable improvements within 3
                    months:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold text-lg">✓</span>
                      <div>
                        <p className="font-bold text-foreground">
                          60% reduction in administrative writing time
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold text-lg">✓</span>
                      <div>
                        <p className="font-bold text-foreground">
                          40% increase in parent communication frequency
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold text-lg">✓</span>
                      <div>
                        <p className="font-bold text-foreground">
                          Consistent tone and quality across all generated
                          content
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold text-lg">✓</span>
                      <div>
                        <p className="font-bold text-foreground">
                          10+ hours saved per teacher monthly
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Python",
                  "Gemini API",
                  "Google Sheets Integration",
                  "Streamlit",
                ].map((tech, i) => (
                  <Card
                    key={i}
                    className="p-3 bg-primary/5 border-primary/20 text-center"
                  >
                    <p className="font-semibold text-foreground">{tech}</p>
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
                      <strong>AI systems solve real problems:</strong> This
                      project demonstrates how AI can be integrated into
                      real-world workflows to reduce manual effort, improve
                      consistency, and scale operations without sacrificing
                      quality.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">2.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>System design matters:</strong> The combination of
                      system design, user experience, and controlled AI behavior
                      is critical to delivering reliable and practical
                      solutions.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">3.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Workflow automation scales impact:</strong> By
                      automating repetitive processes, we free teams to focus on
                      higher-value work while maintaining quality and
                      consistency.
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

export default CaseStudyTeacherAI;
