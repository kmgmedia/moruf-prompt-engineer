// Lead step helpers
import { ConversationState } from "../types/chatTypes";
import { LeadCaptureStep } from "../types/chatTypes";

export const getNextLeadCaptureStep = (
  capturedData: ConversationState["capturedData"],
): LeadCaptureStep => {
  if (!capturedData.name) {
    return "name";
  }
  if (!capturedData.email) {
    return "email";
  }
  if (!capturedData.projectType) {
    return "project_type";
  }
  if (!capturedData.problem) {
    return "description";
  }
  return "complete";
};
