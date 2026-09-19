import React, { useState } from 'react';

export default function DashboardHome({ onOpenAddCurriculum, onNavigateToStudents, onNavigateToCoach, onNavigateToPlanner }) {
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
  };

  // Schedule Timeline Card matching screenshot exactly
  const renderScheduleCard = (key) => (
    <div key={key} className="rounded-2xl border border-[#ebdcca] bg-white p-3.5 shadow-2xs">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-[15px] font-bold text-[#172b30]">
          Today's Schedule
        </h3>
        <span className="text-[11px] font-semibold text-[#ba633f]">
          Tue, Apr 15
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-5 space-y-3 before:absolute before:left-[8px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#20674c]">
        {/* 8:30 AM Math */}
        <div className="relative flex items-center justify-between">
          <span className="absolute -left-[15px] top-2 h-2 w-2 rounded-full bg-[#1b6b50] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-12 text-[10px] font-bold text-[#637278] shrink-0">8:30 AM</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#dce9e1] text-[#1b6b50]">
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
          <span className="absolute -left-[15px] top-2 h-2 w-2 rounded-full bg-[#1b6b50] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-12 text-[10px] font-bold text-[#637278] shrink-0">9:30 AM</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#dce9e1] text-[#1b6b50]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
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
          <span className="absolute -left-[15px] top-2 h-2 w-2 rounded-full bg-[#ba633f] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-12 text-[10px] font-bold text-[#637278] shrink-0">10:30 AM</span>
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
          <span className="absolute -left-[15px] top-2 h-2 w-2 rounded-full bg-[#1b6b50] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-12 text-[10px] font-bold text-[#637278] shrink-0">11:00 AM</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#dce9e1] text-[#1b6b50]">
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
          <span className="absolute -left-[15px] top-2 h-2 w-2 rounded-full bg-[#1b6b50] ring-2 ring-white" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-12 text-[10px] font-bold text-[#637278] shrink-0">12:00 PM</span>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#dce9e1] text-[#1b6b50]">
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
            <span className="text-[10px] font-extrabold tracking-wider text-[#1b6b50] uppercase">
              YOUR HOMESCHOOL
            </span>
            <h1 className="font-serif text-[28px] sm:text-[32px] font-bold tracking-tight text-[#172b30] leading-none mt-1">
              Good afternoon
            </h1>
            <p className="mt-1 text-xs font-semibold text-[#ba633f]">
              Classical • 1 student
            </p>
          </div>

          <div className="sm:max-w-[240px] sm:text-right pt-0.5">
            <p className="font-serif text-xs sm:text-[13px] font-medium italic leading-snug text-[#ba633f]">
              “Small, faithful steps add up to extraordinary learning.”
            </p>
          </div>
        </div>

        {/* ================================================================
            2-COLUMN GRID LAYOUT (Side-by-side matching screenshot)
            Left: Coach card + Getting Started + To-Do list
            Right: Schedule cards + This Week
            ================================================================ */}
        <div className="grid grid-cols-1 min-[520px]:grid-cols-[1.18fr_1fr] gap-3 sm:gap-3.5 items-start">
          
          {/* ──────── LEFT COLUMN ──────── */}
          <div className="w-full space-y-3.5">
            
            {/* Card: What can I help you with today? */}
            <div className="rounded-2xl border border-[#ebdcca] bg-white p-3.5 shadow-2xs">
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d7e7dc] text-xs font-bold text-[#1b6b50]">
                  T
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-[#172b30]">
                    What can I help you with today?
                  </h3>
                  <p className="text-[10.5px] text-[#637278]">
                    Ask your coach anything about your homeschool journey.
                  </p>

                  {/* Input with Ask button */}
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleAskCoach(); }}
                    className="mt-2.5 flex items-center rounded-lg border border-[#e3dad0] bg-[#faf8f5] p-1 pl-2.5 focus-within:border-[#1b6b50] focus-within:bg-white"
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
                      className="flex shrink-0 items-center gap-1 rounded-md bg-[#1b6b50] px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-2xs hover:bg-[#14553f] transition-colors cursor-pointer"
                    >
                      <span>Ask</span>
                      <span>→</span>
                    </button>
                  </form>

                  {/* Coach AI Response Bubble */}
                  {coachAnswer && (
                    <div className="mt-2 rounded-lg bg-[#f5f0e6] p-2.5 text-[11px] leading-relaxed text-[#27373c]">
                      <span className="font-bold text-[#1b6b50]">Coach: </span>
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

            {/* Section: GETTING STARTED (1 of 4 done) */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-[#3d4b50] uppercase">
                  GETTING STARTED
                </span>
                <span className="text-[10.5px] font-semibold text-[#ba633f]">
                  1 of 4 done
                </span>
              </div>

              {/* Progress Bar (25%) */}
              <div className="mb-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#e3ded4]">
                <div className="h-full w-1/4 rounded-full bg-[#1b6b50]" />
              </div>

              {/* 4 Steps */}
              <div className="space-y-2">
                {/* Step 1: Add your students (done) */}
                <div 
                  onClick={onNavigateToStudents}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-[#b8dbc7] bg-[#edf5f0] p-2.5 shadow-2xs transition-all hover:bg-[#e4f1e8]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1b6b50] text-[10px] font-bold text-white">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11.5px] font-bold text-[#172b30] truncate">
                        Add your students
                      </h4>
                      <p className="text-[9.5px] text-[#637278] truncate">
                        Tell us about the children you're teaching.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#798790] pl-1 shrink-0">›</span>
                </div>

                {/* Step 2: Enter your curriculum */}
                <div className="flex items-center justify-between rounded-xl border border-[#ebdcca] bg-white p-2.5 shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] text-[10.5px] font-bold text-[#526068]">
                      2
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11.5px] font-bold text-[#172b30] truncate">
                        Enter your curriculum
                      </h4>
                      <p className="text-[9.5px] text-[#637278] truncate">
                        Tell us what books and programs you use.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAddCurriculum}
                    className="shrink-0 rounded-md bg-[#1b6b50] px-2 py-1 text-[10px] font-semibold text-white shadow-2xs hover:bg-[#14553f] transition-colors cursor-pointer"
                  >
                    Add curriculum →
                  </button>
                </div>

                {/* Step 3: Build your weekly plan */}
                <div 
                  onClick={onNavigateToPlanner}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-[#ebdcca] bg-white p-2.5 shadow-2xs hover:bg-[#faf6ee] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] text-[10.5px] font-bold text-[#526068]">
                      3
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11.5px] font-bold text-[#172b30] truncate">
                        Build your weekly plan
                      </h4>
                      <p className="text-[9.5px] text-[#637278] truncate">
                        Set which subjects you do each day.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#798790] pl-1 shrink-0">›</span>
                </div>

                {/* Step 4: Ask the AI coach */}
                <div 
                  onClick={onNavigateToCoach}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-[#ebdcca] bg-white p-2.5 shadow-2xs hover:bg-[#faf6ee] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] text-[10.5px] font-bold text-[#526068]">
                      4
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11.5px] font-bold text-[#172b30] truncate">
                        Ask the AI coach
                      </h4>
                      <p className="text-[9.5px] text-[#637278] truncate">
                        Get your first personalized guidance.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#798790] pl-1 shrink-0">›</span>
                </div>
              </div>
            </div>

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
                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] transition-colors ${
                          todo.done ? 'border-[#1b6b50] bg-[#1b6b50] text-white' : 'border-[#2d7a5c] bg-white'
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
                    className="w-full rounded-lg border border-[#dcd3c4] bg-white px-2.5 py-1.5 text-[11px] text-[#1e282d] focus:border-[#1b6b50] focus:outline-hidden"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    autoFocus
                  />
                  <button 
                    type="submit"
                    className="rounded-lg bg-[#1b6b50] px-2.5 py-1.5 text-[11px] font-semibold text-white cursor-pointer"
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
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1e282d] hover:text-[#1b6b50] transition-colors cursor-pointer"
                >
                  <span>+</span>
                  <span>Add a task...</span>
                </button>
              )}
            </div>
          </div>

          {/* ──────── RIGHT COLUMN ──────── */}
          <div className="w-full space-y-3.5">
            {/* Today's Schedule Card 1 */}
            {renderScheduleCard('schedule-1')}

            {/* Today's Schedule Card 2 (matching screenshot mockup) */}
            {renderScheduleCard('schedule-2')}

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
                    <button className="hover:text-[#172b30] cursor-pointer">‹</button>
                    <button className="hover:text-[#172b30] cursor-pointer">›</button>
                  </div>
                </div>
              </div>

              {/* Calendar Days Row */}
              <div className="mb-3 grid grid-cols-7 gap-0.5 text-center">
                <div>
                  <span className="block text-[9px] text-[#798790]">Mon</span>
                  <span className="text-[11px] font-semibold text-[#172b30]">14</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="block text-[9px] text-[#798790]">Tue</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#1b6b50] text-[10px] font-bold text-white">
                    15
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#798790]">Wed</span>
                  <span className="text-[11px] font-semibold text-[#172b30]">16</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#798790]">Thu</span>
                  <span className="text-[11px] font-semibold text-[#172b30]">17</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#798790]">Fri</span>
                  <span className="text-[11px] font-semibold text-[#172b30]">18</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#798790]">Sat</span>
                  <span className="text-[11px] font-semibold text-[#172b30]">19</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#798790]">Sun</span>
                  <span className="text-[11px] font-semibold text-[#172b30]">20</span>
                </div>
              </div>

              {/* Subject Stats */}
              <div className="space-y-1.5 border-t border-[#f0eae0] pt-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1b6b50]" />
                    <span className="font-semibold text-[#172b30]">Math</span>
                  </div>
                  <span className="text-[#637278]">3 lessons</span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1e293b]" />
                    <span className="font-semibold text-[#172b30]">Language Arts</span>
                  </div>
                  <span className="text-[#637278]">4 lessons</span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#2d7a70]" />
                    <span className="font-semibold text-[#172b30]">Science</span>
                  </div>
                  <span className="text-[#637278]">2 lessons</span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#bf7634]" />
                    <span className="font-semibold text-[#172b30]">History</span>
                  </div>
                  <span className="text-[#637278]">1 lesson</span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#3e8a6f]" />
                    <span className="font-semibold text-[#172b30]">Art & Music</span>
                  </div>
                  <span className="text-[#637278]">1 lesson</span>
                </div>
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
