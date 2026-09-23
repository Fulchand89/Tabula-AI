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

// Initial data matching the user's latest screenshot exactly
const INITIAL_DAYS_DATA = [
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
    count: '0/3',
    items: [
      { id: 'wed-1', title: 'Math', code: 'L16', color: 'bg-[#ba704f]', textColor: 'text-white' },
      { id: 'wed-2', title: 'Writing', code: null, color: 'bg-[#e5a93c]', textColor: 'text-white' },
      { id: 'wed-3', title: 'History', code: null, color: 'bg-[#1e2a38]', textColor: 'text-white' },
    ],
  },
  {
    id: 'THU',
    label: 'THU',
    count: '0/2',
    items: [
      { id: 'thu-1', title: 'Reading', code: null, color: 'bg-[#558273]', textColor: 'text-white' },
      { id: 'thu-2', title: 'History', code: null, color: 'bg-[#1e2a38]', textColor: 'text-white' },
    ],
  },
  {
    id: 'FRI',
    label: 'FRI',
    count: '0/2',
    items: [
      { id: 'fri-1', title: 'Review', code: null, color: 'bg-[#ba704f]', textColor: 'text-white' },
      { id: 'fri-2', title: 'Music', code: null, color: 'bg-[#b49fdf]', textColor: 'text-white' },
    ],
  },
];

