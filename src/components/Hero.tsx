import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedBackground } from "./AnimatedBackground";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground opacity={1} subtle={false} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(13, 17, 28, 0.7), rgba(13, 17, 28, 0.6), rgba(13, 17, 28, 1))",
        }}
      />

      <div className="container mx-auto px-4 z-10 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="inline-block">
            <span className="text-primary text-xs md:text-sm font-semibold tracking-wider uppercase px-3 md:px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              Prompt Engineering Portfolio
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Hi, I'm <span className="text-primary">Moruf Adebola</span>
            </h1>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Applied AI Engineer building intelligent automation systems & AI
              workflows
            </p>

            <p className="text-base md:text-lg text-foreground/75">
              I design and build AI-powered systems that automate conversations,
              connect APIs, and streamline business workflows.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center pt-2 md:pt-4">
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
              className="border-primary/30 hover:bg-primary/10 hover:border-primary hover:text-white transition-all duration-300"
              asChild
            >
              <a href="#contact">Let's Collaborate</a>
            </Button>
          </div>

          <div className="flex gap-4 md:gap-6 justify-center pt-4 md:pt-6">
            <a
              href="https://github.com/kmgmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/moruf-adebola/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="mailto:morufbadebola@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
