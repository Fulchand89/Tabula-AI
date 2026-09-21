import React, { useState } from 'react';
import {
  formatTimeInput,
  setTimePeriod,
  time24To12,
  time12To24,
} from '../../utils/timeFormatter';

const DURATION_OPTIONS = ['+ 15 min', '20 min', '30 min', '45 min', '60 min', 'Custom'];

const TYPE_OPTIONS = [
  '+ Lesson',
  'Review',
  'Test/Quiz',
  'Read/Aloud',
  'Activity',
  'Project',
  'Co-op',
  'Free Study',
];

export default function PlannerLessonDetailView({ onCancel, onAddCurriculum }) {
  const [isDone, setIsDone] = useState(false);
  const [workingOnText, setWorkingOnText] = useState('e.g. Lesson 45, Chapter 3, Week 12 of 36');
  const [startTime, setStartTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('+ 15 min');
  const [customDuration, setCustomDuration] = useState('');
  const [teachingNotes, setTeachingNotes] = useState('');
  const [selectedType, setSelectedType] = useState('+ Lesson');

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onAddCurriculum?.({
      curriculum: 'Saxon Math',
      workingOn: workingOnText,
      startTime,
      duration: selectedDuration === 'Custom' ? customDuration : selectedDuration,
      notes: teachingNotes,
      type: selectedType,
      isDone,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#faf7f0] py-6 sm:py-10 px-4 flex items-center justify-center">
      {/* Outer Card / Sheet Container matching screenshot */}
      <div className="relative w-full max-w-[560px] rounded-[32px] border border-[#e6ded2] bg-[#fbf9f4] p-5 sm:p-7 shadow-2xl transition-all">
        
        {/* 1. Top Terracotta Drag Handle */}
        <div className="w-14 h-1.5 rounded-full bg-[#ba704f] mx-auto mb-1" />

        {/* 2. Top Right "Done?" with Circular Checkbox */}
        <div className="flex justify-end items-center gap-2 mb-1">
          <span className="text-xs sm:text-[13px] font-semibold text-[#1e282d] select-none">
            Done?
          </span>
          <button
            type="button"
            onClick={() => setIsDone(!isDone)}
            className={`h-6 w-6 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer shadow-2xs ${
              isDone
                ? 'border-[#185842] bg-[#185842] text-white'
                : 'border-[#d5cbbe] bg-white hover:border-[#185842]'
            }`}
            aria-label="Toggle completed"
          >
            {isDone && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        </div>

        {/* 3. Centered Header (MATH + Saxon Math) */}
        <div className="text-center mb-5 -mt-2">
          <span className="block text-[11px] font-extrabold tracking-widest text-[#185842] uppercase">
            MATH
          </span>
          <h1 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#16272b] tracking-tight mt-0.5">
            Saxon Math
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* ================================================================
              SECTION 1: CURRICULUM
              ================================================================ */}
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase mb-2">
              CURRICULUM
            </label>
            <div className="rounded-2xl border border-[#e8dfd5] bg-white p-3.5 sm:p-4 shadow-2xs">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#16272b]">
                Saxon Math
              </h4>
              <p className="text-[11px] sm:text-xs text-[#526068] mt-0.5">
                Lesson 45, Chapter 3, Week 12 of 36
              </p>
            </div>
          </div>

          {/* ================================================================
              SECTION 2: WHAT SPECIFICALLY ARE YOU WORKING ON?
              ================================================================ */}
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase mb-2">
              WHAT SPECIFICALLY ARE YOU WORKING ON?
            </label>
            <input
              type="text"
              value={workingOnText}
              onChange={(e) => setWorkingOnText(e.target.value)}
              className="w-full rounded-2xl border border-[#e8dfd5] bg-white px-4 py-3 text-xs sm:text-[13px] text-[#1e282d] placeholder-[#9ca3af] focus:border-[#185842] focus:outline-hidden shadow-2xs"
              placeholder="e.g. Lesson 45, Chapter 3, Week 12 of 36"
            />
            <p className="text-[11px] text-[#788890] mt-1.5">
              Last recorded: Lesson 45, Chapter 3, Week 12 of 36
            </p>
          </div>

          {/* ================================================================
              SECTION 3: START TIME (OPTIONAL)
              ================================================================ */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase">
                START TIME (OPTIONAL)
              </label>
              <span className="text-[10px] font-semibold text-[#8b999f]">
                HH:MM AM/PM
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(formatTimeInput(e.target.value))}
                  maxLength={8}
                  className="w-36 rounded-xl border border-[#e8dfd5] bg-white px-3 py-2 pr-9 text-center text-xs tracking-wider text-[#1e282d] font-semibold focus:border-[#185842] focus:outline-hidden shadow-2xs transition-colors"
                  placeholder="--:-- --"
                />
                <label
                  className="absolute right-2.5 cursor-pointer text-[#788890] hover:text-[#185842] transition-colors p-0.5"
                  title="Choose time from clock"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <input
                    type="time"
                    value={time12To24(startTime)}
                    onChange={(e) => {
                      if (e.target.value) {
                        setStartTime(time24To12(e.target.value));
                      }
                    }}
                    className="sr-only"
                  />
                </label>
              </div>

              {/* Quick AM / PM Period Toggle */}
              <div className="flex rounded-xl border border-[#e8dfd5] bg-[#f8f5ee] p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setStartTime(setTimePeriod(startTime || '09:00', 'AM'))}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                    startTime.toUpperCase().includes('AM')
                      ? 'bg-[#185842] text-white shadow-2xs'
                      : 'text-[#6c7d84] hover:text-[#1e282d]'
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setStartTime(setTimePeriod(startTime || '12:00', 'PM'))}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                    startTime.toUpperCase().includes('PM')
                      ? 'bg-[#185842] text-white shadow-2xs'
                      : 'text-[#6c7d84] hover:text-[#1e282d]'
                  }`}
                >
                  PM
                </button>
              </div>

              {/* Clear button if time entered */}
              {startTime && (
                <button
                  type="button"
                  onClick={() => setStartTime('')}
                  className="rounded-lg p-1.5 text-[#8898a0] hover:text-[#c53030] hover:bg-[#fee2e2] transition-colors cursor-pointer"
                  title="Clear start time"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            <p className="text-[11px] text-[#788890] mt-1.5">
              Set a start time to build a daily schedule.
            </p>
          </div>

          {/* ================================================================
              SECTION 4: DURATION
              ================================================================ */}
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase mb-2">
              DURATION
            </label>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((opt) => {
                const isActive = selectedDuration === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedDuration(opt)}
                    className={`rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${
                      isActive
                        ? 'bg-[#185842] text-white font-bold'
                        : 'border border-[#d5cbbe] bg-white text-[#2d3f45] hover:bg-[#faf5eb]'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {selectedDuration === 'Custom' && (
              <input
                type="text"
                placeholder="Enter custom duration (e.g. 25 min)"
                value={customDuration}
                onChange={(e) => setCustomDuration(e.target.value)}
                className="mt-2 w-48 rounded-xl border border-[#e8dfd5] bg-white px-3 py-1.5 text-xs text-[#1e282d] focus:border-[#185842] focus:outline-hidden"
              />
            )}
          </div>

          {/* ================================================================
              SECTION 5: TEACHING NOTES (OPTIONAL)
              ================================================================ */}
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase mb-2">
              TEACHING NOTES (OPTIONAL)
            </label>
            <textarea
              rows={3}
              value={teachingNotes}
              onChange={(e) => setTeachingNotes(e.target.value)}
              placeholder="What to watch for, discussion questions, adaptations, materials needed..."
              className="w-full rounded-2xl border border-[#e8dfd5] bg-white p-4 text-xs sm:text-[13px] text-[#1e282d] placeholder-[#9ca3af] focus:border-[#185842] focus:outline-hidden shadow-2xs resize-y"
            />
          </div>

          {/* ================================================================
              SECTION 6: TYPE
              ================================================================ */}
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase mb-2">
              TYPE
            </label>
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((type) => {
                const isActive = selectedType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`rounded-full px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${
                      isActive
                        ? 'bg-[#185842] text-white font-bold'
                        : 'border border-[#d5cbbe] bg-white text-[#2d3f45] hover:bg-[#faf5eb]'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================
              SECTION 7: ACTION BUTTONS (Cancel & Add Curriculum →)
              ================================================================ */}
          <div className="pt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-2xl border border-[#d5cbbe] bg-[#f7f2ea] hover:bg-[#eee8dc] py-3 text-center text-xs sm:text-sm font-bold text-[#16272b] transition-all cursor-pointer shadow-2xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-2xl bg-[#167846] hover:bg-[#12643a] py-3 text-center text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Add Curriculum</span>
              <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
