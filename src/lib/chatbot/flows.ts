/**
 * Conversation Flows and Response Generation
 * Handles all conversation flows and generates contextual bot responses
 */

import { ConversationFlow, UserType, Intent, CapturedData } from "./types.js";

export const CONVERSATION_FLOWS: Record<string, ConversationFlow> = {
  ENTRY: {
    greeting:
      "Hey! 👋 I'm Moruf.\n\nI build AI systems, automation workflows, and full-stack solutions that help businesses run more efficiently.\n\nWhat are you looking to do right now?",
    options: [
      "Build or automate something",
      "Learn more about my work",
      "Hiring / job opportunity",
      "Just exploring",
    ],
  },

  CLIENT_FUNNEL: {
    step1_qualify:
      "Nice — tell me a bit about what you're trying to build or improve.\n\nIs it:\n• Automating a workflow\n• Building a system/app\n• Connecting tools/APIs\n• Something else?",
    step2_understand:
      "Got it. What's the biggest challenge with this right now?\n\nIs it:\n• Taking too much time manually\n• Tools not working together\n• Scaling issues\n• Unclear how to build it?",
    step3_position:
      "Yeah, that makes sense.\n\nFrom what you described, this sounds like something I can solve with a structured system — automation, integration, or full-stack depending on your setup.\n\nThe best next step is a quick call so I can understand your workflow and map out the right solution.\n\nWant me to guide you to book a call?",
  },

  RECRUITER_FLOW: {
    step1_role:
      "Great — thanks for reaching out.\n\nAre you hiring for:\n• Software Engineering (Full-Stack / Backend)\n• AI / Automation roles\n• Contract / freelance work?",
    step2_background:
      "Here's a quick overview of my background:\n\nI'm an AI Automation Engineer and Full-Stack Developer focused on:\n• AI automation systems\n• API integrations\n• Workflow design\n• Scalable backend + frontend applications\n\nTech stack:\nNode.js, Python, React, OpenAI, LangChain, MySQL, system design\n\nWhat type of role or project are you looking to fill?",
    step3_cta:
      "Happy to walk through my work and role fit.\n\nFor CV/resume requests, the next step is booking a quick call so I can share the most relevant version.\n\nWould you like me to:\n1) Book a quick call\n2) Walk through projects\n3) Discuss role requirements first?",
  },

  PORTFOLIO_FLOW: {
    intro:
      "Sure — here's what I mainly focus on:\n\n1️⃣ AI Workflow Automation\n2️⃣ System Integration & APIs\n3️⃣ Conversational AI Systems\n4️⃣ Full-Stack Applications\n\nWhich one interests you?",
  },

  VAGUE_FLOW: {
    clarify:
      "Got you — can you tell me a bit more about what you're trying to achieve?\n\nEven roughly is fine — I'll help you figure out the best direction.",
  },

  TECHNICAL_FLOW: {
    followup: "Are you working on something similar right now?",
  },
};

export interface BotResponseResult {
  text: string;
  quickReplies?: string[];
  shouldCaptureLead?: boolean;
}

/**
 * Generate bot response based on user message and current state
 */
export const generateBotResponse = (
  userMessage: string,
  userType: UserType,
  messageCount: number,
  capturedData: CapturedData,
): BotResponseResult => {
  const lower = userMessage.toLowerCase();

  // Entry flow responses
  if (messageCount === 0) {
    if (
      lower.includes("build") ||
      lower.includes("automate") ||
      lower.includes("something")
    ) {
      return {
        text: CONVERSATION_FLOWS.CLIENT_FUNNEL.step1_qualify || "",
        quickReplies: [
          "Automating a workflow",
          "Building an app/system",
          "Connecting tools/APIs",
          "Something else",
        ],
      };
    }
    if (lower.includes("work") || lower.includes("portfolio")) {
      return {
        text: CONVERSATION_FLOWS.PORTFOLIO_FLOW.intro || "",
        quickReplies: [
          "AI Workflow Automation",
          "System Integration & APIs",
          "Conversational AI Systems",
          "Full-Stack Applications",
        ],
      };
    }
    if (
      lower.includes("hiring") ||
      lower.includes("job") ||
      lower.includes("recruit")
    ) {
      return {
        text: CONVERSATION_FLOWS.RECRUITER_FLOW.step1_role || "",
        quickReplies: [
          "Full-Stack / Backend",
          "AI / Automation roles",
          "Contract / Freelance",
        ],
      };
    }
    if (lower.includes("just") || lower.includes("exploring")) {
      return {
        text: "Cool, happy to help! Feel free to ask anything about what I build, or tell me what kind of problems you're looking to solve.\n\nWhat catches your interest?",
        quickReplies: [
          "Tell me your tech stack",
          "Show me examples",
          "I have a specific project",
        ],
      };
    }
  }

  // Client funnel progression
  if (userType === "client") {
    if (messageCount <= 2) {
      return {
        text: CONVERSATION_FLOWS.CLIENT_FUNNEL.step2_understand || "",
      };
    }
    if (messageCount <= 4) {
      return {
        text: CONVERSATION_FLOWS.CLIENT_FUNNEL.step3_position || "",
        quickReplies: ["Yes, let's book a call", "Tell me more first"],
      };
    }
    if (messageCount > 4 && !capturedData.name) {
      return {
        text: "Perfect. Before we schedule, let me capture your details so I come prepared.\n\nWhat's your name?",
        shouldCaptureLead: false,
      };
    }
    if (capturedData.name && !capturedData.email) {
      return {
        text: `Nice to meet you, ${capturedData.name}! What's the best email to reach you?`,
        shouldCaptureLead: false,
      };
    }
    if (capturedData.name && capturedData.email) {
      return {
        text: `Thanks! Just to make sure I understand — what best describes what you need?\n\n1. Automation system\n2. API / Integration\n3. Web app / System\n4. Not sure yet`,
        shouldCaptureLead: true,
      };
    }
  }

  // Recruiter responses
  if (userType === "recruiter") {
    if (messageCount <= 2) {
      return {
        text: CONVERSATION_FLOWS.RECRUITER_FLOW.step2_background || "",
      };
    }

    if (messageCount > 2) {
      return {
        text: CONVERSATION_FLOWS.RECRUITER_FLOW.step3_cta || "",
        quickReplies: [
          "Book a quick call",
          "Show projects",
          "Discuss role requirements",
        ],
      };
    }
  }

  // Technical questions
  if (
    lower.includes("how") ||
    lower.includes("what") ||
    lower.includes("why")
  ) {
    return {
      text: "That's a solid question. In practice, I usually approach it by understanding the specific constraints and goals first.\n\nAre you working on something similar right now?",
    };
  }

  // Vague inputs
  return {
    text: CONVERSATION_FLOWS.VAGUE_FLOW.clarify || "",
  };
};

/**
 * Get CTA variations for natural conversation feel
 */
export const getCTAVariation = (index: number): string => {
  const variations = [
    "This sounds like something I can help you build. Want to jump on a quick call?",
    "Best way to move forward is a quick call — I can map this out for you.",
    "Let's break this down together on a call — it'll save you a lot of trial and error.",
    "I think we should discuss this on a call - I'll have a better sense of what's needed.",
    "A quick 20-minute call would help me understand your setup better.",
  ];

  return variations[index % variations.length];
};
