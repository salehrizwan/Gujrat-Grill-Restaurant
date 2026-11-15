import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import type { BusinessInfo } from '../types/restaurant';
import { BrandMark } from './BrandMark';

interface FooterProps {
  businessInfo: BusinessInfo;
  onOpenOwnerEditor: () => void;
}

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export function Footer({ businessInfo, onOpenOwnerEditor }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0B0B] border-t border-[#D6A43B]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F5F1E8]/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-3">
              <BrandMark className="w-7 h-8 shrink-0" />
              <div>
                <p className="font-editorial text-xl sm:text-2xl font-semibold tracking-[0.05em] text-[#D6A43B]">
                  {businessInfo.name}
                </p>
                <p className="text-xs tracking-[0.22em] text-[#F5F1E8]/60">
                  {businessInfo.subLabel}
                </p>
              </div>
            </a>

            <p className="text-sm text-[#F5F1E8]/68 max-w-sm leading-relaxed">
              Modern Pakistani dining, outdoor garden seating, and hospitality
              for families, friends, and special occasions in Gujrat.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#D6A43B]">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm text-[#F5F1E8]/75">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#D6A43B] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-semibold tracking-wide text-[#D6A43B]">
              Contact &amp; Location
            </p>
            <div className="space-y-2.5 text-sm text-[#F5F1E8]/78">
              <p className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 text-[#D6A43B] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{businessInfo.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone
                  className="w-4 h-4 text-[#D6A43B] shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={businessInfo.phoneHref}
                  className="hover:text-[#D6A43B] transition-colors tabular-nums"
                >
                  {businessInfo.phoneDisplay}
                </a>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={businessInfo.instagramUrl}
                aria-label="Instagram (link placeholder)"
                className="w-10 h-10 inline-flex items-center justify-center border border-[#F5F1E8]/15 hover:border-[#D6A43B] text-[#F5F1E8]/75 hover:text-[#D6A43B] rounded-sm transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={businessInfo.facebookUrl}
                aria-label="Facebook (link placeholder)"
                className="w-10 h-10 inline-flex items-center justify-center border border-[#F5F1E8]/15 hover:border-[#D6A43B] text-[#F5F1E8]/75 hover:text-[#D6A43B] rounded-sm transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Owner Tools */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F1E8]/55">
          <p className="tabular-nums">
            &copy; {year} {businessInfo.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={onOpenOwnerEditor}
            className="text-[#F5F1E8]/60 hover:text-[#D6A43B] transition-colors cursor-pointer"
          >
            Manage Menu &amp; Hours
          </button>
        </div>
      </div>
    </footer>
  );
}
