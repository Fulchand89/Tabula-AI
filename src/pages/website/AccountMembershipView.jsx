import React, { useState } from 'react';

/**
 * AccountMembershipView component matching Tabula's Account & Membership page.
 * Exact 1:1 match to user's reference image:
 * - Header: Back Circle Button + "Account & Membership" title + "student@gmail.com" subtitle
 * - Card 1: Free Trial banner (Gold crown icon + "Free Trial — 14 days remaining" + Annual $72/yr plan status)
 * - Section 2: YOUR COACH'S NAME (Custom coach name input + Save button)
 * - Section 3: STATE OF RESIDENCE (State dropdown selector)
 * - Section 4: SUBSCRIPTION PLAN (Monthly switchable card & Annual active best value card)
 * - Section 5: ACCOUNT (Name & Email edit rows)
 * - Section 6: TRIAL (Cancel trial action row)
 * - Section 7: Large "Done" green button
 */
export default function AccountMembershipView({ onBackToHome, onUpgradeClick }) {
  const [coachName, setCoachName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('annual'); // 'monthly' | 'annual'
  const [userName, setUserName] = useState('Student');
  const [userEmail, setUserEmail] = useState('student@gmail.com');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleSaveCoachName = (e) => {
    e?.preventDefault();
    showToast(coachName.trim() ? `Coach name set to "${coachName}"` : 'Using default coach name "Coach"');
  };

  const handleCancelTrial = () => {
    if (window.confirm('Are you sure you want to cancel your free trial? You can continue using Tabula until September 24, 2026.')) {
      showToast('Trial cancellation request registered.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-[640px] pb-32 pt-4 px-3.5 sm:px-4 transition-all">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#147948] px-4 py-3 text-xs font-bold text-white shadow-xl animate-fade-in">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================================================================
          1. PAGE HEADER (Circle Back Arrow + Title + User Email)
          ================================================================ */}
      <div className="border-b border-[#e8ded0] pb-3.5 mb-5">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d5cbbe] bg-white text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
            aria-label="Go back"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-[#16272b]">
              Account & Membership
            </h1>
            <p className="text-[11px] font-semibold text-[#526068] mt-0.5">
              {userEmail}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-7">
        {/* ================================================================
            2. FREE TRIAL STATUS CARD
            ================================================================ */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#e8dfd3] bg-white p-5 sm:p-6 shadow-2xs">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              {/* Gold Crown Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fdf5df] text-[#b06904]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                  <path d="M5 20h14" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#5d3119] leading-snug">
                  Free Trial — 14 days remaining
                </h2>
                <p className="mt-1 text-xs sm:text-[13px] text-[#607077]">
                  Trial ends September 24, 2026. You will be charged after your trial ends.
                </p>
              </div>
            </div>
            {onUpgradeClick && (
              <button
                type="button"
                onClick={onUpgradeClick}
                className="rounded-full bg-[#c36a49] px-3.5 py-1 text-xs font-bold text-white shadow-2xs hover:bg-[#b05c3d] transition-colors cursor-pointer shrink-0 mt-0.5"
              >
                Upgrade →
              </button>
            )}
          </div>

          <div className="my-4 border-t border-[#f0eae0]" />

          <p className="text-center text-xs sm:text-[13px] text-[#22333b]">
            Current plan after trial:{' '}
            <span className="font-bold text-[#147948]">Annual — $72/year</span>
          </p>
        </div>

        {/* ================================================================
            3. YOUR COACH'S NAME SECTION
            ================================================================ */}
        <div>
          <h2 className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#24373e] mb-1">
            YOUR COACH'S NAME
          </h2>
          <p className="text-xs text-[#607077] mb-3 leading-relaxed">
            Give your AI coach a name. It'll be used throughout the app and the coach will introduce itself this way. Leave blank to use "Coach."
          </p>

          <form onSubmit={handleSaveCoachName} className="flex items-center gap-3">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#718086]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                type="text"
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
                placeholder="e.g. Coach Maple, Ms. Rivera, Sunny"
                className="w-full rounded-2xl border border-[#d5dcd8] bg-white pl-10 pr-4 py-3 text-xs sm:text-sm text-[#16272b] placeholder-[#8a989f] focus:border-[#147948] focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl sm:rounded-2xl bg-[#14553f] hover:bg-[#0f402f] text-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
            >
              Save
            </button>
          </form>
        </div>

        {/* ================================================================
            4. STATE OF RESIDENCE SECTION
            ================================================================ */}
        <div>
          <h2 className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#24373e] mb-1">
            STATE OF RESIDENCE
          </h2>
          <p className="text-xs text-[#607077] mb-3 leading-relaxed">
            Used by the AI coach to give guidance specific to your state's homeschool laws and requirements.
          </p>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
              className="flex w-full items-center justify-between rounded-2xl border border-[#d5dcd8] bg-white px-4 py-3 text-left text-xs sm:text-sm font-medium text-[#16272b] hover:border-[#b8c2bc] transition-colors cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#718086" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className={selectedState ? 'text-[#16272b] font-semibold' : 'text-[#607077]'}>
                  {selectedState || 'Select your state...'}
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#526068"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${isStateDropdownOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isStateDropdownOpen && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-56 overflow-y-auto rounded-2xl border border-[#d5dcd8] bg-white py-1.5 shadow-xl">
                {states.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => {
                      setSelectedState(state);
                      setIsStateDropdownOpen(false);
                      showToast(`State set to ${state}`);
                    }}
                    className={`flex w-full items-center px-4 py-2 text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                      selectedState === state
                        ? 'bg-[#edf5f0] text-[#1b6b50] font-bold'
                        : 'text-[#1e282d] hover:bg-[#faf5eb]'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================================================================
            5. SUBSCRIPTION PLAN SECTION
            ================================================================ */}
        <div>
          <h2 className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#24373e] mb-3">
            SUBSCRIPTION PLAN
          </h2>

          <div className="space-y-3">
            {/* Monthly Card */}
            <div 
              onClick={() => setSelectedPlan('monthly')}
              className={`rounded-2xl border p-4 flex items-center justify-between shadow-2xs transition-all cursor-pointer ${
                selectedPlan === 'monthly'
                  ? 'border-2 border-[#147948] bg-[#f2f8f5]'
                  : 'border-[#e8dfd3] bg-white hover:border-[#b8c2bc]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#b8c2bc] bg-white">
                  {selectedPlan === 'monthly' && <div className="h-2.5 w-2.5 rounded-full bg-[#147948]" />}
                </div>
                <div>
                  <h3 className="text-xs sm:text-[14px] font-bold text-[#16272b]">Monthly</h3>
                  <p className="text-[11px] sm:text-xs text-[#607077]">
                    $8/month · Billed each month
                  </p>
                </div>
              </div>
              {selectedPlan !== 'monthly' && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan('monthly');
                    showToast('Switched to Monthly plan ($8/mo)');
                  }}
                  className="rounded-xl border border-[#d5cbbe] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs"
                >
                  Switch →
                </button>
              )}
            </div>

            {/* Annual Card (Best Value / Current) */}
            <div 
              onClick={() => setSelectedPlan('annual')}
              className={`rounded-2xl border-2 p-4 flex items-center justify-between shadow-2xs transition-all cursor-pointer ${
                selectedPlan === 'annual'
                  ? 'border-[#147948] bg-[#f2f8f5]'
                  : 'border-[#e8dfd3] bg-white hover:border-[#b8c2bc]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#147948] bg-white">
                  {selectedPlan === 'annual' && <div className="h-2.5 w-2.5 rounded-full bg-[#147948]" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xs sm:text-[14px] font-bold text-[#16272b]">Annual</h3>
                    <span className="rounded bg-[#eedec5] px-1.5 py-0.5 text-[9.5px] font-extrabold text-[#784918]">
                      BEST VALUE
                    </span>
                    <span className="rounded bg-[#d5e8dc] px-1.5 py-0.5 text-[9.5px] font-extrabold text-[#146b45]">
                      CURRENT
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] sm:text-xs text-[#526068]">
                    $72/year · $6/mo · Save $24 per year
                  </p>
                </div>
              </div>
              {selectedPlan !== 'annual' && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan('annual');
                    showToast('Switched to Annual plan ($72/yr)');
                  }}
                  className="rounded-xl border border-[#d5cbbe] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs"
                >
                  Switch →
                </button>
              )}
            </div>
          </div>

          <p className="mt-2.5 text-center text-xs text-[#718086]">
            Plan changes take effect at your next billing date. Switching to annual saves you $24/year.
          </p>
        </div>

        {/* ================================================================
            6. ACCOUNT SECTION
            ================================================================ */}
        <div>
          <h2 className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#24373e] mb-3">
            ACCOUNT
          </h2>

          <div className="rounded-2xl border border-[#e8dfd3] bg-white divide-y divide-[#f0eae0] shadow-2xs">
            {/* Name Row */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5 flex-1">
                <div className="text-[#718086]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#718086]">Name</p>
                  {isEditingName ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="rounded-lg border border-[#d5dcd8] px-2.5 py-1 text-xs sm:text-sm font-semibold text-[#16272b] focus:border-[#147948] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingName(false);
                          showToast('Name updated');
                        }}
                        className="rounded-lg bg-[#147948] px-2.5 py-1 text-xs font-bold text-white"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-[14px] font-bold text-[#16272b]">{userName}</p>
                  )}
                </div>
              </div>
              {!isEditingName && (
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="rounded-xl border border-[#d5cbbe] bg-white px-3 py-1.5 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>Edit</span>
                </button>
              )}
            </div>

            {/* Email Row */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5 flex-1">
                <div className="text-[#718086]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#718086]">Email</p>
                  {isEditingEmail ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="rounded-lg border border-[#d5dcd8] px-2.5 py-1 text-xs sm:text-sm font-semibold text-[#16272b] focus:border-[#147948] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingEmail(false);
                          showToast('Email updated');
                        }}
                        className="rounded-lg bg-[#147948] px-2.5 py-1 text-xs font-bold text-white"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-[14px] font-bold text-[#16272b]">{userEmail}</p>
                  )}
                </div>
              </div>
              {!isEditingEmail && (
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(true)}
                  className="rounded-xl border border-[#d5cbbe] bg-white px-3 py-1.5 text-xs font-semibold text-[#1e282d] hover:bg-[#faf5eb] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================
            7. TRIAL SECTION
            ================================================================ */}
        <div>
          <h2 className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#24373e] mb-3">
            TRIAL
          </h2>

          <div className="rounded-2xl border border-[#e8dfd3] bg-white p-4 flex items-center gap-3.5 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#faece3] text-[#bf643e]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>
            <div>
              <button
                type="button"
                onClick={handleCancelTrial}
                className="text-xs sm:text-[13.5px] font-bold text-[#bf643e] hover:underline cursor-pointer"
              >
                Cancel trial →
              </button>
              <p className="text-[11px] sm:text-xs text-[#607077] mt-0.5">
                You can cancel any time before September 24, 2026 without being charged.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================
            8. DONE BUTTON
            ================================================================ */}
        <button
          type="button"
          onClick={onBackToHome}
          className="flex w-full items-center justify-center rounded-2xl bg-[#147948] hover:bg-[#11623a] active:scale-[0.99] py-4 px-6 text-sm sm:text-base font-bold text-white shadow-md transition-all cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}
