/**
 * Hook for using OpenAI in the chatbot
 * Can be used alongside or instead of the rule-based flows
 */

import { useState, useCallback } from "react";

interface UseAIChatbotOptions {
  systemPrompt?: string;
  useOpenAI?: boolean;
  fallbackToRules?: boolean;
}

export const useAIChatbot = (options: UseAIChatbotOptions = {}) => {
  const {
    systemPrompt = `You are Moruf, an AI engineer and full-stack developer. You help businesses build and automate solutions. 
    You are friendly, professional, and focused on understanding the user's needs to recommend the best solution.
    Keep responses concise (under 150 words) and conversational.`,
    useOpenAI = false,
    fallbackToRules = true,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get AI response using the backend API
   */
  const getAIResponse = useCallback(
    async (
      userMessage: string,
      conversationHistory?: Array<{
        role: "user" | "assistant";
        content: string;
      }>,
    ): Promise<string | null> => {
      if (!useOpenAI) return null;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/chatbot-response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            systemPrompt,
            conversationHistory: conversationHistory || [],
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
          return data.response;
        } else {
          throw new Error(data.error || "Failed to generate response");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("AI chatbot error:", errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [useOpenAI, systemPrompt],
  );

  return {
    getAIResponse,
    isLoading,
    error,
  };
};

export default useAIChatbot;
