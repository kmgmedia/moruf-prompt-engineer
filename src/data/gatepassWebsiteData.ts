import {
  BarChart2,
  Globe2,
  Layers,
  MessageSquare,
  Monitor,
  Palette,
  Rocket,
  Search,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const problemItems = [
  "No centralized digital presence to explain the GatePass product and its value",
  "Service capabilities had to be explained repeatedly through calls and direct messages",
  "Potential clients had no way to explore pricing or operational workflows before booking",
  "The brand lacked professional credibility without a structured product website",
  "Lead generation depended entirely on word-of-mouth with no digital acquisition channel",
  "Event planners could not self-educate on the system before committing to an inquiry",
];

export const solutionItems = [
  "Product-centered landing experience communicating GatePass value to event planners",
  "Service and pricing pages enabling self-service client education before inquiry",
  "Event workflow visualization helping visitors understand the operational process",
  "Mobile-optimized experience accessible across all devices event planners use",
  "Lead capture and inquiry flow converting visitors into qualified bookings",
  "Brand identity system positioning GatePass as a professional operations product",
];

export const pipelineStages = [
  { label: "Requirements", sublabel: "Goals & audience", icon: Users },
  { label: "Design System", sublabel: "Colors, typography", icon: Palette },
  { label: "Component Build", sublabel: "Reusable UI library", icon: Layers },
  { label: "Page Architecture", sublabel: "Routes & flow", icon: Monitor },
  { label: "Conversion Layer", sublabel: "CTAs, inquiry forms", icon: Zap },
  { label: "Deployment", sublabel: "Launch & domain", icon: Rocket },
];

export const architectureLayers = [
  {
    layer: "Presentation Layer",
    color: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: Monitor,
    components: ["React.js Component Library", "Tailwind CSS Design System", "Responsive Grid Layout", "Framer Motion Animations"],
  },
  {
    layer: "Content Layer",
    color: "bg-purple-500/10 border-purple-500/30",
    textColor: "text-purple-400",
    icon: Layers,
    components: ["Services & Pricing Pages", "Event Workflow Explainer", "FAQ & Trust Content", "Testimonials Section"],
  },
  {
    layer: "Conversion Layer",
    color: "bg-primary/10 border-primary/30",
    textColor: "text-primary",
    icon: Zap,
    components: ["Inquiry Form", "Booking Call-to-Action", "Lead Capture Flow", "Contact Integration"],
  },
  {
    layer: "Infrastructure Layer",
    color: "bg-green-500/10 border-green-500/30",
    textColor: "text-green-400",
    icon: Rocket,
    components: ["Vercel Hosting", "Custom Domain", "Performance Optimization", "Analytics Integration"],
  },
];

export const sitePages = [
  {
    page: "Home",
    purpose: "Hero, value proposition, key features overview, and primary CTA",
    icon: Globe2,
  },
  {
    page: "Services",
    purpose: "Service packages, pricing breakdown, and operational offering structure",
    icon: BarChart2,
  },
  {
    page: "How It Works",
    purpose: "Step-by-step walkthrough of the GatePass event check-in workflow",
    icon: Search,
  },
  {
    page: "Contact",
    purpose: "Inquiry form, direct booking CTA, and event-specific consultation request",
    icon: MessageSquare,
  },
];

export const keyFeatures = [
  {
    title: "Product-Centered Landing Experience",
    description:
      "The website was structured to communicate the operational value of the GatePass System clearly to event planners, leading with the problem it solves, not just a feature list.",
  },
  {
    title: "Service & Pricing Presentation",
    description:
      "Visitors can explore available packages, operational offerings, and event service structures directly from the platform, removing friction from the sales conversation.",
  },
  {
    title: "Event Workflow Communication",
    description:
      "The website explains how digital guest verification and event check-in operations function during live events, building confidence before a client commits to an inquiry.",
  },
  {
    title: "Mobile-Responsive Experience",
    description:
      "The interface was optimized for mobile and desktop accessibility, designed around how event organizers actually browse, often on mobile between event preparations.",
  },
  {
    title: "Lead Generation & Inquiry Flow",
    description:
      "A structured inquiry form and booking CTA turn organic visitors into qualified leads, creating a scalable digital acquisition channel independent of referrals.",
  },
  {
    title: "Brand Positioning & Trust Building",
    description:
      "The website positions GatePass as a structured, professional event operations solution, not just a QR code tool, through clear visual hierarchy and operational credibility signals.",
  },
];

export const businessOutcomes = [
  {
    metric: "0 → Live",
    label: "Digital Product Presence",
    context: "From no website to a full product platform",
    icon: Globe2,
  },
  {
    metric: "Self-Service",
    label: "Client Education",
    context: "Pricing & workflow visible before any sales call",
    icon: Search,
  },
  {
    metric: "Mobile-First",
    label: "Device Coverage",
    context: "Fully responsive across phone, tablet, desktop",
    icon: Smartphone,
  },
  {
    metric: "Structured",
    label: "Lead Capture",
    context: "Digital acquisition channel replacing word-of-mouth",
    icon: TrendingUp,
  },
];

export const impactItems = [
  "Professional digital product presence replacing manual service explanations",
  "Clients can self-educate on pricing and operational workflows before booking",
  "Stronger brand positioning as a structured event operations product",
  "Scalable customer inquiry channel independent of referrals or direct outreach",
  "Mobile-first design accessible to event planners across all devices",
  "Credibility and trust signals that support faster sales conversation closure",
];

export const tools = [
  "React.js",
  "Tailwind CSS",
  "Framer Motion",
  "Vercel",
  "Responsive Web Design",
  "Conversion-Focused Architecture",
  "Mobile-First Layout Systems",
  "Product Presentation Design",
];

export const takeaways = [
  {
    title: "Product Websites Should Communicate Operational Value",
    description:
      "A strong product website should explain not only what a system is, but how it improves real operational workflows. Visitors need to see themselves using the product before they inquire.",
  },
  {
    title: "Clear Service Presentation Reduces Sales Friction",
    description:
      "When pricing, workflows, and service explanations are structured on the website, potential clients arrive at the inquiry stage already informed, shortening the sales cycle significantly.",
  },
  {
    title: "Digital Trust Is Part of Product Credibility",
    description:
      "For operational products like GatePass, professional presentation and clear workflow communication are part of the product itself: clients are evaluating whether to trust this system at a live event.",
  },
  {
    title: "Product Positioning Is a Design Decision",
    description:
      "Framing GatePass as an 'event operations platform' rather than a 'QR code tool' changed how prospects perceived its value: positioning is communicated through design choices, not just copy.",
  },
];

export const dashboardScreenshots = [
  {
    label: "Homepage Hero Section",
    description: "Product value proposition, primary CTA, and brand identity system",
    src: "/projects/gatepass-website.png",
  },
  {
    label: "Services & Pricing Page",
    description: "Service packages, pricing breakdown, and operational offering structure",
    src: "",
  },
  {
    label: "How It Works Section",
    description: "Step-by-step event check-in workflow visualization",
    src: "",
  },
  {
    label: "Contact & Inquiry Flow",
    description: "Lead capture form and booking call-to-action",
    src: "",
  },
];
