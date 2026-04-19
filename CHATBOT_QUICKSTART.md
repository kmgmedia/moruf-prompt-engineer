# Quick Start: Test Your Chatbot Locally

## ⚡ TL;DR Setup (5 minutes)

### 1. Start Development Server
```bash
cd "d:\MyPersonal Software Development\moruf-prompt-engineer-portfolio-main"
npm run dev
```

### 2. Open in Browser
```
http://localhost:5173
```

### 3. Click the Pen Icon (Bottom Right)
The chatbot widget will appear in the bottom right corner of your portfolio.

### 4. Start Chatting

---

## 🧪 Test Scenarios

### **Scenario 1: Client Lead** ✅
```
You: "I want to build an automation system"
Bot: [Asks about project]

You: "We manually process a lot of data and it takes forever"
Bot: [Asks about challenge]

You: "Yes, I'd like to book a call"
Bot: [Asks for name, email, project type]
→ Lead captured! Email sent to morufbadebola@gmail.com
```

### **Scenario 2: Recruiter** ✅
```
You: "Are you hiring?"
Bot: [Shares background & tech stack]

You: "Backend engineering"
Bot: [CTA with resume/projects/booking options]
→ Lead captured as recruiter
```

### **Scenario 3: Portfolio Explore** ✅
```
You: "Learn more about my work"
Bot: [Shows 4 areas]

You: "AI Workflow Automation"
Bot: [Explains that area]
```

### **Scenario 4: Technical Question** ✅
```
You: "How do you handle real-time data?"
Bot: [Answers question + pivots back]

You: "Yes, I'm working on something similar"
→ Conversation continues toward lead capture
```

---

## 📧 Verify Lead Capture

After completing a client flow:

1. **Check terminal** for any API errors
2. **Check your email** (morufbadebola@gmail.com) for lead notification
3. **Check logs** in browser console (F12 → Console tab)
4. **Look for toast notification** confirming "Details captured!"

---

## 🔍 What to Look For

✅ **Good Signs**
- Chatbot responds contextually to your messages
- Chatbot asks follow-up questions (not just echoing)
- When you select "Build something", flow changes vs "Hiring"
- Quick reply buttons appear and work
- Typing indicator shows while bot "thinks"
- Lead data successfully sent to email

❌ **Issues to Watch**
- Generic responses ("Thanks for your message")
- Errors in browser console (F12)
- Form submission failing silently
- Chatbot not remembering previous context
- Email not sending (check .env.local for RESEND_API_KEY)

---

## 🐛 Troubleshooting

### "Chatbot not showing"
- Make sure dev server is running
- Check browser console (F12) for errors
- Clear browser cache (Ctrl+Shift+Delete)

### "Email not sending"
- Verify `RESEND_API_KEY` in `.env.local`
- Check Resend dashboard for API key validity
- Look for "Failed to capture details" toast

### "Quick replies not appearing"
- Chatbot needs to be open (click pen icon)
- Wait for bot typing animation to finish
- Refresh page if stuck

### "Build errors"
```bash
# Clean install
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
npm install
npm run build
```

---

## 📝 Test Cases

Copy-paste these for quick testing:

**Client Funnel Test:**
```
1. Click: "Build or automate something"
2. Type: "I need to connect Shopify to our CRM"
3. Type: "Manual data sync, very time-consuming"
4. Click: "Yes, let's book a call"
5. Type: "Jane Doe"
6. Type: "jane@company.com"
7. Select: "API / Integration"
→ CHECK EMAIL FOR LEAD NOTIFICATION
```

**Recruiter Test:**
```
1. Click: "Hiring / job opportunity"
2. Type: "Backend engineer"
3. Click: "Book a quick call"
→ CHECK EMAIL FOR RECRUITER LEAD
```

**Browser Test:**
```
1. Click: "Just exploring"
2. Type: "Tell me your tech stack"
3. Type: "Show me examples"
→ NO EMAIL EXPECTED (browsing mode)
```

---

## 🎯 Expected Behavior

| Flow | Trigger | Action | Email Sent |
|------|---------|--------|-----------|
| Client | "Build something" | Qualify → Position → CTA | ✅ Yes |
| Recruiter | "Hiring" | Background → CTA | ✅ Yes |
| Portfolio | "Learn more" | Educate about work | ❌ No |
| Browser | "Exploring" | Helpful but no push | ❌ No |
| Technical | "How do you..." | Answer + pivot | ✅ Maybe |

---

## 💻 Commands Reference

```bash
# Start dev server
npm run dev

# Build production
npm run build

# Check for errors
npm run lint

# Test API locally (using curl)
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "projectType":"automation",
    "description":"Test lead",
    "intent":"client",
    "source":"chatbot"
  }'
```

---

## 🎬 Live Demo Flow (2 minutes)

1. Open http://localhost:5173
2. Click pen icon (bottom right)
3. See greeting: "Hey! 👋 I'm Moruf..."
4. Click "Build or automate something"
5. Type: "Automate my workflow"
6. Observe bot asking qualification questions
7. Provide short answers (5 messages)
8. See CTA appear: "Want to book a call?"
9. Say "yes"
10. Bot asks for name/email
11. Provide details
12. **✅ Lead captured!** Check email

---

## 📊 Monitoring

**In Console (F12):**
```javascript
// Check for errors
console.log("Chatbot loaded")

// Monitor API calls
fetch("/api/lead", {...})
  .then(r => r.json())
  .then(d => console.log("Lead sent:", d))
```

---

## ✅ Final Checklist Before Going Live

- [x] Chatbot appears on page load
- [x] Greeting message displays
- [x] Quick reply buttons work
- [x] Intent detection working (try different first responses)
- [x] Lead capture flow completes
- [x] Email received with lead data
- [x] Confirmation email sent to test email
- [x] No console errors
- [x] Mobile responsive (test on phone)
- [x] Build passes (`npm run build`)

---

**🚀 Ready to deploy!** Your chatbot is converting visitors to qualified leads.

Need help? Check `CHATBOT_SYSTEM.md` for detailed documentation.
