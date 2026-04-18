import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    title: "AI-Powered Educational Assistant System",
    description:
      "Automating consistent, scaled responses for educators using structured AI workflows. Reduced teacher workload by 60%.",
    link: "/case-study/teacher-ai",
  },
  {
    title: "Breaking Down Data Silos: AI-Powered Multi-System Integration",
    description:
      "Intelligent API orchestration that eliminated manual data entry across 5+ systems. 40 hours/week saved with real-time sync.",
    link: "/case-study/api-integration",
  },
  {
    title: "Creating Authentic AI Conversations: Role-Based System Design",
    description:
      "How system architecture and role prompting transform generic AI into reliable, contextual conversation partners.",
    link: "/case-study/role-prompting",
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
              <span className="text-primary">
                AI Systems & Automation Solutions
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            How I solve real business problems using AI, automation, and system
            design
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
                <Link to={study.link}>
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
