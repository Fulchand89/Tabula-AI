import React, { useState } from 'react';

const DAYS = [
  { id: 'MON', label: 'MON' },
  { id: 'TUE', label: 'TUE' },
  { id: 'WED', label: 'WED' },
  { id: 'THU', label: 'THU' },
  { id: 'FRI', label: 'FRI' },
];

export default function PlannerFamilyUnitsView({
  onBackToHome,
  onUpgradeClick,
  onToggleIndividual,
  onEditStudentPlan,
  onNavigateToCoach
}) {
  const [plannerMode, setPlannerMode] = useState('family');
  const [selectedDay, setSelectedDay] = useState('MON');
  const [sharedTopic, setSharedTopic] = useState('');

  const handleModeToggle = (mode) => {
    setPlannerMode(mode);
    if (mode === 'individual') {
      onToggleIndividual?.();
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
          className="rounded-md border border-[#bac7bf] bg-white/70 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#184635] hover:bg-white transition-colors shadow-2xs cursor-pointer"
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
          onClick={onBackToHome}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] bg-white text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
          aria-label="Go back to Home"
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
          3. DAY TITLE & STUDENT COUNT (Monday + 2 students)
          ================================================================ */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#16272b] tracking-tight">
          Monday
        </h2>
        <span className="text-xs sm:text-[13px] font-semibold text-[#526068]">
          2 students
        </span>
      </div>

      {/* ================================================================
          4. SEGMENTED TOGGLE (Individual vs Family Units - Family is Active)
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
          5. WEEKDAYS ROW (MON, TUE, WED, THU, FRI)
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
          6. SHARED FAMILY TOPIC INPUT SECTION
          ================================================================ */}
      <div className="mb-6">
        <label className="block text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase mb-2">
          SHARED FAMILY TOPIC
        </label>
        <input
          type="text"
          value={sharedTopic}
          onChange={(e) => setSharedTopic(e.target.value)}
          placeholder="e.g. Ancient Egypt, Water Cycle, American Revolution..."
          className="w-full rounded-2xl border border-[#e8dfd5] bg-white px-4 py-3 text-xs sm:text-[13px] text-[#1e282d] placeholder-[#9ca3af] focus:border-[#ba704f] focus:outline-hidden shadow-2xs"
        />
        <p className="mt-2 text-xs text-[#526068] leading-relaxed">
          Use this for subjects you teach together. Each child still has their own independent assignments below.
        </p>
      </div>

      {/* ================================================================
          7. TWO STUDENT CARDS ROW (Student 1 & Student 2)
          ================================================================ */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Student 1 Card */}
        <div className="rounded-2xl border border-[#e8dfd5] bg-white overflow-hidden shadow-2xs">
          {/* Header block with terracotta fill */}
          <div className="bg-[#ba704f] p-4 text-center text-white">
            <h3 className="font-bold text-sm sm:text-base leading-tight">
              Student
            </h3>
            <p className="text-xs text-white/90 leading-tight mt-0.5">
              10th Grade • 0/0 done
            </p>
          </div>

          {/* Body */}
          <div className="p-5 text-center">
            <p className="text-xs text-[#526068] font-medium mb-4">
              No subjects scheduled
            </p>
            <button
              type="button"
              onClick={() => onEditStudentPlan?.(1)}
              className="w-full rounded-xl border border-dashed border-[#ba704f] bg-transparent py-2.5 px-4 text-xs font-semibold text-[#ba704f] hover:bg-[#fdfaf7] transition-all cursor-pointer text-center"
            >
              Edit Student's plan →
            </button>
          </div>
        </div>

        {/* Student 2 Card */}
        <div className="rounded-2xl border border-[#e8dfd5] bg-white overflow-hidden shadow-2xs">
          {/* Header block with terracotta fill */}
          <div className="bg-[#ba704f] p-4 text-center text-white">
            <h3 className="font-bold text-sm sm:text-base leading-tight">
              Student 2
            </h3>
            <p className="text-xs text-white/90 leading-tight mt-0.5">
              11th Grade • 0/0 done
            </p>
          </div>

          {/* Body */}
          <div className="p-5 text-center">
            <p className="text-xs text-[#526068] font-medium mb-4">
              No subjects scheduled
            </p>
            <button
              type="button"
              onClick={() => onEditStudentPlan?.(2)}
              className="w-full rounded-xl border border-dashed border-[#ba704f] bg-transparent py-2.5 px-4 text-xs font-semibold text-[#ba704f] hover:bg-[#fdfaf7] transition-all cursor-pointer text-center"
            >
              Edit Student 2 's plan →
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================
          8. TIP: ASK THE AI COACH CARD
          ================================================================ */}
      <div className="rounded-2xl border border-[#e8dfd5] bg-white p-5 sm:p-6 shadow-2xs">
        <h4 className="font-serif text-[15px] sm:text-[17px] font-bold text-[#ba704f]">
          Tip: Ask the AI Coach
        </h4>
        <p className="mt-2 text-xs sm:text-[13px] text-[#526068] leading-relaxed">
          Go to the Coach tab and select "Teach this topic to all my kids" or "Find our shared themes" to get personalized multi-age lesson ideas for today's shared topic.
        </p>
      </div>
    </div>
  );
}
