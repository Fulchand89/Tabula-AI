import React, { useState } from 'react';

// Comprehensive list of school years covering Kindergarten through 12th Grade past and future
export const SCHOOL_YEAR_OPTIONS = [
  'All Years',
  '2030–2031',
  '2029–2030',
  '2028–2029',
  '2027–2028',
  '2026–2027',
  '2025–2026',
  '2024–2025',
  '2023–2024',
  '2022–2023',
  '2021–2022',
  '2020–2021',
  '2019–2020',
  '2018–2019',
  '2017–2018',
  '2016–2017',
  '2015–2016',
  '2014–2015',
  '2013–2014',
  '2012–2013',
  '2011–2012',
  '2010–2011',
];

/**
 * Report Tab component for Student Details.
 * Includes Transcript & GPA sub-view and Progress Report sub-view.
 */
export default function StudentReportTab({
  reportSubTab,
  setReportSubTab,
  schoolYear,
  setSchoolYear,
  isSchoolYearOpen,
  setIsSchoolYearOpen,
  mathGrade,
  setMathGrade,
  isMathGradeOpen,
  setIsMathGradeOpen,
  GRADE_OPTIONS,
  mathCredits,
  setMathCredits,
  workSamples,
  setIsWorkSampleModalOpen,
}) {
  const [isProgressSchoolYearOpen, setIsProgressSchoolYearOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Sub-tabs: TRANSCRIPT & GPA | PROGRESS REPORT */}
      <div className="flex items-center rounded-full border border-[#e8dfd3] bg-white p-1 shadow-2xs">
        <button
          type="button"
          onClick={() => setReportSubTab('transcript')}
          className={`flex-1 rounded-full py-2.5 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${reportSubTab === 'transcript'
            ? 'bg-[#b8704a] text-white shadow-xs'
            : 'text-[#2b3c42] hover:text-[#16272b]'
            }`}
        >
          TRANSCRIPT & GPA
        </button>
        <button
          type="button"
          onClick={() => setReportSubTab('progress')}
          className={`flex-1 rounded-full py-2.5 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${reportSubTab === 'progress'
            ? 'bg-[#b8704a] text-white shadow-xs'
            : 'text-[#2b3c42] hover:text-[#16272b]'
            }`}
        >
          PROGRESS REPORT
        </button>
      </div>

      {/* TRANSCRIPT & GPA VIEW */}
      {reportSubTab === 'transcript' && (
        <div>
          {/* SCHOOL YEAR */}
          <div className="mb-5 text-center">
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-2">
              SCHOOL YEAR
            </label>
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setIsSchoolYearOpen(!isSchoolYearOpen)}
                className="flex min-w-[220px] items-center justify-between rounded-xl border border-[#d5dcd8] bg-white px-5 py-3 text-sm font-medium text-[#16272b] hover:border-[#b8c2bc] transition-colors shadow-2xs cursor-pointer"
              >
                <span className="flex-1 text-center font-semibold">{schoolYear}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#526068"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 transition-transform duration-200 ${isSchoolYearOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isSchoolYearOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsSchoolYearOpen(false)}
                  />
                  <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-xl border border-[#d5dcd8] bg-white py-1 shadow-xl">
                    {SCHOOL_YEAR_OPTIONS.map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => {
                          setSchoolYear(yr);
                          setIsSchoolYearOpen(false);
                        }}
                        className={`flex w-full items-center justify-center px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${schoolYear === yr
                          ? 'bg-[#edf5f0] text-[#356F58] font-bold'
                          : 'text-[#1e282d] hover:bg-[#faf5eb]'
                          }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Explanatory text */}
          <p className="mx-auto mb-6 max-w-[430px] text-center text-[12.5px] leading-relaxed text-[#5a6a70]">
            Assign a grade and credit value to each subject. GPA is calculated automatically.
            <br />
            Leave a grade as “–” or “P” (Pass) to exclude it from GPA.
          </p>

          {/* Subject Card: MATH */}
          <div className="mb-4 rounded-2xl border border-[#e8dfd3] bg-white p-5 shadow-2xs">
            {/* Header row with Sprout icon + Title */}
            <div className="mb-4 flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d6e5dc]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#356F58"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21V10" />
                  <path d="M12 10C8.5 7 4.5 7.5 3.5 10c0 3.5 4 5 8.5 3.5" />
                  <path d="M12 12c3.5-3 7.5-2.5 8.5 0 0 3.5-4 5-8.5 3.5" />
                </svg>
              </div>
              <h3 className="text-[15px] font-extrabold tracking-wide text-[#16272b] uppercase">
                MATH
              </h3>
            </div>

            {/* Form row: GRADE and CREDITS */}
            <div className="flex items-start gap-4">
              {/* GRADE */}
              <div className="relative flex-1">
                <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-1.5">
                  GRADE
                </label>
                <button
                  type="button"
                  onClick={() => setIsMathGradeOpen(!isMathGradeOpen)}
                  className="flex w-full items-center justify-between rounded-xl border border-[#d5dcd8] bg-white px-4 py-3 text-left text-sm font-medium text-[#16272b] hover:border-[#b8c2bc] transition-colors cursor-pointer"
                >
                  <span>{mathGrade}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#526068"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${isMathGradeOpen ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isMathGradeOpen && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-[#d5dcd8] bg-white py-1 shadow-lg">
                    {GRADE_OPTIONS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          setMathGrade(g);
                          setIsMathGradeOpen(false);
                        }}
                        className={`flex w-full items-center px-4 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${mathGrade === g
                          ? 'bg-[#edf5f0] text-[#356F58] font-bold'
                          : 'text-[#1e282d] hover:bg-[#faf5eb]'
                          }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CREDITS */}
              <div className="w-[84px] shrink-0">
                <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-1.5 text-center">
                  CREDITS
                </label>
                <input
                  type="text"
                  value={mathCredits}
                  onChange={(e) => setMathCredits(e.target.value)}
                  className="w-full rounded-xl border border-[#d5dcd8] bg-white py-3 text-center text-sm font-semibold text-[#16272b] focus:border-[#356F58] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Credits / GPA summary card */}
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#e8dfd3] bg-white p-4 shadow-2xs">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d6e5dc]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="12" width="3.5" height="8" rx="1.5" fill="#16272b" />
                <rect x="10.25" y="6" width="3.5" height="14" rx="1.5" fill="#16272b" />
                <rect x="16.5" y="9" width="3.5" height="11" rx="1.5" fill="#16272b" />
              </svg>
            </div>

            <div className="h-10 w-[1px] bg-[#ede7dd] shrink-0" />

            <div>
              <p className="text-[13px] font-bold text-[#16272b]">
                {mathCredits || '1'} total credits · Pass/Complete basis
              </p>
              <p className="mt-0.5 text-[11.5px] text-[#607077]">
                Assign letter grades to calculate a GPA
              </p>
            </div>
          </div>

          {/* Export & Print Transcript Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#356F58] px-6 py-4 text-sm font-bold text-white shadow-xs hover:bg-[#2a5946] active:scale-[0.99] transition-all cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export & Print Transcript</span>
          </button>
        </div>
      )}

      {/* PROGRESS REPORT VIEW */}
      {reportSubTab === 'progress' && (
        <div>
          <div className="mb-5 text-center">
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#718086] mb-2">
              SCHOOL YEAR
            </label>
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setIsProgressSchoolYearOpen(!isProgressSchoolYearOpen)}
                className="flex min-w-[220px] items-center justify-between rounded-xl border border-[#d5dcd8] bg-white px-5 py-3 text-sm font-medium text-[#16272b] hover:border-[#b8c2bc] transition-colors shadow-2xs cursor-pointer"
              >
                <span className="flex-1 text-center font-semibold">{schoolYear}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#526068"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 transition-transform duration-200 ${isProgressSchoolYearOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isProgressSchoolYearOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsProgressSchoolYearOpen(false)}
                  />
                  <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-xl border border-[#d5dcd8] bg-white py-1 shadow-xl">
                    {SCHOOL_YEAR_OPTIONS.map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => {
                          setSchoolYear(yr);
                          setIsProgressSchoolYearOpen(false);
                        }}
                        className={`flex w-full items-center justify-center px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${schoolYear === yr
                          ? 'bg-[#edf5f0] text-[#126041] font-bold'
                          : 'text-[#1e282d] hover:bg-[#faf5eb]'
                          }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {workSamples.length === 0 ? (
            <div className="mb-6 text-center">
              <h3 className="text-sm font-bold text-[#16272b] mb-1">
                No entries yet
              </h3>
              <p className="text-xs text-[#607077]">
                Add your first work sample to start building portfolio entries.
              </p>
            </div>
          ) : (
            <div className="mb-6 space-y-3">
              {workSamples.map((sample, idx) => (
                <div key={idx} className="rounded-2xl border border-[#e8dfd3] bg-white p-4 shadow-2xs flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#16272b]">{sample.title}</h4>
                    <p className="text-xs text-[#607077]">{sample.subject} • {sample.date}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#356F58]">Added</span>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsWorkSampleModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(92.26deg,#126041_30.56%,#159446_98.6%)] px-6 py-4 text-sm font-bold text-white shadow-xs hover:bg-[#126041] active:scale-[0.99] transition-all cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Work Sample</span>
          </button>
        </div>
      )}
    </div>
  );
}
