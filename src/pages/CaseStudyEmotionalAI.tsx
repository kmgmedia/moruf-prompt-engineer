import { ArrowLeft, Heart, Brain, Sparkles, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const CaseStudyEmotionalAI = () => {
  const navigate = useNavigate();

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
              <Heart className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Crafting Emotionally Intelligent AI: Making Content Resonate
            </h1>
            <p className="text-xl text-muted-foreground">
              How prompt engineering transforms generic AI writing into emotionally resonant content. 156% increase in engagement and conversion.
            </p>
          </header>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Brain className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    AI can write grammatically perfect sentences, but can it make you feel something? Most AI-generated content is technically correct but emotionally hollow—it fails to capture the warmth of a handwritten note, the urgency of breaking news, or the genuine excitement of a product launch.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Content without emotional resonance doesn't convert. Brands using generic AI writing see flat engagement, poor email open rates, and readers who skim but never truly connect. The gap between technically sound and genuinely moving is where most AI fails.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Solution</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I developed a comprehensive emotional intelligence framework for AI writing that bridges this gap. Rather than asking for generic content, this system uses psychology-informed prompting techniques to inject genuine emotional resonance into every piece of copy.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    The approach combines five key techniques: emotion-first prompting, narrative arc engineering, sensory language anchoring, vulnerability injection, and micro-moment targeting. Each technique is designed to unlock the emotional potential within AI-generated content.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                How It Works: Emotional Intelligence Framework
              </h2>

              <p className="text-foreground/90 leading-relaxed">
                Emotional AI writing isn't about adding more adjectives or using exclamation points. It's about understanding the psychology of communication and encoding that into your prompts. Here's my proven framework with five core techniques:
              </p>

              <div className="space-y-6 pl-4 border-l-4 border-primary/30 mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    1. Emotion-First Prompting
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Instead of asking AI to write about a topic, start by specifying the emotional journey you want readers to experience.
                  </p>
                  <div className="space-y-3">
                    <Card className="p-4 bg-destructive/10 border-destructive/30">
                      <p className="text-sm font-semibold mb-2 text-destructive">
                        ❌ Standard Prompt:
                      </p>
                      <code className="text-xs">
                        "Write a product description for noise-canceling headphones."
                      </code>
                    </Card>
                    <Card className="p-4 bg-primary/10 border-primary/30">
                      <p className="text-sm font-semibold mb-2 text-primary">
                        ✓ Emotion-First Prompt:
                      </p>
                      <code className="text-xs">
                        "Write a product description that makes the reader feel the relief and peace of escaping from constant noise. Use sensory language that evokes calm and focus."
                      </code>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    2. Narrative Arc Engineering
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Every piece of writing has a story structure. Explicitly defining this arc in your prompt creates emotional momentum.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <p className="text-sm font-semibold mb-3">
                      The Three-Act Structure for AI Content:
                    </p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-primary">
                          Act 1 - Empathy & Recognition
                        </p>
                        <p className="text-foreground/80">
                          Acknowledge the reader's pain point or desire. Make them feel understood.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-primary">
                          Act 2 - The Transformation
                        </p>
                        <p className="text-foreground/80">
                          Introduce your solution as the bridge to a better state.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-primary">
                          Act 3 - The New Reality
                        </p>
                        <p className="text-foreground/80">
                          Paint a picture of life after the solution is implemented.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    3. Sensory Language Anchoring
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Emotions are triggered by senses. Prompting AI to use specific sensory details creates vivid, emotionally resonant content.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    4. Vulnerability Injection
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The most emotionally powerful writing is often the most honest and vulnerable.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    5. Micro-Moment Targeting
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The most powerful emotions often happen in tiny, specific moments.
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <BarChart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I implemented these emotional AI writing techniques for a brand's content strategy:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">
                        156%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Increase in email open rates
                      </p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">
                        3.2x
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Longer average time on page
                      </p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">
                        89%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        More social shares
                      </p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">
                        43%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Higher conversion rate
                      </p>
                    </Card>
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
                      <strong>Emotions drive engagement:</strong> Emotionally resonant content outperforms generic AI writing across all metrics.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">2.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Psychology matters:</strong> Understanding human emotion and encoding it into prompts unlocks AI's true potential.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">3.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Sensory details create connection:</strong> Specific sensory language makes content feel real and relatable.
                    </p>
                  </li>
                </ol>
              </Card>
            </div>
          </section>

          <div className="pt-8 border-t border-border">
            <Button
              onClick={() => navigate("/")}
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

export default CaseStudyEmotionalAI;
