import React, { useState, useEffect, useRef } from 'react';

const COMMON_CHOICES_BY_SUBJECT = {
  Math: [
    'Singapore Math',
    'Saxon Math',
    'Math-U-See',
    'RightStart Mathematics',
    'Math Mammoth',
    'Beast Academy',
  ],
  Phonic: [
    'All About Reading',
    'Explode the Code',
    'Teach Your Child to Read',
    'Logic of English',
    'Hooked on Phonics',
  ],
  Phonics: [
    'All About Reading',
    'Explode the Code',
    'Teach Your Child to Read',
    'Logic of English',
    'Hooked on Phonics',
  ],
  Writing: [
    'Writing With Ease',
    'IEW (Institute for Excellence in Writing)',
    'WriteShop',
    'Brave Writer',
    'Essentials in Writing',
  ],
  'Language Arts': [
    'First Language Lessons',
    'Grammar Island (MCT)',
    'Shurley English',
    'Easy Grammar',
    'Fix It! Grammar',
  ],
  History: [
    'Story of the World',
    'Beautiful Feet Books',
    'Mystery of History',
    'Curiosity Chronicles',
    'History Quest',
  ],
  Science: [
    'Building Foundations of Scientific Understanding',
    'Real Science-4-Kids',
    'Apologia Science',
    'Science Mom',
    'Mystery Science',
  ],
  'Bible / Character': [
    'Leading Little Ones to God',
    'The Jesus Storybook Bible',
    'Character First Education',
    'Wise Words',
  ],
  'AI & Coding': [
    'Scratch Coding',
    'Code.org',
    'Python for Kids',
    'Swift Playgrounds',
  ],
  'Classical Languages': [
    'Song School Latin',
    'Minimus Latin',
    'Visual Latin',
    'Henle Latin',
  ],
  'Foreign Language': [
    'Spanish for Children',
    'TalkBox.Mom',
    'Duolingo Homeschool',
    'Rosetta Stone',
  ],
  'Logic / Thinking': [
    'Mind Benders',
    'Building Thinking Skills',
    'The Fallacy Detective',
    'Logic Safari',
  ],
  Art: [
    'Artistic Pursuits',
    'Draw Write Now',
    'Meet the Masters',
    'Home Art Studio',
  ],
  Music: [
    'SQUILT Music',
    'Hoffman Academy Piano',
    'Zeeok Music Appreciation',
    'Composer Studies',
  ],
  'Physical Education': [
    'Outdoor Track & Field',
    'Gymnastics & Movement',
    'Swimming & Water Safety',
    'Youth Martial Arts',
  ],
  Other: [
    'Life Skills & Cooking',
    'Public Speaking',
    'Gardening & Botany',
  ],
};

const ALL_CHOICES_WITH_SUBJECT = Object.entries(COMMON_CHOICES_BY_SUBJECT).flatMap(
  ([subj, list]) => list.map((item) => ({ choice: item, subject: subj }))
);

export default function AddCurriculumModal({
  isOpen,
  onClose,
  onAddCurriculum,
  editItem = null,
  subjectName = 'Math',
}) {
  const cleanSubject = subjectName.replace(/^\+\s*/, '').trim() || 'Math';
  const defaultSubjectChoices =
    COMMON_CHOICES_BY_SUBJECT[cleanSubject] ||
    COMMON_CHOICES_BY_SUBJECT[cleanSubject.toLowerCase()] ||
    COMMON_CHOICES_BY_SUBJECT.Math;

  const [selectedChoices, setSelectedChoices] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [pacing, setPacing] = useState('');
  const [notes, setNotes] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editItem) {
      if (Array.isArray(editItem.selectedChoices) && editItem.selectedChoices.length > 0) {
        setSelectedChoices(editItem.selectedChoices);
        const remaining = (editItem.title || '')
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s && !editItem.selectedChoices.includes(s))
          .join(', ');
        setCustomInput(remaining);
      } else {
        const parts = (editItem.title || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        const matched = defaultSubjectChoices.filter((c) => parts.includes(c));
        const unmatched = parts.filter((p) => !defaultSubjectChoices.includes(p)).join(', ');
        setSelectedChoices(matched);
        setCustomInput(unmatched || (matched.length === 0 ? editItem.title || '' : ''));
      }
      setPacing(editItem.pacing || '');
      setNotes(editItem.notes || '');
    } else {
      setSelectedChoices([]);
      setCustomInput('');
      setPacing('');
      setNotes('');
    }
  }, [editItem, isOpen, cleanSubject]);

  if (!isOpen) return null;

  const handleToggleChoice = (choice) => {
    setSelectedChoices((prev) => {
      if (prev.includes(choice)) {
        return prev.filter((c) => c !== choice);
      } else {
        return [...prev, choice];
      }
    });
    setCustomInput('');
  };

  const handleRemoveChoice = (choice) => {
    setSelectedChoices((prev) => prev.filter((c) => c !== choice));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      if (customInput.trim()) {
        e.preventDefault();
        const trimmed = customInput.trim();
        if (!selectedChoices.includes(trimmed)) {
          setSelectedChoices((prev) => [...prev, trimmed]);
        }
        setCustomInput('');
      }
    } else if (e.key === 'Backspace' && !customInput && selectedChoices.length > 0) {
      setSelectedChoices((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTitles = [...selectedChoices];
    if (customInput.trim() && !allTitles.includes(customInput.trim())) {
      allTitles.push(customInput.trim());
    }
    const finalTitle = allTitles.join(', ');
    if (!finalTitle) return;

    let detectedSubject = cleanSubject;
    for (const title of allTitles) {
      for (const [subj, list] of Object.entries(COMMON_CHOICES_BY_SUBJECT)) {
        if (list.includes(title)) {
          detectedSubject = subj;
          break;
        }
      }
    }

    if (onAddCurriculum) {
      onAddCurriculum({
        id: editItem?.id || `curr-${Date.now()}`,
        subject: detectedSubject,
        title: finalTitle,
        selectedChoices: allTitles,
        pacing: pacing.trim(),
        notes: notes.trim(),
      });
    }
    onClose();
  };

  const isEditing = Boolean(editItem);

  const allSelectedTitles = [...selectedChoices];
  if (customInput.trim() && !allSelectedTitles.includes(customInput.trim())) {
    allSelectedTitles.push(customInput.trim());
  }

  const displayHeadingSubject =
    allSelectedTitles.length > 0
      ? allSelectedTitles.join(', ')
      : cleanSubject;

  // Filter choices when typing: "likhe to hi aa jana chahiye"
  const query = customInput.trim().toLowerCase();
  const displayedChoices = query
    ? ALL_CHOICES_WITH_SUBJECT.filter(
        ({ choice, subject }) =>
          choice.toLowerCase().includes(query) ||
          subject.toLowerCase().includes(query)
      )
    : defaultSubjectChoices.map((choice) => ({
        choice,
        subject: cleanSubject,
      }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3.5 sm:p-4 backdrop-blur-xs">
      <div
        className="relative w-full max-w-[480px] rounded-2xl border border-[#e9e2d5] bg-[#faf6ee] p-4 sm:p-5 shadow-2xl transition-all max-h-[92vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Top Handle Bar */}
        <div className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-[#bf643e]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full text-xl text-[#1e282d] hover:bg-[#e9e2d5]/60 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>

        {/* Icon */}
        <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#d7e7dc] text-[#356F58]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="16" y1="14" x2="16" y2="18" />
            <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
          </svg>
        </div>

        {/* Header Text */}
        <div className="text-center">
          <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#172b30] uppercase">
            {isEditing ? `EDIT ${displayHeadingSubject} CURRICULUM` : `ADD ${displayHeadingSubject} CURRICULUM`}
          </h2>
          <p className="mt-0.5 text-[11px] text-[#526068]">
            {isEditing
              ? 'Update the curriculum details below.'
              : 'Add a curriculum resource for this subject. You can select multiple choices.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-3.5 space-y-3">
          {/* CURRICULUM TITLE * */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-[10.5px] font-bold tracking-wider text-[#1e282d] uppercase">
                CURRICULUM TITLE *
              </label>
              {selectedChoices.length > 1 && (
                <span className="text-[10px] text-[#356F58] font-semibold">
                  {selectedChoices.length} selected
                </span>
              )}
            </div>

            <div
              onClick={() => inputRef.current?.focus()}
              className="mt-1 flex min-h-[42px] w-full flex-wrap items-center gap-1.5 rounded-xl border border-[#e2d8cb] bg-white px-2.5 py-1.5 text-xs text-[#1e282d] focus-within:border-[#356F58] focus-within:ring-2 focus-within:ring-[#356F58]/15 transition-all cursor-text"
            >
              {selectedChoices.map((choice) => (
                <span
                  key={choice}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#e8f3ed] px-2 py-0.5 text-[11px] font-semibold text-[#1f5641] border border-[#c4e1d2] shadow-2xs"
                >
                  <span>{choice}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveChoice(choice);
                    }}
                    className="ml-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[#356F58] hover:bg-[#cbe3d6] hover:text-[#ba633f] text-xs font-bold leading-none cursor-pointer transition-colors"
                    aria-label={`Remove ${choice}`}
                    title={`Remove ${choice}`}
                  >
                    ×
                  </button>
                </span>
              ))}

              <input
                ref={inputRef}
                type="text"
                required={selectedChoices.length === 0}
                className="min-w-[120px] flex-1 bg-transparent text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:outline-hidden py-1"
                placeholder={
                  selectedChoices.length === 0
                    ? `e.g. ${defaultSubjectChoices[0] || 'Curriculum Title'} or type to search...`
                    : 'Type custom or search more...'
                }
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* COMMON CHOICES */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-[10.5px] font-bold tracking-wider text-[#1e282d] uppercase">
                {query ? `COMMON CHOICES (MATCHING "${customInput.trim()}"):` : 'COMMON CHOICES:'}
              </label>
              {selectedChoices.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedChoices([])}
                  className="text-[10.5px] font-semibold text-[#bf643e] hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>
            {displayedChoices.length > 0 ? (
              <div className="mt-1.5 flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1 no-scrollbar">
                {displayedChoices.map(({ choice, subject }) => {
                  const isSelected = selectedChoices.includes(choice);
                  return (
                    <button
                      type="button"
                      key={choice}
                      onClick={() => handleToggleChoice(choice)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#356F58] text-white shadow-2xs font-semibold'
                          : 'border border-[#e2d8cb] bg-white text-[#33444a] hover:bg-[#faf6ee]'
                      }`}
                    >
                      {isSelected ? `+ ${choice}` : choice}
                      {query && subject !== cleanSubject && (
                        <span className={`ml-1 text-[9.5px] ${isSelected ? 'text-white/80' : 'text-[#8d9b9f]'}`}>
                          ({subject})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="mt-1.5 text-xs text-[#798790]">
                No matching choices found. Press <span className="font-semibold text-[#1e282d]">Enter</span> to add "{customInput.trim()}" as a custom title.
              </p>
            )}
          </div>

          {/* PACING / WHERE YOU ARE (OPTIONAL) */}
          <div>
            <label className="block text-[10.5px] font-bold tracking-wider text-[#1e282d] uppercase">
              PACING / WHERE YOU ARE (OPTIONAL)
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-[#e2d8cb] bg-white px-3 py-2 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#356F58] focus:outline-hidden"
              placeholder="e.g. Lesson 45, Chapter 3, Week 12 of 36"
              value={pacing}
              onChange={(e) => setPacing(e.target.value)}
            />
          </div>

          {/* NOTES (OPTIONAL) */}
          <div>
            <label className="block text-[10.5px] font-bold tracking-wider text-[#1e282d] uppercase">
              NOTES (OPTIONAL)
            </label>
            <textarea
              rows={2}
              className="mt-1 w-full resize-none rounded-xl border border-[#e2d8cb] bg-white px-3 py-2 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#356F58] focus:outline-hidden"
              placeholder="Any context about how you use this curriculum, modifications you make, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#d5cbbe] bg-white py-2 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[linear-gradient(92.26deg,#126041_30.56%,#159446_98.6%)] py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#126041] transition-colors cursor-pointer"
            >
              {isEditing ? 'Save Changes →' : 'Add Curriculum →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
