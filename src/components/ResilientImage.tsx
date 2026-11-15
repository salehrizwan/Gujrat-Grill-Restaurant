import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  loading = 'lazy',
  fallbackLabel,
}: ResilientImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1A1814] via-[#121212] to-[#0B0B0B] text-[#F5F1E8]/70 p-6 text-center ${className}`}
      >
        <UtensilsCrossed className="w-7 h-7 text-[#D6A43B]/70" strokeWidth={1.5} aria-hidden="true" />
        <span className="font-editorial text-lg text-[#F5F1E8]/85">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
}
