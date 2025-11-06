import { ArrowLeft, Heart, Brain, Sparkles, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CaseStudyEmotionalAI = () => {
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
              <Heart className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              How AI Can Write With Emotion — Not Just Syntax
            </h1>
            <p className="text-xl text-muted-foreground">
              Exploring prompt techniques that inject genuine emotional intelligence into AI-generated content.
            </p>
          </header>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Brain className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Emotional Gap in AI Writing</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    AI can write grammatically perfect sentences, but can it make you feel something? 
                    Can it capture the warmth of a handwritten note, the urgency of a breaking news story, 
                    or the excitement of a product launch?
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    For most AI systems, the answer has been no. But through careful prompt engineering, 
                    I've discovered techniques that bridge this emotional gap and create content that 
                    genuinely resonates with readers.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                The Emotional Intelligence Framework
              </h2>
              
              <p className="text-foreground/90 leading-relaxed">
                Emotional AI writing isn't about adding more adjectives or using exclamation points. 
                It's about understanding the psychology of communication and encoding that into your prompts.
              </p>

              <div className="space-y-6 pl-4 border-l-4 border-primary/30 mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Technique #1: Emotion-First Prompting</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Instead of asking AI to write about a topic, start by specifying the emotional journey 
                    you want readers to experience.
                  </p>
                  <div className="space-y-3">
                    <Card className="p-4 bg-destructive/10 border-destructive/30">
                      <p className="text-sm font-semibold mb-2 text-destructive">❌ Standard Prompt:</p>
                      <code className="text-xs">
                        "Write a product description for noise-canceling headphones."
                      </code>
                    </Card>
                    <Card className="p-4 bg-primary/10 border-primary/30">
                      <p className="text-sm font-semibold mb-2 text-primary">✓ Emotion-First Prompt:</p>
                      <code className="text-xs">
                        "Write a product description that makes the reader feel the relief and peace of escaping 
                        from constant noise. They should imagine the moment of putting on the headphones and 
                        feeling their stress melt away. Use sensory language that evokes calm and focus."
                      </code>
                    </Card>
                    <Card className="p-4 bg-muted/50 mt-3">
                      <p className="text-xs font-semibold mb-2">Result Comparison:</p>
                      <p className="text-xs mb-2"><strong>Standard:</strong> "These headphones feature active noise cancellation technology..."</p>
                      <p className="text-xs"><strong>Emotional:</strong> "Imagine stepping into your own private sanctuary. The world's chaos fades to nothing. Just you, your thoughts, and perfect clarity..."</p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Technique #2: Narrative Arc Engineering</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Every piece of writing, even a short email, has a story structure. Explicitly defining this 
                    arc in your prompt creates emotional momentum.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <p className="text-sm font-semibold mb-3">The Three-Act Structure for AI Content:</p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-primary">Act 1 - Empathy & Recognition</p>
                        <p className="text-foreground/80">Acknowledge the reader's pain point or desire. Make them feel understood.</p>
                        <code className="text-xs block mt-1 bg-background/50 p-2 rounded">
                          "Start by acknowledging the struggle of trying to focus in noisy environments..."
                        </code>
                      </div>
                      <div>
                        <p className="font-semibold text-primary">Act 2 - The Transformation</p>
                        <p className="text-foreground/80">Introduce your solution as the bridge to a better state.</p>
                        <code className="text-xs block mt-1 bg-background/50 p-2 rounded">
                          "Describe how the headphones create an instant transformation in their environment..."
                        </code>
                      </div>
                      <div>
                        <p className="font-semibold text-primary">Act 3 - The New Reality</p>
                        <p className="text-foreground/80">Paint a picture of life after the solution is implemented.</p>
                        <code className="text-xs block mt-1 bg-background/50 p-2 rounded">
                          "End with them imagining their most productive, peaceful self..."
                        </code>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Technique #3: Sensory Language Anchoring</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Emotions are triggered by senses. Prompting AI to use specific sensory details creates 
                    vivid, emotionally resonant content.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <p className="text-sm font-semibold mb-2">Example Sensory Prompt:</p>
                    <code className="text-xs block bg-background/50 p-3 rounded">
                      "Write about our coffee subscription service using all five senses: the rich aroma 
                      when opening the bag (smell), the satisfying sound of beans grinding (sound), the 
                      smooth texture of the cup in their hands (touch), the bold first sip (taste), and 
                      the warm amber color of the pour (sight). Make each sensory detail connect to a 
                      feeling of morning comfort and possibility."
                    </code>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Technique #4: Vulnerability Injection</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The most emotionally powerful writing is often the most honest and vulnerable. 
                    You can prompt AI to adopt this tone.
                  </p>
                  <div className="space-y-3">
                    <Card className="p-4 bg-primary/10 border-primary/30">
                      <p className="text-sm font-semibold mb-2 text-primary">Vulnerability Prompt Example:</p>
                      <code className="text-xs block">
                        "Write a founder's letter that isn't polished corporate speak. Sound like a real person 
                        who's poured their heart into building this product. Share a moment of doubt you overcame. 
                        Make it personal enough that readers feel they're talking to a friend, not a brand."
                      </code>
                    </Card>
                    <Card className="p-4 bg-muted/50">
                      <p className="text-xs"><em>"I'll be honest—there were nights I questioned everything. Building this 
                      wasn't just about creating another product. It was about solving a problem that kept me up at 
                      night because I lived it. And if you're reading this, you probably live it too..."</em></p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Technique #5: Micro-Moment Targeting</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The most powerful emotions often happen in tiny, specific moments. Prompting AI to focus 
                    on these micro-moments creates deeply relatable content.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <p className="text-sm mb-2">Instead of: "Our app helps you stay organized"</p>
                    <p className="text-sm font-semibold mb-2 text-primary">Try this prompt:</p>
                    <code className="text-xs block bg-background/50 p-3 rounded mb-2">
                      "Describe the specific moment someone realizes they forgot an important deadline and 
                      feels that sinking feeling in their stomach. Then show how opening our app stops that 
                      panic in its tracks. Focus on the emotional shift from chaos to control."
                    </code>
                    <p className="text-xs italic mt-2">"You know that split-second of pure dread when you remember 
                    something you forgot? That stomach-drop feeling? We built this to make sure you never feel that again..."</p>
                  </Card>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <BarChart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Measurable Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I implemented these emotional AI writing techniques for a brand's content strategy. 
                    The results were dramatic:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">156%</p>
                      <p className="text-sm text-muted-foreground">Increase in email open rates</p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">3.2x</p>
                      <p className="text-sm text-muted-foreground">Longer average time on page</p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">89%</p>
                      <p className="text-sm text-muted-foreground">More social shares</p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">43%</p>
                      <p className="text-sm text-muted-foreground">Higher conversion rate on product pages</p>
                    </Card>
                  </div>
                  <p className="text-foreground/90 leading-relaxed text-sm">
                    More importantly, customer feedback shifted from "helpful information" to "this really gets me" 
                    and "finally, a brand that speaks my language."
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">The Emotional AI Checklist</h2>
              <Card className="p-6 bg-muted/30">
                <p className="text-sm mb-4 text-foreground/80">
                  Before finalizing any AI-generated content, ask yourself:
                </p>
                <div className="space-y-3">
                  {[
                    "Does this piece acknowledge a specific human emotion or experience?",
                    "Is there a clear emotional journey from beginning to end?",
                    "Have I used sensory details that readers can feel, not just understand?",
                    "Does this sound like it was written by a real person with genuine feelings?",
                    "Would this content make someone feel something, not just learn something?",
                    "Have I focused on a specific micro-moment rather than broad generalizations?",
                  ].map((question, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm text-foreground/90">{question}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-primary/10 border-primary/30">
              <h3 className="text-xl font-bold mb-3">Final Thought</h3>
              <p className="text-foreground/90 leading-relaxed">
                The future of AI writing isn't about replacing human emotion—it's about amplifying it. 
                By understanding how emotions work in language and encoding that understanding into our prompts, 
                we can create AI systems that don't just inform, but truly connect. The syntax can be perfect, 
                but without emotion, words are just noise. With the right prompting techniques, AI can write 
                content that makes people feel seen, understood, and moved to action.
              </p>
            </Card>
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

export default CaseStudyEmotionalAI;