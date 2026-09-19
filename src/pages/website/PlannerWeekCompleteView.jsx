import React, { useState } from 'react';

const DEFAULT_SUBJECT_PILLS = [
  '+ Math',
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

// All days fully completed matching user screenshot
const COMPLETED_DAYS_DATA = [
  {
    id: 'MON',
    label: 'MON',
    count: '3/3',
    items: [
      { id: 'mon-1', title: 'Math', code: 'L14', color: 'bg-[#ba704f]', textColor: 'text-white' },
      { id: 'mon-2', title: 'Reading', code: null, color: 'bg-[#558273]', textColor: 'text-white' },
      { id: 'mon-3', title: 'History', code: null, color: 'bg-[#1e2a38]', textColor: 'text-white' },
    ],
  },
  {
    id: 'TUE',
    label: 'TUE',
    count: '2/2',
    items: [
      { id: 'tue-1', title: 'Math', code: 'L15', color: 'bg-[#ba704f]', textColor: 'text-white' },
      { id: 'tue-2', title: 'Science', code: null, color: 'bg-[#459b73]', textColor: 'text-white' },
    ],
  },
  {
    id: 'WED',
    label: 'WED',
    count: '3/3',
    items: [
      { id: 'wed-1', title: 'Math', code: 'L16', color: 'bg-[#ba704f]', textColor: 'text-white' },
      { id: 'wed-2', title: 'Writing', code: null, color: 'bg-[#e5a93c]', textColor: 'text-white' },
      { id: 'wed-3', title: 'History', code: null, color: 'bg-[#1e2a38]', textColor: 'text-white' },
    ],
  },
  {
    id: 'THU',
    label: 'THU',
    count: '2/2',
    items: [
      { id: 'thu-1', title: 'Reading', code: null, color: 'bg-[#558273]', textColor: 'text-white' },
      { id: 'thu-2', title: 'History', code: null, color: 'bg-[#1e2a38]', textColor: 'text-white' },
    ],
  },
  {
    id: 'FRI',
    label: 'FRI',
    count: '2/2',
    items: [
      { id: 'fri-1', title: 'Review', code: null, color: 'bg-[#ba704f]', textColor: 'text-white' },
      { id: 'fri-2', title: 'Music', code: null, color: 'bg-[#b49fdf]', textColor: 'text-white' },
    ],
  },
];

export default function PlannerWeekCompleteView({
  onBackToHome,
  onUpgradeClick,
  onPrevWeek,
  onNextWeek,
  onOpenLessonDetail,
  onToggleFamilyUnits
}) {
  const [weekNumber, setWeekNumber] = useState(1);
  const [plannerMode, setPlannerMode] = useState('individual');
  const [selectedStudent, setSelectedStudent] = useState('student-1');
  const [selectedDay, setSelectedDay] = useState('WED');
  const [daysData, setDaysData] = useState(COMPLETED_DAYS_DATA);

  // All 3 assignments are marked completed in this view
  const [assignments, setAssignments] = useState([
    {
      id: 'math',
      title: 'MATH',
      titleColor: 'text-[#ba704f]',
      duration: '30 min',
      curriculum: 'Saxon Math',
      isCompleted: true,
    },
    {
      id: 'writing',
      title: 'Writing',
      titleColor: 'text-[#2d7a5b]',
      duration: '20 min',
      curriculum: 'All About Reading',
      isCompleted: true,
    },
    {
      id: 'history',
      title: 'HISTORY',
      titleColor: 'text-[#1e282d]',
      duration: '15 min',
      curriculum: 'Story of the World',
      isCompleted: true,
    },
  ]);

  const [activePills, setActivePills] = useState(['+ Math']);

  const handleToggleComplete = (id) => {
    setAssignments(prev => prev.map(card => {
      if (card.id === id) {
        return { ...card, isCompleted: !card.isCompleted };
      }
      return card;
    }));
  };

  const handleDeleteCard = (id) => {
    if (window.confirm('Are you sure you want to remove this assignment?')) {
      setAssignments(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleTogglePill = (pill) => {
    if (activePills.includes(pill)) {
      setActivePills(activePills.filter(p => p !== pill));
    } else {
      setActivePills([...activePills, pill]);
    }
  };

  const handleExport = () => {
    alert('Exporting completed summary for Week ' + weekNumber + '...');
  };

  const handleNextWeekAction = () => {
    if (onNextWeek) {
      onNextWeek();
    } else {
      setWeekNumber(prev => prev + 1);
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
          3. WEEK ROW WITH EXPORT & PAGINATION (Week 1 + ↓ Export < >)
          ================================================================ */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#16272b] tracking-tight">
            Week {weekNumber}
          </h2>
          <p className="mt-0.5 text-xs sm:text-[13px] font-medium text-[#526068]">
            First week
          </p>
        </div>

        {/* Right side controls: Export and navigation arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-lg border border-[#d5cbbe] bg-white px-3.5 py-1.5 text-xs sm:text-[13px] font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
          >
            <span>↓</span>
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => onPrevWeek ? onPrevWeek() : setWeekNumber(prev => Math.max(1, prev - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d5cbbe] bg-white text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
            aria-label="Previous week"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => onNextWeek ? onNextWeek() : setWeekNumber(prev => prev + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d5cbbe] bg-white text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
            aria-label="Next week"
          >
            ›
          </button>
        </div>
      </div>

      {/* ================================================================
          4. SEGMENTED TOGGLE (Individual vs Family Units)
          ================================================================ */}
      <div className="mb-5 rounded-full border border-[#d5cbbe] bg-white p-1 flex items-center shadow-2xs">
        <button
          type="button"
          onClick={() => setPlannerMode('individual')}
          className={`flex-1 py-2.5 px-4 sm:px-6 rounded-full text-xs sm:text-[14px] font-semibold transition-all cursor-pointer text-center ${plannerMode === 'individual'
              ? 'bg-[#ba704f] text-white shadow-xs'
              : 'text-[#1e282d] hover:text-[#ba704f]'
            }`}
        >
          Individual
        </button>
        <button
          type="button"
          onClick={() => {
            setPlannerMode('family');
            onToggleFamilyUnits?.();
          }}
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
              ? 'border-2 border-[#185842] bg-[#f0f6f3] text-[#185842] font-bold'
              : 'border border-[#cf805d] bg-[#fbf6f1] text-[#ba6644] hover:bg-[#f7ece4]'
            }`}
        >
          Student 1
        </button>

        <button
          type="button"
          onClick={() => setSelectedStudent('student-2')}
          className={`rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${selectedStudent === 'student-2'
              ? 'border-2 border-[#185842] bg-[#f0f6f3] text-[#185842] font-bold'
              : 'border border-[#cf805d] bg-[#fbf6f1] text-[#ba6644] hover:bg-[#f7ece4]'
            }`}
        >
          Student 2
        </button>
      </div>

      {/* ================================================================
          6. WEEKDAYS CARDS ROW (MON, TUE, WED, THU, FRI)
          All completed matching user screenshot:
          - MON: 3/3 (Math L14, Reading, History)
          - TUE: 2/2 (Math L15, Science)
          - WED: 3/3 (Math L16, Writing, History)
          - THU: 2/2 (Reading, History)
          - FRI: 2/2 (Review, Music)
          ================================================================ */}
      <div className="mb-5 grid grid-cols-5 gap-2 sm:gap-3">
        {daysData.map((day) => {
          const isSelected = selectedDay === day.id;

          return (
            <button
              key={day.id}
              type="button"
              onClick={() => setSelectedDay(day.id)}
              className={`flex flex-col justify-start rounded-2xl p-2 sm:p-2.5 transition-all cursor-pointer shadow-2xs text-left min-h-[145px] sm:min-h-[155px] ${isSelected
                  ? 'border border-[#d5cbbe] bg-white ring-1 ring-[#185842]/15'
                  : 'border border-[#e9e1d5] bg-[#faf6ee]/90 hover:bg-white'
                }`}
            >
              {/* Day title & task counter */}
              <div className="text-center w-full mb-2">
                <span className="block text-xs sm:text-[13px] font-extrabold tracking-wider text-[#16272b] uppercase">
                  {day.label}
                </span>
                <span className="block text-[11px] sm:text-xs font-bold text-[#16272b] leading-tight mt-0.5">
                  {day.count}
                </span>
              </div>

              {/* Subject pill badges */}
              <div className="w-full space-y-1">
                {day.items.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg px-2 py-1 text-left ${item.color} ${item.textColor} shadow-2xs`}
                  >
                    <span className="block text-[10px] sm:text-[11px] font-bold leading-tight">
                      {item.title}
                    </span>
                    {item.code && (
                      <span className="block text-[9px] font-medium leading-tight opacity-90">
                        {item.code}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* ================================================================
          7. FULL SOLID GREEN PROGRESS BAR & "3/3 done"
          Matching screenshot: 100% full green bar
          ================================================================ */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 h-2 rounded-full bg-[#187d4a] overflow-hidden">
          <div className="h-full w-full rounded-full bg-[#187d4a]" />
        </div>
        <span className="text-xs font-semibold text-[#1e282d] shrink-0">
          3/3 done
        </span>
      </div>

      {/* ================================================================
          8. "Week 1 complete! Ready for next week? Next Week →" HERO BANNER
          Matching Image: Mint/sage green card with green checkmark and button
          ================================================================ */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#c3ded0] bg-[#e4ede7] p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center gap-3.5">
          {/* Green checkmark circle */}
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#187d4a] text-white shadow-2xs">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-[17px] sm:text-[19px] font-bold text-[#144b36] leading-tight">
              Week 1 complete!
            </h3>
            <p className="text-xs sm:text-[13px] font-bold text-[#1e282d] mt-0.5">
              Ready for next week?
            </p>
          </div>
        </div>

        {/* Next Week → button */}
        <button
          type="button"
          onClick={handleNextWeekAction}
          className="rounded-full bg-[#167846] px-5 py-2.5 text-xs sm:text-[13px] font-bold text-white hover:bg-[#12643a] transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <span>Next Week</span>
          <span>→</span>
        </button>
      </div>

      {/* ================================================================
          9. COMPLETED ASSIGNMENT CARDS (All 3 with Green Checked Circles)
          ================================================================ */}
      <div className="mb-7 rounded-2xl border border-[#e8dfd5] bg-white/70 p-3 sm:p-4 space-y-3 shadow-2xs">
        {assignments.map((card) => {
          return (
            <div
              key={card.id}
              className="rounded-2xl border border-[#ece4d9] bg-white p-4 sm:p-5 shadow-2xs transition-all"
            >
              {/* Top row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {/* Grip icon */}
                  <div className="cursor-grab text-[#a0aab0] flex items-center">
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                      <circle cx="4" cy="3" r="1.5" fill="#9ca3af" />
                      <circle cx="10" cy="3" r="1.5" fill="#9ca3af" />
                      <circle cx="4" cy="9" r="1.5" fill="#9ca3af" />
                      <circle cx="10" cy="9" r="1.5" fill="#9ca3af" />
                      <circle cx="4" cy="15" r="1.5" fill="#9ca3af" />
                      <circle cx="10" cy="15" r="1.5" fill="#9ca3af" />
                    </svg>
                  </div>

                  {/* Circular Checkbox (Checked!) */}
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(card.id)}
                    className={`h-5 w-5 sm:h-5.5 sm:w-5.5 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-2xs ${card.isCompleted
                        ? 'bg-[#267756] border-2 border-[#267756] text-white'
                        : 'bg-white border-2 border-[#d5cbbe]'
                      }`}
                    aria-label={`Toggle completion for ${card.title}`}
                  >
                    {card.isCompleted && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>

                  {/* Subject Name & Duration */}
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs sm:text-[13px] font-extrabold tracking-wide ${card.titleColor}`}>
                        {card.title}
                      </span>
                      <span className="text-[#6b7280] text-xs font-semibold">•</span>
                      <span className="text-xs sm:text-[13px] font-bold text-[#16272b]">
                        {card.duration}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#526068] leading-tight mt-0.5">
                      {card.curriculum}
                    </p>
                  </div>
                </div>

                {/* Right Action buttons: Edit & Trash */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenLessonDetail?.(card)}
                    className="rounded-lg border border-[#d5cbbe] bg-white px-3 py-1 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCard(card.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fdeeed] text-[#d32f2f] hover:bg-[#fbdad7] transition-colors cursor-pointer"
                    title="Delete assignment"
                    aria-label="Delete assignment"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================================================
          10. "Add subjects to Monday" Section
          Matching Image: "+ Math" is dark green filled pill, others are white pills
          ================================================================ */}
      <div className="mt-8">
        <h4 className="text-xs sm:text-sm font-bold text-[#16272b] mb-3">
          Add subjects to Monday
        </h4>

        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {DEFAULT_SUBJECT_PILLS.map((subject) => {
            const isMathPill = subject === '+ Math';

            if (isMathPill) {
              return (
                <button
                  key={subject}
                  type="button"
                  onClick={() => handleTogglePill(subject)}
                  className="rounded-full bg-[#185842] px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] font-bold text-white shadow-2xs hover:bg-[#134937] active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                >
                  {subject}
                </button>
              );
            }

            const isActive = activePills.includes(subject);

            return (
              <button
                key={subject}
                type="button"
                onClick={() => handleTogglePill(subject)}
                className={`rounded-full border px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] font-medium shadow-2xs active:scale-95 transition-all cursor-pointer ${isActive
                    ? 'border-[#185842] bg-[#eef5f1] text-[#185842] font-semibold'
                    : 'border-[#d5cbbe] bg-white text-[#2d3f45] hover:bg-[#faf5eb] hover:border-[#185842]'
                  }`}
              >
                {subject}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
