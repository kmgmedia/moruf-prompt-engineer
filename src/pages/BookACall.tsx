import { useState } from "react";
import { ArrowLeft, MessageSquare, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";

const BookACall = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.projectType) {
      // Log form data for potential backend integration
      console.log("Form submitted:", formData);

      // Show success state
      setSubmitted(true);
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      projectType: "",
      description: "",
    });
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <AnimatedBackground opacity={0.6} subtle={true} />
        <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[600px] space-y-8 animate-fade-in">
            <div className="rounded-full bg-primary/10 border border-primary/20 p-6">
              <Check className="w-16 h-16 text-primary" />
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Got it!{" "}
                <span className="text-primary">Thanks for reaching out</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                I've received your information and I'm already thinking about
                your automation challenge.
              </p>
            </div>

            <Card className="p-8 md:p-10 bg-primary/5 border-primary/20 max-w-2xl">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">
                    What happens next:
                  </strong>
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      1.
                    </span>
                    <span>
                      I'll review your workflow details and automation goals
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      2.
                    </span>
                    <span>
                      I'll send you a calendar link to book our 20-30 minute
                      discovery call
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold flex-shrink-0">
                      3.
                    </span>
                    <span>
                      We'll talk through exactly what you want to automate and
                      explore solutions
                    </span>
                  </li>
                </ul>
              </div>
            </Card>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Check your email at <strong>{formData.email}</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="flex-1"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={handleSubmitAnother}
                  className="flex-1 bg-primary hover:bg-primary/90 shadow-glow"
                >
                  Submit Another Request
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground opacity={0.6} subtle={true} />
      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Let's Talk
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Tell me what you want to
              <span className="text-primary"> automate</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share what you're currently doing manually in your business or
              workflow, and I'll explore how automation systems can improve it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-primary/5 border-primary/20 text-center">
              <div className="flex justify-center mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quick Chat</h3>
              <p className="text-sm text-muted-foreground">
                20-30 minute discovery call
              </p>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20 text-center">
              <div className="flex justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Share Details</h3>
              <p className="text-sm text-muted-foreground">
                Fill out the form below
              </p>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20 text-center">
              <div className="flex justify-center mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Done</h3>
              <p className="text-sm text-muted-foreground">
                Get a calendar link via email
              </p>
            </Card>
          </div>

          <Card className="p-8 md:p-12 bg-card border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  What do you want to automate? *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="chatbot">AI Chatbot / Assistant</option>
                  <option value="automation">
                    Automation System / Workflow
                  </option>
                  <option value="integration">
                    API Integration / System Connection
                  </option>
                  <option value="dashboard">Dashboard / Data System</option>
                  <option value="webapp">Web Application</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Tell me more about your workflow
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what you're currently doing manually, the challenges you face, and what success looks like..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Trust Message */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I focus on building real automation systems — not just
                  prototypes or ideas. Every solution I build is designed to
                  reduce manual work, connect your tools, and improve how your
                  business actually operates.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 shadow-glow"
                >
                  Book a Call
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookACall;
