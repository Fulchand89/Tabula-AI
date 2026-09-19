import React, { useState } from 'react';

/**
 * ResourceReviewForm
 * 
 * Inline curriculum review form matching Tabula design system.
 * Props:
 *  - onSubmit: function({ curriculumName, subject, rating, reviewText })
 *  - onCancel: function()
 */
export default function ResourceReviewForm({ onSubmit, onCancel }) {
  const [curriculumName, setCurriculumName] = useState('');
  const [subject, setSubject] = useState('');
  const [rating, setRating] = useState(5); // Default 5 stars as shown in screenshot
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!curriculumName.trim()) return;

    if (onSubmit) {
      onSubmit({
        id: Date.now(),
        curriculumName: curriculumName.trim(),
        subject: subject.trim(),
        rating: rating || 5,
        reviewText: reviewText.trim(),
        reviewer: 'You (Community Member)',
        tags: subject ? [subject] : ['Curriculum'],
        philosophies: ['Classical', 'Secular'],
        date: 'Just now'
      });
    }

    // Reset fields
    setCurriculumName('');
    setSubject('');
    setRating(5);
    setReviewText('');
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div className="rounded-2xl border border-[#e9e2d5] bg-white p-5 sm:p-6 shadow-2xs">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* CURRICULUM NAME * */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#738287]">
            Curriculum Name <span className="text-[#738287]">*</span>
          </label>
          <input
            type="text"
            required
            value={curriculumName}
            onChange={(e) => setCurriculumName(e.target.value)}
            placeholder="e.g. Saxon Math, Story of the World"
            className="w-full rounded-xl border border-[#e9e2d5] bg-white px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8c9b9f] transition-colors focus:border-[#1b6b50] focus:outline-none"
          />
        </div>

        {/* SUBJECT */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#738287]">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Math, History"
            className="w-full rounded-xl border border-[#e9e2d5] bg-white px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8c9b9f] transition-colors focus:border-[#1b6b50] focus:outline-none"
          />
        </div>

        {/* RATING */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#738287]">
            Rating
          </label>
          <div className="flex items-center gap-1.5 py-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-2xl transition-transform hover:scale-110 cursor-pointer focus:outline-none"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <span
                  className={
                    star <= currentDisplayRating
                      ? 'text-[#e59324]'
                      : 'text-[#d8d1c3]'
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* YOUR REVIEW */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#738287]">
            Your Review
          </label>
          <textarea
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="How did this curriculum work for your family? What ages, what worked, what didn't?"
            className="w-full resize-none rounded-xl border border-[#e9e2d5] bg-white px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8c9b9f] transition-colors focus:border-[#1b6b50] focus:outline-none"
          />
        </div>

        {/* BUTTONS: Cancel and Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-[#d0c8b9] bg-white py-2.5 text-xs font-bold text-[#172b30] hover:bg-[#faf5eb] transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-[#1b6b50] py-2.5 text-xs font-bold text-white hover:bg-[#14553f] transition-colors cursor-pointer text-center shadow-sm active:scale-[0.99]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
