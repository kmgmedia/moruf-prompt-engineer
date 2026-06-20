import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ShoppingCart,
  Target,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const CaseStudyBYCEcommerce = () => {
  const navigate = useNavigate();
  const projectLink = "https://github.com/yourusername/byc-ecommerce";

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Helmet>
        <title>BYC Ecommerce Platform | Moruf Adebola</title>
        <meta name="description" content="Case study: BYC full-stack ecommerce platform with product management, cart system, and integrated checkout built with modern web technologies." />
        <link rel="canonical" href="https://www.morufdesigndev.com/case-study/byc-ecommerce" />
        <meta property="og:url" content="https://www.morufdesigndev.com/case-study/byc-ecommerce" />
        <meta property="og:title" content="BYC Ecommerce Platform | Moruf Adebola" />
        <meta property="og:description" content="Case study: BYC full-stack ecommerce platform with product management, cart system, and integrated checkout built with modern web technologies." />
      </Helmet>
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
              <ShoppingCart className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              BYC eCommerce Platform
            </h1>
            <p className="text-xl text-muted-foreground">
              Full-Stack eCommerce Application
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/byc-ecommerce.png"
              alt="BYC eCommerce Platform Interface"
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
                A full-stack eCommerce platform built to deliver a seamless
                shopping experience, including product discovery, cart
                management, secure checkout, and real-time inventory handling.
              </p>
            </div>

            {/* Challenge */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Designing an eCommerce system requires handling multiple
                    user flows: browsing products, managing carts, processing
                    orders, and maintaining accurate inventory.
                  </p>
                  <p className="text-foreground/90 leading-relaxed font-semibold">
                    The challenge was to build a system that is:
                  </p>
                  <ul className="space-y-2 pl-4 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        Easy to use for customers
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        Reliable for transactions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        Efficient in handling product data
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">
                        Scalable for future growth
                      </span>
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
                I developed a full-stack application that allows users to browse
                products, add items to cart, complete purchases, and manage
                their orders, while ensuring smooth data flow between frontend
                and backend.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="space-y-3">
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Product browsing with structured categories and navigation
                  </span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Shopping cart and secure checkout process</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Order tracking and user account management</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Real-time inventory updates and product management
                  </span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Backend data handling for products, users, and orders
                  </span>
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
                    The platform follows a client-server architecture,
                    separating frontend interactions from backend logic and
                    database management.
                  </p>
                  <p className="text-foreground/90 leading-relaxed font-semibold mb-3">
                    Key design considerations include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">
                        Clear separation between UI and backend services
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">
                        Efficient data handling for cart and inventory updates
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">
                        RESTful communication between client and server
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-foreground/90">
                        Scalable structure for adding features like payments and
                        analytics
                      </span>
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
                    The system delivered a stable and functional shopping
                    experience:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Smooth product browsing and navigation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Reliable checkout and order flow
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Consistent inventory management
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Scalable foundation for future enhancements
                      </span>
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
                The application was built using JavaScript for both frontend and
                backend, with Node.js handling server logic and MongoDB managing
                data persistence.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                Core implementation includes:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    RESTful APIs for product, user, and order operations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Backend logic for cart and inventory updates
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Database schema design using MongoDB
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Responsive UI built with HTML, CSS, and Bootstrap
                  </span>
                </li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "HTML",
                  "CSS/Sass",
                  "JavaScript",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Bootstrap",
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
                      End-to-End System Design is Critical
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      eCommerce requires coordination between frontend, backend,
                      and database layers. Proper planning prevents integration
                      issues and improves overall reliability.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Data Consistency Matters
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Proper handling of inventory and orders prevents system
                      errors and improves reliability. Real-time synchronization
                      is essential for accuracy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Simplicity Improves Usability
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Clear navigation and checkout flow enhance user
                      experience. Reducing friction in the purchase process
                      directly impacts conversion and customer satisfaction.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Scalability Should Be Considered Early
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      A structured backend allows easy addition of features like
                      payments and analytics. Building with scalability in mind
                      prevents costly refactoring later.
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

export default CaseStudyBYCEcommerce;
