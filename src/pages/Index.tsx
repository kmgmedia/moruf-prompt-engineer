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
        <title>Moruf Adebola | AI Automation & Systems Engineer</title>
        <meta name="description" content="Applied AI Engineer specialising in intelligent automation systems, AI chatbots, and workflow solutions. Explore portfolio projects and case studies." />
        <link rel="canonical" href="https://www.morufdesigndev.com/" />
        <meta property="og:url" content="https://www.morufdesigndev.com/" />
        <meta property="og:title" content="Moruf Adebola | AI Automation & Systems Engineer" />
        <meta property="og:description" content="Applied AI Engineer specialising in intelligent automation systems, AI chatbots, and workflow solutions. Explore portfolio projects and case studies." />
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
