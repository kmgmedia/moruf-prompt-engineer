/**
 * Hook for using OpenAI in the chatbot
 * Can be used alongside or instead of the rule-based flows
 */

import { useState, useCallback } from "react";
import {
  CHATBOT_ALLOWED_PATHS,
  getUnknownChatbotPaths,
} from "@/lib/chatbot/routes";
import { normalizeMessageForMatching } from "@/lib/chatbot/intents";

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
  /\b(case study|case studies|examples?|portfolio|past work|similar work|show me your work|see your work|your projects|previous projects|previous work)\b/i;

const PRICING_OR_TIMELINE_REGEX =
  /\b(price|pricing|cost|budget|expensive|cheap|timeline|deadline|how long|delivery|deliver)\b/i;

const READY_TO_START_REGEX =
  /\b(ready|proceed|move forward|get started|start now|next step|hire|available to start|start working|work with me|work together|work on a project)\b/i;

const CASE_STUDY_ROUTE_REGEX = /\/case-study\//i;

const RECRUITER_RESPONSE_HINT_REGEX =
  /\b(role|hiring|resume|cv|contract|availability|interview)\b|\/book-call/i;

const PRICE_TIMELINE_HINT_REGEX =
  /\b(scope|budget|timeline|estimate|discovery call)\b|\/book-call/i;

const EXPERIENCE_HINT_REGEX =
  /\b(applied ai engineer|software engineer|full-stack|automation|api integration|conversational ai|node\.?js|python|react|langchain|mysql|system design|5\+ years|over 5 years)\b/i;

const callBookingReply =
  "Absolutely — I can take your details right here in chat, or you can visit /book-call to book directly. Either way you will receive a Google Meet link and confirmation email. Ready to start? Just say 'book a call' and I will guide you step by step.";

const recruiterReply =
  "Great to connect. If this is for a role or contract, I can share relevant experience, projects, and availability. Best next step: book a short discovery call at /book-call, or share the role title, level, and key requirements here.";

const pricingTimelineReply =
  "Great question. Pricing and timeline depend on scope, integrations, and delivery speed. The fastest way to get a realistic estimate is a 20-30 minute discovery call at /book-call. If you want, share your goal, budget range, and deadline and I will help you frame it first.";

const caseStudyReply =
  "Sure! Here are a few strong examples: /case-study/teacher-ai, /case-study/ecommerce-sales-automation, /case-study/property-intelligence-assistant, and /case-study/gatepass-system. What industry or problem are you working on? I can point you to the most relevant one.";

const readyToStartReply =
  "Yes, I’m available! Tell me a bit about your project — what are you looking to build or automate? Once I understand the scope, I can suggest next steps or you can book a quick call at /book-call.";

const resumeByCallReply =
  "Absolutely. For CV/resume requests, the process is to book a quick discovery call first at /book-call so I can share the most relevant version based on your role or project context. If helpful, share the role title and key requirements now.";

const experienceReply =
  "I have 5+ years of experience as an Applied AI Engineer and Full-Stack Developer. I build AI automation systems, chatbots, APIs, and web apps across e-commerce, real estate, education, and event tech. Stack: Node.js, React, Python, OpenAI, LangChain, n8n, MongoDB, and more. What would you like to know more about?";

