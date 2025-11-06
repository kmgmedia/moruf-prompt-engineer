import { Button } from "./ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Let's build AI experiences that <span className="text-primary">talk, sell, and tell stories</span> like humans do
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Ready to collaborate on your next AI project?
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="mailto:morufbadebola@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </a>
            </Button>
          </div>
          
          <div className="flex gap-6 justify-center pt-8">
            <a 
              href="https://github.com/kmgmedia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="w-6 h-6" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/moruf-adebola/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a 
              href="mailto:morufbadebola@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="w-6 h-6" />
              <span className="text-sm font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
