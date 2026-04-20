const PenIcon = ({ className }: { className?: string }) => (
  <img
    src="/chatbot_7491509.png"
    alt="Chatbot icon"
    className={`${className ?? ""} object-contain`}
    draggable={false}
    loading="eager"
    decoding="async"
  />
);

export { PenIcon };
