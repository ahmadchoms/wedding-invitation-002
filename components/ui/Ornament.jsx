export default function Ornament({ className = "", variant = "default" }) {
  if (variant === "minimal") {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <span className="block h-px w-12 bg-gold-pale" />
        <span className="block w-1 h-1 rounded-full bg-gold opacity-60" />
        <span className="block h-px w-12 bg-gold-pale" />
      </div>
    );
  }

  if (variant === "gold") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <span className="block h-px w-16 bg-gold opacity-60" />
        <svg
          viewBox="0 0 40 20"
          width="40"
          height="20"
          fill="none"
          className="text-gold opacity-70"
        >
          <path
            d="M1 10 Q10 2 20 10 Q30 18 39 10"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="none"
          />
          <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.5" />
        </svg>
        <span className="block h-px w-16 bg-gold opacity-60" />
      </div>
    );
  }

  // default: elegant floral ornament
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="block h-px flex-1 max-w-20 bg-gold-pale" />
      <svg
        viewBox="0 0 60 24"
        width="60"
        height="24"
        fill="none"
        className="text-gold shrink-0"
      >
        <path
          d="M30 4 C26 4 22 8 22 12 C22 16 26 20 30 20 C34 20 38 16 38 12 C38 8 34 4 30 4Z"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M2 12 L18 12"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.4"
        />
        <path
          d="M42 12 L58 12"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.4"
        />
        <circle cx="30" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
        <path
          d="M10 8 Q14 12 10 16"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M50 8 Q46 12 50 16"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
      </svg>
      <span className="block h-px flex-1 max-w-20 bg-gold-pale" />
    </div>
  );
}
