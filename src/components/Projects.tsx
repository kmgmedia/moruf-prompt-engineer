import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  GraduationCap,
  ShoppingCart,
  Palette,
  Database,
  Store,
  School,
  LayoutDashboard,
} from "lucide-react";

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
    tools: ["Python", "Gemini API", "Google Sheets Integration", "Streamlit"],
    link: "https://teacher-ai-assistant-cr.streamlit.app/",
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
    tools: ["Gemini API", "Python", "LangChain", "Telegram API"],
    link: "https://saleschatbotfile.vercel.app/",
  },
  {
    icon: Database,
    title: "Byway Backend API",
    client: "End-to-End REST API Development",
    goal: "Build a complete backend solution for a web product review platform with review management, user roles, and access control.",
    strategy: [
      "AI-assisted API endpoint design and validation logic",
      "Prompt-driven code generation for Mongoose schemas and controllers",
      "Automated documentation generation and error handling patterns",
    ],
    outcome:
      "Delivered a production-ready REST API with full CRUD operations, authentication middleware, and seamless MongoDB integration deployed on Vercel.",
    tools: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Postman",
      "GitHub Actions",
      "Vercel",
    ],
    link: "https://github.com/kmgmedia/byway_backend",
  },
  {
    icon: Store,
    title: "Byc eCommerce Platform",
    client: "Reimagining Online Retail",
    goal: "Create a complete shopping experience with seamless product discovery, secure checkout, and real-time inventory visibility.",
    strategy: [
      "AI-generated user flow optimization for intuitive navigation",
      "Prompt-engineered content for product descriptions and categories",
      "Conversion-focused UX patterns using AI-assisted design decisions",
    ],
    outcome:
      "Built a robust eCommerce frontend with smooth cart management, order tracking, and payment integration, delivering trust and performance across all devices.",
    tools: [
      "HTML",
      "CSS/Sass",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Bootstrap",
    ],
    link: "https://byc-website-pi.vercel.app/",
  },
  {
    icon: School,
    title: "Sandton Preparatory School Website",
    client: "Educational Institution",
    goal: "Design and develop a comprehensive school website to showcase programs, enable online bookings, and engage parents with educational content.",
    strategy: [
      "AI-generated compelling copy for core values, curriculum, and program descriptions",
      "Prompt-engineered content strategy for blog posts and parenting insights",
      "UX copywriting optimized for parent trust and enrollment conversions",
    ],
    outcome:
      "Launched a complete school website serving 100+ students with class booking, events calendar, blog section, and multi-age curriculum showcase, achieving 95% parent satisfaction.",
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Cloudinary",
      "Responsive Design",
      "SEO Optimization",
    ],
    link: "https://www.sandtonprepschool.com.ng/",
  },
  {
    icon: LayoutDashboard,
    title: "Project Tracker Dashboard",
    client: "Live Data & Workflow Management",
    goal: "Build a sleek, fully responsive dashboard with secure authentication, lightning-fast performance, and real-time data syncing.",
    strategy: [
      "AI-powered component architecture design for optimal performance",
      "Prompt-driven UI/UX decisions for clean, modern interface patterns",
      "AI-assisted authentication flow and data model optimization",
    ],
    outcome:
      "Delivered a production-ready dashboard with real-time data syncing, secure Supabase authentication, and seamless responsive design across all devices with live insights.",
    tools: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
      "Sonner",
    ],
    link: "https://dashboard-auth-full-stack.vercel.app/",
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
                project.link
                  ? window.open(project.link, "_blank")
                  : (window.location.href = "mailto:morufbadebola@gmail.com")
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
