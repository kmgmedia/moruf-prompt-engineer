import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  ConversationState,
  Message,
  LeadCaptureStep,
  LeadData,
} from "@/lib/chatbot/types";
import {
  analyzeMessage,
  shouldTriggerCTA,
  determineNextStage,
} from "@/lib/chatbot/intents";
import {
  generateBotResponse,
  getCTAVariation,
  type BotResponseResult,
} from "@/lib/chatbot/flows";
import { useAIChatbot } from "@/hooks/use-ai-chatbot";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { INITIAL_QUICK_REPLIES } from "@/components/chatbot/constants";
import { getIntentFallback } from "@/components/chatbot/fallbacks";
import { sendLeadToAPI } from "@/components/chatbot/leadApi";
import { renderMessageWithLinks } from "@/components/chatbot/messageLinks";
import { PenIcon } from "@/components/chatbot/PenIcon";
import { usePromoCard } from "@/components/chatbot/promo";
import {
  getInitialConversationState,
  getInitialMessages,
  persistConversationState,
  persistMessages,
} from "@/components/chatbot/storage";

const START_LEAD_CAPTURE_REGEX =
  /\b(book|schedule|call|meeting|talk|speak|zoom|whatsapp|ready|proceed|move forward|get started|next step)\b/i;

const PROJECT_TYPE_QUICK_REPLIES = [
  "1. Automation system",
  "2. API / integration",
  "3. Web app",
  "4. Not sure yet",
];

const PROJECT_TYPE_LABELS: Record<string, string> = {
  automation: "Automation system",
  api_integration: "API / integration",
  web_app: "Web app",
  web_system: "Web system",
  recruiting: "Recruiting / role conversation",
  not_sure: "Not sure yet",
};

