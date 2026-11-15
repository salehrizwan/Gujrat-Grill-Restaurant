import { useMemo, useState } from 'react';
import { ArrowUpRight, PencilLine, Search } from 'lucide-react';
import type { MenuCategory, MenuItem } from '../types/restaurant';
import { filterMenuItems } from '../utils/restaurantUtils';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onOpenOwnerEditor: () => void;
  onBookTable: () => void;
}

const CATEGORIES: MenuCategory[] = [
  'All',
  'Karahi & Mains',
  'Charcoal BBQ',
  'Grill & Steaks',
  'Drinks & Refreshers',
];

export function MenuSection({
  menuItems,
  onOpenOwnerEditor,
  onBookTable,
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [fullMenuExpanded, setFullMenuExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(
    () =>
      filterMenuItems(
        menuItems,
        selectedCategory,
        fullMenuExpanded ? searchQuery : '',
        true
      ),
    [menuItems, selectedCategory, searchQuery, fullMenuExpanded]
  );

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#F3EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#C6A052]/35">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-7 bg-[#C6A052]" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#762B35] tracking-wide">
                Culinary Highlights
              </p>
            </div>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-semibold text-[#25201D] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Popular Menu Selections
            </h2>
            <p className="mt-3 text-base text-[#392D28]/85 leading-relaxed">
              Signature house favorites and guest-loved dishes prepared fresh to
              order. Dish details, pricing, and daily additions can be updated
              anytime by restaurant management.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenOwnerEditor}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#25201D] bg-[#FAF7F0] border border-[#C6A052]/55 hover:border-[#762B35] hover:text-[#762B35] rounded-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <PencilLine className="w-4 h-4 text-[#762B35]" aria-hidden="true" />
              <span>Edit Menu Details</span>
            </button>
          </div>
        </div>

        {/* Interactive Category Tabs + Optional Full-Menu Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-7">
          <div
            role="tablist"
            aria-label="Filter menu by category"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF7F0] border border-[#C6A052]/40 rounded-sm w-fit"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#762B35] ${
                    isActive
                      ? 'bg-[#762B35] text-[#FAF7F0] font-semibold'
                      : 'text-[#392D28] hover:text-[#762B35]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {fullMenuExpanded && (
            <div className="relative w-full md:w-72">
              <label htmlFor="menu-search" className="sr-only">
                Search dishes
              </label>
              <Search
                className="w-4 h-4 text-[#392D28]/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="menu-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu items..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF7F0] text-[#25201D] placeholder:text-[#392D28]/50 border border-[#C6A052]/45 focus:border-[#762B35] focus:outline-none rounded-sm"
              />
            </div>
          )}
        </div>

        {/* Dish Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 px-6 text-center bg-[#FAF7F0] border border-[#C6A052]/35 rounded-sm">
            <p className="font-editorial text-2xl text-[#25201D]">
              No dishes match your current filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 text-sm font-medium text-[#762B35] border border-[#762B35]/45 hover:bg-[#762B35] hover:text-[#FAF7F0] rounded-sm transition-colors cursor-pointer"
            >
              Show All Dishes
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 ${
              selectedCategory === 'All' && filteredItems.length === 5
                ? 'lg:grid-cols-6'
                : 'lg:grid-cols-3'
            }`}
          >
            {filteredItems.map((dish, index) => {
              const spanClass =
                selectedCategory === 'All' && filteredItems.length === 5
                  ? index < 2
                    ? 'lg:col-span-3'
                    : 'lg:col-span-2'
                  : '';
              return (
                <Reveal
                  key={dish.id}
                  delayMs={index * 50}
                  className={`h-full ${spanClass}`}
                >
                  <article className="group h-full flex flex-col bg-[#FAF7F0] border border-[#C6A052]/35 hover:border-[#762B35]/55 transition-all duration-300 rounded-sm overflow-hidden shadow-xs">
                    <div
                      className={`relative overflow-hidden bg-[#25201D] ${
                        selectedCategory === 'All' &&
                        filteredItems.length === 5 &&
                        index < 2
                          ? 'aspect-[16/10]'
                          : 'aspect-[4/3]'
                      }`}
                    >
                      <ResilientImage
                        src={dish.image}
                        fallbackSrc={dish.fallbackImage}
                        alt={`${dish.name} — ${dish.category}`}
                        className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                          dish.imagePosition ?? 'object-center'
                        }`}
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                      <div>
                        {/* Clean Unboxed Metadata Line */}
                        <div className="flex items-center gap-2 text-xs text-[#762B35] font-semibold mb-2">
                          <span>{dish.category}</span>
                          {dish.isSignatureHighlight && (
                            <>
                              <span aria-hidden="true" className="text-[#C6A052]">
                                ·
                              </span>
                              <span className="text-[#392D28]/75 font-medium">
                                Featured Highlight
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-editorial text-2xl sm:text-[1.7rem] font-semibold text-[#25201D] leading-snug">
                            {dish.name}
                          </h3>
                          {dish.price && (
                            <span className="text-sm font-semibold text-[#762B35] tabular-nums shrink-0">
                              {dish.price}
                            </span>
                          )}
                        </div>

                        {dish.note && (
                          <p className="mt-2.5 text-sm text-[#392D28]/80 leading-relaxed">
                            {dish.note}
                          </p>
                        )}
                      </div>

                      {fullMenuExpanded && (
                        <div className="pt-3 border-t border-[#C6A052]/25 flex items-center justify-between text-xs text-[#392D28]/75">
                          <span>
                            {dish.price
                              ? 'Available for Dine-in & Takeaway'
                              : 'Price available upon request'}
                          </span>
                          <button
                            type="button"
                            onClick={onBookTable}
                            className="text-[#762B35] hover:underline font-semibold cursor-pointer"
                          >
                            Reserve
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* View Full Menu Action Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#C6A052]/35">
          <p className="text-sm text-[#392D28]/75">
            Photography shown for dishes is illustrative culinary preview imagery
            and can be replaced with in-house photos anytime.
          </p>

          <button
            type="button"
            onClick={() => setFullMenuExpanded((prev) => !prev)}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#FAF7F0] bg-[#762B35] hover:bg-[#5e2129] border border-[#C6A052]/50 rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{fullMenuExpanded ? 'Show Highlight Grid' : 'View Full Menu'}</span>
            <ArrowUpRight className="w-4 h-4 text-[#C6A052]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
