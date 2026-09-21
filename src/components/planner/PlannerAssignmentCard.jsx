import React, { useState } from 'react';
import { formatTimeInput } from '../../utils/timeFormatter';

/**
 * PlannerAssignmentCard component
 * 
 * Scheduled subject card with strict Duration & Start Time validation.
 */
export default function PlannerAssignmentCard({
  item,
  onToggleDone,
  onEdit,
  onDelete,
  onAddAssignment,
}) {
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [durationInput, setDurationInput] = useState(item.duration || '30 min');

  const [isEditingStartTime, setIsEditingStartTime] = useState(false);
  const [startTimeInput, setStartTimeInput] = useState(item.startTime || '');

  // ── Duration Validation & Submit ──
  const handleDurationSubmit = (e) => {
    if (e.key === 'Enter') {
      const numericVal = durationInput.replace(/\D/g, '');
      const mins = parseInt(numericVal, 10);

      if (isNaN(mins) || mins <= 0 || mins > 1440) {
        alert('Please enter a valid duration (e.g., 30 min). Max is 1440 mins.');
        return;
      }

      item.duration = `${mins} min`;
      setIsEditingDuration(false);
    }
  };

  // ── Start Time Validation & Submit (Format: HH:MM or HH:MM AM/PM like 12:00 PM) ──
  const handleStartTimeSubmit = (e) => {
    if (e.key === 'Enter') {
      const trimmed = startTimeInput.trim();

      // Allow empty since it's optional
      if (trimmed === '') {
        item.startTime = '';
        setIsEditingStartTime(false);
        return;
      }

      // Strict validation for HH:MM format (24-hour or 12-hour AM/PM like 12:00 or 12:00 PM)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s*(AM|PM))?$/i;
      if (!timeRegex.test(trimmed)) {
        alert('Please enter a valid time in HH:MM format (e.g. 12:00 or 12:00 PM). Random text or numbers are not allowed.');
        return;
      }

      item.startTime = trimmed;
      setIsEditingStartTime(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#e9e2d5] bg-[#fcfbf9] p-3.5 sm:p-4 shadow-2xs transition-all mb-4 text-[#1e282d]">
      {/* ── Top Row: Drag Handle + Check Circle + Subject Details + Actions ── */}
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* 6-dot drag handle icon */}
          <div className="text-[#9eaab0] cursor-grab select-none shrink-0" aria-label="Drag handle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="8" cy="5" r="2.2" />
              <circle cx="16" cy="5" r="2.2" />
              <circle cx="8" cy="12" r="2.2" />
              <circle cx="16" cy="12" r="2.2" />
              <circle cx="8" cy="19" r="2.2" />
              <circle cx="16" cy="19" r="2.2" />
            </svg>
          </div>

          {/* Completion Circle */}
          <button
            type="button"
            onClick={() => onToggleDone?.(item.id)}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors cursor-pointer ${item.done
                ? 'border-[#185842] bg-[#185842] text-white'
                : `${item.circleBorder || 'border-[#ba704f]'} bg-transparent hover:bg-[#fff6f0]`
              }`}
            aria-label="Mark task complete"
          >
            {item.done && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>

          {/* Subject title, Duration & Start Time */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[11.5px] font-bold uppercase tracking-wider ${item.titleColor || 'text-[#ba704f]'} ${item.done ? 'line-through opacity-70' : ''
                }`}>
                {item.title || 'MATH'} •{' '}
                {/* Duration Editing */}
                {isEditingDuration ? (
                  <input
                    type="text"
                    value={durationInput}
                    onChange={(e) => setDurationInput(e.target.value)}
                    onKeyDown={handleDurationSubmit}
                    onBlur={() => setIsEditingDuration(false)}
                    autoFocus
                    className="w-20 px-1 py-0.5 text-xs border border-[#ba704f] rounded bg-white text-[#1e282d] outline-none"
                    placeholder="30 min"
                  />
                ) : (
                  <span
                    onClick={() => setIsEditingDuration(true)}
                    className="cursor-pointer hover:underline"
                    title="Click to edit duration"
                  >
                    {item.duration || '30 min'}
                  </span>
                )}

                {/* Start Time Display / Editing */}
                {' • '}
                {isEditingStartTime ? (
                  <input
                    type="text"
                    value={startTimeInput}
                    onChange={(e) => setStartTimeInput(formatTimeInput(e.target.value))}
                    onKeyDown={handleStartTimeSubmit}
                    onBlur={() => setIsEditingStartTime(false)}
                    autoFocus
                    maxLength={8}
                    className="w-20 px-1 py-0.5 text-xs border border-[#ba704f] rounded bg-white text-[#1e282d] outline-none"
                    placeholder="12:00 PM"
                  />
                ) : (
                  <span
                    onClick={() => setIsEditingStartTime(true)}
                    className="cursor-pointer hover:underline text-[#526068]"
                    title="Click to add/edit start time (e.g. 12:00 or 12:00 PM)"
                  >
                    {item.startTime ? item.startTime : '+ Add Time'}
                  </span>
                )}
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#738287] truncate mt-0.5">
              {item.curriculum || 'Saxon Math'}
            </p>
          </div>
        </div>

        {/* Right action buttons: Edit + Trash */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onEdit?.(item)}
            className="rounded-md border border-[#d0c8b9] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#16272b] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(item.id)}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fde8e8] text-[#e02424] hover:bg-[#fbd5d5] transition-colors shadow-2xs cursor-pointer"
            aria-label="Delete assignment"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Bottom Dashed Box: + Add today's assignment ── */}
      <button
        type="button"
        onClick={() => onAddAssignment?.(item)}
        className={`mt-3.5 w-full rounded-xl border border-dashed ${item.dashedBorder || 'border-[#d9825b]'
          } ${item.dashedBg || 'bg-[#fffaf5]'} py-2 px-3 text-center text-[12px] font-semibold ${item.dashedText || 'text-[#ba704f]'
          } hover:opacity-90 transition-all cursor-pointer`}
      >
        + Add today's assignment
      </button>
    </div>
  );
}