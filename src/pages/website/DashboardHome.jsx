import React, { useState, useEffect } from 'react';

const WEEK_DAYS = [
  {
    day: 'Mon',
    date: 14,
    fullDate: 'Mon, Apr 14',
    lessons: [
      { name: 'Math', count: '1 lesson', color: 'bg-[#356F58]' },
      { name: 'Language Arts', count: '1 lesson', color: 'bg-[#1e293b]' },
      { name: 'Reading', count: '1 lesson', color: 'bg-[#558273]' },
    ]
  },
  {
    day: 'Tue',
    date: 15,
    fullDate: 'Tue, Apr 15',
    lessons: [
      { name: 'Math', count: '3 lessons', color: 'bg-[#356F58]' },
      { name: 'Language Arts', count: '4 lessons', color: 'bg-[#1e293b]' },
      { name: 'Science', count: '2 lessons', color: 'bg-[#2d7a70]' },
      { name: 'History', count: '1 lesson', color: 'bg-[#bf7634]' },
      { name: 'Art & Music', count: '1 lesson', color: 'bg-[#356F58]' },
    ]
  },
  {
    day: 'Wed',
    date: 16,
    fullDate: 'Wed, Apr 16',
    lessons: [
      { name: 'Math', count: '2 lessons', color: 'bg-[#356F58]' },
      { name: 'Writing', count: '1 lesson', color: 'bg-[#e5a93c]' },
      { name: 'Language Arts', count: '2 lessons', color: 'bg-[#1e293b]' },
      { name: 'History', count: '1 lesson', color: 'bg-[#bf7634]' },
    ]
  },
  {
    day: 'Thu',
    date: 17,
    fullDate: 'Thu, Apr 17',
    lessons: [
      { name: 'Reading', count: '2 lessons', color: 'bg-[#558273]' },
      { name: 'History', count: '1 lesson', color: 'bg-[#bf7634]' },
      { name: 'Science', count: '2 lessons', color: 'bg-[#2d7a70]' },
    ]
  },
  {
    day: 'Fri',
    date: 18,
    fullDate: 'Fri, Apr 18',
    lessons: [
      { name: 'Review', count: '1 lesson', color: 'bg-[#ba704f]' },
      { name: 'Art & Music', count: '2 lessons', color: 'bg-[#356F58]' },
      { name: 'Math', count: '1 lesson', color: 'bg-[#356F58]' },
    ]
  },
  {
    day: 'Sat',
    date: 19,
    fullDate: 'Sat, Apr 19',
    lessons: [
      { name: 'Nature Walk', count: 'Outdoor', color: 'bg-[#356F58]' },
      { name: 'Library Visit', count: 'Free reading', color: 'bg-[#558273]' },
    ]
  },
  {
    day: 'Sun',
    date: 20,
    fullDate: 'Sun, Apr 20',
    lessons: [
      { name: 'Read-Aloud & Rest', count: 'Quiet time', color: 'bg-[#70587c]' },
    ]
  },
];

