import React, { useState, useEffect } from 'react';

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

export default function AddCurriculumModal({
  isOpen,
  onClose,
  onAddCurriculum,
  editItem = null,
  subjectName = 'Math',
}) {
  const cleanSubject = subjectName.replace(/^\+\s*/, '').trim() || 'Math';
  const commonChoices =
    COMMON_CHOICES_BY_SUBJECT[cleanSubject] ||
    COMMON_CHOICES_BY_SUBJECT[cleanSubject.toLowerCase()] ||
    COMMON_CHOICES_BY_SUBJECT.Math;

  const [title, setTitle] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [pacing, setPacing] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || '');
      setPacing(editItem.pacing || '');
      setNotes(editItem.notes || '');
      setSelectedChoice(editItem.title || '');
    } else {
      setTitle('');
      setPacing('');
      setNotes('');
      setSelectedChoice(commonChoices[0] || '');
    }
  }, [editItem, isOpen, cleanSubject]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTitle = title.trim() || selectedChoice;
    if (!finalTitle) return;

    if (onAddCurriculum) {
      onAddCurriculum({
        id: editItem?.id || `curr-${Date.now()}`,
        title: finalTitle,
        pacing: pacing.trim(),
        notes: notes.trim(),
      });
    }
    onClose();
  };

  const handleSelectChoice = (choice) => {
    setSelectedChoice(choice);
    setTitle(choice);
  };

  const isEditing = Boolean(editItem);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-[500px] rounded-2xl border border-[#e9e2d5] bg-[#faf6ee] p-6 shadow-2xl transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Top Handle Bar */}
        <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-[#bf643e]" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full text-xl text-[#1e282d] hover:bg-[#e9e2d5]/60 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>

        {/* Icon */}
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#d7e7dc] text-[#1b6b50]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="16" y1="14" x2="16" y2="18" />
            <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
          </svg>
        </div>

        {/* Header Text */}
        <div className="text-center">
          <h2 className="font-serif text-xl font-bold tracking-tight text-[#172b30] uppercase">
            {isEditing ? `EDIT ${cleanSubject} CURRICULUM` : `ADD ${cleanSubject} CURRICULUM`}
          </h2>
          <p className="mt-1 text-xs text-[#526068]">
            {isEditing
              ? 'Update the curriculum details below.'
              : 'Add a curriculum resource for this subject. You can add multiple.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* CURRICULUM TITLE * */}
          <div>
            <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase">
              CURRICULUM TITLE *
            </label>
            <input 
              type="text"
              required
              className="mt-1.5 w-full rounded-xl border border-[#e2d8cb] bg-white px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-hidden"
              placeholder={`e.g. ${commonChoices[0] || 'Curriculum Title'}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* COMMON CHOICES */}
          <div>
            <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase">
              COMMON CHOICES:
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {commonChoices.map((choice) => {
                const isSelected = selectedChoice === choice || title === choice;
                return (
                  <button
                    type="button"
                    key={choice}
                    onClick={() => handleSelectChoice(choice)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1b6b50] text-white'
                        : 'border border-[#e2d8cb] bg-white text-[#33444a] hover:bg-[#faf6ee]'
                    }`}
                  >
                    {isSelected ? `+ ${choice}` : choice}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PACING / WHERE YOU ARE (OPTIONAL) */}
          <div>
            <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase">
              PACING / WHERE YOU ARE (OPTIONAL)
            </label>
            <input 
              type="text"
              className="mt-1.5 w-full rounded-xl border border-[#e2d8cb] bg-white px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-hidden"
              placeholder="e.g. Lesson 45, Chapter 3, Week 12 of 36"
              value={pacing}
              onChange={(e) => setPacing(e.target.value)}
            />
          </div>

          {/* NOTES (OPTIONAL) */}
          <div>
            <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase">
              NOTES (OPTIONAL)
            </label>
            <textarea 
              rows={3}
              className="mt-1.5 w-full resize-none rounded-xl border border-[#e2d8cb] bg-white px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-hidden"
              placeholder="Any context about how you use this curriculum, modifications you make, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#d5cbbe] bg-white py-2.5 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#1b6b50] py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#14553f] transition-colors cursor-pointer"
            >
              {isEditing ? 'Save Changes →' : 'Add Curriculum →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
