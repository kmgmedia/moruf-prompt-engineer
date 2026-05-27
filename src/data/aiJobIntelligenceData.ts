import {
  BarChart2,
  Bell,
  Brain,
  Clock,
  Database,
  FileText,
  Filter,
  GitBranch,
  RefreshCw,
  Search,
  Server,
  Shield,
  Zap,
} from "lucide-react";

export const problemItems = [
  "Manual job discovery consumed 3–4 hours per week — most listings irrelevant",
  "Each resume rewrite took 45–60 minutes per application with no consistency",
  "Application tracking scattered across browser tabs, spreadsheets, and email",
  "80%+ of found listings were role mismatches with no scoring or filter",
  "No feedback loop — couldn't identify which resume variants performed best",
];

export const solutionItems = [
  "Scheduled Apify scraping collects 50–100 new LinkedIn listings per run",
  "OpenAI relevance scoring filters to the top 15–20% by role fit",
  "Automated resume rewriting tailored to each job's specific requirements",
  "Google Docs generation produces ready-to-submit documents programmatically",
  "Google Sheets audit trail tracks every application with scores and outcomes",
];

export const pipelineStages = [
  { label: "Webhook Trigger", sublabel: "Frontend POST → instant ACK", icon: Zap },
  { label: "Job Search URL", sublabel: "LinkedIn URL + job count", icon: Search },
  { label: "Apify Scrape", sublabel: "LinkedIn actor · 50 jobs", icon: GitBranch },
  { label: "Loop + Get Resume", sublabel: "Batch items · fetch base CV", icon: RefreshCw },
  { label: "AI Evaluate", sublabel: "GPT-4 relevance scoring", icon: Brain },
  { label: "Filter", sublabel: "Top matches kept (~21/50)", icon: Filter },
  { label: "Resume Rewrite", sublabel: "GPT-4 tailored per job", icon: FileText },
  { label: "Doc + Sheets", sublabel: "Google Doc + audit log", icon: Database },
];

export const architectureLayers = [
  {
    layer: "Ingestion Layer",
    color: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: Search,
    components: ["Apify LinkedIn Actor", "Payload Normalizer", "Fingerprint Deduplication"],
  },
  {
    layer: "Orchestration Layer",
    color: "bg-primary/10 border-primary/30",
    textColor: "text-primary",
    icon: GitBranch,
    components: ["n8n Workflow Engine", "Retry / Backoff Logic", "Idempotent Node Design"],
  },
  {
    layer: "Intelligence Layer",
    color: "bg-purple-500/10 border-purple-500/30",
    textColor: "text-purple-400",
    icon: Brain,
    components: ["GPT-4 Role-Fit Evaluator", "JSON Schema Validator", "Resume Rewrite Engine"],
  },
  {
    layer: "Output Layer",
    color: "bg-green-500/10 border-green-500/30",
    textColor: "text-green-400",
    icon: Database,
    components: ["Google Docs HTML Upload", "Sheets Audit Logger", "Application Status Tracker"],
  },
];

export const evaluationPipeline = [
  {
    step: "01",
    title: "Structured Prompt Input",
    description:
      "Each job listing — title, description, requirements, company — is formatted into a deterministic prompt template. Role context (target title, years of experience, core skills) is injected as static context on every call.",
    icon: FileText,
  },
  {
    step: "02",
    title: "GPT-4 Structured Output",
    description:
      "OpenAI returns a validated JSON object: { score: 0–100, rationale: string, matched_skills: [], missing_skills: [], apply_recommendation: boolean }. JSON schema validation rejects malformed outputs before any downstream processing.",
    icon: Brain,
  },
  {
    step: "03",
    title: "Score Threshold Routing",
    description:
      "Listings scoring 70+ pass to the resume rewrite stage. Scores 50–69 are logged as 'monitor' for manual review. Below 50 are discarded. The threshold is a configurable parameter — not hardcoded into any node.",
    icon: Filter,
  },
  {
    step: "04",
    title: "Audit Trail Write",
    description:
      "Every evaluated listing — pass or fail — is logged to Google Sheets with its score, rationale, matched skills, and timestamp. This creates the feedback loop for ongoing prompt tuning and threshold calibration.",
    icon: Database,
  },
];

