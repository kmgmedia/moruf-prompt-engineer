import {
  ArrowLeft,
  ShoppingCart,
  Target,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

const focusItems = [
  "Real-time customer interaction and support",
  "Intelligent product recommendations",
  "Context-aware conversations that reduce friction",
  "Automated engagement across the entire buying journey",
];

const keyFeatures = [
  "Personalized product recommendations based on user intent",
  "Context-aware conversation handling for seamless interactions",
  "Automated customer support with 24/7 availability",
  "Subtle conversion optimization through behavioral cues",
];

const impactItems = [
  "22% increase in conversion rate",
  "35% increase in average order value",
  "50% reduction in support tickets",
  "24/7 continuous customer engagement",
];

const implementationItems = [
  "Context-aware response generation based on user intent",
  "Behavior-driven logic for product recommendations and upselling",
  "Conversation memory to maintain continuity across interactions",
  "Dynamic response structuring to balance persuasion and user experience",
];

const tools = ["Gemini API", "Python", "LangChain", "Telegram API"];

const CaseStudyEcommerceSalesAutomation = () => {
  const navigate = useNavigate();
  const projectLink = "https://saleschatbotfile.vercel.app/";

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
              a high-volume dropshipping business.
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/ecommerce-chatbot.png"
              alt="E-Commerce Sales Automation System"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-foreground/90 leading-relaxed">
                A fast-growing dropshipping business was losing potential
                revenue due to slow response times, abandoned carts, and lack of
                24/7 customer engagement.
              </p>
            </div>

            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Customers frequently left without completing purchases
                    because their questions were not answered in time. The
                    support team could not scale to meet demand, leading to
                    missed sales opportunities and inconsistent customer
                    experience.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                The Solution
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                I designed and implemented an AI-powered sales system that
                engages customers in real time, answers product questions, and
                guides them toward purchase decisions through structured
                conversational flows.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                The system focuses on:
              </p>
              <ul className="space-y-2 pl-4">
                {focusItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="space-y-3">
                {keyFeatures.map((feature) => (
                  <p
                    key={feature}
                    className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2"
                  >
                    <span className="text-primary">•</span>
                    <span>{feature}</span>
                  </p>
                ))}
              </div>
            </div>

            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">System Design</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The system combines AI-driven conversation handling with
                    structured workflows to influence purchasing behavior
                    without feeling intrusive.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    It processes user input, detects intent, and dynamically
                    generates responses that guide users toward completing
                    purchases, while maintaining a natural and engaging tone.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The system delivered measurable business results within the
                    first month:
                  </p>
                  <ul className="space-y-3">
                    {impactItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-primary font-bold">✓</span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                Technical Implementation
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                At the core of the system is a structured conversational
                workflow that ensures consistent and effective interactions.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                This includes:
              </p>
              <ul className="space-y-2 pl-4">
                {implementationItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

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
                      AI Can Drive Revenue, Not Just Conversations
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      This project demonstrates how AI can be used to build
                      revenue-generating systems, not just chat interfaces.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Structured Workflows Improve Conversion Outcomes
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      By combining system design, behavioral understanding, and
                      structured AI workflows, it is possible to automate
                      customer engagement while improving conversion and overall
                      business performance.
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

export default CaseStudyEcommerceSalesAutomation;
