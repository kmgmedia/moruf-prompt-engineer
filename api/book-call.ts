import { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const YOUR_EMAIL = "morufbadebola@gmail.com";

interface BookCallFormData {
  name: string;
  email: string;
  projectType: string;
  description: string;
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
    const { name, email, projectType, description }: BookCallFormData =
      req.body;

    // Validate required fields
    if (!name || !email || !projectType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Send email to yourself with the form data
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

    // Send confirmation email to the customer
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
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: "Failed to process submission",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
