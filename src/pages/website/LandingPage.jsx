import React, { useState, useRef, useEffect } from 'react';
import SignupPage from './SignupPage';
import TrialCheckoutPage from './TrialCheckoutPage';

export default function LandingPage({ onGoToApp, onSelectPlan, onNavigateToSignup }) {
  const [showSignup, setShowSignup] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('annual'); // 'monthly' | 'annual'

  // Interactive FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  // Interactive AI Coach chat state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Your son seems to be excelling in math, would you like to increase the challenge next week?'
    },
    {
      sender: 'user',
      text: 'Yes, please'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "I've added supplementary problem sets and adjusted the weekly pace to keep him engaged!"
        }
      ]);
    }, 600);
  };

  const openSignup = (plan) => {
    const targetPlan = (plan && typeof plan === 'string') ? plan : selectedPlan;
    setSelectedPlan(targetPlan);
    onSelectPlan?.(targetPlan);
    if (onNavigateToSignup) {
      onNavigateToSignup(targetPlan);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setShowSignup(true);
  };

  const handleProceedToCheckout = (name) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setUserName(name);
    setShowSignup(false);
    setIsCheckoutOpen(true);
  };

  const faqs = [
    {
      question: "Does Tabula create my curriculum?",
      answer: "No, Tabula does not replace your chosen curriculum. Instead, it takes the books, courses, and resources you already use and helps you structure, schedule, and execute them day-by-day."
    },
    {
      question: "Is the AI coaching really personalized?",
      answer: "Yes! Powered by Claude, Tabula's coach learns each child's strengths, learning pace, and challenges, offering tailored suggestions, schedule shifts, and teaching strategies based on your family's educational philosophy."
    },
    {
      question: "Can I use it with any curriculum?",
      answer: "Absolutely. Tabula works with Charlotte Mason, Classical, Unschooling, Traditional, Faith-based, Secular, or eclectic hybrid approaches. You retain 100% control over what your children study."
    },
    {
      question: "What happens after the 14-day trial?",
      answer: "You enjoy complete access to all features during your 14-day free trial. If you choose to continue, you'll be billed according to your selected plan ($8/mo or $6/mo billed annually). You can cancel anytime before the trial ends without being charged."
    },
    {
      question: "What if I homeschool multiple children?",
      answer: "Tabula fully supports multiple students at no extra cost. Both the monthly and annual plans include unlimited student profiles with independent curriculums, tracking, and personalized coaching."
    },
    {
      question: "Is my family's information private?",
      answer: "Your family's privacy and data protection are paramount. We never sell your personal data or your children's learning records. You have complete control over AI visibility and can export or delete your data at any moment."
    }
  ];

  if (showSignup) {
    return (
      <SignupPage
        onBackToLanding={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          setShowSignup(false);
        }}
        onProceedToCheckout={handleProceedToCheckout}
      />
    );
  }

  if (isCheckoutOpen) {
    return (
      <TrialCheckoutPage
        userName={userName}
        initialPlan={selectedPlan}
        onCompleteTrial={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          setIsCheckoutOpen(false);
          onGoToApp?.();
        }}
        onBack={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          setIsCheckoutOpen(false);
          setShowSignup(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f3ede4] text-[#1e282d] antialiased py-0 sm:py-6 md:py-8 flex justify-center">
      {/* ── Balanced Page Container matching screenshot width & border ── */}
      <div className="w-full max-w-[640px] bg-[#faf7f0] border border-[#ded5c7] shadow-sm px-5 sm:px-6 py-6 sm:py-9">

        {/* ================================================================
            1. HERO SECTION
            ================================================================ */}
        <header className="mb-9 text-left">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="inline-flex items-baseline cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#212C3E]">Tabula</span>
              <span className="font-serif text-3xl sm:text-4xl leading-none text-[#1b6b50]">.</span>
            </div>
            <button
              type="button"
              onClick={onGoToApp}
              className="rounded-lg border border-[#d5ccc0] bg-white px-3 py-1.5 text-xs font-semibold text-[#172b30] hover:bg-[#faf6ee] transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
            >
              <span>Dashboard</span>
              <span>→</span>
            </button>
          </div>

          <h1 className="font-serif text-2xl sm:text-[28px] font-semibold leading-snug tracking-tight text-[#ba633f]">
            Your AI homeschool planning coach
          </h1>

          <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#526068]">
            You choose the curriculum. Tabula helps you<br />
            implement it - week by week, child by child
          </p>

          <div className="mt-4">
            <button
              onClick={openSignup}
              className="inline-flex items-center gap-2 rounded-lg bg-[#215945] hover:bg-[#184636] px-5 py-2.5 text-sm sm:text-base font-bold text-white shadow-sm transition-all cursor-pointer"
            >
              <span>Start Your Free Trial</span>
              <span>→</span>
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3.5 text-xs sm:text-[13px] font-medium text-[#526068]">
            <div className="inline-flex items-center gap-1">
              <span className="font-bold text-[#1b6b50]">✓</span>
              <span>14 days free</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="font-bold text-[#1b6b50]">✓</span>
              <span>$8/month after trial</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="font-bold text-[#1b6b50]">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </header>

        {/* ================================================================
            2. QUOTE SECTION
            ================================================================ */}
        <section className="my-9 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20 sm:w-28 bg-[#dcd4c6]" />
            <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#172b30]">
              “A GPS for homeschooling”
            </h2>
            <div className="h-px w-20 sm:w-28 bg-[#dcd4c6]" />
          </div>
          <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#ba633f]">
            Tabula doesn't replace your curriculum - it helps you use it better.
          </p>
        </section>

        {/* ================================================================
            3. PROCESS STEPS (01 Plan, 02 Adapt, 03 Progress)
            ================================================================ */}
        <section className="mb-11 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          {/* 01 Plan */}
          <div className="flex h-full flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-3 sm:p-3.5 shadow-2xs">
            <div>
              <div className="mb-2 text-[#21353a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#215945] text-[10px] font-bold text-white shrink-0">
                  01
                </span>
                <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#172b30]">Plan</h3>
              </div>
              <p className="text-xs sm:text-[12.5px] leading-snug text-[#526068]">
                Turn your curriculum in to a realistic weekly plan.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center text-sm text-[#8c9b9f]">
            →
          </div>

          {/* 02 Adapt */}
          <div className="flex h-full flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-3 sm:p-3.5 shadow-2xs">
            <div>
              <div className="mb-2 text-[#21353a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
              </div>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#215945] text-[10px] font-bold text-white shrink-0">
                  02
                </span>
                <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#172b30]">Adapt</h3>
              </div>
              <p className="text-xs sm:text-[12.5px] leading-snug text-[#526068]">
                Adjust lesson when life or your child's needs change.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center text-sm text-[#8c9b9f]">
            →
          </div>

          {/* 03 Progress */}
          <div className="flex h-full flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-3 sm:p-3.5 shadow-2xs">
            <div>
              <div className="mb-2 text-[#21353a]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#215945] text-[10px] font-bold text-white shrink-0">
                  03
                </span>
                <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#172b30]">Progress</h3>
              </div>
              <p className="text-xs sm:text-[12.5px] leading-snug text-[#526068]">
                Know what's completed, what's next, and where support is needed.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            4. SECTION: Everything you need to homeschool with confidence
            ================================================================ */}
        <section className="mb-11">
          <div className="mb-5 text-center">
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#172b30]">
              Everything you need to homeschool with <span className="text-[#215945]">confidence</span>
            </h2>
          </div>

          {/* AI Homeschool Coach Card */}
          <div className="mb-3.5 grid grid-cols-[1.1fr_0.9fr] items-center gap-3.5 rounded-2xl border border-[#e9e2d5] bg-white p-4 sm:p-5 shadow-2xs">
            {/* LEFT SIDE */}
            <div>
              <h3 className="font-serif text-base sm:text-xl font-bold text-[#172b30]">
                AI Homeschool Coach
              </h3>

              <div className="mt-1.5 inline-flex items-center rounded bg-[#fef3c7] px-2 py-0.5 text-[9.5px] sm:text-[10px] font-extrabold tracking-wider text-[#b45309]">
                POWERED BY CLAUDE
              </div>

              <p className="mt-2 text-xs sm:text-sm text-[#526068]">
                Your personal planning partner, every week.
              </p>

              <ul className="mt-2.5 space-y-1.5">
                <li className="flex items-center gap-1.5 text-xs sm:text-[12.5px] font-medium text-[#27373c]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50] text-[9.5px] text-white font-bold">✓</span>
                  <span>Plans around your real progress</span>
                </li>
                <li className="flex items-center gap-1.5 text-xs sm:text-[12.5px] font-medium text-[#27373c]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50] text-[9.5px] text-white font-bold">✓</span>
                  <span>Suggest lessons and adjustments</span>
                </li>
                <li className="flex items-center gap-1.5 text-xs sm:text-[12.5px] font-medium text-[#27373c]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50] text-[9.5px] text-white font-bold">✓</span>
                  <span>Helps when a child is struggling</span>
                </li>
                <li className="flex items-center gap-1.5 text-xs sm:text-[12.5px] font-medium text-[#27373c]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50] text-[9.5px] text-white font-bold">✓</span>
                  <span>Shares teaching ideas that fit your philosophy</span>
                </li>
              </ul>
            </div>

            {/* RIGHT SIDE — Chat Mockup */}
            <div className="flex flex-col justify-between rounded-xl border border-[#e2dacf] bg-white p-3 shadow-2xs">
              <div className="mb-1.5 text-xs sm:text-sm font-bold text-[#172b30]">AI Coach</div>

              <div
                ref={chatContainerRef}
                className="h-[145px] overflow-y-auto space-y-1.5 pr-1.5 custom-scrollbar"
              >
                {chatMessages.map((msg, idx) => (
                  msg.sender === 'ai' ? (
                    <div key={idx} className="rounded-lg bg-[#f5efe6] p-2 text-xs sm:text-[12.5px] leading-relaxed text-[#2c3c41]">
                      {msg.text}
                    </div>
                  ) : (
                    <div key={idx} className="flex justify-end">
                      <span className="rounded bg-[#ebe3d5] px-2 py-0.5 text-[11px] sm:text-xs font-medium text-[#2f3e43]">
                        {msg.text}
                      </span>
                    </div>
                  )
                ))}
              </div>

              <form className="mt-2.5 flex items-center rounded-lg border border-[#dfd7cb] bg-white px-2.5 py-1" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  className="w-full bg-transparent text-xs text-[#2b3a3f] placeholder-[#9aa7ab] focus:outline-none"
                  placeholder="Ask your coach anytime..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit" className="text-[#1b6b50] hover:scale-110 transition-transform cursor-pointer" aria-label="Send message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* 4 Feature Cards Grid — 4 Columns matching screenshot */}
          <div className="grid grid-cols-4 gap-2">
            {/* 1. Weekly Planner */}
            <div className="flex flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-2.5 shadow-2xs">
              <div>
                <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#215945] text-white">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h4 className="font-serif text-sm sm:text-[14.5px] font-bold text-[#172b30] leading-snug">Weekly Planner</h4>
                <ul className="my-2 space-y-1 text-[10.5px] sm:text-[11px] leading-tight text-[#37474c]">
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Day-by-day scheduling</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Lesson details & duration</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Real-time progress tracking</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Adjust with one click</span>
                  </li>
                </ul>
              </div>
              <button className="flex items-center gap-0.5 text-[11.5px] sm:text-xs font-semibold text-[#ba633f] hover:gap-1 transition-all cursor-pointer mt-1.5" onClick={openSignup}>
                <span>Learn more</span>
                <span>→</span>
              </button>
            </div>

            {/* 2. Student Profile */}
            <div className="flex flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-2.5 shadow-2xs">
              <div>
                <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#215945] text-white">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h4 className="font-serif text-sm sm:text-[14.5px] font-bold text-[#172b30] leading-snug">Student Profile</h4>
                <ul className="my-2 space-y-1 text-[10.5px] sm:text-[11px] leading-tight text-[#37474c]">
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Multiple students</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Strengths & challenges</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Interests & learning style</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Independent curriculum per student</span>
                  </li>
                </ul>
              </div>
              <button className="flex items-center gap-0.5 text-[11.5px] sm:text-xs font-semibold text-[#ba633f] hover:gap-1 transition-all cursor-pointer mt-1.5" onClick={openSignup}>
                <span>Learn more</span>
                <span>→</span>
              </button>
            </div>

            {/* 3. Resource Library */}
            <div className="flex flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-2.5 shadow-2xs">
              <div>
                <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#215945] text-white">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h4 className="font-serif text-sm sm:text-[14.5px] font-bold text-[#172b30] leading-snug">Resource Library</h4>
                <ul className="my-2 space-y-1 text-[10.5px] sm:text-[11px] leading-tight text-[#37474c]">
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Filter by philosophy</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Faith-based & traditional options</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Secular & Christian options</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Free & paid resources</span>
                  </li>
                </ul>
              </div>
              <button className="flex items-center gap-0.5 text-[11.5px] sm:text-xs font-semibold text-[#ba633f] hover:gap-1 transition-all cursor-pointer mt-1.5" onClick={openSignup}>
                <span>Learn more</span>
                <span>→</span>
              </button>
            </div>

            {/* 4. Privacy & Control */}
            <div className="flex flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-2.5 shadow-2xs">
              <div>
                <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#215945] text-white">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="font-serif text-sm sm:text-[14.5px] font-bold text-[#172b30] leading-snug">Privacy & Control</h4>
                <ul className="my-2 space-y-1 text-[10.5px] sm:text-[11px] leading-tight text-[#37474c]">
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Your data stays yours</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>You control what AI sees</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>Delete everything anytime</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="font-bold text-[#1b6b50]">✓</span>
                    <span>No data selling ever</span>
                  </li>
                </ul>
              </div>
              <button className="flex items-center gap-0.5 text-[11.5px] sm:text-xs font-semibold text-[#ba633f] hover:gap-1 transition-all cursor-pointer mt-1.5" onClick={openSignup}>
                <span>Learn more</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================
            5. PRICING SECTION
            ================================================================ */}
        <section className="mb-11">
          <div className="mb-5 text-center">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#172b30]">
              Simple pricing. No surprises.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#526068]">
              Start with 14 days completely free.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5 items-stretch">
            {/* Monthly Card (First Card) */}
            <div
              onClick={() => setSelectedPlan('monthly')}
              className={`flex flex-col justify-between rounded-xl p-4 transition-all cursor-pointer ${selectedPlan === 'monthly'
                ? 'border-2 border-[#215945] bg-[#fbfdfc] shadow-xs ring-1 ring-[#215945]/10'
                : 'border border-[#e9e2d5] bg-white hover:border-[#215945]/40 shadow-2xs'
                }`}
            >
              <div>
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="font-serif text-center text-sm sm:text-base font-bold text-[#172b30]">Monthly</h3>
                  <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${selectedPlan === 'monthly' ? 'border-[#215945] bg-white' : 'border-[#d0c8b9]'
                    }`}>
                    {selectedPlan === 'monthly' && <div className="h-2 w-2 rounded-full bg-[#215945]" />}
                  </div>
                </div>

                <div className="mt-1 flex items-baseline justify-center gap-0.5">
                  <span className="text-3xl sm:text-4xl font-bold text-[#172b30]">$8</span>
                  <span className="text-xs sm:text-sm font-normal text-[#526068]">/mo</span>
                </div>
                <div className="mt-0.5 h-5 flex items-center justify-center text-center text-xs sm:text-[12.5px] text-[#526068]">
                  Billed monthly
                </div>

                <div className="my-3 border-t border-[#f0eae0]" />

                <ul className="space-y-2 text-xs sm:text-[13px] text-[#27373c]">
                  <li className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50]/12 text-[11px] font-bold text-[#1b6b50]">✓</span>
                    <span className="leading-snug">Unlimited students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50]/12 text-[11px] font-bold text-[#1b6b50]">✓</span>
                    <span className="leading-snug">AI coaching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50]/12 text-[11px] font-bold text-[#1b6b50]">✓</span>
                    <span className="leading-snug">Full planner & tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50]/12 text-[11px] font-bold text-[#1b6b50]">✓</span>
                    <span className="leading-snug">Resource library</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan('monthly');
                    openSignup('monthly');
                  }}
                  className={`w-full rounded-lg py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer text-center ${selectedPlan === 'monthly'
                    ? 'bg-[#215945] text-white shadow-sm hover:bg-[#184636]'
                    : 'border border-[#d0c8b9] bg-white text-[#172b30] hover:bg-[#faf5eb]'
                    }`}
                >
                  Choose Monthly →
                </button>
              </div>
            </div>

            {/* Annual Card */}
            <div
              onClick={() => setSelectedPlan('annual')}
              className={`relative flex flex-col justify-between rounded-xl p-4 transition-all cursor-pointer ${selectedPlan === 'annual'
                ? 'border-2 border-[#215945] bg-[#fbfdfc] shadow-xs ring-1 ring-[#215945]/10'
                : 'border border-[#e9e2d5] bg-white hover:border-[#215945]/40 shadow-2xs'
                }`}
            >
              {/* BEST VALUE - SAVE $24! Centered Badge */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#f4a123] px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-extrabold tracking-wider text-[#4d2c00] uppercase shadow-2xs text-center z-10">
                BEST VALUE - SAVE $24!
              </div>

              <div>
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="font-serif text-center text-sm sm:text-base font-bold text-[#172b30]">Annual</h3>
                  <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${selectedPlan === 'annual' ? 'border-[#215945] bg-white' : 'border-[#d0c8b9]'
                    }`}>
                    {selectedPlan === 'annual' && <div className="h-2 w-2 rounded-full bg-[#215945]" />}
                  </div>
                </div>

                <div className="mt-1 flex items-baseline justify-center gap-0.5">
                  <span className="text-3xl sm:text-4xl font-bold text-[#172b30]">$6</span>
                  <span className="text-xs sm:text-sm font-normal text-[#526068]">/mo</span>
                </div>
                <div className="mt-0.5 h-5 flex items-center justify-center text-center text-xs sm:text-[12.5px] text-[#526068]">
                  $72 billed annually
                </div>

                <div className="my-3 border-t border-[#f0eae0]" />

                <ul className="space-y-2 text-xs sm:text-[13px] text-[#27373c]">
                  <li className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50]/12 text-[11px] font-bold text-[#1b6b50]">✓</span>
                    <span className="leading-snug">Everything in monthly</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50]/12 text-[11px] font-bold text-[#1b6b50]">✓</span>
                    <span className="leading-snug font-medium text-[#1b6b50]">2 Months free ($24 off)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50]/12 text-[11px] font-bold text-[#1b6b50]">✓</span>
                    <span className="leading-snug">Priority coach support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b6b50]/12 text-[11px] font-bold text-[#1b6b50]">✓</span>
                    <span className="leading-snug">Full planner & tracking</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan('annual');
                    openSignup('annual');
                  }}
                  className={`w-full rounded-lg py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer text-center ${selectedPlan === 'annual'
                    ? 'bg-[#215945] text-white shadow-sm hover:bg-[#184636]'
                    : 'border border-[#d0c8b9] bg-white text-[#172b30] hover:bg-[#faf5eb]'
                    }`}
                >
                  Choose Annual →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            6. COMMON QUESTIONS (FAQ)
            ================================================================ */}
        <section className="mb-11">
          <h2 className="font-serif mb-5 text-center text-xl sm:text-2xl font-bold text-[#172b30]">
            Common questions
          </h2>

          <div className="grid grid-cols-1 gap-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-[#ebdcc9] bg-[#f7f1e7] transition-all"
                >
                  <button
                    className="flex w-full items-center justify-between gap-2 p-3 text-left cursor-pointer"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#172b30] leading-snug">
                      {faq.question}
                    </span>

                    {/* Circle container with SVG icon for 100% precise centering */}
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#b2ddc8] bg-white text-[#215945]">
                      {isOpen ? (
                        // Minus SVG
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      ) : (
                        // Plus SVG
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-3 pb-3 text-xs sm:text-[12.5px] leading-relaxed text-[#526068]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
        {/* ================================================================
            7. BOTTOM CTA CARD
            ================================================================ */}
        <section className="flex flex-col items-center rounded-xl border border-[#e9e2d5] bg-white px-5 py-8 text-center shadow-2xs">
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#172b30]">
            Ready to simplify your homeschool?
          </h2>

          <p className="mt-2 max-w-sm text-xs sm:text-sm leading-relaxed text-[#526068]">
            Join families who use Tabula to plan with confidence, teach with purpose, and stop reinventing the wheel every week.
          </p>

          <button
            onClick={openSignup}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#215945] hover:bg-[#184636] px-5 py-2.5 text-sm sm:text-base font-bold text-white shadow-sm transition-all cursor-pointer"
          >
            <span>Start Your Free Trial</span>
            <span>→</span>
          </button>

          <div className="mt-3 flex flex-wrap justify-center items-center gap-3.5 text-xs sm:text-[13px] font-medium text-[#526068]">
            <div className="inline-flex items-center gap-1">
              <span className="font-bold text-[#1b6b50]">✓</span>
              <span>14 days free</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="font-bold text-[#1b6b50]">✓</span>
              <span>$8/month after trial</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="font-bold text-[#1b6b50]">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}