import React, { useState, useEffect } from 'react';
import StudentCurriculumTab from './StudentCurriculumTab';
import StudentProfileTab from './StudentProfileTab';
import StudentReportTab from './StudentReportTab';
import StudentPortfolioTab from './StudentPortfolioTab';

const SUBJECTS = [
  '+ Math',
  'Phonic',
  'Writing',
  'Language Arts',
  'History',
  'Science',
  'Bible / Character',
  'AI & Coding',
  'Classical Languages',
  'Foreign Language',
  'Logic / Thinking',
  'Art',
  'Music',
  'Physical Education',
  'Other',
];

const INITIAL_STRENGTHS = [
  { id: 'reading-fluency', label: 'Reading fluency', active: true },
  { id: 'math-concepts', label: 'Math concepts', active: false },
  { id: 'creative-thinking', label: 'Creative thinking', active: false },
  { id: 'memory-recall', label: 'Memory & recall', active: false },
  { id: 'art-music', label: 'Art & music', active: false },
  { id: 'writing', label: 'Writing', active: false },
  { id: 'science-curiosity', label: 'Science curiosity', active: false },
  { id: 'discussion-debate', label: 'Discussion & debate', active: false },
];

const INITIAL_CHALLENGES = [
  { id: 'staying-focused', label: 'Staying focused', active: true },
  { id: 'reading-fluency-c', label: 'Reading fluency', active: false },
  { id: 'math-computation', label: 'Math computation', active: false },
  { id: 'writing-spelling', label: 'Writing & spelling', active: false },
  { id: 'following-directions', label: 'Following directions', active: false },
  { id: 'executive-function', label: 'Executive function', active: false },
  { id: 'transitions-tasks', label: 'Transitions between tasks', active: false },
  { id: 'sitting-still', label: 'Sitting still', active: false },
];

const GRADE_OPTIONS = [
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade',
  '6th Grade',
  '7th Grade',
  '8th Grade',
  '9th Grade',
  '10th Grade',
  '11th Grade',
  '12th Grade',
];

const PORTFOLIO_SUBJECTS = [
  '— Select subject —',
  'Math',
  'Phonics / Reading',
  'Writing & Spelling',
  'Language Arts',
  'History & Geography',
  'Science & Nature',
  'Art & Music',
  'Physical Education',
  'Foreign Language',
  'Other',
];

