import { ArrowLeft, ShoppingCart, Zap, TrendingUp, Award, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const CaseStudyEcommerceSalesAutomation = () => {
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
              <ShoppingCart className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              E-Commerce Sales Automation System
            </h1>
            <p className="text-xl text-muted-foreground">
              Increasing conversion rates and automating customer engagement for
              a high-volume dropshipping business. 22% conversion rate increase
              with 24/7 customer engagement.
            </p>
          </header>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          {/* Project Image */}
          <div className="rounded-lg overflow-hidden border border-primary/20 shadow-lg">
            <img
              src="/projects/ecommerce-chatbot.jpg"
              alt="E-Commerce Sales Automation System"
              className="w-full h-auto object-cover"
            />
          </div>

          <section className="space-y-6">
            {/* Overview */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <ShoppingCart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Overview</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    A fast-growing dropshipping business was losing potential
                    revenue due to slow response times, abandoned carts, and
                    lack of 24/7 customer engagement. The company needed a
                    solution that could scale support operations while
                    maintaining personalized interactions across thousands of
                    concurrent customers.
                  </p>
                </div>
              </div>
            </Card>

            {/* The Challenge */}
            <Card className="p-6 bg-destructive/5 border-destructive/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Customers frequently left without completing purchases
                    because their questions weren't answered in time. The core
                    problems were:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground/90">
                    <li>Support team couldn't scale to meet demand</li>
                    <li>Slow response times led to cart abandonment</li>
                    <li>No 24/7 availability for customers in different zones</li>
                    <li>Inconsistent customer experience across interactions</li>
                    <li>Missed sales opportunities due to delayed engagement</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* The Solution */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Solution</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I designed and implemented an AI-powered sales system that
                    engages customers in real time, answers product questions,
                    and guides them toward purchase decisions through structured
                    conversational flows.
                  </p>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The system focuses on:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground/90">
                    <li>Real-time customer interaction and support</li>
                    <li>Intelligent product recommendations</li>
                    <li>
                      Context-aware conversations that reduce friction in the
                      buying journey
                    </li>
                    <li>Automated engagement across the entire customer lifecycle</li>
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

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 border-primary/30 bg-primary/5">
                  <h3 className="font-semibold text-lg mb-2 text-primary">
                    Personalized Recommendations
                  </h3>
                  <p className="text-sm text-foreground/90">
                    AI analyzes user intent and browsing patterns to suggest
                    products that match customer needs and preferences.
                  </p>
                </Card>

                <Card className="p-4 border-primary/30 bg-primary/5">
                  <h3 className="font-semibold text-lg mb-2 text-primary">
                    Context-Aware Conversations
                  </h3>
                  <p className="text-sm text-foreground/90">
                    System maintains conversation state and user context,
                    enabling seamless, natural interactions without friction.
                  </p>
                </Card>

                <Card className="p-4 border-primary/30 bg-primary/5">
                  <h3 className="font-semibold text-lg mb-2 text-primary">
                    24/7 Customer Support
                  </h3>
                  <p className="text-sm text-foreground/90">
                    Continuous availability across all time zones, eliminating
                    wait times and response delays.
                  </p>
                </Card>

                <Card className="p-4 border-primary/30 bg-primary/5">
                  <h3 className="font-semibold text-lg mb-2 text-primary">
                    Behavioral Optimization
                  </h3>
                  <p className="text-sm text-foreground/90">
                    Subtle conversion optimization through behavioral cues that
                    guide users naturally toward purchase completion.
                  </p>
                </Card>
              </div>
            </div>

            {/* System Design */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Code className="w-8 h-8 text-primary" />
                System Design
              </h2>

              <p className="text-foreground/90 leading-relaxed">
                The system combines AI-driven conversation handling with
                structured workflows to influence purchasing behavior without
                feeling intrusive.
              </p>

              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      1. Intent Detection Layer
                    </h3>
                    <p className="text-sm text-foreground/90">
                      Analyzes user input to understand their current stage in
                      the buying journey (browsing, comparing, deciding,
                      purchasing).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      2. Context Management
                    </h3>
                    <p className="text-sm text-foreground/90">
                      Maintains conversation history, product browsing data, and
                      user preferences across all interactions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      3. Dynamic Response Generation
                    </h3>
                    <p className="text-sm text-foreground/90">
                      Generates contextual, personalized responses that balance
                      persuasion with natural, engaging conversation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      4. Behavior-Driven Logic
                    </h3>
                    <p className="text-sm text-foreground/90">
                      Implements product recommendations and upselling strategies
                      based on user behavior patterns and intent signals.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      5. Conversation Memory
                    </h3>
                    <p className="text-sm text-foreground/90">
                      Maintains continuity across interactions, remembering user
                      preferences, previous questions, and conversation context.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results & Impact */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-6">
                    The system delivered measurable business results within the
                    first month of implementation:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-background/50 border-primary/20">
                      <p className="text-3xl font-bold text-primary mb-1">
                        22%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Increase in conversion rate
                      </p>
                    </Card>
                    <Card className="p-4 bg-background/50 border-primary/20">
                      <p className="text-3xl font-bold text-primary mb-1">
                        35%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Increase in average order value
                      </p>
                    </Card>
                    <Card className="p-4 bg-background/50 border-primary/20">
                      <p className="text-3xl font-bold text-primary mb-1">
                        50%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Reduction in support tickets
                      </p>
                    </Card>
                    <Card className="p-4 bg-background/50 border-primary/20">
                      <p className="text-3xl font-bold text-primary mb-1">
                        24/7
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Continuous customer engagement
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>

            {/* Technical Implementation */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Code className="w-8 h-8 text-primary" />
                Technical Implementation
              </h2>

              <p className="text-foreground/90 leading-relaxed">
                At the core of the system is a structured conversational
                workflow that ensures consistent and effective interactions
                across all customer touchpoints.
              </p>

              <Card className="p-6 bg-muted/30">
                <p className="text-foreground/90 leading-relaxed mb-4">
                  This includes:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">ΓÇó</span>
                    <span className="text-foreground/90">
                      <strong>Context-aware response generation</strong> - Based
                      on user intent, conversation history, and product data
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">ΓÇó</span>
                    <span className="text-foreground/90">
                      <strong>Behavior-driven logic</strong> - For product
                      recommendations and strategic upselling
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">ΓÇó</span>
                    <span className="text-foreground/90">
                      <strong>Conversation memory</strong> - Maintains continuity
                      across interactions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">ΓÇó</span>
                    <span className="text-foreground/90">
                      <strong>Dynamic response structuring</strong> - Balances
                      persuasion with natural, engaging conversation
                    </span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Tech Stack */}
            <Card className="p-6 border-primary/30 bg-primary/5">
              <h2 className="text-2xl font-bold mb-4 text-primary">Tech Stack</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground/90">Gemini API</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground/90">Python</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground/90">LangChain</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground/90">Telegram API</span>
                </div>
              </div>
            </Card>

            {/* Key Takeaways */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      AI is More Than Chat
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      This project demonstrates how AI can be used to build
                      revenue-generating systems, not just chat interfaces. When
                      designed strategically, AI becomes a direct business lever.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      System Design Matters
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      The architecture supporting the AI is as important as the
                      AI itself. Proper context management, intent detection, and
                      conversation flow create the framework for success.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Behavioral Understanding Drives Results
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Understanding customer behavior patterns and journey stages
                      allows for targeted, effective engagement that feels
                      natural rather than manipulative.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Measurable Impact Requires Clear Metrics
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Success should be tracked through business metrics
                      (conversion rate, AOV, support tickets) rather than just
                      technical metrics (response time, accuracy).
                    </p>
                  </div>
                </div>
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

export default CaseStudyEcommerceSalesAutomation;
