import React, { useState } from 'react';
import {
  PlannerHeader,
  PlannerWeekNav,
  PlannerDayCards,
  PlannerProgressBar,
  PlannerAssignmentCard,
  PlannerSubjectPicker,
  getSubjectStyle,
} from '../../components/planner';

const DAYS = [
  { id: 'MON', label: 'MON', full: 'Monday' },
  { id: 'TUE', label: 'TUE', full: 'Tuesday' },
  { id: 'WED', label: 'WED', full: 'Wednesday' },
  { id: 'THU', label: 'THU', full: 'Thursday' },
  { id: 'FRI', label: 'FRI', full: 'Friday' },
];

/**
 * PlannerView component
 * 
 * Clean orchestrator for the Planner screen, matching Image 1 and Image 2.
 * Delegates sections to modular sub-components in src/components/planner/:
 *  - PlannerHeader
 *  - PlannerWeekNav
 *  - PlannerDayCards
 *  - PlannerProgressBar
 *  - PlannerAssignmentCard
 *  - PlannerSubjectPicker
 */
export default function PlannerView({
  onBackToHome,
  onUpgradeClick,
  onOpenLessonDetail,
  onToggleFamilyUnits,
  onViewCompleteWeek,
  onPrevWeek,
  onNextWeek,
  // Shared state from AppShell
  weekNumber = 1,
  weekSubtitle = 'First week',
  scheduleData = null,
  onScheduleChange,
}) {
  // Mode: 'individual' vs 'family'
  const [plannerMode, setPlannerMode] = useState('individual');

  // Active student: 'student-1' vs 'student-2'
  const [selectedStudent, setSelectedStudent] = useState('student-1');

  // Selected Day (MON is default matching screenshots)
  const [selectedDay, setSelectedDay] = useState('MON');

  const EMPTY_SCHEDULE = {
    'student-1': { MON: [], TUE: [], WED: [], THU: [], FRI: [] },
    'student-2': { MON: [], TUE: [], WED: [], THU: [], FRI: [] },
  };

  // If parent provides scheduleData, use it; otherwise local state
  const [localScheduleMap, setLocalScheduleMap] = useState(EMPTY_SCHEDULE);

  // The actual schedule map: prefer prop-driven data
  const scheduleMap = scheduleData || localScheduleMap;

  // Unified setter: update local AND notify parent
  const setScheduleMap = (updater) => {
    if (onScheduleChange) {
      // Parent manages state — pass updater up
      onScheduleChange(updater);
    } else {
      setLocalScheduleMap(updater);
    }
  };

  const studentSchedule = scheduleMap[selectedStudent] || {
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
  };

  const currentDayItems = studentSchedule[selectedDay] || [];
  const selectedDayObj = DAYS.find((d) => d.id === selectedDay) || DAYS[0];

  // Total and done tasks calculation
  const totalTasks = currentDayItems.length;
  const doneTasks = currentDayItems.filter((i) => i.done).length;

  // Active subject names for current day
  const activeSubjectNames = currentDayItems.map((i) => i.subjectName);

  // Toggle subject on/off
  const handleToggleSubject = (subjectName) => {
    setScheduleMap((prev) => {
      const currentList = prev[selectedStudent]?.[selectedDay] || [];
      const exists = currentList.find((i) => i.subjectName === subjectName);

      let updatedList;
      if (exists) {
        // Remove
        updatedList = currentList.filter((i) => i.subjectName !== subjectName);
      } else {
        const style = getSubjectStyle(subjectName);
        const newItem = {
          id: `${subjectName.toLowerCase()}-${Date.now()}`,
          subjectName: subjectName,
          title: subjectName.toUpperCase(),
          badgeTitle: subjectName,
          code: style.code || 'L1',
          duration: '30 min',
          curriculum: style.curriculum || `${subjectName} Curriculum`,
          badgeBg: style.badgeBg,
          badgeText: style.badgeText,
          titleColor: style.titleColor,
          circleBorder: style.circleBorder,
          dashedBorder: style.dashedBorder,
          dashedText: style.dashedText,
          dashedBg: style.dashedBg,
          done: false,
        };
        updatedList = [...currentList, newItem];
        try {
          const savedSteps = JSON.parse(sessionStorage.getItem('tabula_getting_started_steps') || '{}');
          savedSteps[3] = true;
          sessionStorage.setItem('tabula_getting_started_steps', JSON.stringify(savedSteps));
          window.dispatchEvent(new Event('storage'));
          window.dispatchEvent(new CustomEvent('tabula_step_completed', { detail: { step: 3 } }));
        } catch {}
      }

      return {
        ...prev,
        [selectedStudent]: {
          ...prev[selectedStudent],
          [selectedDay]: updatedList,
        },
      };
    });
  };

  // Toggle item done
  const handleToggleDone = (itemId) => {
    setScheduleMap((prev) => ({
      ...prev,
      [selectedStudent]: {
        ...prev[selectedStudent],
        [selectedDay]: (prev[selectedStudent]?.[selectedDay] || []).map((item) =>
          item.id === itemId ? { ...item, done: !item.done } : item
        ),
      },
    }));
  };

  // Delete item
  const handleDeleteItem = (itemId) => {
    setScheduleMap((prev) => ({
      ...prev,
      [selectedStudent]: {
        ...prev[selectedStudent],
        [selectedDay]: (prev[selectedStudent]?.[selectedDay] || []).filter(
          (item) => item.id !== itemId
        ),
      },
    }));
  };

  return (
    <div className="mx-auto w-full max-w-[640px] px-3.5 sm:px-4 pb-32 pt-1 transition-all">
      {/* 1. Header (Banner + Back Arrow + Planner Title) */}
      <PlannerHeader
        onBackToHome={onBackToHome}
        onUpgradeClick={onUpgradeClick}
      />

      <div className="space-y-4 pt-1">
        {/* 2. Week Title & Controls (Week 1, Individual / Family, Student 1 / 2) */}
        <PlannerWeekNav
          weekNumber={weekNumber}
          weekSubtitle={weekSubtitle}
          plannerMode={plannerMode}
          onModeChange={setPlannerMode}
          selectedStudent={selectedStudent}
          onStudentChange={setSelectedStudent}
          onToggleFamilyUnits={onToggleFamilyUnits}
          onViewCompleteWeek={onViewCompleteWeek}
          onPrevWeek={onPrevWeek}
          onNextWeek={onNextWeek}
        />

        {/* 3. 5-Day Cards (MON, TUE, WED, THU, FRI) */}
        <PlannerDayCards
          days={DAYS}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          scheduleMap={studentSchedule}
        />

        {/* 4. Progress Bar */}
        <PlannerProgressBar
          doneCount={doneTasks}
          totalCount={totalTasks}
        />

        {/* 5. Scheduled Subject Cards (Shown if items exist, e.g. Image 2) */}
        {currentDayItems.length > 0 && (
          <div className="space-y-3">
            {currentDayItems.map((item) => (
              <PlannerAssignmentCard
                key={item.id}
                item={item}
                onToggleDone={handleToggleDone}
                onEdit={onOpenLessonDetail}
                onDelete={handleDeleteItem}
                onAddAssignment={onOpenLessonDetail}
              />
            ))}
          </div>
        )}

        {/* 6. Subject Picker & Empty/Schedule Notice */}
        <PlannerSubjectPicker
          dayName={selectedDayObj.full}
          activeSubjectNames={activeSubjectNames}
          onToggleSubject={handleToggleSubject}
        />
      </div>
    </div>
  );
}
