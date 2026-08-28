import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  Brain,
  Database,
  FileText,
  Filter,
  GitBranch,
  MessageSquare,
  RefreshCw,
  Search,
  Server,
  Shield,
  Webhook,
  Zap,
} from "lucide-react";

export const problemItems = [
  "Agents manually searched through hundreds of property documents per enquiry",
  "Responding to repeated similar questions consumed hours of staff time daily",
  "Client questions after business hours went unanswered — losing leads overnight",
  "Property information was fragmented across PDFs, spreadsheets, and email threads",
  "No system existed to qualify, log, or follow up on incoming leads automatically",
];

export const solutionItems = [
  "Search property listings conversationally using natural language",
  "Retrieve accurate, context-matched property details in under 3 seconds",
  "Access market data, location insights, and pricing intelligence instantly",
  "Automate lead capture, qualification, and follow-up workflows",
  "Generate daily operational summaries and interaction reports automatically",
];

export const keyFeatures = [
  {
    title: "Natural Language Property Search",
    description:
      'Users ask questions like "Show me 3-bedroom apartments in Lekki under ₦50M" and the system retrieves semantically matched listings — no keyword dependency required.',
  },
  {
    title: "Conversational Memory",
    description:
      "The assistant retains context across turns in a conversation, enabling follow-up questions like 'What about that last one — does it have parking?' without re-specifying the property.",
  },
  {
    title: "RAG-Powered Document Intelligence",
    description:
      "Property documents, market reports, and listing data are chunked, embedded, and stored as vectors. Retrieval pulls only the most semantically relevant context before the LLM generates a response.",
  },
  {
    title: "Automated Lead Workflow",
    description:
      "Captured leads are automatically logged to Google Sheets, trigger Gmail notifications to agents, and are deduplicated before storage to prevent noise.",
  },
  {
    title: "Multi-Channel Architecture",
    description:
      "The system supports website chat via webhook, internal staff usage, and is designed for WhatsApp Business API deployment with no architectural changes required.",
  },
];

export const retrievalPipelineSteps = [
  { label: "Raw Property Data", sublabel: "Listings, PDFs, market reports", icon: FileText },
  { label: "Document Ingestion", sublabel: "Extraction & cleaning", icon: RefreshCw },
  { label: "Text Chunking", sublabel: "Split by strategy", icon: Filter },
  { label: "Embedding Generation", sublabel: "OpenAI Ada-002", icon: Brain },
  { label: "Vector Storage", sublabel: "Pinecone upsert", icon: Database },
  { label: "Semantic Search", sublabel: "Cosine similarity", icon: Search },
  { label: "Context Assembly", sublabel: "Top-k + metadata", icon: GitBranch },
  { label: "LLM Response", sublabel: "GPT-4.1 Mini", icon: MessageSquare },
];

export const chunkingStrategies = [
  {
    docType: "Property Listings",
    strategy: "One chunk per property unit",
    detail: "Each listing is stored as a single vector with metadata: property_id, type, location, bedrooms, price_range, availability.",
    icon: Database,
  },
  {
    docType: "Market Reports",
    strategy: "500-token chunks, 50-token overlap",
    detail: "Reports are split by section with overlapping windows to preserve context across chunk boundaries.",
    icon: FileText,
  },
  {
    docType: "Legal & Lease Documents",
    strategy: "Clause-level chunking",
    detail: "Documents split at clause boundaries to keep legally distinct units intact for accurate retrieval.",
    icon: Shield,
  },
];

export const vectorSearchSteps = [
  {
    step: "01",
    title: "Query Embedding",
    description: "The user's natural language query is passed through the same OpenAI embedding model (text-embedding-ada-002) used during ingestion, producing a 1536-dimension query vector.",
    icon: Brain,
  },
  {
    step: "02",
    title: "Metadata Pre-filtering",
    description: "Before running vector similarity search, Pinecone filters by structured metadata — location, price range, bedroom count — to narrow the search space and improve precision.",
    icon: Filter,
  },
  {
    step: "03",
    title: "Cosine Similarity Search",
    description: "Pinecone runs approximate nearest-neighbour (ANN) search across filtered vectors. Top-5 results above a 0.75 similarity threshold are returned.",
    icon: Search,
  },
  {
    step: "04",
    title: "Context Assembly",
    description: "Retrieved chunks are ranked, deduplicated, and assembled into a structured context block. Conversation history is prepended to maintain multi-turn awareness.",
    icon: GitBranch,
  },
];

export const orchestrationSteps = [
  {
    phase: "Receive",
    icon: Webhook,
    color: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    description: "n8n webhook receives user message from chat interface or WhatsApp",
  },
  {
    phase: "Classify",
    icon: Brain,
    color: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    description: "Intent classified: property search, general question, or lead capture trigger",
  },
  {
    phase: "Retrieve",
    icon: Search,
    color: "bg-primary/10 border-primary/30 text-primary",
    description: "RAG pipeline triggered — query embedded, Pinecone searched, context assembled",
  },
  {
    phase: "Generate",
    icon: MessageSquare,
    color: "bg-green-500/10 border-green-500/30 text-green-400",
    description: "GPT-4.1 Mini generates response using retrieved context + conversation memory",
  },
  {
    phase: "Log & Notify",
    icon: Zap,
    color: "bg-orange-500/10 border-orange-500/30 text-orange-400",
    description: "Lead data logged to Google Sheets, Gmail notification triggered for agents",
  },
];

