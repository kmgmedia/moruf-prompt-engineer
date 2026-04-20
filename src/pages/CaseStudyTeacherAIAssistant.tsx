import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  GraduationCap,
  Layers,
  Lightbulb,
  Settings,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

const solutionItems = [
  "Generate structured lesson notes tailored to each grade level",
  "Create consistent and professional student progress reports",
  "Draft personalized parent communication quickly and efficiently",
];

const keyFeatures = [
  "Automated lesson note generation with structured learning objectives",
  "Consistent student report creation with personalized insights",
  "Streamlined parent communication with tone-controlled outputs",
  "Integration with Google Sheets for student data access and tracking",
];

const impactItems = [
  "60% reduction in administrative writing time",
  "40% increase in parent communication frequency",
  "Consistent tone and quality across all generated content",
  "10+ hours saved per teacher monthly",
];

const implementationItems = [
  "Context-aware input handling for lesson, student, and communication data",
  "Role-based behavior design to maintain consistent tone and style",
  "Multi-step processing to generate accurate and structured responses",
  "Template-driven output formatting for usability and clarity",
];

const tools = ["Python", "Gemini API", "Google Sheets Integration", "Streamlit"];

const CaseStudyTeacherAIAssistant = () => {
  const navigate = useNavigate();
  const projectLink = "https://teacher-ai-assistant-cr.streamlit.app/";

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
              <GraduationCap className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI Teaching Assistant & Workflow System
            </h1>
            <p className="text-xl text-muted-foreground">
              Reducing administrative workload and improving communication consistency
              for educators at scale.
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/teacher-ai.png"
              alt="AI Teaching Assistant Workflow System"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-6">
            <Card className="p-6 bg-card border-primary/20">
              <div className="flex items-start gap-4">
                <Briefcase className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Overview</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Teachers at Sandton Preparatory School needed a way to reduce
                    repetitive administrative tasks while maintaining high-quality,
                    personalized communication with students and parents.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-4">
                <Wrench className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Teachers were spending 4-6 hours weekly on tasks such as writing
                    lesson notes, student reports, and parent communication. This
                    reduced time available for actual teaching and student engagement.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Solution</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    I designed and implemented an AI-powered system that automates
                    key teaching workflows while preserving each teacher's unique
                    voice and communication style.
                  </p>
                  <p className="text-foreground/90 leading-relaxed mt-4 mb-3">
                    The system enables teachers to:
                  </p>
                  <ul className="space-y-2">
                    {solutionItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-foreground/90">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-muted/30 border-border">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-foreground/90">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-card border-primary/20">
              <div className="flex items-start gap-4">
                <Layers className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">System Design</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The solution combines AI processing, structured workflows, and a
                    simple user interface to ensure ease of use and scalability.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Teachers interact with the system through a Streamlit-based
                    interface, where inputs are processed and transformed into
                    structured outputs using controlled AI logic and predefined
                    templates.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h2 className="text-2xl font-bold mb-2">Results & Impact</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The system delivered measurable improvements within 3 months:
              </p>
              <ul className="space-y-3">
                {impactItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground/90">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-muted/40 border-border">
              <div className="flex items-start gap-4">
                <Settings className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Technical Implementation</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    At the core of the system is a structured AI workflow that
                    ensures reliable and context-aware outputs.
                  </p>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    This includes:
                  </p>
                  <ul className="space-y-2">
                    {implementationItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-foreground/90">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tools.map((tool, i) => (
                  <Card
                    key={i}
                    className="p-3 bg-primary/5 border-primary/20 text-center"
                  >
                    <p className="font-semibold text-foreground text-sm">
                      {tool}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      AI Integration Should Start With Workflow Design
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      AI delivers the best results when it is embedded into clear
                      operational workflows instead of being used as a standalone
                      tool.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Structured Inputs Produce Reliable Outputs
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Context-aware inputs and template-driven formatting make
                      generated content more consistent, practical, and easy for
                      teachers to use.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Adoption Depends on Simplicity
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      A simple interface and familiar workflow reduce friction,
                      helping educators adopt the system quickly in day-to-day
                      classroom operations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Controlled AI Can Deliver Measurable Impact
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Combining role-based behavior, workflow logic, and quality
                      controls leads to real gains in time savings and communication
                      quality.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

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
          </section>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudyTeacherAIAssistant;