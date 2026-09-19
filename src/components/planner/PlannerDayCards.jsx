import React from 'react';

/**
 * PlannerDayCards component
 * 
 * 5 weekday cards (MON, TUE, WED, THU, FRI)
 * If items are scheduled for a day (e.g. MON in Image 2):
 *  - Displays green border: border-2 border-[#185842]
 *  - Day label + count (e.g. "MON", "0/1")
 *  - Brown badge showing subject name + code (e.g. "Math", "L14")
 * If empty (Image 1):
 *  - Displays centered day label in rounded card
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
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
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
            className={`min-h-[76px] sm:min-h-[88px] rounded-2xl p-1.5 sm:p-2 transition-all cursor-pointer shadow-2xs text-center flex flex-col justify-between items-center ${
              hasItems
                ? 'border-2 border-[#185842] bg-[#fcf8f2]'
                : isSelected
                ? 'border border-[#d5cbbe] bg-[#fcf8f2] hover:bg-white'
                : 'border border-[#e9e1d5] bg-[#fcf8f2] hover:bg-white'
            }`}
          >
            {hasItems ? (
              <>
                <div className="flex flex-col items-center">
                  <span className="text-[11.5px] font-bold text-[#16272b] leading-tight">
                    {day.label}
                  </span>
                  <span className="text-[10.5px] font-bold text-[#16272b] leading-tight mt-0.5">
                    {doneCount}/{totalCount}
                  </span>
                </div>

                <div className="w-full mt-1 space-y-1">
                  {dayItems.slice(0, 3).map((item) => {
                    const badgeBg = item.badgeBg || item.color || 'bg-[#ba704f]';
                    const badgeText = item.badgeText || item.textColor || 'text-white';
                    return (
                      <div
                        key={item.id}
                        className={`w-full rounded-lg ${badgeBg} px-1 py-1 text-center ${badgeText}`}
                      >
                        <p className="text-[10px] font-bold leading-none truncate">
                          {item.badgeTitle || item.title}
                        </p>
                        {item.code && (
                          <p className="text-[9px] font-semibold leading-none opacity-90 mt-0.5">
                            {item.code}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16272b]">
                  {day.label}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
