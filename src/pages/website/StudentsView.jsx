import React, { useState } from 'react';
import { formatDateInput, isoToDisplayDate, displayToIsoDate } from '../../utils/dateFormatter';

export default function StudentsView({ onBackToHome, onSelectStudent, onUpgradeClick }) {
  const [students, setStudents] = useState([
    {
      id: 1,
      initials: 'ET',
      name: 'Emma Thomas',
      details: 'Grade 3 • Born 12/05/2015',
      desc: 'Loves stories, nature, and art',
      avatarBg: '#b8d8c8',
      avatarText: '#173f32'
    },
    {
      id: 2,
      initials: 'JL',
      name: 'James Thomas',
      details: 'Grade 1 • Born 03/09/2017',
      desc: 'Enjoys building, animals, and hands-on activities',
      avatarBg: '#c8dfd6',
      avatarText: '#173f32'
    },
    {
      id: 3,
      initials: 'OL',
      name: 'Olivia Thomas',
      details: 'Kindergarten • Born 21/01/2020',
      desc: 'Loves music, pretend play, and picture books',
      avatarBg: '#d4e8e0',
      avatarText: '#173f32'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('12/05/2018');
  const [newInterests, setNewInterests] = useState('');

  // Editing student state
  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState('');
  const [editGrade, setEditGrade] = useState('');
  const [editBirthDate, setEditBirthDate] = useState('');
  const [editInterests, setEditInterests] = useState('');

  const parseStudentBirthDate = (details) => {
    if (!details || !details.includes('Born')) return '12/05/2015';
    const bornStr = details.split('Born')[1]?.trim();
    if (!bornStr) return '12/05/2015';
    try {
      const d = new Date(bornStr);
      if (!isNaN(d.getTime())) {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      }
    } catch {
      // ignore
    }
    return bornStr;
  };

  const handleStartEdit = (student, e) => {
    e?.stopPropagation();
    setIsAdding(false);
    setEditingStudent(student);
    setEditName(student.name || '');
    const currentGrade = student.details?.split(' •')[0] || '';
    setEditGrade(currentGrade);
    setEditBirthDate(parseStudentBirthDate(student.details));
    setEditInterests(student.desc || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editName.trim()) return;

    const initials = editName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'ST';

    const updatedStudent = {
      ...editingStudent,
      name: editName,
      initials,
      details: `${editGrade || 'Grade 1'} • Born ${editBirthDate || '12/05/2015'}`,
      desc: editInterests || editingStudent.desc,
    };

    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setEditingStudent(null);
    setEditName('');
    setEditGrade('');
    setEditBirthDate('');
    setEditInterests('');

    // Redirect directly to the curriculum tab of this edited student!
    onSelectStudent && onSelectStudent(updatedStudent, 'curriculum');
  };

  const handleDeleteStudent = (id, e) => {
    e?.stopPropagation();
    setStudents(students.filter(s => s.id !== id));
    if (editingStudent?.id === id) {
      setEditingStudent(null);
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const initials = newName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'ST';

    const newStudent = {
      id: Date.now(),
      initials,
      name: newName,
      details: `${newGrade || 'Grade 1'} • Born ${newBirthDate || '12/05/2018'}`,
      desc: newInterests || 'Enjoys reading and exploring science',
      avatarBg: '#c8dfd6',
      avatarText: '#173f32'
    };

    setStudents([...students, newStudent]);
    setNewName('');
    setNewGrade('');
    setNewBirthDate('12/05/2018');
    setNewInterests('');
    setIsAdding(false);

    // Redirect directly to the curriculum tab of this newly added student!
    onSelectStudent && onSelectStudent(newStudent, 'curriculum');
  };

  return (
    <div className="mx-auto w-full max-w-[640px] pb-32 pt-4 px-3.5 sm:px-4 transition-all">
      {/* Top Banner: Free trial — 14 days left */}
      <div className="mb-4 flex items-center justify-between border-b border-[#e9e2d5] pb-2.5">
        <span className="text-[11px] font-semibold text-[#bf643e]">
          Free trial — 14 days left
        </span>
        <button
          type="button"
          onClick={onUpgradeClick}
          className="rounded-md border border-[#d5cbbe] bg-white px-2.5 py-0.5 text-[10.5px] font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors cursor-pointer shadow-2xs"
        >
          Upgrade →
        </button>
      </div>

      {/* Page Header with Green Back Circle */}
      <div className="mb-4 flex items-center gap-2.5">
        <button
          onClick={onBackToHome}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#356F58] text-white hover:bg-[#2a5946] transition-colors cursor-pointer"
          aria-label="Go back"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="font-lora text-[30px] font-semibold tracking-tight text-[#212C3E]">
          Student
        </h1>
      </div>

      {/* Section Subtitle */}
      <div className="mb-3">
        <h2 className="font-lora text-[23px] font-semibold font-bold text-[#212C3E]">
          Students
        </h2>
        <p
          style={{ fontFamily: 'Inter, sans-serif' }}
          className="text-[15px] font-medium leading-[100%] tracking-[0%] text-[#685949]"
        >
          Tap a student to manage their curriculum and profile.
        </p>
      </div>

      {/* Student List */}
      <div className="space-y-2.5">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-[#ebdcca] bg-white p-3 shadow-2xs transition-all hover:border-[#dcd3c4]"
            onClick={() => onSelectStudent && onSelectStudent(student, 'curriculum')}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar Circle */}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: student.avatarBg || '#dbe8df', color: student.avatarText || '#173f32' }}
              >
                {student.initials}
              </div>

              {/* Student Details */}
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-[#212C3E] truncate">
                  {student.name}
                </h3>
                <p className="text-[11px] text-[#685949] truncate">
                  {student.details}
                </p>
                <p className="text-[11px] text-[#685949] truncate">
                  {student.desc}
                </p>
              </div>
            </div>

            {/* Actions: Edit & Delete */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => handleStartEdit(student, e)}
                className="flex items-center gap-1 text-xs font-semibold text-[#bf643e] hover:text-[#a04e2b] transition-colors cursor-pointer"
                title="Edit student"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={(e) => handleDeleteStudent(student.id, e)}
                className="text-[#bf643e] hover:text-[#a04e2b] transition-colors cursor-pointer"
                title="Delete student"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Student Form */}
      {editingStudent && (
        <div className="mt-6 rounded-2xl border border-[#d5cbbe] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between border-b border-[#e9e2d5] pb-2">
            <h4 className="font-serif text-sm font-bold text-[#172b30]">
              Edit Student — {editingStudent.name}
            </h4>
            <span className="text-[11px] font-medium text-[#526068]">
              Saves & redirects to Curriculum
            </span>
          </div>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* NAME */}
              <div>
                <label className="block text-center text-[11px] font-bold tracking-wider text-[#526068] uppercase">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Student Name"
                  className="mt-1.5 w-full rounded-xl border border-[#dcd3c4] px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#356F58] focus:outline-hidden"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              {/* GRADE */}
              <div>
                <label className="block text-center text-[11px] font-bold tracking-wider text-[#526068] uppercase">
                  GRADE
                </label>
                <div className="relative mt-1.5">
                  <select
                    className="w-full appearance-none rounded-xl border border-[#dcd3c4] bg-white px-3.5 py-2.5 text-xs text-[#1e282d] focus:border-[#356F58] focus:outline-hidden"
                    value={editGrade}
                    onChange={(e) => setEditGrade(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Pre-K">Pre-K</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="10th Grade">10th Grade</option>
                    <option value="11th Grade">11th Grade</option>
                    <option value="12th Grade">12th Grade</option>
                    <option value="High School">High School</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#526068]">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* DATE OF BIRTH */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold tracking-wider text-[#526068] uppercase">
                  DATE OF BIRTH
                </label>
                <span className="text-[10px] font-semibold text-[#8d9b9f]">
                  DD/MM/YYYY
                </span>
              </div>
              <div className="relative mt-1.5 flex items-center">
                <input
                  type="text"
                  placeholder="DD/MM/YYYY (e.g. 12/05/2002)"
                  maxLength={10}
                  className="w-full rounded-xl border border-[#dcd3c4] bg-white px-3.5 py-2.5 pr-10 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#356F58] focus:outline-hidden"
                  value={editBirthDate}
                  onChange={(e) => setEditBirthDate(formatDateInput(e.target.value))}
                />
                <label className="absolute right-3 cursor-pointer text-[#526068] hover:text-[#356F58] p-1" title="Pick date">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <input
                    type="date"
                    value={displayToIsoDate(editBirthDate)}
                    onChange={(e) => {
                      if (e.target.value) {
                        setEditBirthDate(isoToDisplayDate(e.target.value));
                      }
                    }}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* INTERESTS */}
            <div>
              <label className="block text-center text-[11px] font-bold tracking-wider text-[#526068] uppercase">
                INTERESTS (OPTIONAL)
              </label>
              <input
                type="text"
                placeholder="e.g. dinosaurs, art, Legos, horses"
                className="mt-1.5 w-full rounded-xl border border-[#dcd3c4] px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#356F58] focus:outline-hidden"
                value={editInterests}
                onChange={(e) => setEditInterests(e.target.value)}
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="flex-1 rounded-xl border border-[#d5cbbe] bg-white py-2.5 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#356F58] py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2a5946] transition-colors cursor-pointer"
              >
                Save & Go to Curriculum →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Your students ({students.length}) and + Add another student */}
      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-serif text-base font-bold text-[#172b30]">
          Your students ({students.length})
        </h3>

        {!isAdding && !editingStudent && (
          <button
            type="button"
            onClick={() => {
              setIsAdding(true);
              setEditingStudent(null);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-dashed border-[#356F58] bg-transparent px-4 py-1.5 text-xs font-bold text-[#356F58] hover:bg-[#edf5f0] transition-colors cursor-pointer"
          >
            <span>+ Add another student</span>
          </button>
        )}
      </div>

      {/* Image 3: Expanded Add Student Form */}
      {isAdding && (
        <div className="mt-4 rounded-2xl border border-[#e9e2d5] bg-white p-5 shadow-sm">
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* NAME */}
              <div>
                <label className="block text-center text-[11px] font-bold tracking-wider text-[#526068] uppercase">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Thomas"
                  className="mt-1.5 w-full rounded-xl border border-[#dcd3c4] px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#356F58] focus:outline-hidden"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              {/* GRADE */}
              <div>
                <label className="block text-center text-[11px] font-bold tracking-wider text-[#526068] uppercase">
                  GRADE
                </label>
                <div className="relative mt-1.5">
                  <select
                    className="w-full appearance-none rounded-xl border border-[#dcd3c4] bg-white px-3.5 py-2.5 text-xs text-[#1e282d] focus:border-[#356F58] focus:outline-hidden"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Pre-K">Pre-K</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="High School">High School</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#526068]">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* DATE OF BIRTH */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold tracking-wider text-[#526068] uppercase">
                  DATE OF BIRTH
                </label>
                <span className="text-[10px] font-semibold text-[#8d9b9f]">
                  DD/MM/YYYY
                </span>
              </div>
              <div className="relative mt-1.5 flex items-center">
                <input
                  type="text"
                  placeholder="DD/MM/YYYY (e.g. 12/05/2002)"
                  maxLength={10}
                  className="w-full rounded-xl border border-[#dcd3c4] bg-white px-3.5 py-2.5 pr-10 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#356F58] focus:outline-hidden"
                  value={newBirthDate}
                  onChange={(e) => setNewBirthDate(formatDateInput(e.target.value))}
                />
                <label className="absolute right-3 cursor-pointer text-[#526068] hover:text-[#356F58] p-1" title="Pick date">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <input
                    type="date"
                    value={displayToIsoDate(newBirthDate)}
                    onChange={(e) => {
                      if (e.target.value) {
                        setNewBirthDate(isoToDisplayDate(e.target.value));
                      }
                    }}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* INTERESTS (OPTIONAL) */}
            <div>
              <label className="block text-center text-[11px] font-bold tracking-wider text-[#526068] uppercase">
                INTERESTS (OPTIONAL)
              </label>
              <input
                type="text"
                placeholder="e.g. dinosaurs, art, Legos, horses"
                className="mt-1.5 w-full rounded-xl border border-[#dcd3c4] px-3.5 py-2.5 text-xs text-[#1e282d] placeholder-[#8d9b9f] focus:border-[#356F58] focus:outline-hidden"
                value={newInterests}
                onChange={(e) => setNewInterests(e.target.value)}
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 rounded-xl border border-[#d5cbbe] bg-white py-2.5 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[linear-gradient(92.26deg,#126041_30.56%,#159446_98.6%)] py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#126041] transition-colors cursor-pointer"
              >
                Add Student & View Curriculum →
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
