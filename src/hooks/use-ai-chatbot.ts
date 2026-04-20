/**
 * Hook for using OpenAI in the chatbot
 * Can be used alongside or instead of the rule-based flows
 */

import { useState, useCallback } from "react";
import {
  CHATBOT_ALLOWED_PATHS,
  getUnknownChatbotPaths,
} from "@/lib/chatbot/routes";

interface UseAIChatbotOptions {
  systemPrompt?: string;
  useOpenAI?: boolean;
  fallbackToRules?: boolean;
}

const CALL_INTENT_REGEX =
  /\b(call|phone|talk|speak|meeting|meet|zoom|whatsapp|schedule|book)\b/i;

const CHAT_ONLY_REGEX =
  /\b(only chat|here to chat online|can't call|cannot call|unable to call)\b/i;

const BOOKING_HINT_REGEX =
  /\b(book|schedule|calendar|discovery call|\/book-call)\b/i;

const CV_REQUEST_REGEX = /\b(cv|resume|resumé|résumé)\b/i;

const EXPERIENCE_INTENT_REGEX =
  /\b(about you|about moruf|your experience|background|expertise|tech stack|who are you|what do you do)\b/i;

const RECRUITER_INTENT_REGEX =
  /\b(recruiter|hiring|job|role|position|resume|cv|interview|contract)\b/i;

const CASE_STUDY_INTENT_REGEX =
  /\b(case study|case studies|examples?|portfolio|projects?|past work|similar work)\b/i;

const PRICING_OR_TIMELINE_REGEX =
  /\b(price|pricing|cost|budget|expensive|cheap|timeline|deadline|how long|delivery|deliver)\b/i;

const READY_TO_START_REGEX =
  /\b(ready|proceed|move forward|get started|start now|next step|hire)\b/i;

const CASE_STUDY_ROUTE_REGEX = /\/case-study\//i;

const RECRUITER_RESPONSE_HINT_REGEX =
  /\b(role|hiring|resume|cv|contract|availability|interview)\b|\/book-call/i;

const PRICE_TIMELINE_HINT_REGEX =
  /\b(scope|budget|timeline|estimate|discovery call)\b|\/book-call/i;

const EXPERIENCE_HINT_REGEX =
  /\b(applied ai engineer|full-stack|automation|api integration|conversational ai|node\.?js|python|react|langchain|mysql|system design|5\+ years|over 5 years)\b/i;

const callBookingReply =
  "Absolutely, yes — we can talk by phone. The fastest next step is to book a 20-30 minute discovery call here: /book-call. Once you submit, I will send a calendar link by email. If you want, I can guide you through what to fill in.";

const recruiterReply =
  "Great to connect. If this is for a role or contract, I can share relevant experience, projects, and availability. Best next step: book a short discovery call at /book-call, or share the role title, level, and key requirements here.";

const pricingTimelineReply =
  "Great question. Pricing and timeline depend on scope, integrations, and delivery speed. The fastest way to get a realistic estimate is a 20-30 minute discovery call at /book-call. If you want, share your goal, budget range, and deadline and I will help you frame it first.";

const caseStudyReply =
  "Absolutely. Here are strong examples you can review now: /case-study/teacher-ai, /case-study/ecommerce-sales-automation, and /case-study/byway-backend-api. If you share your use case, I can point you to the closest match.";

const readyToStartReply =
  "Perfect — let’s move forward. Please book your 20-30 minute discovery call at /book-call so I can review scope and share the best next steps. If you prefer, I can help you prepare a short project brief first.";

const resumeByCallReply =
  "Absolutely. For CV/resume requests, the process is to book a quick discovery call first at /book-call so I can share the most relevant version based on your role or project context. If helpful, share the role title and key requirements now.";

const experienceReply =
  "I have over 5 years of professional experience as an Applied AI Engineer and Full-Stack Developer. I focus on building production-ready automation systems, API integrations, conversational AI, and scalable web apps. I work across Node.js, Python, React, OpenAI, LangChain, MySQL, and system design, with a strong focus on reducing manual work and improving operational speed. If you want, I can map your use case to the most relevant project examples, or you can book a call at /book-call.";

const unavailableCaseStudyReply = (unknownPaths: string[]): string => {
  const availableCaseStudies = CHATBOT_ALLOWED_PATHS.filter((path) =>
    path.startsWith("/case-study/"),
  ).join(", ");

  return `I don't currently have this published on the site: ${unknownPaths.join(", ")}. Available case studies right now are: ${availableCaseStudies}. If you want examples in your exact niche, please book a discovery call at /book-call and I can share relevant details.`;
};

const normalizeLinkFormatting = (text: string): string => {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2").trim();
};

const enforceFirstPersonVoice = (text: string): string => {
  return text
    .replace(/\bMoruf has\b/gi, "I have")
    .replace(/\bMoruf is\b/gi, "I am")
    .replace(/\bMoruf can\b/gi, "I can")
    .replace(/\bMoruf will\b/gi, "I will")
    .replace(/\bMoruf\b/g, "I")
    .replace(/\bHis\b/g, "My")
    .replace(/\bhis\b/g, "my")
    .replace(/\bHe\b/g, "I")
    .replace(/\bhe\b/g, "I")
    .replace(/\bI has\b/g, "I have");
};

const postProcessResponse = (userMessage: string, aiText: string): string => {
  const cleaned = enforceFirstPersonVoice(normalizeLinkFormatting(aiText));
  const unknownPaths = getUnknownChatbotPaths(cleaned);

  const hasCallIntent = CALL_INTENT_REGEX.test(userMessage);
  const hasCvRequest = CV_REQUEST_REGEX.test(userMessage);
  const hasExperienceIntent = EXPERIENCE_INTENT_REGEX.test(userMessage);
  const hasRecruiterIntent = RECRUITER_INTENT_REGEX.test(userMessage);
  const hasCaseStudyIntent = CASE_STUDY_INTENT_REGEX.test(userMessage);
  const hasPricingOrTimelineIntent =
    PRICING_OR_TIMELINE_REGEX.test(userMessage);
  const hasReadyIntent = READY_TO_START_REGEX.test(userMessage);

  if (unknownPaths.length > 0) {
    return unavailableCaseStudyReply(unknownPaths);
  }

  if (hasCvRequest) {
    return resumeByCallReply;
  }

  if (hasExperienceIntent && !EXPERIENCE_HINT_REGEX.test(cleaned)) {
    return experienceReply;
  }

  if (hasCallIntent) {
    const appearsChatOnly = CHAT_ONLY_REGEX.test(cleaned);
    const hasBookingHint = BOOKING_HINT_REGEX.test(cleaned);

    if (appearsChatOnly || !hasBookingHint) {
      return callBookingReply;
    }
  }

  if (hasRecruiterIntent && !RECRUITER_RESPONSE_HINT_REGEX.test(cleaned)) {
    return recruiterReply;
  }

  if (hasCaseStudyIntent && !CASE_STUDY_ROUTE_REGEX.test(cleaned)) {
    return caseStudyReply;
  }

  if (hasPricingOrTimelineIntent && !PRICE_TIMELINE_HINT_REGEX.test(cleaned)) {
    return pricingTimelineReply;
  }

  if (hasReadyIntent && !BOOKING_HINT_REGEX.test(cleaned)) {
    return readyToStartReply;
  }

  return cleaned;
};

export const useAIChatbot = (options: UseAIChatbotOptions = {}) => {
  const isDev = typeof import.meta !== "undefined" && !!import.meta.env?.DEV;
  const configuredApiBase =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
      ? String(import.meta.env.VITE_API_URL).replace(/\/+$/, "")
      : "";
  const apiBase = configuredApiBase || (isDev ? "http://localhost:3001" : "");

  const {
    systemPrompt = `You are Moruf's AI assistant for his portfolio website.

Core role:
- Help visitors understand my services and guide them to the right next step.
- Services include AI automation systems, API integrations, conversational AI, and full-stack web/backend development.

Profile context:
- I am an Applied AI Engineer and Full-Stack Developer.
- I have 5+ years of professional experience.
- My strengths are AI automation systems, API integrations, conversational AI systems, and scalable product development.
- My core stack includes Node.js, Python, React, OpenAI, LangChain, MySQL, and system design.

Response style:
- Friendly, confident, and concise (max 120 words).
- Use simple language and focus on outcomes.
- Ask at most 1 clarifying question when needed.
- Always speak in first person using I, me, and my.
- Do not refer to Moruf in third person.
- Do not use markdown links. Never output [text](url). Use plain paths like /book-call.

Conversion behavior:
- If user asks to talk by phone/call/meeting, NEVER say you can only chat online.
- Instead, confirm positively and direct them to book here: /book-call.
- Mention this is a 20-30 minute discovery call and they will receive a calendar link by email.
- If user is ready, encourage immediate action with a short CTA.

Pricing and timeline:
- If asked about pricing, budget, or timeline, explain estimate depends on scope.
- Ask for goal, budget range, and deadline.
- Offer /book-call for a proper estimate.

Recruiter behavior:
- If message is recruiter/job/role related, respond as a talent conversation.
- Offer to share role-fit background and move to /book-call or collect role details.
- If they request CV/resume, do not provide it directly in chat; require booking at /book-call first.

Case study guidance:
- If user asks for examples, include relevant case-study paths from this site using plain paths.
- Prefer concise recommendations over long explanations.
- You can only mention these internal paths: ${CHATBOT_ALLOWED_PATHS.join(", ")}.
- If a requested example is not available, clearly say it is not currently published and direct the user to /book-call.

Boundaries:
- Do not invent unavailable channels.
- Keep replies practical and aligned with my portfolio context.`,
    useOpenAI = false,
    fallbackToRules = true,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAIResponse = useCallback(
    async (
      userMessage: string,
      conversationHistory?: Array<{
        role: "user" | "assistant";
        content: string;
      }>,
    ): Promise<string | null> => {
      if (!useOpenAI) return null;

      setIsLoading(true);
      setError(null);

      try {
        const endpoints = isDev
          ? [`${apiBase}/api/chatbot-response`]
          : ["/api/chatbot-response"];

        const requestBody = JSON.stringify({
          message: userMessage,
          systemPrompt,
          conversationHistory: conversationHistory || [],
        });

        const attemptErrors: string[] = [];

        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: requestBody,
            });

            const contentType = response.headers.get("content-type") || "";
            const data = contentType.includes("application/json")
              ? await response.json()
              : null;

            if (!response.ok) {
              const detail =
                data?.error || response.statusText || `HTTP ${response.status}`;
              throw new Error(`status ${response.status}: ${detail}`);
            }

            if (data?.success && typeof data.response === "string") {
              return postProcessResponse(userMessage, data.response);
            }

            throw new Error("Invalid API response payload");
          } catch (endpointError) {
            const message =
              endpointError instanceof Error
                ? endpointError.message
                : "Unknown error";
            attemptErrors.push(`${endpoint} -> ${message}`);
          }
        }

        throw new Error(`AI API request failed. ${attemptErrors.join(" | ")}`);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("AI chatbot error:", errorMessage);

        if (fallbackToRules) {
          return null;
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiBase, fallbackToRules, isDev, systemPrompt, useOpenAI],
  );

  return {
    getAIResponse,
    isLoading,
    error,
  };
};

export default useAIChatbot;
