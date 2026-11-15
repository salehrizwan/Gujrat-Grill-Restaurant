import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  businessName: string;
  phoneHref: string;
  phoneDisplay: string;
  onBookTable: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({
  businessName,
  phoneHref,
  phoneDisplay,
  onBookTable,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#25201D] shadow-sm border-b border-[#C6A052]/30'
          : 'bg-[#25201D]/90 backdrop-blur-md border-b border-[#C6A052]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single-line original restaurant branding */}
        <a
          href="#home"
          className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A052] rounded-sm"
        >
          <BrandMark className="w-5 h-6 sm:w-6 sm:h-7 shrink-0" />
          <span className="font-editorial text-sm sm:text-lg xl:text-xl font-semibold tracking-[0.05em] sm:tracking-[0.06em] text-[#C6A052] whitespace-nowrap">
            {businessName}
          </span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#F3EBDD]/90"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#C6A052] transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#C6A052] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A052] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Call Now + Primary CTA */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <a
            href={phoneHref}
            aria-label={`Call Now at ${phoneDisplay}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#F3EBDD] hover:text-[#C6A052] transition-colors whitespace-nowrap shrink-0 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A052] rounded-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#C6A052]" aria-hidden="true" />
            <span>Call Now</span>
          </a>

          <button
            type="button"
            onClick={onBookTable}
            className="px-5 py-2.5 text-sm font-semibold text-[#25201D] bg-[#C6A052] hover:bg-[#d3b066] active:scale-[0.98] transition-all duration-200 rounded-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF7F0]"
          >
            Book a Table
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="w-11 h-11 inline-flex items-center justify-center text-[#F3EBDD] hover:text-[#C6A052] border border-[#C6A052]/30 rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A052]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#25201D] border-t border-[#C6A052]/20 px-6 py-6 space-y-5"
        >
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base font-medium text-[#F3EBDD]/90 hover:text-[#C6A052] border-b border-[#F3EBDD]/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={phoneHref}
              onClick={() => setMobileOpen(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#F3EBDD] border border-[#C6A052]/50 hover:border-[#C6A052] rounded-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C6A052]" aria-hidden="true" />
              <span>Call Now · {phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookTable();
              }}
              className="flex-1 px-5 py-3 text-sm font-semibold text-[#25201D] bg-[#C6A052] hover:bg-[#d3b066] rounded-sm transition-colors cursor-pointer"
            >
              Book a Table
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
