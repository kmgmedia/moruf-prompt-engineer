export const CHATBOT_ALLOWED_PATHS = [
  "/book-call",
  "/case-study/teacher-ai",
  "/case-study/intelligent-workflow-systems",
  "/case-study/ai-teaching-assistant-system",
  "/case-study/ecommerce-sales-automation",
  "/case-study/sandton-school",
  "/case-study/dashboard",
  "/case-study/byway-backend-api",
  "/case-study/byc-ecommerce",
  "/case-study/emotional-ai",
  "/case-study/property-intelligence-assistant",
  "/case-study/gatepass-system",
  "/case-study/gatepass-website",
] as const;

const CHATBOT_ALLOWED_PATH_SET = new Set<string>(CHATBOT_ALLOWED_PATHS);

export const CHATBOT_PATH_CANDIDATE_REGEX =
  /(\/(?:book-call|case-study\/[a-z0-9-]+))/gi;

const normalizePath = (path: string): string => {
  const normalized = path.toLowerCase().replace(/[),.!?;:]+$/g, "");

  if (normalized.length > 1 && normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }

  return normalized;
};

export const isAllowedChatbotPath = (path: string): boolean => {
  return CHATBOT_ALLOWED_PATH_SET.has(normalizePath(path));
};

export const extractMentionedChatbotPaths = (text: string): string[] => {
  const matches = text.match(CHATBOT_PATH_CANDIDATE_REGEX) || [];
  const normalizedMatches = matches.map((match) => normalizePath(match));
  return Array.from(new Set(normalizedMatches));
};

export const getUnknownChatbotPaths = (text: string): string[] => {
  return extractMentionedChatbotPaths(text).filter(
    (path) => !isAllowedChatbotPath(path),
  );
};
