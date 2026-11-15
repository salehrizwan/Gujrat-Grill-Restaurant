import {
  ABOUT_WHATSAPP_EXTERIOR_PHOTO,
  GOLDEN_HOUR_EXTERIOR_PHOTO,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#151515] border-y border-[#F5F1E8]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Authentic Exterior & Garden Photograph */}
          <Reveal className="lg:col-span-5 flex flex-col">
            <div className="relative w-full max-w-[430px] mx-auto aspect-[3/4.6] rounded-sm overflow-hidden border border-[#D6A43B]/25 bg-[#0B0B0B]">
              <ResilientImage
                src={ABOUT_WHATSAPP_EXTERIOR_PHOTO}
                fallbackSrc={GOLDEN_HOUR_EXTERIOR_PHOTO}
                alt="Gujrat Grill Restaurant front signboard with crest emblem and landscaped garden foliage"
                className="w-full h-full object-cover object-[50%_46%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B0B0B]/85 via-[#0B0B0B]/35 to-transparent"
              />
              <p className="absolute bottom-4 left-5 right-5 text-xs text-[#F5F1E8]/85">
                Gujrat Grill Restaurant — Exterior Signboard &amp; Garden, Gujrat
              </p>
            </div>
          </Reveal>

          {/* Editorial Copy */}
          <Reveal delayMs={80} className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#D6A43B] tracking-wide mb-3">
              About Our Restaurant
            </p>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-semibold text-[#F5F1E8] leading-[1.1] mb-6"
              style={{ textWrap: 'balance' }}
            >
              More Than Just a Dining Experience
            </h2>

            <div className="space-y-4 text-base text-[#F5F1E8]/80 leading-relaxed">
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

            <div className="mt-8 pt-8 border-t border-[#F5F1E8]/12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="font-editorial text-2xl font-semibold text-[#D6A43B]">
                  Indoor &amp; Lawn
                </p>
                <p className="mt-1 text-xs text-[#F5F1E8]/68">
                  Quiet dining hall and landscaped garden seating
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl font-semibold text-[#D6A43B]">
                  Family Focused
                </p>
                <p className="mt-1 text-xs text-[#F5F1E8]/68">
                  Comfortable environment for families and groups
                </p>
              </div>
              <div>
                <p className="font-editorial text-2xl font-semibold text-[#D6A43B]">
                  Prompt Service
                </p>
                <p className="mt-1 text-xs text-[#F5F1E8]/68">
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
