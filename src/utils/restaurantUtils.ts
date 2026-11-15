import type {
  EditableStoreConfig,
  MenuCategory,
  MenuItem,
  ReservationInput,
} from '../types/restaurant';

export function filterMenuItems(
  items: MenuItem[],
  category: MenuCategory,
  searchQuery = '',
  onlyAvailable = false
): MenuItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    if (onlyAvailable && !item.available) {
      return false;
    }
    if (category !== 'All' && item.category !== category) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery) ||
      item.note.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function validateReservationForm(input: ReservationInput): {
  valid: boolean;
  errors: Partial<Record<keyof ReservationInput, string>>;
} {
  const errors: Partial<Record<keyof ReservationInput, string>> = {};

  if (!input.guestName || input.guestName.trim().length < 2) {
    errors.guestName = 'Please enter your full name (at least 2 characters).';
  }

  const phoneDigits = (input.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Please enter a valid contact phone number.';
  }

  if (!input.date || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    errors.date = 'Please select a valid reservation date.';
  }

  if (!input.time || !input.time.trim()) {
    errors.time = 'Please choose a preferred dining time.';
  }

  if (!Number.isFinite(input.guests) || input.guests < 1 || input.guests > 500) {
    errors.guests = 'Guest count must be between 1 and 500.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildWhatsAppUrl(phoneDigits: string, message: string): string {
  const cleanDigits = phoneDigits.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanDigits}?text=${encodedMessage}`;
}

export function buildReservationWhatsAppMessage(
  restaurantName: string,
  input: ReservationInput
): string {
  const lines = [
    `Assalam-o-Alaikum ${restaurantName},`,
    `I would like to request a reservation / inquiry:`,
    `- Name: ${input.guestName.trim()}`,
    `- Phone: ${input.phone.trim()}`,
    `- Date: ${input.date}`,
    `- Preferred Time: ${input.time}`,
    `- Guests: ${input.guests}`,
    `- Experience: ${input.seatingPreference}`,
  ];

  if (input.notes.trim()) {
    lines.push(`- Notes: ${input.notes.trim()}`);
  }

  return lines.join('\n');
}

export function mergeEditableConfig(
  defaults: EditableStoreConfig,
  storedRaw: string | null
): EditableStoreConfig {
  if (!storedRaw) {
    return defaults;
  }

  try {
    const parsed = JSON.parse(storedRaw) as Partial<EditableStoreConfig>;
    const mergedBusiness = {
      ...defaults.businessInfo,
      ...(parsed.businessInfo ?? {}),
    };

    const storedMenuMap = new Map<string, Partial<MenuItem>>();
    if (Array.isArray(parsed.menuItems)) {
      for (const item of parsed.menuItems) {
        if (item && typeof item.id === 'string') {
          storedMenuMap.set(item.id, item);
        }
      }
    }

    const mergedDefaults = defaults.menuItems.map((defaultItem) => {
      const override = storedMenuMap.get(defaultItem.id);
      if (!override) return defaultItem;
      return {
        ...defaultItem,
        name: typeof override.name === 'string' && override.name.trim() ? override.name : defaultItem.name,
        price: typeof override.price === 'string' ? override.price : defaultItem.price,
        note: typeof override.note === 'string' ? override.note : defaultItem.note,
        available: typeof override.available === 'boolean' ? override.available : defaultItem.available,
        category: override.category ?? defaultItem.category,
      };
    });

    const extraCustomItems = Array.isArray(parsed.menuItems)
      ? parsed.menuItems.filter(
          (item) =>
            item &&
            typeof item.id === 'string' &&
            !defaults.menuItems.some((d) => d.id === item.id)
        )
      : [];

    const customReviews = Array.isArray(parsed.customReviews)
      ? parsed.customReviews.filter(
          (r) =>
            r &&
            typeof r.id === 'string' &&
            typeof r.quote === 'string' &&
            r.quote.trim().length > 0
        )
      : defaults.customReviews;

    return {
      businessInfo: mergedBusiness,
      menuItems: [...mergedDefaults, ...extraCustomItems],
      customReviews,
    };
  } catch {
    return defaults;
  }
}

export function validateNewReviewInput(input: {
  authorName: string;
  quote: string;
  rating: number;
}): { valid: boolean; error?: string } {
  if (!input.authorName || input.authorName.trim().length < 2) {
    return { valid: false, error: 'Please enter the reviewer name.' };
  }
  if (!input.quote || input.quote.trim().length < 5) {
    return { valid: false, error: 'Please enter the review text (at least 5 characters).' };
  }
  if (!Number.isFinite(input.rating) || input.rating < 1 || input.rating > 5) {
    return { valid: false, error: 'Rating must be between 1 and 5 stars.' };
  }
  return { valid: true };
}
