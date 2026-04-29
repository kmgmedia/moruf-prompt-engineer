import React from "react";

export interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, style }) => (
  <div
    style={{
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      borderRadius: 8,
      background: "#fff",
      padding: 16,
      ...style,
    }}
  >
    {children}
  </div>
);
// ...existing code from src/components/ui/card.tsx
