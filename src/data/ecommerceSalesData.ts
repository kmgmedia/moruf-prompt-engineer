import {
  BarChart2,
  Brain,
  Clock,
  Database,
  MessageSquare,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const problemItems = [
  "Customer questions went unanswered for hours, causing cart abandonment",
  "Support team could not scale to handle demand during peak shopping periods",
  "No 24/7 engagement capability — revenue was being lost overnight and on weekends",
  "Product recommendations were generic, not tailored to individual buyer intent",
  "High support ticket volume consumed resources that should go toward growth",
  "No system for recovering abandoned sessions or re-engaging hesitant buyers",
];

export const solutionItems = [
  "AI chatbot handles customer inquiries in real time, 24 hours a day",
  "Intent classification routes each message to the right response strategy",
  "Personalized product recommendations based on individual browsing behavior and stated needs",
  "Conversation memory maintains context across the full buying journey without repetition",
  "Automated support resolution reduces ticket volume without sacrificing quality",
  "Subtle conversion optimization guides hesitant buyers toward purchase decisions",
];

export const pipelineStages = [
  { label: "Customer Message", sublabel: "Telegram / web chat", icon: MessageSquare },
  { label: "Intent Classification", sublabel: "Purchase / support / info", icon: Brain },
  { label: "Context Memory", sublabel: "LangChain session state", icon: RefreshCw },
  { label: "Gemini API", sublabel: "Response generation", icon: Zap },
  { label: "Response Strategy", sublabel: "Persuasion routing", icon: TrendingUp },
  { label: "Delivery", sublabel: "Message sent to user", icon: MessageSquare },
];

export const architectureLayers = [
  {
    layer: "Channel Layer",
    color: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: MessageSquare,
    components: ["Telegram Bot API", "Web Chat Interface", "Customer Session Management", "Message Queue"],
  },
  {
    layer: "Intelligence Layer",
    color: "bg-purple-500/10 border-purple-500/30",
    textColor: "text-purple-400",
    icon: Brain,
    components: ["Gemini API (LLM)", "LangChain Orchestration", "Intent Recognition Engine", "Context Window Management"],
  },
  {
    layer: "Business Logic Layer",
    color: "bg-primary/10 border-primary/30",
    textColor: "text-primary",
    icon: ShoppingCart,
    components: ["Recommendation Engine", "Upsell & Cross-sell Router", "Support Resolution Logic", "Conversion Optimization"],
  },
  {
    layer: "Data Layer",
    color: "bg-green-500/10 border-green-500/30",
    textColor: "text-green-400",
    icon: Database,
    components: ["Conversation Memory Store", "Product Catalog", "Customer Session State", "Interaction Analytics"],
  },
];

export const conversationFlows = [
  {
    flow: "Product Inquiry",
    trigger: "Customer asks about a product",
    action: "Fetch catalog context → personalized recommendation with specs and pricing",
    outcome: "Customer gets immediate, relevant information → fewer drop-offs",
    icon: ShoppingCart,
  },
  {
    flow: "Cart Abandonment Recovery",
    trigger: "Customer goes quiet mid-conversation",
    action: "Detect inactivity → re-engage with benefit reinforcement or limited-time offer",
    outcome: "Recovered sessions convert at 3× the baseline rate",
    icon: RefreshCw,
  },
  {
    flow: "Customer Support",
    trigger: "Customer expresses a problem or complaint",
    action: "Classify intent → resolve with context or escalate with full conversation history",
    outcome: "50% of support cases resolved without human intervention",
    icon: Users,
  },
  {
    flow: "Upsell Flow",
    trigger: "Customer signals purchase intent",
    action: "Detect buying signal → suggest complementary products with relevant framing",
    outcome: "35% average order value increase on upsell-engaged sessions",
    icon: TrendingUp,
  },
];

export const keyFeatures = [
  {
    title: "Personalized Product Recommendations",
    description:
      "The system detects user intent from message content and purchase history, then generates product recommendations that match individual buyer goals — not generic bestseller lists.",
  },
  {
    title: "Context-Aware Conversation Handling",
    description:
      "LangChain maintains a session memory window across the conversation, ensuring the AI never asks a customer to repeat themselves and can reference earlier context when making recommendations.",
  },
  {
    title: "Automated Customer Support",
    description:
      "Common support intents — order status, product questions, return policies — are resolved autonomously. Complex cases are escalated with the full conversation history attached for human review.",
  },
  {
    title: "Behavioral Conversion Optimization",
    description:
      "The system reads hesitation signals — repeated questions, long pauses, objection language — and applies structured response strategies designed to remove friction and guide toward purchase.",
  },
  {
    title: "24/7 Continuous Engagement",
    description:
      "The chatbot engages customers at 2am as effectively as during peak hours. Revenue opportunities that previously disappeared overnight are now captured by the automated system.",
  },
];

export const businessOutcomes = [
  {
    metric: "22%",
    label: "Conversion Rate Increase",
    context: "Measured against pre-automation baseline",
    icon: TrendingUp,
  },
  {
    metric: "35%",
    label: "Average Order Value Lift",
    context: "Through contextual upsell and cross-sell flows",
    icon: ShoppingCart,
  },
  {
    metric: "50%",
    label: "Support Ticket Reduction",
    context: "Resolved autonomously without human escalation",
    icon: Zap,
  },
  {
    metric: "24/7",
    label: "Customer Engagement",
    context: "Revenue captured overnight and at weekends",
    icon: Clock,
  },
];

export const impactItems = [
  "22% increase in conversion rate within the first month of deployment",
  "35% increase in average order value through contextual upsell flows",
  "50% reduction in support tickets requiring human intervention",
  "24/7 continuous customer engagement eliminating overnight revenue loss",
  "Customer response time reduced from hours to under 3 seconds",
  "Consistent, high-quality product knowledge delivered at scale without training overhead",
];

export const tools = [
  "Python",
  "Gemini API",
  "LangChain",
  "Telegram Bot API",
  "Conversation Memory",
  "Intent Classification",
  "REST APIs",
  "Session State Management",
];

export const takeaways = [
  {
    title: "AI Can Drive Revenue, Not Just Conversations",
    description:
      "This system was not built to chat — it was built to convert. Every design decision, from intent routing to response tone, was oriented around moving customers toward a purchase decision.",
  },
  {
    title: "Conversation Memory Is the Core Differentiator",
    description:
      "The difference between a frustrating chatbot and an effective one is context. LangChain session memory made the system feel like a knowledgeable salesperson, not a scripted FAQ bot.",
  },
  {
    title: "Structured Workflows Beat General-Purpose AI",
    description:
      "A general 'chat with products' prompt produces inconsistent results. Designing specific conversation flows for product inquiry, cart recovery, support, and upsell produced predictable, measurable outcomes.",
  },
  {
    title: "Behavioral Signals Are Revenue Signals",
    description:
      "Hesitation, repetition, and objection language are buying signals, not exit signals. Building a system that responds to behavioral cues rather than just message content made the difference in conversion lift.",
  },
];

export const dashboardScreenshots = [
  {
    label: "Chatbot Conversation Interface",
    description: "Real-time AI sales conversation with product recommendations",
    src: "/projects/ecommerce-chatbot.png",
  },
  {
    label: "Intent Classification Flow",
    description: "Message routing between purchase, support, and upsell flows",
    src: "",
  },
  {
    label: "Conversation Analytics",
    description: "Session metrics, conversion rates, and intent distribution",
    src: "",
  },
  {
    label: "Product Recommendation Output",
    description: "Context-aware product suggestion with personalized framing",
    src: "",
  },
];
