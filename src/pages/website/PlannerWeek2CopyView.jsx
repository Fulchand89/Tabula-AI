import React, { useState } from 'react';

const DEFAULT_SUBJECTS = [
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

const DAYS = [
  { id: 'MON', label: 'MON' },
  { id: 'TUE', label: 'TUE' },
  { id: 'WED', label: 'WED' },
  { id: 'THU', label: 'THU' },
  { id: 'FRI', label: 'FRI' },
];

export default function PlannerWeek2CopyView({
  onBackToHome,
  onUpgradeClick,
  onToggleFamilyUnits,
  onCopySchedule,
  onCopySubjectsOnly,
  onStartFresh,
  onPrevWeek,
  // Dynamic week info from AppShell
  weekNumber = 2,
  weekSubtitle = 'Second week',
  prevWeekNumber = 1,
}) {
  const [plannerMode, setPlannerMode] = useState('individual');
  const [selectedStudent, setSelectedStudent] = useState('student-1');
  const [selectedDay, setSelectedDay] = useState('MON');

  const handleModeToggle = (mode) => {
    setPlannerMode(mode);
    if (mode === 'family') {
      onToggleFamilyUnits?.();
    }
  };

  return (
    <div className="mx-auto w-full max-w-[640px] pb-32 pt-4 px-3.5 sm:px-4 transition-all">
      {/* ================================================================
          1. TOP TRIAL BANNER (Free trial — 14 days left + Upgrade →)
          ================================================================ */}
      <div className="mb-4 flex items-center justify-between border-b border-[#e9e2d5] pb-2.5">
        <span className="text-[11px] font-semibold text-[#b9613b]">
          Free trial — 14 days left
        </span>
        <button
          type="button"
          onClick={onUpgradeClick}
          className="rounded-md border border-[#bac7bf] bg-white/70 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#356F58] hover:bg-white transition-colors shadow-2xs cursor-pointer"
        >
          Upgrade →
        </button>
      </div>

      {/* ================================================================
          2. PAGE HEADER (Circle Back Arrow + Planner Title)
          ================================================================ */}
      <div className="mb-4 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onPrevWeek || onBackToHome}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] bg-white text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
          aria-label="Go back"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="font-serif text-2xl font-bold leading-tight text-[#16272b] tracking-tight">
          Planner
        </h1>
      </div>

      {/* ================================================================
          3. WEEK HEADER (dynamic week number + subtitle)
          ================================================================ */}
      <div className="mb-5">
        <h2 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#16272b] tracking-tight">
          Week {weekNumber}
        </h2>
        <p className="mt-0.5 text-xs sm:text-[13px] font-medium text-[#526068]">
          {weekSubtitle}
        </p>
      </div>

      {/* ================================================================
          4. SEGMENTED TOGGLE (Individual vs Family Units)
          ================================================================ */}
      <div className="mb-5 rounded-full border border-[#d5cbbe] bg-white p-1 flex items-center shadow-2xs">
        <button
          type="button"
          onClick={() => handleModeToggle('individual')}
          className={`flex-1 py-2.5 px-4 sm:px-6 rounded-full text-xs sm:text-[14px] font-semibold transition-all cursor-pointer text-center ${plannerMode === 'individual'
              ? 'bg-[#ba704f] text-white shadow-xs'
              : 'text-[#1e282d] hover:text-[#ba704f]'
            }`}
        >
          Individual
        </button>
        <button
          type="button"
          onClick={() => handleModeToggle('family')}
          className={`flex-1 py-2.5 px-4 sm:px-6 rounded-full text-xs sm:text-[14px] font-semibold transition-all cursor-pointer text-center ${plannerMode === 'family'
              ? 'bg-[#ba704f] text-white shadow-xs'
              : 'text-[#1e282d] hover:text-[#ba704f]'
            }`}
        >
          Family Units
        </button>
      </div>

      {/* ================================================================
          5. STUDENT SELECTOR PILLS (Student 1 / Student 2)
          ================================================================ */}
      <div className="mb-5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setSelectedStudent('student-1')}
          className={`rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${selectedStudent === 'student-1'
              ? 'border-2 border-[#356F58] bg-[#f0f6f3] text-[#356F58] font-bold'
              : 'border border-[#cf805d] bg-[#fbf6f1] text-[#ba6644] hover:bg-[#f7ece4]'
            }`}
        >
          Student 1
        </button>

        <button
          type="button"
          onClick={() => setSelectedStudent('student-2')}
          className={`rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${selectedStudent === 'student-2'
              ? 'border-2 border-[#356F58] bg-[#f0f6f3] text-[#356F58] font-bold'
              : 'border border-[#cf805d] bg-[#fbf6f1] text-[#ba6644] hover:bg-[#f7ece4]'
            }`}
        >
          Student 2
        </button>
      </div>

      {/* ================================================================
          6. PROGRESS BAR & "0/0 done"
          ================================================================ */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 h-2 rounded-full bg-[#e6dfd4] overflow-hidden">
          <div className="h-full rounded-full bg-[#356F58]" style={{ width: '0%' }} />
        </div>
        <span className="text-xs font-semibold text-[#526068] shrink-0">
          0/0 done
        </span>
      </div>

      {/* ================================================================
          7. WEEKDAYS EMPTY CARDS ROW (MON, TUE, WED, THU, FRI)
          ================================================================ */}
      <div className="mb-6 grid grid-cols-5 gap-2 sm:gap-3">
        {DAYS.map((day) => {
          const isSelected = selectedDay === day.id;
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => setSelectedDay(day.id)}
              className={`h-16 sm:h-20 flex items-center justify-center rounded-2xl transition-all cursor-pointer shadow-2xs text-center ${isSelected
                  ? 'border-2 border-[#d5cbbe] bg-white text-[#16272b] font-bold'
                  : 'border border-[#e9e1d5] bg-[#faf6ee]/90 text-[#37474f] font-semibold hover:bg-white'
                }`}
            >
              <span className="text-xs sm:text-sm tracking-wider uppercase">
                {day.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================================================================
          8. HERO CARD: "Start from last week?"
          ================================================================ */}
      <div className="mb-7 rounded-2xl border border-[#eedfd6] bg-white p-6 shadow-2xs">
        <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#ba704f] leading-tight">
          Start from last week?
        </h3>
        <p className="mt-2 text-xs sm:text-[13px] text-[#526068] leading-relaxed">
          Week {weekNumber} is empty. Copy your Week {prevWeekNumber} schedule so you only need to update the specific lessons — everything else stays the same.
        </p>

        {/* Buttons Row */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-3">
          <button
            type="button"
            onClick={onCopySchedule}
            className="flex-1 rounded-xl bg-[#356F58] py-3 px-5 text-center text-xs sm:text-sm font-bold text-white hover:bg-[#2a5946] transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
          >
            <span>Copy Schedule + Notes</span>
            <span>→</span>
          </button>

          <button
            type="button"
            onClick={onCopySubjectsOnly || onCopySchedule}
            className="flex-1 rounded-xl border border-[#d5cbbe] bg-white py-3 px-5 text-center text-xs sm:text-sm font-bold text-[#1e282d] hover:bg-[#faf5eb] transition-all cursor-pointer shadow-2xs"
          >
            Subjects Only
          </button>
        </div>

        {/* Explanation text */}
        <p className="mt-4 text-xs sm:text-[12px] text-[#526068] leading-relaxed">
          <strong className="text-[#ba704f] font-bold">Copy schedule + notes</strong> — brings over subjects, duration, lesson type, and your teaching notes. Assignment field cleared so you fill in this week's lesson.
        </p>

        {/* Start fresh link */}
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={onStartFresh}
            className="text-xs sm:text-[13px] font-bold text-[#1e282d] hover:underline cursor-pointer transition-all"
          >
            Start fresh instead
          </button>
        </div>
      </div>

      {/* ================================================================
          9. "Nothing scheduled for Monday" Section
          ================================================================ */}
      <div className="mb-6">
        <h3 className="font-serif text-[24px] sm:text-[26px] font-bold text-[#16272b] tracking-tight">
          Nothing scheduled for Monday
        </h3>
        <p className="mt-1 text-xs sm:text-[13px] text-[#526068]">
          Add subjects below to build out this day's plan.
        </p>
      </div>

      {/* ================================================================
          10. "Add subjects to Monday" Section
          ================================================================ */}
      <div>
        <h4 className="text-xs sm:text-sm font-bold text-[#16272b] mb-3">
          Add subjects to Monday
        </h4>

        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {DEFAULT_SUBJECTS.map((subject) => (
            <button
              key={subject}
              type="button"
              className="rounded-full border border-[#d5cbbe] bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] font-medium text-[#2d3f45] shadow-2xs hover:bg-[#faf5eb] hover:border-[#356F58] transition-colors cursor-pointer"
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
