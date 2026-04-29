// Lead capture prompt and label helpers

import type { LeadCaptureStep, ConversationState } from "@/lib/chatbot/types";

const PROJECT_TYPE_LABELS: Record<string, string> = {
  automation: "Automation system",
  api_integration: "API / integration",
  web_app: "Web app",
  web_system: "Web system",
  recruiting: "Recruiting / role conversation",
  not_sure: "Not sure yet",
};

export const getLeadCapturePrompt = (
  step: LeadCaptureStep,
  capturedData: ConversationState["capturedData"],
): string => {
  if (step === "name") {
    return "Before we jump to a call, I can quickly capture your details so I come prepared.\n\nWhat's your name?";
  }
  if (step === "email") {
    const displayName = capturedData.name ? capturedData.name : "there";
    return `Nice to meet you, ${displayName} 👍\nWhat's the best email to reach you?`;
  }
  if (step === "project_type") {
    return "Got it.\n\nWhich best describes what you need?\n\n1. Automation system\n2. API / integration\n3. Web app\n4. Not sure yet";
  }
  if (step === "description") {
    return "Last one — can you briefly describe what you're trying to build or improve?";
  }
  return "";
};

export const getProjectTypeLabel = (projectType?: string): string => {
  if (!projectType) {
    return "project";
  }
  return PROJECT_TYPE_LABELS[projectType] || projectType;
};
