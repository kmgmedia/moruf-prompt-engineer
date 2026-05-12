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
      const shortExplorationRegex = SHORT_EXPLORATION_REGEX;
      const normalize = (value: string) =>
        value.replace(/\s+/g, " ").trim().toLowerCase();
      const normalizedSimple = textToSend
        .replace(/[^a-zA-Z\s]/g, "")
        .trim()
        .toLowerCase();

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
        greetingRegex.test(normalizedSimple)
      ) {
        showAfterTyping(() => {
          setMessages(() => [
            ...updatedConversation,
            {
              role: "bot",
              text: "Hey there! I can help with questions about my projects, services, or portfolio. What would you like to know about my work?",
              timestamp: new Date(),
              messageId: `msg_${Date.now()}_greeting`,
            },
          ]);
          setShowQuickReplies(true);
          setQuickReplies([
            "What services do you offer?",
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
            setMessages(() => [
              ...updatedConversation,
              {
                role: "bot",
                text: availableSlots.length > 0
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
                capturedData: { ...prev.capturedData, meetingDate: undefined },
              }));
              setShowQuickReplies(false);
            }
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
            return;
          }
          setState((prev) => ({ ...prev, chatBookingStep: "time", capturedData: newCapturedData }));
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
      if (CHAT_BOOK_INTENT_REGEX.test(textToSend)) {
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
          } else {
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
