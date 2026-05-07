import type { ReactNode } from "react";
import {
  CHATBOT_PATH_CANDIDATE_REGEX,
  isAllowedChatbotPath,
} from "@/lib/chatbot/routes";

/**
 * Parse markdown bold syntax (**text**) and regular text into JSX elements
 */
const parseMarkdownBold = (text: string): ReactNode[] => {
  const boldRegex = /\*\*([^*]+)\*\*/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the bold match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the bold text
    parts.push(
      <strong key={`bold_${match.index}`} className="font-bold">
        {match[1]}
      </strong>,
    );

    lastIndex = boldRegex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

export const renderMessageWithLinks = (
  text: string,
  onNavigate: (path: string) => void,
): ReactNode[] => {
  const parts = text.split(CHATBOT_PATH_CANDIDATE_REGEX);

  return parts.map((part, idx) => {
    if (!isAllowedChatbotPath(part)) {
      // Parse markdown bold in regular text parts
      const boldParts = parseMarkdownBold(part);
      return (
        <span key={`msg_part_${idx}`}>
          {boldParts.map((boldPart, bidx) =>
            typeof boldPart === "string" ? (
              <span key={`msg_bold_${idx}_${bidx}`}>{boldPart}</span>
            ) : (
              boldPart
            ),
          )}
        </span>
      );
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
