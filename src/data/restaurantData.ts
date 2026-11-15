import exteriorGoldenHourImg from '../assets/images/exterior_golden_hour_1794720740441.jpg';
import dishMintMargheritaImg from '../assets/images/dish_mint_margherita_1794720739272.jpg';
import dishWhiteKarahiImg from '../assets/images/dish_white_karahi_1794720740094.jpg';
import dishMalaiBotiImg from '../assets/images/dish_malai_boti_1794720740453.jpg';
import dishChickenTikkaImg from '../assets/images/dish_chicken_tikka_1794720741257.jpg';
import dishChickenSteakImg from '../assets/images/dish_chicken_steak_1794720741561.jpg';
import ambienceDiningSettingImg from '../assets/images/ambience_dining_setting_1794720741915.jpg';

import type {
  BusinessInfo,
  EditableStoreConfig,
  GalleryItem,
  MenuItem,
  ReviewItem,
} from '../types/restaurant';

export const ORIGINAL_EXTERIOR_PHOTO = '/assets/aistudio/image_413035de.png';
export const ABOUT_WHATSAPP_EXTERIOR_PHOTO =
  '/assets/aistudio/WhatsApp_Image_2026-11-15_at_10.45.11_AM_d355891d.jpeg';
export const GOLDEN_HOUR_EXTERIOR_PHOTO = exteriorGoldenHourImg;
export const GOOGLE_MAPS_REVIEWS_URL =
  'https://www.google.com/maps/place/Gujrat+Grill+Restaurant/@32.5909749,74.0433191,17z/';

export const DEFAULT_BUSINESS_INFO: BusinessInfo = {
  name: 'GUJRAT GRILL & MARRIAGE HALLS',
  subLabel: 'RESTAURANT',
  location: 'Gujrat, Pakistan',
  address: 'H2RV+98P, Gujrat, Pakistan',
  phoneDisplay: '+92 53 3713000',
  phoneHref: 'tel:+92533713000',
  whatsappDigits: '92533713000',
  openingHours: 'Reported closing time: 12:00 AM',
  closingNote: 'Daily opening hours can be updated by management.',
  googleRating: 4.0,
  totalReviews: 950,
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=H2RV%2B98P%2C%20Gujrat%2C%20Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed',
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=H2RV%2B98P%2C%20Gujrat%2C%20Pakistan',
  instagramUrl: '#contact',
  facebookUrl: '#contact',
};

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: 'mint-margherita',
    name: 'Mint Margherita',
    category: 'Drinks & Refreshers',
    image: dishMintMargheritaImg,
    isSignatureHighlight: true,
    price: '',
    note: '',
    available: true,
  },
  {
    id: 'white-karahi-chicken',
    name: 'White Karahi Chicken',
    category: 'Karahi & Mains',
    image: dishWhiteKarahiImg,
    isSignatureHighlight: true,
    price: '',
    note: '',
    available: true,
  },
  {
    id: 'malai-boti',
    name: 'Malai Boti',
    category: 'Charcoal BBQ',
    image: dishMalaiBotiImg,
    isSignatureHighlight: false,
    price: '',
    note: '',
    available: true,
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka',
    category: 'Charcoal BBQ',
    image: dishChickenTikkaImg,
    isSignatureHighlight: false,
    price: '',
    note: '',
    available: true,
  },
  {
    id: 'chicken-fillet-steak',
    name: 'Chicken Fillet / Steak',
    category: 'Grill & Steaks',
    image: dishChickenSteakImg,
    imagePosition: 'object-[50%_24%]',
    isSignatureHighlight: false,
    price: '',
    note: '',
    available: true,
  },
];

export const DEFAULT_EDITABLE_CONFIG: EditableStoreConfig = {
  businessInfo: DEFAULT_BUSINESS_INFO,
  menuItems: DEFAULT_MENU_ITEMS,
};

