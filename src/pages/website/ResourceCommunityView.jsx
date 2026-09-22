import React, { useState, useMemo } from 'react';
import ResourceReviewForm from './ResourceReviewForm';

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRatingDisplay({ rating }) {
  return (
    <span className="text-[#e59324] text-xs tracking-tight">
      {'★'.repeat(Math.round(rating))}
      <span className="text-[#d8d1c3]">{'★'.repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="flex flex-col rounded-xl border border-[#e9e2d5] bg-white p-4 shadow-2xs transition-all hover:border-[#c8ddd4] hover:shadow-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-sm font-bold text-[#172b30] leading-snug">
            {review.curriculumName}
          </h3>
          {review.subject && (
            <p className="text-[11px] font-semibold text-[#356F58] mt-0.5">
              {review.subject}
            </p>
          )}
          <div className="mt-1 flex items-center gap-1.5">
            <StarRatingDisplay rating={review.rating} />
            <span className="text-[10px] text-[#526068]">{review.rating}.0</span>
          </div>
        </div>
        {review.tags && review.tags.length > 0 && (
          <div className="flex shrink-0 flex-wrap gap-1 justify-end">
            {review.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#b2ddc8] bg-[#f0faf5] px-2 py-0.5 text-[10px] font-bold text-[#356F58]"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {review.reviewText && (
        <blockquote className="mt-3 rounded-lg bg-[#f5f0e6] px-3 py-2 text-[11px] italic leading-relaxed text-[#37474c]">
          "{review.reviewText}"
          <span className="mt-1 block not-italic font-semibold text-[#356F58]">
            — {review.reviewer || 'Homeschool Parent'}
          </span>
        </blockquote>
      )}

      {review.philosophies && review.philosophies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {review.philosophies.map((p) => (
            <span
              key={p}
              className="rounded-md bg-[#f0ece4] px-2 py-0.5 text-[10px] font-medium text-[#526068]"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ResourceCommunityView({ searchQuery = '', onSearchChange }) {
  // Default to showing the inline review form to match the user's screenshot
  const [isWritingReview, setIsWritingReview] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [localSearch, setLocalSearch] = useState('');

  const activeSearch = searchQuery || localSearch;
  const handleSearchUpdate = (val) => {
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setLocalSearch(val);
    }
  };

  const filtered = useMemo(() => {
    if (!activeSearch.trim()) return reviews;
    const q = activeSearch.toLowerCase();
    return reviews.filter(
      (r) =>
        r.curriculumName.toLowerCase().includes(q) ||
        (r.subject && r.subject.toLowerCase().includes(q)) ||
        (r.reviewText && r.reviewText.toLowerCase().includes(q))
    );
  }, [reviews, activeSearch]);

  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div>
      {/* ── Form View (matching current screenshot) OR Trigger Button ── */}
      {isWritingReview ? (
        <div>
          <ResourceReviewForm
            onSubmit={handleAddReview}
            onCancel={() => setIsWritingReview(false)}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Write a Review Button */}
          <button
            type="button"
            onClick={() => setIsWritingReview(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#356F58] py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#2a5946] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Write a Review</span>
            <span className="text-sm">→</span>
          </button>

          {/* Search bar when browsing reviews */}
          <div className="flex items-center gap-2 rounded-2xl border border-[#e9e2d5] bg-white px-3.5 py-2.5 shadow-2xs">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8c9b9f"
              strokeWidth="2.2"
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={activeSearch}
              onChange={(e) => handleSearchUpdate(e.target.value)}
              placeholder="Search by name, subject, or keyword..."
              className="w-full bg-transparent text-xs text-[#2b3a3f] placeholder-[#9aa7ab] focus:outline-none"
            />
            {activeSearch && (
              <button
                type="button"
                onClick={() => handleSearchUpdate('')}
                className="text-[#9aa7ab] hover:text-[#526068] transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Reviews / Empty state ── */}
      <div className="mt-6">
        {reviews.length === 0 ? (
          <div>
            <h2 className="font-serif text-lg font-bold text-[#172b30]">
              No reviews yet
            </h2>
            <p className="mt-1 text-xs text-[#526068]">
              Be the first to review a curriculum and help other homeschool families choose.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div>
            <h2 className="font-serif text-lg font-bold text-[#172b30]">
              No reviews found
            </h2>
            <p className="mt-1 text-xs text-[#526068]">
              No reviews match your search. Try a different keyword.
            </p>
            <button
              type="button"
              onClick={() => handleSearchUpdate('')}
              className="mt-3 text-xs font-semibold text-[#356F58] underline cursor-pointer hover:text-[#356F58]"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11.5px] font-semibold text-[#526068]">
                {filtered.length} Review{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
            {filtered.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
