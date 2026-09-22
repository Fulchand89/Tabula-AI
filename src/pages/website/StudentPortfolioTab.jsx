import React from 'react';
import { formatDateInput, isoToDisplayDate, displayToIsoDate } from '../../utils/dateFormatter';

/**
 * Portfolio Tab component for Student Details.
 * Displays portfolio records, work samples list, and Add Work Sample form.
 */
export default function StudentPortfolioTab({
  isAddingPortfolio,
  setIsAddingPortfolio,
  portfolioTitle,
  setPortfolioTitle,
  portfolioSubject,
  setPortfolioSubject,
  isPortfolioSubjectOpen,
  setIsPortfolioSubjectOpen,
  PORTFOLIO_SUBJECTS,
  portfolioDate,
  setPortfolioDate,
  portfolioNotes,
  setPortfolioNotes,
  portfolioImageUrl,
  setPortfolioImageUrl,
  portfolioEntries,
  handleSavePortfolio,
}) {
  return (
    <div className="space-y-5">
      {/* Descriptive text */}
      <p className="text-[13px] leading-relaxed text-[#526068] font-medium">
        Document student work samples, projects, and milestones. Portfolio-review states (PA, NY, and others) require records like these.
      </p>

      {/* VIEW 1: Empty / List State */}
      {!isAddingPortfolio && (
        <div>
          {/* + Add Work Sample Button */}
          <button
            type="button"
            onClick={() => setIsAddingPortfolio(true)}
            className="mb-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#356F58] hover:bg-[#2a5946] active:scale-[0.99] py-4 px-6 text-sm font-bold text-white shadow-xs transition-all cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Work Sample</span>
          </button>

          {/* Empty state or list */}
          {portfolioEntries.length === 0 ? (
            <div className="text-center pt-2">
              <h3 className="text-sm font-bold text-[#16272b] mb-1">
                No entries yet
              </h3>
              <p className="text-xs text-[#607077]">
                Add your first work sample to start building student portfolio.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolioEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-[#e8dfd3] bg-white p-5 shadow-2xs space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#16272b]">{entry.title}</h4>
                      <span className="inline-block mt-1 rounded-md bg-[#edf5f0] px-2 py-0.5 text-[11px] font-semibold text-[#356F58]">
                        {entry.subject}
                      </span>
                    </div>
                    <span className="text-xs text-[#718086]">{entry.date}</span>
                  </div>
                  {entry.notes && (
                    <p className="text-xs text-[#526068] leading-relaxed pt-1">{entry.notes}</p>
                  )}
                  {entry.imageUrl && (
                    <a
                      href={entry.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#356F58] hover:underline inline-block pt-1"
                    >
                      View attached photo →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: Add Work Sample Form */}
      {isAddingPortfolio && (
        <form onSubmit={handleSavePortfolio} className="space-y-5">
          {/* Form Card Container */}
          <div className="rounded-2xl border border-[#e8dfd3] bg-white p-6 shadow-2xs space-y-5">
            {/* TITLE * */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-2">
                TITLE *
              </label>
              <input
                type="text"
                required
                value={portfolioTitle}
                onChange={(e) => setPortfolioTitle(e.target.value)}
                placeholder="e.g. Ancient Egypt Diorama, Long Division Test"
                className="w-full rounded-xl border border-[#d5dcd8] bg-white px-4 py-3 text-sm text-[#16272b] placeholder-[#8a989f] focus:border-[#356F58] focus:outline-none transition-colors"
              />
            </div>

            {/* SUBJECT */}
            <div className="relative">
              <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-2">
                SUBJECT
              </label>
              <button
                type="button"
                onClick={() => setIsPortfolioSubjectOpen(!isPortfolioSubjectOpen)}
                className="flex w-full items-center justify-between rounded-xl border border-[#d5dcd8] bg-white px-4 py-3 text-left text-sm font-medium text-[#16272b] hover:border-[#b8c2bc] transition-colors cursor-pointer"
              >
                <span>{portfolioSubject}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#526068"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${isPortfolioSubjectOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isPortfolioSubjectOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-[#d5dcd8] bg-white py-1 shadow-lg">
                  {PORTFOLIO_SUBJECTS.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => {
                        setPortfolioSubject(subj);
                        setIsPortfolioSubjectOpen(false);
                      }}
                      className={`flex w-full items-center px-4 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                        portfolioSubject === subj
                          ? 'bg-[#edf5f0] text-[#356F58] font-bold'
                          : 'text-[#1e282d] hover:bg-[#faf5eb]'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DATE * */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086]">
                  DATE *
                </label>
                <span className="text-[10px] font-semibold text-[#8b999f]">
                  DD/MM/YYYY
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  placeholder="DD/MM/YYYY (e.g. 12/05/2002)"
                  maxLength={10}
                  value={portfolioDate}
                  onChange={(e) => setPortfolioDate(formatDateInput(e.target.value))}
                  className="w-full rounded-xl border border-[#d5dcd8] bg-white px-4 py-3 pr-11 text-sm text-[#16272b] placeholder-[#8a989f] focus:border-[#356F58] focus:outline-none transition-colors"
                />
                <label
                  className="absolute right-3 cursor-pointer text-[#526068] hover:text-[#356F58] transition-colors p-1"
                  title="Choose date from calendar"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <input
                    type="date"
                    value={displayToIsoDate(portfolioDate)}
                    onChange={(e) => {
                      if (e.target.value) {
                        setPortfolioDate(isoToDisplayDate(e.target.value));
                      }
                    }}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* DESCRIPTION / NOTES */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-2">
                DESCRIPTION / NOTES
              </label>
              <textarea
                rows={3}
                value={portfolioNotes}
                onChange={(e) => setPortfolioNotes(e.target.value)}
                placeholder="What did they do? What skills did it demonstrate?"
                className="w-full rounded-xl border border-[#d5dcd8] bg-white px-4 py-3 text-sm text-[#16272b] placeholder-[#8a989f] focus:border-[#356F58] focus:outline-none transition-colors resize-none min-h-[95px]"
              />
            </div>

            {/* IMAGE URL (OPTIONAL) */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-2">
                IMAGE URL (OPTIONAL)
              </label>
              <input
                type="text"
                value={portfolioImageUrl}
                onChange={(e) => setPortfolioImageUrl(e.target.value)}
                placeholder="Paste a link to a photo of the work"
                className="w-full rounded-xl border border-[#d5dcd8] bg-white px-4 py-3 text-sm text-[#16272b] placeholder-[#8a989f] focus:border-[#356F58] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons: Cancel and Save */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddingPortfolio(false)}
              className="flex-1 rounded-2xl border border-[#d5cbbe] bg-white py-3.5 px-6 text-sm font-bold text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-[#356F58] hover:bg-[#2a5946] active:scale-[0.99] py-3.5 px-6 text-sm font-bold text-white shadow-xs transition-all cursor-pointer text-center"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
