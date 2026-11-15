import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, MessageCircle, Phone, X } from 'lucide-react';
import type { BusinessInfo, ReservationInput } from '../types/restaurant';
import {
  buildReservationWhatsAppMessage,
  buildWhatsAppUrl,
  validateReservationForm,
} from '../utils/restaurantUtils';

interface ReservationModalProps {
  isOpen: boolean;
  initialPreference?: ReservationInput['seatingPreference'];
  businessInfo: BusinessInfo;
  onClose: () => void;
}

export function ReservationModal({
  isOpen,
  initialPreference = 'Indoor Dining Hall',
  businessInfo,
  onClose,
}: ReservationModalProps) {
  const todayIso = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<ReservationInput>({
    guestName: '',
    phone: '',
    date: todayIso,
    time: '20:00',
    guests: 4,
    seatingPreference: initialPreference,
    notes: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReservationInput, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({
        ...prev,
        seatingPreference: initialPreference,
      }));
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen, initialPreference]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateReservationForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const whatsappMessage = buildReservationWhatsAppMessage(
    businessInfo.name,
    form
  );
  const whatsappUrl = buildWhatsAppUrl(
    businessInfo.whatsappDigits,
    whatsappMessage
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      className="fixed inset-0 z-50 bg-[#25201D]/82 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#FAF7F0] border border-[#C6A052]/50 rounded-sm overflow-hidden my-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C6A052]/30 bg-[#25201D]">
          <div>
            <p className="text-xs font-medium text-[#C6A052]">
              {businessInfo.name}
            </p>
            <h2
              id="reservation-modal-title"
              className="font-editorial text-2xl sm:text-3xl font-semibold text-[#FAF7F0]"
            >
              Reserve a Table or Event Inquiry
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reservation dialog"
            className="w-10 h-10 inline-flex items-center justify-center text-[#F3EBDD]/75 hover:text-[#C6A052] rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-3.5 p-4 bg-[#F3EBDD] border border-[#C6A052]/45 rounded-sm">
              <CheckCircle2
                className="w-6 h-6 text-[#762B35] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-editorial text-2xl font-semibold text-[#25201D]">
                  Reservation Request Ready
                </h3>
                <p className="mt-1 text-sm text-[#392D28] leading-relaxed">
                  Thank you, {form.guestName}. Send your details directly via
                  WhatsApp or call our reception desk to confirm availability.
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-4 text-sm p-5 bg-[#F3EBDD] border border-[#C6A052]/30 rounded-sm">
              <div>
                <dt className="text-xs text-[#392D28]/70">Date &amp; Time</dt>
                <dd className="mt-1 text-[#25201D] font-medium tabular-nums">
                  {form.date} · {form.time}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[#392D28]/70">Guests</dt>
                <dd className="mt-1 text-[#25201D] font-medium tabular-nums">
                  {form.guests} Guests
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-[#392D28]/70">Experience</dt>
                <dd className="mt-1 text-[#762B35] font-semibold">
                  {form.seatingPreference}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#FAF7F0] bg-[#762B35] hover:bg-[#5E2129] rounded-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#C6A052]" aria-hidden="true" />
                <span>Send via WhatsApp</span>
              </a>

              <a
                href={businessInfo.phoneHref}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-[#25201D] border border-[#25201D]/25 hover:border-[#762B35] hover:text-[#762B35] rounded-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#762B35]" aria-hidden="true" />
                <span>Call {businessInfo.phoneDisplay}</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="res-name"
                  className="block text-xs font-medium text-[#25201D] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="res-name"
                  type="text"
                  required
                  value={form.guestName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, guestName: e.target.value }))
                  }
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD] text-[#25201D] placeholder:text-[#392D28]/45 border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm"
                />
                {errors.guestName && (
                  <p className="mt-1.5 text-xs font-medium text-[#762B35]" role="alert">
                    {errors.guestName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="res-phone"
                  className="block text-xs font-medium text-[#25201D] mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+92 300 0000000"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD] text-[#25201D] placeholder:text-[#392D28]/45 border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs font-medium text-[#762B35]" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="res-date"
                  className="block text-xs font-medium text-[#25201D] mb-1.5"
                >
                  Date
                </label>
                <input
                  id="res-date"
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD] text-[#25201D] border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm"
                />
                {errors.date && (
                  <p className="mt-1.5 text-xs font-medium text-[#762B35]" role="alert">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="res-time"
                  className="block text-xs font-medium text-[#25201D] mb-1.5"
                >
                  Preferred Time
                </label>
                <input
                  id="res-time"
                  type="time"
                  required
                  value={form.time}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, time: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD] text-[#25201D] border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm"
                />
                {errors.time && (
                  <p className="mt-1.5 text-xs font-medium text-[#762B35]" role="alert">
                    {errors.time}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="res-guests"
                  className="block text-xs font-medium text-[#25201D] mb-1.5"
                >
                  Guests
                </label>
                <input
                  id="res-guests"
                  type="number"
                  min={1}
                  max={500}
                  required
                  value={form.guests}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      guests: Number(e.target.value) || 0,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD] text-[#25201D] border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm tabular-nums"
                />
                {errors.guests && (
                  <p className="mt-1.5 text-xs font-medium text-[#762B35]" role="alert">
                    {errors.guests}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="res-preference"
                className="block text-xs font-medium text-[#25201D] mb-1.5"
              >
                Seating or Event Type
              </label>
              <select
                id="res-preference"
                value={form.seatingPreference}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    seatingPreference: e.target
                      .value as ReservationInput['seatingPreference'],
                  }))
                }
                className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD] text-[#25201D] border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm"
              >
                <option value="Indoor Dining Hall">Indoor Dining Hall</option>
                <option value="Outdoor Garden Seating">
                  Outdoor Garden Seating
                </option>
                <option value="Family Gathering">Family Gathering</option>
                <option value="Marriage Hall & Event Inquiry">
                  Marriage Hall &amp; Event Inquiry
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="res-notes"
                className="block text-xs font-medium text-[#25201D] mb-1.5"
              >
                Special Requests (Optional)
              </label>
              <textarea
                id="res-notes"
                rows={2}
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
                placeholder="Any seating or event details..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD] text-[#25201D] placeholder:text-[#392D28]/45 border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-[#392D28]/75">
                {businessInfo.openingHours}
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-[#FAF7F0] bg-[#762B35] hover:bg-[#5E2129] border border-[#C6A052]/40 rounded-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                Continue Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
