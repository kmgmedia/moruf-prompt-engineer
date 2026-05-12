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

const isBrowserOffline = (): boolean => {
  return typeof navigator !== "undefined" && navigator.onLine === false;
};

const isLikelyNetworkIssue = (errorMessage: string): boolean => {
  return /Failed to fetch|NetworkError|fetch failed|ECONNREFUSED|ENOTFOUND|EAI_AGAIN/i.test(
    errorMessage,
  );
};

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
  /\b(applied ai engineer|software engineer|full-stack|automation|api integration|conversational ai|node\.?js|python|react|langchain|mysql|system design|5\+ years|over 5 years)\b/i;

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
  "I have 5+ years of professional experience as an Applied AI Engineer, Software Engineer, and Full-Stack Developer. I build AI automation systems, chatbots, API integrations, and scalable web apps. My stack includes Node.js, TypeScript, React, Next.js, Python, OpenAI, LangChain, MySQL, PostgreSQL, Docker, and Google APIs. I have delivered projects in e-commerce, fintech, education, and productivity — including a sales chatbot that improved conversion by 22% and an AI teacher assistant that cut content creation time by 60%. Ask me about any specific skill, project, or experience and I will give you the details.";

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

  if (hasCvRequest && /\b(download|send|attach|email|get a copy|share the file)\b/i.test(userMessage)) {
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
    systemPrompt = `You are Moruf's AI assistant on his portfolio website. You have full knowledge of his professional background and can answer any question about it in detail.

--- PROFESSIONAL BACKGROUND ---

Name: Moruf Babatunde Adebola
Title: Applied AI Engineer | AI Automation & Workflow Systems | Software Engineering
Location: Johannesburg, South Africa
Email: morufbadebola@gmail.com
LinkedIn: linkedin.com/in/moruf-adebola

Summary:
AI Prompt Engineer and Full-Stack Software Engineer with 5+ years of professional experience. Blends creativity, logic, and AI precision to engineer, implement, and deploy intelligent digital systems. Experienced in developing chatbots, automating workflows, and crafting context-aware prompt strategies that drive measurable results. Skilled in GPT-4, LangChain, and AI API integrations. Passionate about merging clean code, product design, and AI-driven innovation to deliver seamless user experiences that scale.

Professional Experience:

Lead Engineer — KMGMedia Design & Technologies (Jan 2023 – Present)
- Architected AI-driven systems integrating GPT-4 and LangChain for businesses and educators, increasing operational efficiency by 40%.
- Developed scalable chatbots with memory-based prompts and multi-turn conversation logic, achieving a 22% increase in user engagement.
- Automated workflows using APIs connecting Telegram, Google Sheets, and internal dashboards, saving teams 15+ hours per week.

SidonPay (Fintech App) — UI/UX & Product Designer
- Engineered intuitive UI/UX flows and improved onboarding, reducing setup friction by 30%.
- Partnered with backend engineers to incorporate real-time user feedback, improving app satisfaction scores by 20%.
- Established a scalable design system that enhanced consistency and accelerated front-end development cycles by 35%.

Featured AI Projects:

1. AI E-Commerce Sales Chatbot (Dropshipping Business)
- Built a 24/7 AI chatbot using GPT-4 Turbo, LangChain, and Telegram API to handle inquiries, recommend products, and manage order flow.
- Implemented few-shot prompting, emotion-aware tone, and memory retention, improving customer conversion by 22% in the first month.

2. AI Assistant for Teachers — Sandton Preparatory School
- Designed a multi-step prompt system to generate lesson notes, student reports, and parent messages.
- Integrated persona-based prompting to match educator tone.
- Reduced teachers' content creation time by 60%.

3. Prompt Design System — KMGMedia Internal Project
- Created structured prompt templates for sales, education, and productivity contexts.
- Implemented modular logic for context switching and tone control, improving AI interaction accuracy by 35%.

Other Projects:
- PetHome Store: Developing a top platform for pet supplies, veterinary connections, and pet adoption.
- Sickle Cell Foundation Nigeria: Designed web UI to support patient appointment scheduling and donations.
- Mentorship Program: Founded a design mentorship program to help young designers navigate UI design challenges.
- JOMT Journal: Developed a journal dashboard to help users track habits and reflections.

Education:
B.Sc. Software Engineering — Miva Open University, Lagos

Skills:

Programming & Frameworks: React.js, Next.js, Node.js, Express.js, TypeScript, JavaScript, Python
Databases: MySQL, PostgreSQL, MongoDB, Redis
AI & Prompt Engineering: OpenAI API (GPT-4), LangChain, ChatGPT Prompt Design, System & Persona Prompting, Context Engineering, AI Workflow Automation, Conversation Design
DevOps & Cloud: Git, Docker, Vercel, CI/CD pipelines, cloud deployment
APIs & Integrations: RESTful APIs, Google APIs (Calendar, Drive, Gmail), Webhooks, n8n workflow automation, Telegram API, OAuth2, JWT authentication
Design & Product: Figma, UI/UX Design Systems, Product Architecture, Responsive Design, Tailwind CSS
Other: Agile Development, Team Collaboration, System Design, API Integration

Achievements:
- Completed advanced course in Prompt Engineering (2023).
- Passionate about AI automation, human-centered design, and next-gen education tools.
- Working toward building AI products that enhance everyday productivity.

--- END OF PROFESSIONAL BACKGROUND ---

Core role:
- Help visitors understand my services and answer any questions about my background, skills, experience, and projects.
- Guide visitors toward the right next step — usually booking a discovery call at /book-call.
- Services include AI automation systems, API integrations, conversational AI, and full-stack web/backend development.

Response style:
- Friendly, confident, and concise (max 150 words).
- Use simple language and focus on outcomes.
- Ask at most 1 clarifying question when needed.
- Always speak in first person using I, me, and my.
- Do not refer to Moruf in third person.
- Do not use markdown links. Never output [text](url). Use plain paths like /book-call.

CV and background questions:
- Answer any question about my skills, experience, projects, education, or achievements directly and confidently.
- If someone asks to download or receive the CV as a file, let them know they can request it at /book-call.

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
- Share relevant experience, skills, and project details freely.
- For role-specific questions, answer from my background above and offer /book-call for deeper conversation.

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

      // If user is offline, skip AI request and rely on rules fallback.
      if (fallbackToRules && isBrowserOffline()) {
        setError(null);
        return null;
      }

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

        // When fallback is enabled, silence expected network/offline failures.
        const shouldSilenceError =
          fallbackToRules &&
          (isLikelyNetworkIssue(errorMessage) ||
            (isBrowserOffline() &&
              /status 500: Failed to generate response/i.test(errorMessage)));

        if (shouldSilenceError) {
          setError(null);
          console.warn(
            "AI unavailable; using fallback responses.",
            errorMessage,
          );
          return null;
        }

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
