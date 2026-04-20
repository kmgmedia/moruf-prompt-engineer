import { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const YOUR_EMAIL = "morufbadebola@gmail.com";
const CRM_WEBHOOK_URL =
  process.env.CRM_WEBHOOK_URL ||
  process.env.N8N_LEAD_WEBHOOK_URL ||
  process.env.N8N_WEBHOOK_URL ||
  "";
const APP_BASE_URL = (process.env.APP_BASE_URL || "").replace(/\/+$/, "");
const BOOK_CALL_URL =
  process.env.BOOK_CALL_URL ||
  (APP_BASE_URL ? `${APP_BASE_URL}/book-call` : "/book-call");

type LeadStatus = "new_lead" | "booked" | "closed" | "lost";
type LeadSource = "chatbot" | "book_call_form";

interface LeadData {
  name: string;
  email: string;
  projectType:
    | "automation"
    | "api_integration"
    | "web_app"
    | "web_system"
    | "recruiting"
    | "not_sure";
  description?: string;
  intent: "client" | "recruiter" | "browsing";
  source: LeadSource;
  status?: LeadStatus;
  sessionId?: string;
  conversationDuration?: number;
  messageCount?: number;
  messages?: Array<{ role: string; text: string; timestamp?: string | Date }>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      projectType,
      description,
      intent,
      source,
      status,
      sessionId,
      conversationDuration,
      messageCount,
      messages,
    }: LeadData = req.body;

    const normalizedStatus: LeadStatus = status || "new_lead";
    const normalizedSource: LeadSource = source || "chatbot";

    // Validate required fields
    if (!name || !email || !projectType) {
      return res
        .status(400)
        .json({ error: "Missing required fields (name, email, projectType)" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ error: "Invalid email address" });
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

    const statusLabel =
      {
        new_lead: "New Lead",
        booked: "Booked",
        closed: "Closed",
        lost: "Lost",
      }[normalizedStatus] || normalizedStatus;

    // Format conversation history
    const conversationHistory = messages
      ? messages
          .map((msg) => `${msg.role.toUpperCase()}: ${msg.text}`)
          .join("\n\n")
      : "No conversation history";

    const normalizedLead = {
      name,
      email: normalizedEmail,
      projectType,
      projectTypeLabel,
      description: description || "Not provided",
      intent,
      source: normalizedSource,
      status: normalizedStatus,
      sessionId: sessionId || `lead_${Date.now()}`,
      conversationDuration: conversationDuration || 0,
      messageCount: messageCount || messages?.length || 0,
      createdAt: new Date().toISOString(),
      tags: {
        source: normalizedSource,
        status: normalizedStatus,
      },
    };

    let crmSync = {
      attempted: false,
      success: false,
      error: "",
    };

    if (CRM_WEBHOOK_URL) {
      crmSync.attempted = true;
      try {
        const webhookResponse = await fetch(CRM_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "lead.created",
            lead: normalizedLead,
            automation: {
              immediateEmailSent: true,
              followUpRule: {
                type: "if_not_booked",
                waitHours: 24,
                reminderTemplate: "no_booking_24h",
              },
            },
          }),
        });

        if (!webhookResponse.ok) {
          throw new Error(
            `Webhook failed with status ${webhookResponse.status}`,
          );
        }

        crmSync.success = true;
      } catch (webhookError) {
        crmSync.error =
          webhookError instanceof Error
            ? webhookError.message
            : "Unknown webhook error";
        console.error("CRM webhook error:", crmSync.error);
      }
    }

    // Send email to yourself with the lead data
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
          <p><strong>Source:</strong> ${normalizedSource}</p>
          <p><strong>Status:</strong> ${statusLabel}</p>
          <p><strong>Session ID:</strong> ${normalizedLead.sessionId}</p>
          <p><strong>Conversation Duration:</strong> ${normalizedLead.conversationDuration}s</p>
          <p><strong>Message Count:</strong> ${normalizedLead.messageCount}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>CRM Sync:</strong> ${
            crmSync.attempted
              ? crmSync.success
                ? "Successful"
                : `Failed (${crmSync.error})`
              : "Not configured"
          }</p>
        </div>

        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Conversation History</h3>
          <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; font-size: 12px;">
${conversationHistory}
          </pre>
        </div>

        <div style="margin-top: 20px;">
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>Review the conversation to understand context</li>
            <li>Send calendar link to book a call</li>
            <li>Reply to ${email} directly</li>
          </ul>
        </div>
      `,
    });

    // Send confirmation email to the lead
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: normalizedEmail,
      subject: "Quick follow-up on your project",
      html: `
        <h2>Hey ${name} 👋</h2>
        
        <p>Got your request about <strong>${projectTypeLabel}</strong>.</p>

        <p>Looking forward to our call.</p>

        <p>If there's anything else you'd like me to review beforehand, feel free to reply here.</p>

        <p>You can book your discovery call any time at <a href="${BOOK_CALL_URL}">${BOOK_CALL_URL}</a>.</p>

        <p style="margin-top: 30px; color: #666;">
          — Moruf
          <br/>
          <span style="font-size: 12px; color: #999;">(If no booking is made, I may send one reminder within 24 hours.)</span>
        </p>

        <p style="margin-top: 20px; color: #666; font-size: 13px;">
          Need urgent help? Email <a href="mailto:morufbadebola@gmail.com">morufbadebola@gmail.com</a>
        </p>

        <p style="margin-top: 16px; color: #666;">
          <strong>Moruf</strong>
        </p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Lead captured successfully",
      crmSync,
      lead: normalizedLead,
    });
  } catch (error) {
    console.error("Error processing lead:", error);
    return res.status(500).json({
      error: "Failed to process lead",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
