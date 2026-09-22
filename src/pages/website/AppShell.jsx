import React, { useState, useEffect } from 'react';
import DashboardHome from './DashboardHome';
import StudentsView from './StudentsView';
import StudentDetailView from './StudentDetailView';
import PlannerView from './PlannerView';
import PlannerScheduleView from './PlannerScheduleView';
import PlannerLessonDetailView from './PlannerLessonDetailView';
import PlannerWeekCompleteView from './PlannerWeekCompleteView';
import PlannerWeek2CopyView from './PlannerWeek2CopyView';
import PlannerFamilyUnitsView from './PlannerFamilyUnitsView';
import AddCurriculumModal from './AddCurriculumModal';
import CoachView from './CoachView';
import PrivacySettingsView from './PrivacySettingsView';
import AccountMembershipView from './AccountMembershipView';
import ResourceLibraryView from './ResourceLibraryView';
import Header from '../../components/website/Header';
import Footer from '../../components/website/Footer';

export const NAV_PATHS = {
  home: '/dashboard',
  students: '/students',
  'student-detail': '/student-detail',
  planner: '/planner',
  'planner-complete': '/planner-complete',
  'planner-week2': '/planner-week2',
  'planner-family': '/planner-family',
  'planner-schedule': '/planner-schedule',
  'planner-blank': '/planner-blank',
  'lesson-detail': '/lesson-detail',
  coach: '/coach',
  resources: '/resources',
  account: '/account',
  privacy: '/privacy',
};