export default function DashboardHome({ onOpenAddCurriculum, onNavigateToStudents, onNavigateToCoach, onNavigateToPlanner }) {
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      // Clear legacy localStorage data so old testing completed states don't keep it hidden on run
      localStorage.removeItem('tabula_getting_started_steps');
      const saved = sessionStorage.getItem('tabula_getting_started_steps');
      return saved ? JSON.parse(saved) : { 1: false, 2: false, 3: false, 4: false };
    } catch {
      return { 1: false, 2: false, 3: false, 4: false };
    }
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = sessionStorage.getItem('tabula_getting_started_steps');
        if (saved) {
          setCompletedSteps(JSON.parse(saved));
        }
      } catch { }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('tabula_step_completed', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('tabula_step_completed', handleSync);
    };
  }, []);

  const markStepComplete = (stepNum, isComplete = true) => {
    setCompletedSteps(prev => {
      const updated = { ...prev, [stepNum]: isComplete };
      try {
        sessionStorage.setItem('tabula_getting_started_steps', JSON.stringify(updated));
      } catch { }
      return updated;
    });
  };

  const toggleStep = (stepNum, e) => {
    e?.stopPropagation();
    markStepComplete(stepNum, !completedSteps[stepNum]);
  };

  const doneCount = [1, 2, 3, 4].filter((step) => !!completedSteps[step]).length;
  const [selectedDayDate, setSelectedDayDate] = useState(15);
  const [coachQuestion, setCoachQuestion] = useState('');
  const [coachAnswer, setCoachAnswer] = useState(null);

  const [todos, setTodos] = useState([
    { id: 1, text: 'Review curriculum options', tag: 'Today', done: false },
    { id: 2, text: "Plan next week's schedule", tag: 'This week', done: false },
    { id: 3, text: 'Order library books', tag: 'This week', done: false },
    { id: 4, text: 'Complete student profile', tag: 'This week', done: false },
  ]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTaskText, tag: 'This week', done: false }]);
    setNewTaskText('');
    setIsAddingTask(false);
  };

  const handleAskCoach = (q) => {
    const questionToAsk = q || coachQuestion;
    if (!questionToAsk.trim()) return;
    setCoachAnswer(`Great question! For "${questionToAsk}", I recommend breaking lessons into 20-minute focused blocks and alternating between math and creative reading.`);
    setCoachQuestion('');
    markStepComplete(4, true);
  };

  const currentSelectedDayObj = WEEK_DAYS.find(d => d.date === selectedDayDate) || WEEK_DAYS[1];

  // Schedule Timeline Card matching screenshot exactly
  const renderScheduleCard = (key) => (
    <div key={key} className="rounded-2xl border border-[#ebdcca] bg-white p-3.5 shadow-2xs">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-[15px] font-bold text-[#172b30]">
          Today's Schedule
        </h3>
        <span className="text-[11px] font-semibold text-[#ba633f]">
          {currentSelectedDayObj.fullDate}
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-5 space-y-3 before:absolute before:left-[9px] before:top-3 before:bottom-3 before:w-[2px] before:-translate-x-1/2 before:bg-[#356F58]">
        {/* 8:30 AM Math */}
        <div className="relative flex items-center justify-between">
          <span className="absolute -left-[11px] top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#356F58] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-14 text-[10px] font-bold text-[#637278] shrink-0 whitespace-nowrap">8:30 AM</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#dce9e1] text-[#356F58]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="7" x2="16" y2="7" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="17" x2="12" y2="17" />
              </svg>
            </div>
            <div className="min-w-0">
              <h5 className="text-[11.5px] font-bold text-[#172b30] leading-tight truncate">Math</h5>
              <p className="text-[9.5px] text-[#637278] leading-tight truncate">Lesson 5 • Fractions</p>
            </div>
          </div>
          <span className="text-xs text-[#8d9b9f] pl-1 shrink-0">›</span>
        </div>

        {/* 9:30 AM Language Arts */}
        <div className="relative flex items-center justify-between">
          <span className="absolute -left-[11px] top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#356F58] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-14 text-[10px] font-bold text-[#637278] shrink-0 whitespace-nowrap">9:30 AM</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#dce9e1] text-[#356F58]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h5 className="text-[11.5px] font-bold text-[#172b30] leading-tight truncate">Language Arts</h5>
              <p className="text-[9.5px] text-[#637278] leading-tight truncate">Reading & Composition</p>
            </div>
          </div>
          <span className="text-xs text-[#8d9b9f] pl-1 shrink-0">›</span>
        </div>

        {/* 10:30 AM Break */}
        <div className="relative flex items-center justify-between">
          <span className="absolute -left-[11px] top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#ba633f] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-14 text-[10px] font-bold text-[#637278] shrink-0 whitespace-nowrap">10:30 AM</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#faeee6] text-[#ba633f]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
              </svg>
            </div>
            <div className="min-w-0">
              <h5 className="text-[11.5px] font-bold text-[#172b30] leading-tight truncate">Break</h5>
              <p className="text-[9.5px] text-[#637278] leading-tight truncate">Snack & Outdoor Time</p>
            </div>
          </div>
          <span className="text-xs text-[#8d9b9f] pl-1 shrink-0">›</span>
        </div>

        {/* 11:00 AM Science */}
        <div className="relative flex items-center justify-between">
          <span className="absolute -left-[11px] top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#356F58] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-14 text-[10px] font-bold text-[#637278] shrink-0 whitespace-nowrap">11:00 AM</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#dce9e1] text-[#356F58]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31L4.2 19.5A2 2 0 0 0 5.92 22h12.16a2 2 0 0 0 1.72-2.5L14 9.31V2" />
                <line x1="8.5" y1="2" x2="15.5" y2="2" />
              </svg>
            </div>
            <div className="min-w-0">
              <h5 className="text-[11.5px] font-bold text-[#172b30] leading-tight truncate">Science</h5>
              <p className="text-[9.5px] text-[#637278] leading-tight truncate">Chapter 3 • Life Cycles</p>
            </div>
          </div>
          <span className="text-xs text-[#8d9b9f] pl-1 shrink-0">›</span>
        </div>

        {/* 12:00 PM Lunch */}
        <div className="relative flex items-center justify-between">
          <span className="absolute -left-[11px] top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-[#356F58] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-14 text-[10px] font-bold text-[#637278] shrink-0 whitespace-nowrap">12:00 PM</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#dce9e1] text-[#356F58]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11h18a9 9 0 0 1-18 0Z" />
                <path d="M6 7a3 3 0 0 1 3-3" />
                <path d="M12 7a3 3 0 0 1 3-3" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </div>
            <div className="min-w-0">
              <h5 className="text-[11.5px] font-bold text-[#172b30] leading-tight truncate">Lunch</h5>
            </div>
          </div>
          <span className="text-xs text-[#8d9b9f] pl-1 shrink-0">›</span>
        </div>
      </div>

      {/* View Full Day button */}
      <button
        type="button"
        onClick={onNavigateToPlanner}
        className="mt-3.5 w-full rounded-xl border border-[#ded5c7] bg-white py-1.5 text-[11px] font-semibold text-[#ba633f] hover:bg-[#faf5eb] transition-colors text-center cursor-pointer"
      >
        View Full Day →
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-[640px] mx-auto px-3.5 sm:px-4 py-4 sm:py-5 transition-all">

      {/* ================================================================
            TOP GREETING & QUOTE (Left & Right Aligned)
            ================================================================ */}
      <div className="mb-4 flex flex-col justify-between gap-1.5 sm:flex-row sm:items-start">
        <div>
          <span className="text-[12px] font-bold tracking-wider text-[#4E7A5B] uppercase">
            YOUR HOMESCHOOL
          </span>
          <h1
            style={{ fontFamily: 'Lora, serif' }}
            className="text-[36px] font-bold leading-[100%] tracking-[0px] align-middle text-[#212C3E] mt-1"
          >
            Good afternoon
          </h1>
          <p className="mt-1 font-inter text-xs font-semibold text-[#ba633f]">
            Classical • 1 student
          </p>
        </div>
        <p className="font-lora italic font-semibold text-[16px] leading-[20px] text-[#BD7451] sm:text-right max-w-[260px]">
          “Small, faithful steps add up to extraordinary learning.”
        </p>
      </div>

      {/* ================================================================
            2-COLUMN GRID LAYOUT (Side-by-side matching screenshot)
            Left: Coach card + Getting Started + To-Do list
            Right: Schedule card + This Week
            ================================================================ */}
      <div className="grid grid-cols-1 min-[520px]:grid-cols-[1.22fr_1fr] gap-3 sm:gap-3.5 items-start">

        {/* ──────── LEFT COLUMN ──────── */}
        <div className="w-full space-y-3.5">

          {/* Card: What can I help you with today? */}
          <div className="rounded-2xl border border-[#ebdcca] bg-white p-3.5 shadow-2xs">
            <div className="flex items-start gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d7e7dc] text-xs font-bold text-[#356F58]">
                T
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  className="text-[14px] font-semibold leading-[17.5px] tracking-[0px] align-middle text-[#172b30]"
                >
                  What can I help you with today?
                </h3>

                <p
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  className="text-[11px] font-medium leading-[16.5px] tracking-[0px] align-middle text-[#685949]"
                >
                  Ask your coach anything about your homeschool journey.
                </p>

                {/* Input with Ask button */}
                <form
                  onSubmit={(e) => { e.preventDefault(); handleAskCoach(); }}
                  className="mt-2.5 flex items-center rounded-lg border border-[#e3dad0] bg-[#faf8f5] p-1 pl-2.5 focus-within:border-[#356F58] focus-within:bg-white"
                >
                  <input
                    type="text"
                    className="w-full bg-transparent text-[11px] text-[#1e282d] placeholder-[#8d9b9f] focus:outline-hidden"
                    placeholder="Ask your coach anything..."
                    value={coachQuestion}
                    onChange={(e) => setCoachQuestion(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-1 rounded-md bg-[#356F58] px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-2xs hover:bg-[#2a5946] transition-colors cursor-pointer"
                  >
                    <span>Ask</span>
                    <span>→</span>
                  </button>
                </form>

                {/* Coach AI Response Bubble */}
                {coachAnswer && (
                  <div className="mt-2 rounded-lg bg-[#f5f0e6] p-2.5 text-[11px] leading-relaxed text-[#27373c]">
                    <span className="font-bold text-[#356F58]">Coach: </span>
                    {coachAnswer}
                  </div>
                )}

                {/* Prompt Suggestions */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleAskCoach('Plan our week')}
                    className="rounded-md border border-[#ded5c7] bg-white px-2 py-0.5 text-[10.5px] font-medium text-[#46575d] hover:bg-[#faf6ee] transition-colors cursor-pointer"
                  >
                    Plan our week
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAskCoach('What should we prioritize?')}
                    className="rounded-md border border-[#ded5c7] bg-white px-2 py-0.5 text-[10.5px] font-medium text-[#46575d] hover:bg-[#faf6ee] transition-colors cursor-pointer"
                  >
                    What should we prioritize?
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAskCoach('Ideas for a struggling subject')}
                    className="rounded-md border border-[#ded5c7] bg-white px-2 py-0.5 text-[10.5px] font-medium text-[#46575d] hover:bg-[#faf6ee] transition-colors cursor-pointer"
                  >
                    Ideas for a struggling subject
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section: GETTING STARTED (Interactive Steps) - Hides when all 4 steps are completed */}
          {doneCount < 4 && (
            <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-[#3d4b50] uppercase">
                GETTING STARTED
              </span>

              <span className="text-[10.5px] font-semibold text-[#ba633f]">
                {doneCount === 4 ? 'All 4 of 4 done!' : `${doneCount} of 4 done`}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#e3ded4]">
              <div
                className="h-full rounded-full bg-[linear-gradient(92.26deg,#126041_30.56%,#159446_98.6%)] transition-all duration-300"
                style={{ width: `${(doneCount / 4) * 100}%` }}
              />
            </div>

            {/* 4 Steps */}
            <div className="space-y-2">
              {/* Step 1: Add your students */}
              <div
                onClick={() => onNavigateToStudents?.()}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 shadow-2xs transition-all ${completedSteps[1]
                  ? 'border-[#b8dbc7] bg-[#edf5f0] hover:bg-[#e4f1e8]'
                  : 'border-[#ebdcca] bg-white hover:bg-[#faf6ee]'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div
                    onClick={(e) => toggleStep(1, e)}
                    title={completedSteps[1] ? 'Step completed! Click to undo' : 'Click to mark as done'}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all cursor-pointer ${completedSteps[1]
                      ? 'bg-[#159446] text-white shadow-2xs'
                      : 'border border-[#d5cbbe] text-[#526068] hover:border-[#159446] hover:text-[#159446]'
                      }`}
                  >
                    {completedSteps[1] ? (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      '1'
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11.5px] font-bold text-[#172b30] leading-tight">
                      Add your students
                    </h4>
                    <p className="text-[9.5px] font-inter text-[#637278] leading-normal mt-0.5">
                      Tell us about the children you're teaching.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToStudents?.();
                  }}
                  className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold text-white shadow-2xs transition-colors cursor-pointer bg-[#356F58] hover:bg-[#2a5946]`}
                >
                  {completedSteps[1] ? 'Student added ✓' : 'Add student →'}
                </button>
              </div>

              {/* Step 2: Enter your curriculum */}
              <div
                onClick={() => onOpenAddCurriculum?.()}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border p-2.5 shadow-2xs transition-all ${completedSteps[2]
                  ? 'border-[#b8dbc7] bg-[#edf5f0] hover:bg-[#e4f1e8]'
                  : 'border-[#ebdcca] bg-white hover:bg-[#faf6ee]'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div
                    onClick={(e) => toggleStep(2, e)}
                    title={completedSteps[2] ? 'Step completed! Click to undo' : 'Click to mark as done'}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all cursor-pointer ${completedSteps[2]
                      ? 'bg-[#159446] text-white shadow-2xs'
                      : 'border border-[#d5cbbe] text-[#526068] hover:border-[#159446] hover:text-[#159446]'
                      }`}
                  >
                    {completedSteps[2] ? (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      '2'
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11.5px] font-bold text-[#172b30] leading-tight">
                      Enter your curriculum
                    </h4>
                    <p className="text-[9.5px] font-inter text-[#637278] leading-tight mt-0.5">
                      Tell us what books and programs you use.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenAddCurriculum?.();
                  }}
                  className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold text-white shadow-2xs transition-colors cursor-pointer bg-[#356F58] hover:bg-[#2a5946]`}
                >
                  {completedSteps[2] ? 'Curriculum added ✓' : 'Add curriculum →'}
                </button>
              </div>

              {/* Step 3: Build your weekly plan */}
              <div
                onClick={() => onNavigateToPlanner?.()}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 shadow-2xs transition-all ${completedSteps[3]
                  ? 'border-[#b8dbc7] bg-[#edf5f0] hover:bg-[#e4f1e8]'
                  : 'border-[#ebdcca] bg-white hover:bg-[#faf6ee]'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div
                    onClick={(e) => toggleStep(3, e)}
                    title={completedSteps[3] ? 'Step completed! Click to undo' : 'Click to mark as done'}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all cursor-pointer ${completedSteps[3]
                      ? 'bg-[#159446] text-white shadow-2xs'
                      : 'border border-[#d5cbbe] text-[#526068] hover:border-[#159446] hover:text-[#159446]'
                      }`}
                  >
                    {completedSteps[3] ? (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      '3'
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11.5px] font-bold text-[#172b30] leading-tight">
                      Build your weekly plan
                    </h4>
                    <p className="text-[9.5px] font-inter text-[#637278] leading-normal mt-0.5">
                      Set which subjects you do each day.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToPlanner?.();
                  }}
                  className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold text-white shadow-2xs transition-colors cursor-pointer bg-[#356F58] hover:bg-[#2a5946]`}
                >
                  {completedSteps[3] ? 'Plan built ✓' : 'Build plan →'}
                </button>
              </div>

              {/* Step 4: Ask the AI coach */}
              <div
                onClick={() => onNavigateToCoach?.()}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 shadow-2xs transition-all ${completedSteps[4]
                  ? 'border-[#b8dbc7] bg-[#edf5f0] hover:bg-[#e4f1e8]'
                  : 'border-[#ebdcca] bg-white hover:bg-[#faf6ee]'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div
                    onClick={(e) => toggleStep(4, e)}
                    title={completedSteps[4] ? 'Step completed! Click to undo' : 'Click to mark as done'}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all cursor-pointer ${completedSteps[4]
                      ? 'bg-[#159446] text-white shadow-2xs'
                      : 'border border-[#d5cbbe] text-[#526068] hover:border-[#159446] hover:text-[#159446]'
                      }`}
                  >
                    {completedSteps[4] ? (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      '4'
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11.5px] font-bold text-[#172b30] leading-tight">
                      Ask the AI coach
                    </h4>
                    <p className="text-[9.5px] font-inter text-[#637278] leading-normal mt-0.5">
                      Get your first personalized guidance.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToCoach?.();
                  }}
                  className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold text-white shadow-2xs transition-colors cursor-pointer bg-[#356F58] hover:bg-[#2a5946]`}
                >
                  {completedSteps[4] ? 'Coach asked ✓' : 'Ask coach →'}
                </button>
              </div>
            </div>
          </div>
        )}

          {/* Section: TO-DO LIST */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-[#3d4b50] uppercase">
                TO-DO LIST
              </span>
              <button className="text-[10.5px] font-semibold text-[#ba633f] hover:underline cursor-pointer">
                View all →
              </button>
            </div>

            <div className="space-y-1.5">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between rounded-xl border border-[#ebdcca] bg-white px-3 py-2 shadow-2xs transition-all hover:border-[#dcd3c4]"
                >
                  <div
                    onClick={() => toggleTodo(todo.id)}
                    className="flex flex-1 min-w-0 cursor-pointer items-center gap-2.5"
                  >
                    {/* Rounded Green Outline Checkbox matching screenshot */}
                    <div
                      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] transition-colors ${todo.done ? 'border-[#356F58] bg-[#356F58] text-white' : 'border-[#356F58] bg-white'
                        }`}
                    >
                      {todo.done && (
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[11.5px] font-medium truncate ${todo.done ? 'line-through text-[#8d9b9f]' : 'text-[#1e282d]'}`}>
                      {todo.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-1.5">
                    <span className="rounded bg-[#e6ecf5] px-2 py-0.5 text-[9.5px] font-semibold text-[#2b4b73]">
                      {todo.tag}
                    </span>
                    <span className="text-xs text-[#8d9b9f]">›</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add a task trigger */}
            {isAddingTask ? (
              <form onSubmit={handleAddTask} className="mt-2 flex gap-1.5">
                <input
                  type="text"
                  placeholder="Enter task name..."
                  className="w-full rounded-lg border border-[#dcd3c4] bg-white px-2.5 py-1.5 text-[11px] text-[#1e282d] focus:border-[#356F58] focus:outline-hidden"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#356F58] px-2.5 py-1.5 text-[11px] font-semibold text-white cursor-pointer"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="rounded-lg border border-[#dcd3c4] bg-white px-2.5 py-1.5 text-[11px] cursor-pointer"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingTask(true)}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1e282d] hover:text-[#356F58] transition-colors cursor-pointer"
              >
                <span>+</span>
                <span>Add a task...</span>
              </button>
            )}
          </div>
        </div>

        {/* ──────── RIGHT COLUMN ──────── */}
        <div className="w-full space-y-3.5">
          {/* Today's Schedule Card (Only 1 instance now) */}
          {renderScheduleCard('schedule-1')}

          {/* This Week Card (Apr 14 - Apr 20) */}
          <div className="rounded-2xl border border-[#ebdcca] bg-white p-3.5 shadow-2xs">
            <div className="mb-2.5 flex items-center justify-between">
              <h3 className="font-serif text-[15px] font-bold text-[#172b30]">
                This Week
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="text-[10.5px] font-semibold text-[#ba633f]">
                  Apr 14 – Apr 20
                </span>
                <div className="flex items-center gap-1 text-[11px] text-[#637278]">
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = WEEK_DAYS.findIndex(d => d.date === selectedDayDate);
                      const prevIndex = (currentIndex - 1 + WEEK_DAYS.length) % WEEK_DAYS.length;
                      setSelectedDayDate(WEEK_DAYS[prevIndex].date);
                    }}
                    className="hover:text-[#172b30] cursor-pointer p-0.5"
                    aria-label="Previous day"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = WEEK_DAYS.findIndex(d => d.date === selectedDayDate);
                      const nextIndex = (currentIndex + 1) % WEEK_DAYS.length;
                      setSelectedDayDate(WEEK_DAYS[nextIndex].date);
                    }}
                    className="hover:text-[#172b30] cursor-pointer p-0.5"
                    aria-label="Next day"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Days Row - Every day is clickable */}
            <div className="mb-3 grid grid-cols-7 gap-0.5 text-center">
              {WEEK_DAYS.map((d) => {
                const isSelected = selectedDayDate === d.date;
                return (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => setSelectedDayDate(d.date)}
                    className={`flex flex-col items-center py-1 px-0.5 rounded-lg transition-all cursor-pointer ${isSelected
                      ? 'bg-[#edf5f0]'
                      : 'hover:bg-[#faf5eb]'
                      }`}
                  >
                    <span className={`block text-[9px] mb-0.5 transition-colors ${isSelected ? 'font-bold text-[#356F58]' : 'text-[#798790]'
                      }`}>
                      {d.day}
                    </span>
                    {isSelected ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#356F58] text-[10px] font-bold text-white shadow-2xs">
                        {d.date}
                      </span>
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center text-[11px] font-semibold text-[#172b30] hover:text-[#356F58]">
                        {d.date}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Subject Stats for Selected Day */}
            <div className="space-y-1.5 border-t border-[#f0eae0] pt-2.5">
              {currentSelectedDayObj.lessons.length > 0 ? (
                currentSelectedDayObj.lessons.map((lesson, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${lesson.color}`} />
                      <span className="font-semibold text-[#172b30]">{lesson.name}</span>
                    </div>
                    <span className="text-[#637278]">{lesson.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-[10.5px] text-[#8d9b9f] text-center py-1">No lessons scheduled for this day</p>
              )}
            </div>

            {/* Open Planner button */}
            <button
              type="button"
              onClick={onNavigateToPlanner}
              className="mt-3.5 w-full rounded-xl border border-[#ded5c7] bg-white py-1.5 text-[11px] font-semibold text-[#ba633f] hover:bg-[#faf5eb] transition-colors text-center cursor-pointer"
            >
              Open Planner →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}