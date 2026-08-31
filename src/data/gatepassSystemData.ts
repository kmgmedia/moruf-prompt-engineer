import {
  BarChart2,
  CheckCircle2,
  Clock,
  Database,
  GitBranch,
  Monitor,
  QrCode,
  ScanLine,
  Server,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const problemItems = [
  "Manual guest verification using printed lists",
  "Slow check-in processes during peak arrival periods",
  "Difficulty identifying invited vs uninvited guests",
  "Lack of real-time attendance visibility",
  "Poor coordination between event staff at entry points",
  "Limited post-event attendance records and reporting",
];

export const solutionItems = [
  "Verify guest access instantly using QR codes",
  "Track attendance in real time",
  "Reduce unauthorized event access",
  "Improve crowd coordination at event entrances",
  "Manage guest data digitally instead of manually",
  "Generate attendance records for post-event reporting",
];

export const keyFeatures = [
  {
    title: "QR-Based Guest Verification",
    description:
      "Each invited guest receives a unique QR code that can be scanned and validated instantly during check-in.",
  },
  {
    title: "Real-Time Event Check-In",
    description:
      "The system processes guest verification in real time, helping event staff reduce queues and speed up entry operations.",
  },
  {
    title: "Attendance Tracking",
    description:
      "Event organizers can monitor attendance activity and track guest check-in status throughout the event.",
  },
  {
    title: "Operational Gate Management",
    description:
      "The workflow supports structured coordination between ushers, access personnel, and event management teams during live operations.",
  },
  {
    title: "Unauthorized Access Prevention",
    description:
      "The system helps reduce gate-crashing and duplicate check-ins through digital verification workflows.",
  },
  {
    title: "Digital Guest Data Management",
    description:
      "Guest information is managed digitally, eliminating dependency on printed lists and manual tracking methods.",
  },
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Guest Registration",
    description:
      "Event organizers upload the guest list to the system. Each guest is registered with their name, contact details, and invitation tier.",
    icon: Users,
  },
  {
    step: "02",
    title: "QR Code Generation",
    description:
      "The system automatically generates a unique, encrypted QR code per guest and prepares it for distribution before the event.",
    icon: QrCode,
  },
  {
    step: "03",
    title: "Gate Scanning",
    description:
      "At the entrance, event staff use the GatePass scanner interface to scan each guest's QR code for instant identity verification.",
    icon: ScanLine,
  },
  {
    step: "04",
    title: "Real-Time Verification",
    description:
      "The backend validates the QR code against the guest database in milliseconds, flagging duplicates and unauthorized access attempts immediately.",
    icon: Zap,
  },
  {
    step: "05",
    title: "Live Attendance Tracking",
    description:
      "The organizer dashboard updates in real time as guests check in, giving full visibility of gate activity throughout the event.",
    icon: BarChart2,
  },
  {
    step: "06",
    title: "Post-Event Reporting",
    description:
      "After the event, a complete attendance report is generated showing check-in times, total count, and any flagged access attempts.",
    icon: CheckCircle2,
  },
];

export const operationsFlow = [
  {
    phase: "Pre-Event Setup",
    icon: Clock,
    steps: [
      "Upload guest list to the GatePass dashboard",
      "System generates unique QR codes per guest",
      "QR codes distributed to guests via email",
      "Staff assigned to gate roles and briefed",
    ],
  },
  {
    phase: "Event Day Operations",
    icon: ScanLine,
    steps: [
      "Gates activated and scanner devices ready",
      "Guests present QR codes at entry points",
      "Each code verified against database in real time",
      "Unauthorized or duplicate entries flagged instantly",
    ],
  },
  {
    phase: "Post-Event Closeout",
    icon: BarChart2,
    steps: [
      "Final attendance count auto-generated",
      "Full check-in report available for download",
      "Flagged access attempts reviewed",
      "Guest data archived for future events",
    ],
  },
];

export const architectureLayers = [
  {
    layer: "Client Layer",
    color: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: Monitor,
    components: ["React.js Event Dashboard", "Mobile QR Scanner Interface", "Live Attendance View"],
  },
  {
    layer: "API Layer",
    color: "bg-primary/10 border-primary/30",
    textColor: "text-primary",
    icon: Server,
    components: ["Node.js REST API", "QR Validation Engine", "Auth & Role Middleware"],
  },
  {
    layer: "Data Layer",
    color: "bg-green-500/10 border-green-500/30",
    textColor: "text-green-400",
    icon: Database,
    components: ["Guest Database", "Event & Gate Config", "Attendance Logs"],
  },
];

