import { Card } from "./ui/card";
import { Beaker, MessageSquare, FileText } from "lucide-react";

const experiments = [
  {
    icon: Beaker,
    title: "Tone-shifting experiments",
    description: "Making one prompt output multiple emotional styles.",
  },
  {
    icon: MessageSquare,
    title: "Dialogue reconstruction",
    description: "Training AI to mimic customer tone while keeping brand identity.",
  },
  {
    icon: FileText,
    title: "Story compression",
    description: "Teaching GPT to summarize long content without losing narrative flow.",
  },
];

export const Experiments = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Experiment</span> Zone
          </h2>
          <p className="text-muted-foreground text-lg">
            Where I test, play, and push the boundaries of prompt logic
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-accent border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <experiment.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <h3 className="text-lg font-bold mb-2 text-foreground">
                {experiment.title}
              </h3>
              
              <p className="text-muted-foreground text-sm">
                {experiment.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
