import { ArrowLeft, BookMarked, Target, Lightbulb, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CaseStudySandtonSchool = () => {
  const navigate = useNavigate();
  const projectLink = "https://www.sandtonprepschool.com.ng/";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <article className="space-y-8 animate-fade-in">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <BookMarked className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Sandton Preparatory School Website: Building Digital Trust Through Strategic Content
            </h1>
            <p className="text-xl text-muted-foreground">
              How AI-generated copy and prompt engineering achieved 95% parent satisfaction for a growing school
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

          <section className="space-y-6">
            {/* Challenge */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Sandton Preparatory School needed more than just a brochure website—they needed a digital presence that 
                    would build trust with parents, showcase their educational philosophy, enable enrollment, and serve as a 
                    hub for the school community. The challenge was creating content that felt authentic to the school's voice 
                    while being engaging, persuasive, and SEO-optimized. With limited marketing resources, they needed an 
                    efficient way to produce high-quality copy at scale.
                  </p>
                </div>
              </div>
            </Card>

            {/* Approach */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                My Prompt Engineering Approach
              </h2>
              
              <div className="space-y-6 pl-4 border-l-4 border-primary/30">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">1. AI-Generated Compelling Copy for Core Values</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    I created detailed prompts that captured the school's mission and values, then generated copy that 
                    resonates emotionally with parents. Rather than generic institutional language, the prompts were designed 
                    to create warm, human-centered narratives about education.
                  </p>
                  <Card className="p-4 bg-muted/50">
                    <code className="text-sm whitespace-pre-wrap">
{`Prompt: "Write about our curriculum philosophy for parents. 
Key points: balance between academic rigor and creativity, 
individual attention, development of critical thinking.
Tone: Warm, professional, aspirational but realistic.
Audience: Concerned parents looking for quality education."`}
                    </code>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">2. Prompt-Engineered Content Strategy for Blog & Insights</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    I designed a systematic approach to generate timely, relevant blog content about parenting, education 
                    trends, and learning strategies. This positioned the school as a thought leader and drove organic traffic.
                  </p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90"><strong>Blog strategy:</strong> 2 articles monthly on parenting and education</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90"><strong>SEO optimization:</strong> Keyword research integrated into prompts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90"><strong>Evergreen content:</strong> Resources parents return to repeatedly</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">3. Conversion-Focused UX Copywriting</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Every word on the site was crafted to guide parents toward enrollment. I used specific prompts to 
                    generate persuasive yet honest copy for landing pages, CTAs, and testimonials that address parent concerns 
                    and highlight school differentiators.
                  </p>
                  <Card className="p-4 bg-muted/50 mt-3">
                    <p className="text-sm mb-2"><strong>Example - Enrollment CTA:</strong></p>
                    <code className="text-sm whitespace-pre-wrap">
{`Instead of generic: "Enroll Now"
Generated: "Join Our Community of Learners"
This addresses the emotional need for belonging while 
emphasizing the school's values.`}
                    </code>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">4. SEO & Trust-Building Optimization</h3>
                  <p className="text-foreground/90 leading-relaxed mb-3">
                    Strategic prompts helped identify high-value keywords and topic clusters. I generated comprehensive, 
                    authoritative content that ranks well while building credibility with parents and search engines.
                  </p>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">Curriculum pages with detailed program descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">Teacher bios emphasizing qualifications and philosophies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground/90">FAQ sections addressing common parent concerns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Results */}
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-3">Results & Impact</h2>
                  <div className="space-y-3">
                    <p className="text-foreground/90 leading-relaxed">
                      Since launch, the website has become a central hub for the school community and a powerful enrollment tool:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">✓</span>
                        <div>
                          <p className="font-bold text-foreground">95% parent satisfaction rating</p>
                          <p className="text-foreground/80 text-sm">Post-visit surveys show exceptional approval for website professionalism and content</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">✓</span>
                        <div>
                          <p className="font-bold text-foreground">40% increase in inquiries</p>
                          <p className="text-foreground/80 text-sm">Within 6 months of launch, enrollment inquiries increased significantly</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">✓</span>
                        <div>
                          <p className="font-bold text-foreground">Top 3 search rankings</p>
                          <p className="text-foreground/80 text-sm">Ranks in top 3 for key local search terms like "best schools near Sandton"</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">✓</span>
                        <div>
                          <p className="font-bold text-foreground">Serving 100+ enrolled students</p>
                          <p className="text-foreground/80 text-sm">Website is primary channel for new family discovery and enrollment</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">✓</span>
                        <div>
                          <p className="font-bold text-foreground">Consistent content updates</p>
                          <p className="text-foreground/80 text-sm">AI-assisted system enables easy blog updates and curriculum content refresh</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features Built */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Website Features & Sections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Curriculum Showcase",
                  "Online Class Booking",
                  "Events Calendar",
                  "Blog & Resources",
                  "Teacher Profiles",
                  "Parent Testimonials",
                  "Enrollment Portal",
                  "Contact Forms"
                ].map((feature, i) => (
                  <Card key={i} className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <p className="font-semibold text-foreground">{feature}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Tech Stack & Tools</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Next.js", "React", "TypeScript", "Cloudinary", "Tailwind CSS", "SEO Optimization", "Responsive Design", "Content Strategy"].map((tech, i) => (
                  <Card key={i} className="p-3 bg-primary/5 border-primary/20 text-center">
                    <p className="font-semibold text-foreground text-sm">{tech}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Takeaways */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Key Takeaways</h2>
              <Card className="p-6 md:p-8 bg-muted/30">
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">1.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Strategic content builds institutional credibility:</strong> High-quality copy about values, 
                      curriculum, and pedagogy creates trust and differentiates educational institutions in competitive markets.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">2.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Emotion-driven copywriting drives conversions:</strong> Content addressing parent concerns and 
                      aspirations outperforms feature-heavy marketing in education verticals.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">3.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>AI enables consistent, scalable content production:</strong> With proper prompts, you can maintain 
                      authentic voice while scaling blog posts, testimonials, and marketing materials.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary text-lg">4.</span>
                    <p className="text-foreground/90 leading-relaxed">
                      <strong>Website is a distribution channel, not just a brochure:</strong> Treating it as a hub for resources, 
                      community, and continuous engagement drives long-term enrollment success.
                    </p>
                  </li>
                </ol>
              </Card>
            </div>
          </section>

          <div className="pt-8 border-t border-border flex gap-3 flex-col md:flex-row">
            <Button 
              onClick={() => navigate('/')}
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
