import { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const YOUR_EMAIL = "morufbadebola@gmail.com";

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
  description: string;
  intent: "client" | "recruiter" | "browsing";
  source: "chatbot";
  messages?: Array<{ role: string; text: string }>;
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
      messages,
    }: LeadData = req.body;

    // Validate required fields
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

    // Format conversation history
    const conversationHistory = messages
      ? messages
          .map((msg: any) => `${msg.role.toUpperCase()}: ${msg.text}`)
          .join("\n\n")
      : "No conversation history";

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
          <p><strong>Source:</strong> Chatbot</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
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

        <p style="margin-top: 30px; color: #666;">
          Looking forward to connecting!<br/>
          <strong>Moruf</strong>
        </p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Lead captured successfully",
    });
  } catch (error) {
    console.error("Error processing lead:", error);
    return res.status(500).json({
      error: "Failed to process lead",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
