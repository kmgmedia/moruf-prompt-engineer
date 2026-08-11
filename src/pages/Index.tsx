import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
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
      <Helmet>
        <title>Moruf Adebola | AI Automation Engineer & Full-Stack Developer</title>
        <meta name="description" content="Software Engineer focused on AI-powered automation, full-stack development, and intelligent workflow systems. Explore case studies and projects by Moruf Adebola." />
        <link rel="canonical" href="https://www.morufstackdev.com.ng/" />
        <meta property="og:url" content="https://www.morufstackdev.com.ng/" />
        <meta property="og:title" content="Moruf Adebola | AI Automation Engineer & Full-Stack Developer" />
        <meta property="og:description" content="Software Engineer focused on AI-powered automation, full-stack development, and intelligent workflow systems. Explore case studies and projects by Moruf Adebola." />
      </Helmet>
      <Hero />
      <About />
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