export default function AppShell({ 
  activeRoute = 'home',
  currentPath = '/dashboard',
  onNavigate,
  onBack,
  onNavigateToLanding 
}) {
  const [activeNav, setActiveNav] = useState(activeRoute || 'home');
  const [previousNav, setPreviousNav] = useState('home');

  useEffect(() => {
    if (activeRoute && activeRoute !== activeNav) {
      setActiveNav(activeRoute);
    }
  }, [activeRoute]);

  const handleNavigate = (navKey) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (activeNav !== navKey) {
      setPreviousNav(activeNav);
    }
    setActiveNav(navKey);
    const targetPath = NAV_PATHS[navKey] || `/${navKey}`;
    if (onNavigate) {
      onNavigate(targetPath);
    }
  };

  const handleBack = (fallbackNav = 'home') => {
    const fallbackPath = NAV_PATHS[fallbackNav] || '/dashboard';
    if (onBack) {
      onBack(fallbackPath);
    } else {
      handleNavigate(fallbackNav);
    }
  };

  const handleUpgradeClick = () => {
    if (onNavigate) {
      onNavigate('/payment');
    }
  };

  // Scroll to top immediately whenever activeNav changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeNav]);

  const [selectedStudent, setSelectedStudent] = useState({
    id: 1,
    initials: 'ET',
    name: 'Emma Thomas',
    details: 'Grade 3 • Born May 12, 2015',
    desc: 'Loves stories, nature, and art',
  });
  const [studentInitialTab, setStudentInitialTab] = useState('curriculum');
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  // Container width: max-w-[640px] for all views matching Dashboard page styling
  const containerMaxWidth = 'max-w-[640px]';

  return (
    <div className="min-h-screen w-full bg-[#f3ede4] text-[#1e282d] antialiased py-0 sm:py-6 md:py-8 flex justify-center px-0 sm:px-4">
      {/* ── Single Unified Page Container with Border, Shadow & Rounded Corners ── */}
      <div className={`w-full ${containerMaxWidth} bg-[#faf7f0] border-x sm:border border-[#ded5c7] sm:rounded-2xl shadow-sm flex flex-col min-h-[92vh] overflow-hidden transition-all`}>

        {/* ================================================================
            TOP REUSABLE HEADER COMPONENT (Inside Page Container)
            ================================================================ */}
        {activeNav !== 'lesson-detail' && activeNav !== 'account' && (
          <Header
            onLogoClick={() => {
              if (activeNav === 'home') {
                onNavigateToLanding?.();
              } else {
                handleNavigate('home');
              }
            }}
            onAccountClick={() => handleNavigate('account')}
            onPrivacyClick={() => handleNavigate('privacy')}
          />
        )}

        {/* ================================================================
            MAIN VIEW CONTAINER
            ================================================================ */}
        <main className="flex-1 flex flex-col">
          {activeNav === 'home' && (
            <DashboardHome
              onOpenAddCurriculum={() => setIsCurriculumModalOpen(true)}
              onNavigateToStudents={() => handleNavigate('students')}
              onNavigateToCoach={() => handleNavigate('coach')}
              onNavigateToPlanner={() => handleNavigate('planner')}
            />
          )}

          {activeNav === 'students' && (
            <StudentsView
              onBackToHome={() => handleBack('home')}
              onUpgradeClick={handleUpgradeClick}
              onSelectStudent={(student, initialTab = 'curriculum') => {
                setSelectedStudent(student);
                setStudentInitialTab(initialTab);
                handleNavigate('student-detail');
              }}
            />
          )}

          {activeNav === 'student-detail' && (
            <StudentDetailView
              student={selectedStudent}
              initialTab={studentInitialTab}
              onBack={() => handleBack('students')}
              onUpgradeClick={handleUpgradeClick}
            />
          )}

          {activeNav === 'planner' && (
            <PlannerView
              onBackToHome={() => handleBack('home')}
              onUpgradeClick={handleUpgradeClick}
              onOpenLessonDetail={() => handleNavigate('lesson-detail')}
              onToggleFamilyUnits={() => handleNavigate('planner-family')}
              onViewCompleteWeek={() => handleNavigate('planner-complete')}
              onNextWeek={() => handleNavigate('planner-week2')}
            />
          )}

          {activeNav === 'planner-complete' && (
            <PlannerWeekCompleteView
              onBackToHome={() => handleBack('planner')}
              onUpgradeClick={handleUpgradeClick}
              onPrevWeek={() => handleNavigate('planner')}
              onNextWeek={() => handleNavigate('planner-week2')}
              onOpenLessonDetail={() => handleNavigate('lesson-detail')}
              onToggleFamilyUnits={() => handleNavigate('planner-family')}
            />
          )}

          {(activeNav === 'planner-week2' || activeNav === 'week-2') && (
            <PlannerWeek2CopyView
              onBackToHome={() => handleBack('planner')}
              onUpgradeClick={handleUpgradeClick}
              onToggleFamilyUnits={() => handleNavigate('planner-family')}
              onCopySchedule={() => handleNavigate('planner-schedule')}
              onStartFresh={() => handleNavigate('planner')}
              onPrevWeek={() => handleNavigate('planner-complete')}
            />
          )}

          {(activeNav === 'planner-family' || activeNav === 'family-units') && (
            <PlannerFamilyUnitsView
              onBackToHome={() => handleBack('planner')}
              onUpgradeClick={handleUpgradeClick}
              onToggleIndividual={() => handleNavigate('planner')}
              onEditStudentPlan={(studentId) => {
                setSelectedStudent({
                  id: studentId,
                  name: studentId === 2 ? 'Student 2' : 'Student',
                  details: studentId === 2 ? '11th Grade' : '10th Grade'
                });
                setStudentInitialTab('curriculum');
                handleNavigate('student-detail');
              }}
              onNavigateToCoach={() => handleNavigate('coach')}
            />
          )}

          {activeNav === 'planner-schedule' && (
            <PlannerScheduleView
              onBackToHome={() => handleBack('planner')}
              onUpgradeClick={handleUpgradeClick}
              onOpenLessonDetail={() => handleNavigate('lesson-detail')}
              onToggleFamilyUnits={() => handleNavigate('planner-family')}
            />
          )}

          {activeNav === 'planner-blank' && (
            <PlannerView
              onBackToHome={() => handleBack('planner')}
              onUpgradeClick={handleUpgradeClick}
              onToggleFamilyUnits={() => handleNavigate('planner-family')}
            />
          )}

          {activeNav === 'lesson-detail' && (
            <PlannerLessonDetailView
              onCancel={() => handleBack('planner')}
              onAddCurriculum={(data) => {
                handleNavigate('planner');
              }}
            />
          )}

          {activeNav === 'account' && (
            <AccountMembershipView
              onBackToHome={() => handleBack(previousNav || 'home')}
              onUpgradeClick={handleUpgradeClick}
            />
          )}

          {activeNav === 'privacy' && (
            <PrivacySettingsView
              onBackToHome={() => handleBack(previousNav || 'home')}
            />
          )}

          {activeNav === 'coach' && (
            <CoachView
              onBackToHome={() => handleBack('home')}
              onUpgradeClick={handleUpgradeClick}
            />
          )}

          {activeNav === 'resources' && (
            <ResourceLibraryView
              onBackToHome={() => handleBack('home')}
              onUpgradeClick={handleUpgradeClick}
            />
          )}
        </main>

        {/* ================================================================
          BOTTOM REUSABLE FOOTER / NAVIGATION COMPONENT (Inside Page Container)
          ================================================================ */}
        {activeNav !== 'lesson-detail' && (
          <Footer
            activeNav={activeNav}
            onNavigate={(navKey) => handleNavigate(navKey)}
          />
        )}
      </div>

      {/* ================================================================
          MODALS
          ================================================================ */}
      {/* Add Math Curriculum Modal (Image 4) */}
      <AddCurriculumModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        onAddCurriculum={(curriculum) => {
          alert(`Added curriculum: ${curriculum.title}`);
        }}
      />


      {/* Account Info Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setIsAccountModalOpen(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-lg font-bold text-[#172b30]">Account Settings</h3>
            <p className="mt-2 text-xs text-[#526068]">Free trial active: 14 days remaining.</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="rounded-lg bg-[#356F58] px-4 py-2 text-xs font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Info Modal */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setIsPrivacyModalOpen(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-lg font-bold text-[#172b30]">Privacy & Control</h3>
            <p className="mt-2 text-xs text-[#526068]">Your family's data is private. We never share or sell student information.</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="rounded-lg bg-[#356F58] px-4 py-2 text-xs font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
