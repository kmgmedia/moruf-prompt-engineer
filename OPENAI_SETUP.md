# OpenAI Integration Guide

Your project now has OpenAI fully integrated! Here's how to use it:

## ✅ Setup Complete

- ✓ OpenAI package installed
- ✓ API key configured in `.env.local` (backend only)
- ✓ Backend API endpoint ready (`/api/chatbot-response`)
- ✓ React Hook for easy integration (`use-ai-chatbot.ts`)

## 📚 What You Have

### 1. **Backend API** (`api/chatbot-response.ts`)

**Recommended** for production - keeps API key safe:

```typescript
const response = await fetch("/api/chatbot-response", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: "Your message here",
    systemPrompt: "Optional system prompt",
    conversationHistory: [], // Optional previous messages
  }),
});
```

### 2. **React Hook** (`src/hooks/use-ai-chatbot.ts`)

Easy integration in components:

```typescript
import { useAIChatbot } from "@/hooks/use-ai-chatbot";

const MyComponent = () => {
  const { getAIResponse, isLoading, error } = useAIChatbot({
    useOpenAI: true, // Toggle AI on/off
    systemPrompt: "You are helpful..." // Custom prompt
  });

  const handleMessage = async (message: string) => {
    const response = await getAIResponse(message);
    // Use response...
  };

  return (
    // Your JSX
  );
};
```

## 🚀 Integration Options

### Option A: Keep Current Rule-Based Chatbot (Zero Changes)

Your existing chatbot continues to work exactly as before. Add AI features gradually to specific components.

### Option B: Hybrid Mode (Recommended for Production)

Use rule-based flows for qualification, then AI for general questions:

```typescript
// In ChatBot.tsx component
const { getAIResponse, isLoading } = useAIChatbot({ useOpenAI: true });

const generateBotResponse = async (userMessage: string) => {
  // Try rule-based first
  const ruleResponse = generateBotResponseRules(userMessage);

  if (ruleResponse) return ruleResponse;

  // Fall back to AI if no rule matches
  return await getAIResponse(userMessage);
};
```

### Option C: Full AI Mode

Replace rule-based flows with pure AI responses for a more natural conversation.

## 🔑 Environment Variables

Your `.env.local` already has:

- `OPENAI_SECRET_KEY` - Backend API key (secure)
- `VITE_API_URL` - API endpoint

## ⚡ Quick Testing

Try the API directly in your terminal:

```bash
curl -X POST http://localhost:3001/api/chatbot-response \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What services do you offer?",
    "systemPrompt": "You are Moruf, an AI engineer"
  }'
```

## 🛡️ Security Notes

- ✓ Backend API keeps your key safe (recommended)
- ⚠️ Frontend library exposes key in browser (development only)
- Store keys in `.env.local` (never commit to git)

## 📝 Next Steps

1. **Test the API**: Restart your server and test the endpoint above
2. **Choose integration mode**: Hybrid or Full AI?
3. **Update ChatBot.tsx**: Add `useAIChatbot` hook and test with real users
4. **Monitor costs**: Check OpenAI usage dashboard regularly

## 🆘 Troubleshooting

**API key not working?**

- Verify `OPENAI_SECRET_KEY` is set in `.env.local`
- Restart your development server
- Check key permissions on OpenAI dashboard

**CORS errors?**

- This is normal for frontend-to-OpenAI calls
- Always use the backend API in production

**High costs?**

- Use `gpt-3.5-turbo` instead of `gpt-4-turbo` to save money
- Set `maxTokens: 250` for shorter responses

---

**Questions?** Check OpenAI docs: https://platform.openai.com/docs
