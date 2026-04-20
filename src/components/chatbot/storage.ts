import {
  ConversationState,
  Message,
  INITIAL_CONVERSATION_STATE,
  STORAGE_KEY,
  MESSAGES_STORAGE_KEY,
} from "@/lib/chatbot/types";
import { INITIAL_BOT_GREETING } from "@/components/chatbot/constants";

export const getInitialConversationState = (): ConversationState => {
  if (typeof window === "undefined") {
    return INITIAL_CONVERSATION_STATE;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return INITIAL_CONVERSATION_STATE;
    }

    const parsed = JSON.parse(saved);
    return {
      ...INITIAL_CONVERSATION_STATE,
      ...parsed,
      captureStep:
        parsed.captureStep || INITIAL_CONVERSATION_STATE.captureStep || "none",
      startedAt: parsed.startedAt
        ? new Date(parsed.startedAt)
        : INITIAL_CONVERSATION_STATE.startedAt,
      lastActivityAt: new Date(),
    };
  } catch (error) {
    console.error("Failed to load chatbot state:", error);
    return INITIAL_CONVERSATION_STATE;
  }
};

export const getInitialMessages = (): Message[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    }
  } catch (error) {
    console.error("Failed to load messages:", error);
  }

  return [
    {
      role: "bot",
      text: INITIAL_BOT_GREETING,
      timestamp: new Date(),
      messageId: `msg_${Date.now()}`,
    },
  ];
};

export const persistConversationState = (state: ConversationState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
};

export const persistMessages = (messages: Message[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  }
};
