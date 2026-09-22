import React from 'react';

/**
 * Reusable Footer / Bottom Navigation component matching Tabula's design.
 * Located in src/components/website/Footer.jsx
 * 
 * Props:
 * - activeNav: string representing currently active nav item ('home', 'students', 'student-detail', 'planner', 'coach', 'resources')
 * - onNavigate: function (navKey) called when user clicks on a nav item
 * - className: additional wrapper classes
 */
export default function Footer({
  activeNav = 'home',
  onNavigate,
  className = '',
}) {
  const isStudentsActive = activeNav === 'students' || activeNav === 'student-detail';

  const handleClick = (navKey) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    onNavigate?.(navKey);
  };

  return (
    <nav className={`w-full border-t border-[#e8ded0] bg-[#faf7f0] py-2.5 sm:py-3 mt-auto transition-all ${className}`}>
      <div className="flex w-full items-center justify-between px-6 sm:px-10 transition-all">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => handleClick('home')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeNav === 'home' ? 'text-[#356F58] font-bold' : 'text-[#203136] hover:text-[#356F58]'
            }`}
        >
          <div className="flex h-6 w-6 items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 10.5V20C4 20.55 4.45 21 5 21H19C19.55 21 20 20.55 20 20V10.5" stroke="#16272B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="#FFFFFF" />
              <path d="M2.5 11.5L12 3.5L21.5 11.5" stroke="#16272B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="#D84A38" />
              <rect x="9" y="13" width="6" height="8" rx="1" fill="#00B2CA" stroke="#16272B" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="text-[11px] font-medium leading-none">Home</span>
          {activeNav === 'home' && (
            <span className="h-[3px] w-5 rounded-full bg-[#356F58] mt-0.5" />
          )}
        </button>

        {/* 2. Students */}
        <button
          type="button"
          onClick={() => handleClick('students')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${isStudentsActive ? 'text-[#356F58]' : 'text-[#203136] hover:text-[#356F58]'
            }`}
        >
          <div className="flex h-6 w-6 items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="7.5" r="4.2" fill="#526068" />
              <path d="M8.5 6.5C9.5 4.5 14.5 4.5 15.5 6.5C14.5 7.2 9.5 7.2 8.5 6.5Z" fill="#3D4A50" />
              <path d="M5.5 19.5C5.5 16 8.5 14.5 12 14.5C15.5 14.5 18.5 16 18.5 19.5" fill="#526068" />
            </svg>
          </div>
          <span className={`text-[11px] leading-none ${isStudentsActive ? 'font-bold' : 'font-medium'}`}>Students</span>
          {isStudentsActive && (
            <span className="h-[3px] w-5 rounded-full bg-[#356F58] mt-0.5" />
          )}
        </button>

        {/* 3. Planner */}
        <button
          type="button"
          onClick={() => handleClick('planner')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeNav === 'planner' ? 'text-[#356F58]' : 'text-[#203136] hover:text-[#356F58]'
            }`}
        >
          <div className="flex h-6 w-6 items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="4.5" width="17" height="16" rx="2" fill="#FFFFFF" stroke="#37474F" strokeWidth="1.6" />
              <path d="M3.5 6.5C3.5 5.4 4.4 4.5 5.5 4.5H18.5C19.6 4.5 20.5 5.4 20.5 6.5V9.5H3.5V6.5Z" fill="#E53935" />
              <line x1="7.5" y1="3" x2="7.5" y2="6" stroke="#37474F" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="16.5" y1="3" x2="16.5" y2="6" stroke="#37474F" strokeWidth="1.6" strokeLinecap="round" />
              <rect x="6.5" y="12" width="2.5" height="2.5" rx="0.5" fill="#526068" />
              <rect x="10.8" y="12" width="2.5" height="2.5" rx="0.5" fill="#526068" />
              <rect x="15" y="12" width="2.5" height="2.5" rx="0.5" fill="#526068" />
              <rect x="6.5" y="16" width="2.5" height="2.5" rx="0.5" fill="#526068" />
              <rect x="10.8" y="16" width="2.5" height="2.5" rx="0.5" fill="#526068" />
              <rect x="15" y="16" width="2.5" height="2.5" rx="0.5" fill="#526068" />
            </svg>
          </div>
          <span className={`text-[11px] leading-none ${activeNav === 'planner' ? 'font-bold' : 'font-medium'}`}>Planner</span>
          {activeNav === 'planner' && (
            <span className="h-[3px] w-5 rounded-full bg-[#356F58] mt-0.5" />
          )}
        </button>

        {/* 4. Coach */}
        <button
          type="button"
          onClick={() => handleClick('coach')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeNav === 'coach' ? 'text-[#356F58]' : 'text-[#203136] hover:text-[#356F58]'
            }`}
        >
          <div className="flex h-6 w-6 items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M11 2.5L13.2 8.3C13.5 9 14 9.5 14.7 9.8L20.5 12L14.7 14.2C14 14.5 13.5 15 13.2 15.7L11 21.5L8.8 15.7C8.5 15 8 14.5 7.3 14.2L1.5 12L7.3 9.8C8 9.5 8.5 9 8.8 8.3L11 2.5Z" fill="#F5A623" stroke="#222B2E" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M19 2.5L19.8 4.7C20 5.2 20.3 5.5 20.8 5.7L23 6.5L20.8 7.3C20.3 7.5 20 7.8 19.8 8.3L19 10.5L18.2 8.3C18 7.8 17.7 7.5 17.2 7.3L15 6.5L17.2 5.7C17.7 5.5 18 5.2 18.2 4.7L19 2.5Z" fill="#00BCD4" stroke="#222B2E" strokeWidth="1" strokeLinejoin="round" />
              <circle cx="5" cy="18" r="1.2" fill="#BA68C8" />
            </svg>
          </div>
          <span className={`text-[11px] leading-none ${activeNav === 'coach' ? 'font-bold' : 'font-medium'}`}>Coach</span>
          {activeNav === 'coach' && (
            <span className="h-[3px] w-5 rounded-full bg-[#356F58] mt-0.5" />
          )}
        </button>

        {/* 5. Resources */}
        <button
          type="button"
          onClick={() => handleClick('resources')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${activeNav === 'resources' ? 'text-[#356F58]' : 'text-[#203136] hover:text-[#356F58]'
            }`}
        >
          <div className="flex h-6 w-6 items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9.5 14.5L14.5 9.5" stroke="#37474F" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M13 6.5L15.8 3.7C17.4 2.1 20 2.1 21.6 3.7C23.2 5.3 23.2 7.9 21.6 9.5L18.8 12.3" stroke="#37474F" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M11 17.5L8.2 20.3C6.6 21.9 4 21.9 2.4 20.3C0.8 18.7 0.8 16.1 2.4 14.5L5.2 11.7" stroke="#37474F" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className={`text-[11px] leading-none ${activeNav === 'resources' ? 'font-bold' : 'font-medium'}`}>Resources</span>
          {activeNav === 'resources' && (
            <span className="h-[3px] w-5 rounded-full bg-[#356F58] mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
}
