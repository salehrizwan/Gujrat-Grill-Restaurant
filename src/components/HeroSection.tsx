import { ArrowRight, MapPin } from 'lucide-react';
import {
  GOLDEN_HOUR_EXTERIOR_PHOTO,
  ORIGINAL_EXTERIOR_PHOTO,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  location: string;
}

export function HeroSection({ location }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen w-full flex items-end pb-16 sm:pb-24 pt-28 overflow-hidden bg-[#25201D]"
    >
      {/* Full-bleed authentic exterior background preserving signboard red/gold lettering and golden-hour light */}
      <div className="absolute inset-0">
        <ResilientImage
          src={GOLDEN_HOUR_EXTERIOR_PHOTO}
          fallbackSrc={ORIGINAL_EXTERIOR_PHOTO}
          alt="Gujrat Grill & Marriage Halls building exterior and manicured front garden at golden hour in Gujrat, Pakistan"
          loading="eager"
          className="w-full h-full object-cover object-center scale-[1.01]"
        />
        {/* Subtle bottom-weighted charcoal overlay keeping signboard crisp while ensuring legible text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#25201D]/92 via-[#25201D]/28 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 66% 58% at 22% 84%, rgba(37, 32, 29, 0.88) 0%, rgba(37, 32, 29, 0.45) 58%, transparent 100%)',
          }}
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Unboxed Location Indicator (Zero-Pill Rule) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#C6A052] font-medium tracking-wide mb-5">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{location}</span>
            </span>
            <span className="hidden sm:inline-block h-[1px] w-8 bg-[#C6A052]/70" aria-hidden="true" />
            <span className="text-[#FAF7F0]/90 font-normal whitespace-nowrap">
              Restaurant &amp; Marriage Halls
            </span>
          </div>

          <h1
            className="font-editorial text-[#FAF7F0] font-semibold leading-[1.06] tracking-tight mb-5"
            style={{
              fontSize: 'clamp(2.5rem, 4.8vw, 4.25rem)',
              textWrap: 'balance',
            }}
          >
            Experience the Taste of Excellence
          </h1>

          <p className="text-base sm:text-lg text-[#F3EBDD]/90 leading-relaxed max-w-xl mb-8">
            Discover delicious food, warm hospitality and a beautiful dining
            experience at Gujrat Grill.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-[#25201D] bg-[#C6A052] hover:bg-[#d3b066] active:scale-[0.98] transition-all duration-200 rounded-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7F0]"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-[#FAF7F0] border border-[#FAF7F0]/45 bg-[#25201D]/55 hover:bg-[#762B35] hover:border-[#C6A052] transition-all duration-200 rounded-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A052]"
            >
              <span>Discover Our Restaurant</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
