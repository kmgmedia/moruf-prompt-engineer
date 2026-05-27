import {
  BarChart2,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  GraduationCap,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const problemItems = [
  "Teachers spent 4–6 hours weekly writing lesson notes, reports, and parent communications",
  "Administrative writing reduced time available for actual teaching and student engagement",
  "Inconsistent tone and quality across reports when written under time pressure",
  "Parent communication was infrequent due to the effort required to draft personalized messages",
  "No structured system for generating consistent, grade-appropriate lesson content",
  "Repetitive documentation tasks caused burnout without improving educational outcomes",
];

export const solutionItems = [
  "AI system generates structured lesson notes tailored to each grade level and subject",
  "Automated student progress reports with personalized performance insights per learner",
  "Tone-controlled parent communication drafted in seconds, not hours",
  "Google Sheets integration reads student records directly, eliminating manual data entry",
  "Template-driven output formatting ensures consistent, professional document quality",
  "Teachers retain control — AI generates drafts, educators refine and approve",
];

export const pipelineStages = [
  { label: "Task Selection", sublabel: "Lesson / Report / Comms", icon: Settings },
  { label: "Input Context", sublabel: "Grade, subject, student", icon: FileText },
  { label: "Template Loading", sublabel: "Task-specific prompt", icon: BookOpen },
  { label: "Gemini Processing", sublabel: "AI content generation", icon: Brain },
  { label: "Quality Control", sublabel: "Tone & format rules", icon: CheckCircle2 },
  { label: "Output Delivery", sublabel: "Formatted document", icon: GraduationCap },
];

export const architectureLayers = [
  {
    layer: "Interface Layer",
    color: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: Settings,
    components: ["Streamlit Web App", "Task Selection UI", "Input Form Components", "Output Preview Panel"],
  },
  {
    layer: "AI Processing Layer",
    color: "bg-purple-500/10 border-purple-500/30",
    textColor: "text-purple-400",
    icon: Brain,
    components: ["Gemini API Integration", "Context Injection Engine", "Role-Based Prompts", "Output Validation"],
  },
  {
    layer: "Data Layer",
    color: "bg-primary/10 border-primary/30",
    textColor: "text-primary",
    icon: Database,
    components: ["Google Sheets API", "Student Record Access", "Prompt Template Library", "Session State"],
  },
  {
    layer: "Output Layer",
    color: "bg-green-500/10 border-green-500/30",
    textColor: "text-green-400",
    icon: FileText,
    components: ["Formatted Lesson Notes", "Student Progress Reports", "Parent Communication Drafts", "Download & Export"],
  },
];

export const workflowTypes = [
  {
    step: "01",
    title: "Lesson Note Generator",
    description:
      "Teacher inputs grade level, subject, and topic. The system generates a structured lesson plan with learning objectives, activity sequence, classroom engagement prompts, and assessment criteria — in the school's documented format.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Student Report Writer",
    description:
      "Teacher selects a student from the Google Sheets roster. Performance data is pulled automatically. The system generates a personalized progress report with subject-by-subject commentary, behaviour notes, and a parent-facing summary.",
    icon: GraduationCap,
  },
  {
    step: "03",
    title: "Parent Communication",
    description:
      "Teacher describes the communication purpose and tone preference. The system drafts a professional, warm parent message — whether for a progress update, concern, event reminder, or achievement recognition — ready to copy and send.",
    icon: MessageSquare,
  },
];

export const keyFeatures = [
  {
    title: "Grade-Level Lesson Note Generation",
    description:
      "The system understands grade context and curriculum requirements, generating lesson notes with appropriate vocabulary, learning objectives, and activity structures for each year group.",
  },
  {
    title: "Consistent Student Report Creation",
    description:
      "Every report follows the same structured format, tone, and quality standard — regardless of which teacher generates it or how much time is available. Quality doesn't vary with workload.",
  },
  {
    title: "Streamlined Parent Communication",
    description:
      "Parent messages are generated in seconds, with tone controls for formal, warm, and conversational styles. Teachers approve and send — the drafting workload is eliminated.",
  },
  {
    title: "Google Sheets Integration",
    description:
      "Student names, performance data, and class information are read directly from Google Sheets, eliminating manual data entry and ensuring reports are always based on current records.",
  },
  {
    title: "Role-Based AI Behavior",
    description:
      "The system is prompted to behave as an experienced educator — not a general AI. Outputs consistently use appropriate educational language, professional tone, and grade-specific framing.",
  },
];

export const businessOutcomes = [
  {
    metric: "60%",
    label: "Admin Writing Time Saved",
    context: "4–6 hrs weekly → under 2 hrs with AI assistance",
    icon: Clock,
  },
  {
    metric: "40%",
    label: "Parent Communication Increase",
    context: "More frequent updates due to reduced drafting effort",
    icon: MessageSquare,
  },
  {
    metric: "10+ hrs",
    label: "Saved Per Teacher Monthly",
    context: "Reallocated to teaching, planning, and student engagement",
    icon: TrendingUp,
  },
  {
    metric: "100%",
    label: "Consistent Output Quality",
    context: "Same professional standard regardless of time pressure",
    icon: CheckCircle2,
  },
];

export const impactItems = [
  "60% reduction in administrative writing time for participating teachers",
  "40% increase in parent communication frequency within 3 months of deployment",
  "Consistent tone and quality maintained across all AI-generated documents",
  "10+ hours saved per teacher per month, reallocated to student engagement",
  "Lesson notes generated in 2 minutes instead of 30–45 minutes manually",
  "Student records from Google Sheets integrated without any manual data entry",
];

export const tools = [
  "Python",
  "Gemini API",
  "Streamlit",
  "Google Sheets API",
  "LangChain",
  "Prompt Engineering",
  "Template-Driven Output",
  "Role-Based AI Design",
];

export const takeaways = [
  {
    title: "AI Integration Should Start With Workflow Design",
    description:
      "The system works because we mapped the exact teacher workflow first — task selection, input context, output format — before touching any AI. Embedding AI into a clear workflow produces results. Bolting it onto unclear processes does not.",
  },
  {
    title: "Structured Inputs Produce Reliable Outputs",
    description:
      "Grade level, subject, student name, and performance context are not optional details — they are the prompt. When inputs are structured and consistent, AI outputs become consistent enough to trust in a professional setting.",
  },
  {
    title: "Adoption Depends on Simplicity",
    description:
      "Teachers are not technical users. A Streamlit interface with three simple inputs and a clearly labelled output button was the right design decision. If the interface required training, adoption would have failed.",
  },
  {
    title: "Controlled AI Can Deliver Measurable Impact",
    description:
      "Role-based prompting, output formatting rules, and quality controls made the difference between a demo that impressed and a system that delivered 60% time savings in production.",
  },
];

export const dashboardScreenshots = [
  {
    label: "Streamlit App Interface",
    description: "Task selection, input forms, and AI output panel",
    src: "/projects/teacher-ai.png",
  },
  {
    label: "Lesson Note Output",
    description: "Structured AI-generated lesson plan with objectives and activities",
    src: "",
  },
  {
    label: "Student Report Generator",
    description: "Personalized progress report pulled from Google Sheets data",
    src: "",
  },
  {
    label: "Parent Communication Draft",
    description: "Tone-controlled parent message ready for teacher review and send",
    src: "",
  },
];
