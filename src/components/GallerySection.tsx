import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import type { GalleryItem } from '../types/restaurant';
import { ResilientImage } from './ResilientImage';

type GalleryFilter = 'All' | GalleryItem['category'];

const GALLERY_FILTERS: GalleryFilter[] = [
  'All',
  'Exterior & Garden',
  'Culinary',
  'Ambience',
];

export function GallerySection() {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleItems = useMemo(() => {
    if (filter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === filter);
  }, [filter]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, visibleItems.length]);

  const activeItem = activeIndex !== null ? visibleItems[activeIndex] : null;

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#D6A43B] tracking-wide mb-3">
              Visual Showcase
            </p>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-semibold text-[#F5F1E8] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Architecture, Garden &amp; Cuisine
            </h2>
            <p className="mt-3 text-base text-[#F5F1E8]/72 leading-relaxed">
              Explore the real exterior, manicured garden pathways, and culinary
              previews. Select any photograph to inspect it in full detail.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter gallery images"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#151515] border border-[#F5F1E8]/10 rounded-sm w-fit shrink-0"
          >
            {GALLERY_FILTERS.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(cat);
                    setActiveIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#D6A43B] text-[#0B0B0B] font-semibold'
                      : 'text-[#F5F1E8]/75 hover:text-[#F5F1E8]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Bento / Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[240px]">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setActiveIndex(visibleItems.findIndex((x) => x.id === item.id))
              }
              aria-label={`Open ${item.title} in gallery lightbox`}
              className={`group relative text-left rounded-sm overflow-hidden border border-[#F5F1E8]/12 hover:border-[#D6A43B]/60 bg-[#151515] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A43B] ${
                filter === 'All' && item.aspectClass ? item.aspectClass : ''
              }`}
            >
              <ResilientImage
                src={item.image}
                fallbackSrc={item.fallbackImage}
                alt={item.title}
                className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                  item.imageFocusClass ?? 'object-center'
                }`}
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
              />

              <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-sm bg-[#0B0B0B]/70 border border-[#F5F1E8]/20 flex items-center justify-center text-[#F5F1E8] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                <Expand className="w-4 h-4 text-[#D6A43B]" aria-hidden="true" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[11px] text-[#D6A43B] font-medium mb-1">
                  <span>{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#F5F1E8]/75">
                    {item.isAuthenticVenuePhoto
                      ? 'Verified Venue Photo'
                      : 'Illustrative Preview'}
                  </span>
                </div>
                <h3 className="font-editorial text-xl font-semibold text-[#F5F1E8] leading-snug">
                  {item.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery preview: ${activeItem.title}`}
          className="fixed inset-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col bg-[#151515] border border-[#D6A43B]/30 rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F5F1E8]/10">
              <div className="flex items-center gap-2 text-xs text-[#D6A43B] font-medium">
                <span>{activeItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#F5F1E8]/75 tabular-nums">
                  {activeIndex + 1} / {visibleItems.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close lightbox"
                className="w-10 h-10 inline-flex items-center justify-center text-[#F5F1E8]/80 hover:text-[#D6A43B] rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A43B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-[#0B0B0B] aspect-[16/10] max-h-[70vh] flex items-center justify-center overflow-hidden">
              <ResilientImage
                src={activeItem.image}
                fallbackSrc={activeItem.fallbackImage}
                alt={activeItem.title}
                loading="eager"
                className="w-full h-full object-contain"
              />

              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (activeIndex - 1 + visibleItems.length) % visibleItems.length
                  )
                }
                aria-label="Previous photo"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-sm bg-[#0B0B0B]/80 border border-[#F5F1E8]/20 hover:border-[#D6A43B] text-[#F5F1E8] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveIndex((activeIndex + 1) % visibleItems.length)
                }
                aria-label="Next photo"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-sm bg-[#0B0B0B]/80 border border-[#F5F1E8]/20 hover:border-[#D6A43B] text-[#F5F1E8] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-editorial text-2xl font-semibold text-[#F5F1E8]">
                  {activeItem.title}
                </h3>
                <p className="mt-1 text-sm text-[#F5F1E8]/75">
                  {activeItem.caption}
                </p>
              </div>
              <span className="text-xs text-[#D6A43B] shrink-0">
                {activeItem.isAuthenticVenuePhoto
                  ? 'Original Restaurant Photography'
                  : 'Temporary Placeholder Preview'}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
