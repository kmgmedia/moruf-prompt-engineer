import {
  BarChart2,
  Code,
  Database,
  GitBranch,
  Lock,
  RefreshCw,
  Server,
  Settings,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const problemItems = [
  "No structured backend to manage product reviews, ratings, and user-generated content",
  "User authentication and access control needed to be secure and scalable from day one",
  "Role-based permissions required: regular users, moderators, and admins had different access levels",
  "Frontend teams needed a reliable, well-documented API to integrate against without friction",
  "Data validation was inconsistent, creating risk of malformed records entering the database",
  "No CI/CD pipeline in place, making deployment risky and manual",
];

export const solutionItems = [
  "RESTful API with full CRUD operations for products, reviews, and user accounts",
  "JWT-based stateless authentication with secure token issuance and validation",
  "Role-based access control (RBAC) restricting operations by user permission level",
  "Mongoose schema validation enforcing data integrity at the database layer",
  "Modular route and controller architecture enabling clean, maintainable extension",
  "Postman test suite and GitHub Actions CI/CD pipeline for deployment confidence",
];

export const pipelineStages = [
  { label: "HTTP Request", sublabel: "Client sends request", icon: Code },
  { label: "Route Matching", sublabel: "Express.js router", icon: GitBranch },
  { label: "Auth Middleware", sublabel: "JWT + RBAC check", icon: Shield },
  { label: "Controller Logic", sublabel: "Business processing", icon: Settings },
  { label: "Data Validation", sublabel: "Mongoose schema", icon: Database },
  { label: "MongoDB Query", sublabel: "Database operation", icon: Server },
  { label: "JSON Response", sublabel: "Structured response", icon: Code },
];

export const architectureLayers = [
  {
    layer: "API Layer",
    color: "bg-blue-500/10 border-blue-500/30",
    textColor: "text-blue-400",
    icon: Code,
    components: ["Express.js Router", "Route Handlers", "Request Parsing", "CORS & Headers"],
  },
  {
    layer: "Auth Layer",
    color: "bg-purple-500/10 border-purple-500/30",
    textColor: "text-purple-400",
    icon: Shield,
    components: ["JWT Token Issuance", "Token Validation Middleware", "Role-Based Access Control", "bcrypt Password Hashing"],
  },
  {
    layer: "Business Layer",
    color: "bg-primary/10 border-primary/30",
    textColor: "text-primary",
    icon: Settings,
    components: ["Controller Functions", "Request Validation", "Error Handler Middleware", "Business Logic"],
  },
  {
    layer: "Data Layer",
    color: "bg-green-500/10 border-green-500/30",
    textColor: "text-green-400",
    icon: Database,
    components: ["MongoDB Atlas", "Mongoose Schemas", "Index Strategy", "Query Optimization"],
  },
];

export const apiEndpoints = [
  {
    method: "POST",
    endpoint: "/api/auth/register",
    description: "User registration with hashed credentials and role assignment",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    method: "POST",
    endpoint: "/api/auth/login",
    description: "JWT token generation on valid email and password credentials",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    method: "GET",
    endpoint: "/api/products",
    description: "Fetch product listings with pagination and filter support",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    method: "POST",
    endpoint: "/api/reviews",
    description: "Submit a product review (authenticated users only)",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    method: "PUT",
    endpoint: "/api/reviews/:id",
    description: "Update review: owner or admin permission required",
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  {
    method: "DELETE",
    endpoint: "/api/reviews/:id",
    description: "Delete review: RBAC enforced at middleware level",
    color: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  {
    method: "GET",
    endpoint: "/api/reviews/:productId",
    description: "Retrieve all reviews for a product with rating aggregation",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
];

export const keyFeatures = [
  {
    title: "Full CRUD Operations",
    description:
      "Complete Create, Read, Update, and Delete operations for products, reviews, and user accounts, each endpoint secured and validated independently.",
  },
  {
    title: "JWT-Based Stateless Authentication",
    description:
      "Token-based authentication with bcrypt password hashing. Tokens are validated on every protected request through middleware without session storage, enabling horizontal scaling.",
  },
  {
    title: "Role-Based Access Control (RBAC)",
    description:
      "Three-tier permission system: regular users can submit and edit their own reviews, moderators can manage all reviews, admins have full system access, enforced at the middleware layer.",
  },
  {
    title: "Mongoose Schema Validation",
    description:
      "All data written to MongoDB passes through Mongoose schema validation: required fields, data types, string lengths, and enum values are all enforced before any database write.",
  },
  {
    title: "Modular Architecture",
    description:
      "Routes, controllers, models, and middleware are cleanly separated into independent modules. Adding a new resource (products, categories, users) follows the same pattern without touching existing code.",
  },
  {
    title: "Postman Test Suite & CI/CD",
    description:
      "All endpoints are covered by a Postman test collection. GitHub Actions runs tests on every push and handles deployment to Vercel, ensuring the API never ships broken endpoints.",
  },
];

export const businessOutcomes = [
  {
    metric: "100%",
    label: "Endpoint Auth Coverage",
    context: "Every protected route validated at middleware level",
    icon: Shield,
  },
  {
    metric: "RBAC",
    label: "Role-Based Access",
    context: "User, moderator, and admin tiers enforced",
    icon: Lock,
  },
  {
    metric: "Zero",
    label: "Unvalidated Writes",
    context: "All data enforced through Mongoose schema",
    icon: Database,
  },
  {
    metric: "CI/CD",
    label: "Automated Deployment",
    context: "GitHub Actions pipeline to production on merge",
    icon: RefreshCw,
  },
];

export const impactItems = [
  "Secure JWT authentication and role-based access control across all protected endpoints",
  "Efficient database operations with Mongoose schema validation and indexed queries",
  "Modular architecture that is easy to extend without modifying existing route logic",
  "Full Postman test suite providing endpoint coverage and regression safety",
  "CI/CD pipeline via GitHub Actions ensuring reliable, automated deployment",
  "Production-ready API architecture designed to scale horizontally without refactoring",
];

export const tools = [
  "Node.js",
  "Express.js",
  "MongoDB Atlas",
  "Mongoose",
  "JWT Authentication",
  "bcrypt",
  "Postman",
  "GitHub Actions",
  "Vercel",
  "REST API Design",
];

export const takeaways = [
  {
    title: "Clean Architecture Enables Safe Extension",
    description:
      "Separating routes, controllers, models, and middleware into distinct modules means new features can be added without modifying working code. This is what makes a backend maintainable rather than just functional.",
  },
  {
    title: "Security Must Be Structural, Not Conditional",
    description:
      "Adding auth checks inside controller functions leads to inconsistency. Building authentication and RBAC as middleware means security is enforced before any business logic runs, by design, not by discipline.",
  },
  {
    title: "Schema Validation Is the Last Line of Data Defense",
    description:
      "Frontend validation can be bypassed. Mongoose schema validation at the data layer cannot. Enforcing types, required fields, and constraints at the schema level protects data integrity regardless of how the API is called.",
  },
  {
    title: "Production Readiness Requires a Pipeline, Not Just Code",
    description:
      "An API that works locally is not production-ready. Test coverage, CI/CD automation, and deployment strategy are what separate a finished system from a prototype, and they need to be built alongside the features.",
  },
];

export const dashboardScreenshots = [
  {
    label: "API Architecture Overview",
    description: "Route structure, middleware chain, and request/response flow",
    src: "/projects/byway-api.png",
  },
  {
    label: "Postman Test Suite",
    description: "Full endpoint coverage with auth, RBAC, and validation tests",
    src: "",
  },
  {
    label: "MongoDB Data Model",
    description: "Mongoose schema definitions for users, products, and reviews",
    src: "",
  },
  {
    label: "GitHub Actions CI/CD",
    description: "Automated test and deployment pipeline on every merge to main",
    src: "",
  },
];
