const KmgMediaLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Orange rounded square — sits at the K's notch, behind the stem */}
    <rect x="10" y="37" width="26" height="26" rx="5" fill="#F4A323" />
    {/* K left stem — top portion (above notch) */}
    <rect x="13" y="10" width="20" height="27" fill="#2B2A6E" />
    {/* K left stem — bottom portion (below notch) */}
    <rect x="13" y="63" width="20" height="27" fill="#2B2A6E" />
    {/* Covers the right side of the orange square (K stem edge) */}
    <rect x="27" y="37" width="6" height="26" fill="#2B2A6E" />
    {/* K upper arm */}
    <polygon points="33,10 87,10 33,47" fill="#2B2A6E" />
    {/* K lower arm */}
    <polygon points="33,53 87,90 33,90" fill="#2B2A6E" />
  </svg>
);

export default KmgMediaLogo;
