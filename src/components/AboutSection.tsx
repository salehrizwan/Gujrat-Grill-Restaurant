import {
  ABOUT_WHATSAPP_EXTERIOR_PHOTO,
  GOLDEN_HOUR_EXTERIOR_PHOTO,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF7F0] border-y border-[#C6A052]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Authentic Exterior & Garden Photograph */}
          <Reveal className="lg:col-span-5 flex flex-col">
            <div className="relative w-full max-w-[430px] mx-auto aspect-[3/4.6] rounded-sm overflow-hidden border border-[#C6A052]/65 bg-[#25201D] shadow-sm">
              <ResilientImage
                src={ABOUT_WHATSAPP_EXTERIOR_PHOTO}
                fallbackSrc={GOLDEN_HOUR_EXTERIOR_PHOTO}
                alt="Gujrat Grill Restaurant front signboard with crest emblem and landscaped garden foliage"
                className="w-full h-full object-cover object-[50%_46%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#25201D]/90 via-[#25201D]/40 to-transparent"
              />
              <p className="absolute bottom-4 left-5 right-5 text-xs text-[#FAF7F0]/90">
                Gujrat Grill Restaurant — Exterior Signboard &amp; Garden, Gujrat
              </p>
            </div>
          </Reveal>

          {/* Editorial Copy */}
          <Reveal delayMs={80} className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-7 bg-[#C6A052]" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#762B35] tracking-wide">
                About Our Restaurant
              </p>
            </div>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-semibold text-[#25201D] leading-[1.1] mb-6"
              style={{ textWrap: 'balance' }}
            >
              More Than Just a Dining Experience
            </h2>

            <div className="space-y-4 text-base text-[#392D28]/90 leading-relaxed">
              <p>
                Set behind manicured green lawns and brick garden pathways in
                Gujrat, Gujrat Grill &amp; Marriage Halls brings together
                thoughtful hospitality, welcoming indoor seating, and serene
                open-air dining under one roof.
              </p>
              <p>
                From richly seasoned White Karahi and charcoal-fired Malai Boti
                to sizzling Chicken Fillet steaks and chilled Mint Margheritas,
                every plate is prepared for unhurried conversation around the
                table.
              </p>
              <p>
                Whether you are arriving for a quiet family dinner, catching up
                with friends on the garden lawn, or arranging takeaway and home
                delivery across the city, our team focuses on attentive, prompt
                service and a calm, pleasant atmosphere.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-[#C6A052]/35 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="font-editorial text-2xl font-semibold text-[#762B35]">
                  Indoor &amp; Lawn
                </p>
                <p className="mt-1 text-xs text-[#392D28]/78">
                  Quiet dining hall and landscaped garden seating
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl font-semibold text-[#762B35]">
                  Family Focused
                </p>
                <p className="mt-1 text-xs text-[#392D28]/78">
                  Comfortable environment for families and groups
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl font-semibold text-[#762B35]">
                  Prompt Service
                </p>
                <p className="mt-1 text-xs text-[#392D28]/78">
                  Welcoming hospitality for every visit
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
