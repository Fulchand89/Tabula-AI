import React, { useState } from 'react';
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

export default function AppShell({ onNavigateToLanding }) {
  const [activeNav, setActiveNav] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'home' || params.get('tab') === 'dashboard') return 'home';
      if (params.get('tab') === 'account') return 'account';
      if (params.get('tab') === 'privacy') return 'privacy';
      if (params.get('tab') === 'coach') return 'coach';
      if (params.get('tab') === 'planner') return 'planner';
      if (params.get('tab') === 'week-2') return 'planner-week2';
      if (params.get('tab') === 'family-units') return 'planner-family';
      if (params.get('tab')) return params.get('tab');
    }
    return 'home'; // Default to Home/Dashboard page
  });
  const [selectedStudent, setSelectedStudent] = useState({
    id: 1,
    name: 'Student Name',
    details: '10th Grade',
  });
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
            onLogoClick={() => setActiveNav('home')}
            onAccountClick={() => setActiveNav('account')}
            onPrivacyClick={() => setActiveNav('privacy')}
          />
        )}

        {/* ================================================================
            MAIN VIEW CONTAINER
            ================================================================ */}
        <main className="flex-1 flex flex-col">
        {activeNav === 'home' && (
          <DashboardHome 
            onOpenAddCurriculum={() => setIsCurriculumModalOpen(true)}
            onNavigateToStudents={() => setActiveNav('students')}
            onNavigateToCoach={() => setActiveNav('coach')}
            onNavigateToPlanner={() => setActiveNav('planner')}
          />
        )}

        {activeNav === 'students' && (
          <StudentsView 
            onBackToHome={() => setActiveNav('home')}
            onSelectStudent={(student) => {
              setSelectedStudent(student);
              setActiveNav('student-detail');
            }}
          />
        )}

        {activeNav === 'student-detail' && (
          <StudentDetailView
            student={selectedStudent}
            onBack={() => setActiveNav('students')}
          />
        )}

        {activeNav === 'planner' && (
          <PlannerView 
            onBackToHome={() => setActiveNav('home')}
            onUpgradeClick={() => setActiveNav('account')}
            onOpenLessonDetail={() => setActiveNav('lesson-detail')}
            onToggleFamilyUnits={() => setActiveNav('planner-family')}
            onViewCompleteWeek={() => setActiveNav('planner-complete')}
            onNextWeek={() => setActiveNav('planner-week2')}
          />
        )}

        {activeNav === 'planner-complete' && (
          <PlannerWeekCompleteView 
            onBackToHome={() => setActiveNav('home')}
            onUpgradeClick={() => setActiveNav('account')}
            onPrevWeek={() => setActiveNav('planner')}
            onNextWeek={() => setActiveNav('planner-week2')}
            onOpenLessonDetail={() => setActiveNav('lesson-detail')}
            onToggleFamilyUnits={() => setActiveNav('planner-family')}
          />
        )}

        {(activeNav === 'planner-week2' || activeNav === 'week-2') && (
          <PlannerWeek2CopyView 
            onBackToHome={() => setActiveNav('home')}
            onUpgradeClick={() => setActiveNav('account')}
            onToggleFamilyUnits={() => setActiveNav('planner-family')}
            onCopySchedule={() => setActiveNav('planner-schedule')}
            onStartFresh={() => setActiveNav('planner')}
            onPrevWeek={() => setActiveNav('planner-complete')}
          />
        )}

        {(activeNav === 'planner-family' || activeNav === 'family-units') && (
          <PlannerFamilyUnitsView 
            onBackToHome={() => setActiveNav('home')}
            onUpgradeClick={() => setActiveNav('account')}
            onToggleIndividual={() => setActiveNav('planner')}
            onEditStudentPlan={(studentId) => {
              setSelectedStudent({ 
                id: studentId, 
                name: studentId === 2 ? 'Student 2' : 'Student', 
                details: studentId === 2 ? '11th Grade' : '10th Grade' 
              });
              setActiveNav('student-detail');
            }}
            onNavigateToCoach={() => setActiveNav('coach')}
          />
        )}

        {activeNav === 'planner-schedule' && (
          <PlannerScheduleView 
            onBackToHome={() => setActiveNav('home')}
            onUpgradeClick={() => setActiveNav('account')}
            onOpenLessonDetail={() => setActiveNav('lesson-detail')}
            onToggleFamilyUnits={() => setActiveNav('planner-family')}
          />
        )}

        {activeNav === 'planner-blank' && (
          <PlannerView 
            onBackToHome={() => setActiveNav('home')}
            onUpgradeClick={() => setActiveNav('account')}
            onToggleFamilyUnits={() => setActiveNav('planner-family')}
          />
        )}

        {activeNav === 'lesson-detail' && (
          <PlannerLessonDetailView 
            onCancel={() => setActiveNav('planner')}
            onAddCurriculum={(data) => {
              setActiveNav('planner');
            }}
          />
        )}

        {activeNav === 'account' && (
          <AccountMembershipView 
            onBackToHome={() => setActiveNav('home')}
          />
        )}

        {activeNav === 'privacy' && (
          <PrivacySettingsView 
            onBackToHome={() => setActiveNav('home')}
          />
        )}

        {activeNav === 'coach' && (
          <CoachView 
            onBackToHome={() => setActiveNav('home')}
            onUpgradeClick={() => setActiveNav('account')}
          />
        )}

        {activeNav === 'resources' && (
          <ResourceLibraryView
            onBackToHome={() => setActiveNav('home')}
            onUpgradeClick={() => setActiveNav('account')}
          />
        )}
      </main>

      {/* ================================================================
          BOTTOM REUSABLE FOOTER / NAVIGATION COMPONENT (Inside Page Container)
          ================================================================ */}
      {activeNav !== 'lesson-detail' && (
        <Footer 
          activeNav={activeNav}
          onNavigate={(navKey) => setActiveNav(navKey)}
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
                className="rounded-lg bg-[#1b6b50] px-4 py-2 text-xs font-semibold text-white"
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
                className="rounded-lg bg-[#1b6b50] px-4 py-2 text-xs font-semibold text-white"
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
