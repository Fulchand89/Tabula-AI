import React, { useState } from 'react';

/**
 * PlannerDayCards component
 * 
 * 5 weekday cards (MON, TUE, WED, THU, FRI)
 */
export default function PlannerDayCards({
  days = [
    { id: 'MON', label: 'MON', full: 'Monday' },
    { id: 'TUE', label: 'TUE', full: 'Tuesday' },
    { id: 'WED', label: 'WED', full: 'Wednesday' },
    { id: 'THU', label: 'THU', full: 'Thursday' },
    { id: 'FRI', label: 'FRI', full: 'Friday' },
  ],
  selectedDay = 'MON',
  onSelectDay,
  scheduleMap = {},
}) {
  const [expandedCodes, setExpandedCodes] = useState({});

  const toggleCode = (itemId, e) => {
    e.stopPropagation();
    setExpandedCodes((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 h-[140px] sm:h-[170px] w-full">
      {days.map((day) => {
        const isSelected = selectedDay === day.id;
        const dayItems = scheduleMap[day.id] || [];
        const hasItems = dayItems.length > 0;
        const doneCount = dayItems.filter((it) => it.done).length;
        const totalCount = dayItems.length;

        return (
          <button
            key={day.id}
            type="button"
            onClick={() => onSelectDay?.(day.id)}
            className={`h-full flex flex-col justify-start rounded-xl sm:rounded-2xl p-1 sm:p-2 transition-all cursor-pointer shadow-2xs text-center overflow-hidden ${hasItems
              ? isSelected
                ? 'border-2 border-[#356F58] bg-white' // Has items + Selected (Background White)
                : 'border-2 border-[#356F58] bg-[#fcf8f2]' // Has items + Normal
              : isSelected
                ? 'border-2 border-[#356F58] bg-white' // Empty + Selected (Background White)
                : 'border border-[#e9e1d5] bg-[#fcf8f2] hover:bg-white' // Empty + Normal
              }`}
          >
            {/* Day Header - Fixed uniform height across all day boxes */}
            <div className="h-7 sm:h-8 shrink-0 w-full flex flex-col items-center justify-center">
              <span className="text-[11px] sm:text-xs font-bold text-[#16272b] leading-tight">
                {day.label}
              </span>
              <span className={`text-[9px] sm:text-[10.5px] leading-tight mt-0.5 ${hasItems ? 'font-bold text-[#16272b]' : 'font-medium text-[#8c9ba0]'}`}>
                {hasItems ? `${doneCount}/${totalCount}` : '0/0'}
              </span>
            </div>

            {/* Subject list - flex-1 min-h-0 overflow-y-auto no-scrollbar */}
            <div className="flex-1 min-h-0 w-full overflow-y-auto no-scrollbar space-y-1 mt-0.5 sm:mt-1">
              {hasItems && dayItems.map((item) => {
                const badgeBg = item.badgeBg || item.color || 'bg-[#ba704f]';
                const badgeText = item.badgeText || item.textColor || 'text-white';
                const isCodeVisible = !!expandedCodes[item.id];

                return (
                  <div
                    key={item.id}
                    onClick={(e) => toggleCode(item.id, e)}
                    title={item.code ? (isCodeVisible ? 'Click to hide code' : 'Click to show code') : undefined}
                    className={`w-full rounded-md sm:rounded-lg ${badgeBg} px-1 py-0.5 sm:px-1.5 sm:py-1 text-center ${badgeText} shrink-0 cursor-pointer select-none transition-all`}
                  >
                    <p className="text-[9.5px] sm:text-[10.5px] font-bold leading-tight truncate">
                      {item.badgeTitle || item.title}
                    </p>
                    {item.code && isCodeVisible && (
                      <p className="text-[8px] sm:text-[9px] font-medium leading-tight opacity-90 truncate mt-0.5">
                        {item.code}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </button>
        );
      })}
    </div>
  );
}