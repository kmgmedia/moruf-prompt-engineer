import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    style={{
      padding: "0.5em 1em",
      borderRadius: 4,
      border: "1px solid #ccc",
      background: "#f5f5f5",
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);
// ...existing code from src/components/ui/button.tsx
