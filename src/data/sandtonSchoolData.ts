import {
  BarChart2,
  BookOpen,
  Globe2,
  Image,
  Layers,
  Layout,
  Monitor,
  Rocket,
  Search,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const problemItems = [
  "No centralized digital platform representing the school's curriculum and values",
  "Difficulty attracting new families without a professional online presence",
  "Parent engagement was limited to physical communication with no digital channel",
  "Enrollment inquiries had no structured digital pathway: all handled manually by phone",
  "School events, updates, and achievements had no accessible public communication channel",
  "Competing schools with digital platforms were capturing parents at the discovery stage",
];

export const solutionItems = [
  "Modern responsive web platform showcasing curriculum, programs, and school culture",
  "Structured enrollment inquiry flow guiding parents from discovery to application",
  "Parent engagement hub with events, updates, and school news",
  "Teacher profiles and testimonials building institutional credibility and trust",
  "SEO-optimized content architecture for local education search visibility",
  "Cloudinary-powered media delivery for fast, high-quality image and gallery loading",
];

export const pipelineStages = [
  { label: "Discovery", sublabel: "Audit & research", icon: Search },
  { label: "Information Arch.", sublabel: "Page hierarchy", icon: Layout },
  { label: "Design System", sublabel: "Brand & UI tokens", icon: Image },
  { label: "Development", sublabel: "Next.js + Tailwind", icon: Monitor },
  { label: "SEO & Performance", sublabel: "Meta, speed, CDN", icon: Globe2 },
  { label: "Launch", sublabel: "Deploy & analytics", icon: Rocket },
];

export const architectureLayers = [
  {
    layer: "Frontend Layer",
    color: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: Monitor,
    components: ["Next.js 13+ App Router", "React Component Library", "TypeScript", "Tailwind CSS"],
  },
  {
    layer: "Content Layer",
    color: "bg-purple-500/10 border-purple-500/30",
    textColor: "text-purple-400",
    icon: BookOpen,
    components: ["Curriculum & Programs", "Events & School News", "Blog & Resources", "Teacher Profiles"],
  },
  {
    layer: "Integration Layer",
    color: "bg-primary/10 border-primary/30",
    textColor: "text-primary",
    icon: Layers,
    components: ["Cloudinary CDN", "Enrollment Inquiry Forms", "Email Notification Routing", "Contact Integrations"],
  },
  {
    layer: "Infrastructure Layer",
    color: "bg-green-500/10 border-green-500/30",
    textColor: "text-green-400",
    icon: Rocket,
    components: ["Vercel Hosting", "SEO Optimization", "Google Analytics", "Custom Domain & SSL"],
  },
];

export const enrollmentFunnel = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Parent searches for preparatory schools in the area. SEO-optimized content and structured metadata surface the Sandton Preparatory School website in relevant local search results.",
    icon: Search,
  },
  {
    step: "02",
    title: "Exploration",
    description:
      "Parent browses curriculum pages, grade structures, extracurricular programs, and teaching philosophy. Content is structured to answer the most common parent questions before they need to ask.",
    icon: BookOpen,
  },
  {
    step: "03",
    title: "Trust Building",
    description:
      "Parent reviews teacher profiles, parent testimonials, achievement highlights, and school gallery. Social proof is structured across multiple pages to build confidence progressively.",
    icon: Users,
  },
  {
    step: "04",
    title: "Inquiry Submission",
    description:
      "Parent submits an enrollment inquiry through the structured contact form. The form captures grade level, student details, and preferred contact method for efficient follow-up.",
    icon: Zap,
  },
];

export const keyFeatures = [
  {
    title: "Curriculum & Program Showcase",
    description:
      "Structured pages covering every grade level, subject offering, and extracurricular program, giving parents the depth of information they need to make a confident enrollment decision.",
  },
  {
    title: "Online Inquiry & Enrollment Flow",
    description:
      "A conversion-optimized inquiry form captures parent information, preferred grade level, and contact preferences, routing directly to the admissions team for fast, personalized follow-up.",
  },
  {
    title: "Blog & Resource Hub",
    description:
      "Regularly updated content keeps the school visible in search results while providing ongoing value to current parents, reinforcing engagement beyond the enrollment stage.",
  },
  {
    title: "Teacher Profiles & Testimonials",
    description:
      "Dedicated teacher profile pages and parent testimonials build institutional credibility: two of the highest-impact trust signals for parents considering a school for the first time.",
  },
  {
    title: "SEO-Optimized Architecture",
    description:
      "Page structure, metadata, internal linking, and content strategy were all designed for local education search, targeting parents actively searching for preparatory school options in the area.",
  },
  {
    title: "Cloudinary Media Delivery",
    description:
      "High-quality school photography and gallery content are delivered through Cloudinary's CDN with automatic optimization, maintaining fast page loads without sacrificing visual quality.",
  },
];

export const businessOutcomes = [
  {
    metric: "95%",
    label: "Parent Satisfaction Rating",
    context: "Platform usefulness and clarity survey",
    icon: Users,
  },
  {
    metric: "40%",
    label: "Inquiry Volume Increase",
    context: "Enrollment inquiries within 6 months of launch",
    icon: TrendingUp,
  },
  {
    metric: "Top 3",
    label: "Local SEO Rankings",
    context: "For primary education search terms in the area",
    icon: Search,
  },
  {
    metric: "100+",
    label: "Students Supported",
    context: "Enrolled students accessing platform resources",
    icon: BookOpen,
  },
];

export const impactItems = [
  "95% parent satisfaction rating for platform clarity and usefulness",
  "40% increase in enrollment inquiries within 6 months of launch",
  "Top 3 search rankings for key local preparatory school terms",
  "100+ enrolled students supported through the platform's resources",
  "Digital parent communication channel eliminating reliance on physical notices",
  "Professional school brand presence competitive with established institutions in the area",
];

export const tools = [
  "Next.js 13+",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Cloudinary",
  "Vercel",
  "SEO Architecture",
  "Google Analytics",
];

export const takeaways = [
  {
    title: "Digital Platform as a Growth Engine",
    description:
      "A well-architected school website is not a brochure: it is a growth engine. SEO drives discovery, structured content builds trust, and a clear inquiry flow converts interest into enrollment conversations.",
  },
  {
    title: "Information Architecture Drives Enrollment Conversion",
    description:
      "Parents make enrollment decisions based on how easily they can find curriculum depth, teacher quality, and social proof. Information architecture, not just design, determines whether a visitor becomes an inquiry.",
  },
  {
    title: "Trust Is Built Through Layers, Not a Single Page",
    description:
      "No single page builds institutional trust. Teacher profiles, testimonials, curriculum depth, and achievement content work together across multiple pages to give parents confidence in a progressive way.",
  },
  {
    title: "Success Metrics Must Be Educational Business Metrics",
    description:
      "The right measure of a school platform is not page speed or bounce rate alone: it is enrollment inquiry volume, parent satisfaction, and search visibility. Those are the metrics that determine whether the platform succeeded.",
  },
];

export const dashboardScreenshots = [
  {
    label: "School Homepage",
    description: "Hero, curriculum overview, programs, and primary enrollment CTA",
    src: "/projects/sandton-school.png",
  },
  {
    label: "Curriculum & Programs Page",
    description: "Grade-level breakdown, subject offerings, and extracurricular structure",
    src: "",
  },
  {
    label: "Teacher Profiles Section",
    description: "Individual teacher profiles and testimonials for institutional trust",
    src: "",
  },
  {
    label: "Enrollment Inquiry Form",
    description: "Conversion-optimized contact form with grade and contact preference fields",
    src: "",
  },
];