export const apiEndpoints = [
  {
    method: "POST",
    endpoint: "/api/events",
    description: "Create a new event and configure gate settings",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    method: "POST",
    endpoint: "/api/guests",
    description: "Register a guest and trigger QR code generation",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    method: "GET",
    endpoint: "/api/guests",
    description: "Retrieve the full guest list for an event",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    method: "POST",
    endpoint: "/api/checkin",
    description: "Verify QR code and mark guest as checked in",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    method: "GET",
    endpoint: "/api/attendance",
    description: "Fetch live attendance data and check-in status",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    method: "GET",
    endpoint: "/api/events",
    description: "List all events and their configurations",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
];

export const scalabilityPoints = [
  {
    title: "Stateless Backend",
    description:
      "The Node.js API is fully stateless, allowing multiple server instances to run in parallel during high-traffic events with thousands of simultaneous check-ins.",
    icon: Server,
  },
  {
    title: "Indexed QR Lookups",
    description:
      "Guest records are indexed by QR hash for sub-millisecond lookup times, ensuring verification speed stays consistently fast regardless of guest list size.",
    icon: Zap,
  },
  {
    title: "Multi-Gate Support",
    description:
      "Multiple entry points can operate simultaneously, with all gate activity syncing to a single real-time dashboard without conflicts.",
    icon: GitBranch,
  },
  {
    title: "Event Volume",
    description:
      "Designed to handle events from 50 to 50,000+ guests with the same verification speed, operational reliability, and reporting accuracy.",
    icon: TrendingUp,
  },
];

export const impactItems = [
  "Faster guest entry and reduced queue times",
  "Improved coordination during event operations",
  "Reduced unauthorized guest access",
  "Better visibility into attendance activity",
  "Digitized event guest management workflows",
  "Improved overall guest check-in experience",
];

export const implementationItems = [
  "QR code generation and validation",
  "Real-time event access workflows",
  "Guest attendance state management",
  "Event operation coordination logic",
  "Check-in activity logging",
  "API-driven verification workflows",
  "Mobile-friendly event operation interfaces",
];

export const tools = [
  "Node.js",
  "React.js",
  "QR Verification Workflows",
  "REST APIs",
  "Database Management Systems",
  "Real-Time Check-In Architecture",
  "Web-Based Operational Dashboard",
  "Event Access Logic Systems",
];

export const takeaways = [
  {
    title: "Operational Software Requires Workflow Thinking",
    description:
      "Building event systems is not only about interfaces. It requires understanding real-world crowd flow, verification speed, and operational coordination.",
  },
  {
    title: "Real-Time Systems Improve User Experience",
    description:
      "Fast guest verification and structured check-in processes significantly improve the event entry experience for both organizers and attendees.",
  },
  {
    title: "Digital Access Control Reduces Operational Chaos",
    description:
      "Replacing manual guest handling with structured verification workflows improves event organization and reduces gate management issues.",
  },
  {
    title: "Scalable Event Systems Depend on Reliable Verification Logic",
    description:
      "Accurate guest validation, attendance tracking, and operational workflows are critical for maintaining reliability during large-scale events.",
  },
];

export const dashboardScreenshots = [
  {
    label: "Guest Management View",
    description: "Manage registered guests, view RSVP status, and edit guest details ahead of the event.",
    image:
      "https://res.cloudinary.com/ds2h3iwys/image/upload/v1788192399/moruf-prompt-engineer-portfolio/GatePass%20System/Screenshot_2026-08-27_234500_laan1w.png",
  },
  {
    label: "Live Check-In Dashboard",
    description: "Real-time view of gate activity, attendance counts, and check-in status across all entry points.",
    image:
      "https://res.cloudinary.com/ds2h3iwys/image/upload/v1788194256/moruf-prompt-engineer-portfolio/GatePass%20System/Screenshot_2026-08-30_224841_w4y0j2.png",
    note: "Guest data shown is from a real event and has been blurred for privacy.",
  },
  {
    label: "QR Scanner Interface",
    description: "Scan guest QR codes at the gate for instant identity verification and entry logging.",
    image:
      "https://res.cloudinary.com/ds2h3iwys/image/upload/v1788192414/moruf-prompt-engineer-portfolio/GatePass%20System/Screenshot_2026-08-30_225041_yjuznm.png",
  },
  {
    label: "Attendance Report View",
    description: "Post-event attendance summary with check-in timestamps and an entry-point breakdown.",
    image:
      "https://res.cloudinary.com/ds2h3iwys/image/upload/v1788194257/moruf-prompt-engineer-portfolio/GatePass%20System/Screenshot_2026-08-30_225325_og3x3q.png",
    note: "Guest data shown is from a real event and has been blurred for privacy.",
  },
];
