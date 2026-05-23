import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ShoppingCart,
  Palette,
  Database,
  Store,
  School,
  LayoutDashboard,
  Building2,
  ScanLine,
  Globe2,
} from "lucide-react";

const PROJECTS_PER_PAGE = 6;

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
    caseStudy: "/case-study/ecommerce-sales-automation",
  },
  {
    icon: Building2,
    image: "/projects/property-intelligence.png",
    title: "AI Property Intelligence Assistant",
    client: "NaijaRealty AI System",
    goal: "Build an AI-powered property assistant that helps real estate teams and clients instantly search listings, answer property questions, and automate lead engagement.",
    strategy: [
      "AI-powered property search and recommendations",
      "Conversational real estate assistant with memory",
      "Automated lead capture and inquiry handling",
      "Daily analytics and interaction reporting",
    ],
    outcome:
      "Reduced response delays, improved property discovery speed, and enabled 24/7 automated client engagement.",
    tools: [
      "n8n",
      "OpenAI",
      "Pinecone",
      "React",
      "Gmail API",
      "Webhooks & APIs",
      "Vector Search",
    ],
    link: "https://realestatewebsite-main.vercel.app/",
    caseStudy: "/case-study/property-intelligence-assistant",
  },
  {
    icon: ScanLine,
    image: "/jobscraping1.png",
    title: "AI Job Intelligence & Resume Automation System",
    client: "Personal Productivity & Job Ops",
    goal:
      "Reduce manual effort in job searching and resume tailoring while improving role alignment and application throughput.",
    strategy: [
      "Automated LinkedIn scraping and normalization",
      "AI fit scoring and keyword extraction",
      "Programmatic resume rewriting and Google Docs generation",
    ],
    outcome:
      "Operationalized job discovery and automated resume generation, increasing application throughput while maintaining quality.",
    tools: [
      "n8n",
      "OpenAI API",
      "Apify",
      "Google Docs API",
      "Google Sheets API",
      "JavaScript",
    ],
    link: "",
    caseStudy: "/case-study/ai-job-intelligence",
  },
  {
    icon: ScanLine,
    image: "/projects/gatepass-system.png",
    title: "GatePass System",
    client: "Smart Event Access & Guest Verification System",
    goal: "Build an operational event access platform that streamlines guest check-in, improves entry coordination, and reduces gate management chaos during live events.",
    strategy: [
      "QR-based guest verification for fast event access",
      "Real-time attendance tracking and check-in visibility",
      "Structured gate workflows for event staff coordination",
      "Digital guest data management and reporting",
    ],
    outcome:
      "Improved event entry flow, reduced unauthorized access, and digitized guest verification for more coordinated live event operations.",
    tools: [
      "Node.js",
      "React.js",
      "QR Verification",
      "REST APIs",
      "Database Systems",
      "Real-Time Check-In",
    ],
    link: "",
    caseStudy: "/case-study/gatepass-system",
  },
  {
    icon: Globe2,
    image: "/projects/gatepass-website.png",
    title: "GatePass Website",
    client: "Product Marketing & Event Operations Showcase Platform",
    goal: "Create a public-facing product website that explains the GatePass ecosystem, communicates operational value, and drives event service inquiries.",
    strategy: [
      "Product-centered landing experience for event planners",
      "Clear service, pricing, and workflow presentation",
      "Mobile-responsive product storytelling and inquiry flow",
      "Brand positioning for digital event access services",
    ],
    outcome:
      "Improved product clarity, strengthened digital brand positioning, and created a centralized inquiry channel for prospective event clients.",
    tools: [
      "React.js",
      "Frontend UI",
      "Responsive Design",
      "Landing Page",
      "Product Architecture",
      "Web Interaction Design",
    ],
    link: "https://www.gatepasscheckin.com.ng/",
    caseStudy: "/case-study/gatepass-website",
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
    caseStudy: "/case-study/byway-backend-api",
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
      "Express.js",
      "MongoDB",
      "Bootstrap",
    ],
    link: "https://byc-website-pi.vercel.app/",
    caseStudy: "/case-study/byc-ecommerce",
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
    link: "mailto:morufbadebola@gmail.com?subject=Creative%20Storytelling%20Prompts%20Project",
    caseStudy: "/case-study/emotional-ai",
  },
 
];

export const Projects = () => {
  const navigate = useNavigate();
  const sectionRef = React.useRef<HTMLElement>(null);
  const [imageStates, setImageStates] = React.useState<Record<number, boolean>>(
    {},
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = projects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  );

  const scrollToProjects = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToProjects();
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
    scrollToProjects();
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
    scrollToProjects();
  };

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
    <section ref={sectionRef} id="projects" className="py-24 px-2 md:px-4">
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
          {visibleProjects.map((project, index) => {
            const projectIndex = startIndex + index;

            return (
            <Card
              key={project.title}
              className="overflow-hidden bg-card hover:bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-slide-up flex flex-col h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative h-48 md:h-56 bg-gradient-primary overflow-hidden flex items-center justify-center group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover contrast-110 saturate-125 group-hover:scale-105 transition-transform duration-300"
                  onLoad={() => handleImageLoad(projectIndex)}
                  onError={(e) => handleImageError(projectIndex, e)}
                />
                {/* Fallback icon if image fails to load */}
                {imageStates[projectIndex] === false && (
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
            );
          })}
        </div>

        {totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="Project pagination"
          >
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary transition-colors hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous projects"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`h-10 min-w-10 px-3 rounded-md text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary transition-colors hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next projects"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};
