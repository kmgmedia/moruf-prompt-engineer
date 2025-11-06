import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />
      
      <div className="container mx-auto px-4 z-10 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              👋 Prompt Engineering Portfolio
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Hi, I'm <span className="text-primary">Moruf Adebola</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A Full-Stack Software Engineer and Prompt Engineer blending creativity, logic, and AI precision.
          </p>
          
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            I design and automate conversational systems that don't just respond — they connect. 
            From smart chatbots that sell and support, to AI copy systems that write like humans 
            (only faster), my work lives at the intersection of storytelling and engineering.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
              asChild
            >
              <a href="#contact">Let's Collaborate</a>
            </Button>
          </div>
          
          <div className="flex gap-6 justify-center pt-8">
            <a 
              href="https://github.com/kmgmedia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/moruf-adebola/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:morufbadebola@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};