export const operationalControls = [
  {
    title: "Batch Window",
    detail: "20 jobs processed per run. Prevents API rate limit exhaustion and keeps per-run cost predictable and observable.",
    icon: Filter,
    color: "text-blue-400",
  },
  {
    title: "Rate Limiting",
    detail: "3-second delay between OpenAI calls within each batch. Respects API tier limits without manual throttling or external queue infrastructure.",
    icon: Clock,
    color: "text-yellow-400",
  },
  {
    title: "Idempotency",
    detail: "Each listing is fingerprinted by a hash of title + company + date. Re-processing the same listing on a subsequent run is a silent no-op — duplicates never enter the pipeline.",
    icon: Shield,
    color: "text-green-400",
  },
  {
    title: "Retry & Backoff",
    detail: "3 retry attempts with exponential backoff on OpenAI or Google API failures. Failed nodes log errors without halting the full batch — partial runs recover cleanly.",
    icon: RefreshCw,
    color: "text-orange-400",
  },
];

export const businessOutcomes = [
  {
    metric: "90%",
    label: "Time saved per application",
    context: "45–60 min manual → under 5 min automated",
    icon: Zap,
  },
  {
    metric: "5×",
    label: "Application throughput",
    context: "Batch pipeline vs one-by-one manual workflow",
    icon: BarChart2,
  },
  {
    metric: "< 2hrs",
    label: "Scrape-to-document pipeline",
    context: "From schedule trigger to ready-to-submit Google Doc",
    icon: Clock,
  },
  {
    metric: "100%",
    label: "Applications audited",
    context: "Full score, rationale, and outcome log in Sheets",
    icon: Server,
  },
];

export const keyFeatures = [
  {
    title: "AI-Powered Relevance Scoring",
    description:
      "GPT-4 evaluates every listing against role-fit criteria and returns a structured JSON score — matched skills, missing skills, rationale, and an apply recommendation. Not a heuristic filter. A deterministic AI evaluation.",
  },
  {
    title: "Deterministic Resume Customization",
    description:
      "A master resume is rewritten at the bullet-point level to emphasize role-specific skills. ATS formatting rules (no tables, single column, standard fonts, no inline graphics) are enforced programmatically in every output.",
  },
  {
    title: "Idempotent Scraping Pipeline",
    description:
      "Apify actors scrape LinkedIn listings on schedule. Each listing is fingerprinted before processing — duplicates across runs are silently skipped, ensuring clean data without manual dedup checks.",
  },
  {
    title: "End-to-End Audit Logging",
    description:
      "Every stage writes structured data to Google Sheets. Score, rationale, resume variant, document link, and application status — the complete decision trail is queryable for iteration and prompt tuning.",
  },
  {
    title: "Configurable Operational Controls",
    description:
      "Batch size, score thresholds, retry attempts, and API delays are all parameterized — not hardcoded. The pipeline adapts to different role targets or volume requirements without code changes.",
  },
];

export const impactItems = [
  "Manual job research time reduced by 90% per weekly application cycle",
  "Consistent ATS-safe resume formatting across every generated application",
  "Feedback loop via Sheets audit log enables ongoing threshold and prompt tuning",
  "End-to-end auditability from scrape trigger to submitted document link",
  "Scalable to any target role or job market without pipeline changes",
];

export const tools = [
  "n8n Workflow Automation",
  "OpenAI GPT-4 API",
  "Apify (LinkedIn Scraper)",
  "Google Docs API",
  "Google Sheets API",
  "JavaScript / Node.js",
  "JSON Schema Validation",
  "REST APIs",
];

