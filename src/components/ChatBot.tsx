import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Custom Pen Icon Component - Bold & Solid
const PenIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Solid pen nib shape */}
    <path d="M 12 2 L 15 10 L 12 12 L 9 10 Z" fill="currentColor" />
    {/* Pen shaft - thick vertical bar */}
    <rect x="10.5" y="12" width="3" height="10" fill="currentColor" />
    {/* Pen tip - thick triangle */}
    <path d="M 9 22 L 15 22 L 12 20 Z" fill="currentColor" />
  </svg>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromoCard, setShowPromoCard] = useState(false);
  const [promoCardClosed, setPromoCardClosed] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "bot"; text: string }>
  >([
    {
      role: "bot",
      text: "Hi! I'm Moruf. I help design AI automation systems, build intelligent workflows, and create custom solutions that scale. What project can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show promotional card after 3 seconds initially
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPromoCard(true);
        setPromoCardClosed(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Reshow promo card every 20 seconds after it's closed
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
    setPromoCardClosed(false);
  };

  const handleClosePromo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPromoCard(false);
    setPromoCardClosed(true);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response after 3 seconds (typing effect)
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Thanks for your message! Feel free to share more details about your project, and I'll get back to you soon.",
        },
      ]);
    }, 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {/* Promotional Message Card - Small and Clickable */}
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

      {/* Chat Widget Container */}
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
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
                onClick={handleSend}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <Button
              onClick={handleOpenChat}
              size="lg"
              className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center relative"
            >
              <PenIcon className="w-8 h-8" />
              {/* Red Badge with "1" */}
              {(showPromoCard || promoCardClosed) && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">1</span>
                </div>
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
