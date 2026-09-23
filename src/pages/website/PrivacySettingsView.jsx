import React, { useState } from 'react';

/**
 * PrivacySettingsView component matching Tabula's Privacy Settings page.
 * Exact 1:1 match to user's reference image:
 * - Header (Back Circle Button + "Privacy Settings" title + "You are in control of your data" subtitle)
 * - Card 1: "How Tabula handles your data" with 4 green checkmark bullets
 * - Section 2: "WHAT GETS SENT TO THE AI COACH" with 5 interactive toggle cards
 * - Section 3: "YOUR DATA" with 2 action rows (All data stored on this device + Delete all my data →)
 * - Section 4: "ABOUT AI PROCESSING" card with Anthropic privacy details
 * - Section 5: Large "Save Privacy Settings →" green button
 */
export default function PrivacySettingsView({ onBackToHome }) {
  // Toggle states matching the 5 settings in reference image
  const [toggles, setToggles] = useState({
    teachingPhilosophy: true,
    studentNames: true,
    learningStrengths: true,
    curriculumResources: true,
    weeklySchedule: true,
  });

  const [savedNotification, setSavedNotification] = useState(false);

  const toggleSetting = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleDeleteData = () => {
    if (window.confirm('Are you sure you want to delete all stored local data? This action cannot be undone.')) {
      alert('All local data has been reset.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-[640px] pb-32 pt-4 px-3.5 sm:px-4 transition-all">
      {/* Saved Toast Notification */}
      {savedNotification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#356F58] px-4 py-3 text-xs font-bold text-white shadow-xl animate-fade-in">
          <span>✓</span>
          <span>Privacy settings saved successfully!</span>
        </div>
      )}

      {/* ================================================================
          1. PAGE HEADER (Circle Back Arrow + Privacy Settings Title)
          ================================================================ */}
      <div className="mb-5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] bg-white text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
          aria-label="Go back to Home"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-[#16272b]">
            Privacy Settings
          </h1>
          <p className="text-[11px] font-medium text-[#526068]">
            You are in control of your data
          </p>
        </div>
      </div>

      <div className="space-y-7">
        {/* ================================================================
            2. HOW TABULA HANDLES YOUR DATA CARD
            ================================================================ */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#e8dfd3] bg-white p-5 sm:p-6 shadow-2xs">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#be5f39] mb-4">
            How Tabula handles your data
          </h2>

          <div className="space-y-3.5">
            {/* Bullet 1 */}
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#356F58] text-white text-[11px] font-bold mt-0.5 shadow-2xs">
                ✓
              </div>
              <p className="text-xs sm:text-[13.5px] font-semibold text-[#16272b] leading-relaxed">
                Your family profile, student info, curriculum, and planner all stay on this device only.
              </p>
            </div>

            {/* Bullet 2 */}
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#356F58] text-white text-[11px] font-bold mt-0.5 shadow-2xs">
                ✓
              </div>
              <p className="text-xs sm:text-[13.5px] font-semibold text-[#16272b] leading-relaxed">
                When you ask the AI coach a question, we send context to Claude (by Anthropic) to generate your answer. That data is not stored or used to train AI models.
              </p>
            </div>

            {/* Bullet 3 */}
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#356F58] text-white text-[11px] font-bold mt-0.5 shadow-2xs">
                ✓
              </div>
              <p className="text-xs sm:text-[13.5px] font-semibold text-[#16272b] leading-relaxed">
                We never sell your data. No third-party advertising. No profiling.
              </p>
            </div>

            {/* Bullet 4 */}
            <div className="flex items-start gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#356F58] text-white text-[11px] font-bold mt-0.5 shadow-2xs">
                ✓
              </div>
              <p className="text-xs sm:text-[13.5px] font-semibold text-[#16272b] leading-relaxed">
                You can delete everything instantly at any time.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================
            3. WHAT GETS SENT TO THE AI COACH SECTION
            ================================================================ */}
        <div>
          <h2 className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#24373e] mb-1">
            WHAT GETS SENT TO THE AI COACH
          </h2>
          <p className="text-xs text-[#607077] mb-3.5">
            The more context you share, the more personalized your coaching. Choose what you're comfortable with.
          </p>

          <div className="space-y-3">
            {/* Toggle 1: Teaching philosophy & faith tradition */}
            <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5f0] text-[#356F58]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-[#16272b]">
                    Teaching philosophy & faith tradition
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#607077]">
                    Allows the AI to match your coaching style and values.
                  </p>
                </div>
              </div>
              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => toggleSetting('teachingPhilosophy')}
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggles.teachingPhilosophy ? 'bg-[#356F58]' : 'bg-[#d0c8b8]'
                  }`}
                aria-label="Toggle Teaching philosophy & faith tradition"
              >
                <span
                  className={`pointer-events-none inline-block h-5.5 w-5.5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out ${toggles.teachingPhilosophy ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>

            {/* Toggle 2: Student names */}
            <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5f0] text-[#356F58]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-[#16272b]">
                    Student names
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#607077]">
                    Off = students are referred to as Student A, Student B, etc.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting('studentNames')}
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggles.studentNames ? 'bg-[#356F58]' : 'bg-[#d0c8b8]'
                  }`}
                aria-label="Toggle Student names"
              >
                <span
                  className={`pointer-events-none inline-block h-5.5 w-5.5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out ${toggles.studentNames ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>

            {/* Toggle 3: Learning strengths & challenges */}
            <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5f0] text-[#356F58]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-[#16272b]">
                    Learning strengths & challenges
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#607077]">
                    Helps the AI give targeted support for your child's needs.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting('learningStrengths')}
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggles.learningStrengths ? 'bg-[#356F58]' : 'bg-[#d0c8b8]'
                  }`}
                aria-label="Toggle Learning strengths & challenges"
              >
                <span
                  className={`pointer-events-none inline-block h-5.5 w-5.5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out ${toggles.learningStrengths ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>

            {/* Toggle 4: Curriculum resources & pacing */}
            <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5f0] text-[#356F58]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-[#16272b]">
                    Curriculum resources & pacing
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#607077]">
                    Required for the AI to give curriculum-specific guidance.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting('curriculumResources')}
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggles.curriculumResources ? 'bg-[#356F58]' : 'bg-[#d0c8b8]'
                  }`}
                aria-label="Toggle Curriculum resources & pacing"
              >
                <span
                  className={`pointer-events-none inline-block h-5.5 w-5.5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out ${toggles.curriculumResources ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>

            {/* Toggle 5: Weekly schedule & assignments */}
            <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5f0] text-[#356F58]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-[#16272b]">
                    Weekly schedule & assignments
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#607077]">
                    Required for weekly planning and pacing advice.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting('weeklySchedule')}
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggles.weeklySchedule ? 'bg-[#356F58]' : 'bg-[#d0c8b8]'
                  }`}
                aria-label="Toggle Weekly schedule & assignments"
              >
                <span
                  className={`pointer-events-none inline-block h-5.5 w-5.5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out ${toggles.weeklySchedule ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================
            4. YOUR DATA SECTION
            ================================================================ */}
        <div>
          <h2 className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#24373e] mb-3">
            YOUR DATA
          </h2>

          <div className="rounded-2xl border border-[#e8dfd3] bg-white divide-y divide-[#f0eae0] shadow-2xs">
            {/* Row 1: All data stored on this device */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf5f0] text-[#356F58]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-[#16272b]">
                    All data stored on this device
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#607077]">
                    Family profile, students, curriculum, planner, and coaching history
                  </p>
                </div>
              </div>
              <span className="text-[#8d9b9f] text-sm font-semibold">›</span>
            </div>

            {/* Row 2: Delete all my data → */}
            <div
              onClick={handleDeleteData}
              className="p-4 flex items-center justify-between hover:bg-[#fff9f6] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#faece3] text-[#bf643e]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-[#bf643e] hover:underline">
                    Delete all my data →
                  </h3>
                </div>
              </div>
              <span className="text-[#8d9b9f] text-sm font-semibold">›</span>
            </div>
          </div>
        </div>

        {/* ================================================================
            5. ABOUT AI PROCESSING SECTION
            ================================================================ */}
        <div>
          <h2 className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#24373e] mb-3">
            ABOUT AI PROCESSING
          </h2>

          <div className="rounded-2xl sm:rounded-3xl border border-[#e8dfd3] bg-white p-5 sm:p-6 shadow-2xs">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#be5f39] mb-3">
              About AI processing
            </h2>
            <p className="text-xs sm:text-[13.5px] font-medium leading-relaxed text-[#22333b]">
              Tabula uses Claude, an AI made by Anthropic. When you ask the coach a question, your selected context is sent to Anthropic's API to generate a response. Anthropic does not use API data to train their models. You can read Anthropic's privacy policy at <a href="https://anthropic.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-[#be5f39]">anthropic.com/privacy</a>.
            </p>
          </div>
        </div>

        {/* ================================================================
            6. SAVE PRIVACY SETTINGS BUTTON
            ================================================================ */}
        <button
          type="button"
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(92.26deg,#126041_30.56%,#159446_98.6%)] hover:bg-[#126041] active:scale-[0.99] py-4 px-6 text-sm sm:text-base font-bold text-white shadow-md transition-all cursor-pointer"
        >
          <span>Save Privacy Settings</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
