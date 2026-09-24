import React, { useState, useRef, useEffect } from 'react';

/**
 * CoachView component matching Tabula's Homeschool Coach interface.
 * Exact 1:1 pixel-perfect match to user's Figma reference:
 * - Top Trial Banner: "Free trial — 14 days left" (terracotta) + "Upgrade →" (pill button with dark text & muted border)
 * - Header: Circular Back Button (←) + "Coach" (serif) + "Here to help with your homeschool"
 * - Student selection: "Student 1" (active: green border & mint bg) + "Student 2" (inactive: coral border)
 * - Coach Welcome message: 'C' dark green circle avatar + warm peach speech bubble with pointer tail + terracotta journey quote
 * - Suggested Questions:
 *     Row 1: [What does today look like?] (dark green filled) [Plan next week] [Order today for focus]
 *     Row 2: [What can they do independently?] [What should we prioritize?]
 *     Row 3: [We’re short on time today]
 * - Bottom Card: Message input field with "Message your coach about Student..." + green circular send button with white up arrow
 * - Fixed height layout: Outer container never expands when messages are sent; inner chat area scrolls smoothly.
 */
export default function CoachView({ onBackToHome, onUpgradeClick }) {
  const [selectedStudent, setSelectedStudent] = useState('Student 1');
  const [selectedSuggestion, setSelectedSuggestion] = useState('What does today look like?');
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const coachName = (() => {
    try {
      return localStorage.getItem('tabula_coach_name') || '';
    } catch (e) {
      return '';
    }
  })();

  const suggestions = [
    { text: 'What does today look like?' },
    { text: 'Plan next week' },
    { text: 'Order today for focus' },
    { text: 'What can they do independently?' },
    { text: 'What should we prioritize?' },
    { text: 'We’re short on time today' },
  ];

  const sampleResponses = {
    'What does today look like?': `Here is the suggested learning flow for ${selectedStudent} today:

1. **Math (30 mins)**: Singapore Math lesson 14 — multi-digit practice.
2. **Short Break (10 mins)**: Movement & hydration.
3. **Reading & Discussion (35 mins)**: Chapter 3 historical literature.
4. **Independent Work (20 mins)**: Nature journal entry & handwriting.

Total focused time: ~1 hour 35 mins. Would you like to adjust any pacing?`,
    'Plan next week': `For next week with ${selectedStudent}, I recommend spreading core subjects across Monday–Thursday (4 active lesson days) and keeping Friday flexible for hands-on review, field exploration, and reading catch-up.`,
    'Order today for focus': `To optimize ${selectedStudent}'s focus today, start with Math first while mental energy is at its peak. Follow with a 15-minute screen-free pause, then dive into literature reading before lunch.`,
    'What can they do independently?': `${selectedStudent} is ready to handle independent handwriting practice, chapter silent reading (20 mins), and the second half of today's math worksheet without direct oversight.`,
    'What should we prioritize?': `If time or energy is constrained today, prioritize math comprehension and reading aloud together. History discussion and spelling review can safely shift to tomorrow.`,
    'We’re short on time today': `No worries at all! Here is a 40-minute high-yield power block for ${selectedStudent}:
• 20 mins: 5 key math problems (concept check)
• 20 mins: Read-aloud & quick verbal narration.
Everything else is on pause without falling behind!`,
  };

  const handleSelectSuggestion = (text) => {
    setSelectedSuggestion(text);
    setInputText(text);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    const query = inputText.trim();
    if (!query) return;

    const newMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const savedSteps = JSON.parse(sessionStorage.getItem('tabula_getting_started_steps') || '{}');
      savedSteps[4] = true;
      sessionStorage.setItem('tabula_getting_started_steps', JSON.stringify(savedSteps));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('tabula_step_completed', { detail: { step: 4 } }));
    } catch {}

    setTimeout(() => {
      const replyText =
        sampleResponses[query] ||
        `That's a great question about teaching ${selectedStudent}. Homeschooling is all about tailoring the rhythm to your family's unique day. I recommend breaking this into manageable 20-minute chunks with celebratory pauses in between. Would you like a concrete schedule template?`;

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'coach',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  useEffect(() => {
    if (chatMessages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  return (
    <div className="flex h-full w-full flex-col justify-between pt-3 pb-3 px-3.5 sm:px-4 overflow-hidden">
      {/* ================================================================
          1. TOP FIXED HEADER SECTION (Trial banner + Coach title + Students)
          ================================================================ */}
      <div className="shrink-0">
        {/* Trial row: Free trial — 14 days left + Upgrade → */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#b56038]">
            Free trial — 14 days left
          </span>
          <button
            type="button"
            onClick={onUpgradeClick}
            className="rounded-lg border border-[#8a9992] bg-white/40 px-3 py-0.5 text-[11.5px] font-semibold text-[#1c2e32] hover:bg-white transition-colors cursor-pointer"
          >
            Upgrade →
          </button>
        </div>

        {/* Page title row: Circular Back Arrow + Coach Title + Subtitle */}
        <div className="mb-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ded5c8] bg-white text-[#1c2e32] hover:bg-[#faf7f0] transition-colors shadow-2xs cursor-pointer"
            aria-label="Go back to Home"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <div>
            <h1 className="font-lora text-[22px]  font-semibold leading-tight text-[#212C3E]">
              Coach
            </h1>
            <p className="text-[12px]  font-semibold text-[#685949]">
              Here to help with your homeschool
            </p>
          </div>
        </div>

        {/* Student Selection Pills: Student 1 & Student 2 */}
        <div className="mb-3 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setSelectedStudent('Student 1')}
            className={`rounded-full px-3.5 py-1 text-[12px] font-semibold transition-all cursor-pointer ${selectedStudent === 'Student 1'
                ? 'border border-[#175b42] bg-[#dcf1e7] text-[#175b42]'
                : 'border border-[#df8c75] bg-transparent text-[#b65a3c] hover:bg-white'
              }`}
          >
            Student 1
          </button>
          <button
            type="button"
            onClick={() => setSelectedStudent('Student 2')}
            className={`rounded-full px-3.5 py-1 text-[12px] font-semibold transition-all cursor-pointer ${selectedStudent === 'Student 2'
                ? 'border border-[#175b42] bg-[#dcf1e7] text-[#175b42]'
                : 'border border-[#df8c75] bg-transparent text-[#b65a3c] hover:bg-white'
              }`}
          >
            Student 2
          </button>
        </div>
      </div>

      {/* ================================================================
          2. SCROLLABLE MIDDLE CHAT AREA (Welcome + Suggested Questions + Chat)
          ================================================================ */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-0.5 space-y-4 py-1">
        {/* Coach Welcome Speech Bubble (Hero Message) */}
        <div className="flex items-start gap-3">
          {/* Avatar Circle */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#156e48] text-lg font-bold text-white shadow-2xs font-serif select-none">
            {coachName ? coachName.trim().charAt(0).toUpperCase() : 'C'}
          </div>

          {/* Speech Bubble Card - Matched to Figma */}
          <div className="relative w-[82%] sm:w-[78%] max-w-[430px] rounded-[18px] bg-[#fedebb] p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            {/* Triangular pointer notch on the left */}
            <div
              className="absolute -left-2 top-4 h-0 w-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-[#fedebb]"
              aria-hidden="true"
            />

            <p className="text-[13px] sm:text-[13.5px] font-medium leading-relaxed text-[#22333b]">
              Hi! I'm {coachName ? coachName : 'your homeschool coach'}. Ask me anything about teaching {selectedStudent}, planning your week, or a subject that's giving you trouble — or tap a suggestion to start.
            </p>
            <p className="mt-3 text-[13px] sm:text-[13.5px] font-semibold text-[#b85b37]">
              I'm here to support your unique learning journey.
            </p>
          </div>
        </div>

        {/* Suggested Questions Section */}
        <div>
          <h2 className="mb-2.5 text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-[#22353c]">
            SUGGESTED QUESTIONS
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {suggestions.map((suggestion) => {
              const isSelected = selectedSuggestion === suggestion.text;
              return (
                <button
                  key={suggestion.text}
                  type="button"
                  onClick={() => handleSelectSuggestion(suggestion.text)}
                  className={`rounded-full px-4 py-2 text-[12.5px] sm:text-[13px] transition-all cursor-pointer ${isSelected
                      ? 'bg-[#156e48] text-white font-semibold shadow-2xs border border-transparent'
                      : 'bg-white border border-[#ded5c8] text-[#203138] font-medium shadow-2xs hover:bg-[#faf7f0] hover:border-[#cfc6b8]'
                    }`}
                >
                  {suggestion.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Chat Messages Stream (Same size box as the hero message above) */}
        {chatMessages.length > 0 && (
          <div className="space-y-4 pt-2">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
              >
                {msg.sender === 'coach' ? (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#156e48] text-lg font-bold text-white shadow-2xs font-serif select-none">
                    C
                  </div>
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#203137] text-sm font-bold text-white shadow-2xs select-none">
                    You
                  </div>
                )}

                <div
                  className={`relative w-[82%] sm:w-[78%] max-w-[430px] rounded-[18px] p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-[13px] sm:text-[13.5px] font-medium leading-relaxed whitespace-pre-line ${msg.sender === 'user'
                      ? 'bg-[#156e48] text-white'
                      : 'bg-[#fedebb] text-[#22333b]'
                    }`}
                >
                  {/* Triangular pointer notch */}
                  {msg.sender === 'coach' ? (
                    <div
                      className="absolute -left-2 top-4 h-0 w-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-[#fedebb]"
                      aria-hidden="true"
                    />
                  ) : (
                    <div
                      className="absolute -right-2 top-4 h-0 w-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-[#156e48]"
                      aria-hidden="true"
                    />
                  )}

                  {msg.text}
                  <div
                    className={`mt-2 text-[10px] font-medium ${msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#8b5536]'
                      }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {/* Coach typing indicator */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#156e48] text-lg font-bold text-white shadow-2xs font-serif select-none">
                  C
                </div>
                <div className="relative rounded-[18px] bg-[#fedebb] px-5 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center gap-1.5">
                  <div
                    className="absolute -left-2 top-4 h-0 w-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-[#fedebb]"
                    aria-hidden="true"
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-[#b85b37] animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-[#b85b37] animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-[#b85b37] animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* ================================================================
          3. BOTTOM FIXED INPUT CARD (Exact match to Figma reference)
          ================================================================ */}
      <div className="shrink-0 pt-2">
        <div className="rounded-[22px] border border-[#ded5c8] bg-white p-3 sm:p-3.5 shadow-sm">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message your coach about Student..."
                className="w-full rounded-[14px] border border-[#ded5c8] bg-white px-4 py-3 sm:py-3.5 text-[13.5px] text-[#1e282d] placeholder-[#64747b] focus:outline-none focus:border-[#156e48] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#156e48] text-white shadow-[0_4px_16px_rgba(21,110,72,0.35)] hover:bg-[#11583a] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
              aria-label="Send message"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}