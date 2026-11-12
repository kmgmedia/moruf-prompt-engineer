import { useCallback, Dispatch, SetStateAction } from "react";
import type {
  Message,
  ConversationState,
  Intent,
  ConversationStage,
} from "@/lib/chatbot/types";
import {
  analyzeMessage,
  shouldTriggerCTA,
  determineNextStage,
  normalizeMessageForMatching,
} from "@/lib/chatbot/intents";
import { getCTAVariation, type BotResponseResult } from "@/lib/chatbot/flows";
import {
  ALLOWED_PROJECT_QUESTIONS,
  BOOKING_QUICK_REPLIES,
  BOOKING_TOPIC_REGEX,
  BLOCKED_TOPIC_QUICK_REPLIES,
  BLOCKED_NON_PROJECT_QUESTIONS,
  GENERAL_LEARNING_REQUEST_REGEX,
  GENERAL_TECH_TOPIC_REGEX,
  LEARNING_SCOPE_FALLBACK,
  LEARNING_TOPIC_QUICK_REPLIES,
  PORTFOLIO_TOPIC_REGEX,
  PRICING_QUICK_REPLIES,
  PRICING_TIMELINE_TOPIC_REGEX,
  PROMPT_INJECTION_FALLBACK,
  PROMPT_INJECTION_QUICK_REPLIES,
  PROMPT_INJECTION_REGEX,
  PROJECT_SCOPE_FALLBACK,
  RECRUITER_QUICK_REPLIES,
  RECRUITER_SCOPE_FALLBACK,
  RECRUITER_TOPIC_REGEX,
  UNRELATED_TOPIC_FALLBACK,
  UNRELATED_TOPIC_QUICK_REPLIES,
  SHORT_EXPLORATION_REGEX,
  SHORT_EXPLORATION_REPLY,
  COMPLIMENT_REGEX,
  COMPLIMENT_QUICK_REPLIES,
  COMPLIMENT_REPLY,
  FRUSTRATION_REGEX,
  FRUSTRATION_FALLBACK,
  FRUSTRATION_QUICK_REPLIES,
  VAGUE_INPUT_REGEX,
  VAGUE_INPUT_FALLBACK,
  VAGUE_INPUT_QUICK_REPLIES,
} from "@/features/chatbot/guardrails";
import {
  BOOKING_TIME_SLOTS,
  CHAT_BOOK_INTENT_REGEX,
  BOOKING_FIELD_TO_DATA_KEY,
  type BookingField,
  getNextBookingField,
  getBookingStepPrompt,
  getBookingStepQuickReplies,
  validateBookingInput,
  buildBookingSummary,
  submitChatBooking,
} from "@/features/chatbot/utils/chatBookingFlow";

const GREETING_RESPONSES = [
  "Hey there! I can help with questions about my projects, services, or portfolio. What would you like to know about my work?",
  "Hi! I can help with questions about my projects, services, and portfolio work. What would you like to know?",
  "Hello! I can help with my projects, services, and experience. What would you like to explore?",
  "Hey! I help businesses with AI, automation, and custom digital solutions. What would you like to know about my work?",
  "Hi there! I work with founders and teams on AI systems, automation, and custom digital products. What are you curious about?",
  "Nice to meet you! I can help with questions about my work, services, and the kind of projects I build. What would you like to explore?",
  "Hey! I build AI systems, process automation, and full-stack solutions for businesses. What would you like to know about my work?",
] as const;

const NETWORKING_GREETING_RESPONSES = [
  "Great to connect! I appreciate you checking out my work. What part of my portfolio or projects are you curious about?",
  "Nice to connect! I’d be happy to share more about my projects, experience, or the kind of work I do. What would you like to know?",
  "Thanks for reaching out — I’m glad you found my work. What would you like to explore in my portfolio or services?",
] as const;

const RECRUITER_GREETING_RESPONSES = [
  "Nice to connect! I’m happy to share my experience, background, and the kind of work I do. What would you like to know?",
  "Glad you found my profile. I can share more about my experience, skills, and availability — what would you like to know?",
  "Thanks for reaching out. I’m open to discussing my background, projects, and how I can contribute. What would you like to know?",
] as const;

const BUSINESS_OWNER_GREETING_RESPONSES = [
  "Thanks for reaching out — I’d be happy to talk through your goals and the kind of solution that fits. What are you looking to build or improve?",
  "Good to connect! I help businesses with AI automation, workflow improvements, and custom digital solutions. What are you trying to solve?",
  "Happy to chat. I work with founders and teams to streamline operations, automate work, and build practical tools. What are you looking to do?",
] as const;

