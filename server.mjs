import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import { Resend } from "resend";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json({ limit: "1mb" }));

// Basic CORS for local dev
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  return next();
});

dotenv.config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

app.post("/api/chatbot-response", async (req, res) => {
  try {
    const { message, systemPrompt, conversationHistory } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const messages = [];

    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }

    if (Array.isArray(conversationHistory)) {
      messages.push(...conversationHistory);
    }

    messages.push({ role: "user", content: message });

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages,
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
    if (error instanceof Error) {
      console.error("OpenAI API error:", error.message);
    } else {
      console.error("OpenAI API error: Unknown error");
    }
    return res.status(500).json({
      error: "Failed to generate response",
      success: false,
    });
  }
});

const resend = new Resend(process.env.RESEND_API_KEY);
const YOUR_EMAIL = "morufbadebola@gmail.com";

app.post("/api/lead", async (req, res) => {
  try {
    const { name, email, projectType, description, intent, messages } =
      req.body || {};

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "Missing required fields (name, email)" });
    }

    const intentLabel =
      {
        client: "Potential Client",
        recruiter: "Recruiter/Hiring Manager",
        browsing: "Portfolio Browser",
      }[intent] || "Unknown";

    const projectTypeLabel =
      {
        automation: "Automation System",
        api_integration: "API Integration",
        web_app: "Web Application",
        web_system: "Web System",
        recruiting: "Job/Recruiting",
        not_sure: "Not Sure Yet",
      }[projectType] || projectType;

    const conversationHistory = messages
      ? messages
          .map((msg) => `${String(msg.role).toUpperCase()}: ${msg.text}`)
          .join("\n\n")
      : "No conversation history";

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: YOUR_EMAIL,
      subject: `🚀 New Lead: ${name} (${intentLabel})`,
      html: `
        <h2 style="color: #000;">New Chatbot Lead</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Lead Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Intent:</strong> ${intentLabel}</p>
          <p><strong>Project Type:</strong> ${projectTypeLabel}</p>
          <p><strong>Description:</strong> ${description || "Not provided"}</p>
          <p><strong>Source:</strong> Chatbot</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Conversation History</h3>
          <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; font-size: 12px;">
${conversationHistory}
          </pre>
        </div>
      `,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <h2>Hey ${name} 👋</h2>
        <p>I've received your information and I'm already thinking about your project.</p>
        <h3>What happens next:</h3>
        <ol>
          <li>I'll review our chat and your project details</li>
          <li>I'll send you a calendar link to book a 20-30 min discovery call</li>
          <li>During our call, we'll explore your vision and map out the best solution</li>
        </ol>
        <p><strong>If this is urgent,</strong> feel free to reach out directly at <a href="mailto:morufbadebola@gmail.com">morufbadebola@gmail.com</a></p>
        <p style="margin-top: 30px; color: #666;">Looking forward to connecting!<br/><strong>Moruf</strong></p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Lead captured successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error processing lead:", error.message);
    } else {
      console.error("Error processing lead: Unknown error");
    }
    return res.status(500).json({
      error: "Failed to process lead",
      success: false,
    });
  }
});

app.post("/api/book-call", async (req, res) => {
  try {
    const { name, email, projectType, description } = req.body || {};

    if (!name || !email || !projectType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: YOUR_EMAIL,
      subject: `New Call Booking: ${name}`,
      html: `
        <h2>New Call Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Description:</strong> ${description || "Not provided"}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        <hr />
        <p><strong>Next steps:</strong> Reply to this email or contact ${email} to schedule the call.</p>
      `,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <h2>Thanks for reaching out, ${name}!</h2>
        <p>I've received your information and I'm already thinking about your project.</p>
        <h3>What happens next:</h3>
        <ol>
          <li>I'll review your project details and goals</li>
          <li>I'll send you a calendar link to book our 20-30 minute discovery call</li>
          <li>During our call, we'll explore your vision and discuss how I can help</li>
        </ol>
        <p>If this is urgent, feel free to reach out directly at morufbadebola@gmail.com</p>
        <p>Looking forward to connecting!</p>
        <p>Moruf</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Submission received successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending email:", error.message);
    } else {
      console.error("Error sending email: Unknown error");
    }
    return res.status(500).json({
      error: "Failed to process submission",
      success: false,
    });
  }
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
