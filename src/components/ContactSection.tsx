import { Clock, MapPin, MessageCircle, Navigation, PencilLine, Phone } from 'lucide-react';
import type { BusinessInfo } from '../types/restaurant';
import { buildWhatsAppUrl } from '../utils/restaurantUtils';

interface ContactSectionProps {
  businessInfo: BusinessInfo;
  onOpenOwnerEditor: () => void;
  onBookTable: () => void;
}

export function ContactSection({
  businessInfo,
  onOpenOwnerEditor,
  onBookTable,
}: ContactSectionProps) {
  const whatsappUrl = buildWhatsAppUrl(
    businessInfo.whatsappDigits,
    `Assalam-o-Alaikum ${businessInfo.name}, I would like to inquire about dining or reservations.`
  );

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#151515] border-t border-[#F5F1E8]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#F5F1E8]/10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#D6A43B] tracking-wide mb-3">
              Visit &amp; Reservations
            </p>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-semibold text-[#F5F1E8] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Location, Hours &amp; Direct Contact
            </h2>
          </div>

          <button
            type="button"
            onClick={onBookTable}
            className="px-6 py-3 text-sm font-semibold text-[#0B0B0B] bg-[#D6A43B] hover:bg-[#e2b554] rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 w-fit"
          >
            Book a Table
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Contact Information Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-8 bg-[#0B0B0B] border border-[#F5F1E8]/12 rounded-sm space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-editorial text-2xl font-semibold text-[#D6A43B]">
                  {businessInfo.name}
                </h3>
                <p className="mt-1 text-sm text-[#F5F1E8]/68">
                  {businessInfo.location}
                </p>
              </div>

              <div className="space-y-5 pt-2 border-t border-[#F5F1E8]/10">
                <div className="flex items-start gap-3.5">
                  <MapPin
                    className="w-5 h-5 text-[#D6A43B] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#F5F1E8]/55">
                      Address
                    </p>
                    <p className="mt-0.5 text-base text-[#F5F1E8]">
                      {businessInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone
                    className="w-5 h-5 text-[#D6A43B] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#F5F1E8]/55">
                      Phone
                    </p>
                    <a
                      href={businessInfo.phoneHref}
                      className="mt-0.5 inline-block text-base text-[#F5F1E8] hover:text-[#D6A43B] transition-colors tabular-nums"
                    >
                      {businessInfo.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock
                    className="w-5 h-5 text-[#D6A43B] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-[#F5F1E8]/55">
                        Opening Hours
                      </p>
                      <button
                        type="button"
                        onClick={onOpenOwnerEditor}
                        className="inline-flex items-center gap-1 text-xs text-[#D6A43B] hover:underline cursor-pointer"
                      >
                        <PencilLine className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Edit Hours</span>
                      </button>
                    </div>
                    <p className="mt-0.5 text-base text-[#F5F1E8]">
                      {businessInfo.openingHours}
                    </p>
                    {businessInfo.closingNote && (
                      <p className="mt-1 text-xs text-[#F5F1E8]/60">
                        {businessInfo.closingNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 border-t border-[#F5F1E8]/10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
              <a
                href={businessInfo.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#0B0B0B] bg-[#D6A43B] hover:bg-[#e2b554] rounded-sm transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call Now</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#F5F1E8] border border-[#D6A43B]/45 hover:border-[#D6A43B] hover:text-[#D6A43B] rounded-sm transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#D6A43B]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href={businessInfo.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#F5F1E8] border border-[#F5F1E8]/25 hover:border-[#D6A43B] rounded-sm transition-colors whitespace-nowrap"
              >
                <Navigation className="w-4 h-4 text-[#D6A43B]" aria-hidden="true" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="lg:col-span-7 flex flex-col bg-[#0B0B0B] border border-[#D6A43B]/25 rounded-sm overflow-hidden min-h-[360px] lg:min-h-[440px]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5F1E8]/10 bg-[#121212]">
              <span className="text-xs font-medium text-[#F5F1E8]/75">
                Google Maps · {businessInfo.address}
              </span>
              <a
                href={businessInfo.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#D6A43B] hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
            <iframe
              title={`Map location for ${businessInfo.name} at ${businessInfo.address}`}
              src={businessInfo.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full flex-1 min-h-[320px] border-0 grayscale-[25%] contrast-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
