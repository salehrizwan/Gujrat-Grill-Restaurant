import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ExternalLink, ImagePlus, Plus, Quote, Star, Trash2, X } from 'lucide-react';
import { GOOGLE_MAPS_REVIEWS_URL, VERIFIED_REVIEWS } from '../data/restaurantData';
import type { ReviewItem } from '../types/restaurant';
import { validateNewReviewInput } from '../utils/restaurantUtils';
import { ResilientImage } from './ResilientImage';
import { Reveal } from './Reveal';

interface ReviewsSectionProps {
  googleRating: number;
  totalReviews: number;
  customReviews: ReviewItem[];
  onAddReview: (review: ReviewItem) => void;
  onRemoveReview: (id: string) => void;
}

export function ReviewsSection({
  googleRating,
  totalReviews,
  customReviews,
  onAddReview,
  onRemoveReview,
}: ReviewsSectionProps) {
  const fullStars = Math.round(googleRating);
  const [showAddForm, setShowAddForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [date, setDate] = useState('');
  const [quote, setQuote] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [formError, setFormError] = useState('');

  const allReviews = [...VERIFIED_REVIEWS, ...customReviews];

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateNewReviewInput({ authorName, quote, rating });
    if (!validation.valid) {
      setFormError(validation.error ?? 'Invalid review details.');
      return;
    }

    onAddReview({
      id: `custom-${Date.now()}`,
      label: 'Google Maps Review',
      authorName: authorName.trim(),
      date: date.trim() || undefined,
      quote: quote.trim(),
      rating,
      photoUrl: photoUrl.trim() || undefined,
    });

    setAuthorName('');
    setRating(5);
    setDate('');
    setQuote('');
    setPhotoUrl('');
    setFormError('');
    setShowAddForm(false);
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#F3EBDD] border-b border-[#C6A052]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#C6A052]/35">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[1px] w-7 bg-[#C6A052]" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#762B35] tracking-wide">
                Guest Impressions
              </p>
            </div>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-semibold text-[#25201D] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Trusted by Guests Across Gujrat
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={GOOGLE_MAPS_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#FAF7F0] bg-[#762B35] hover:bg-[#5e2129] border border-[#C6A052]/40 rounded-sm transition-colors whitespace-nowrap"
              >
                <span>View All {totalReviews.toLocaleString()} Reviews on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C6A052]" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => setShowAddForm((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-[#25201D] bg-[#FAF7F0] border border-[#C6A052]/55 hover:border-[#762B35] hover:text-[#762B35] rounded-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                {showAddForm ? (
                  <>
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Close Review Form</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-[#762B35]" aria-hidden="true" />
                    <span>Add Google Review &amp; Photo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 px-6 py-4 bg-[#FAF7F0] border border-[#C6A052]/55 rounded-sm shrink-0 shadow-xs">
            <div>
              <p className="font-editorial text-4xl font-semibold text-[#25201D] tabular-nums leading-none">
                {googleRating.toFixed(1)}
                <span className="text-lg text-[#392D28]/60 font-normal">
                  {' '}
                  / 5
                </span>
              </p>
              <p className="mt-1.5 text-xs font-medium text-[#762B35]">
                Google Rating
              </p>
            </div>

            <div className="h-10 w-[1px] bg-[#C6A052]/40" aria-hidden="true" />

            <div>
              <div
                className="flex items-center gap-1"
                aria-label={`${googleRating.toFixed(1)} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < fullStars
                        ? 'text-[#762B35] fill-[#762B35]'
                        : 'text-[#392D28]/25'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-[#392D28]/85 tabular-nums">
                Based on {totalReviews.toLocaleString()} Google Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Add Real Google Review Form (Persisted locally for owner/admin) */}
        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 p-6 bg-[#FAF7F0] border border-[#C6A052]/55 rounded-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-editorial text-2xl font-semibold text-[#25201D]">
                Add Verified Google Review
              </h3>
              <span className="text-xs text-[#392D28]/70">
                Copy real reviewer names, quotes &amp; guest photos from your Google Business profile
              </span>
            </div>

            {formError && (
              <p className="text-xs font-medium text-[#762B35]" role="alert">
                {formError}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="review-author"
                  className="block text-xs font-medium text-[#392D28] mb-1.5"
                >
                  Reviewer Name
                </label>
                <input
                  id="review-author"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Exact reviewer name"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD]/65 text-[#25201D] placeholder:text-[#392D28]/45 border border-[#C6A052]/45 focus:border-[#762B35] focus:outline-none rounded-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="review-rating"
                  className="block text-xs font-medium text-[#392D28] mb-1.5"
                >
                  Star Rating
                </label>
                <select
                  id="review-rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD]/65 text-[#25201D] border border-[#C6A052]/45 focus:border-[#762B35] focus:outline-none rounded-sm"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="review-date"
                  className="block text-xs font-medium text-[#392D28] mb-1.5"
                >
                  Date (Optional)
                </label>
                <input
                  id="review-date"
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. 2 months ago"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD]/65 text-[#25201D] placeholder:text-[#392D28]/45 border border-[#C6A052]/45 focus:border-[#762B35] focus:outline-none rounded-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="review-quote"
                className="block text-xs font-medium text-[#392D28] mb-1.5"
              >
                Review Text
              </label>
              <textarea
                id="review-quote"
                rows={2}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Paste the guest's review..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD]/65 text-[#25201D] placeholder:text-[#392D28]/45 border border-[#C6A052]/45 focus:border-[#762B35] focus:outline-none rounded-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div>
                <label
                  htmlFor="review-photo-url"
                  className="block text-xs font-medium text-[#392D28] mb-1.5"
                >
                  Guest Photo URL (Optional)
                </label>
                <input
                  id="review-photo-url"
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://... or upload below"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD]/65 text-[#25201D] placeholder:text-[#392D28]/45 border border-[#C6A052]/45 focus:border-[#762B35] focus:outline-none rounded-sm"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#25201D] border border-[#C6A052]/55 hover:border-[#762B35] rounded-sm cursor-pointer">
                  <ImagePlus className="w-4 h-4 text-[#762B35]" aria-hidden="true" />
                  <span>Upload Guest Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="sr-only"
                  />
                </label>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold text-[#FAF7F0] bg-[#762B35] hover:bg-[#5e2129] rounded-sm transition-colors cursor-pointer"
                >
                  Save Review
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Review Highlight Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {allReviews.map((review, index) => {
            const isCustom = review.id.startsWith('custom-');
            return (
              <Reveal key={review.id} delayMs={(index % 3) * 60} className="h-full">
                <blockquote className="h-full flex flex-col justify-between p-7 bg-[#FAF7F0] border border-[#C6A052]/40 hover:border-[#762B35]/55 transition-colors rounded-sm shadow-xs">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <Quote
                        className="w-6 h-6 text-[#762B35]"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#392D28]/75">
                          {review.authorName || review.label}
                        </span>
                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => onRemoveReview(review.id)}
                            aria-label={`Remove review by ${review.authorName || 'guest'}`}
                            className="text-[#392D28]/55 hover:text-[#762B35] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {review.photoUrl && (
                      <div className="mb-5 aspect-[16/10] rounded-sm overflow-hidden border border-[#C6A052]/35 bg-[#25201D]">
                        <ResilientImage
                          src={review.photoUrl}
                          alt={`Guest photo uploaded with review by ${review.authorName || 'Google Reviewer'}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <p className="font-editorial text-2xl sm:text-[1.6rem] text-[#25201D] leading-snug">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  <footer className="mt-8 pt-4 border-t border-[#C6A052]/30 flex items-center justify-between text-xs text-[#392D28]/75">
                    <span>
                      {review.date
                        ? `Google Maps · ${review.date}`
                        : 'Google Maps Review'}
                    </span>
                    <span className="font-semibold text-[#762B35]">
                      Gujrat, Pakistan
                    </span>
                  </footer>
                </blockquote>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