export const fallbackHandlers = [
  {
    trigger: "Low similarity score (< 0.75)",
    response: "System responds honestly: 'I don't have an exact match for that right now' — then suggests similar properties or offers to connect the user to an agent.",
    icon: AlertTriangle,
    color: "text-yellow-400",
  },
  {
    trigger: "Ambiguous or incomplete query",
    response: "Assistant asks one clarifying question: 'Are you looking to buy or rent?' or 'Which area are you focusing on?' — never leaves the user without a next step.",
    icon: MessageSquare,
    color: "text-blue-400",
  },
  {
    trigger: "OpenAI API timeout or error",
    response: "n8n error handler catches the failure, logs it, and returns a graceful fallback message prompting the user to try again or contact an agent directly.",
    icon: RefreshCw,
    color: "text-orange-400",
  },
  {
    trigger: "Duplicate lead submission",
    response: "Before logging to Sheets, the workflow checks for matching email or phone. Duplicates are skipped and the existing record is updated with the latest interaction timestamp.",
    icon: Shield,
    color: "text-green-400",
  },
];

export const businessOutcomes = [
  {
    metric: "< 3 seconds",
    label: "Average response time",
    context: "vs. 4+ hours manual agent response",
    icon: Zap,
  },
  {
    metric: "24 / 7",
    label: "Client availability",
    context: "Zero after-hours leads lost to no response",
    icon: Server,
  },
  {
    metric: "100%",
    label: "Enquiries automatically logged",
    context: "Every interaction captured without manual entry",
    icon: BarChart2,
  },
  {
    metric: "0",
    label: "Duplicate lead records",
    context: "Deduplication logic prevents noisy CRM data",
    icon: Filter,
  },
];

export const impactItems = [
  "Faster property information retrieval for agents and clients",
  "Eliminated after-hours lead loss with 24/7 automated engagement",
  "Reduced manual response workload significantly",
  "All enquiries automatically logged and agents notified in real time",
  "Centralized, searchable access to all property intelligence",
];

export const tools = [
  "n8n Workflow Automation",
  "OpenAI GPT-4.1 Mini",
  "OpenAI text-embedding-ada-002",
  "Pinecone Vector Database",
  "React.js",
  "Gmail API",
  "Google Sheets API",
  "Webhooks & REST APIs",
];

export const takeaways = [
  {
    title: "Chunking Strategy Determines Retrieval Quality",
    description:
      "The most impactful design decision was not the LLM — it was how documents were chunked. Poorly designed chunks produce hallucinations. Property-level chunking with rich metadata gave the system precision that generic splitting couldn't match.",
  },
  {
    title: "Metadata Filtering Before Vector Search Is Non-Negotiable",
    description:
      "Running cosine similarity across an unfiltered vector space at scale returns noisy results. Pre-filtering by structured metadata (location, price, bedrooms) before the ANN search dramatically improved relevance and cut latency.",
  },
  {
    title: "Fallback Design Is Part of the AI Experience",
    description:
      "A system that confidently returns wrong answers is worse than one that says it doesn't know. Designing honest, helpful fallbacks — and routing to human agents when needed — is what separates production-grade AI from demos.",
  },
  {
    title: "Orchestration Logic Is Where Business Value Lives",
    description:
      "The LLM is a commodity. The value in this system came from the n8n orchestration layer — routing intent, connecting retrieval to lead capture, and triggering notifications. That's the architecture clients pay for.",
  },
];

export const dashboardScreenshots = [
  {
    label: "Natural Language Property Search",
    description: "Chat interface showing a live property query and AI-matched results",
    image:
      "https://res.cloudinary.com/ds2h3iwys/image/upload/v1787873910/moruf-prompt-engineer-portfolio/Ragchat1_ngnekb.png",
  },
  {
    label: "n8n Orchestration Workflow",
    description: "Full n8n workflow showing intent routing, RAG pipeline, and lead logging nodes",
    image:
      "https://res.cloudinary.com/ds2h3iwys/image/upload/v1787874736/moruf-prompt-engineer-portfolio/Ragchat2_yb047n.png",
  },
  {
    label: "Pinecone Vector Dashboard",
    description: "Vector index showing embedded property documents and similarity scores",
    image:
      "https://res.cloudinary.com/ds2h3iwys/image/upload/v1787875088/moruf-prompt-engineer-portfolio/Ragchat21_htplac.png",
  },
  {
    label: "Lead Capture & Google Sheets Log",
    description: "Automated lead entries captured from chat and synced to the agent dashboard",
    image:
      "https://res.cloudinary.com/ds2h3iwys/image/upload/v1787875254/moruf-prompt-engineer-portfolio/Ragchat212_wopswq.png",
  },
];

export { ArrowRight };
