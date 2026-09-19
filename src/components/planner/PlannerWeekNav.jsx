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
}) {
  const handleFamilyClick = () => {
    onModeChange?.('family');
    onToggleFamilyUnits?.();
  };

  return (
    <div className="space-y-3.5">
      {/* ── Week 1 Title & Subtitle ── */}
      <div>
        <h2 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#16272b] tracking-tight leading-tight">
          Week {weekNumber}
        </h2>
        <p className="mt-0.5 text-xs text-[#526068] font-medium">
          {weekSubtitle}
        </p>
      </div>

      {/* ── Segmented Toggle (Individual vs Family Units) ── */}
      <div className="rounded-full border border-[#d5cbbe] bg-white p-1 flex items-center shadow-2xs">
        <button
          type="button"
          onClick={() => onModeChange?.('individual')}
          className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold transition-all cursor-pointer text-center ${
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
          className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold transition-all cursor-pointer text-center ${
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
              ? 'border-2 border-[#185842] bg-white text-[#185842] font-bold'
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
              ? 'border-2 border-[#185842] bg-white text-[#185842] font-bold'
              : 'border border-[#cf805d] bg-white text-[#ba6644] hover:bg-[#fffaf6]'
          }`}
        >
          Student 2
        </button>
      </div>
    </div>
  );
}
