import {
  ArrowLeft,
  MessageSquare,
  Target,
  Lightbulb,
  TrendingUp,
  Zap,
  MessageCircle,
  ShoppingCart,
  TrendingUp as TrendingUpIcon,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const CaseStudyEcommerceChatbot = () => {
  const navigate = useNavigate();
  const projectLink = "https://saleschatbotfile.vercel.app/";

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
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              E-Commerce Sales Chatbot: Turning Conversations Into Conversions
            </h1>
            <p className="text-xl text-muted-foreground">
              How emotion-aware prompting increased conversion rates by 22% in
              the first month
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/ecommerce-chatbot.png"
              alt="E-Commerce Sales Chatbot Interface"
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
                    <MessageCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">
                        Emotion-Aware Responses
                      </h3>
                      <p className="text-sm text-foreground/80">
                        Generate personalized product recommendations with
                        emotional intelligence that builds customer trust
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                  <div className="flex items-start gap-3">
                    <ShoppingCart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">
                        Smart Product Upselling
                      </h3>
                      <p className="text-sm text-foreground/80">
                        Few-shot prompting strategies that suggest complementary
                        products naturally without being pushy
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">
                        Conversation Memory
                      </h3>
                      <p className="text-sm text-foreground/80">
                        Maintain context across conversations to provide
                        relevant follow-ups and reduce customer friction
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                  <div className="flex items-start gap-3">
                    <TrendingUpIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">
                        Conversion Optimization
                      </h3>
                      <p className="text-sm text-foreground/80">
                        AI-powered decision-making that influences purchasing
                        behavior through strategic communication patterns
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
                    22%
                  </p>
                  <p className="text-sm text-foreground/80">
                    Conversion Rate Increase
                  </p>
                </Card>
                <Card className="p-6 bg-primary/5 border-primary/20 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    24/7
                  </p>
                  <p className="text-sm text-foreground/80">Customer Support</p>
                </Card>
                <Card className="p-6 bg-primary/5 border-primary/20 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    98%
                  </p>
                  <p className="text-sm text-foreground/80">
                    Customer Satisfaction
                  </p>
                </Card>
              </div>
            </div>

            {/* Challenge */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    A high-volume dropshipping business was losing sales to
                    abandoned carts and slow customer service response times.
                    Their small team couldn't provide 24/7 support, and
                    customers were leaving without making purchases due to
                    unanswered questions. They needed a chatbot that didn't just
                    answer questions but actively influenced purchasing
                    decisions by building trust and emotional connection.
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
                    1. Few-Shot Examples for Product Upselling
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    I trained the chatbot with strategic few-shot examples
                    showing how to recommend complementary products naturally
                    without being pushy. The prompts included context about
                    customer intent, enabling intelligent cross-sell
                    suggestions.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <code className="text-sm whitespace-pre-wrap">
                      {`Customer: "Does this jacket run cold?"
Bot: "Yes, most customers size up for extra warmth. 
Speaking of which, we have thermal base layers that pair 
perfectly - 40% of customers who bought this jacket also 
grabbed these for their winter trips."`}
                    </code>
                  </Card>
                  <p className="text-sm text-foreground/80 mt-2">
                    <strong>Outcome:</strong> Upsells felt contextual, not
                    salesy
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    2. Emotion-Aware Responses for Engagement
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Instead of generic responses, I embedded prompts that detect
                    customer emotional states (frustration, excitement,
                    hesitation) and adjust tone accordingly. Frustrated
                    customers get immediate reassurance, while excited ones
                    receive enthusiasm and urgency.
                  </p>
                  <Card className="p-4 bg-muted/50 mt-3">
                    <p className="text-sm mb-2">
                      <strong>Example - Customer is hesitant:</strong>
                    </p>
                    <code className="text-sm whitespace-pre-wrap">
                      {`"I understand price is a big decision. Here's what makes 
this worth it: [benefits]. Plus, you have 30 days to return 
it risk-free, so there's zero downside to trying."`}
                    </code>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    3. Conversation Memory for Smooth Context Flow
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    I designed prompts that leverage conversation history to
                    maintain context across multiple exchanges. The bot
                    remembers customer preferences, previous questions, and
                    buying signals to provide personalized, coherent
                    conversations that feel natural.
                  </p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        <strong>Memory:</strong> Chatbot tracks what customer
                        asked before, avoiding repetition
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        <strong>Relevance:</strong> Recommendations build on
                        earlier preferences
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        <strong>Personalization:</strong> Returns feel like
                        talking to a friend, not a bot
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    4. Urgency and Social Proof Integration
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    Strategic prompts weave in social proof and scarcity
                    elements organically. Instead of obvious tactics, the bot
                    mentions limited inventory or recent purchases naturally
                    when relevant, creating subtle but effective conversion
                    pressure.
                  </p>
                  <Card className="p-4 bg-muted/50 mt-3">
                    <code className="text-sm whitespace-pre-wrap">
                      {`"Great choice! Just so you know, only 3 left in stock in 
your size, and 12 people have viewed this today. Based on 
our data, this typically sells out within 24 hours."`}
                    </code>
                  </Card>
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
                      Deployed within a month, the chatbot delivered exceptional
                      results within the first testing cycle:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            22% increase in conversion rate
                          </p>
                          <p className="text-foreground/80 text-sm">
                            First-month pilot showed measurable jump in cart
                            completions
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            35% average order value increase
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Strategic upselling resulted in higher average
                            transaction values
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            50% reduction in support tickets
                          </p>
                          <p className="text-foreground/80 text-sm">
                            Chatbot resolved customer questions before they
                            escalated to support
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">
                          ✓
                        </span>
                        <div>
                          <p className="font-bold text-foreground">
                            24/7 continuous customer engagement
                          </p>
                          <p className="text-foreground/80 text-sm">
                            No more lost sales during off-hours
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
                  "Gemini API",
                  "Python",
                  "LangChain",
                  "Telegram API",
                  "Prompt Tuning",
                  "Conversation Memory",
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
                      <strong>Emotion detection changes conversations:</strong>{" "}
                      Tailoring responses based on detected emotional state
                      (frustration, excitement, hesitation) dramatically
                      improves engagement and trust.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">2.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Few-shot prompting scales influence:</strong>{" "}
                      Strategic examples teach the AI how to upsell and
                      cross-sell naturally without triggering customer
                      skepticism.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">3.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>
                        Conversation memory creates personal relationships:
                      </strong>{" "}
                      Maintaining context across exchanges makes interactions
                      feel human and builds loyalty that drives repeat
                      purchases.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">4.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Subtlety drives conversions:</strong> Organic
                      integration of urgency and social proof outperforms
                      aggressive sales tactics by a significant margin.
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

export default CaseStudyEcommerceChatbot;
