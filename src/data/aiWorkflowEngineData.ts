import {
  BarChart2,
  Bell,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  Eye,
  GitBranch,
  Globe,
  Layers,
  Monitor,
  RefreshCw,
  Server,
  Settings,
  Shield,
  Webhook,
  Zap,
} from "lucide-react";

export const problemItems = [
  "Client workflows operated entirely through manual handoffs between disconnected tools",
  "Form submissions and API events sat unprocessed for hours — no trigger connected input to action",
  "Operations teams had no visibility into whether workflows ran, failed, or silently stalled",
  "Business logic was buried in spreadsheets and email chains — impossible to audit or scale",
  "Any workflow change required developer time, even simple schedule or threshold updates",
];

export const solutionItems = [
  "Multi-trigger workflow engine handling webhooks, cron schedules, and manual runs",
  "Intent classification layer routing each trigger to the correct workflow branch",
  "n8n execution nodes connecting APIs, email, databases, and notification services",
  "React admin dashboard giving operators live visibility into workflow health and history",
  "Full execution audit log with status, duration, errors, and payload snapshots per run",
];

export const systemPipelineStages = [
  { label: "Trigger", sublabel: "Webhook / Cron / Form", icon: Webhook },
  { label: "Classify", sublabel: "Intent routing", icon: GitBranch },
  { label: "Execute", sublabel: "n8n workflow", icon: Zap },
  { label: "Integrate", sublabel: "API / DB / Email", icon: Globe },
  { label: "Audit Log", sublabel: "Execution record", icon: Database },
  { label: "Alert", sublabel: "Error / success", icon: Bell },
  { label: "Dashboard", sublabel: "React control layer", icon: Monitor },
];

export const architectureLayers = [
  {
    layer: "Client Layer",
    color: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: Monitor,
    components: ["React.js Admin Dashboard", "Workflow Status Board", "Execution Log Viewer", "Error Alert Panel"],
  },
  {
    layer: "Orchestration Layer",
    color: "bg-primary/10 border-primary/30",
    textColor: "text-primary",
    icon: GitBranch,
    components: ["n8n Workflow Engine", "Intent Router", "Retry / Error Handler", "Batch Scheduler"],
  },
  {
    layer: "Integration Layer",
    color: "bg-purple-500/10 border-purple-500/30",
    textColor: "text-purple-400",
    icon: Globe,
    components: ["Gmail API", "Google Sheets", "REST API Connectors", "Webhook Receivers"],
  },
  {
    layer: "Data Layer",
    color: "bg-green-500/10 border-green-500/30",
    textColor: "text-green-400",
    icon: Database,
    components: ["Execution Logs", "Workflow Config Store", "Audit Trail", "Error Registry"],
  },
];

export const triggerTypes = [
  {
    type: "Webhook Triggers",
    description:
      "External systems POST to the engine endpoint. Payload is validated, classified, and routed to the matching workflow within milliseconds. No polling. No manual check.",
    icon: Webhook,
    color: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    examples: ["Form submissions", "CRM event callbacks", "Payment notifications", "API-to-API handoffs"],
  },
  {
    type: "Scheduled Triggers",
    description:
      "Cron-based workflows run on configurable schedules — daily digests, weekly reports, hourly syncs — without any external event dependency or developer involvement.",
    icon: Clock,
    color: "bg-primary/10 border-primary/30 text-primary",
    examples: ["Daily summary emails", "Weekly data exports", "Hourly health checks", "Monthly billing cycles"],
  },
  {
    type: "Manual Triggers",
    description:
      "Operators initiate workflows from the React dashboard — for ad-hoc processing, re-running failed jobs, or testing specific workflow branches without touching the automation config.",
    icon: Settings,
    color: "bg-green-500/10 border-green-500/30 text-green-400",
    examples: ["Retry failed runs", "One-off bulk processing", "On-demand reports", "Test executions"],
  },
];

export const dashboardFeatures = [
  {
    feature: "Live Workflow Status Board",
    description:
      "Real-time view of all active, completed, and failed workflow executions. Not a static report — a live operational panel operators trust for production monitoring.",
    icon: Eye,
  },
  {
    feature: "Execution Log Viewer",
    description:
      "Each execution displays its trigger type, workflow branch, duration, status, and a snapshot of the input/output payload. Full context for debugging without server log access.",
    icon: Layers,
  },
  {
    feature: "Error Alert Panel",
    description:
      "Failed nodes surface immediately with the error type, the specific node that failed, and retry count. Operators diagnose and act without filing support tickets or reading raw logs.",
    icon: Bell,
  },
  {
    feature: "Workflow Config Management",
    description:
      "Non-technical operators adjust thresholds, cron schedules, and routing rules directly from the dashboard. Operational changes require zero developer intervention.",
    icon: Settings,
  },
];

