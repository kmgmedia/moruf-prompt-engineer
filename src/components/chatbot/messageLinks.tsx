import type { ReactNode } from "react";
import {
  CHATBOT_PATH_CANDIDATE_REGEX,
  isAllowedChatbotPath,
} from "@/lib/chatbot/routes";

export const renderMessageWithLinks = (
  text: string,
  onNavigate: (path: string) => void,
): ReactNode[] => {
  const parts = text.split(CHATBOT_PATH_CANDIDATE_REGEX);

  return parts.map((part, idx) => {
    if (!isAllowedChatbotPath(part)) {
      return <span key={`msg_part_${idx}`}>{part}</span>;
    }

    return (
      <button
        key={`msg_link_${idx}_${part}`}
        onClick={() => onNavigate(part)}
        className="underline text-primary hover:text-primary/80 transition-colors"
        type="button"
      >
        {part}
      </button>
    );
  });
};
