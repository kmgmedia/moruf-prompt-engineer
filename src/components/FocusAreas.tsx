import { Cog, Zap, Layers } from "lucide-react";
import { Card } from "./ui/card";

const areas = [
  {
    icon: Cog,
    title: "AI Systems & Automation",
    description:
      "Designing and building intelligent systems that automate workflows, handle complex tasks, and improve business operations.",
  },
  {
    icon: Zap,
    title: "API Integration & Workflow Engineering",
    description:
      "Connecting tools and services through APIs to create seamless, efficient, and scalable systems.",
  },
  {
    icon: Layers,
    title: "AI-Powered Applications",
    description:
      "Building full-stack applications that integrate AI to solve real-world problems and enhance user experience.",
  },
];

export const FocusAreas = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Focus</span> Areas
          </h2>
          <p className="text-muted-foreground text-lg">
            Building intelligent systems with AI, automation, and software
            engineering
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <Card
              key={index}
              className="p-8 bg-card hover:bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <area.icon className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {area.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