const TECHNICAL_GREETING_RESPONSES = [
  "Nice to meet you. I work across product, backend, automation, and AI systems, so I can help with both technical and business-side problems. What are you exploring?",
  "Glad to connect. I enjoy building practical systems that combine software engineering, automation, and AI. What are you working on?",
  "Great to connect. I can help with technical architecture, automation workflows, integrations, and product-focused builds. What are you trying to solve?",
] as const;

const pickRandom = <T,>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

const SERVICES_RESPONSES = [
  "I help businesses with AI automation, workflow systems, API integrations, and custom web products. The goal is simple: turn manual work into reliable systems that save time and improve decisions.",
  "My work focuses on AI-powered automations, internal tools, backend systems, and full-stack products that help teams move faster and work more efficiently.",
  "I build practical digital systems: AI assistants, business automations, API integrations, dashboards, and custom software that fits real operations rather than theory.",
] as const;

const CASE_STUDY_RESPONSES = [
  "A few strong examples are /case-study/ecommerce-sales-automation, /case-study/property-intelligence-assistant, and /case-study/teacher-ai. I can point you to the closest fit for your use case.",
  "I have examples across automation, education, events, and AI operations. The most relevant ones are usually /case-study/ecommerce-sales-automation, /case-study/ai-job-intelligence, and /case-study/gatepass-system.",
  "My portfolio spans AI systems, product dashboards, automation workflows, and business tools. A few examples are /case-study/teacher-ai, /case-study/property-intelligence-assistant, and /case-study/gatepass-system.",
] as const;

const BOOKING_RESPONSES = [
  "Absolutely — the easiest next step is /book-call. It’s a short discovery conversation where I can understand your goals and suggest the right setup or next move.",
  "Yes, I’d be happy to talk. You can book a quick discovery call at /book-call, and I’ll help you map out the best direction for your project.",
  "That’s a great next step. Book a short discovery call at /book-call and we can talk through the problem, the scope, and the best way to move forward.",
] as const;

const IMPACT_RESPONSES = [
  "I help businesses reduce manual work, improve operational speed, and build systems that scale with the team instead of breaking under pressure.",
  "The work is less about flashy tools and more about practical business value: better workflows, cleaner operations, and smarter automation where it actually matters.",
  "I focus on solving the real bottlenecks in a business — repetitive processes, slow systems, disconnected tools, and manual work that costs time and money.",
] as const;

const PROCESS_RESPONSES = [
  "My process usually starts with understanding the problem, mapping the workflow, and identifying where the biggest bottlenecks are. From there, I design the simplest working system and iterate with feedback.",
  "I like to keep it practical: understand the goal, simplify the workflow, test the core system quickly, then improve based on real usage and business needs.",
  "I approach projects by clarifying the outcome, defining the workflow, building the first working version, and refining it around user feedback and operational reality.",
] as const;

