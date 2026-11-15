import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildReservationWhatsAppMessage,
  buildWhatsAppUrl,
  filterMenuItems,
  mergeEditableConfig,
  validateNewReviewInput,
  validateReservationForm,
} from './restaurantUtils';
import type { EditableStoreConfig, MenuItem } from '../types/restaurant';

const SAMPLE_MENU: MenuItem[] = [
  {
    id: 'mint-margherita',
    name: 'Mint Margherita',
    category: 'Drinks & Refreshers',
    image: '/sample.jpg',
    isSignatureHighlight: true,
    price: '',
    note: '',
    available: true,
  },
  {
    id: 'white-karahi',
    name: 'White Karahi Chicken',
    category: 'Karahi & Mains',
    image: '/sample2.jpg',
    isSignatureHighlight: true,
    price: 'PKR 2,400',
    note: 'House specialty',
    available: true,
  },
  {
    id: 'malai-boti',
    name: 'Malai Boti',
    category: 'Charcoal BBQ',
    image: '/sample3.jpg',
    price: '',
    note: '',
    available: false,
  },
];

test('filterMenuItems filters by category, search query, and availability', () => {
  assert.equal(filterMenuItems(SAMPLE_MENU, 'All').length, 3);
  assert.equal(filterMenuItems(SAMPLE_MENU, 'Karahi & Mains').length, 1);
  assert.equal(filterMenuItems(SAMPLE_MENU, 'All', 'mint').length, 1);
  assert.equal(filterMenuItems(SAMPLE_MENU, 'All', 'specialty').length, 1);
  assert.equal(filterMenuItems(SAMPLE_MENU, 'All', '', true).length, 2);
});

test('validateReservationForm catches missing or invalid fields and accepts valid input', () => {
  const invalid = validateReservationForm({
    guestName: 'A',
    phone: '123',
    date: '',
    time: '',
    guests: 0,
    seatingPreference: 'Outdoor Garden Seating',
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.guestName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.date);
  assert.ok(invalid.errors.time);
  assert.ok(invalid.errors.guests);

  const valid = validateReservationForm({
    guestName: 'Hamza Tariq',
    phone: '+92 300 1234567',
    date: '2026-11-20',
    time: '20:30',
    guests: 6,
    seatingPreference: 'Family Gathering',
    notes: 'Garden corner table preferred',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildWhatsAppUrl and buildReservationWhatsAppMessage format safe WhatsApp links', () => {
  const msg = buildReservationWhatsAppMessage('Gujrat Grill & Marriage Halls', {
    guestName: 'Bilal Ahmed',
    phone: '+92 53 3713000',
    date: '2026-11-21',
    time: '19:30',
    guests: 4,
    seatingPreference: 'Indoor Dining Hall',
    notes: '',
  });
  assert.match(msg, /Gujrat Grill & Marriage Halls/);
  assert.match(msg, /Bilal Ahmed/);

  const url = buildWhatsAppUrl('+92 53 3713000', msg);
  assert.ok(url.startsWith('https://wa.me/92533713000?text='));
  assert.ok(url.includes('Bilal%20Ahmed'));
});

test('mergeEditableConfig safely merges stored edits and recovers from malformed JSON', () => {
  const defaults: EditableStoreConfig = {
    businessInfo: {
      name: 'GUJRAT GRILL & MARRIAGE HALLS',
      subLabel: 'Restaurant',
      location: 'Gujrat, Pakistan',
      address: 'H2RV+98P, Gujrat, Pakistan',
      phoneDisplay: '+92 53 3713000',
      phoneHref: 'tel:+92533713000',
      whatsappDigits: '92533713000',
      openingHours: 'Closes 12:00 AM',
      closingNote: 'Reported closing time: 12:00 AM',
      googleRating: 4.0,
      totalReviews: 950,
      mapsEmbedUrl: 'https://maps.google.com',
      directionsUrl: 'https://maps.google.com',
      instagramUrl: '#contact',
      facebookUrl: '#contact',
    },
    menuItems: SAMPLE_MENU,
  };

  assert.deepEqual(mergeEditableConfig(defaults, '{bad-json'), defaults);

  const merged = mergeEditableConfig(
    defaults,
    JSON.stringify({
      businessInfo: { openingHours: '1:00 PM – 12:00 AM' },
      menuItems: [{ id: 'mint-margherita', price: 'PKR 350', note: 'Fresh mint & lime' }],
    })
  );

  assert.equal(merged.businessInfo.openingHours, '1:00 PM – 12:00 AM');
  assert.equal(merged.businessInfo.address, 'H2RV+98P, Gujrat, Pakistan');
  assert.equal(merged.menuItems[0].price, 'PKR 350');
  assert.equal(merged.menuItems[0].image, '/sample.jpg');
});

test('validateNewReviewInput validates reviewer name, quote, and star rating', () => {
  assert.equal(
    validateNewReviewInput({ authorName: '', quote: 'Great food', rating: 5 }).valid,
    false
  );
  assert.equal(
    validateNewReviewInput({ authorName: 'Usman Ali', quote: 'Ok', rating: 5 }).valid,
    false
  );
  assert.equal(
    validateNewReviewInput({ authorName: 'Usman Ali', quote: 'Excellent food and garden.', rating: 5 }).valid,
    true
  );
});
