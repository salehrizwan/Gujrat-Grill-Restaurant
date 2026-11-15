import { ArrowRight, CalendarHeart, Trees, Users, Utensils } from 'lucide-react';
import {
  AMBIENCE_FALLBACK_IMAGE,
  GOLDEN_HOUR_EXTERIOR_PHOTO,
  ORIGINAL_EXTERIOR_PHOTO,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface SpecialDiningSectionProps {
  onInquireEvents: () => void;
  onBookOutdoor: () => void;
}

const EXPERIENCE_PILLARS = [
  {
    icon: Users,
    title: 'Family Gatherings',
    detail:
      'Welcoming dining spaces suited for weekend dinners, milestones, and multi-generational family meals.',
  },
  {
    icon: Trees,
    title: 'Outdoor Garden Dining',
    detail:
      'Dine along our manicured green lawns, curved brick walkways, and calm open-air seating.',
  },
  {
    icon: Utensils,
    title: 'Friends Meetups',
    detail:
      'Relaxed evening ambiance with fresh grill platters, karahi, and refreshing Mint Margheritas.',
  },
  {
    icon: CalendarHeart,
    title: 'Marriage Halls & Events',
    detail:
      'Dedicated marriage hall facilities in Gujrat — contact our management team directly for dates and arrangements.',
  },
];

export function SpecialDiningSection({
  onInquireEvents,
  onBookOutdoor,
}: SpecialDiningSectionProps) {
  return (
    <section className="py-20 sm:py-28 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <Reveal className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-[#D6A43B] tracking-wide mb-3">
                Dining &amp; Celebrations
              </p>
              <h2
                className="font-editorial text-3xl sm:text-5xl font-semibold text-[#F5F1E8] leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                Crafted for Gatherings, Evenings &amp; Celebrations
              </h2>
              <p className="mt-4 text-base text-[#F5F1E8]/75 leading-relaxed">
                From quiet outdoor dinners to family celebrations and marriage
                hall events, every visit is tailored around comfort, courtesy,
                and memorable hospitality.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {EXPERIENCE_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="p-5 bg-[#151515] border border-[#F5F1E8]/10 rounded-sm"
                    >
                      <Icon
                        className="w-5 h-5 text-[#D6A43B] mb-3"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <h3 className="font-editorial text-xl font-semibold text-[#F5F1E8]">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#F5F1E8]/70 leading-relaxed">
                        {pillar.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onInquireEvents}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0B0B0B] bg-[#D6A43B] hover:bg-[#e2b554] rounded-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Inquire for Marriage Halls &amp; Events</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onBookOutdoor}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#F5F1E8] border border-[#F5F1E8]/25 hover:border-[#D6A43B] rounded-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Reserve Outdoor Seating</span>
              </button>
            </div>
          </Reveal>

          {/* Right Paired Visual Showcase */}
          <Reveal
            delayMs={80}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5"
          >
            <div className="relative min-h-[240px] rounded-sm overflow-hidden border border-[#F5F1E8]/12 bg-[#151515]">
              <ResilientImage
                src={GOLDEN_HOUR_EXTERIOR_PHOTO}
                fallbackSrc={ORIGINAL_EXTERIOR_PHOTO}
                alt="Outdoor garden seating and landscaped walkways at Gujrat Grill & Marriage Halls"
                className="w-full h-full object-cover object-[20%_70%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-transparent to-transparent"
              />
              <p className="absolute bottom-4 left-5 right-5 text-xs text-[#F5F1E8]/85">
                Outdoor Lawn &amp; Garden Walkways — Gujrat Grill
              </p>
            </div>

            <div className="relative min-h-[240px] rounded-sm overflow-hidden border border-[#F5F1E8]/12 bg-[#151515]">
              <ResilientImage
                src={AMBIENCE_FALLBACK_IMAGE}
                alt="Sample evening family table setting — illustrative ambience placeholder"
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-transparent to-transparent"
              />
              <p className="absolute bottom-4 left-5 right-5 text-xs text-[#F5F1E8]/85">
                Family Dining &amp; Hospitality — Illustrative Table Setting Preview
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