export function useAIResponse(
  getAIResponse: (
    input: string,
    history: Array<{ role: "user" | "assistant"; content: string }>,
  ) => Promise<string | undefined>,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  setIsTyping: Dispatch<SetStateAction<boolean>>,
  setQuickReplies: Dispatch<SetStateAction<string[]>>,
  setShowQuickReplies: Dispatch<SetStateAction<boolean>>,
  setState: Dispatch<SetStateAction<ConversationState>>,
  state: ConversationState,
  apiBase: string,
) {
  const getScopedQuickReplies = (text: string): string[] | null => {
    const matchingText = normalizeMessageForMatching(text);

    if (RECRUITER_TOPIC_REGEX.test(matchingText)) {
      return [...RECRUITER_QUICK_REPLIES];
    }

    if (PRICING_TIMELINE_TOPIC_REGEX.test(matchingText)) {
      return [...PRICING_QUICK_REPLIES];
    }

    if (BOOKING_TOPIC_REGEX.test(matchingText)) {
      return [...BOOKING_QUICK_REPLIES];
    }

    return null;
  };

  const getBlockedResponse = (
    text: string,
    normalizedInput: string,
  ): { text: string; quickReplies: string[] } => {
    const matchingText = normalizeMessageForMatching(text);
    const normalize = (value: string) =>
      value.replace(/\s+/g, " ").trim().toLowerCase();
    const isExplicitBlocked = BLOCKED_NON_PROJECT_QUESTIONS.some(
      (question) => normalize(question) === normalizedInput,
    );
    const isPromptInjection = PROMPT_INJECTION_REGEX.test(matchingText);
    const isGeneralLearningRequest =
      GENERAL_LEARNING_REQUEST_REGEX.test(matchingText) &&
      GENERAL_TECH_TOPIC_REGEX.test(matchingText);
    const isRecruiterTopic = RECRUITER_TOPIC_REGEX.test(matchingText);

    if (isPromptInjection) {
      return {
        text: PROMPT_INJECTION_FALLBACK,
        quickReplies: [...PROMPT_INJECTION_QUICK_REPLIES],
      };
    }

    if (isGeneralLearningRequest || isExplicitBlocked) {
      return {
        text: LEARNING_SCOPE_FALLBACK,
        quickReplies: [...LEARNING_TOPIC_QUICK_REPLIES],
      };
    }

    if (isRecruiterTopic) {
      return {
        text: RECRUITER_SCOPE_FALLBACK,
        quickReplies: [...RECRUITER_QUICK_REPLIES],
      };
    }

    if (!PORTFOLIO_TOPIC_REGEX.test(matchingText)) {
      return {
        text: UNRELATED_TOPIC_FALLBACK,
        quickReplies: [...UNRELATED_TOPIC_QUICK_REPLIES],
      };
    }

    return {
      text: PROJECT_SCOPE_FALLBACK,
      quickReplies: [...BLOCKED_TOPIC_QUICK_REPLIES],
    };
  };

  const handleAIResponse = useCallback(
    async (textToSend: string, updatedConversation: Message[]) => {
      const greetingRegex =
        /^(hi|hello|hey|hey there|good morning|good afternoon|good evening|yo|sup|howdy|what(?:'|’)s up|whats up|how(?:'|’)s it going|hows it going|what(?:'|’)s good|whats good|good to see you|nice to meet you|great to meet you|good to meet you|pleased to meet you|greetings|hola)\b[!.?\s]*$/i;
      const greetingTypoRegex = /^(eh|he+y+|h+i+|helo|hllo|yoo+|su+p+)$/i;
      const networkingGreetingRegex =
        /^(nice to connect|good to connect|i came across your work|i saw your profile|i was checking out your portfolio|love your portfolio|interesting work|great work|impressive portfolio|nice portfolio|your work stood out|i liked your work|good to meet you|nice to meet you|good to see you)\b[!.?\s]*$/i;
      const recruiterGreetingRegex =
        /^(hi|hello).*\b(profile|portfolio|experience|resume|cv|linkedin|github|job|role|opportunity|hiring|interview|team)\b.*$/i;
      const businessOwnerGreetingRegex =
        /^(hi|hello|hey).*\b(business|startup|company|founder|owner|team|ops|operations|automation|workflow|process|tool|system|website|app|website|platform|dashboard)\b.*$/i;
      const technicalGreetingRegex =
        /^(hi|hello|hey).*\b(technical|architecture|api|integration|backend|frontend|full stack|system design|ai|automation|developer|engineer|code|build)\b.*$/i;
      const smallTalkRegex =
        /^(how are you|how are you doing|how(?:'|’)s it going|hows it going|what(?:'|’)s good|whats good|nice to meet you|good to meet you|great to meet you|pleased to meet you)\b[!.?\s]*$/i;
      const farewellRegex =
        /^(bye|goodbye|see ya|see you later|catch you later|talk later|ttyl|good night|have a nice day|take care|until next time)\b[!.?\s]*$/i;
      const introRegex =
        /^(who are you|what can you do|what do you do|what are you|tell me about yourself|who is moruf|what is your background|what do you specialize in)\b.*$/i;
      const thanksRegex = /^(thanks|thank you|thx|ty)\b[!.]?$/i;
      const shortExplorationRegex = SHORT_EXPLORATION_REGEX;
      const normalize = (value: string) =>
        value.replace(/\s+/g, " ").trim().toLowerCase();
      const normalizedSimple = textToSend
        .replace(/[^a-zA-Z\s]/g, "")
        .trim()
        .toLowerCase();
      const normalizedForMatching = normalizeMessageForMatching(textToSend);

      // Shows typing dots for a short delay, then fires fn() to reveal the bot message.
      const showAfterTyping = (fn: () => void, delay = 750) => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          fn();
        }, delay);
      };

      if (
        greetingRegex.test(textToSend) ||
        greetingRegex.test(normalizedSimple) ||
        greetingTypoRegex.test(normalizedSimple)
      ) {
        const greetingText = pickRandom(GREETING_RESPONSES);

        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: greetingText,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_greeting`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What services do you offer?",
            "How can I book a call?",
            "Show me your case studies",
          ]);
        });
        return;
      }

      if (
        recruiterGreetingRegex.test(textToSend) ||
        recruiterGreetingRegex.test(normalizedSimple)
      ) {
        const recruiterGreetingText = pickRandom(RECRUITER_GREETING_RESPONSES);

        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: recruiterGreetingText,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_recruiter_greeting`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What is your experience?",
            "What is your availability?",
            "How can I book a call?",
          ]);
        });
        return;
      }

      if (
        networkingGreetingRegex.test(textToSend) ||
        networkingGreetingRegex.test(normalizedSimple)
      ) {
        const networkingGreetingText = pickRandom(NETWORKING_GREETING_RESPONSES);

        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: networkingGreetingText,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_networking_greeting`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What services do you offer?",
            "Show me your case studies",
            "How can I book a call?",
          ]);
        });
        return;
      }

      if (
        businessOwnerGreetingRegex.test(textToSend) ||
        businessOwnerGreetingRegex.test(normalizedSimple)
      ) {
        const businessOwnerGreetingText = pickRandom(
          BUSINESS_OWNER_GREETING_RESPONSES,
        );

        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: businessOwnerGreetingText,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_business_owner_greeting`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "Can you help automate my business?",
            "What services do you offer?",
            "How can I book a call?",
          ]);
        });
        return;
      }

      if (
        technicalGreetingRegex.test(textToSend) ||
        technicalGreetingRegex.test(normalizedSimple)
      ) {
        const technicalGreetingText = pickRandom(TECHNICAL_GREETING_RESPONSES);

        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: technicalGreetingText,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_technical_greeting`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What services do you offer?",
            "How do you build AI systems?",
            "Can you help automate my business?",
          ]);
        });
        return;
      }

      if (
        smallTalkRegex.test(textToSend) ||
        smallTalkRegex.test(normalizedSimple)
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: "I'm doing great, thanks for asking. I help businesses with AI, automation, and custom digital solutions. What would you like to know about my work?",
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_smalltalk`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What services do you offer?",
            "Show me your case studies",
            "How can I book a call?",
          ]);
        });
        return;
      }

      if (
        /\b(what services do you offer|what do you do|what can you help me with|what are your services)\b/i.test(
          textToSend,
        ) ||
        /\b(what services do you offer|what do you do|what can you help me with|what are your services)\b/i.test(
          normalizedSimple,
        )
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: pickRandom(SERVICES_RESPONSES),
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_services`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "Show me your case studies",
            "How can I book a call?",
            "Can you help automate my business?",
          ]);
        });
        return;
      }

      if (
        /\b(show me your case studies|show me your projects|what are your examples|can you show examples|show examples)\b/i.test(
          textToSend,
        ) ||
        /\b(show me your case studies|show me your projects|what are your examples|can you show examples|show examples)\b/i.test(
          normalizedSimple,
        )
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: pickRandom(CASE_STUDY_RESPONSES),
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_case_studies`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What services do you offer?",
            "How can I book a call?",
            "Can you help automate my business?",
          ]);
        });
        return;
      }

      if (
        /\b(how can i book a call|book a call|how do i book|book me a call|how can i schedule|schedule a call)\b/i.test(
          textToSend,
        ) ||
        /\b(how can i book a call|book a call|how do i book|book me a call|how can i schedule|schedule a call)\b/i.test(
          normalizedSimple,
        )
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: pickRandom(BOOKING_RESPONSES),
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_booking_prompt`,
            },
          ]);
          setShowQuickReplies(false);
        });
        return;
      }

      if (
        /\b(can you help automate my business|can you help with my project|can you work on my project|can you build my website|can you build for me|can you help me build)\b/i.test(
          textToSend,
        ) ||
        /\b(can you help automate my business|can you help with my project|can you work on my project|can you build my website|can you build for me|can you help me build)\b/i.test(
          normalizedSimple,
        )
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: pickRandom(IMPACT_RESPONSES),
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_project_help`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What services do you offer?",
            "How can I book a call?",
            "Show me your case studies",
          ]);
        });
        return;
      }

      if (
        /\b(what is your process|how do you work|how do you build ai systems|how do you build systems|how do you approach projects)\b/i.test(
          textToSend,
        ) ||
        /\b(what is your process|how do you work|how do you build ai systems|how do you build systems|how do you approach projects)\b/i.test(
          normalizedSimple,
        )
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: pickRandom(PROCESS_RESPONSES),
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_process`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What services do you offer?",
            "Show me your case studies",
            "How can I book a call?",
          ]);
        });
        return;
      }

      // Friendly reply for short, neutral exploratory messages like "just exploring".
      if (
        shortExplorationRegex.test(textToSend) ||
        shortExplorationRegex.test(normalizedSimple)
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: SHORT_EXPLORATION_REPLY,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_explore`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "Show me your projects",
            "What services do you offer?",
            "How can I book a call?",
          ]);
        });
        return;
      }

      if (thanksRegex.test(textToSend) || thanksRegex.test(normalizedSimple)) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: "You're welcome - happy to help! If you have questions about my projects or services, ask away.",
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_thanks`,
            },
          ]);
          setShowQuickReplies(false);
        });
        return;
      }

      if (
        farewellRegex.test(textToSend) ||
        farewellRegex.test(normalizedSimple) ||
        /^(bye|goodbye|see ya|talk soon|catch up soon)$/i.test(textToSend)
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: "Take care! Feel free to reach out anytime if you want to talk about services, projects, or a potential collaboration.",
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_farewell`,
            },
          ]);
          setShowQuickReplies(false);
        });
        return;
      }

      if (
        introRegex.test(textToSend) ||
        introRegex.test(normalizedSimple) ||
        /^(who are you|what can you do|what do you do|tell me about yourself)\b.*$/i.test(
          textToSend,
        )
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: "I'm Moruf, a software engineer and AI automation specialist helping businesses simplify operations, automate workflows, and build practical digital products. I work on web apps, APIs, AI systems, and process automation for growing teams.",
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_introduction`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What services do you offer?",
            "Show me your case studies",
            "How can I book a call?",
          ]);
        });
        return;
      }

      // Handle compliments and praise
      const normalizedCompliment = normalize(textToSend);
      if (
        COMPLIMENT_REGEX.test(textToSend) ||
        COMPLIMENT_REGEX.test(normalizedSimple) ||
        COMPLIMENT_REGEX.test(normalizedCompliment) ||
        /\b(you are|you're|youre)\b.*\b(great|awesome|amazing|excellent|good|nice|doing well|doing great|doing a great job|doing a good job|well done|good job|nice work|keep it up)\b/i.test(
          textToSend,
        )
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: COMPLIMENT_REPLY,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_compliment`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([...COMPLIMENT_QUICK_REPLIES]);
        });
        return;
      }

      // Handle frustrated or dissatisfied messages
      if (FRUSTRATION_REGEX.test(textToSend)) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: FRUSTRATION_FALLBACK,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_frustration`,
            },
          ]);
          setQuickReplies([...FRUSTRATION_QUICK_REPLIES]);
          setShowQuickReplies(true);
        });
        return;
      }

      // Handle vague or single-word inputs
      if (
        VAGUE_INPUT_REGEX.test(textToSend.trim()) ||
        VAGUE_INPUT_REGEX.test(normalizedSimple)
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: VAGUE_INPUT_FALLBACK,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_vague`,
            },
          ]);
          setQuickReplies([...VAGUE_INPUT_QUICK_REPLIES]);
          setShowQuickReplies(true);
        });
        return;
      }

      // --- CHAT BOOKING FLOW ---
      const fetchAvailableSlots = async (date: string, timezone: string): Promise<string[]> => {
        try {
          const params = new URLSearchParams({ date, timezone });
          const url = apiBase
            ? `${apiBase}/api/availability?${params}`
            : `/api/availability?${params}`;
          const response = await fetch(url);
          if (!response.ok) return [...BOOKING_TIME_SLOTS];
          const data = (await response.json()) as { bookedSlots?: string[] };
          const booked = data.bookedSlots ?? [];
          return BOOKING_TIME_SLOTS.filter((slot) => !booked.includes(slot));
        } catch {
          return [...BOOKING_TIME_SLOTS];
        }
      };

      // Handle ongoing booking step (bypass guardrails entirely)
      if (state.chatBookingStep && state.chatBookingStep !== "done") {
        const step = state.chatBookingStep as BookingField | "confirm";

        if (step === "confirm") {
          const confirmsYes =
            /\b(yes|yeah|yep|yup|confirm|go ahead|ok|sure|book it|looks good|correct|do it|proceed)\b/i.test(
              textToSend,
            );
          const confirmsNo =
            /\b(no|nope|nah|cancel|change|wrong|incorrect|edit|modify|start over)\b/i.test(
              textToSend,
            );

          if (confirmsYes) {
            setIsTyping(true);
            try {
              const result = await submitChatBooking(
                {
                  name: state.capturedData.name!,
                  email: state.capturedData.email!,
                  phone: state.capturedData.phone!,
                  projectType: state.capturedData.projectType!,
                  description: state.capturedData.problem ?? "",
                  meetingDate: state.capturedData.meetingDate!,
                  meetingTime: state.capturedData.meetingTime!,
                  timezone: state.capturedData.timezone!,
                },
                apiBase,
              );
              setState((prev) => ({ ...prev, chatBookingStep: "done" }));
              setMessages(() => [
                ...updatedConversation,
                {
                  role: "bot",
                  text: result.message,
                  timestamp: new Date(),
                  messageId: `msg_${Date.now()}_booked`,
                },
              ]);
            } catch (err) {
              const errorMsg =
                err instanceof Error ? err.message : "Unknown error";
              const isSlotTaken = /time slot/i.test(errorMsg);
              setState((prev) => ({
                ...prev,
                chatBookingStep: isSlotTaken ? "date" : "",
                capturedData: isSlotTaken
                  ? {
                      ...prev.capturedData,
                      meetingDate: undefined,
                      meetingTime: undefined,
                    }
                  : prev.capturedData,
              }));
              setMessages(() => [
                ...updatedConversation,
                {
                  role: "bot",
                  text: isSlotTaken
                    ? "That time slot was just taken by someone else. Please choose a different date.\n\nPlease use the format YYYY-MM-DD (e.g. 2026-05-20). Weekdays only, within the next 30 days."
                    : `Sorry, there was a problem confirming your booking: ${errorMsg}\n\nPlease try the booking form at /book-call instead.`,
                  timestamp: new Date(),
                  messageId: `msg_${Date.now()}_booking_err`,
                },
              ]);
            } finally {
              setIsTyping(false);
            }
            setShowQuickReplies(false);
            return;
          }

          if (confirmsNo) {
            setState((prev) => ({
              ...prev,
              chatBookingStep: "",
              capturedData: {
                ...prev.capturedData,
                meetingDate: undefined,
                meetingTime: undefined,
                timezone: undefined,
              },
            }));
            showAfterTyping(() => {
              setMessages(() => [
                ...updatedConversation,
                {
                  role: "bot",
                  text: "No problem. Say 'book a call' whenever you are ready to try again.",
                  timestamp: new Date(),
                  messageId: `msg_${Date.now()}_booking_cancel`,
                },
              ]);
              setShowQuickReplies(false);
            });
            return;
          }

          showAfterTyping(() => {
            setMessages(() => [
              ...updatedConversation,
              {
                role: "bot",
                text: "Please reply with Yes to confirm or No to cancel.",
                timestamp: new Date(),
                messageId: `msg_${Date.now()}_confirm_retry`,
              },
            ]);
            setQuickReplies(["Yes, confirm my booking", "No, cancel"]);
            setShowQuickReplies(true);
          });
          return;
        }

        // Validate the current field input
        const validation = validateBookingInput(step, textToSend);
        if (!validation.valid) {
          showAfterTyping(() => {
            setMessages(() => [
              ...updatedConversation,
              {
                role: "bot",
                text: validation.error ?? "Invalid input. Please try again.",
                timestamp: new Date(),
                messageId: `msg_${Date.now()}_booking_invalid`,
              },
            ]);
            const qr = getBookingStepQuickReplies(step);
            if (qr) {
              setQuickReplies([...qr]);
              setShowQuickReplies(true);
            }
          });
          return;
        }

        // For the time step, verify the chosen slot is still available
        if (step === "time") {
          setIsTyping(true);
          const availableSlots = await fetchAvailableSlots(
            state.capturedData.meetingDate!,
            state.capturedData.timezone ?? "Africa/Lagos",
          );
          setIsTyping(false);
          if (!availableSlots.includes(validation.value!)) {
            showAfterTyping(() => {
              setMessages(() => [
                ...updatedConversation,
                {
                  role: "bot",
                  text:
                    availableSlots.length > 0
                      ? "That time slot is already booked. Please choose from the available times below."
                      : "All time slots for that date are fully booked. Please choose a different date.\n\nPlease use the format YYYY-MM-DD (e.g. 2026-05-20). Weekdays only, within the next 30 days.",
                  timestamp: new Date(),
                  messageId: `msg_${Date.now()}_slot_taken`,
                },
              ]);
              if (availableSlots.length > 0) {
                setQuickReplies(availableSlots);
                setShowQuickReplies(true);
              } else {
                setState((prev) => ({
                  ...prev,
                  chatBookingStep: "date",
                  capturedData: {
                    ...prev.capturedData,
                    meetingDate: undefined,
                  },
                }));
                setShowQuickReplies(false);
              }
            });
            return;
          }
        }

        // Save validated value and advance to next step
        const dataKey = BOOKING_FIELD_TO_DATA_KEY[step];
        const newCapturedData = {
          ...state.capturedData,
          [dataKey]: validation.value,
        };
        const nextField = getNextBookingField(newCapturedData);

        if (nextField === "confirm") {
          const summary = buildBookingSummary(newCapturedData);
          showAfterTyping(() => {
            setState((prev) => ({
              ...prev,
              chatBookingStep: "confirm",
              capturedData: newCapturedData,
            }));
            setMessages(() => [
              ...updatedConversation,
              {
                role: "bot",
                text: summary,
                timestamp: new Date(),
                messageId: `msg_${Date.now()}_booking_summary`,
              },
            ]);
            setQuickReplies(["Yes, confirm my booking", "No, cancel"]);
            setShowQuickReplies(true);
          });
          return;
        }

        // When advancing to the time step, fetch available slots first
        if (nextField === "time") {
          setIsTyping(true);
          const availableSlots = await fetchAvailableSlots(
            newCapturedData.meetingDate!,
            newCapturedData.timezone ?? "Africa/Lagos",
          );
          setIsTyping(false);
          if (availableSlots.length === 0) {
            showAfterTyping(() => {
              setState((prev) => ({
                ...prev,
                chatBookingStep: "date",
                capturedData: { ...newCapturedData, meetingDate: undefined },
              }));
              setMessages(() => [
                ...updatedConversation,
                {
                  role: "bot",
                  text: "All time slots for that date are fully booked. Please choose a different date.\n\nPlease use the format YYYY-MM-DD (e.g. 2026-05-20). Weekdays only, within the next 30 days.",
                  timestamp: new Date(),
                  messageId: `msg_${Date.now()}_no_slots`,
                },
              ]);
              setShowQuickReplies(false);
            });
            return;
          }
          showAfterTyping(() => {
            setState((prev) => ({
              ...prev,
              chatBookingStep: "time",
              capturedData: newCapturedData,
            }));
            setMessages(() => [
              ...updatedConversation,
              {
                role: "bot",
                text: getBookingStepPrompt("time", newCapturedData),
                timestamp: new Date(),
                messageId: `msg_${Date.now()}_booking_step`,
              },
            ]);
            setQuickReplies(availableSlots);
            setShowQuickReplies(true);
          });
          return;
        }

        showAfterTyping(() => {
          setState((prev) => ({
            ...prev,
            chatBookingStep: nextField,
            capturedData: newCapturedData,
          }));
          const prompt = getBookingStepPrompt(nextField as BookingField, newCapturedData);
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: prompt,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_booking_step`,
            },
          ]);
          const qr = getBookingStepQuickReplies(nextField as BookingField);
          if (qr) {
            setQuickReplies([...qr]);
            setShowQuickReplies(true);
          } else {
            setShowQuickReplies(false);
          }
        });
        return;
      }

      // Detect fresh booking-in-chat intent
      if (
        CHAT_BOOK_INTENT_REGEX.test(textToSend) ||
        CHAT_BOOK_INTENT_REGEX.test(normalizedForMatching)
      ) {
        const firstField = getNextBookingField(state.capturedData);
        if (firstField === "confirm") {
          // All data already captured — go straight to summary
          const summary = buildBookingSummary(state.capturedData);
          showAfterTyping(() => {
            setState((prev) => ({ ...prev, chatBookingStep: "confirm" }));
            setMessages(() => [
              ...updatedConversation,
              {
                role: "bot",
                text: summary,
                timestamp: new Date(),
                messageId: `msg_${Date.now()}_booking_summary`,
              },
            ]);
            setQuickReplies(["Yes, confirm my booking", "No, cancel"]);
            setShowQuickReplies(true);
          });
        } else if (firstField === "time") {
          setIsTyping(true);
          const availableSlots = await fetchAvailableSlots(
            state.capturedData.meetingDate!,
            state.capturedData.timezone ?? "Africa/Lagos",
          );
          setIsTyping(false);
          if (availableSlots.length === 0) {
            showAfterTyping(() => {
              setState((prev) => ({
                ...prev,
                chatBookingStep: "date",
                capturedData: { ...prev.capturedData, meetingDate: undefined },
              }));
              setMessages(() => [
                ...updatedConversation,
                {
                  role: "bot",
                  text: "All time slots for that date are fully booked. Please choose a different date.\n\nPlease use the format YYYY-MM-DD (e.g. 2026-05-20). Weekdays only, within the next 30 days.",
                  timestamp: new Date(),
                  messageId: `msg_${Date.now()}_no_slots`,
                },
              ]);
              setShowQuickReplies(false);
            });
          } else {
            showAfterTyping(() => {
              setState((prev) => ({ ...prev, chatBookingStep: "time" }));
              setMessages(() => [
                ...updatedConversation,
                {
                  role: "bot",
                  text: getBookingStepPrompt("time", state.capturedData),
                  timestamp: new Date(),
                  messageId: `msg_${Date.now()}_booking_start`,
                },
              ]);
              setQuickReplies(availableSlots);
              setShowQuickReplies(true);
            });
          }
        } else {
          showAfterTyping(() => {
            setState((prev) => ({ ...prev, chatBookingStep: firstField }));
            const prompt = getBookingStepPrompt(firstField as BookingField, state.capturedData);
            setMessages(() => [
              ...updatedConversation,
              {
                role: "bot",
                text: prompt,
                timestamp: new Date(),
                messageId: `msg_${Date.now()}_booking_start`,
              },
            ]);
            const qr = getBookingStepQuickReplies(firstField as BookingField);
            if (qr) {
              setQuickReplies([...qr]);
              setShowQuickReplies(true);
            } else {
              setShowQuickReplies(false);
            }
          });
        }
        return;
      }
      // --- END CHAT BOOKING FLOW ---

      const normalizedInput = normalize(textToSend);
      const isGeneralLearningRequest =
        GENERAL_LEARNING_REQUEST_REGEX.test(normalizedForMatching) &&
        GENERAL_TECH_TOPIC_REGEX.test(normalizedForMatching);
      const isPortfolioTopic = PORTFOLIO_TOPIC_REGEX.test(
        normalizedForMatching,
      );
      const isPromptInjection = PROMPT_INJECTION_REGEX.test(
        normalizedForMatching,
      );

      const isBlocked =
        BLOCKED_NON_PROJECT_QUESTIONS.some(
          (question) => normalize(question) === normalizedInput,
        ) ||
        isPromptInjection ||
        isGeneralLearningRequest ||
        (!isPortfolioTopic &&
          !ALLOWED_PROJECT_QUESTIONS.some(
            (question) => normalize(question) === normalizedInput,
          ));

      const isAllowed = ALLOWED_PROJECT_QUESTIONS.some(
        (question) => normalize(question) === normalizedInput,
      );

      if (isBlocked) {
        const blockedResponse = getBlockedResponse(textToSend, normalizedInput);
        // eslint-disable-next-line no-console
        console.log("[GUARDRAIL BLOCKED]", {
          textToSend,
          isBlocked,
          isAllowed,
        });
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: blockedResponse.text,
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_blocked`,
            },
          ]);
          setQuickReplies(blockedResponse.quickReplies);
          setShowQuickReplies(true);
        });
        return;
      }

      setIsTyping(true);
      const scopedQuickReplies = getScopedQuickReplies(textToSend);

      const analysis = analyzeMessage(textToSend);
      const mergedCapturedData = {
        ...state.capturedData,
        ...analysis.extractedData,
      };
      const newState: ConversationState = {
        ...state,
        userType: analysis.userType,
        intent: analysis.intent as Intent,
        messageCount: state.messageCount + 1,
        capturedData: mergedCapturedData,
        stage: determineNextStage(
          state.stage,
          analysis.userType,
          state.messageCount + 1,
        ) as ConversationStage,
        captureStep: "none",
        ctaTriggered:
          state.ctaTriggered ||
          shouldTriggerCTA(
            state.messageCount + 1,
            analysis.userType,
            !!mergedCapturedData.problem,
          ),
        lastActivityAt: new Date(),
        memoryKey: (state as ConversationState).memoryKey,
      };

      setState(newState);

      setTimeout(async () => {
        const conversationHistory: Array<{
          role: "user" | "assistant";
          content: string;
        }> = updatedConversation.map((msg) => ({
          role: msg.role === "bot" ? "assistant" : "user",
          content: msg.text,
        }));

        const aiResponse = await getAIResponse(textToSend, conversationHistory);
        const botResponse: BotResponseResult = aiResponse
          ? { text: aiResponse }
          : { text: PROJECT_SCOPE_FALLBACK };

        setMessages(() => [
          ...updatedConversation,
          {
            role: "bot",
            text: botResponse.text,
            timestamp: new Date(),
            messageId: `msg_${Date.now()}_bot`,
          },
        ]);
        setIsTyping(false);

        if ("quickReplies" in botResponse && botResponse.quickReplies) {
          setQuickReplies(botResponse.quickReplies);
          setShowQuickReplies(true);
        } else if (scopedQuickReplies && scopedQuickReplies.length > 0) {
          setQuickReplies(scopedQuickReplies);
          setShowQuickReplies(true);
        } else {
          setShowQuickReplies(false);
        }

        if (newState.ctaTriggered && !state.ctaTriggered) {
          setTimeout(() => {
            const ctaIndex = Math.floor(Math.random() * 5);
            const cta = getCTAVariation(ctaIndex);
            setMessages((prev) => [
              ...prev,
              {
                role: "bot",
                text: cta,
                timestamp: new Date(),
                messageId: `msg_${Date.now()}_cta`,
              },
            ]);
          }, 1500);
        }
      }, 1200);
    },
    [
      apiBase,
      getAIResponse,
      setMessages,
      setIsTyping,
      setQuickReplies,
      setShowQuickReplies,
      setState,
      state,
    ],
  );

  return { handleAIResponse };
}
