import React, { useState } from 'react';

export default function SignupPage({ onProceedToCheckout, onBackToLanding }) {
  const [activeTab, setActiveTab] = useState('create');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onProceedToCheckout) {
      onProceedToCheckout(name || 'shiva');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f3ede4] text-[#1e282d] antialiased py-0 sm:py-6 md:py-8 flex justify-center">
      {/* ── Page Container matching Landing Page width (max-w-[640px]), border & styling ── */}
      <div className="w-full max-w-[640px] bg-[#faf7f0] border border-[#ded5c7] shadow-sm px-5 sm:px-8 py-8 sm:py-10">

        {/* ── HEADER SECTION (Tabula. + Subtitle + 3 Dark Green Badges) ── */}
        <header className="mb-6 text-center">
          <div className="mb-1.5 inline-flex items-baseline cursor-pointer" onClick={onBackToLanding}>
            <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#212C3E]">Tabula</span>
            <span className="font-serif text-4xl sm:text-5xl leading-none text-[#1b6b50]">.</span>
          </div>

          <h1 className="font-serif text-xl sm:text-2xl font-semibold text-[#ba633f] mt-1">
            Your AI homeschool planning coach
          </h1>

          {/* 3 Dark Green Pills in 3 columns exactly as in screenshot */}
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-2.5">
            <div className="flex items-center justify-center gap-1.5 rounded-lg bg-[#175742] py-2 px-1 text-[10.5px] sm:text-[11.5px] font-semibold text-white shadow-2xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span className="truncate">You choose the curriculum</span>
            </div>

            <div className="flex items-center justify-center gap-1.5 rounded-lg bg-[#175742] py-2 px-1 text-[10.5px] sm:text-[11.5px] font-semibold text-white shadow-2xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span className="truncate">AI helps you implement it</span>
            </div>

            <div className="flex items-center justify-center gap-1.5 rounded-lg bg-[#175742] py-2 px-1 text-[10.5px] sm:text-[11.5px] font-semibold text-white shadow-2xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="shrink-0">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span className="truncate">Track what matters</span>
            </div>
          </div>
        </header>

        {/* ── 14-day free trial card ── */}
        <div className="mb-5 flex items-center gap-3.5 rounded-2xl border border-[#e9e2d5] bg-white p-4 shadow-2xs">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fdf3e7]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d1824a" strokeWidth="2">
              <polyline points="20 12 20 22 4 22 4 12"/>
              <rect x="2" y="7" width="20" height="5"/>
              <line x1="12" y1="22" x2="12" y2="7"/>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#ba633f]">14-day free trial</h2>
            <p className="text-xs font-semibold text-[#1b6b50]">Full access - $8/month after trial</p>
          </div>
        </div>

        {/* ── Auth Form Card ── */}
        <div className="mb-4 overflow-hidden rounded-2xl border border-[#e9e2d5] bg-white shadow-2xs">
          {/* Tabs on top of card */}
          <div className="flex border-b border-[#e9e2d5] p-1.5 bg-white">
            <button
              type="button"
              className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-[#175742] text-white shadow-sm'
                  : 'bg-white text-[#43545a] hover:bg-[#f3ece0]'
              }`}
              onClick={() => setActiveTab('create')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Create Account</span>
            </button>

            <button
              type="button"
              className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-[#175742] text-white shadow-sm'
                  : 'bg-white text-[#43545a] hover:bg-[#f3ece0]'
              }`}
              onClick={() => setActiveTab('signin')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Sign In</span>
            </button>
          </div>

          <form className="p-5 sm:p-6 space-y-4" onSubmit={handleSubmit}>
            {/* YOUR NAME */}
            {activeTab === 'create' && (
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase mb-1.5">
                  YOUR NAME
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#8d9b9f]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-[#d5cdc0] bg-white py-3 pr-3.5 pl-10 text-xs sm:text-sm text-[#172b30] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-none transition-colors"
                    placeholder="First name or family name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* EMAIL ADDRESS */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase mb-1.5">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#8d9b9f]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  className="w-full rounded-xl border border-[#d5cdc0] bg-white py-3 pr-3.5 pl-10 text-xs sm:text-sm text-[#172b30] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-none transition-colors"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase mb-1.5">
                PASSWORD
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#8d9b9f]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-xl border border-[#d5cdc0] bg-white py-3 pr-10 pl-10 text-xs sm:text-sm text-[#172b30] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-none transition-colors"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3.5 flex items-center text-[#8d9b9f] hover:text-[#526068] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b6b50] py-3.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#14553f] transition-all cursor-pointer"
              >
                <span>{activeTab === 'create' ? 'Start Your Free Trial' : 'Sign In to Tabula'}</span>
                <span>→</span>
              </button>
            </div>
          </form>
        </div>

        {/* Disclaimer Text */}
        <div className="mb-6 text-center text-xs text-[#526068] leading-relaxed">
          <p>
            By creating an account you agree to our{' '}
            <a href="#terms" className="underline text-[#ba633f]">teams of service</a>. Your 14-day free trial begins today.
          </p>
          <p className="mt-0.5">No payment required until your trial ends.</p>
        </div>

        {/* ── 3 Value Props Card ── */}
        <div className="mb-5 grid grid-cols-3 divide-x divide-[#f0eae0] rounded-2xl border border-[#e9e2d5] bg-white p-4 sm:p-5 text-center shadow-2xs">
          <div className="px-2">
            <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#215945] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#172a2f]">No credit card today</h3>
            <p className="mt-1 text-[10px] sm:text-[11px] leading-snug text-[#65757a]">
              Start free, Pay only after 14 days if you love it.
            </p>
          </div>

          <div className="px-2">
            <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#215945] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#172a2f]">Cancel anytime</h3>
            <p className="mt-1 text-[10px] sm:text-[11px] leading-snug text-[#65757a]">
              Full access during trial, Cancel anytime, no fees.
            </p>
          </div>

          <div className="px-2">
            <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#215945] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-[#172a2f]">Built for homeschoolers</h3>
            <p className="mt-1 text-[10px] sm:text-[11px] leading-snug text-[#65757a]">
              Designed by parents who homeschool too
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
