/**
 * Chatbot Type Definitions
 * Central location for all TypeScript interfaces and types
 */

export type UserType = "unknown" | "client" | "recruiter" | "browser";
export type ConversationStage =
  | "greeting"
  | "qualifying"
  | "understanding"
  | "positioning"
  | "cta"
  | "lead_capture"
  | "captured";
export type Intent =
  | "unknown"
  | "automation"
  | "api_integration"
  | "web_app"
  | "web_system"
  | "recruiting"
  | "portfolio"
  | "technical";

export interface Message {
  role: "user" | "bot";
  text: string;
  timestamp: Date;
  messageId: string;
}

export interface CapturedData {
  name?: string;
  email?: string;
  projectType?: string;
  problem?: string;
}

export interface ConversationState {
  stage: ConversationStage;
  userType: UserType;
  intent: Intent;
  messageCount: number;
  capturedData: CapturedData;
  memoryKey: string;
  sessionId: string;
  ctaTriggered: boolean;
  leadCaptured: boolean;
  startedAt: Date;
  lastActivityAt: Date;
}

export interface LeadData {
  name: string;
  email: string;
  projectType: string;
  description: string;
  intent: "client" | "recruiter" | "browsing";
  source: "chatbot";
  sessionId: string;
  conversationDuration: number; // in seconds
  messageCount: number;
  messages: Array<{ role: string; text: string; timestamp: Date }>;
}

export interface ConversationFlow {
  greeting?: string;
  options?: string[];
  step1_qualify?: string;
  step1_role?: string;
  step2_understand?: string;
  step2_background?: string;
  step3_position?: string;
  step3_cta?: string;
  intro?: string;
  clarify?: string;
  followup?: string;
}

export const INITIAL_CONVERSATION_STATE: ConversationState = {
  stage: "greeting",
  userType: "unknown",
  intent: "unknown",
  messageCount: 0,
  capturedData: {},
  memoryKey: `chatbot_${Date.now()}`,
  sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  ctaTriggered: false,
  leadCaptured: false,
  startedAt: new Date(),
  lastActivityAt: new Date(),
};

export const STORAGE_KEY = "chatbot_conversation_state";
export const MESSAGES_STORAGE_KEY = "chatbot_messages";
