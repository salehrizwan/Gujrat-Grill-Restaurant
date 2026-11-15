interface BrandMarkProps {
  className?: string;
}

/**
 * Geometric lantern-arch emblem inspired directly by the raised crest
 * beside "GUJRAT GRILL & MARRIAGE HALLS" on the restaurant's exterior signboard.
 */
export function BrandMark({ className = 'w-7 h-7' }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 36 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M18 3L27 14V36H9V14L18 3Z"
        stroke="#D6A43B"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M18 8.5L23.5 15.5V31.5H12.5V15.5L18 8.5Z"
        fill="#D6A43B"
        fillOpacity="0.16"
        stroke="#D6A43B"
        strokeWidth="1.25"
      />
      <path
        d="M15 24.5C15 22.8431 16.3431 21.5 18 21.5C19.6569 21.5 21 22.8431 21 24.5V31.5H15V24.5Z"
        stroke="#F5F1E8"
        strokeWidth="1.25"
      />
      <circle cx="18" cy="16" r="1.75" fill="#D6A43B" />
    </svg>
  );
}
