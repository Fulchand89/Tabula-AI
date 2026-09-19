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
  { id: 'MON', label: 'MON', full: 'Monday' },
  { id: 'TUE', label: 'TUE', full: 'Tuesday' },
  { id: 'WED', label: 'WED', full: 'Wednesday' },
  { id: 'THU', label: 'THU', full: 'Thursday' },
  { id: 'FRI', label: 'FRI', full: 'Friday' },
];

export default function PlannerView({ onBackToHome, onUpgradeClick }) {
  // Mode: 'individual' vs 'family'
  const [plannerMode, setPlannerMode] = useState('individual');
  
  // Active student: 'student-1' vs 'student-2'
  const [selectedStudent, setSelectedStudent] = useState('student-1');
  
  // Current selected day (MON is default matching screenshot)
  const [selectedDay, setSelectedDay] = useState('MON');
  
  // Schedule state mapped by student and day
  // Initial state is empty for Monday to match the screenshot "Nothing scheduled for Monday"
  const [scheduleData, setScheduleData] = useState({
    'student-1': {
      MON: [],
      TUE: [],
      WED: [],
      THU: [],
      FRI: [],
    },
    'student-2': {
      MON: [],
      TUE: [],
      WED: [],
      THU: [],
      FRI: [],
    },
  });

  // Current list of items for selected student and day
  const currentStudentSchedule = scheduleData[selectedStudent] || { MON: [], TUE: [], WED: [], THU: [], FRI: [] };
  const currentDayItems = currentStudentSchedule[selectedDay] || [];

  // Calculate total items and done items for the current day or week
  const totalTasks = currentDayItems.length;
  const doneTasks = currentDayItems.filter(item => item.done).length;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  // Add subject to current day
  const handleAddSubject = (subjectName) => {
    const newItem = {
      id: `${subjectName}-${Date.now()}`,
      title: subjectName,
      done: false,
    };

    setScheduleData(prev => ({
      ...prev,
      [selectedStudent]: {
        ...prev[selectedStudent],
        [selectedDay]: [...(prev[selectedStudent][selectedDay] || []), newItem],
      },
    }));
  };

  // Toggle item completion
  const handleToggleDone = (itemId) => {
    setScheduleData(prev => ({
      ...prev,
      [selectedStudent]: {
        ...prev[selectedStudent],
        [selectedDay]: prev[selectedStudent][selectedDay].map(item =>
          item.id === itemId ? { ...item, done: !item.done } : item
        ),
      },
    }));
  };

  // Remove item from schedule
  const handleRemoveItem = (itemId) => {
    setScheduleData(prev => ({
      ...prev,
      [selectedStudent]: {
        ...prev[selectedStudent],
        [selectedDay]: prev[selectedStudent][selectedDay].filter(item => item.id !== itemId),
      },
    }));
  };

  const selectedDayObj = DAYS.find(d => d.id === selectedDay) || DAYS[0];

  return (
    <div className="mx-auto w-full max-w-[960px] lg:max-w-[1024px] pb-36 pt-6 px-4 sm:px-8 transition-all">
      {/* ================================================================
          1. TOP TRIAL BANNER (Free trial — 14 days left + Upgrade →)
          ================================================================ */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs sm:text-[13px] font-semibold text-[#b9613b]">
          Free trial — 14 days left
        </span>
        <button 
          type="button"
          onClick={onUpgradeClick}
          className="rounded-lg border border-[#bac7bf] bg-white/70 px-3 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-[13px] font-semibold text-[#184635] hover:bg-white transition-colors shadow-2xs cursor-pointer"
        >
          Upgrade →
        </button>
      </div>

      {/* ================================================================
          2. PAGE HEADER (Circle Back Arrow + Planner Title)
          ================================================================ */}
      <div className="mb-5 flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] bg-white text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
          aria-label="Go back to Home"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="font-serif text-[28px] sm:text-[34px] font-bold leading-tight text-[#16272b] tracking-tight">
          Planner
        </h1>
      </div>

      {/* ================================================================
          3. WEEK TITLE & SUBTITLE
          ================================================================ */}
      <div className="mb-5">
        <h2 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#16272b] tracking-tight">
          Week 1
        </h2>
        <p className="mt-0.5 text-xs sm:text-[13px] font-medium text-[#526068]">
          First week
        </p>
      </div>

      {/* ================================================================
          4. SEGMENTED TOGGLE (Individual vs Family Units)
          ================================================================ */}
      <div className="mb-5 rounded-full border border-[#d5cbbe] bg-white p-1 flex items-center shadow-2xs">
        <button
          type="button"
          onClick={() => setPlannerMode('individual')}
          className={`flex-1 py-2.5 px-4 sm:px-6 rounded-full text-xs sm:text-[14px] font-semibold transition-all cursor-pointer text-center ${
            plannerMode === 'individual'
              ? 'bg-[#ba704f] text-white shadow-xs'
              : 'text-[#1e282d] hover:text-[#ba704f]'
          }`}
        >
          Individual
        </button>
        <button
          type="button"
          onClick={() => setPlannerMode('family')}
          className={`flex-1 py-2.5 px-4 sm:px-6 rounded-full text-xs sm:text-[14px] font-semibold transition-all cursor-pointer text-center ${
            plannerMode === 'family'
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
          className={`rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${
            selectedStudent === 'student-1'
              ? 'border-2 border-[#185842] bg-[#f0f6f3] text-[#185842] font-bold'
              : 'border border-[#cf805d] bg-[#fbf6f1] text-[#ba6644] hover:bg-[#f7ece4]'
          }`}
        >
          Student 1
        </button>

        <button
          type="button"
          onClick={() => setSelectedStudent('student-2')}
          className={`rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${
            selectedStudent === 'student-2'
              ? 'border-2 border-[#185842] bg-[#f0f6f3] text-[#185842] font-bold'
              : 'border border-[#cf805d] bg-[#fbf6f1] text-[#ba6644] hover:bg-[#f7ece4]'
          }`}
        >
          Student 2
        </button>
      </div>

      {/* ================================================================
          6. PROGRESS BAR & "0/0 done" COUNTER
          ================================================================ */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 h-2 rounded-full bg-[#e6dfd4] overflow-hidden">
          <div 
            className="h-full rounded-full bg-[#185842] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-[#526068] shrink-0">
          {doneTasks}/{totalTasks} done
        </span>
      </div>

      {/* ================================================================
          7. WEEKDAYS SELECTOR ROW (MON, TUE, WED, THU, FRI)
          ================================================================ */}
      <div className="mb-8 grid grid-cols-5 gap-2 sm:gap-3">
        {DAYS.map((day) => {
          const isSelected = selectedDay === day.id;
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => setSelectedDay(day.id)}
              className={`h-16 sm:h-20 flex items-center justify-center rounded-2xl transition-all cursor-pointer shadow-2xs text-center ${
                isSelected
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
          8. DAY CONTENT SECTION
          ================================================================ */}
      {currentDayItems.length === 0 ? (
        <div className="mb-6">
          <h3 className="font-serif text-[24px] sm:text-[26px] font-bold text-[#16272b] tracking-tight">
            Nothing scheduled for {selectedDayObj.full}
          </h3>
          <p className="mt-1 text-xs sm:text-[13px] text-[#526068]">
            Add subjects below to build out this day's plan.
          </p>
        </div>
      ) : (
        <div className="mb-6 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#16272b] tracking-tight">
              Schedule for {selectedDayObj.full}
            </h3>
            <span className="text-xs font-semibold text-[#185842]">
              {doneTasks} of {totalTasks} completed
            </span>
          </div>

          <div className="rounded-2xl border border-[#e9e2d5] bg-white p-4 shadow-2xs space-y-2 divide-y divide-[#f5efe6]">
            {currentDayItems.map((item, idx) => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between pt-2 first:pt-0 ${
                  item.done ? 'opacity-60' : ''
                }`}
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer select-none"
                  onClick={() => handleToggleDone(item.id)}
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggleDone(item.id)}
                    className="h-4 w-4 rounded border-[#c5bcb0] text-[#185842] focus:ring-[#185842] cursor-pointer"
                  />
                  <div>
                    <h5 className={`text-xs sm:text-[13px] font-bold text-[#172b30] ${item.done ? 'line-through' : ''}`}>
                      {item.title}
                    </h5>
                    <p className="text-[10px] text-[#526068]">Lesson {idx + 1}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-xs text-[#8d9b9f] hover:text-[#d32f2f] transition-colors p-1"
                  title="Remove subject"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================
          9. "ADD SUBJECTS TO [DAY]" SECTION
          ================================================================ */}
      <div>
        <h4 className="text-xs sm:text-sm font-bold text-[#16272b] mb-3">
          Add subjects to {selectedDayObj.full}
        </h4>

        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {DEFAULT_SUBJECTS.map((subject) => (
            <button
              key={subject}
              type="button"
              onClick={() => handleAddSubject(subject)}
              className="rounded-full border border-[#d5cbbe] bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] font-medium text-[#2d3f45] shadow-2xs hover:bg-[#faf5eb] hover:border-[#185842] hover:text-[#185842] active:scale-95 transition-all cursor-pointer"
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
