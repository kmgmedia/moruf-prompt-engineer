import {
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Database,
  FileInput,
  Filter,
  GitBranch,
  MessageSquare,
  Search,
  ShieldCheck,
  Tags,
  Table2,
  Zap,
} from "lucide-react";

export const problemItems = [
  "Useful question-and-answer knowledge was being captured manually with no consistent structure",
  "Trusted internal submissions needed to be identified without slowing down the intake flow",
  "Answers needed to be searchable later by an assistant, not buried in scattered form responses",
  "The system needed memory and retrieval so users could ask follow-up questions naturally",
  "Q&A entries needed enough metadata to support future categorization and downstream automation",
];

export const solutionItems = [
  "Built a two-part n8n workflow: one flow for QA ingestion and one flow for AI-powered retrieval",
  "Used a public form trigger to collect Name, Email, Question, and Answer fields",
  "Added conditional email validation to mark trusted contributors based on the n8n.io domain",
  "Connected GPT-4.1 Mini to generate short, focused tags from each question-answer pair",
  "Stored structured Q&A rows in an n8n Data Table for later assistant lookup",
  "Created a chat assistant with memory and a Data Table tool for grounded responses",
];

export const pipelineStages = [
  { label: "Form Submit", sublabel: "Name, Email, Q&A", icon: FileInput },
  { label: "Email Check", sublabel: "n8n.io condition", icon: Filter },
  { label: "Trust Flag", sublabel: "true / false route", icon: ShieldCheck },
  { label: "Reference Merge", sublabel: "preserve fields", icon: GitBranch },
  { label: "LLM Tagging", sublabel: "GPT-4.1 Mini", icon: Tags },
  { label: "Data Table", sublabel: "structured q&a rows", icon: Database },
  { label: "Chat Query", sublabel: "Ruth's Assistant", icon: MessageSquare },
  { label: "Grounded Answer", sublabel: "retrieved response", icon: Bot },
];

export const architectureLayers = [
  {
    layer: "Ingest Layer",
    color: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: FileInput,
    components: ["n8n Form Trigger", "Name / Email Fields", "Question / Answer Capture"],
  },
  {
    layer: "Validation Layer",
    color: "bg-green-500/10 border-green-500/30",
    textColor: "text-green-400",
    icon: ShieldCheck,
    components: ["Domain Check", "Trusted Contributor Flag", "Branch Routing"],
  },
  {
    layer: "Intelligence Layer",
    color: "bg-purple-500/10 border-purple-500/30",
    textColor: "text-purple-400",
    icon: Brain,
    components: ["GPT-4.1 Mini", "Tag Generation Prompt", "AI Agent System Message"],
  },
  {
    layer: "Retrieval Layer",
    color: "bg-primary/10 border-primary/30",
    textColor: "text-primary",
    icon: Database,
    components: ["n8n Data Table", "Data Table Tool", "Simple Memory", "Chat Trigger"],
  },
];

export const workflowFlows = [
  {
    flow: "Flow 1: QA Ingestion",
    trigger: "A user submits the QA form",
    action:
      "Validate email domain, assign trust status, generate tags with OpenAI, then insert the structured row into the q&a Data Table.",
    outcome: "Every submission becomes a reusable knowledge-base entry.",
    icon: FileInput,
  },
  {
    flow: "Flow 2: Chat Retrieval",
    trigger: "A user asks Ruth's Assistant a question",
    action:
      "The AI Agent searches the Data Table through a tool, retrieves relevant entries, and answers from the stored Q&A context.",
    outcome: "Users get grounded responses instead of generic model guesses.",
    icon: Bot,
  },
  {
    flow: "Trusted Contributor Routing",
    trigger: "Email contains the trusted n8n.io domain",
    action:
      "The IF node routes the submission into a Set node that marks isTrusted as true; all other submissions are marked false.",
    outcome: "The table preserves provenance and trust signals for each answer.",
    icon: ShieldCheck,
  },
  {
    flow: "Assistant Memory",
    trigger: "The conversation continues across multiple turns",
    action:
      "Simple Memory gives the agent short-term context while the Data Table tool supplies persistent QA knowledge.",
    outcome: "Follow-up questions feel coherent while answers stay grounded.",
    icon: MessageSquare,
  },
];

