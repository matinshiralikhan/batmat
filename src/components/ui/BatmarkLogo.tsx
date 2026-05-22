export function BatSVG({
  className = "",
  width = 120,
}: {
  className?: string;
  width?: number;
}) {
  const height = Math.round(width * 0.63);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 76"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M60 36 L44 28 L22 30 L4 22 L0 28 L6 38 L20 36 L32 44 L44 40 L52 52 L60 56 L68 52 L76 40 L88 44 L100 36 L114 38 L120 28 L116 22 L98 30 L76 28 Z" />
      <polygon points="50,28 55,12 62,26" />
      <polygon points="70,28 65,12 58,26" />
    </svg>
  );
}

export default function BatmarkLogo({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "default" | "large" | "small";
}) {
  const textSize =
    size === "large"
      ? "text-4xl tracking-[0.3em]"
      : size === "small"
        ? "text-sm tracking-[0.2em]"
        : "text-lg tracking-[0.25em]";

  const batWidth = size === "large" ? 48 : size === "small" ? 24 : 32;

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <BatSVG width={batWidth} className="text-bat-red flex-shrink-0" />
      <span
        className={`font-display ${textSize} text-bat-white group-hover:text-bat-red transition-colors duration-200 select-none`}
      >
        BATMAT
      </span>
    </div>
  );
}