const normalizeName = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  const cleaned = trimmed
    .replace(/^(my name is|name is|i am|i'm|im|this is|call me)\s+/i, "")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .trim();

  if (!cleaned || cleaned.length < 2) {
    return undefined;
  }

  return cleaned
    .split(/\s+/)
    .slice(0, 3)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

const extractValidEmail = (value: string): string | undefined => {
  const match = value.trim().match(/([^\s@]+@[^\s@]+\.[^\s@]+)/i);
  if (!match?.[1]) {
    return undefined;
  }

  const candidate = match[1].toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate);
  return isValid ? candidate : undefined;
};

const mapProjectTypeFromInput = (value: string): string | undefined => {
  const normalized = value.toLowerCase().trim();

  if (
    normalized.startsWith("1") ||
    normalized.includes("automation") ||
    normalized.includes("workflow")
  ) {
    return "automation";
  }

  if (
    normalized.startsWith("2") ||
    normalized.includes("api") ||
    normalized.includes("integration") ||
    normalized.includes("connect")
  ) {
    return "api_integration";
  }

  if (
    normalized.startsWith("3") ||
    normalized.includes("web app") ||
    normalized.includes("web") ||
    normalized.includes("app") ||
    normalized.includes("system")
  ) {
    return "web_app";
  }

  if (
    normalized.startsWith("4") ||
    normalized.includes("not sure") ||
    normalized.includes("unsure")
  ) {
    return "not_sure";
  }

  return undefined;
};

const getNextLeadCaptureStep = (
  capturedData: ConversationState["capturedData"],
): LeadCaptureStep => {
  if (!capturedData.name) {
    return "name";
  }
  if (!capturedData.email) {
    return "email";
  }
  if (!capturedData.projectType) {
    return "project_type";
  }
  if (!capturedData.problem) {
    return "description";
  }

  return "complete";
};

const getLeadCapturePrompt = (
  step: LeadCaptureStep,
  capturedData: ConversationState["capturedData"],
): string => {
  if (step === "name") {
    return "Before we jump to a call, I can quickly capture your details so I come prepared.\n\nWhat's your name?";
  }

  if (step === "email") {
    const displayName = capturedData.name ? capturedData.name : "there";
    return `Nice to meet you, ${displayName} 👍\nWhat's the best email to reach you?`;
  }

  if (step === "project_type") {
    return "Got it.\n\nWhich best describes what you need?\n\n1. Automation system\n2. API / integration\n3. Web app\n4. Not sure yet";
  }

  if (step === "description") {
    return "Last one — can you briefly describe what you're trying to build or improve?";
  }

  return "";
};

const getProjectTypeLabel = (projectType?: string): string => {
  if (!projectType) {
    return "project";
  }

  return PROJECT_TYPE_LABELS[projectType] || projectType;
};

const ChatBot = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const apiBase =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
      ? String(import.meta.env.VITE_API_URL).replace(/\/+$/, "")
      : "";
  const { getAIResponse, error: aiError } = useAIChatbot({
    useOpenAI: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const {
    showPromoCard,
    setShowPromoCard,
    promoCardClosed,
    setPromoCardClosed,
  } = usePromoCard(isOpen);

  const [state, setState] = useState<ConversationState>(() =>
    getInitialConversationState(),
  );
  const [messages, setMessages] = useState<Message[]>(() =>
    getInitialMessages(),
  );

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    ...INITIAL_QUICK_REPLIES,
  ]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
    // iOS keyboard fix: scroll input into view on focus
    useEffect(() => {
      if (!isMobile) return;
      const input = inputRef.current;
      if (!input) return;
      const handler = () => {
        setTimeout(() => {
          input.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
      };
      input.addEventListener("focus", handler);
      return () => {
        input.removeEventListener("focus", handler);
      };
    }, [isMobile, isOpen]);
  const lastAiErrorRef = useRef<string | null>(null);
  const hasShownOfflineToastRef = useRef(false);
  const hasShownReturnGreetingRef = useRef(false);

  const createBotMessage = (text: string, suffix: string): Message => ({
    role: "bot",
    text,
    timestamp: new Date(),
    messageId: `msg_${Date.now()}_${suffix}`,
  });

  const buildLeadPayload = (
    nextState: ConversationState,
    conversationMessages: Message[],
  ): LeadData => ({
    name: nextState.capturedData.name || "Unknown",
    email: nextState.capturedData.email || "unknown@example.com",
    projectType: nextState.capturedData.projectType || "not_sure",
    description: nextState.capturedData.problem || "To be discussed on call",
    intent:
      nextState.userType === "recruiter"
        ? "recruiter"
        : nextState.userType === "client"
          ? "client"
          : "browsing",
    source: "chatbot",
    status: "new_lead",
    sessionId: nextState.sessionId,
    conversationDuration: Math.round(
      (Date.now() - nextState.startedAt.getTime()) / 1000,
    ),
    messageCount: nextState.messageCount,
    messages: conversationMessages.map((m) => ({
      role: m.role,
      text: m.text,
      timestamp: m.timestamp,
    })),
  });

  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  };

  useEffect(() => {
    persistConversationState(state);
  }, [state]);

  useEffect(() => {
    persistMessages(messages);
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    scrollToBottom("smooth");
  }, [messages, isTyping, isOpen]);

  // When chat opens, jump to latest message even if no new message was added.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    scrollToBottom("auto");

    let rafId2 = 0;
    const rafId1 = window.requestAnimationFrame(() => {
      scrollToBottom("auto");

      rafId2 = window.requestAnimationFrame(() => {
        scrollToBottom("auto");
      });
    });

    const delayedScrollTimer = window.setTimeout(() => {
      scrollToBottom("auto");
    }, 100);

    const delayedScrollTimer2 = window.setTimeout(() => {
      scrollToBottom("auto");
    }, 260);

    return () => {
      window.cancelAnimationFrame(rafId1);
      if (rafId2) {
        window.cancelAnimationFrame(rafId2);
      }
      window.clearTimeout(delayedScrollTimer);
      window.clearTimeout(delayedScrollTimer2);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOnline = () => {
      hasShownOfflineToastRef.current = false;
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  useEffect(() => {
    if (!isOpen || hasShownReturnGreetingRef.current) {
      return;
    }

    const { name, projectType } = state.capturedData;
    if (!name || !projectType || !state.leadCaptured) {
      return;
    }

    const welcomeBackText = `Hey ${name}, welcome back 👋\nStill working on that ${getProjectTypeLabel(projectType)} you mentioned?`;

    const alreadyPresent = messages.some(
      (msg) => msg.role === "bot" && msg.text === welcomeBackText,
    );

    if (!alreadyPresent) {
      setMessages((prev) => [
        ...prev,
        createBotMessage(welcomeBackText, "return"),
      ]);
    }

    hasShownReturnGreetingRef.current = true;
  }, [isOpen, messages, state.capturedData, state.leadCaptured]);

  // Lock background scroll when chatbot is full-screen on mobile.
  useEffect(() => {
    if (!(isMobile && isOpen)) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, isOpen]);

  // Show only actionable AI errors and avoid duplicate toasts.
  useEffect(() => {
    if (!aiError) {
      lastAiErrorRef.current = null;
      return;
    }

    const offline =
      typeof navigator !== "undefined" && navigator.onLine === false;
    if (offline || lastAiErrorRef.current === aiError) {
      return;
    }

    lastAiErrorRef.current = aiError;
    toast.error(`AI is unavailable right now. ${aiError}`);
  }, [aiError]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowPromoCard(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleClosePromo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPromoCard(false);
    setPromoCardClosed(true);
  };

  const handleNavigateFromMessage = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setShowPromoCard(false);
  };

  // Handle message send
  const handleSend = async (msgText?: string) => {
    const textToSend = msgText || input;
    if (!textToSend.trim()) return;

    // Create message object with timestamp
    const userMessage: Message = {
      role: "user",
      text: textToSend,
      timestamp: new Date(),
      messageId: `msg_${Date.now()}_user`,
    };

    // Add user message
    const updatedConversation = [...messages, userMessage];
    setMessages(updatedConversation);
    setInput("");
    setShowQuickReplies(false);

    const isCapturingLead =
      state.captureStep !== "none" &&
      state.captureStep !== "complete" &&
      !state.leadCaptured;

    if (isCapturingLead) {
      setIsTyping(true);

      setTimeout(async () => {
        let nextCapturedData = { ...state.capturedData };
        let nextStep: LeadCaptureStep = state.captureStep;
        let responseText = "";

        if (state.captureStep === "name") {
          const parsedName = normalizeName(textToSend);
          if (!parsedName) {
            responseText =
              "I didn't catch your name clearly. Please share your first name.";
            nextStep = "name";
          } else {
            nextCapturedData = {
              ...nextCapturedData,
              name: parsedName,
            };
            nextStep = getNextLeadCaptureStep(nextCapturedData);
          }
        } else if (state.captureStep === "email") {
          const email = extractValidEmail(textToSend);
          if (!email) {
            responseText =
              "That email looks invalid. Please share a valid email address so I can send follow-up details.";
            nextStep = "email";
          } else {
            nextCapturedData = {
              ...nextCapturedData,
              email,
            };
            nextStep = getNextLeadCaptureStep(nextCapturedData);
          }
        } else if (state.captureStep === "project_type") {
          const projectType = mapProjectTypeFromInput(textToSend);
          if (!projectType) {
            responseText =
              "Please choose one of these options: 1. Automation system, 2. API / integration, 3. Web app, 4. Not sure yet.";
            nextStep = "project_type";
          } else {
            nextCapturedData = {
              ...nextCapturedData,
              projectType,
            };
            nextStep = getNextLeadCaptureStep(nextCapturedData);
          }
        } else if (state.captureStep === "description") {
          const description = textToSend.trim();
          if (description.length < 12) {
            responseText =
              "Can you share a bit more context in one short sentence so I can prepare properly?";
            nextStep = "description";
          } else {
            nextCapturedData = {
              ...nextCapturedData,
              problem: description,
            };
            nextStep = getNextLeadCaptureStep(nextCapturedData);
          }
        }

        const nextState: ConversationState = {
          ...state,
          messageCount: state.messageCount + 1,
          capturedData: nextCapturedData,
          captureStep: nextStep,
          stage: nextStep === "complete" ? "captured" : "lead_capture",
          lastActivityAt: new Date(),
        };

        if (nextStep === "complete") {
          const leadPayload = buildLeadPayload(nextState, updatedConversation);
          const leadCaptured = await sendLeadToAPI(apiBase, leadPayload);

          const completionText = leadCaptured
            ? "Perfect, details captured. I have sent a quick follow-up email. Next step: book your 20-30 minute discovery call at /book-call."
            : "I couldn't submit your details right now. You can still continue at /book-call and I will review your request there.";

          setMessages((prev) => [
            ...prev,
            createBotMessage(completionText, "capture_done"),
          ]);

          setState({
            ...nextState,
            leadCaptured,
            captureStep: leadCaptured ? "complete" : "description",
            stage: leadCaptured ? "captured" : "lead_capture",
          });

          setShowQuickReplies(false);
          setIsTyping(false);
          // FIX: Do not send next prompt after completion, wait for user input
          return;
        }

        const nextPrompt =
          responseText || getLeadCapturePrompt(nextStep, nextCapturedData);
        const quickReplyOptions =
          nextStep === "project_type" ? PROJECT_TYPE_QUICK_REPLIES : [];

        setMessages((prev) => [
          ...prev,
          createBotMessage(nextPrompt, "capture_step"),
        ]);
        setState(nextState);

        if (quickReplyOptions.length > 0) {
          setQuickReplies(quickReplyOptions);
          setShowQuickReplies(true);
        } else {
          setShowQuickReplies(false);
        }

        setIsTyping(false);
      }, 600);

      return;
    }

    // Analyze message
    const analysis = analyzeMessage(textToSend);
    const mergedCapturedData = {
      ...state.capturedData,
      ...analysis.extractedData,
    };

    // Update state
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
    };

    const shouldStartLeadCapture =
      !newState.leadCaptured &&
      newState.captureStep === "none" &&
      (START_LEAD_CAPTURE_REGEX.test(textToSend) ||
        (newState.ctaTriggered &&
          (newState.userType === "client" ||
            newState.userType === "recruiter")));

    if (shouldStartLeadCapture) {
      const nextStep = getNextLeadCaptureStep(newState.capturedData);
      const captureState: ConversationState = {
        ...newState,
        captureStep: nextStep,
        stage: nextStep === "complete" ? "captured" : "lead_capture",
      };

      setState(captureState);
      setIsTyping(true);

      setTimeout(async () => {
        if (nextStep === "complete") {
          const leadPayload = buildLeadPayload(
            captureState,
            updatedConversation,
          );
          const leadCaptured = await sendLeadToAPI(apiBase, leadPayload);

          const completionText = leadCaptured
            ? "Perfect, details captured. I have sent a quick follow-up email. Next step: book your 20-30 minute discovery call at /book-call."
            : "I couldn't submit your details right now. You can still continue at /book-call and I will review your request there.";

          setMessages((prev) => [
            ...prev,
            createBotMessage(completionText, "capture_done"),
          ]);

          setState({
            ...captureState,
            leadCaptured,
            captureStep: leadCaptured ? "complete" : "description",
            stage: leadCaptured ? "captured" : "lead_capture",
          });

          setShowQuickReplies(false);
          setIsTyping(false);
          return;
        }

        const firstPrompt = getLeadCapturePrompt(
          nextStep,
          captureState.capturedData,
        );
        setMessages((prev) => [
          ...prev,
          createBotMessage(firstPrompt, "capture_start"),
        ]);

        if (nextStep === "project_type") {
          setQuickReplies(PROJECT_TYPE_QUICK_REPLIES);
          setShowQuickReplies(true);
        } else {
          setShowQuickReplies(false);
        }

        setIsTyping(false);
      }, 700);

      return;
    }

    setState(newState);

    // Show typing
    setIsTyping(true);

    // Generate response
    setTimeout(async () => {
      const offline =
        typeof navigator !== "undefined" && navigator.onLine === false;

      if (offline) {
        setIsTyping(false);

        if (!hasShownOfflineToastRef.current) {
          toast.error(
            "No internet connection. Please reconnect to continue chatting.",
          );
          hasShownOfflineToastRef.current = true;
        }

        return;
      }

      const conversationHistory: Array<{
        role: "user" | "assistant";
        content: string;
      }> = updatedConversation.map((msg) => ({
        role: msg.role === "bot" ? "assistant" : "user",
        content: msg.text,
      }));

      const aiResponse = await getAIResponse(textToSend, conversationHistory);

      const rulesFallback: BotResponseResult = getIntentFallback(
        textToSend,
        generateBotResponse(
          textToSend,
          analysis.userType,
          newState.messageCount,
          newState.capturedData,
        ),
      );

      const botResponse: BotResponseResult = aiResponse
        ? { text: aiResponse }
        : rulesFallback;

      const botMessage = createBotMessage(botResponse.text, "bot");

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if ("quickReplies" in botResponse && botResponse.quickReplies) {
        setQuickReplies(botResponse.quickReplies);
        setShowQuickReplies(true);
      } else {
        setShowQuickReplies(false);
      }

      // Show CTA if triggered
      if (newState.ctaTriggered && !state.ctaTriggered) {
        setTimeout(() => {
          const ctaIndex = Math.floor(Math.random() * 5);
          const cta = getCTAVariation(ctaIndex);

          const ctaMessage = createBotMessage(cta, "cta");

          setMessages((prev) => [...prev, ctaMessage]);
        }, 1500);
      }
    }, 1200);
  };

  return (
    <div
      className={
        isMobile && isOpen
          ? "fixed inset-0 z-50 flex items-stretch justify-stretch bg-background"
          : "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-end gap-3"
      }
    >
      {/* Promotional Message Card */}
      {showPromoCard && !isOpen && (
        <div
          onClick={handleOpenChat}
          className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 p-3 rounded-lg shadow-md animate-fade-in hover:border-primary/50 transition-colors cursor-pointer max-w-[200px] flex items-start justify-between gap-2"
        >
          <p className="text-xs font-medium text-foreground">
            Chat with Moruf about your project
          </p>
          <button
            onClick={handleClosePromo}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <div
        className={
          isMobile && isOpen
            ? "w-full h-[100svh] flex flex-col relative"
            : "relative"
        }
      >
        {isOpen ? (
          <Card
            className={
              isMobile
                ? "w-full h-[100svh] bg-card border-0 shadow-none rounded-none flex flex-col relative"
                : "w-[calc(100vw-2rem)] max-w-[28rem] h-[70vh] max-h-[40rem] sm:h-[34rem] lg:h-[40rem] bg-card border-primary/20 shadow-lg flex flex-col"
            }
          >
            {/* Header */}
            <div
              className={`bg-primary text-primary-foreground p-4 flex items-center justify-between ${
                isMobile ? "" : "rounded-t-lg"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <PenIcon className="w-7 h-7 sm:w-8 sm:h-8 mt-0.5 shrink-0" />
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="font-bold text-base sm:text-lg">Moruf</span>
                  <span className="text-[12px] sm:text-[13px] font-semibold opacity-95 leading-snug break-words">
                    Applied AI Engineer & Full-Stack Software Engineer
                  </span>
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                className="hover:bg-primary/80 p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className={
                isMobile
                  ? "flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar pb-24"
                  : "flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar"
              }
            >
              {messages.map((msg, idx) => (
                <div
                  key={msg.messageId || idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                    title={msg.timestamp.toLocaleTimeString()}
                  >
                    {renderMessageWithLinks(
                      msg.text,
                      handleNavigateFromMessage,
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-3 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              {showQuickReplies && quickReplies.length > 0 && !isTyping && (
                <div className="flex flex-col gap-2 mt-2">
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(reply)}
                      className="text-left px-3 py-2 rounded-lg bg-muted hover:bg-primary/20 text-sm transition-colors text-foreground hover:text-primary"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className={`border-t border-border p-3 flex gap-2 bg-background ${
                isMobile
                  ? "sticky left-0 right-0 bottom-0 z-50 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
                  : ""
              }`}
              style={isMobile ? { maxWidth: "100vw" } : undefined}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-sm"
                style={isMobile ? { minWidth: 0 } : undefined}
              />
              <Button
                onClick={() => handleSend()}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ) : (
          <Button
            onClick={handleOpenChat}
            size="icon"
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center"
          >
            <span className="relative z-10 inline-flex items-center justify-center w-9 h-9 shrink-0">
              <PenIcon className="w-full h-full object-contain" />
            </span>
            {(showPromoCard || promoCardClosed) && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">1</span>
              </div>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
