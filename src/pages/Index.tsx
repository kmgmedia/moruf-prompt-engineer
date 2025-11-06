import { Hero } from "@/components/Hero";
import { FocusAreas } from "@/components/FocusAreas";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Experiments } from "@/components/Experiments";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <FocusAreas />
      <Process />
      <Projects />
      <Experiments />
      <CaseStudies />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
