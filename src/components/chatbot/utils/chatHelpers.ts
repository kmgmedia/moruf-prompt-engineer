import type { Message, ConversationState, LeadData } from "@/lib/chatbot/types";

export const createBotMessage = (text: string, suffix: string): Message => ({
  role: "bot",
  text,
  timestamp: new Date(),
  messageId: `msg_${Date.now()}_${suffix}`,
});

export const buildLeadPayload = (
  nextState: ConversationState,
  conversationMessages: Message[],
): LeadData => ({
  name: nextState.capturedData.name || "Unknown",
  email: nextState.capturedData.email || "unknown@example.com",
  projectType: nextState.capturedData.projectType || "not_sure",
  description: nextState.capturedData.problem || "To be discussed on call",
  intent:
    nextState.userType === "recruiter"
      ? "recruiter"
      : nextState.userType === "client"
        ? "client"
        : "browsing",
  source: "chatbot",
  status: "new_lead",
  sessionId: nextState.sessionId,
  conversationDuration: Math.round(
    (Date.now() - nextState.startedAt.getTime()) / 1000,
  ),
  messageCount: nextState.messageCount,
  messages: conversationMessages.map((m) => ({
    role: m.role,
    text: m.text,
    timestamp: m.timestamp,
  })),
});