const unavailableCaseStudyReply = (_unknownPaths: string[]): string => {
  return "That case study isn't published yet. You can browse what's available in the Projects section, or tell me your use case and I'll point you to the closest match. You can also book a call at /book-call for a deeper look.";
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
  const matchingMessage = normalizeMessageForMatching(userMessage);

  const hasCallIntent = CALL_INTENT_REGEX.test(matchingMessage);
  const hasCvRequest = CV_REQUEST_REGEX.test(matchingMessage);
  const hasExperienceIntent = EXPERIENCE_INTENT_REGEX.test(matchingMessage);
  const hasRecruiterIntent = RECRUITER_INTENT_REGEX.test(matchingMessage);
  const hasCaseStudyIntent = CASE_STUDY_INTENT_REGEX.test(matchingMessage);
  const hasPricingOrTimelineIntent =
    PRICING_OR_TIMELINE_REGEX.test(matchingMessage);
  const hasReadyIntent = READY_TO_START_REGEX.test(matchingMessage);

  if (unknownPaths.length > 0) {
    return unavailableCaseStudyReply(unknownPaths);
  }

  if (
    hasCvRequest &&
    /\b(download|send|attach|email|get a copy|share the file)\b/i.test(
      matchingMessage,
    )
  ) {
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

  if (hasReadyIntent && !BOOKING_HINT_REGEX.test(cleaned)) {
    return readyToStartReply;
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

Portfolio Projects (11 Total):

1. AI Teaching Assistant System — Sandton Preparatory School
   Goal: Help teachers generate lesson notes, student reports, and parent communication efficiently.
   Strategy: Automated lesson notes and teaching materials, structured student report creation, tone-controlled parent messaging.
   Outcome: Reduced teachers' content creation time by 60% and improved consistency across classes.
   Tools: Python, Gemini API, Google Sheets Integration, Streamlit
   Case Study: /case-study/teacher-ai

2. E-Commerce Sales Automation System — Dropshipping Business
   Goal: Build a 24/7 system handling customer inquiries, product recommendations, and order processing.
   Strategy: Intent-based product recommendations, context-aware conversations, automated response handling.
   Outcome: Increased conversion rate by 22% within the first month of pilot testing.
   Tools: Gemini API, Python, LangChain, Telegram API
   Case Study: /case-study/ecommerce-sales-automation

3. AI Property Intelligence Assistant — NaijaRealty AI System
   Goal: AI-powered property assistant for real estate teams — instant listing search, property Q&A, and automated lead engagement.
   Strategy: AI property search and recommendations with memory, automated lead capture and inquiry handling, daily analytics and interaction reporting.
   Outcome: Reduced response delays, improved property discovery speed, and enabled 24/7 automated client engagement.
   Tools: n8n, OpenAI, Pinecone, React, Gmail API, Webhooks & APIs, Vector Search
   Case Study: /case-study/property-intelligence-assistant

4. AI Job Intelligence & Resume Automation System — Personal Productivity & Job Ops
   Goal: Reduce manual effort in job searching and resume tailoring while improving role alignment and application throughput.
   Strategy: Automated LinkedIn scraping via Apify, GPT-4 relevance scoring with structured JSON output, programmatic resume rewriting, Google Docs generation, and Sheets audit logging — all orchestrated in n8n with a React frontend dashboard for triggering runs.
   Frontend: A React + TypeScript dashboard (AI Job Dashboard) lets users paste a LinkedIn search URL, choose how many jobs to scrape (10–100), and start the pipeline. It shows a live progress screen with elapsed timer while n8n processes in the background.
   Real engineering challenges solved: fixed invalid JSON body in Apify node, corrected field type mismatch (String vs Number) causing only 6 jobs to scrape instead of 50, added Respond to Webhook node so the frontend gets an instant response while the workflow runs in the background, disabled n8n's 5-minute execution timeout that was killing mid-run AI processing, and fixed production webhook activation so the workflow accepts requests without manual intervention.
   Outcome: End-to-end pipeline running reliably — 50 jobs scraped per run, AI-filtered to top matches, tailored resumes generated as Google Docs, everything logged to Sheets.
   Tools: n8n, OpenAI API, Apify, Google Docs API, Google Sheets API, React, TypeScript, JavaScript
   Case Study: /case-study/ai-job-intelligence

5. GatePass System — Smart Event Access & Guest Verification System
   Goal: Operational event access platform streamlining guest check-in, entry coordination, and reducing gate management chaos during live events.
   How It Works (6 steps): Guest Registration → QR Code Generation → Gate Scanning → Real-Time Verification → Live Attendance Tracking → Post-Event Reporting.
   Event Operations Flow: Pre-Event (guest list upload, QR generation, staff briefing) → Event Day (gate scanning, real-time QR validation, unauthorized access flagging) → Post-Event (attendance report, data export, archiving).
   Architecture: Client Layer (React.js Dashboard, Mobile QR Scanner) → API Layer (Node.js REST API, QR Validation Engine, Auth Middleware) → Data Layer (Guest Database, Event Config, Attendance Logs).
   API Endpoints: POST /api/events, POST /api/guests, GET /api/guests, POST /api/checkin, GET /api/attendance, GET /api/events.
   Scalability: Stateless Node.js backend for parallel scaling, indexed QR lookups for sub-millisecond verification, multi-gate support, handles 50 to 50,000+ guests.
   Outcome: Improved event entry flow, reduced unauthorized access, digitized guest verification, and full post-event attendance reporting.
   Tools: Node.js, React.js, QR Verification, REST APIs, Database Systems, Real-Time Check-In
   Case Study: /case-study/gatepass-system

6. GatePass Website — Product Marketing & Event Operations Showcase Platform
   Goal: Public-facing product website explaining the GatePass ecosystem, communicating its operational value, and driving event service inquiries.
   Strategy: Product-centered landing experience for event planners, clear service, pricing, and workflow presentation, mobile-responsive product storytelling and inquiry flow, brand positioning for digital event access services.
   Outcome: Improved product clarity, strengthened digital brand positioning, and created a centralized inquiry channel for prospective event clients.
   Tools: React.js, Frontend UI, Responsive Design, Landing Page, Product Architecture, Web Interaction Design
   Case Study: /case-study/gatepass-website

7. Byway Backend API System — End-to-End REST API Development
   Goal: Build a scalable backend for a product review platform with user management, role-based access control, and secure data handling.
   Strategy: Full CRUD operations for product reviews and user data, role-based access control and authentication middleware, structured API architecture, MongoDB integration for data persistence.
   Outcome: Delivered a production-ready backend with secure authentication, efficient data handling, and deployment-ready infrastructure.
   Tools: Node.js, Express.js, MongoDB, Mongoose, Postman, GitHub Actions, Vercel
   Case Study: /case-study/byway-backend-api

8. BYC eCommerce Platform — Full-Stack eCommerce Application
   Goal: Build a modern eCommerce platform with seamless product discovery, secure checkout, and real-time inventory handling.
   Strategy: Intuitive product browsing and category navigation, shopping cart and secure checkout flow, order tracking and user account management, real-time inventory updates.
   Outcome: Delivered a scalable and user-friendly eCommerce platform that improves shopping experience and supports reliable transaction handling.
   Tools: HTML, CSS/Sass, JavaScript, Node.js, Express.js, MongoDB, Bootstrap
   Case Study: /case-study/byc-ecommerce

9. Sandton Preparatory School Website — Educational Platform & School Management Interface
   Goal: Design and develop a comprehensive website to showcase school programs, enable online bookings, and improve parent engagement.
   Strategy: Program showcase with structured curriculum presentation, online class booking and event scheduling, blog and content management for parent engagement, fully responsive design for all devices.
   Outcome: Complete digital platform supporting 100+ students, improving parent interaction and simplifying school communication and bookings.
   Tools: Next.js, React, TypeScript, Cloudinary, Responsive Design, SEO Optimization
   Case Study: /case-study/sandton-school

10. Project Tracker Dashboard — Real-Time Data & Workflow Management System
    Goal: Build a high-performance dashboard for tracking projects, managing workflows, and visualizing real-time data securely.
    Strategy: Real-time data updates and live project tracking, secure authentication using Supabase, clean and responsive UI optimized for usability, scalable component structure for maintainability.
    Outcome: Production-ready dashboard providing live insights, improving workflow visibility, and ensuring reliable performance across devices.
    Tools: React.js, TypeScript, Next.js, Tailwind CSS, Supabase, Vercel, Sonner
    Case Study: /case-study/dashboard

11. Creative Storytelling Prompts — Brand Campaign (Midjourney + GPT)
    Goal: Generate brand stories and visuals capturing a 'vintage luxury' aesthetic for a client campaign.
    Strategy: Layered prompts connecting brand tone with imagery concepts, consistent keyword and aesthetic framing across all outputs.
    Outcome: Created 15+ original story and image pairs used across digital campaigns and social media assets.
    Tools: GPT-4, Midjourney, Notion AI
    Case Study: /case-study/emotional-ai

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
- Friendly, confident, and concise. Hard limit: 80 words max per reply. Never exceed this.
- Use simple language and focus on outcomes — no long explanations.
- Never list all projects at once. Only mention 1-3 most relevant ones based on what the client asked.
- Use the project details above as reference knowledge only — summarize, do not copy them out in full.
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
