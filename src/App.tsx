import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { HighlightsStrip } from './components/HighlightsStrip';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { OwnerEditorModal } from './components/OwnerEditorModal';
import { ReservationModal } from './components/ReservationModal';
import { ReviewsSection } from './components/ReviewsSection';
import { SpecialDiningSection } from './components/SpecialDiningSection';
import { DEFAULT_EDITABLE_CONFIG } from './data/restaurantData';
import type { EditableStoreConfig, ReservationInput } from './types/restaurant';
import { mergeEditableConfig } from './utils/restaurantUtils';

const STORAGE_KEY = 'gujrat-grill-config-v1';

export default function App() {
  const [config, setConfig] = useState<EditableStoreConfig>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return mergeEditableConfig(DEFAULT_EDITABLE_CONFIG, saved);
    } catch {
      return DEFAULT_EDITABLE_CONFIG;
    }
  });

  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationPreference, setReservationPreference] =
    useState<ReservationInput['seatingPreference']>('Indoor Dining Hall');
  const [ownerEditorOpen, setOwnerEditorOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }, [config]);

  const openReservation = (
    preference: ReservationInput['seatingPreference'] = 'Indoor Dining Hall'
  ) => {
    setReservationPreference(preference);
    setReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#25201D]">
      <Navbar
        businessName={config.businessInfo.name}
        phoneHref={config.businessInfo.phoneHref}
        phoneDisplay={config.businessInfo.phoneDisplay}
        onBookTable={() => openReservation('Indoor Dining Hall')}
      />

      <main>
        <HeroSection location={config.businessInfo.location} />

        <HighlightsStrip />

        <MenuSection
          menuItems={config.menuItems}
          onOpenOwnerEditor={() => setOwnerEditorOpen(true)}
          onBookTable={() => openReservation('Indoor Dining Hall')}
        />

        <AboutSection />

        <GallerySection />

        <ReviewsSection
          googleRating={config.businessInfo.googleRating}
          totalReviews={config.businessInfo.totalReviews}
          customReviews={config.customReviews ?? []}
          onAddReview={(review) =>
            setConfig((prev) => ({
              ...prev,
              customReviews: [...(prev.customReviews ?? []), review],
            }))
          }
          onRemoveReview={(id) =>
            setConfig((prev) => ({
              ...prev,
              customReviews: (prev.customReviews ?? []).filter((r) => r.id !== id),
            }))
          }
        />

        <SpecialDiningSection
          onInquireEvents={() =>
            openReservation('Marriage Hall & Event Inquiry')
          }
          onBookOutdoor={() => openReservation('Outdoor Garden Seating')}
        />

        <ContactSection
          businessInfo={config.businessInfo}
          onOpenOwnerEditor={() => setOwnerEditorOpen(true)}
          onBookTable={() => openReservation('Indoor Dining Hall')}
        />
      </main>

      <Footer
        businessInfo={config.businessInfo}
        onOpenOwnerEditor={() => setOwnerEditorOpen(true)}
      />

      <ReservationModal
        isOpen={reservationOpen}
        initialPreference={reservationPreference}
        businessInfo={config.businessInfo}
        onClose={() => setReservationOpen(false)}
      />

      <OwnerEditorModal
        isOpen={ownerEditorOpen}
        config={config}
        onSave={setConfig}
        onReset={() => setConfig(DEFAULT_EDITABLE_CONFIG)}
        onClose={() => setOwnerEditorOpen(false)}
      />
    </div>
  );
}