export const keyFeatures = [
  {
    title: "Structured QA Intake",
    description:
      "The form captures exactly the fields needed for a reusable knowledge entry: contributor identity, email, question, and answer.",
  },
  {
    title: "Trusted Contributor Detection",
    description:
      "A conditional node checks the email domain and adds an isTrusted boolean, making the source quality visible directly in the Data Table.",
  },
  {
    title: "LLM-Assisted Tagging",
    description:
      "GPT-4.1 Mini analyzes each question-answer pair and produces concise topical tags that can support categorization, search, and later analytics.",
  },
  {
    title: "Data Table Knowledge Base",
    description:
      "The final enriched record is written to an n8n Data Table, creating a searchable operational knowledge base instead of a loose form archive.",
  },
  {
    title: "Grounded Chat Assistant",
    description:
      "Ruth's Assistant uses a Data Table tool to look up relevant QA entries before answering, keeping responses tied to stored knowledge.",
  },
];

export const businessOutcomes = [
  {
    metric: "2",
    label: "Connected workflows",
    context: "One for intake, one for retrieval",
    icon: GitBranch,
  },
  {
    metric: "4",
    label: "Core fields captured",
    context: "Name, Email, Question, Answer",
    icon: Table2,
  },
  {
    metric: "4-8",
    label: "AI tags per entry",
    context: "Generated from Q&A content",
    icon: Tags,
  },
  {
    metric: "24/7",
    label: "Assistant access",
    context: "Public chat trigger with memory",
    icon: Clock,
  },
];

export const implementationNotes = [
  {
    title: "Data Provenance Was Designed In",
    detail:
      "The isTrusted flag makes contributor identity useful downstream. It can later support review queues, moderation, filtering, or answer prioritization.",
    icon: ShieldCheck,
    color: "text-green-400",
  },
  {
    title: "The NoOp Reference Node Keeps Mapping Simple",
    detail:
      "The ref node acts as a stable point for the Insert Row node to pull original form fields after the branching trust logic.",
    icon: GitBranch,
    color: "text-blue-400",
  },
  {
    title: "Retrieval Is Tool-Driven",
    detail:
      "The assistant is instructed to use a Data Table tool before answering, giving it a controlled path to the stored Q&A records.",
    icon: Search,
    color: "text-primary",
  },
  {
    title: "Tags Need a Table Column to Become Searchable",
    detail:
      "The workflow includes tag generation. To fully use tag retrieval, the Data Table schema should include a Tags field mapped from the LLM output.",
    icon: Tags,
    color: "text-yellow-400",
  },
];

export const impactItems = [
  "Converted raw QA submissions into structured knowledge-base records",
  "Separated trusted and untrusted contributors automatically with no manual review step",
  "Added LLM enrichment so entries can be categorized beyond exact wording",
  "Enabled a chat assistant to answer from stored QA data rather than general model memory",
  "Created a reusable template for support, healthcare FAQ, internal ops, and training knowledge bases",
];

export const tools = [
  "n8n",
  "n8n Data Tables",
  "OpenAI GPT-4.1 Mini",
  "LangChain AI Agent",
  "Form Trigger",
  "Data Table Tool",
  "Simple Memory",
  "Conditional Routing",
];

export const takeaways = [
  {
    title: "A Knowledge Base Starts at Intake",
    description:
      "The quality of retrieval later depends on how cleanly information is captured at the beginning. Structured fields and trust metadata make the assistant more reliable.",
  },
  {
    title: "Automation Should Preserve Context",
    description:
      "Branching workflows often lose convenient access to original values. A simple reference point keeps downstream mapping readable and less fragile.",
  },
  {
    title: "LLM Enrichment Is Most Useful When Persisted",
    description:
      "Tagging is valuable, but it becomes operationally powerful when the generated tags are written into the Data Table and included in retrieval filters.",
  },
  {
    title: "Grounded Assistants Need Tools, Not Just Prompts",
    description:
      "The assistant prompt matters, but the Data Table tool is what gives the agent a reliable knowledge source to query before responding.",
  },
];

export const dashboardScreenshots = [
  {
    label: "n8n Data Table",
    description:
      "Stored q&a rows showing contributor names, emails, questions, answers, trust flags, and timestamps.",
    src: "/projects/qa-knowledge-base.svg?v=2",
  },
  {
    label: "QA Ingest Workflow",
    description:
      "Form submission, email trust check, LLM tagging, and Data Table insert.",
    src: "",
  },
  {
    label: "Chat Assistant Workflow",
    description:
      "Public chat trigger, AI Agent, OpenAI model, memory, and Data Table retrieval tool.",
    src: "",
  },
  {
    label: "Tag Enrichment Output",
    description:
      "Short topical tags generated from each submitted question-answer pair.",
    src: "",
  },
];

export { CheckCircle2, Zap };
