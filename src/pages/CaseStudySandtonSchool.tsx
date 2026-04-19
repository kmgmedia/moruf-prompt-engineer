import {
  ArrowLeft,
  BookMarked,
  Target,
  Lightbulb,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const CaseStudySandtonSchool = () => {
  const navigate = useNavigate();
  const projectLink = "https://www.sandtonprepschool.com.ng/";

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
              <BookMarked className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Sandton Preparatory School Digital Platform
            </h1>
            <p className="text-xl text-muted-foreground">
              Building a high-conversion website that drives enrollment,
              engagement, and parent trust.
            </p>
          </header>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 bg-gradient-primary rounded-2xl overflow-hidden flex items-center justify-center group">
            <img
              src="/projects/sandton-school.png"
              alt="Sandton Preparatory School Website"
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
                Sandton Preparatory School needed more than a basic website —
                they required a digital platform that could showcase their
                programs, build trust with parents, and support student
                enrollment.
              </p>
            </div>

            {/* Challenge */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    The school lacked a centralized digital presence that
                    effectively communicated its values, curriculum, and
                    offerings. This made it difficult to attract new families,
                    engage existing parents, and manage consistent
                    communication.
                  </p>
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
                I designed and developed a modern, responsive web platform that
                combines structured content, intuitive navigation, and
                conversion-focused user experience to support both engagement
                and enrollment.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                The platform enables:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Clear presentation of curriculum and programs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Easy access to school information and resources
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Seamless inquiry and enrollment experience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Ongoing engagement through content and updates
                  </span>
                </li>
              </ul>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="space-y-3">
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Curriculum and program showcase with structured layout
                  </span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Online class booking and event scheduling</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Blog and resource hub for parent engagement</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Teacher profiles and testimonials to build trust</span>
                </p>
                <p className="text-foreground/90 leading-relaxed font-semibold flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Optimized user flows for inquiries and enrollment</span>
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
                    The platform was built to function as both an information
                    hub and a conversion tool.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    Content structure, navigation, and page flow were designed
                    to guide parents from discovery to inquiry, while
                    maintaining clarity and trust throughout the experience.
                  </p>
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
                    The platform delivered measurable results within the first 6
                    months:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        95% parent satisfaction rating
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        40% increase in enrollment inquiries
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Top 3 search rankings for key local education terms
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">
                        Supporting 100+ enrolled students through the platform
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
                The system was developed using a modern frontend architecture
                with performance, scalability, and SEO in mind.
              </p>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                This includes:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Optimized page structure for search visibility
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Responsive design for mobile and desktop users
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Efficient media handling and content delivery
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground/90">
                    Scalable component-based architecture
                  </span>
                </li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Cloudinary",
                  "Tailwind CSS",
                  "SEO Optimization",
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
                      Digital Platform as Growth Engine
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      A well-designed digital platform can serve as a primary
                      growth engine for an institution, driving enrollment,
                      engagement, and operational efficiency.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      System Design + UX + Content = Trust
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Combining thoughtful system design, intuitive user
                      experience, and structured content creates a foundation
                      for building trust and credibility with your audience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Conversion Comes From Clarity
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Clear information architecture and conversion-focused
                      navigation remove friction from the buyer's journey,
                      turning a website into a functional business tool.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">
                      Measurable Impact Matters
                    </h4>
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      Success should be measured through business metrics
                      (satisfaction, inquiries, rankings, enrollment) rather
                      than just technical performance metrics.
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

export default CaseStudySandtonSchool;
