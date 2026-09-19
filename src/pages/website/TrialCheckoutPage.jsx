import React, { useState } from 'react';

export default function TrialCheckoutPage({ userName = 'shiva', initialPlan = 'annual', onCompleteTrial, onBack }) {
  const [selectedPlan, setSelectedPlan] = useState(initialPlan); // 'monthly' | 'annual'
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [zip, setZip] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const trialEndDate = "September 17, 2026";

  const handleStartTrial = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please confirm the trial terms checkbox to proceed.');
      return;
    }
    if (onCompleteTrial) {
      onCompleteTrial();
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f3ede4] text-[#1e282d] antialiased py-0 sm:py-6 md:py-8 flex justify-center">
      {/* ── Page Container matching Landing Page width (max-w-[640px]), border & styling ── */}
      <div className="w-full max-w-[640px] bg-[#faf7f0] border border-[#ded5c7] shadow-sm px-5 sm:px-8 py-8 sm:py-10">

        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1b6b50] text-2xl text-white shadow-sm">
              ✓
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172b30]">
              Welcome to Tabula!
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#526068] max-w-sm mx-auto">
              Your 14-day free trial has started. Your AI Homeschool Coach is ready to help you plan your curriculum.
            </p>
            <button 
              type="button"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1b6b50] px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#14553f] transition-colors cursor-pointer"
              onClick={onCompleteTrial || onBack}
            >
              <span>Go to Dashboard</span>
              <span>→</span>
            </button>
          </div>
        ) : (
          <div>
            {/* ── HEADER SECTION ── */}
            <header className="text-center">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#172b30]">
                Start your free trial
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-[#ba633f]">
                14 days free - No charge today
              </p>
            </header>

            {/* ── WELCOME CARD ── */}
            <div className="mt-6 mb-7 rounded-2xl border border-[#e9e2d5] bg-white p-5 sm:p-6 shadow-2xs">
              <h2 className="font-serif text-sm sm:text-base font-bold text-[#172b30]">
                Welcome, {userName || 'shiva'}! Here's what you get:
              </h2>
              <ul className="mt-3.5 space-y-2.5">
                {[
                  'Unlimited students and AI coaching sessions',
                  'Full planner with assignment-level tracking',
                  '200+ curated curriculum resources',
                  'Philosophy & faith-aware coaching guidance',
                  '14 days completely free — cancel any time before day 14',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#ba633f] font-medium">
                    <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#1b6b50] text-white">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── CHOOSE YOUR PLAN ── */}
            <div className="mb-7">
              <h3 className="text-xs sm:text-sm font-bold text-[#172b30] text-center mb-3.5">
                Choose your plan
              </h3>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Monthly Plan */}
                <div
                  onClick={() => setSelectedPlan('monthly')}
                  className={`rounded-2xl border p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all bg-white ${
                    selectedPlan === 'monthly'
                      ? 'border-2 border-[#1b6b50] shadow-xs'
                      : 'border-[#e9e2d5] hover:border-[#ba633f] shadow-2xs'
                  }`}
                >
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#172b30]">Monthly</h4>
                    <div className="text-xl sm:text-2xl font-bold text-[#ba633f] mt-0.5">$8/mo</div>
                    <div className="text-[10.5px] text-[#ba633f] font-medium">Billed monthly</div>
                  </div>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#ba633f]">
                    {selectedPlan === 'monthly' && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#1b6b50]" />
                    )}
                  </div>
                </div>

                {/* Annual Plan */}
                <div
                  onClick={() => setSelectedPlan('annual')}
                  className={`relative rounded-2xl border p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all bg-white ${
                    selectedPlan === 'annual'
                      ? 'border-2 border-[#1b6b50] shadow-xs'
                      : 'border-[#e9e2d5] hover:border-[#1b6b50] shadow-2xs'
                  }`}
                >
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-sm bg-[#f4a123] px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#5c3500] shadow-2xs whitespace-nowrap">
                    BEST VALUE
                  </div>

                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#172b30]">Annual</h4>
                    <div className="text-xl sm:text-2xl font-bold text-[#1b6b50] mt-0.5">$6/mo</div>
                    <div className="text-[10.5px] text-[#ba633f] font-medium">$72/yr - Save $24</div>
                  </div>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#1b6b50]">
                    {selectedPlan === 'annual' && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#1b6b50]" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── PAYMENT DETAILS FORM ── */}
            <form onSubmit={handleStartTrial}>
              <div className="mb-4">
                <h3 className="text-xs sm:text-[12.5px] font-bold text-[#526068] text-center mb-3">
                  Payment details (saved for after trial)
                </h3>

                {/* NAME ON CARD */}
                <div className="mb-3.5">
                  <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase text-center mb-1.5">
                    NAME ON CARD
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-[#d5cdc0] bg-white px-4 py-3 text-xs sm:text-sm text-[#172b30] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-none transition-colors"
                  />
                </div>

                {/* CARD NUMBER */}
                <div className="mb-3.5">
                  <label className="block text-[11px] font-bold tracking-wider text-[#1e282d] uppercase text-center mb-1.5">
                    CARD NUMBER
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-xl border border-[#d5cdc0] bg-white px-4 py-3 text-xs sm:text-sm text-[#172b30] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-none transition-colors"
                  />
                </div>

                {/* EXPIRY, CVV, ZIP */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1e282d] text-center mb-1.5">
                      Expiry
                    </label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-[#d5cdc0] bg-white px-3 py-3 text-xs sm:text-sm text-[#172b30] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-none transition-colors text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e282d] text-center mb-1.5">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="1234"
                      className="w-full rounded-xl border border-[#d5cdc0] bg-white px-3 py-3 text-xs sm:text-sm text-[#172b30] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-none transition-colors text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1e282d] text-center mb-1.5">
                      ZIP
                    </label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="12345"
                      className="w-full rounded-xl border border-[#d5cdc0] bg-white px-3 py-3 text-xs sm:text-sm text-[#172b30] placeholder-[#8d9b9f] focus:border-[#1b6b50] focus:outline-none transition-colors text-center"
                    />
                  </div>
                </div>
              </div>

              {/* ── AGREEMENT CHECKBOX ── */}
              <label className="flex items-start gap-2.5 cursor-pointer text-[11px] sm:text-xs leading-relaxed text-[#526068]">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#d5cdc0] text-[#1b6b50] focus:ring-[#1b6b50] cursor-pointer"
                />
                <span>
                  I understand my 14-day free trial starts today. I will not be charged until{' '}
                  <span className="font-semibold text-[#ba633f]">{trialEndDate}</span>. After the trial, I'll be billed{' '}
                  {selectedPlan === 'annual' ? '$72/year' : '$8/month'}. I can cancel any time before my trial ends.
                </span>
              </label>

              {/* ── SUBMIT BUTTON ── */}
              <div className="mt-5">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b6b50] hover:bg-[#14553f] py-3.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all cursor-pointer"
                >
                  <span>Start Your Free Trial</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
