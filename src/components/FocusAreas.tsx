import { Bot, PenTool, Sparkles } from "lucide-react";
import { Card } from "./ui/card";

const areas = [
  {
    icon: Bot,
    title: "Chatbot Design & Automation",
    description: "Building intelligent, goal-driven assistants for sales, education, and customer engagement.",
  },
  {
    icon: PenTool,
    title: "Creative AI Writing",
    description: "Crafting structured prompts for storytelling, brand voice, and marketing copy that feels authentic.",
  },
  {
    icon: Sparkles,
    title: "System Integration",
    description: "Embedding AI seamlessly into workflows via APIs, front-end apps, and automated chat flows.",
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
            Where creativity meets conversational AI
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
