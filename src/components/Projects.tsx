import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { GraduationCap, ShoppingCart, Palette } from "lucide-react";

const projects = [
  {
    icon: GraduationCap,
    title: "AI Assistant for Teachers",
    client: "Sandton Prep",
    goal: "Create an assistant to help teachers generate personalized lesson notes, student reports, and parent communication templates.",
    strategy: [
      "Multi-step prompting for context awareness",
      "Persona-based prompting ('You are a primary school educator...')",
      "Style-tuning to match friendly, professional tone",
    ],
    outcome:
      "Reduced teachers' writing time by 60% and improved message consistency across classes.",
    tools: ["GPT-4", "OpenAI API", "Google Sheets Integration", "Streamlit"],
    link: "https://ai-teaching-assistants.streamlit.app/",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Sales Chatbot",
    client: "Dropshipping Business",
    goal: "Build a 24/7 chatbot that answers customer inquiries, recommends products, and manages order flow.",
    strategy: [
      "Few-shot examples for product upselling",
      "Conversation memory for smooth context flow",
      "Emotion-aware responses for better engagement",
    ],
    outcome:
      "Increased conversion rate by 22% within the first month of pilot testing.",
    tools: ["GPT-4 Turbo", "LangChain", "Telegram API"],
    link: "https://saleschatbotfile.vercel.app/",
  },
  {
    icon: Palette,
    title: "Creative Storytelling Prompts",
    client: "Brand Campaign (Midjourney + GPT)",
    goal: "Generate brand stories and visuals that capture 'vintage luxury' for a client campaign.",
    strategy: [
      "Layered prompts connecting brand tone with imagery concepts",
      "Consistent keyword and aesthetic framing",
    ],
    outcome:
      "Created 15+ original story + image pairs that were used across digital campaigns and social media assets.",
    tools: ["GPT-4", "Midjourney", "Notion AI"],
    link: "",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-world solutions powered by strategic prompt engineering
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="p-8 md:p-10 bg-card hover:bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() =>
                project.link && window.open(project.link, "_blank")
              }
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <project.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      {project.client}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Goal
                    </h4>
                    <p className="text-foreground/90">{project.goal}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Prompt Strategy
                    </h4>
                    <ul className="space-y-1">
                      {project.strategy.map((item, i) => (
                        <li
                          key={i}
                          className="text-foreground/90 flex items-start"
                        >
                          <span className="text-primary mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Outcome
                    </h4>
                    <p className="text-foreground font-medium">
                      {project.outcome}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tools.map((tool, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
