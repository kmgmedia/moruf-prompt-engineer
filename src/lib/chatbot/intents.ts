/**
 * Intent Detection Logic
 * Analyzes user messages to determine intent and extract structured data
 */

import { UserType, Intent, CapturedData } from "./types";

interface IntentResult {
  userType: UserType;
  intent: Intent;
  extractedData: Partial<CapturedData>;
}

/**
 * Detect if user is a client based on keywords
 */
export const isClientIntent = (message: string): boolean => {
  const clientKeywords = [
    "build",
    "automate",
    "automation",
    "api",
    "integrate",
    "integration",
    "system",
    "app",
    "application",
    "tool",
    "connect",
    "workflow",
    "process",
    "software",
  ];

  const lowerMsg = message.toLowerCase();
  return clientKeywords.some((keyword) => lowerMsg.includes(keyword));
};

/**
 * Detect if user is a recruiter based on keywords
 */
export const isRecruiterIntent = (message: string): boolean => {
  const recruiterKeywords = [
    "hiring",
    "recruit",
    "job",
    "position",
    "role",
    "opportunity",
    "engineer",
    "developer",
    "contract",
    "freelance",
    "employment",
    "candidate",
  ];

  const lowerMsg = message.toLowerCase();
  return recruiterKeywords.some((keyword) => lowerMsg.includes(keyword));
};

/**
 * Extract project type from message
 */
export const extractProjectType = (message: string): Intent => {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("automation") || lowerMsg.includes("automate")) {
    return "automation";
  }
  if (lowerMsg.includes("api") || lowerMsg.includes("integration")) {
    return "api_integration";
  }
  if (lowerMsg.includes("web") || lowerMsg.includes("app")) {
    return "web_app";
  }
  if (lowerMsg.includes("system") || lowerMsg.includes("platform")) {
    return "web_system";
  }
  if (lowerMsg.includes("technical") || lowerMsg.includes("how")) {
    return "technical";
  }

  return "unknown";
};

/**
 * Extract email from message
 */
export const extractEmail = (message: string): string | undefined => {
  const emailRegex = /([^\s@]+@[^\s@]+\.[^\s@]+)/;
  const match = message.match(emailRegex);
  return match ? match[1] : undefined;
};

/**
 * Extract name from message (simple pattern matching)
 */
export const extractName = (message: string): string | undefined => {
  // Pattern: "I'm [Name]" or "Name: [Name]" or "my name is [Name]"
  const patterns = [
    /(?:i'm|im)\s+([a-zA-Z]+)/i,
    /name[:\s]+([a-zA-Z]+)/i,
    /(?:my\s+name\s+is)\s+([a-zA-Z]+)/i,
    /(?:call\s+me)\s+([a-zA-Z]+)/i,
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return undefined;
};

/**
 * Extract problem/challenge from message
 */
export const extractProblem = (message: string): string | undefined => {
  const problemKeywords = [
    "problem",
    "challenge",
    "issue",
    "struggle",
    "difficult",
  ];
  const lowerMsg = message.toLowerCase();

  for (const keyword of problemKeywords) {
    if (lowerMsg.includes(keyword)) {
      // Return message from keyword onward
      const idx = lowerMsg.indexOf(keyword);
      return message.substring(idx);
    }
  }

  return message.length > 50 ? message : undefined;
};

/**
 * Classify user type based on message
 */
export const classifyUserType = (message: string): UserType => {
  if (isRecruiterIntent(message)) {
    return "recruiter";
  }
  if (isClientIntent(message)) {
    return "client";
  }
  return "browser";
};

/**
 * Analyze user message and extract all relevant information
 */
export const analyzeMessage = (message: string): IntentResult => {
  const userType = classifyUserType(message);
  const intent =
    userType === "client" ? extractProjectType(message) : "unknown";

  const extractedData: Partial<CapturedData> = {
    name: extractName(message),
    email: extractEmail(message),
    projectType:
      intent !== "unknown"
        ? intent
        : userType === "recruiter"
          ? "recruiting"
          : undefined,
    problem: userType === "client" ? extractProblem(message) : undefined,
  };

  return {
    userType,
    intent,
    extractedData,
  };
};

/**
 * Determine if CTA should be triggered
 */
export const shouldTriggerCTA = (
  messageCount: number,
  userType: UserType,
  problemDescribed: boolean,
): boolean => {
  if (userType === "client") {
    return (messageCount >= 2 && problemDescribed) || messageCount >= 4;
  }
  if (userType === "recruiter") {
    return messageCount >= 2;
  }
  return false;
};

/**
 * Determine next conversation stage
 */
export const determineNextStage = (
  currentStage: string,
  userType: UserType,
  messageCount: number,
): string => {
  if (currentStage === "greeting") {
    if (userType === "client") return "qualifying";
    if (userType === "recruiter") return "positioning";
    return "qualifying";
  }

  if (currentStage === "qualifying") {
    return messageCount > 2 ? "understanding" : "qualifying";
  }

  if (currentStage === "understanding") {
    return messageCount > 4 ? "positioning" : "understanding";
  }

  if (currentStage === "positioning") {
    return "cta";
  }

  if (currentStage === "cta") {
    return "lead_capture";
  }

  return currentStage;
};
