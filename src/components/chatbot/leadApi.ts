import { toast } from "sonner";
import type { LeadData } from "@/lib/chatbot/types";

export const sendLeadToAPI = async (
  apiBase: string,
  leadData: LeadData,
): Promise<boolean> => {
  try {
    const response = await fetch(`${apiBase}/api/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });

    if (response.ok) {
      toast.success("Details captured! Check your email for next steps.");
      return true;
    }

    toast.error("Failed to capture details");
    return false;
  } catch (error) {
    console.error("Error sending lead data:", error);
    toast.error("Failed to capture details");
    return false;
  }
};
