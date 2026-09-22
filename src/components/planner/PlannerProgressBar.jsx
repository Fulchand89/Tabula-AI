import React from 'react';

/**
 * PlannerProgressBar component
 * 
 * Thin progress track + dynamic "X/Y done" text
 */
export default function PlannerProgressBar({ doneCount = 0, totalCount = 0 }) {
  const percent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  return (
    <div className="flex items-center gap-3.5 my-1">
      <div className="flex-1 h-2 rounded-full bg-[#e6ded3] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#356F58] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-[11px] font-semibold text-[#526068] shrink-0">
        {doneCount}/{totalCount} done
      </span>
    </div>
  );
}
