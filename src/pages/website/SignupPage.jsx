import React, { useState } from 'react';

export default function SignupPage({ onProceedToCheckout, onBackToLanding }) {
  const [activeTab, setActiveTab] = useState('create');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Name validation (Sirf 'create' tab ke liye)
    if (activeTab === 'create') {
      const trimmedName = name.trim();
      if (!trimmedName) {
        setErrorMessage('.....');
        return;
      }
      if (trimmedName.length > 30) {
        setErrorMessage('.....');
        return;
      }
    }

    // 2. Strict Gmail validation (sirf @gmail.com allow karega, gmil.com reject hoga)
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!gmailRegex.test(email.trim())) {
      setErrorMessage(' ( name@gmail.com).');
      return;
    }

    // 3. Password length validation (6 se 30 characters)
    if (password.length < 6) {
      setErrorMessage('Password .');
      return;
    }
    if (password.length > 30) {
      setErrorMessage('Password.');
      return;
    }

    // Success hone par next step
    if (onProceedToCheckout) {
      onProceedToCheckout(name.trim() || 'shiva');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f3ede4] text-[#1e282d] antialiased py-0 sm:py-6 md:py-8 flex justify-center">
      {/* ── Page Container matching Landing Page width (max-w-[640px]), border & styling ── */}
      <div className="w-full max-w-[640px] bg-[#faf7f0] border-x sm:border border-[#ded5c7] shadow-sm px-4 sm:px-8 py-6 sm:py-10">

        {/* ── HEADER SECTION ── */}
        <header className="mb-6 text-center">
          <div className="relative mb-1.5 flex items-center justify-center">
            {onBackToLanding && (
              <button
                type="button"
                onClick={onBackToLanding}
                className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#d5cbbe] bg-white text-[#1e282d] hover:bg-[#faf5eb] transition-colors shadow-2xs cursor-pointer"
                aria-label="Go back"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
            )}
            <div className="inline-flex items-baseline cursor-pointer" onClick={onBackToLanding}>
              <span className="font-['Lora'] font-semibold text-[42px] leading-[100%] tracking-normal text-[#212C3E]">
                Tabula
              </span>
              <span className="font-['Lora'] font-semibold text-[48px] leading-[100%] tracking-normal text-[#356F58]">
                .
              </span>
            </div>
          </div>

          <h1 className="font-serif text-[23px] font-semibold text-[#BD7451] mt-1">
            Your AI homeschool planning coach
          </h1>

          {/* 3 Dark Green Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 w-full">
            <div className="flex items-center gap-1.5 rounded-lg bg-[#136041] px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-[12px] font-medium text-white shadow-xs">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span>You choose the curriculum</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg bg-[#136041] px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-[12px] font-medium text-white shadow-xs">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span>AI helps you implement it</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg bg-[#136041] px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-[12px] font-medium text-white shadow-xs">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span>Track what matters</span>
            </div>
          </div>
        </header>

        {/* ── 14-day free trial card ── */}
        <div className="w-full mb-6 flex items-center gap-3.5 rounded-2xl border border-[#e8dfd3] bg-white px-4 sm:px-5 py-3 sm:py-3.5 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#faeedd]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b2613d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" rx="1" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-[14.5px] font-bold text-[#BD7451] leading-snug">
              14-day free trial
            </h2>
            <p className="text-[12px] font-bold text-[#4E7A5B] mt-0.5">
              Full access - $8/month after trial
            </p>
          </div>
        </div>

        {/* ── Auth Form Card ── */}
        <div className="w-full max-w-[430px] mx-auto mb-4 overflow-hidden rounded-2xl border border-[#ded7ca] bg-white shadow-xs">
          {/* Top Tabs */}
          <div className="flex border-b border-[#ded7ca] bg-white">
            <button
              type="button"
              onClick={() => { setActiveTab('create'); setErrorMessage(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs sm:text-[13.5px] font-semibold transition-all cursor-pointer ${activeTab === 'create'
                ? 'bg-[#356F58] text-white rounded-tl-xl rounded-br-2xl shadow-xs'
                : 'bg-white text-[#304149] hover:bg-gray-50'
                }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Create Account</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('signin'); setErrorMessage(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs sm:text-[13.5px] font-semibold transition-all cursor-pointer ${activeTab === 'signin'
                ? 'bg-[#356F58] text-white rounded-tr-xl rounded-bl-2xl shadow-xs'
                : 'bg-white text-[#304149] hover:bg-gray-50'
                }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Sign In</span>
            </button>
          </div>

          <form className="p-5 sm:p-6 space-y-3.5" onSubmit={handleSubmit} noValidate>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 text-center font-medium">
                {errorMessage}
              </div>
            )}

            {/* YOUR NAME (Max 30) */}
            {activeTab === 'create' && (
              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold tracking-wider text-[#1e282d] uppercase mb-1">
                  YOUR NAME
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#78888e]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    maxLength={30}
                    className="w-full rounded-xl border border-[#cbd3d6] bg-white py-2.5 pr-3 pl-9 text-xs sm:text-sm text-[#1c2930] placeholder-[#78888e] focus:border-[#356F58] focus:outline-none transition-colors"
                    placeholder="First name or family name (max 30 chars)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* EMAIL ADDRESS (Strict Gmail only) */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold tracking-wider text-[#1e282d] uppercase mb-1">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#78888e]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="w-full rounded-xl border border-[#cbd3d6] bg-white py-2.5 pr-3 pl-9 text-xs sm:text-sm text-[#1c2930] placeholder-[#78888e] focus:border-[#356F58] focus:outline-none transition-colors"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD (Min 6, Max 30) */}
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold tracking-wider text-[#1e282d] uppercase mb-1">
                PASSWORD
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#78888e]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  maxLength={30}
                  className="w-full rounded-xl border border-[#cbd3d6] bg-white py-2.5 pr-9 pl-9 text-xs sm:text-sm text-[#1c2930] placeholder-[#78888e] focus:border-[#356F58] focus:outline-none transition-colors"
                  placeholder="6 to 30 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-[#78888e] hover:text-black cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(92.26deg,#126041_30.56%,#159446_98.6%)] py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#126041] transition-all cursor-pointer"
              >
                <span>{activeTab === 'create' ? 'Start Your Free Trial' : 'Sign In to Tabula'}</span>
                <span>→</span>
              </button>
            </div>
          </form>
        </div>

        {/* Disclaimer Text */}
        <div className="w-full max-w-[600px] mx-auto mt-6 mb-6 px-2 text-center text-[10px] text-[#66584c] leading-[1.6]">
          <p>
            By creating an account you agree to our{' '}
            <a href="#terms" className="underline text-[#b86b46]">
              terms of service
            </a>
            . Your 14-day free trial begins today.
          </p>

          <p className="mt-0.5">
            No payment required until your trial ends.
          </p>
        </div>



        {/* ── 3 Value Props Card ── */}
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#f0eae0] rounded-2xl border border-[#e9e2d5] bg-white p-4 sm:p-5 text-center shadow-2xs gap-4 sm:gap-0">
          <div className="flex flex-col items-center px-2 py-1 sm:py-0">
            <div className="mb-2 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#356F58] text-white shadow-2xs">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="flex sm:h-9 items-center justify-center text-center text-xs sm:text-sm font-bold text-[#212C3E] leading-tight">
              No credit card today
            </h3>
            <p className="mt-1 flex-1 text-center text-[10.5px] sm:text-[11px] leading-snug text-[#65706B]">
              Start free, pay only after 14 days if you love it.
            </p>
          </div>

          <div className="flex flex-col items-center px-2 pt-3 sm:pt-0 pb-1 sm:pb-0">
            <div className="mb-2 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#356F58] text-white shadow-2xs">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="flex sm:h-9 items-center justify-center text-center text-xs sm:text-sm font-bold text-[#212C3E] leading-tight">
              Cancel anytime
            </h3>
            <p className="mt-1 flex-1 text-center text-[10.5px] sm:text-[11px] leading-snug text-[#65706B]">
              Full access during trial, cancel anytime with no fees.
            </p>
          </div>

          <div className="flex flex-col items-center px-2 pt-3 sm:pt-0">
            <div className="mb-2 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#356F58] text-white shadow-2xs">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="flex sm:h-9 items-center justify-center text-center text-xs sm:text-sm font-bold text-[#212C3E] leading-tight">
              Built for homeschoolers
            </h3>
            <p className="mt-1 flex-1 text-center text-[10.5px] sm:text-[11px] leading-snug text-[#65706B]">
              Designed by parents who homeschool too.
            </p>
          </div>
        </div>

        {/* ── Bottom Privacy Text ── */}
        <footer className="text-center text-xs text-[#526068]">
          Your data is safe and secure, We never share your information. See our{' '}
          <a href="#privacy" className="underline text-[#ba633f]">Privacy Policy.</a>
        </footer>

      </div>
    </div>
  );
}