import { Target, Layers, RefreshCw, Zap } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Understand the Goal",
    description: "Define what success looks like for the user or business.",
  },
  {
    icon: Layers,
    title: "Design the Prompt Flow",
    description: "Use frameworks like role-based prompting, context stacking, and instruction tuning.",
  },
  {
    icon: RefreshCw,
    title: "Iterate & Refine",
    description: "Test variations, analyze output quality, and optimize for tone and intent.",
  },
  {
    icon: Zap,
    title: "Integrate & Automate",
    description: "Embed prompts into systems via APIs, front-end apps, or chat flows.",
  },
];

export const Process = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary">Prompting</span> Process
          </h2>
          <p className="text-muted-foreground text-lg">
            A systematic approach to crafting intelligent AI experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto group hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-3 text-center text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
