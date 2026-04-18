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
              AI-Powered Educational Assistant System
            </h1>
            <p className="text-xl text-muted-foreground">
              Automating consistent, scaled responses for educators using
              structured AI workflows. Reduced teacher workload by 60%.
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
            {/* Features */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">
                        Generate Lesson Notes
                      </h3>
                      <p className="text-sm text-foreground/80">
                        Create structured, engaging lesson plans with learning
                        objectives and examples tailored to each grade level
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">
                        Write Student Reports
                      </h3>
                      <p className="text-sm text-foreground/80">
                        Generate professional progress reports that highlight
                        achievements, areas for growth, and personalized
                        encouragement
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                  <div className="flex items-start gap-3">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">
                        Draft Parent Messages
                      </h3>
                      <p className="text-sm text-foreground/80">
                        Compose personalized communication templates that
                        maintain your unique voice while saving hours of writing
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Manage Students</h3>
                      <p className="text-sm text-foreground/80">
                        View and access student data from Google Sheets with
                        analytics on performance and engagement
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Quick Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-6 bg-primary/5 border-primary/20 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    12
                  </p>
                  <p className="text-sm text-foreground/80">Total Students</p>
                </Card>
                <Card className="p-6 bg-primary/5 border-primary/20 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    82.5
                  </p>
                  <p className="text-sm text-foreground/80">Average Score</p>
                </Card>
                <Card className="p-6 bg-primary/5 border-primary/20 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    11
                  </p>
                  <p className="text-sm text-foreground/80">Subjects</p>
                </Card>
              </div>
            </div>

            {/* Challenge */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Teachers at Sandton Prep were spending 4-6 hours weekly on
                    administrative tasks: writing personalized lesson notes,
                    composing student progress reports, and crafting parent
                    communication emails. This time drain meant less time for
                    actual teaching and one-on-one student engagement. They
                    needed a solution that could maintain their unique voice and
                    professionalism while dramatically reducing repetitive work.
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
                    I designed an AI-powered conversational system that acts as
                    a structured teaching assistant. Rather than generic chatbot
                    responses, this system uses carefully designed prompts,
                    contextual instruction, and role-based behavior to deliver
                    consistent, high-quality outputs.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    The system automates three core workflows:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 text-foreground/90">
                    <li>
                      Generating personalized lesson plans with learning
                      objectives
                    </li>
                    <li>Writing authentic student progress reports</li>
                    <li>
                      Composing parent communication that maintains teacher
                      voice
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Approach */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                How It Works: Structured Prompt Engineering
              </h2>

              <div className="space-y-6 pl-4 border-l-4 border-primary/30">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    1. Multi-Step Prompting for Context Awareness
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Instead of a single prompt, I designed a multi-step system
                    where the AI first gathers essential context about the
                    lesson, student, or communication purpose, then generates
                    tailored content.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <code className="text-sm whitespace-pre-wrap">
                      {`Step 1: "What is the topic and grade level?"
Step 2: "What key concepts should be covered?"
Step 3: "What learning objectives should students meet?"
Step 4: Generate personalized lesson notes with examples relevant to the grade level`}
                    </code>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    2. Persona-Based Prompting for Authentic Voice
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    I created detailed persona prompts that captured each
                    teacher's unique communication style, values, and
                    pedagogical approach. This ensured the AI-generated content
                    felt authentic and maintained the teacher's individual voice
                    rather than sounding generic.
                  </p>
                  <Card className="p-4 bg-muted/50 mt-3">
                    <code className="text-sm whitespace-pre-wrap">
                      {`"You are Ms. Chen, a compassionate 4th grade teacher who believes in 
nurturing student confidence. You use encouraging language, celebrate 
small wins, and write with warmth while maintaining professionalism. 
Your communication style is clear, friendly, and never patronizing."`}
                    </code>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    3. Style-Tuning for Professional Consistency
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    I fine-tuned prompts to maintain consistent tone,
                    vocabulary, and formatting across all generated documents.
                    This included specific instructions for tone (friendly yet
                    professional), formality level, and structural preferences.
                  </p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        <strong>Tone:</strong> Warm, professional, never
                        condescending
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        <strong>Format:</strong> Use bullet points for clarity,
                        specific examples
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        <strong>Length:</strong> Concise but comprehensive,
                        respects parent reading time
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    4. Template Integration with Dynamic Content
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    I built Streamlit app that combined pre-made templates with
                    AI-generated dynamic content, allowing teachers to quickly
                    customize and export documents. This reduced implementation
                    time from hours to minutes.
                  </p>
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
                      The AI assistant was deployed across Sandton Prep and
                      delivered measurable impact within 3 months:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            60% reduction in writing time
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Teachers reduced weekly administrative time from 4-6
                            hours to 1-2 hours
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            95% consistency in tone and professionalism
                          </p>
                          <p className="text-foreground/80 text-sm">
                            All generated documents maintained authentic teacher
                            voice and quality standards
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            Improved parent communication frequency
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Teachers sent 40% more parent updates due to ease of
                            use
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            Reclaimed 10+ hours per teacher monthly
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Enabled focus on lesson planning, student
                            interaction, and professional development
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
                  "Python",
                  "Gemini API",
                  "Google Sheets",
                  "Streamlit",
                  "Prompt Engineering",
                  "Template Design",
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
                      <strong>Persona prompting is essential:</strong> Detailed
                      prompts that capture voice and values produce content that
                      feels authentic and maintains the human touch.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">2.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>
                        Multi-step prompts outperform single prompts:
                      </strong>{" "}
                      Breaking complex tasks into sequential steps yields more
                      contextually appropriate and nuanced results.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">3.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>UI/UX matters for adoption:</strong> Even great AI
                      needs an intuitive interface. Streamlit templates and
                      quick workflows meant 100% teacher adoption within a week.
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