export const businessOutcomes = [
  {
    metric: "80%+",
    label: "Manual handoff time eliminated",
    context: "Trigger → execution in under 2 seconds",
    icon: Zap,
  },
  {
    metric: "24/7",
    label: "Workflow uptime",
    context: "No developer monitoring required",
    icon: Server,
  },
  {
    metric: "100%",
    label: "Executions logged",
    context: "Full audit trail for compliance and debugging",
    icon: Shield,
  },
  {
    metric: "0",
    label: "Code changes for config updates",
    context: "Operators manage workflow rules via dashboard",
    icon: Code2,
  },
];

export const keyFeatures = [
  {
    title: "Multi-Trigger Workflow Engine",
    description:
      "Accepts webhooks, cron schedules, and manual triggers from a unified entry point. Each trigger type has a dedicated classifier that routes to the correct n8n workflow branch — clean isolation, no shared state between workflow types.",
  },
  {
    title: "React Dashboard as AI Infrastructure Layer",
    description:
      "The dashboard is not a UI project. It is the operational control plane of the automation engine. Operators monitor live status, inspect execution logs, manage workflow config, and trigger manual runs — all without touching code or server infrastructure.",
  },
  {
    title: "Intent Classification Routing",
    description:
      "Before any workflow executes, the trigger payload is classified by type and intent. This routing layer prevents misrouted triggers and enables clean, isolated workflow branches that each new automation type can plug into without modifying existing flows.",
  },
  {
    title: "Full Execution Audit Trail",
    description:
      "Every execution writes structured data: trigger type, workflow branch, status, duration, payload snapshot, and error details. The log feeds the dashboard and enables post-hoc debugging, compliance reporting, and workflow performance analysis.",
  },
  {
    title: "Configurable Without Code Changes",
    description:
      "Thresholds, schedules, routing rules, and notification targets are stored as config — not hardcoded. A non-technical operator can change 'send daily report at 9am' to '7am' from the dashboard without opening a codebase.",
  },
];

export const impactItems = [
  "Eliminated manual workflow handoffs — triggers execute within 2 seconds of event",
  "Operations team gained real-time automation visibility for the first time",
  "Workflow configuration changes no longer require developer involvement",
  "Execution audit trail enables compliance reporting and post-incident debugging",
  "System scales to new workflow types by adding branches — no architectural changes",
];

export const tools = [
  "React.js + TypeScript",
  "n8n Workflow Automation",
  "Node.js / REST APIs",
  "Webhook Architecture",
  "Google APIs (Sheets, Gmail)",
  "Supabase (Auth + Data)",
  "Vercel (Deployment)",
  "Cron Scheduling",
];

export const takeaways = [
  {
    title: "Full-Stack Is the Control Plane of AI Infrastructure",
    description:
      "The React dashboard is not a frontend project. It is the operational interface of an automation system. Positioned as 'monitoring infrastructure' — not a UI — it changes both what clients understand about the system and what they pay for it.",
  },
  {
    title: "Observability Is Non-Negotiable in Production Automation",
    description:
      "Automation that runs silently is automation waiting to fail silently. Building execution logging and error surfacing from day one means operators trust the system and can diagnose issues without escalating to developers.",
  },
  {
    title: "Configurable Systems Outlast Hardcoded Ones",
    description:
      "Every hardcoded threshold or schedule becomes a future maintenance ticket. Parameterizing operational rules from the start means the system adapts to new requirements through configuration — not re-deployment.",
  },
  {
    title: "Intent Classification Is the Architectural Decision That Scales",
    description:
      "A single entry point with a classification layer is far more maintainable than separate endpoints with duplicated logic. The router becomes the backbone every new workflow type plugs into — without touching existing flows.",
  },
];

export const dashboardScreenshots = [
  {
    label: "Workflow Status Dashboard",
    description: "React admin panel showing live execution status, counts, and workflow health indicators",
  },
  {
    label: "n8n Automation Workflow",
    description: "Multi-branch n8n workflow showing trigger classification and execution nodes",
  },
  {
    label: "Execution Log Viewer",
    description: "Detailed execution history with status, duration, and payload inspection per run",
  },
  {
    label: "Error Alert Panel",
    description: "Failed workflow summary with node-level error details and manual retry controls",
  },
];

export { CheckCircle2, RefreshCw, BarChart2 };