export default function StudentDetailView({ student, initialTab = 'curriculum', onBack }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'curriculum'); // Default to Curriculum tab

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, student?.id]);

  const [reportSubTab, setReportSubTab] = useState('progress');
  const [schoolYear, setSchoolYear] = useState('2026–2027');
  const [isSchoolYearOpen, setIsSchoolYearOpen] = useState(false);
  const [mathGrade, setMathGrade] = useState('1st Grade');
  const [isMathGradeOpen, setIsMathGradeOpen] = useState(false);
  const [mathCredits, setMathCredits] = useState('1');
  const [isWorkSampleModalOpen, setIsWorkSampleModalOpen] = useState(false);
  const [workSamples, setWorkSamples] = useState([]);
  
  // Portfolio states
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [portfolioSubject, setPortfolioSubject] = useState('— Select subject —');
  const [isPortfolioSubjectOpen, setIsPortfolioSubjectOpen] = useState(false);
  const [portfolioDate, setPortfolioDate] = useState('09/11/2026');
  const [portfolioNotes, setPortfolioNotes] = useState('');
  const [portfolioImageUrl, setPortfolioImageUrl] = useState('');
  const [portfolioEntries, setPortfolioEntries] = useState([]);

  const handleSavePortfolio = (e) => {
    e.preventDefault();
    if (!portfolioTitle.trim()) return;
    setPortfolioEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: portfolioTitle,
        subject: portfolioSubject === '— Select subject —' ? 'General' : portfolioSubject,
        date: portfolioDate,
        notes: portfolioNotes,
        imageUrl: portfolioImageUrl,
      },
    ]);
    setPortfolioTitle('');
    setPortfolioNotes('');
    setPortfolioImageUrl('');
    setIsAddingPortfolio(false);
  };

  const [selectedSubject, setSelectedSubject] = useState('+ Math');
  const [selectedGrade, setSelectedGrade] = useState('1st Grade');
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [interests, setInterests] = useState('');
  const [strengths, setStrengths] = useState(INITIAL_STRENGTHS);
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);

  const tabs = [
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'profile', label: 'Profile' },
    { id: 'report', label: 'Report' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  const currentTabLabel = tabs.find((t) => t.id === activeTab)?.label || 'Portfolio';

  const toggleStrength = (id) => {
    setStrengths((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const toggleChallenge = (id) => {
    setChallenges((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <div className="mx-auto w-full max-w-[640px] pb-32 pt-4 px-3.5 sm:px-4 transition-all">
      {/* Trial banner */}
      <div className="mb-4 flex items-center justify-between border-b border-[#e9e2d5] pb-2.5">
        <span className="text-[11px] font-semibold text-[#b9613b]">
          Free trial — 14 days left
        </span>
        <button className="rounded-md border border-[#bac7bf] bg-white/70 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#184635] hover:bg-white transition-colors shadow-2xs cursor-pointer">
          Upgrade →
        </button>
      </div>

      {/* Back + Student Name (with Active Sub-Page Name appended) + Grade */}
      <div className="mb-4 flex items-center gap-2.5">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            onBack?.();
          }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] bg-white text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
          aria-label="Go back"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-[#16272b]">
            {student?.name || 'Student Name'} — {currentTabLabel}
          </h1>
          <p className="text-xs font-semibold text-[#54646b] mt-0.5">
            {student?.details?.split(' •')[0] || '10th Grade'} • {currentTabLabel}
          </p>
        </div>
      </div>

      {/* 4-tab bar */}
      <div className="mb-5 flex items-center rounded-full border border-[#e8dfd3] bg-[#fbf8f2] p-1 shadow-2xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              setActiveTab(tab.id);
            }}
            className={`flex-1 rounded-full py-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#147948] to-[#126a3f] text-white shadow-xs'
                : 'text-[#23353b] hover:text-[#16272b]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================================================================
          SUB-PAGE TAB COMPONENTS
          ================================================================ */}
      {activeTab === 'curriculum' && (
        <StudentCurriculumTab
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          SUBJECTS={SUBJECTS}
        />
      )}

      {activeTab === 'profile' && (
        <StudentProfileTab
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          isGradeDropdownOpen={isGradeDropdownOpen}
          setIsGradeDropdownOpen={setIsGradeDropdownOpen}
          GRADE_OPTIONS={GRADE_OPTIONS}
          interests={interests}
          setInterests={setInterests}
          strengths={strengths}
          toggleStrength={toggleStrength}
          challenges={challenges}
          toggleChallenge={toggleChallenge}
          onSaveAndGoToCurriculum={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            setActiveTab('curriculum');
          }}
        />
      )}

      {activeTab === 'report' && (
        <StudentReportTab
          reportSubTab={reportSubTab}
          setReportSubTab={setReportSubTab}
          schoolYear={schoolYear}
          setSchoolYear={setSchoolYear}
          isSchoolYearOpen={isSchoolYearOpen}
          setIsSchoolYearOpen={setIsSchoolYearOpen}
          mathGrade={mathGrade}
          setMathGrade={setMathGrade}
          isMathGradeOpen={isMathGradeOpen}
          setIsMathGradeOpen={setIsMathGradeOpen}
          GRADE_OPTIONS={GRADE_OPTIONS}
          mathCredits={mathCredits}
          setMathCredits={setMathCredits}
          workSamples={workSamples}
          setIsWorkSampleModalOpen={setIsWorkSampleModalOpen}
        />
      )}

      {activeTab === 'portfolio' && (
        <StudentPortfolioTab
          isAddingPortfolio={isAddingPortfolio}
          setIsAddingPortfolio={setIsAddingPortfolio}
          portfolioTitle={portfolioTitle}
          setPortfolioTitle={setPortfolioTitle}
          portfolioSubject={portfolioSubject}
          setPortfolioSubject={setPortfolioSubject}
          isPortfolioSubjectOpen={isPortfolioSubjectOpen}
          setIsPortfolioSubjectOpen={setIsPortfolioSubjectOpen}
          PORTFOLIO_SUBJECTS={PORTFOLIO_SUBJECTS}
          portfolioDate={portfolioDate}
          setPortfolioDate={setPortfolioDate}
          portfolioNotes={portfolioNotes}
          setPortfolioNotes={setPortfolioNotes}
          portfolioImageUrl={portfolioImageUrl}
          setPortfolioImageUrl={setPortfolioImageUrl}
          portfolioEntries={portfolioEntries}
          handleSavePortfolio={handleSavePortfolio}
        />
      )}

      {/* ================================================================
          ADD WORK SAMPLE MODAL
          ================================================================ */}
      {isWorkSampleModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setIsWorkSampleModalOpen(false)}
        >
          <div 
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-[#16272b]">Add Work Sample</h3>
              <button 
                onClick={() => setIsWorkSampleModalOpen(false)}
                className="text-[#607077] hover:text-[#16272b] cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const title = formData.get('title') || 'Sample Project';
              const subject = formData.get('subject') || 'Math';
              setWorkSamples((prev) => [
                ...prev,
                { title, subject, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
              ]);
              setIsWorkSampleModalOpen(false);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#16272b] mb-1">Title</label>
                <input 
                  name="title"
                  placeholder="e.g. Chapter 3 Review, Watercolor Painting"
                  required
                  className="w-full rounded-xl border border-[#d5dcd8] px-3.5 py-2.5 text-sm focus:border-[#147948] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#16272b] mb-1">Subject</label>
                <select 
                  name="subject"
                  className="w-full rounded-xl border border-[#d5dcd8] px-3.5 py-2.5 text-sm focus:border-[#147948] focus:outline-none bg-white"
                >
                  <option>Math</option>
                  <option>Language Arts</option>
                  <option>Science</option>
                  <option>History</option>
                  <option>Art & Music</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWorkSampleModalOpen(false)}
                  className="rounded-xl border border-[#d5cbbe] px-4 py-2 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#147948] px-4 py-2 text-xs font-bold text-white hover:bg-[#126a3f] cursor-pointer shadow-xs"
                >
                  Save Sample
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
