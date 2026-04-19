import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import React from "react";
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
    image: "/projects/teacher-ai.png",
    title: "AI Teaching Assistant System",
    client: "Sandton Preparatory School",
    goal: "Develop a system to help teachers generate lesson notes, student reports, and parent communication more efficiently.",
    strategy: [
      "Automated generation of lesson notes and teaching materials",
      "Consistent and structured student report creation",
      "Simplified parent communication with tone-controlled messaging",
    ],
    outcome:
      "Reduced teachers' writing time by 60% and improved consistency across classes.",
    tools: ["Python", "Gemini API", "Google Sheets Integration", "Streamlit"],
    link: "https://teacher-ai-assistant-cr.streamlit.app/",
    caseStudy: "/case-study/teacher-ai",
  },
  {
    icon: ShoppingCart,
    image: "/projects/ecommerce-chatbot.png",
    title: "E-Commerce Sales Automation System",
    client: "Dropshipping Business",
    goal: "Build a 24/7 system that handles customer inquiries, recommends products, and streamlines the order process.",
    strategy: [
      "Intelligent product recommendations based on user intent",
      "Context-aware conversations for smooth user experience",
      "Automated response handling for customer inquiries",
    ],
    outcome:
      "Increased conversion rate by 22% within the first month of pilot testing.",
    tools: ["Gemini API", "Python", "LangChain", "Telegram API"],
    link: "https://saleschatbotfile.vercel.app/",
    caseStudy: "/case-study/ecommerce-chatbot",
  },
  {
    icon: Database,
    image: "/projects/byway-api.png",
    title: "Byway Backend API System",
    client: "End-to-End REST API Development",
    goal: "Build a scalable backend system for a product review platform with user management, role-based access control, and secure data handling.",
    strategy: [
      "Full CRUD operations for product reviews and user data",
      "Role-based access control and authentication middleware",
      "Structured API architecture for scalability and maintainability",
      "Seamless integration with MongoDB for data persistence",
    ],
    outcome:
      "Delivered a production-ready backend system with secure authentication, efficient data handling, and deployment-ready infrastructure.",
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
    image: "/projects/byc-ecommerce.png",
    title: "BYC eCommerce Platform",
    client: "Full-Stack eCommerce Application",
    goal: "Build a modern eCommerce platform with seamless product discovery, secure checkout, and real-time inventory handling.",
    strategy: [
      "Intuitive product browsing and category navigation",
      "Shopping cart and secure checkout flow",
      "Order tracking and user account management",
      "Real-time inventory updates and product management",
    ],
    outcome:
      "Delivered a scalable and user-friendly eCommerce platform that improves shopping experience and supports reliable transaction handling.",
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
    image: "/projects/sandton-school.png",
    title: "Sandton Preparatory School Website",
    client: "Educational Platform & School Management Interface",
    goal: "Design and develop a comprehensive website to showcase school programs, enable online bookings, and improve parent engagement.",
    strategy: [
      "Program showcase with structured curriculum presentation",
      "Online class booking and event scheduling system",
      "Blog and content management for parent engagement",
      "Fully responsive design optimized for all devices",
    ],
    outcome:
      "Delivered a complete digital platform supporting over 100+ students, improving parent interaction and simplifying school communication and bookings.",
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Cloudinary",
      "Responsive Design",
      "SEO Optimization",
    ],
    link: "https://www.sandtonprepschool.com.ng/",
    caseStudy: "/case-study/sandton-school",
  },
  {
    icon: LayoutDashboard,
    image: "/projects/dashboard.png",
    title: "Project Tracker Dashboard",
    client: "Real-Time Data & Workflow Management System",
    goal: "Build a high-performance dashboard for tracking projects, managing workflows, and visualizing real-time data securely.",
    strategy: [
      "Real-time data updates and live project tracking",
      "Secure authentication using Supabase",
      "Clean and responsive UI optimized for usability",
      "Scalable component structure for maintainability",
    ],
    outcome:
      "Delivered a production-ready dashboard that provides live insights, improves workflow visibility, and ensures reliable performance across devices.",
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
    caseStudy: "/case-study/dashboard",
  },
  {
    icon: Palette,
    image: "/projects/storytelling-prompts.png",
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
  const navigate = useNavigate();
  const [imageStates, setImageStates] = React.useState<Record<number, boolean>>(
    {},
  );

  const handleCaseStudyClick = (caseStudyPath: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(caseStudyPath);
  };

  const handleProjectLinkClick = (link: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (link) {
      window.open(link, "_blank");
    }
  };

  const handleImageLoad = (index: number) => {
    setImageStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageError = (
    index: number,
    e: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    setImageStates((prev) => ({ ...prev, [index]: false }));
    e.currentTarget.style.display = "none";
  };

  return (
    <section id="projects" className="py-24 px-2 md:px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Selected <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-world systems built with AI, automation, and software
            engineering
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-card hover:bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-slide-up flex flex-col h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative h-32 md:h-40 bg-gradient-primary overflow-hidden flex items-center justify-center group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onLoad={() => handleImageLoad(index)}
                  onError={(e) => handleImageError(index, e)}
                />
                {/* Fallback icon if image fails to load */}
                {imageStates[index] === false && (
                  <div className="absolute inset-0 bg-gradient-primary flex items-center justify-center pointer-events-none">
                    <project.icon className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground opacity-50" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 flex-1 flex flex-col space-y-2 md:space-y-3">
                <div>
                  <h3 className="text-lg md:text-2xl font-bold mb-1 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-primary text-xs md:text-sm font-medium">
                    {project.client}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">
                    Goal
                  </h4>
                  <p className="text-foreground/90 text-xs md:text-sm">
                    {project.goal}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">
                    Solution
                  </h4>
                  <p className="text-foreground/90 text-xs md:text-sm">
                    {project.strategy[0] || project.outcome}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-0.5 md:space-y-1">
                    {project.strategy.map((item, i) => (
                      <li
                        key={i}
                        className="text-foreground/90 text-xs md:text-sm flex items-start"
                      >
                        <span className="text-primary mr-2 flex-shrink-0">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">
                    Impact
                  </h4>
                  <p className="text-foreground/90 text-xs md:text-sm font-medium">
                    {project.outcome}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 md:gap-2 pt-1 md:pt-2">
                  {project.tools.map((tool, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 text-xs"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3 md:mt-4 pt-2 md:pt-3 border-t border-border/30">
                  {project.caseStudy && (
                    <button
                      onClick={(e) =>
                        handleCaseStudyClick(project.caseStudy, e)
                      }
                      className="flex-1 px-3 py-2 md:px-4 md:py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs md:text-sm font-medium rounded-md transition-colors"
                    >
                      Read Case Study
                    </button>
                  )}
                  {project.link && (
                    <button
                      onClick={(e) => handleProjectLinkClick(project.link, e)}
                      className="flex-1 px-3 py-2 md:px-4 md:py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs md:text-sm font-medium rounded-md border border-primary/20 transition-colors"
                    >
                      View Project
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
