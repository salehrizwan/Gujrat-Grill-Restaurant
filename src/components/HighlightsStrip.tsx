import {
  ShoppingBag,
  Sparkles,
  Trees,
  Truck,
  Users,
  Utensils,
} from 'lucide-react';
import { RESTAURANT_HIGHLIGHTS } from '../data/restaurantData';
import { Reveal } from './Reveal';

const HIGHLIGHT_ICONS = {
  'dine-in': Utensils,
  takeaway: ShoppingBag,
  delivery: Truck,
  outdoor: Trees,
  gatherings: Users,
} as const;

export function HighlightsStrip() {
  return (
    <section
      aria-label="Restaurant Highlights"
      className="bg-[#FAF7F0] border-y border-[#C6A052]/35"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#C6A052]/30">
          {RESTAURANT_HIGHLIGHTS.map((item, idx) => {
            const Icon =
              HIGHLIGHT_ICONS[item.id as keyof typeof HIGHLIGHT_ICONS] ?? Sparkles;
            return (
              <Reveal
                key={item.id}
                delayMs={idx * 50}
                className="group flex flex-col gap-2 py-4 sm:py-2 sm:px-5 first:sm:pl-0 last:sm:pr-0"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className="w-5 h-5 text-[#762B35] shrink-0 transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <h2 className="font-editorial text-xl font-semibold text-[#25201D] leading-snug">
                    {item.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#392D28]/80 leading-relaxed pl-8">
                  {item.subtitle}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
