// Utility functions for ChatBot

export const normalizeName = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  const cleaned = trimmed
    .replace(/^(my name is|name is|i am|i'm|im|this is|call me)\s+/i, "")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .trim();
  if (!cleaned || cleaned.length < 2) {
    return undefined;
  }
  return cleaned
    .split(/\s+/)
    .slice(0, 3)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

export const extractValidEmail = (value: string): string | undefined => {
  const match = value.trim().match(/([^\s@]+@[^\s@]+\.[^\s@]+)/i);
  if (!match?.[1]) {
    return undefined;
  }
  const candidate = match[1].toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate);
  return isValid ? candidate : undefined;
};

export const mapProjectTypeFromInput = (value: string): string | undefined => {
  const normalized = value.toLowerCase().trim();
  if (
    normalized.startsWith("1") ||
    normalized.includes("automation") ||
    normalized.includes("workflow")
  ) {
    return "automation";
  }
  if (
    normalized.startsWith("2") ||
    normalized.includes("api") ||
    normalized.includes("integration") ||
    normalized.includes("connect")
  ) {
    return "api_integration";
  }
  if (
    normalized.startsWith("3") ||
    normalized.includes("web app") ||
    normalized.includes("web") ||
    normalized.includes("app") ||
    normalized.includes("system")
  ) {
    return "web_app";
  }
  if (
    normalized.startsWith("4") ||
    normalized.includes("not sure") ||
    normalized.includes("unsure")
  ) {
    return "not_sure";
  }
  return undefined;
};
