import { useCallback, Dispatch, SetStateAction } from "react";
import type { Message, ConversationState } from "@/lib/chatbot/types";
import {
  analyzeMessage,
  shouldTriggerCTA,
  determineNextStage,
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
} from "@/features/chatbot/guardrails";

export function useAIResponse(
  getAIResponse: (input: string, history: any[]) => Promise<string | undefined>,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  setIsTyping: Dispatch<SetStateAction<boolean>>,
  setQuickReplies: Dispatch<SetStateAction<string[]>>,
  setShowQuickReplies: Dispatch<SetStateAction<boolean>>,
  setState: Dispatch<SetStateAction<ConversationState>>,
  state: ConversationState,
) {
  const getScopedQuickReplies = (text: string): string[] | null => {
    if (RECRUITER_TOPIC_REGEX.test(text)) {
      return [...RECRUITER_QUICK_REPLIES];
    }

    if (PRICING_TIMELINE_TOPIC_REGEX.test(text)) {
      return [...PRICING_QUICK_REPLIES];
    }

    if (BOOKING_TOPIC_REGEX.test(text)) {
      return [...BOOKING_QUICK_REPLIES];
    }

    return null;
  };

  const getBlockedResponse = (
    text: string,
    normalizedInput: string,
  ): { text: string; quickReplies: string[] } => {
    const normalize = (value: string) =>
      value.replace(/\s+/g, " ").trim().toLowerCase();
    const isExplicitBlocked = BLOCKED_NON_PROJECT_QUESTIONS.some(
      (question) => normalize(question) === normalizedInput,
    );
    const isPromptInjection = PROMPT_INJECTION_REGEX.test(text);
    const isGeneralLearningRequest =
      GENERAL_LEARNING_REQUEST_REGEX.test(text) &&
      GENERAL_TECH_TOPIC_REGEX.test(text);
    const isRecruiterTopic = RECRUITER_TOPIC_REGEX.test(text);

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

    if (!PORTFOLIO_TOPIC_REGEX.test(text)) {
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
        /^(hi|hello|hey|hey there|good morning|good afternoon|good evening|yo)\b[!.]?$/i;
      const thanksRegex = /^(thanks|thank you|thx|ty)\b[!.]?$/i;
      const normalizedSimple = textToSend
        .replace(/[^a-zA-Z\s]/g, "")
        .trim()
        .toLowerCase();

      if (
        greetingRegex.test(textToSend) ||
        greetingRegex.test(normalizedSimple)
      ) {
        setMessages(() => [
          ...updatedConversation,
          {
            role: "bot",
            text: "Hey there! I can help with questions about my projects, services, or portfolio. What would you like to know about my work?",
            timestamp: new Date(),
            messageId: `msg_${Date.now()}_greeting`,
          },
        ]);
        setIsTyping(false);
        setShowQuickReplies(true);
        setQuickReplies([
          "What services do you offer?",
          "How can I book a call?",
        ]);
        return;
      }

      if (thanksRegex.test(textToSend) || thanksRegex.test(normalizedSimple)) {
        setMessages(() => [
          ...updatedConversation,
          {
            role: "bot",
            text: "You're welcome - happy to help! If you have questions about my projects or services, ask away.",
            timestamp: new Date(),
            messageId: `msg_${Date.now()}_thanks`,
          },
        ]);
        setIsTyping(false);
        setShowQuickReplies(false);
        return;
      }

      const normalize = (value: string) =>
        value.replace(/\s+/g, " ").trim().toLowerCase();
      const normalizedInput = normalize(textToSend);
      const isGeneralLearningRequest =
        GENERAL_LEARNING_REQUEST_REGEX.test(textToSend) &&
        GENERAL_TECH_TOPIC_REGEX.test(textToSend);
      const isPortfolioTopic = PORTFOLIO_TOPIC_REGEX.test(textToSend);
      const isPromptInjection = PROMPT_INJECTION_REGEX.test(textToSend);

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
        const blockedResponse = getBlockedResponse(
          textToSend,
          normalizedInput,
        );
        // eslint-disable-next-line no-console
        console.log("[GUARDRAIL BLOCKED]", {
          textToSend,
          isBlocked,
          isAllowed,
        });
        setMessages(() => [
          ...updatedConversation,
          {
            role: "bot",
            text: blockedResponse.text,
            timestamp: new Date(),
            messageId: `msg_${Date.now()}_blocked`,
          },
        ]);
        setIsTyping(false);
        setQuickReplies(blockedResponse.quickReplies);
        setShowQuickReplies(true);
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
        intent: analysis.intent as any,
        messageCount: state.messageCount + 1,
        capturedData: mergedCapturedData,
        stage: determineNextStage(
          state.stage,
          analysis.userType,
          state.messageCount + 1,
        ) as any,
        captureStep: "none",
        ctaTriggered:
          state.ctaTriggered ||
          shouldTriggerCTA(
            state.messageCount + 1,
            analysis.userType,
            !!mergedCapturedData.problem,
          ),
        lastActivityAt: new Date(),
        memoryKey: (state as any).memoryKey,
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
