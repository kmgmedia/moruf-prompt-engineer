import { ArrowLeft, Zap, Workflow, GitBranch, BarChart3, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const CaseStudyAPIIntegration = () => {
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
              <Zap className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Breaking Down Data Silos: AI-Powered Multi-System Integration
            </h1>
            <p className="text-xl text-muted-foreground">
              How intelligent API orchestration eliminated manual data entry across 5+ business systems. 40 hours/week saved with real-time sync and zero data loss.
            </p>
          </header>

          <div className="w-full h-1 bg-gradient-to-r from-primary/20 to-transparent" />

          <section className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    A mid-market SaaS company was drowning in manual data work. Sales data entered in Salesforce had to be manually copied to Stripe for billing. Customer information lived in HubSpot but never made it to their internal database. Support tickets in Zendesk went unnoticed by product teams. Every integration point required a human middleman.
                  </p>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The team spent 40+ hours per week on these repetitive tasks—updating spreadsheets, fixing duplicate records, chasing missing data. Worse, the delays meant sales opportunities were missed, invoicing was inaccurate, and support tickets weren't prioritized correctly. This wasn't just inefficient; it was costing them real money and customer satisfaction.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Standard integration solutions (Zapier, native connectors) were too rigid for their complex workflows. They needed something smarter—a system that could understand context, handle edge cases, and adapt to their constantly-changing business processes.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Workflow className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Solution</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    I designed and implemented an AI-powered orchestration layer that acts as an intelligent middleware between their disparate systems. Rather than rigid point-to-point integrations, this system uses large language models to understand business logic, transform data contextually, and make intelligent routing decisions.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    The architecture combines API gateway management with AI decision-making. When data enters the system, the orchestration layer analyzes it, applies business rules contextually, enriches it with information from multiple sources, and pushes it to the right destinations in the right format. It handles conflicts, deduplication, and error scenarios autonomously—with human oversight only when needed.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <GitBranch className="w-8 h-8 text-primary" />
                How It Works: Intelligent API Orchestration
              </h2>

              <p className="text-foreground/90 leading-relaxed">
                The system operates as a smart connector layer with five core components working together. Here's how it transforms scattered systems into a cohesive data ecosystem:
              </p>

              <div className="space-y-6 pl-4 border-l-4 border-primary/30 mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    1. Event Detection & Capture
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The system continuously listens to webhooks, API calls, and scheduled syncs from all connected systems. When a change occurs—a new customer created in Salesforce, an invoice generated in Stripe, a support ticket opened in Zendesk—the orchestration layer captures it in real-time.
                  </p>
                  <div className="bg-muted/50 p-4 rounded border border-primary/20">
                    <p className="text-sm font-semibold text-foreground mb-2">Example Event Flow:</p>
                    <code className="text-xs text-foreground/80">Salesforce webhook → Orchestration API → Event Queue</code>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    2. Contextual Data Enrichment
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Instead of just passing data through, the system enriches it by querying related systems. When a sales opportunity closes, the orchestrator simultaneously fetches customer history from HubSpot, billing information from Stripe, and support records from Zendesk. This creates a complete business context for every decision.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    AI agents analyze this enriched data to understand the full picture—not just "opportunity closed," but "opportunity closed FOR this customer WHO has been with us 3 years WITH a history of technical issues REQUIRING follow-up."
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    3. Intelligent Business Logic Application
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Business rules aren't hard-coded. Instead, the system uses LLM-powered agents to interpret and apply complex logic. "If a customer's churn risk is high, flag the opportunity and notify the account manager," or "If billing discrepancies exist, create an internal task before syncing to accounting."
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    The AI understands nuance—it doesn't just follow rules, it reasons about them contextually based on the data it's processing.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    4. Multi-Destination Transformation & Routing
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Data needs to go to different places in different formats. A customer record from Salesforce needs to be transformed into the schema expected by the internal database, then again for the analytics warehouse, then again for the support system. The orchestrator handles all transformations dynamically.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    The system maintains mapping templates but adapts them intelligently based on data type and destination context. It handles mismatches, null values, and data conflicts automatically.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    5. Error Handling & Anomaly Detection
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    When something doesn't fit the expected pattern—duplicate customer records, missing required fields, API timeouts—the system doesn't just fail. It detects the anomaly, logs it with full context, and alerts the appropriate team member for manual review. Most issues are resolved without human intervention; only true edge cases require attention.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    The system learns from resolved anomalies, improving its handling of similar issues in the future.
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <BarChart3 className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Within 3 months of deployment, the orchestration system transformed how the company operated:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">40 hrs/week</p>
                      <p className="text-sm text-muted-foreground">Eliminated from manual data work</p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">99.97%</p>
                      <p className="text-sm text-muted-foreground">Data sync accuracy (vs 87% manual)</p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">Real-time</p>
                      <p className="text-sm text-muted-foreground">Data now syncs across all systems</p>
                    </Card>
                    <Card className="p-4 bg-background/50">
                      <p className="text-2xl font-bold text-primary mb-1">$520K/year</p>
                      <p className="text-sm text-muted-foreground">Estimated cost savings (labor + error reduction)</p>
                    </Card>
                  </div>

                  <div className="space-y-3 bg-muted/30 p-4 rounded">
                    <p className="text-sm font-semibold text-foreground mb-2">Secondary Outcomes:</p>
                    <ul className="space-y-2">
                      <li className="flex gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Customer data now accurate across all platforms → improved personalization</span>
                      </li>
                      <li className="flex gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Support team has complete customer context → 28% faster ticket resolution</span>
                      </li>
                      <li className="flex gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Finance team now reconciles billing weekly instead of daily → reduced overhead</span>
                      </li>
                      <li className="flex gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Product team sees real-time usage data → faster insights for development decisions</span>
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
                      <strong>Context is everything:</strong> Intelligent systems that understand business logic outperform rigid integrations. AI's ability to reason contextually transforms integration from a technical problem into a business enabler.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">2.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Architecture matters:</strong> A well-designed orchestration layer becomes the nervous system of your business. Data flows faster, decisions are better informed, and your team can focus on strategy instead of busy-work.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">3.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Autonomy with oversight:</strong> The best systems handle routine work automatically but escalate edge cases for human judgment. This balance between automation and human insight drives both efficiency and safety.
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

export default CaseStudyAPIIntegration;
