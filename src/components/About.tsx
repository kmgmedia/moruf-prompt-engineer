import { Button } from "./ui/button";
import aboutImage from "@/assets/about-moruf.jpeg";

const expertise = [
  "OpenAI APIs",
  "Claude API",
  "RAG Systems",
  "AI Assistants",
  "Vector Databases",
  "Pinecone",
  "n8n Automation",
  "Workflow Architecture",
  "Backend Automation",
  "Webhooks",
  "API Integrations",
  "REST APIs",
  "Python",
  "Node.js",
  "React.js",
  "TypeScript",
  "AWS",
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
                I'm a Software Engineer focused on AI-powered automation,
                full-stack application development, and intelligent workflow
                systems. I build software that helps businesses streamline
                operations, connect disconnected tools, and automate
                repetitive work using modern web technologies and AI.
              </p>
            </div>

            <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base md:leading-8">
              <p>
                My experience spans the full development lifecycle:
                designing intuitive interfaces, building scalable backend
                services, and integrating third-party APIs. I enjoy shipping
                production-ready applications that pair solid engineering
                with AI capabilities to solve real business problems.
              </p>

              <p>
                <span className="font-semibold text-foreground">
                  What I build:
                </span>{" "}
                AI-powered assistants, workflow automation systems, business
                process integrations, and full-stack web applications:
                intelligent tools that connect people, data, and services
                into seamless digital experiences.
              </p>

              <p>
                <span className="font-semibold text-foreground">
                  Beyond the code:
                </span>{" "}
                I care about software architecture, system design, developer
                productivity, and building scalable products that deliver
                measurable value. I'm currently open to opportunities where I
                can build scalable software and AI-powered solutions
                alongside teams that value innovation, engineering
                excellence, and continuous learning.
              </p>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                className="bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a href="#contact">Start A Project</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
