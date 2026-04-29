// ChatBot type definitions

export interface Message {
  messageId?: string;
  text: string;
  role: "user" | "bot" | "cta";
  timestamp: Date;
}

export type LeadCaptureStep =
  | "none"
  | "name"
  | "email"
  | "project_type"
  | "description"
  | "complete";

export interface ConversationState {
  capturedData: {
    name?: string;
    email?: string;
    projectType?: string;
    problem?: string;
  };
  userType?: string;
  intent?: string;
  messageCount: number;
  sessionId: string;
  startedAt: Date;
  lastActivityAt: Date;
  captureStep: LeadCaptureStep;
  stage: string;
  leadCaptured: boolean;
  ctaTriggered: boolean;
}
