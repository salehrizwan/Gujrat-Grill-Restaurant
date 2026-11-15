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
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#392D28] via-[#2D2420] to-[#25201D] text-[#F3EBDD]/80 p-6 text-center ${className}`}
      >
        <UtensilsCrossed className="w-7 h-7 text-[#C6A052]/80" strokeWidth={1.5} aria-hidden="true" />
        <span className="font-editorial text-lg text-[#FAF7F0]">
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