export default function PlannerScheduleView({
  onBackToHome,
  onUpgradeClick,
  onOpenLessonDetail,
  onToggleFamilyUnits
}) {
  // Week state
  const [weekNumber, setWeekNumber] = useState(1);

  // Toggle: Individual vs Family Units
  const [plannerMode, setPlannerMode] = useState('individual');

  // Student selection: 'student-1' vs 'student-2'
  const [selectedStudent, setSelectedStudent] = useState('student-1');

  // Active day: WED is active by default in user's screenshot
  const [selectedDay, setSelectedDay] = useState('WED');

  // Day cards data
  const [daysData, setDaysData] = useState(INITIAL_DAYS_DATA);

  // Assignment cards for the active day (Wednesday)
  const [assignments, setAssignments] = useState([
    {
      id: 'math',
      title: 'MATH',
      titleColor: 'text-[#ba704f]',
      duration: '30 min',
      curriculum: 'Saxon Math',
      checkboxColor: 'border-[#ba704f]',
      isCompleted: false,
      hasAddDashedBox: true,
      isHighlighted: true, // Green highlight border in screenshot
    },
    {
      id: 'writing',
      title: 'Writing',
      titleColor: 'text-[#356F58]',
      duration: '20 min',
      curriculum: 'All About Reading',
      checkboxColor: 'border-[#459b73]',
      isCompleted: false,
      hasAddDashedBox: false,
      isHighlighted: false,
    },
    {
      id: 'history',
      title: 'HISTORY',
      titleColor: 'text-[#1e282d]',
      duration: '15 min',
      curriculum: 'Story of the World',
      checkboxColor: 'bg-[#356F58] border-[#356F58]',
      isCompleted: true, // Marked completed with checkmark in screenshot
      hasAddDashedBox: false,
      isHighlighted: false,
    },
  ]);

  // Inline assignment adding state for Math
  const [isAddingMathAssignment, setIsAddingMathAssignment] = useState(false);
  const [mathAssignmentText, setMathAssignmentText] = useState('');
  const [mathSubtasks, setMathSubtasks] = useState([]);

  // Editing state for modal
  const [editingCard, setEditingCard] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editCurriculum, setEditCurriculum] = useState('');

  // Selected pills list for adding subjects
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

  const handleOpenEdit = (card) => {
    setEditingCard(card);
    setEditTitle(card.title);
    setEditDuration(card.duration);
    setEditCurriculum(card.curriculum);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingCard) return;
    setAssignments(prev => prev.map(c => {
      if (c.id === editingCard.id) {
        return {
          ...c,
          title: editTitle,
          duration: editDuration,
          curriculum: editCurriculum,
        };
      }
      return c;
    }));
    setEditingCard(null);
  };

  const handleAddMathSubtask = (e) => {
    e.preventDefault();
    if (!mathAssignmentText.trim()) return;
    setMathSubtasks([...mathSubtasks, { id: Date.now(), text: mathAssignmentText }]);
    setMathAssignmentText('');
    setIsAddingMathAssignment(false);
  };

  const handleTogglePill = (pill) => {
    if (activePills.includes(pill)) {
      setActivePills(activePills.filter(p => p !== pill));
    } else {
      setActivePills([...activePills, pill]);
    }
  };

  const handleExport = () => {
    alert('Exporting schedule for Week ' + weekNumber + '...');
  };

  // Calculate progress stats
  const totalCards = assignments.length;
  const completedCards = assignments.filter(c => c.isCompleted).length;

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
            onClick={() => setWeekNumber(prev => Math.max(1, prev - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d5cbbe] bg-white text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
            aria-label="Previous week"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => setWeekNumber(prev => prev + 1)}
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
          6. WEEKDAYS CARDS ROW (MON, TUE, WED, THU, FRI)
          Matching Image:
          - MON (3/3): Math L14, Reading, History
          - TUE (2/2): Math L15, Science
          - WED (0/3): Math L16, Writing, History (Highlighted with green border)
          - THU (0/2): Reading, History
          - FRI (0/2): Review, Music
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
                ? 'border-2 border-[#356F58] bg-[#fdfefd] ring-1 ring-[#356F58]/20'
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
          7. PROGRESS BAR & "0/3 done" (Under the Day cards)
          ================================================================ */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 h-2 rounded-full bg-[#e6dfd4] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#356F58] transition-all duration-300"
            style={{ width: '18%' }}
          />
        </div>
        <span className="text-xs font-semibold text-[#526068] shrink-0">
          0/3 done
        </span>
      </div>

      {/* ================================================================
          8. SCHEDULED ASSIGNMENT CARDS (MATH, Writing, HISTORY)
          ================================================================ */}
      <div className="mb-7 space-y-3">
        {assignments.map((card) => {
          return (
            <div
              key={card.id}
              className={`rounded-2xl bg-white p-4 sm:p-5 shadow-2xs transition-all ${card.isHighlighted
                ? 'border-2 border-[#356F58]'
                : 'border border-[#e9e1d5]'
                }`}
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

                  {/* Circular Checkbox */}
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(card.id)}
                    className={`h-5 w-5 sm:h-5.5 sm:w-5.5 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${card.isCompleted
                      ? 'border-[#356F58] bg-[#356F58] text-white'
                      : `${card.checkboxColor} bg-white hover:bg-[#faf5eb]`
                      }`}
                    aria-label={`Mark ${card.title} complete`}
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
                    onClick={() => {
                      if (onOpenLessonDetail) {
                        onOpenLessonDetail(card);
                      } else {
                        handleOpenEdit(card);
                      }
                    }}
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

              {/* Subtasks under Math */}
              {card.id === 'math' && mathSubtasks.length > 0 && (
                <div className="mt-3 space-y-1.5 pl-8">
                  {mathSubtasks.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs text-[#1e282d] bg-[#fdfaf7] rounded-lg p-2 border border-[#fae5d9]">
                      <span className="font-medium">• {item.text}</span>
                      <button
                        type="button"
                        onClick={() => setMathSubtasks(mathSubtasks.filter(a => a.id !== item.id))}
                        className="text-[#9ca3af] hover:text-[#d32f2f] text-xs px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Math card: "+ Add today's assignment" dashed box */}
              {card.hasAddDashedBox && (
                isAddingMathAssignment ? (
                  <form onSubmit={handleAddMathSubtask} className="mt-4 flex items-center gap-2">
                    <input
                      type="text"
                      autoFocus
                      placeholder="e.g. Lesson 16 problems..."
                      value={mathAssignmentText}
                      onChange={(e) => setMathAssignmentText(e.target.value)}
                      className="flex-1 rounded-xl border border-[#e69b7c] bg-[#fdfaf7] px-3 py-1.5 text-xs text-[#1e282d] placeholder-[#9ca3af] focus:outline-hidden focus:ring-1 focus:ring-[#ba704f]"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-[#ba704f] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#a66042] cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingMathAssignment(false)}
                      className="rounded-xl border border-[#d5cbbe] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#526068] hover:bg-[#faf5eb] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div
                    onClick={() => setIsAddingMathAssignment(true)}
                    className="mt-4 rounded-xl border border-dashed border-[#e69b7c] bg-[#fdfaf7]/60 py-2.5 px-4 text-center cursor-pointer hover:bg-[#fbf4ee] hover:border-[#ba704f] transition-all select-none"
                  >
                    <span className="text-xs sm:text-[13px] font-semibold text-[#ba704f]">
                      + Add today's assignment
                    </span>
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* ================================================================
          9. "Add subjects to Monday" Section
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
                  className="rounded-full bg-[#356F58] px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] font-bold text-white shadow-2xs hover:bg-[#2a5946] active:scale-95 transition-all cursor-pointer flex items-center gap-1"
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
                  ? 'border-[#356F58] bg-[#eef5f1] text-[#356F58] font-semibold'
                  : 'border-[#d5cbbe] bg-white text-[#2d3f45] hover:bg-[#faf5eb] hover:border-[#356F58]'
                  }`}
              >
                {subject}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================================================
          10. EDIT MODAL FOR ASSIGNMENTS
          ================================================================ */}
      {editingCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setEditingCard(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-lg font-bold text-[#16272b]">
              Edit {editingCard.title} Assignment
            </h3>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#526068] mb-1">
                  Subject Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-lg border border-[#d5cbbe] px-3 py-2 text-xs text-[#1e282d] focus:border-[#356F58] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#526068] mb-1">
                  Curriculum Name
                </label>
                <input
                  type="text"
                  value={editCurriculum}
                  onChange={(e) => setEditCurriculum(e.target.value)}
                  className="w-full rounded-lg border border-[#d5cbbe] px-3 py-2 text-xs text-[#1e282d] focus:border-[#356F58] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#526068] mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  className="w-full rounded-lg border border-[#d5cbbe] px-3 py-2 text-xs text-[#1e282d] focus:border-[#356F58] focus:outline-hidden"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="rounded-lg border border-[#d5cbbe] px-3.5 py-1.5 text-xs font-semibold text-[#526068] hover:bg-[#faf5eb]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#356F58] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#2a5946]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
