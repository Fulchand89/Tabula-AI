import React from 'react';

export const ALL_SUBJECTS = [
  'Math',
  'Phonics',
  'Writing',
  'Language Arts',
  'History',
  'Science',
  'Bible / Character',
  'AI & Coding',
  'Classical Languages',
  'Foreign Language',
  'Logic / Thinking',
  'Art',
  'Music',
  'Morning Time',
  'Read-Aloud',
  'Nature Study',
  'Co-op',
  'Review',
  'Physical Education',
];

/**
 * PlannerSubjectPicker component
 * 
 * - "Nothing scheduled for [Day]" heading & subtitle
 * - "Add subjects to [Day]" section
 * - 19 rounded subject pills
 * - When a subject is active (e.g. Math in Image 2):
 *   Renders as "+ Math" with green background: bg-[#185842] text-white
 */
export default function PlannerSubjectPicker({
  dayName = 'Monday',
  activeSubjectNames = [],
  onToggleSubject,
}) {
  return (
    <div className="pt-2">
      {/* ── Nothing scheduled for [Day] ── */}
      <div className="mb-5">
        <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#16272b] tracking-tight leading-tight">
          Nothing scheduled for {dayName}
        </h3>
        <p className="mt-1 text-xs text-[#526068] font-medium">
          Add subjects below to build out this day's plan.
        </p>
      </div>

      {/* ── Add subjects to [Day] ── */}
      <div>
        <h4 className="text-xs sm:text-[13px] font-bold text-[#16272b] mb-3">
          Add subjects to {dayName}
        </h4>

        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {ALL_SUBJECTS.map((subject) => {
            const isAdded = activeSubjectNames.includes(subject);

            return (
              <button
                key={subject}
                type="button"
                onClick={() => onToggleSubject?.(subject)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                  isAdded
                    ? 'bg-[#185842] text-white border border-[#185842] shadow-xs active:scale-95'
                    : 'bg-white border border-[#d5cbbe] text-[#2d3f45] hover:border-[#185842] hover:text-[#185842] hover:bg-[#faf5eb] active:scale-95'
                }`}
              >
                {isAdded ? `+ ${subject}` : subject}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
