import { useState, useEffect, useRef } from "react";
import { X, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ConversationState, Message } from "@/lib/chatbot/types";
import { useAIResponse } from "../features/chatbot/hooks/useAIResponse";
import { useAIChatbot } from "../hooks/use-ai-chatbot";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import {
  INITIAL_QUICK_REPLIES,
  INITIAL_BOT_GREETING,
} from "@/components/chatbot/constants";
import { renderMessageWithLinks } from "@/components/chatbot/messageLinks";
import chatbotIcon from "@/assets/about-moruf.jpeg";
import { usePromoCard } from "@/components/chatbot/promo";
import { createBotMessage } from "@/components/chatbot/utils/chatHelpers";
import { getProjectTypeLabel } from "@/components/chatbot/utils/leadUtils";
import {
  getInitialConversationState,
  getInitialMessages,
  persistConversationState,
  persistMessages,
} from "@/components/chatbot/storage";

const ChatBot = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isDev = typeof import.meta !== "undefined" && !!import.meta.env?.DEV;
  const apiBase = (
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
      ? String(import.meta.env.VITE_API_URL)
      : "") || (isDev ? "http://localhost:3001" : "")
  ).replace(/\/+$/, "");

  const { getAIResponse, error: aiError } = useAIChatbot({
    useOpenAI: true,
    fallbackToRules: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
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

  const { handleAIResponse } = useAIResponse(
    getAIResponse,
    setMessages,
    setIsTyping,
    setQuickReplies,
    setShowQuickReplies,
    setState,
    state,
    apiBase,
  );

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastAiErrorRef = useRef<string | null>(null);
  const hasShownOfflineToastRef = useRef(false);
  const hasShownReturnGreetingRef = useRef(false);

  useEffect(() => {
    if (!isMobile) return;

    const inputElement = inputRef.current;
    if (!inputElement) return;

    const handler = () => {
      setTimeout(() => {
        inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    };

    inputElement.addEventListener("focus", handler);
    return () => {
      inputElement.removeEventListener("focus", handler);
    };
  }, [isMobile, isOpen]);

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    scrollToBottom("smooth");
  }, [messages, isTyping, isOpen]);

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

    const welcomeBackText = `Hey ${name}, welcome back.\nStill working on that ${getProjectTypeLabel(projectType)} you mentioned?`;
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

  const handleNewConversation = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("chatbot_conversation_state");
      localStorage.removeItem("chatbot_messages");
    }
    const freshGreeting: Message = {
      role: "bot",
      text: INITIAL_BOT_GREETING,
      timestamp: new Date(),
      messageId: `msg_${Date.now()}`,
    };
    setMessages([freshGreeting]);
    setState({
      stage: "greeting",
      userType: "unknown",
      intent: "unknown",
      captureStep: "none",
      messageCount: 0,
      capturedData: {},
      memoryKey: `chatbot_${Date.now()}`,
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      ctaTriggered: false,
      leadCaptured: false,
      startedAt: new Date(),
      lastActivityAt: new Date(),
      chatBookingStep: "",
    });
    setQuickReplies([...INITIAL_QUICK_REPLIES]);
    setShowQuickReplies(true);
    setInput("");
    hasShownReturnGreetingRef.current = false;
    setShowResetModal(false);
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

  const handleSend = async (msgText?: string) => {
    const textToSend = msgText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: textToSend,
      timestamp: new Date(),
      messageId: `msg_${Date.now()}_user`,
    };

    const updatedConversation = [...messages, userMessage];
    setMessages(updatedConversation);
    setInput("");
    setShowQuickReplies(false);

    await handleAIResponse(textToSend, updatedConversation);
  };

  return (
    <div
      className={
        isMobile && isOpen
          ? "fixed inset-0 z-50 flex items-stretch justify-stretch bg-background"
          : "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-end gap-3"
      }
    >
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
                : "w-[calc(100vw-2rem)] max-w-[28rem] h-[70vh] max-h-[40rem] sm:h-[34rem] lg:h-[40rem] bg-card border-primary/20 shadow-lg flex flex-col relative"
            }
          >
            <div
              className={`bg-primary text-primary-foreground p-4 flex items-center justify-between ${
                isMobile ? "" : "rounded-t-lg"
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <img
                  src={chatbotIcon}
                  alt="Chatbot"
                  className="w-9 h-9 sm:w-10 sm:h-10 mt-0.5 shrink-0 object-cover rounded-full"
                />
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="font-bold text-base sm:text-lg">Moruf</span>
                  <span className="text-[12px] sm:text-[13px] font-semibold opacity-95 leading-snug break-words">
                    AI Automation Engineer & Full-Stack Developer
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowResetModal(true)}
                  className="hover:bg-primary/80 p-1 rounded transition-colors"
                  title="New conversation"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCloseChat}
                  className="hover:bg-primary/80 p-1 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

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
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
            <div className="flex items-center justify-center gap-1.5 py-1.5 border-t border-border/50 bg-background">
              <img
                src="/kmgmedia-logo.png"
                alt="KmgMedia"
                className="h-4 w-4 shrink-0 object-contain"
              />
              <span className="text-[10px] text-muted-foreground">
                Powered by KmgMedia
              </span>
            </div>

            {showResetModal && (
              <div className="absolute inset-0 flex items-end justify-center z-50">
                <div
                  className="absolute inset-0 bg-black/20"
                  onClick={() => setShowResetModal(false)}
                />
                <div className="relative w-full bg-background rounded-t-2xl shadow-xl px-6 pt-5 pb-8">
                  <p className="text-center text-sm font-semibold text-foreground mb-4">
                    Create New Conversation
                  </p>
                  <button
                    onClick={handleNewConversation}
                    className="w-full py-3 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors mb-2"
                  >
                    New conversation
                  </button>
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="w-full py-3 rounded-xl text-foreground font-medium text-sm hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Card>
        ) : (
          <Button
            onClick={handleOpenChat}
            size="icon"
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center"
          >
            <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 shrink-0">
              <img
                src={chatbotIcon}
                alt="Chatbot"
                className="w-full h-full object-contain rounded-full"
              />
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
