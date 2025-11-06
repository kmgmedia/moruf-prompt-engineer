import { ArrowLeft, Users, MessageSquare, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CaseStudyRolePrompting = () => {
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
              <Users className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              The Secret Sauce to Humanlike Chatbots: Role Prompting Done Right
            </h1>
            <p className="text-xl text-muted-foreground">
              How strategic role assignment transforms generic AI responses into authentic conversations.
            </p>
          </header>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem with Generic AI</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Most chatbots sound the same: polite, helpful, but ultimately forgettable. They lack personality, 
                    context awareness, and the human touch that makes conversations feel natural. The result? 
                    Users disengage, abandon conversations, and miss out on the value the bot could provide.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                The Role Prompting Framework
              </h2>
              
              <p className="text-foreground/90 leading-relaxed">
                Role prompting isn't just about saying "You are a customer service rep." It's about crafting 
                a complete identity that shapes every aspect of how the AI communicates. Here's my proven framework:
              </p>

              <div className="space-y-6 pl-4 border-l-4 border-primary/30 mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">1. Define the Character, Not Just the Job</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Go beyond job titles. Give your AI a backstory, personality traits, and communication style.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <Card className="p-4 bg-destructive/10 border-destructive/30">
                      <p className="text-sm font-semibold mb-2 text-destructive">❌ Generic Approach:</p>
                      <code className="text-xs">
                        "You are a helpful sales assistant."
                      </code>
                    </Card>
                    <Card className="p-4 bg-primary/10 border-primary/30">
                      <p className="text-sm font-semibold mb-2 text-primary">✓ Role Prompting Approach:</p>
                      <code className="text-xs">
                        "You are Alex, a 7-year veteran sales consultant who genuinely cares about finding the 
                        perfect product match. You speak casually but professionally, use occasional humor, 
                        and always ask follow-up questions to understand needs."
                      </code>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">2. Establish Communication Boundaries</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Define what your AI should and shouldn't do. This prevents awkward moments and maintains consistency.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <p className="text-sm font-semibold mb-3">Example Boundaries for a Support Bot:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Never make promises about features or timelines without checking documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Always acknowledge frustration and apologize before problem-solving</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Escalate to human agents when emotion levels are high or issues are complex</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Use friendly language but avoid slang or overly casual expressions</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">3. Inject Domain Expertise</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Give your AI knowledge depth in the specific domain it operates. This builds trust and credibility.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <p className="text-sm mb-2 font-semibold">Real Example from E-Commerce Bot:</p>
                    <code className="text-xs block bg-background/50 p-3 rounded">
                      "You are a fashion stylist with expertise in sustainable clothing. You know fabric types, 
                      care instructions, and sizing variations across brands. When recommending products, you 
                      consider the customer's body type, lifestyle, and values. You can explain why organic 
                      cotton differs from regular cotton and why it matters."
                    </code>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">4. Create Emotional Intelligence</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Program your AI to recognize emotional cues and respond appropriately. This is what separates 
                    good bots from great ones.
                  </p>
                  <div className="space-y-3 mt-3">
                    <Card className="p-3 bg-background/50">
                      <p className="text-xs font-semibold mb-1">Customer: "This is the THIRD time I'm contacting you about this!"</p>
                      <p className="text-xs text-primary font-semibold mb-1">AI Response:</p>
                      <p className="text-xs">"I can hear your frustration, and I'm truly sorry you've had to reach out multiple times. 
                      That's not the experience we want for you. Let me make sure this gets resolved right now. Can you share 
                      your order number so I can dive into this immediately?"</p>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">5. Test with Edge Cases</h3>
                  <p className="text-foreground/90 leading-relaxed">
                    Always test your role prompts with difficult scenarios: angry customers, unusual requests, 
                    technical edge cases. Refine the role based on how it handles these situations.
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Real-World Results</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I implemented this role prompting framework for a dropshipping business's sales chatbot. 
                    The transformation was remarkable:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">22%</p>
                      <p className="text-sm text-muted-foreground">Increase in conversion rate</p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">38%</p>
                      <p className="text-sm text-muted-foreground">Longer conversation duration</p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">4.7/5</p>
                      <p className="text-sm text-muted-foreground">Average user satisfaction rating</p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">67%</p>
                      <p className="text-sm text-muted-foreground">Reduction in human escalations</p>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Lessons Learned</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Consistency is Critical</h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Once you establish a role, maintain it throughout the entire conversation. Nothing breaks 
                      immersion faster than a bot that changes personality mid-conversation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Less Corporate, More Human</h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Users respond better to bots that sound like real people, not corporate press releases. 
                      Don't be afraid to inject personality and mild humor where appropriate.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Context Memory Matters</h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      A great role prompt means nothing if the bot forgets what was said three messages ago. 
                      Always implement conversation memory alongside role prompting.
                    </p>
                  </div>
                </div>
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

export default CaseStudyRolePrompting;