export const RESTAURANT_HIGHLIGHTS = [
  {
    id: 'dine-in',
    title: 'Dine-in Experience',
    subtitle: 'Attentive table service in a calm setting',
  },
  {
    id: 'takeaway',
    title: 'Takeaway',
    subtitle: 'Freshly prepared dishes packed to order',
  },
  {
    id: 'delivery',
    title: 'Home Delivery',
    subtitle: 'Direct delivery across Gujrat',
  },
  {
    id: 'outdoor',
    title: 'Beautiful Outdoor Dining',
    subtitle: 'Garden walkways and open-air seating',
  },
  {
    id: 'gatherings',
    title: 'Family & Friends Gatherings',
    subtitle: 'Welcoming spaces for shared meals',
  },
] as const;

export const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    id: 'review-1',
    label: 'Google Review Highlight · 01',
    quote:
      'The food was too good, the ambience is nice also the service is fast.',
    rating: 5,
  },
  {
    id: 'review-2',
    label: 'Google Review Highlight · 02',
    quote: 'Chicken fillet / steak is too much tasty. Excellent environment.',
    rating: 5,
  },
  {
    id: 'review-3',
    label: 'Google Review Highlight · 03',
    quote: 'Beautiful building, quiet and pleasant environment.',
    rating: 5,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'exterior-golden',
    title: 'Evening Exterior & Main Signboard',
    category: 'Exterior & Garden',
    image: exteriorGoldenHourImg,
    fallbackImage: ORIGINAL_EXTERIOR_PHOTO,
    caption:
      'Gujrat Grill & Marriage Halls building facade, illuminated signboard, and manicured front lawn.',
    isAuthenticVenuePhoto: true,
    aspectClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'exterior-original',
    title: 'Front Lawn, Topiary & Curved Walkways',
    category: 'Exterior & Garden',
    image: ORIGINAL_EXTERIOR_PHOTO,
    imageFocusClass: 'object-[35%_72%]',
    caption:
      'Original restaurant photograph showcasing the landscaped garden, sculpted evergreens, and brick pathways.',
    isAuthenticVenuePhoto: true,
  },
  {
    id: 'white-karahi-gallery',
    title: 'White Karahi Chicken',
    category: 'Culinary',
    image: dishWhiteKarahiImg,
    caption:
      'Illustrative dish preview — replace with kitchen photography from Gujrat Grill.',
    isAuthenticVenuePhoto: false,
  },
  {
    id: 'outdoor-seating-crop',
    title: 'Garden Pathways & Outdoor Seating Area',
    category: 'Exterior & Garden',
    image: exteriorGoldenHourImg,
    fallbackImage: ORIGINAL_EXTERIOR_PHOTO,
    imageFocusClass: 'object-[12%_75%] scale-110',
    caption:
      'Patio seating nestled among trimmed garden hedges and evening bollard lighting.',
    isAuthenticVenuePhoto: true,
  },
  {
    id: 'malai-boti-gallery',
    title: 'Charcoal Malai Boti',
    category: 'Culinary',
    image: dishMalaiBotiImg,
    caption:
      'Illustrative BBQ preview — replace with live grill photography from Gujrat Grill.',
    isAuthenticVenuePhoto: false,
  },
  {
    id: 'mint-margherita-gallery',
    title: 'Mint Margherita Refresher',
    category: 'Culinary',
    image: dishMintMargheritaImg,
    caption:
      'Illustrative beverage preview — replace with in-house drink photography.',
    isAuthenticVenuePhoto: false,
  },
  {
    id: 'ambience-preview',
    title: 'Evening Table Setting & Hospitality',
    category: 'Ambience',
    image: ambienceDiningSettingImg,
    caption:
      'Temporary ambience placeholder — replace with verified indoor hall photography.',
    isAuthenticVenuePhoto: false,
  },
];

export const AMBIENCE_FALLBACK_IMAGE = ambienceDiningSettingImg;
