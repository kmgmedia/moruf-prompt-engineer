import { Button } from "./ui/button";
import aboutImage from "@/assets/about-moruf.jpeg";

const expertise = [
  "OpenAI APIs",
  "n8n Automation",
  "RAG Systems",
  "Workflow Architecture",
  "Vector Databases",
  "API Integrations",
  "AI Assistants",
  "Webhooks",
  "Backend Automation",
  "Business Systems",
];

export const About = () => {
  return (
    <section id="about" className="px-4 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="space-y-7">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20">
              <img
                src={aboutImage}
                alt="Moruf Adebola portrait"
                className="aspect-[4/3] w-full object-cover object-top contrast-110"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {expertise.map((item) => (
                <span
                  key={item}
                  className="rounded border border-primary/30 bg-primary/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-0 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              About Me
            </p>

            <div className="space-y-4">
              <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                I turn business bottlenecks into{" "}
                <span className="italic text-primary">
                  intelligent AI systems.
                </span>
              </h2>

              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base md:text-lg md:leading-8">
                I am an Applied AI Engineer designing and deploying AI-powered
                workflow systems, automation pipelines, and LLM-integrated
                business solutions across sales, operations, customer support,
                and internal productivity workflows.
              </p>
            </div>

            <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base md:leading-8">
              <p>
                I build scalable systems with OpenAI APIs, n8n, webhooks,
                vector databases, RAG workflows, backend integrations, and
                automation orchestration that reduce manual effort and improve
                response speed.
              </p>

              <p>
                My software engineering foundation spans Python, JavaScript,
                Node.js, API integrations, and backend automation systems, so
                the solutions I build are practical, maintainable, and ready to
                support real business operations.
              </p>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                className="bg-primary px-8 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a href="#contact">Start a Project</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
