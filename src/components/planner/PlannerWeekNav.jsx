import React from 'react';

/**
 * PlannerWeekNav component
 * 
 * Week title ("Week 1 / First week"), 
 * Individual vs Family Units switcher,
 * Student 1 & Student 2 selector pills.
 */
export default function PlannerWeekNav({
  weekNumber = 1,
  weekSubtitle = 'First week',
  plannerMode = 'individual',
  onModeChange,
  selectedStudent = 'student-1',
  onStudentChange,
  onToggleFamilyUnits,
  onViewCompleteWeek,
  onPrevWeek,
  onNextWeek,
}) {
  const handleFamilyClick = () => {
    onModeChange?.('family');
    onToggleFamilyUnits?.();
  };

  return (
    <div className="space-y-3.5">
      {/* ── Week 1 Title & Subtitle + Week Navigation Controls ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#16272b] tracking-tight leading-tight">
            Week {weekNumber}
          </h2>
          <p className="mt-0.5 text-xs text-[#526068] font-medium">
            {weekSubtitle}
          </p>
        </div>

        {/* Controls: Week Complete Button & Arrows */}
        <div className="flex items-center gap-1.5">
          {onViewCompleteWeek && (
            <button
              type="button"
              onClick={onViewCompleteWeek}
              className="flex items-center gap-1 rounded-lg border border-[#c2decb] bg-[#eef7f1] px-2 sm:px-2.5 py-1 text-[10.5px] sm:text-[11px] font-bold text-[#356F58] hover:bg-[#e2f2e7] transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
              title="View completed week"
            >
              <span>Week Complete</span>
              <span>›</span>
            </button>
          )}
          {onPrevWeek && (
            <button
              type="button"
              onClick={onPrevWeek}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#d5cbbe] bg-white text-xs font-bold text-[#16272b] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
              aria-label="Previous week"
            >
              ‹
            </button>
          )}
          {(onNextWeek || onViewCompleteWeek) && (
            <button
              type="button"
              onClick={onNextWeek || onViewCompleteWeek}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#d5cbbe] bg-white text-xs font-bold text-[#16272b] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
              aria-label="Next week"
            >
              ›
            </button>
          )}
        </div>
      </div>

      {/* ── Segmented Toggle (Individual vs Family Units) ── */}
      <div className="rounded-full border border-[#d5cbbe] bg-white p-1 flex items-center shadow-2xs">
        <button
          type="button"
          onClick={() => onModeChange?.('individual')}
          className={`flex-1 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full text-xs font-semibold transition-all cursor-pointer text-center ${
            plannerMode === 'individual'
              ? 'bg-[#ba704f] text-white shadow-xs'
              : 'text-[#16272b] hover:text-[#ba704f]'
          }`}
        >
          Individual
        </button>
        <button
          type="button"
          onClick={handleFamilyClick}
          className={`flex-1 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full text-xs font-semibold transition-all cursor-pointer text-center ${
            plannerMode === 'family'
              ? 'bg-[#ba704f] text-white shadow-xs'
              : 'text-[#16272b] hover:text-[#ba704f]'
          }`}
        >
          Family Units
        </button>
      </div>

      {/* ── Student Selector Pills (Student 1 / Student 2) ── */}
      <div className="flex items-center gap-2.5 pt-0.5">
        <button
          type="button"
          onClick={() => onStudentChange?.('student-1')}
          className={`rounded-full px-4 py-1 text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
            selectedStudent === 'student-1'
              ? 'border-2 border-[#356F58] bg-white text-[#356F58] font-bold'
              : 'border border-[#cf805d] bg-white text-[#ba6644] hover:bg-[#fffaf6]'
          }`}
        >
          Student 1
        </button>

        <button
          type="button"
          onClick={() => onStudentChange?.('student-2')}
          className={`rounded-full px-4 py-1 text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
            selectedStudent === 'student-2'
              ? 'border-2 border-[#356F58] bg-white text-[#356F58] font-bold'
              : 'border border-[#cf805d] bg-white text-[#ba6644] hover:bg-[#fffaf6]'
          }`}
        >
          Student 2
        </button>
      </div>
    </div>
  );
}
