/**
 * API endpoint for OpenAI chatbot responses
 * Path: /api/chatbot-response
 * Method: POST
 *
 * Usage:
 * POST /api/chatbot-response
 * Body: {
 *   "message": "user message",
 *   "systemPrompt": "optional system prompt"
 * }
 */

import { OpenAI } from "openai";
import { VercelRequest, VercelResponse } from "@vercel/node";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, systemPrompt, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const messages = [];

    // Add system prompt if provided
    if (systemPrompt) {
      messages.push({
        role: "system",
        content: systemPrompt,
      });
    }

    // Add conversation history if provided
    if (Array.isArray(conversationHistory)) {
      messages.push(...conversationHistory);
    }

    // Add user message
    messages.push({
      role: "user",
      content: message,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: messages as Array<{
        role: "system" | "user" | "assistant";
        content: string;
      }>,
      temperature: 0.7,
      max_tokens: 500,
    });

    const botResponse =
      response.choices[0]?.message?.content ||
      "I couldn't generate a response.";

    return res.status(200).json({
      success: true,
      response: botResponse,
      usage: {
        promptTokens: response.usage?.prompt_tokens,
        completionTokens: response.usage?.completion_tokens,
        totalTokens: response.usage?.total_tokens,
      },
    });
  } catch (error) {
    // Log error safely without exposing sensitive data
    if (error instanceof Error) {
      console.error("OpenAI API error:", error.message);
    } else {
      console.error("OpenAI API error: Unknown error");
    }

    // Never expose error details to client (might contain sensitive info)
    return res.status(500).json({
      error: "Failed to generate response",
      success: false,
    });
  }
}
