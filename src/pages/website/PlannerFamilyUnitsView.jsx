import React, { useState } from 'react';
import {
  PlannerHeader,
  PlannerWeekNav,
  PlannerDayCards,
} from '../../components/planner';

const DAYS = [
  { id: 'MON', label: 'MON', full: 'Monday' },
  { id: 'TUE', label: 'TUE', full: 'Tuesday' },
  { id: 'WED', label: 'WED', full: 'Wednesday' },
  { id: 'THU', label: 'THU', full: 'Thursday' },
  { id: 'FRI', label: 'FRI', full: 'Friday' },
];

export default function PlannerFamilyUnitsView({
  onBackToHome,
  onUpgradeClick,
  onToggleIndividual,
  onEditStudentPlan,
  onOpenLessonDetail,
  onToggleFamilyUnits,
  onViewCompleteWeek,
  onPrevWeek,
  onNextWeek,
}) {
  // Mode: 'family' is active here
  const [plannerMode, setPlannerMode] = useState('family');

  // Selected Day (MON is default matching PlannerView)
  const [selectedDay, setSelectedDay] = useState('MON');

  // Shared family topic state per day
  const [sharedTopicMap, setSharedTopicMap] = useState({
    MON: '',
    TUE: '',
    WED: '',
    THU: '',
    FRI: '',
  });

  const currentSharedTopic = sharedTopicMap[selectedDay] || '';
  const selectedDayObj = DAYS.find((d) => d.id === selectedDay) || DAYS[0];

  const handleSharedTopicChange = (e) => {
    const val = e.target.value;
    setSharedTopicMap((prev) => ({
      ...prev,
      [selectedDay]: val,
    }));
  };

  const handleModeChange = (mode) => {
    setPlannerMode(mode);
    if (mode === 'individual') {
      onToggleIndividual?.();
    }
  };

  return (
    <div className="mx-auto w-full max-w-[640px] px-3.5 sm:px-4 pb-32 pt-1 transition-all">
      {/* 1. Header (Banner + Back Arrow + Planner Title) */}
      <PlannerHeader
        onBackToHome={onBackToHome}
        onUpgradeClick={onUpgradeClick}
      />

      <div className="space-y-4 pt-1">
        {/* 2. Week Title & Controls (Week 1, Individual / Family toggle, Student 1 / 2) */}
        <PlannerWeekNav
          weekNumber={1}
          weekSubtitle="First week"
          plannerMode={plannerMode}
          onModeChange={handleModeChange}
          selectedStudent="student-1"
          onStudentChange={() => { }}
          onToggleFamilyUnits={onToggleFamilyUnits}
          onViewCompleteWeek={onViewCompleteWeek}
          onPrevWeek={onPrevWeek}
          onNextWeek={onNextWeek}
        />

        {/* 3. 5-Day Cards (MON, TUE, WED, THU, FRI) - Same exact component as PlannerView */}
        <PlannerDayCards
          days={DAYS}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          scheduleMap={{
            'student-1': sharedTopicMap,
          }}
        />

        {/* 4. Shared Family Topic Input Section */}
        <div className="rounded-2xl border border-[#ded5c7] bg-[#faf7f0] p-4 sm:p-5 shadow-2xs">
          <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase mb-2">
            SHARED FAMILY TOPIC FOR {selectedDayObj.full.toUpperCase()}
          </label>
          <input
            type="text"
            value={currentSharedTopic}
            onChange={handleSharedTopicChange}
            placeholder="e.g. Ancient Egypt, Water Cycle, American Revolution..."
            className="w-full rounded-xl border border-[#d5cdc0] bg-white px-4 py-3 text-xs sm:text-sm text-[#172b30] placeholder-[#8d9b9f] focus:border-[#356F58] focus:outline-none transition-colors"
          />
          <p className="mt-2 text-xs text-[#526068] leading-relaxed">
            Use this for subjects you teach together. Each child still has their own independent assignments below.
          </p>
        </div>

        {/* 5. Two Student Cards Row (Student 1 & Student 2) matching exact styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Student 1 Card */}
          <div className="rounded-2xl border border-[#ded5c7] bg-white overflow-hidden shadow-2xs">
            <div className="bg-[#ba704f] p-3.5 text-center text-white">
              <h3 className="font-serif text-xs sm:text-sm font-bold leading-tight">
                Student 1
              </h3>
              <p className="text-[10.5px] text-white/90 leading-tight mt-0.5 font-medium">
                10th Grade • 0/0 done
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-[#526068] font-medium mb-3">
                No subjects scheduled
              </p>
              <button
                type="button"
                onClick={() => onEditStudentPlan?.(1)}
                className="w-full rounded-xl border border-dashed border-[#ba704f] bg-transparent py-2 px-3 text-xs font-bold text-[#ba704f] hover:bg-[#fdfaf7] transition-all cursor-pointer text-center"
              >
                Edit Student's plan →
              </button>
            </div>
          </div>

          {/* Student 2 Card */}
          <div className="rounded-2xl border border-[#ded5c7] bg-white overflow-hidden shadow-2xs">
            <div className="bg-[#ba704f] p-3.5 text-center text-white">
              <h3 className="font-serif text-xs sm:text-sm font-bold leading-tight">
                Student 2
              </h3>
              <p className="text-[10.5px] text-white/90 leading-tight mt-0.5 font-medium">
                11th Grade • 0/0 done
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-[#526068] font-medium mb-3">
                No subjects scheduled
              </p>
              <button
                type="button"
                onClick={() => onEditStudentPlan?.(2)}
                className="w-full rounded-xl border border-dashed border-[#356F58] bg-transparent py-2 px-3 text-xs font-bold text-[#356F58] hover:bg-[#f2f9f6] transition-all cursor-pointer text-center"
              >
                Edit Student 2's plan →
              </button>
            </div>
          </div>
        </div>

        {/* 6. Tip Card */}
        <div className="rounded-2xl border border-[#ded5c7] bg-[#faf7f0] p-4 sm:p-5 shadow-2xs">
          <h4 className="font-serif text-xs sm:text-sm font-bold text-[#ba633f]">
            Tip: Ask the AI Coach
          </h4>
          <p className="mt-1.5 text-xs text-[#526068] leading-relaxed">
            Go to the Coach tab and select "Teach this topic to all my kids" or "Find our shared themes" to get personalized multi-age lesson ideas for today's shared topic.
          </p>
        </div>
      </div>
    </div>
  );
}