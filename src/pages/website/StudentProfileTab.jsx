import React from 'react';
import { formatDateInput, isoToDisplayDate, displayToIsoDate } from '../../utils/dateFormatter';

/**
 * Profile Tab component for Student Details.
 * Displays Grade selector, Date of Birth, Interests, Learning Strengths, and Learning Challenges.
 */
export default function StudentProfileTab({
  selectedGrade,
  setSelectedGrade,
  isGradeDropdownOpen,
  setIsGradeDropdownOpen,
  GRADE_OPTIONS,
  birthDate,
  setBirthDate,
  interests,
  setInterests,
  strengths,
  toggleStrength,
  challenges,
  toggleChallenge,
  onSaveAndGoToCurriculum,
}) {
  return (
    <div className="space-y-6">
      {/* ABOUT SECTION */}
      <div>
        <h2 className="text-[15px] font-extrabold tracking-wide text-[#16272b] uppercase mb-3">
          ABOUT
        </h2>

        {/* About Card */}
        <div className="rounded-2xl border border-[#e8dfd3] bg-white p-5 shadow-2xs">
          {/* Row 1: GRADE */}
          <div className="flex items-start gap-4">
            {/* Sprout Icon in circle */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d6e5dc]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#356F58"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21V10" />
                <path d="M12 10C8.5 7 4.5 7.5 3.5 10c0 3.5 4 5 8.5 3.5" />
                <path d="M12 12c3.5-3 7.5-2.5 8.5 0 0 3.5-4 5-8.5 3.5" />
              </svg>
            </div>

            {/* Grade Selector */}
            <div className="relative flex-1">
              <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-1.5">
                GRADE
              </label>
              <button
                type="button"
                onClick={() => setIsGradeDropdownOpen(!isGradeDropdownOpen)}
                className="flex w-full items-center justify-between rounded-xl border border-[#d5dcd8] bg-white px-4 py-3 text-left text-sm font-medium text-[#16272b] hover:border-[#b8c2bc] transition-colors cursor-pointer"
              >
                <span>{selectedGrade}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#526068"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${isGradeDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isGradeDropdownOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-[#d5dcd8] bg-white py-1 shadow-lg">
                  {GRADE_OPTIONS.map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => {
                        setSelectedGrade(grade);
                        setIsGradeDropdownOpen(false);
                      }}
                      className={`flex w-full items-center px-4 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                        selectedGrade === grade
                          ? 'bg-[#edf5f0] text-[#356F58] font-bold'
                          : 'text-[#1e282d] hover:bg-[#faf5eb]'
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hairline Divider */}
          <div className="my-5 border-t border-[#ede7dd]" />

          {/* Row 2: DATE OF BIRTH */}
          <div className="flex items-start gap-4">
            {/* Calendar Icon in circle */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d6e5dc]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#356F58"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>

            {/* Date of Birth Input */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086]">
                  DATE OF BIRTH
                </label>
                <span className="text-[10px] font-semibold text-[#8b999f]">
                  DD/MM/YYYY
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={birthDate || ''}
                  onChange={(e) => setBirthDate?.(formatDateInput(e.target.value))}
                  placeholder="DD/MM/YYYY (e.g. 12/05/2002)"
                  maxLength={10}
                  className="w-full rounded-xl border border-[#d5dcd8] bg-white px-4 py-3 pr-11 text-sm text-[#16272b] placeholder-[#819097] focus:border-[#356F58] focus:outline-none transition-colors"
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
                    value={displayToIsoDate(birthDate)}
                    onChange={(e) => {
                      if (e.target.value) {
                        setBirthDate?.(isoToDisplayDate(e.target.value));
                      }
                    }}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Hairline Divider */}
          <div className="my-5 border-t border-[#ede7dd]" />

          {/* Row 3: INTERESTS */}
          <div className="flex items-start gap-4">
            {/* Graduation Cap Icon in circle */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d6e5dc]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#356F58"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10L12 5L2 10L12 15L22 10Z" />
                <path d="M6 12.5V17C6 17 8.5 19.5 12 19.5C15.5 19.5 18 17 18 17V12.5" />
                <path d="M22 10V16" />
              </svg>
            </div>

            {/* Interests Textarea */}
            <div className="flex-1">
              <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-1.5">
                INTERESTS
              </label>
              <textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. animals, space, art, building, stories..."
                rows={2}
                className="w-full rounded-xl border border-[#d5dcd8] bg-white px-4 py-3 text-sm text-[#16272b] placeholder-[#819097] focus:border-[#356F58] focus:outline-none transition-colors resize-none h-[82px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* LEARNING STRENGTHS SECTION */}
      <div>
        <h2 className="text-[15px] font-extrabold tracking-wide text-[#16272b] uppercase mb-3">
          LEARNING STRENGTHS
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {strengths.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleStrength(item.id)}
              className={`rounded-full px-4 py-2 text-xs transition-all cursor-pointer ${
                item.active
                  ? 'border border-transparent bg-[#356F58] text-white font-semibold shadow-2xs'
                  : 'border border-[#d0c8b8] bg-white text-[#2a3a3f] font-medium hover:border-[#356F58]'
              }`}
            >
              {item.active ? `+ ${item.label}` : item.label}
            </button>
          ))}
        </div>
      </div>

      {/* LEARNING CHALLENGES SECTION */}
      <div>
        <h2 className="text-[15px] font-extrabold tracking-wide text-[#16272b] uppercase mb-3">
          LEARNING CHALLENGES
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {challenges.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleChallenge(item.id)}
              className={`rounded-full px-4 py-2 text-xs transition-all cursor-pointer ${
                item.active
                  ? 'border border-transparent bg-[#356F58] text-white font-semibold shadow-2xs'
                  : 'border border-[#d0c8b8] bg-white text-[#2a3a3f] font-medium hover:border-[#356F58]'
              }`}
            >
              {item.active ? `+ ${item.label}` : item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Save & Go to Curriculum Button */}
      {onSaveAndGoToCurriculum && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onSaveAndGoToCurriculum}
            className="w-full rounded-xl bg-[#356F58] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#2a5946] transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Save Profile & Go to Curriculum</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
}
