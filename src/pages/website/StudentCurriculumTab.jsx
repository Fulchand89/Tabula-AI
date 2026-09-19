import React from 'react';

/**
 * Curriculum Tab component for Student Details.
 * Manages active curriculum resources, subjects, and resource cards.
 */
export default function StudentCurriculumTab({
  selectedSubject,
  setSelectedSubject,
  SUBJECTS,
}) {
  return (
    <div>
      {/* MATH section — shown when Math is the active/selected subject */}
      {selectedSubject === '+ Math' && (
        <div className="mb-6">
          {/* Section header row */}
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase">
              MATH
            </h2>
            <button className="inline-flex items-center gap-1.5 rounded-full border-2 border-dashed border-[#1b6b50] bg-transparent px-3.5 py-1 text-[11px] font-bold text-[#1b6b50] hover:bg-[#edf5f0] transition-colors cursor-pointer">
              + Add another
            </button>
          </div>

          {/* Curriculum resource card */}
          <div className="rounded-2xl border border-[#e9e2d5] bg-white p-4 shadow-2xs">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-sm font-bold text-[#172b30]">Saxon Math 2</h3>
                <p className="mt-0.5 text-[11px] text-[#526068]">
                  Lesson 45, Chapter 3, Week 12 of 36
                </p>
                <p className="mt-2 text-[11px] leading-snug text-[#526068]">
                  Student is currently working on addition, subtraction, place value, and basic word problems. Extra practice is provided as needed.
                </p>
              </div>
              {/* Edit & Delete */}
              <div className="flex shrink-0 items-center gap-2.5">
                <button className="flex items-center gap-1 text-xs font-semibold text-[#bf643e] hover:text-[#a04e2b] transition-colors cursor-pointer">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                  <span>Edit</span>
                </button>
                <button className="text-[#bf643e] hover:text-[#a04e2b] transition-colors cursor-pointer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD A SUBJECT section */}
      <h2 className="text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase mb-1">
        ADD A SUBJECT
      </h2>
      <p className="text-[11px] text-[#526068] mb-4">
        Enter the curriculum Student is using. You can add multiple resources per subject.
      </p>

      {/* Subject chips */}
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map((subject) => (
          <button
            key={subject}
            type="button"
            onClick={() => setSelectedSubject(subject)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              selectedSubject === subject
                ? 'border-transparent bg-[#1b6b50] text-white'
                : 'border-[#d5cbbe] bg-white text-[#1e282d] hover:border-[#1b6b50] hover:text-[#1b6b50]'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}
