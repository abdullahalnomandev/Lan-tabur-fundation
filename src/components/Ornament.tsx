export function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2C2 2 40 2 55 17C70 32 70 55 70 55"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M2 18C2 18 24 18 34 28C44 38 44 55 44 55"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="70" cy="55" r="3.5" fill="currentColor" />
      <circle cx="44" cy="55" r="2" fill="currentColor" opacity="0.7" />
      <path
        d="M2 2L10 2M2 2L2 10"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function StarDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 16"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="8" x2="48" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M60 2L62.5 6.5L67 8L62.5 9.5L60 14L57.5 9.5L53 8L57.5 6.5Z"
        fill="currentColor"
      />
      <line x1="72" y1="8" x2="120" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
