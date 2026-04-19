import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  ConversationState,
  Message,
  LeadData,
  INITIAL_CONVERSATION_STATE,
  STORAGE_KEY,
  MESSAGES_STORAGE_KEY,
} from "@/lib/chatbot/types";
import {
  analyzeMessage,
  shouldTriggerCTA,
  determineNextStage,
} from "@/lib/chatbot/intents";
import { generateBotResponse, getCTAVariation } from "@/lib/chatbot/flows";

const PenIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 12 2 L 15 10 L 12 12 L 9 10 Z" fill="currentColor" />
    <rect x="10.5" y="12" width="3" height="10" fill="currentColor" />
    <path d="M 9 22 L 15 22 L 12 20 Z" fill="currentColor" />
  </svg>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromoCard, setShowPromoCard] = useState(false);
  const [promoCardClosed, setPromoCardClosed] = useState(false);

  // Load state from localStorage with fallback
  const [state, setState] = useState<ConversationState>(() => {
    if (typeof window === "undefined") return INITIAL_CONVERSATION_STATE;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CONVERSATION_STATE,
          ...parsed,
          lastActivityAt: new Date(),
        };
      }
    } catch (error) {
      console.error("Failed to load chatbot state:", error);
    }
    return INITIAL_CONVERSATION_STATE;
  });

  // Load messages from localStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }

    return [
      {
        role: "bot",
        text: "Hey! 👋 I'm Moruf.\n\nI build AI systems, automation workflows, and full-stack solutions that help businesses run more efficiently.\n\nWhat are you looking to do right now?",
        timestamp: new Date(),
        messageId: `msg_${Date.now()}`,
      },
    ];
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "Build or automate something",
    "Learn more about my work",
    "Hiring / job opportunity",
    "Just exploring",
  ]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persist state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  // Persist messages to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Show promo card
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPromoCard(true);
        setPromoCardClosed(false);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Reshow promo
  useEffect(() => {
    if (promoCardClosed && !isOpen) {
      const timer = setTimeout(() => {
        setShowPromoCard(true);
        setPromoCardClosed(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [promoCardClosed, isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowPromoCard(false);
  };

  const handleClosePromo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPromoCard(false);
    setPromoCardClosed(true);
  };

  // Send lead data to API
  const sendLeadToAPI = useCallback(async (leadData: LeadData) => {
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        toast.success("✅ Details captured! Check your email for next steps.");
        setState((prev) => ({
          ...prev,
          leadCaptured: true,
        }));
        return true;
      } else {
        toast.error("Failed to capture details");
        return false;
      }
    } catch (error) {
      console.error("Error sending lead data:", error);
      toast.error("Failed to capture details");
      return false;
    }
  }, []);

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
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setShowQuickReplies(false);

    // Analyze message
    const analysis = analyzeMessage(textToSend);

    // Update state
    const newState: ConversationState = {
      ...state,
      userType: analysis.userType,
      intent: analysis.intent as any,
      messageCount: state.messageCount + 1,
      capturedData: {
        ...state.capturedData,
        ...analysis.extractedData,
      },
      stage: determineNextStage(
        state.stage,
        analysis.userType,
        state.messageCount + 1
      ) as any,
      ctaTriggered:
        state.ctaTriggered ||
        shouldTriggerCTA(
          state.messageCount + 1,
          analysis.userType,
          !!state.capturedData.problem
        ),
      lastActivityAt: new Date(),
    };

    setState(newState);

    // Show typing
    setIsTyping(true);

    // Generate response
    setTimeout(async () => {
      setIsTyping(false);

      const botResponse = generateBotResponse(
        textToSend,
        analysis.userType,
        newState.messageCount,
        newState.capturedData
      );

      const botMessage: Message = {
        role: "bot",
        text: botResponse.text,
        timestamp: new Date(),
        messageId: `msg_${Date.now()}_bot`,
      };

      setMessages((prev) => [...prev, botMessage]);

      if (botResponse.quickReplies) {
        setQuickReplies(botResponse.quickReplies);
        setShowQuickReplies(true);
      }

      // Capture lead if conditions met
      if (
        botResponse.shouldCaptureLead &&
        newState.capturedData.name &&
        newState.capturedData.email
      ) {
        const leadData: LeadData = {
          name: newState.capturedData.name,
          email: newState.capturedData.email,
          projectType: newState.capturedData.projectType || "not_sure",
          description:
            newState.capturedData.problem || "To be discussed on call",
          intent:
            newState.userType === "recruiter"
              ? "recruiter"
              : newState.userType === "client"
                ? "client"
                : "browsing",
          source: "chatbot",
          sessionId: newState.sessionId,
          conversationDuration: Math.round(
            (new Date().getTime() - newState.startedAt.getTime()) / 1000
          ),
          messageCount: newState.messageCount,
          messages: newMessages.map((m) => ({
            role: m.role,
            text: m.text,
            timestamp: m.timestamp,
          })),
        };

        await sendLeadToAPI(leadData);
      }

      // Show CTA if triggered
      if (newState.ctaTriggered && !state.ctaTriggered) {
        setTimeout(() => {
          const ctaIndex = Math.floor(Math.random() * 5);
          const cta = getCTAVariation(ctaIndex);

          const ctaMessage: Message = {
            role: "bot",
            text: cta,
            timestamp: new Date(),
            messageId: `msg_${Date.now()}_cta`,
          };

          setMessages((prev) => [...prev, ctaMessage]);
        }, 1500);
      }
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
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

      {/* Chat Widget */}
      <div className="relative">
        {isOpen ? (
          <Card className="w-80 h-96 bg-card border-primary/20 shadow-lg flex flex-col">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PenIcon className="w-5 h-5" />
                <span className="font-semibold">Moruf</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary/80 p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={msg.messageId || idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                    title={msg.timestamp.toLocaleTimeString()}
                  >
                    {msg.text}
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

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-sm"
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
            size="lg"
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center"
          >
            <PenIcon className="w-8 h-8" />
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
