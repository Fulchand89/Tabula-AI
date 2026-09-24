import React, { useState } from 'react';
import AddCurriculumModal from './AddCurriculumModal';

const DEFAULT_CURRICULUMS = [
  {
    id: 'curr-math-1',
    subject: '+ Math',
    title: 'Saxon Math 2',
    pacing: 'Lesson 45, Chapter 3, Week 12 of 36',
    notes: 'Student is currently working on addition, subtraction, place value, and basic word problems. Extra practice is provided as needed.',
  },
];

/**
 * Curriculum Tab component for Student Details.
 * Fully interactive with:
 *  - "+ Add another" / "+ Add Curriculum"
 *  - "Edit" functionality with modal pre-fill
 *  - "Delete" functionality with removal
 *  - Subject switcher across all subjects
 */
export default function StudentCurriculumTab({
  selectedSubject = '+ Math',
  setSelectedSubject,
  SUBJECTS = [],
}) {
  const [curriculums, setCurriculums] = useState(DEFAULT_CURRICULUMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const cleanSubject = (selectedSubject || 'Math').replace(/^\+\s*/, '').trim();

  // Curriculums for the selected subject
  const currentSubjectCurriculums = curriculums.filter(
    (c) =>
      c.subject === selectedSubject ||
      c.subject?.replace(/^\+\s*/, '').trim().toLowerCase() === cleanSubject.toLowerCase()
  );

  // Open modal to add new
  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  // Open modal to edit existing
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Delete curriculum
  const handleDelete = (id) => {
    setCurriculums((prev) => prev.filter((c) => c.id !== id));
  };

  // Save curriculum (either add new or update existing)
  const handleSaveCurriculum = (savedData) => {
    if (editingItem) {
      setCurriculums((prev) =>
        prev.map((c) =>
          c.id === editingItem.id
            ? { ...c, ...savedData, subject: selectedSubject }
            : c
        )
      );
    } else {
      const newItem = {
        id: `curr-${Date.now()}`,
        subject: selectedSubject,
        ...savedData,
      };
      setCurriculums((prev) => [...prev, newItem]);
    }
    try {
      const savedSteps = JSON.parse(localStorage.getItem('tabula_getting_started_steps') || '{}');
      savedSteps[2] = true;
      localStorage.setItem('tabula_getting_started_steps', JSON.stringify(savedSteps));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('tabula_step_completed', { detail: { step: 2 } }));
    } catch {}
    setEditingItem(null);
  };

  return (
    <div>
      {/* ── Active Subject Curriculum Section ── */}
      <div className="mb-6">
        {/* Section header row */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase">
            {cleanSubject}
          </h2>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-dashed border-[#356F58] bg-transparent px-3.5 py-1 text-[11px] font-bold text-[#356F58] hover:bg-[#edf5f0] transition-colors cursor-pointer"
          >
            + Add another
          </button>
        </div>

        {/* Curriculum resource cards */}
        {currentSubjectCurriculums.length > 0 ? (
          <div className="space-y-3">
            {currentSubjectCurriculums.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#e9e2d5] bg-white p-4 shadow-2xs transition-all hover:border-[#c9dfd3]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#172b30] leading-snug">
                      {item.title}
                    </h3>
                    {item.selectedChoices && item.selectedChoices.length > 1 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.selectedChoices.map((choice) => (
                          <span
                            key={choice}
                            className="rounded-md bg-[#edf5f0] border border-[#cbe3d6] px-1.5 py-0.5 text-[10px] font-semibold text-[#1e5842]"
                          >
                            {choice}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.pacing && (
                      <p className="mt-0.5 text-[11px] font-medium text-[#526068]">
                        {item.pacing}
                      </p>
                    )}
                    {item.notes && (
                      <p className="mt-2 text-[11px] leading-snug text-[#526068]">
                        {item.notes}
                      </p>
                    )}
                  </div>

                  {/* Edit & Delete Buttons */}
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="flex items-center gap-1 rounded-md border border-[#e2d8cb] bg-[#faf6ee] px-2.5 py-1 text-xs font-semibold text-[#bf643e] hover:bg-[#f2eae0] transition-colors cursor-pointer shadow-2xs"
                      title="Edit curriculum"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-[#f5c6cb] bg-[#fde8e8] text-[#e02424] hover:bg-[#fbd5d5] transition-colors cursor-pointer shadow-2xs"
                      title="Delete curriculum"
                      aria-label="Delete curriculum"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state for subject */
          <div className="rounded-2xl border border-dashed border-[#d5cbbe] bg-[#fcfbf9] p-5 text-center">
            <p className="text-xs font-semibold text-[#526068]">
              No curriculum added for {cleanSubject} yet.
            </p>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#356F58] px-3.5 py-1 text-[11px] font-bold text-white shadow-2xs hover:bg-[#2a5946] transition-colors cursor-pointer"
            >
              + Add {cleanSubject} Curriculum
            </button>
          </div>
        )}
      </div>

      {/* ── ADD A SUBJECT section ── */}
      <h2 className="text-[11px] font-extrabold tracking-wider text-[#1e282d] uppercase mb-1">
        ADD A SUBJECT
      </h2>
      <p className="text-[11px] text-[#685949] text-inter  font-medium mb-4">
        Enter the curriculum Student is using. You can add multiple resources per subject.
      </p>

      {/* Subject chips */}
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map((subject) => {
          const isSelected =
            selectedSubject === subject ||
            selectedSubject?.replace(/^\+\s*/, '').toLowerCase() ===
            subject.replace(/^\+\s*/, '').toLowerCase();

          const hasCurriculum = curriculums.some(
            (c) =>
              c.subject === subject ||
              c.subject?.replace(/^\+\s*/, '').toLowerCase() ===
              subject.replace(/^\+\s*/, '').toLowerCase()
          );

          return (
            <button
              key={subject}
              type="button"
              onClick={() => setSelectedSubject?.(subject)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${isSelected
                  ? 'border-transparent bg-[#356F58] text-white shadow-2xs'
                  : hasCurriculum
                    ? 'border-[#356F58] bg-[#f0faf5] text-[#356F58] hover:bg-[#e4f4ec]'
                    : 'border-[#d5cbbe] bg-white text-[#1e282d] hover:border-[#356F58] hover:text-[#356F58]'
                }`}
            >
              {hasCurriculum && !subject.startsWith('+') ? `+ ${subject}` : subject}
            </button>
          );
        })}
      </div>

      {/* ── Add / Edit Curriculum Modal ── */}
      <AddCurriculumModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onAddCurriculum={handleSaveCurriculum}
        editItem={editingItem}
        subjectName={cleanSubject}
      />
    </div>
  );
}
