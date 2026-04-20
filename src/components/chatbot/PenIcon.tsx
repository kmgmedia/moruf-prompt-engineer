const PenIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 12 2 L 15 10 L 12 12 L 9 10 Z" fill="currentColor" />
    <rect x="10.5" y="12" width="3" height="10" fill="currentColor" />
    <path d="M 9 22 L 15 22 L 12 20 Z" fill="currentColor" />
  </svg>
);

export { PenIcon };
