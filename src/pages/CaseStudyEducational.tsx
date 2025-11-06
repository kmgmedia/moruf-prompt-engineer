import { ArrowLeft, BookOpen, Target, Lightbulb, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CaseStudyEducational = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <article className="space-y-8 animate-fade-in">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Designing AI Prompts That Teach: My Approach to Educational Bots
            </h1>
            <p className="text-xl text-muted-foreground">
              A deep dive into creating conversational AI that genuinely educates rather than just responds.
            </p>
          </header>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Traditional chatbots often feel robotic and impersonal, especially in educational contexts. 
                    The challenge was to create an AI assistant that doesn't just answer questions but actively 
                    engages students in the learning process, adapting to their pace and understanding level.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                My Approach
              </h2>
              
              <div className="space-y-6 pl-4 border-l-4 border-primary/30">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">1. Persona-Based Prompting</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Instead of generic AI responses, I crafted detailed persona prompts like "You are an experienced 
                    elementary school teacher who uses simple language and encourages curiosity." This immediately 
                    shifts the AI's tone to be more nurturing and age-appropriate.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <code className="text-sm">
                      "You are a patient primary school educator with 10 years of experience. You explain 
                      concepts using simple analogies that children can relate to their daily lives. You never 
                      talk down to students but make them feel smart and capable."
                    </code>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">2. Scaffolded Learning Framework</h3>
                  <p className="text-foreground/90 leading-relaxed">
                    I implemented a multi-step prompting system where the AI first assesses the student's current 
                    understanding, then builds upon that knowledge incrementally. This prevents overwhelming students 
                    with information they're not ready for.
                  </p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">Check for prior knowledge before introducing new concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">Break complex topics into digestible chunks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">Use confirmation questions to ensure understanding</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">3. Socratic Method Integration</h3>
                  <p className="text-foreground/90 leading-relaxed">
                    Rather than simply providing answers, I programmed the bot to ask guiding questions that lead 
                    students to discover answers themselves. This promotes critical thinking and deeper retention.
                  </p>
                  <Card className="p-4 bg-muted/50 mt-3">
                    <p className="text-sm mb-2 font-semibold">Example Exchange:</p>
                    <p className="text-sm mb-1"><strong>Student:</strong> "Why do leaves change color?"</p>
                    <p className="text-sm"><strong>AI:</strong> "Great question! Before we explore that, what do you think leaves need to stay green? Think about what plants need to grow..."</p>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">4. Adaptive Tone Management</h3>
                  <p className="text-foreground/90 leading-relaxed">
                    I fine-tuned the prompts to detect when students are frustrated or confused and automatically 
                    adjust the complexity level and encouragement. The bot becomes more supportive when it senses 
                    struggle and more challenging when students demonstrate mastery.
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <div className="space-y-3">
                    <p className="text-foreground/90 leading-relaxed">
                      The educational bot was deployed in three pilot schools and showed remarkable results:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1 font-bold">✓</span>
                        <span className="text-foreground/90"><strong>85% of students</strong> reported feeling more confident asking questions to the AI than in traditional classroom settings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1 font-bold">✓</span>
                        <span className="text-foreground/90"><strong>Teachers saved 4-6 hours per week</strong> on creating personalized learning materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1 font-bold">✓</span>
                        <span className="text-foreground/90"><strong>40% increase in homework completion rates</strong> as students had 24/7 access to learning support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">1.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Context is everything:</strong> The more detailed your persona prompt, the more natural 
                      and effective the AI's teaching style becomes.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">2.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Questions over answers:</strong> AI that asks questions creates better learners than 
                      AI that simply provides information.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">3.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Adapt in real-time:</strong> Building feedback loops into your prompts allows the AI 
                      to adjust its approach based on student responses.
                    </p>
                  </li>
                </ol>
              </Card>
            </div>
          </section>

          <div className="pt-8 border-t border-border">
            <Button 
              onClick={() => navigate('/')}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Case Studies
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CaseStudyEducational;