import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

const caseStudies = [
  {
    title: "Designing AI Prompts That Teach: My Approach to Educational Bots",
    description: "A deep dive into creating conversational AI that genuinely educates rather than just responds.",
    link: "/case-study/educational-bots",
  },
  {
    title: "The Secret Sauce to Humanlike Chatbots: Role Prompting Done Right",
    description: "How strategic role assignment transforms generic AI responses into authentic conversations.",
    link: "/case-study/role-prompting",
  },
  {
    title: "How AI Can Write With Emotion — Not Just Syntax",
    description: "Exploring prompt techniques that inject genuine emotional intelligence into AI-generated content.",
    link: "/case-study/emotional-ai",
  },
];

export const CaseStudies = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Case Studies & <span className="text-primary">Write-Ups</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Deep insights into the craft of prompt engineering
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <Card 
              key={index}
              className="p-6 bg-card hover:bg-card/80 border-border hover:border-primary/50 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-bold mb-3 text-foreground leading-snug">
                {study.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {study.description}
              </p>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform duration-300"
                asChild
              >
                <a href={study.link} target="_blank" rel="noopener noreferrer">
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
