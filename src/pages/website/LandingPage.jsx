import React, { useState, useRef, useEffect } from 'react';
import SignupPage from './SignupPage';
import TrialCheckoutPage from './TrialCheckoutPage'
import planIcon from '../../assets/images/akar-icons_calendar (1).png';
import adaptIcon from '../../assets/images/Vector (1).png';
import progressIcon from '../../assets/images/Vector (2).png';
import weeklyPlannerIcon from '../../assets/images/akar-icons_calendar (2).png';
import studentIcon from '../../assets/images/griddy-icons_student.png';
import libraryIcon from '../../assets/images/Vector (3).png';
import privacyIcon from '../../assets/images/material-symbols_privacy-tip-outline.png';

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
      <div className="w-full max-w-[640px] bg-[#faf7f0] border-x sm:border border-[#ded5c7] shadow-sm px-4 sm:px-6 py-6 sm:py-9">

        {/* ================================================================
            1. HERO SECTION
            ================================================================ */}
        <header className="mb-9 text-left">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="inline-flex items-baseline cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="font-['Lora'] font-semibold text-[42px] leading-[100%] tracking-normal text-[#212C3E]">
                Tabula
              </span>
              <span className="font-['Lora'] font-semibold text-[48px] leading-[100%] tracking-normal text-[#126041]">
                .
              </span>
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

          <h1
            style={{ fontFamily: 'lora, serif' }}
            className="text-[22px] sm:text-[24px] font-semibold leading-[115%] tracking-[0%] text-[#ba633f]"
          >
            Your AI homeschool planning coach
          </h1>

          <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#685949]">
            You choose the curriculum. Tabula helps you <br className="hidden sm:inline" />
            implement it - week by week, child by child
          </p>

          <div className="mt-4">
            <button
              onClick={openSignup}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#356F58] hover:bg-[#2a5946] px-4 py-2 sm:py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all cursor-pointer"
            >
              <span>Start Your Free Trial</span>
              <span>→</span>
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-xs sm:text-[13px] font-medium text-[#526068]">
            <div className="inline-flex items-center gap-1">
              <span className="font-bold text-[#356F58]">✓</span>
              <span>14 days free</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="font-bold text-[#356F58]">✓</span>
              <span>$8/month after trial</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="font-bold text-[#356F58]">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </header>

        {/* ================================================================
            2. QUOTE SECTION
            ================================================================ */}
        <section className="my-9 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-px w-8 sm:w-28 bg-[#dcd4c6]" />
            <h2 className="font-serif text-[16px] sm:text-xl font-bold tracking-tight text-[#172b30] whitespace-nowrap">
              “A GPS for homeschooling”
            </h2>
            <div className="h-px w-8 sm:w-28 bg-[#dcd4c6]" />
          </div>
          <p className="mt-1 text-[11px] sm:text-[12.5px] font-medium text-[#ba633f]">
            Tabula doesn't replace your curriculum - it helps you use it better.
          </p>
        </section>

        {/* ================================================================
            3. PROCESS STEPS (01 Plan, 02 Adapt, 03 Progress) - Responsive Flow
            ================================================================ */}
        <section className="mb-11 flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch sm:items-center gap-2 sm:gap-2">
          {/* 01 Plan */}
          <div className="flex flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-3.5 sm:p-4 shadow-2xs">
            <div>
              <div className="mb-2 text-[#21353a]">
                <img src={planIcon} alt="Plan Icon" className="w-[18px] h-[18px] object-contain" />
              </div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#356F58] text-[10.5px] font-bold text-white shrink-0">
                  01
                </span>
                <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#172b30]">Plan</h3>
              </div>
              <p className="text-xs sm:text-[12.5px] leading-snug text-[#526068]">
                Turn your curriculum in to a realistic weekly plan.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center text-sm text-[#8c9b9f] py-0.5 sm:py-0">
            <span className="hidden sm:inline">→</span>
            <span className="sm:hidden text-base text-[#356F58]">↓</span>
          </div>

          {/* 02 Adapt */}
          <div className="flex flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-3.5 sm:p-4 shadow-2xs">
            <div>
              <div className="mb-2 text-[#21353a]">
                <img src={adaptIcon} alt="Adapt Icon" className="w-[18px] h-[18px] object-contain" />
              </div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#356F58] text-[10.5px] font-bold text-white shrink-0">
                  02
                </span>
                <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#172b30]">Adapt</h3>
              </div>
              <p className="text-xs sm:text-[12.5px] leading-snug text-[#526068]">
                Adjust lesson when life or your child's needs change.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center text-sm text-[#8c9b9f] py-0.5 sm:py-0">
            <span className="hidden sm:inline">→</span>
            <span className="sm:hidden text-base text-[#356F58]">↓</span>
          </div>

          {/* 03 Progress */}
          <div className="flex flex-col justify-between rounded-xl border border-[#e9e2d5] bg-white p-3.5 sm:p-4 shadow-2xs">
            <div>
              <div className="mb-2 text-[#21353a]">
                <img src={progressIcon} alt="Progress Icon" className="w-[18px] h-[18px] object-contain" />
              </div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#356F58] text-[10.5px] font-bold text-white shrink-0">
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
          <div className="mb-6 text-center">
            <h2 className="font-lora text-[20px] font-bold text-[#212C3E]">
              Everything you need to homeschool with <span className="text-[#356F58]">confidence</span>
            </h2>
          </div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-[1.1fr_0.9fr] items-start gap-4 rounded-2xl border border-[#ded7ca] bg-white p-4 sm:p-5 shadow-xs">

            {/* LEFT SIDE: Info & Feature List */}
            <div className="flex flex-col">
              <div className="flex flex-col items-start gap-2">
                <h3 className="font-lora text-[19px] font-semibold text-[#212C3E]">
                  AI Homeschool Coach
                </h3>

                <span className="inline-flex items-center rounded-md bg-[#F2B83F26] px-2 py-0.5 text-[9px] font-medium tracking-wider text-[#E09800]">
                  POWERED BY CLAUDE
                </span>
              </div>

              <p className="mt-3 text-[11.5px] sm:text-xs text-[#55636a]">
                Your personal planning partner, every week.
              </p>

              <ul className="mt-3 space-y-2">
                <li className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-[#203036]">
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#159446] text-[8px] text-white font-bold">
                    ✓
                  </span>
                  <span>Plans around your real progress</span>
                </li>

                <li className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-[#203036]">
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#159446] text-[8px] text-white font-bold">
                    ✓
                  </span>
                  <span>Suggest lessons and adjustments</span>
                </li>

                <li className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-[#203036]">
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#159446] text-[8px] text-white font-bold">
                    ✓
                  </span>
                  <span>Helps when a child is struggling</span>
                </li>

                <li className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-[#203036]">
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#159446] text-[8px] text-white font-bold">
                    ✓
                  </span>
                  <span>
                    Shares teaching ideas that fit your philosophy
                  </span>
                </li>
              </ul>
            </div>

            {/* RIGHT SIDE — Chat Mockup */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#ded7ca] bg-white p-3.5 sm:p-4 shadow-xs">
              <div className="mb-2 text-xs sm:text-[13px] font-bold text-[#1c2930]">
                AI Coach
              </div>

              <div
                ref={chatContainerRef}
                className="h-[135px] overflow-y-auto space-y-2 pr-1 custom-scrollbar"
              >
                {chatMessages.map((msg, idx) =>
                  msg.sender === 'ai' ? (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#f7f2ea] p-2.5 text-[11px] sm:text-xs leading-relaxed text-[#2c3c41]"
                    >
                      {msg.text}
                    </div>
                  ) : (
                    <div key={idx} className="flex justify-end">
                      <span className="rounded-lg bg-[#ede4d7] px-2.5 py-1 text-[10.5px] sm:text-[11.5px] font-medium text-[#203036]">
                        {msg.text}
                      </span>
                    </div>
                  )
                )}
              </div>

              <form
                className="mt-3 flex items-center rounded-xl border border-[#cbd3d6] bg-white px-3 py-1.5 focus-within:border-[#159446] transition-colors"
                onSubmit={handleSendMessage}
              >
                <input
                  type="text"
                  className="w-full bg-transparent text-[11.5px] sm:text-xs text-[#1c2930] placeholder-[#78888e] focus:outline-none"
                  placeholder="Ask your coach anytime..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />

                <button
                  type="submit"
                  className="ml-1.5 text-[#356F58] hover:text-[#2a5946] hover:scale-105 transition-all cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-2.5">
            {/* 1. Weekly Planner */}
            <div
              onClick={openSignup}
              className="flex flex-col justify-between rounded-2xl border border-[#ded6c9] bg-white p-3.5 sm:p-3 shadow-2xs hover:border-[#356F58]/40 transition-all cursor-pointer group"
            >
              <div>
                <div className="mb-2.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#356F58] text-white">
                  <img src={weeklyPlannerIcon} alt="Weekly Planner Icon" className="w-[14px] h-[14px] object-contain filter brightness-0 invert" />
                </div>
                <h4 className="text-sm sm:text-[13px] font-bold text-[#172b30] leading-tight mb-2">Weekly Planner</h4>
                <ul className="space-y-1.5 text-xs sm:text-[10px] leading-snug text-[#37474c]">
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Day-by-day scheduling</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Lesson details & duration</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Real-time progress tracking</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Adjust with one click</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-[11.5px] font-semibold text-[#ba633f] group-hover:gap-1.5 transition-all mt-3 pt-1">
                <span>Learn more</span>
                <span>→</span>
              </div>
            </div>

            {/* 2. Student Profile */}
            <div
              onClick={openSignup}
              className="flex flex-col justify-between rounded-2xl border border-[#ded6c9] bg-white p-3.5 sm:p-3 shadow-2xs hover:border-[#356F58]/40 transition-all cursor-pointer group"
            >
              <div>
                <div className="mb-2.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#356F58] text-white">
                  <img src={studentIcon} alt="Student Profile Icon" className="w-[14px] h-[14px] object-contain filter brightness-0 invert" />
                </div>
                <h4 className="text-sm sm:text-[13px] font-bold text-[#172b30] leading-tight mb-2">Student Profile</h4>
                <ul className="space-y-1.5 text-xs sm:text-[10px] leading-snug text-[#37474c]">
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Multiple students</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Strengths & challenges</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Interests & learning style</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Independent curriculum per student</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-[11.5px] font-semibold text-[#ba633f] group-hover:gap-1.5 transition-all mt-3 pt-1">
                <span>Learn more</span>
                <span>→</span>
              </div>
            </div>

            {/* 3. Resource Library */}
            <div
              onClick={openSignup}
              className="flex flex-col justify-between rounded-2xl border border-[#ded6c9] bg-white p-3.5 sm:p-3 shadow-2xs hover:border-[#356F58]/40 transition-all cursor-pointer group"
            >
              <div>
                <div className="mb-2.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#356F58] text-white">
                  <img src={libraryIcon} alt="Resource Library Icon" className="w-[14px] h-[14px] object-contain filter brightness-0 invert" />
                </div>
                <h4 className="text-sm sm:text-[13px] font-bold text-[#172b30] leading-tight mb-2">Resource Library</h4>
                <ul className="space-y-1.5 text-xs sm:text-[10px] leading-snug text-[#37474c]">
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Filter by philosophy</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Faith-based & traditional options</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Secular & Christian options</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Free & paid resources</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-[11.5px] font-semibold text-[#ba633f] group-hover:gap-1.5 transition-all mt-3 pt-1">
                <span>Learn more</span>
                <span>→</span>
              </div>
            </div>

            {/* 4. Privacy & Control */}
            <div
              onClick={openSignup}
              className="flex flex-col justify-between rounded-2xl border border-[#ded6c9] bg-white p-3.5 sm:p-3 shadow-2xs hover:border-[#356F58]/40 transition-all cursor-pointer group"
            >
              <div>
                <div className="mb-2.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#356F58] text-white">
                  <img src={privacyIcon} alt="Privacy & Control Icon" className="w-[14px] h-[14px] object-contain filter brightness-0 invert" />
                </div>
                <h4 className="text-sm sm:text-[13px] font-bold text-[#172b30] leading-tight mb-2">Privacy & Control</h4>
                <ul className="space-y-1.5 text-xs sm:text-[10px] leading-snug text-[#37474c]">
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Your data stays yours</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>You control what AI sees</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>Delete everything anytime</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-1">
                    <span className="font-bold text-[#356F58] text-xs leading-none shrink-0 mt-0.5">✓</span>
                    <span>No data selling ever</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-[11.5px] font-semibold text-[#ba633f] group-hover:gap-1.5 transition-all mt-3 pt-1">
                <span>Learn more</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            5. PRICING SECTION
            ================================================================ */}
        <section className="mb-11">
          <div className="mb-5 text-center">
            <h2
              style={{ fontFamily: 'Lora, serif' }}
              className="text-[20px] font-semibold leading-[100%] tracking-[0%] text-center text-[#172b30]"
            >
              Simple pricing. No surprises.
            </h2>
            <p className="mt-1 text-[11px] font-medium text-[#685949]">
              Start with 14 days completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            {/* Monthly Card */}
            <div
              onClick={() => {
                setSelectedPlan('monthly');
                onSelectPlan?.('monthly');
              }}
              className={`flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all cursor-pointer ${selectedPlan === 'monthly'
                ? 'border-2 border-[#356F58] bg-white shadow-xs'
                : 'border border-[#ded6c9] bg-white hover:border-[#356F58]/40 shadow-2xs'
                }`}
            >
              <div className="flex-1 flex flex-col">
                <h3 className="text-center text-sm sm:text-base font-bold text-[#172b30]">Monthly</h3>

                <div className="mt-1 text-center text-2xl sm:text-2xl font-bold text-[#172b30]">
                  $8
                </div>
                <div className="mt-0.5 text-center text-xs sm:text-[13px] text-[#526068]">
                  Per month
                </div>

                <ul className="mt-4 sm:mt-5 space-y-2 text-xs sm:text-[13px] text-[#27373c]">
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#356F58] text-xs sm:text-sm shrink-0">✓</span>
                    <span className="leading-snug">Unlimited students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#356F58] text-xs sm:text-sm shrink-0">✓</span>
                    <span className="leading-snug">AI coaching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#356F58] text-xs sm:text-sm shrink-0">✓</span>
                    <span className="leading-snug">Full planner & tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#356F58] text-xs sm:text-sm shrink-0">✓</span>
                    <span className="leading-snug">Resource library</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedPlan === 'monthly') {
                    openSignup('monthly');
                  } else {
                    setSelectedPlan('monthly');
                    onSelectPlan?.('monthly');
                  }
                }}
                className={`mt-5 sm:mt-6 w-full py-2.5 sm:py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${selectedPlan === 'monthly'
                  ? 'bg-[linear-gradient(92.26deg,#126041_30.56%,#159446_98.6%)] hover:bg-[#126041] text-white shadow-xs'
                  : 'border border-[#ded6c9] bg-white text-[#172b30] hover:bg-[#faf7f0] hover:border-[#172b30]/30 shadow-2xs'
                  }`}
              >
                <span>Choose Monthly</span>
                <span>→</span>
              </button>
            </div>

            {/* Annual Card */}
            <div
              onClick={() => {
                setSelectedPlan('annual');
                onSelectPlan?.('annual');
              }}
              className={`relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all cursor-pointer ${selectedPlan === 'annual'
                ? 'border-2 border-[#356F58] bg-white shadow-xs'
                : 'border border-[#ded6c9] hover:border-[#356F58]/60 bg-white shadow-2xs'
                }`}
            >
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#f4a123] px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-extrabold tracking-wider text-[#4d2c00] uppercase shadow-2xs text-center z-10">
                BEST VALUE - SAVE $24!
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-center text-sm sm:text-base font-bold text-[#172b30]">Annual</h3>

                <div className="mt-1 text-center text-2xl sm:text-2xl font-bold text-[#172b30]">
                  $6
                </div>
                <div className="mt-0.5 text-center text-xs sm:text-[13px] text-[#526068]">
                  Per month - $72/year
                </div>

                <ul className="mt-4 sm:mt-5 space-y-2 text-xs sm:text-[13px] text-[#27373c]">
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#356F58] text-xs sm:text-sm shrink-0">✓</span>
                    <span className="leading-snug">Everything in monthly</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#356F58] text-xs sm:text-sm shrink-0">✓</span>
                    <span className="leading-snug">2 Months free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#356F58] text-xs sm:text-sm shrink-0">✓</span>
                    <span className="leading-snug">Priority support</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedPlan === 'annual') {
                    openSignup('annual');
                  } else {
                    setSelectedPlan('annual');
                    onSelectPlan?.('annual');
                  }
                }}
                className={`mt-5 sm:mt-6 w-full py-2.5 sm:py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${selectedPlan === 'annual'
                  ? 'bg-[linear-gradient(92.26deg,#126041_30.56%,#159446_98.6%)] hover:bg-[#126041] text-white shadow-xs'
                  : 'border border-[#ded6c9] bg-white text-[#172b30] hover:bg-[#faf7f0] hover:border-[#172b30]/30 shadow-2xs'
                  }`}
              >
                <span>Choose Annual</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================
            6. COMMON QUESTIONS (FAQ)
            ================================================================ */}
        <section className="mb-11">
          <h2 className="font-serif mb-5 text-center text-bs sm:text-2xl font-bold text-[#172b30]">
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

                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#b2ddc8] bg-white text-[#356F58]">
                      {isOpen ? (
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      ) : (
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
        <section className="flex flex-col items-center rounded-xl border border-[#e9e2d5] bg-white px-4 sm:px-6 py-8 sm:py-10 text-center shadow-2xs">
          <h2
            style={{ fontFamily: 'Lora, serif' }}
            className="text-[20px] sm:text-[24px] font-semibold leading-[120%] tracking-[0%] text-center text-[#172b30]"
          >
            Ready to simplify your homeschool?
          </h2>

          <p className="text-[12.5px] sm:text-[14px] font-normal leading-[150%] tracking-[0%] text-center text-[#685949] mt-2.5 max-w-[500px]">
            Join families who use Tabula to plan with confidence, <br className="hidden sm:inline" />
            teach with purpose, and stop reinventing the wheel every week.
          </p>

          <button
            onClick={openSignup}
            className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#356F58] hover:bg-[#2a5946] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-sm transition-all cursor-pointer"
          >
            <span>Start Your Free Trial</span>
            <span>→</span>
          </button>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-[13px] font-medium text-[#526068]">
            <div className="inline-flex items-center gap-1.5">
              <span className="font-bold text-[#356F58]">✓</span>
              <span>14 days free</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <span className="font-bold text-[#356F58]">✓</span>
              <span>$8/month after trial</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <span className="font-bold text-[#356F58]">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}