export const realWorldChallenges = [
  {
    problem: "Apify node threw a JSON parse error on every run",
    detail: "The custom body had `count:` with no value and `urls: [\"\"]` with an empty string — invalid JSON that prevented the actor from starting at all.",
    fix: "Replaced with proper n8n expressions pulling from the Edit Fields node: `{{ $json.count || 50 }}` for count and `{{ $json['linkedIn Job URL'] }}` for the URL.",
  },
  {
    problem: "Count field typed as String — only 6 jobs scraped instead of 50",
    detail: "The Edit Fields node had count typed as String, sending `\"count\": \"50\"` to Apify instead of `\"count\": 50`. The actor silently fell back to a low default count.",
    fix: "Changed the field type from String to Number in the Edit Fields node. Subsequent runs scraped the full 50 listings as configured.",
  },
  {
    problem: "Frontend timing out — pipeline showed 'Failed' after 60 seconds",
    detail: "The webhook was set to 'When Last Node Finishes', so the frontend's HTTP request waited for the entire workflow. AI processing across 21 jobs took 5+ minutes, far exceeding browser timeout limits.",
    fix: "Added a Respond to Webhook node immediately after the trigger. It sends an instant acknowledgment to the frontend while the workflow continues in the background. The frontend now shows a live progress screen instead of timing out.",
  },
  {
    problem: "n8n's 5-minute execution timeout killed mid-run workflows",
    detail: "Every execution processing more than 10 AI resume customizations was cancelled at exactly 5 minutes. The Customise Resume node would start, then get killed — rolling back all downstream data silently.",
    fix: "Disabled the workflow timeout in n8n Workflow Settings. The pipeline now runs to full completion regardless of duration.",
  },
  {
    problem: "Production webhook rejected all requests — workflow was never activated",
    detail: "n8n has two separate URLs: a test URL requiring 'Listen for test event' and a production URL requiring the workflow to be Published. The workflow was never activated, so every frontend request returned an error.",
    fix: "Published the workflow using the Active toggle in n8n. The production webhook now accepts requests permanently without any manual step before each run.",
  },
];

export const takeaways = [
  {
    title: "LLMs Need Deterministic Wrappers to Be Reliable",
    description:
      "Raw LLM outputs are non-deterministic in production pipelines. Structured prompts, JSON schema validation, and fallback handlers are what make AI automation trustworthy — not the model. The model is just one node.",
  },
  {
    title: "Idempotency Is Non-Negotiable in Any Pipeline",
    description:
      "Automation pipelines re-run. Without idempotency design, duplicates accumulate, costs inflate, and data quality degrades silently. Fingerprint hashing solved this without adding a dedicated database or dedup service.",
  },
  {
    title: "Audit Trails Enable Continuous Improvement",
    description:
      "The Sheets log isn't just a record — it's a tuning instrument. Tracking scores, rationales, and downstream application outcomes creates the signal needed to improve prompt quality and threshold calibration over time.",
  },
  {
    title: "Operational Controls Are the Architecture",
    description:
      "Batching, rate limiting, retry logic, and configurable thresholds aren't afterthoughts. They are the difference between a demo that works once and a system that runs reliably every week without manual intervention.",
  },
];

export const dashboardScreenshots = [
  {
    label: "n8n Pipeline Overview",
    description: "Full workflow: Webhook → Respond → Job Search URL → Apify Scrape → Loop → Evaluate → Filter → Resume Rewrite → Create Doc → Add Text → Remove Duplicates → Append to Sheets",
    src: "/jobscraping1.png",
  },
  {
    label: "OpenAI Evaluation Output",
    description: "Structured JSON scoring response with matched/missing skills and apply rationale",
    src: "/jobscraping2.png",
  },
  {
    label: "Google Sheets Audit Log",
    description: "Live application log showing scores, statuses, document links, and timestamps",
    src: "",
  },
  {
    label: "Generated Google Doc Resume",
    description: "ATS-formatted, role-specific resume generated from master template via Docs API",
    src: "",
  },
];

export { Bell };
