import type { BotResponseResult } from "@/lib/chatbot/flows";

const CALL_INTENT_REGEX =
  /\b(call|phone|talk|speak|meeting|meet|zoom|whatsapp|schedule|book)\b/i;

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

const callBookingFallback: BotResponseResult = {
  text: "Absolutely, yes — we can talk by phone. The fastest next step is to book a 20-30 minute discovery call here: /book-call. Once you submit, I will send a calendar link by email.",
};

const recruiterFallback: BotResponseResult = {
  text: "Great to connect. For hiring or contract conversations, please book a quick call at /book-call or share the role title, level, and key requirements here so I can guide you better.",
};

const caseStudyFallback: BotResponseResult = {
  text: "Sure — here are strong examples you can review now: /case-study/teacher-ai, /case-study/ecommerce-sales-automation, and /case-study/byway-backend-api. Share your use case and I will point you to the closest match.",
};

const pricingTimelineFallback: BotResponseResult = {
  text: "Great question. Pricing and timeline depend on scope, integrations, and delivery speed. For a realistic estimate, book a 20-30 minute discovery call at /book-call. You can also share your goal, budget range, and deadline here first.",
};

const readyToStartFallback: BotResponseResult = {
  text: "Perfect — let's move forward. Please book your 20-30 minute discovery call at /book-call so I can review scope and send next steps.",
};

const resumeByCallFallback: BotResponseResult = {
  text: "Absolutely. For CV/resume requests, please book a quick discovery call at /book-call so I can share the most relevant version for your role or project context.",
};

const experienceFallback: BotResponseResult = {
  text: "I have over 5 years of professional experience as an Applied AI Engineer and Full-Stack Developer. I build production-ready automation systems, API integrations, conversational AI, and scalable web apps. I work across Node.js, Python, React, OpenAI, LangChain, MySQL, and system design, with a strong focus on business outcomes. If you want, I can guide you to relevant case studies or you can book a call at /book-call.",
};

export const getIntentFallback = (
  text: string,
  defaultFallback: BotResponseResult,
): BotResponseResult => {
  if (CALL_INTENT_REGEX.test(text)) return callBookingFallback;
  if (CV_REQUEST_REGEX.test(text)) return resumeByCallFallback;
  if (EXPERIENCE_INTENT_REGEX.test(text)) return experienceFallback;
  if (RECRUITER_INTENT_REGEX.test(text)) return recruiterFallback;
  if (CASE_STUDY_INTENT_REGEX.test(text)) return caseStudyFallback;
  if (PRICING_OR_TIMELINE_REGEX.test(text)) return pricingTimelineFallback;
  if (READY_TO_START_REGEX.test(text)) return readyToStartFallback;
  return defaultFallback;
};
