import { Target, Lightbulb, Code, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Understand the Problem",
    description: "Identify the workflow, bottlenecks, and what needs to be improved or automated.",
  },
  {
    icon: Lightbulb,
    title: "Design the System",
    description: "Plan how AI, APIs, and automation will work together to solve the problem.",
  },
  {
    icon: Code,
    title: "Build & Integrate",
    description: "Develop the solution and connect it with existing tools and workflows.",
  },
  {
    icon: CheckCircle,
    title: "Test & Optimize",
    description: "Refine performance, improve outputs, and ensure the system works reliably in real use.",
  },
];

export const Process = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary">Approach</span> to Building AI Systems
          </h2>
          <p className="text-muted-foreground text-lg">
            A structured approach to designing AI, automation, and scalable software systems
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
