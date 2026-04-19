import {
  ArrowLeft,
  Code,
  Target,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const CaseStudyBywayBackendAPI = () => {
  const navigate = useNavigate();
  const projectLink = "https://github.com/yourusername/byway-backend-api";

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground opacity={0.6} subtle={true} />
      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 hover:text-white hover:bg-primary/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <article className="space-y-8 animate-fade-in">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Code className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Byway Backend API System
            </h1>
            <p className="text-xl text-muted-foreground">
              End-to-End REST API for Product Review Platform
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/byway-api.png"
              alt="Byway Backend API System Interface"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="w-full h-1 bg-gradient-primary rounded-full" />

          <section className="space-y-8">
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-foreground/90 leading-relaxed">
                A backend API system designed to manage product reviews, user authentication, and role-based access for a scalable web platform.
              </p>
            </div>

            {/* Challenge */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Building a backend system required handling authentication, structured data management, and secure access control while maintaining scalability and performance.
                  </p>
                  <p className="text-foreground/90 leading-relaxed font-semibold">
                    The goal was to create an API that is:
                  </p>
                  <ul className="space-y-2 pl-4 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">Secure and reliable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">Easy to maintain and extend</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">Efficient in handling data operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">Ready for production use</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Solution */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                The Solution
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                I designed and implemented a RESTful API that supports user management, product reviews, and role-based permissions using a modular architecture.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="space-y-3">
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Full CRUD operations for product reviews and users</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Role-based access control (RBAC)</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Authentication middleware for protected routes</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Structured API architecture for scalability</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>MongoDB integration for efficient data persistence</span>
                </p>
              </div>
            </div>

            {/* System Design */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">System Design</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    The API follows a modular structure with separation of concerns across routes, controllers, and data models.
                  </p>
                  <p className="text-foreground/90 leading-relaxed font-semibold mb-3">
                    Key design considerations include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">Middleware-based authentication and authorization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">Schema validation using Mongoose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">Clean routing structure for maintainability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">Scalable architecture aligned with clean design principles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    The system demonstrated strong backend reliability:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">Secure authentication and protected endpoints</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">Efficient database operations and query handling</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">Scalable structure for future expansion</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">Production-ready API deployment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Technical Implementation */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                Technical Implementation
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                Built using Node.js and Express, the API integrates MongoDB for data storage and uses middleware for validation and security.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                Core implementation includes:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">JWT-based authentication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">Request validation and error handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">Mongoose schemas for structured data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">API testing with Postman</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">CI/CD setup for deployment readiness</span>
                </li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Mongoose",
                  "Postman",
                  "GitHub Actions",
                  "Vercel",
                ].map((tech, i) => (
                  <Card
                    key={i}
                    className="p-3 bg-primary/5 border-primary/20 text-center"
                  >
                    <p className="font-semibold text-foreground text-sm">
                      {tech}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 bg-muted/30">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Clean Architecture Improves Maintainability
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Proper separation of concerns across routes, controllers, and models makes APIs easier to maintain and extend over time.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Security Must Be Built Early
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Integrating authentication and access control from the start prevents security vulnerabilities and rework later.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Well-Structured APIs Simplify Integration
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Clear API design with consistent patterns and proper documentation makes frontend integration straightforward and efficient.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Production Readiness Requires Testing and Deployment Strategy
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      API testing, validation, and CI/CD pipelines are essential for ensuring reliability and smooth deployment to production.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <div className="pt-8 border-t border-border flex gap-3 flex-col md:flex-row">
            <Button
              onClick={() => navigate("/")}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Case Studies
            </Button>
            <Button
              onClick={() => window.open(projectLink, "_blank")}
              size="lg"
              className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
            >
              View Live Project →
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CaseStudyBywayBackendAPI;
