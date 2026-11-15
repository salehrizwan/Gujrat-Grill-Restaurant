export type MenuCategory =
  | 'All'
  | 'Karahi & Mains'
  | 'Charcoal BBQ'
  | 'Grill & Steaks'
  | 'Drinks & Refreshers';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  image: string;
  fallbackImage?: string;
  imagePosition?: string;
  isSignatureHighlight?: boolean;
  price: string;
  note: string;
  available: boolean;
}

export interface BusinessInfo {
  name: string;
  subLabel: string;
  location: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappDigits: string;
  openingHours: string;
  closingNote: string;
  googleRating: number;
  totalReviews: number;
  mapsEmbedUrl: string;
  directionsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
}

export interface ReviewItem {
  id: string;
  label: string;
  authorName?: string;
  date?: string;
  quote: string;
  rating: number;
  photoUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior & Garden' | 'Culinary' | 'Ambience';
  image: string;
  fallbackImage?: string;
  imageFocusClass?: string;
  caption: string;
  isAuthenticVenuePhoto: boolean;
  aspectClass?: string;
}

export interface ReservationInput {
  guestName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference:
    | 'Indoor Dining Hall'
    | 'Outdoor Garden Seating'
    | 'Family Gathering'
    | 'Marriage Hall & Event Inquiry';
  notes: string;
}

export interface EditableStoreConfig {
  businessInfo: BusinessInfo;
  menuItems: MenuItem[];
  customReviews?: ReviewItem[];
}
