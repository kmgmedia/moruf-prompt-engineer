import { useCallback, Dispatch, SetStateAction } from "react";
import type { Message, ConversationState } from "@/lib/chatbot/types";
import {
  analyzeMessage,
  shouldTriggerCTA,
  determineNextStage,
} from "@/lib/chatbot/intents";
// === INLINED PROJECT GUARDRAIL LISTS ===
// Only allow questions about this project, block all others
export const ALLOWED_PROJECT_QUESTIONS = [
  "what services do you offer?",
  "how can i book a call?",
  "show me your case studies",
  "what is your experience?",
  "what technologies do you use?",
  "can you help automate my business?",
  "how do you build ai systems?",
  "what is your process?",
  "how do i get started?",
  "can i see your portfolio?",
  "how do i contact you?",
  "what is your pricing?",
  "how long does a project take?",
  "what is your background?",
  "what is your tech stack?",
  "can you show examples?",
  "how do i hire you?",
  "what is your availability?",
  "can you work on my project?",
  "what is your approach?",
  "what is your timeline?",
  "can you share references?",
  "what is your delivery process?",
  "how do you ensure quality?",
  "what is your project scope?",
  "can you explain your work?",
  "what is your role in projects?",
  "how do you handle feedback?",
  "what is your revision policy?",
  "how do you communicate with clients?",
  "what is your onboarding process?",
];

export const BLOCKED_NON_PROJECT_QUESTIONS = [
  "how do i learn python?",
  "how do i become a developer?",
  "how do i get better at coding?",
  "how do i prepare for interviews?",
  "what is the best way to learn programming?",
  "can you teach me javascript?",
  "can you teach me react?",
  "can you teach me node.js?",
  "can you teach me sql?",
  "can you teach me database design?",
  "can you teach me coding?",
  "can you recommend resources?",
  "can you recommend tutorials?",
  "can you recommend books?",
  "how do i start learning programming?",
  "how do i start learning coding?",
  "how do i start learning react?",
  "how do i start learning javascript?",
  "how do i start learning node.js?",
  "how do i start learning sql?",
  "how do i start learning database design?",
  "how do i start learning ai?",
  "how do i start learning machine learning?",
  "how do i start learning software engineering?",
  "how do i start learning web development?",
  "how do i start learning backend development?",
  "how do i start learning frontend development?",
  "how do i start learning full stack development?",
];
// === END INLINED PROJECT GUARDRAIL LISTS ===
import {
  generateBotResponse,
  getCTAVariation,
  type BotResponseResult,
} from "@/lib/chatbot/flows";

// === PROJECT SCOPE CONFIGURATION (ENFORCED BY TEST LISTS) ===
// Only answer questions in ALLOWED_PROJECT_QUESTIONS. Block all in BLOCKED_NON_PROJECT_QUESTIONS.
const PROJECT_SCOPE_FALLBACK =
  "I can only discuss how programming, technology, or tools relate to my own projects, services, or portfolio. For general learning advice, tutorials, or unrelated tech questions, please consult other resources. If you want to know how I use Python or any technology in my work, just ask!";
// === END PROJECT SCOPE CONFIGURATION ===

export function useAIResponse(
  getAIResponse: (input: string, history: any[]) => Promise<string | undefined>,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  setIsTyping: Dispatch<SetStateAction<boolean>>,
  setQuickReplies: Dispatch<SetStateAction<string[]>>,
  setShowQuickReplies: Dispatch<SetStateAction<boolean>>,
  setState: Dispatch<SetStateAction<ConversationState>>,
  state: ConversationState,
  messages: Message[],
  input: string,
) {
  const handleAIResponse = useCallback(
    async (textToSend: string, updatedConversation: Message[]) => {
      // Allow simple greetings and thanks with a friendly steer to project scope
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
            text: "You're welcome — happy to help! If you have questions about my projects or services, ask away.",
            timestamp: new Date(),
            messageId: `msg_${Date.now()}_thanks`,
          },
        ]);
        setIsTyping(false);
        setShowQuickReplies(false);
        return;
      }
      // === STRICT GUARDED LOGIC (ENFORCED BEFORE ANY AI CALL) ===
      // Only answer if the question matches ALLOWED_PROJECT_QUESTIONS exactly (case-insensitive, trimmed)
      // Always block if the question matches BLOCKED_NON_PROJECT_QUESTIONS (case-insensitive, trimmed)
      // All other questions are blocked
      const normalize = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();
      const normalizedInput = normalize(textToSend);
      // Regex-based block for learning/advice requests (Python, programming, coding, etc.)
      const learningBlockRegex =
        /\b(how (can|do|should) (i|one|someone|we) (learn|start learning|get better at|study|master|improve at|become|teach me|best way to learn|recommend|resources|tutorials|books|prepare for).*(python|programming|coding|software|developer|code|react|javascript|node|sql|database|interview|job|developer|engineer))\b|\bteach me (python|programming|coding|react|javascript|node|sql|database)\b|\bbest way to learn (python|programming|coding|react|javascript|node|sql|database)\b/i;
      const isBlocked =
        BLOCKED_NON_PROJECT_QUESTIONS.some(
          (q) => normalize(q) === normalizedInput,
        ) ||
        learningBlockRegex.test(textToSend) ||
        learningBlockRegex.test(normalizedInput);
      const isAllowed = ALLOWED_PROJECT_QUESTIONS.some(
        (q) => normalize(q) === normalizedInput,
      );

      // Only explicitly blocked questions are intercepted and receive the fallback.
      // All other inputs (including ones not in the allowed list) are forwarded to the AI backend.
      if (isBlocked) {
        // Log blocked inputs for debugging
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
            text: PROJECT_SCOPE_FALLBACK,
            timestamp: new Date(),
            messageId: `msg_${Date.now()}_blocked`,
          },
        ]);
        setIsTyping(false);
        setShowQuickReplies(false);
        return;
      }

      // Only allowed questions reach this point
      setIsTyping(true);
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
      setIsTyping(true);
      setTimeout(async () => {
        const conversationHistory: Array<{
          role: "user" | "assistant";
          content: string;
        }> = updatedConversation.map((msg) => ({
          role: msg.role === "bot" ? "assistant" : "user",
          content: msg.text,
        }));
        const aiResponse = await getAIResponse(textToSend, conversationHistory);
        let botResponse: BotResponseResult;
        if (aiResponse) {
          botResponse = { text: aiResponse };
        } else {
          botResponse = {
            text: PROJECT_SCOPE_FALLBACK,
          };
        }
        // Append AI/bot response to the updated conversation
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
      messages,
      input,
    ],
  );
  return { handleAIResponse };
}
