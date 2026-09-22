import React from 'react';

/**
 * PlannerHeader component
 * 
 * Free trial banner + Circular back button + Page title "Planner"
 */
export default function PlannerHeader({ onBackToHome, onUpgradeClick }) {
  return (
    <div>
      {/* ── Top Trial Banner ── */}
      <div className="flex items-center justify-between border-b border-[#e9e2d5] pb-2 pt-0.5">
        <span className="text-[11px] font-semibold text-[#bf643e]">
          Free trial — 14 days left
        </span>
        <button
          type="button"
          onClick={onUpgradeClick}
          className="rounded-md border border-[#bac7bf] bg-white/80 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#356F58] hover:bg-white transition-colors shadow-2xs cursor-pointer"
        >
          Upgrade →
        </button>
      </div>

      {/* ── Back button + Page Title ── */}
      <div className="mt-3.5 mb-3 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] bg-white text-[#16272b] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
          aria-label="Go back to Home"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="font-serif text-2xl font-bold leading-tight text-[#16272b] tracking-tight">
          Planner
        </h1>
      </div>
    </div>
  );
}
