import React, { useState, useRef, useEffect } from 'react';

/**
 * CoachView component matching Tabula's Homeschool Coach interface.
 * Exact 1:1 pixel-perfect match to user's design reference:
 * - Top Trial Banner: "Free trial — 14 days left" (terracotta) + "Upgrade →" (pill button)
 * - Header: Circle Back Button + "Coach" (serif) + "Here to help with your homeschool"
 * - Student selection: "Student 1" (active sage/green) + "Student 2" (coral outline)
 * - Coach Welcome message: 'C' dark green circle avatar + warm peach speech bubble with pointer tail + terracotta journey quote
 * - Suggested Questions:
 *     Row 1: [What does today look like?] (dark green filled) [Plan next week] [Order today for focus]
 *     Row 2: [What can they do independently?] [What should we prioritize?]
 *     Row 3: [We’re short on time today]
 * - Bottom Card: Message input field with "Message your coach about Student..." + green circular send button with white up arrow
 * - Perfectly positioned above the bottom navigation bar
 */
export default function CoachView({ onBackToHome, onUpgradeClick }) {
  const [selectedStudent, setSelectedStudent] = useState('Student 1');
  const [selectedSuggestion, setSelectedSuggestion] = useState('What does today look like?');
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

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

    const newMsg = { sender: 'user', text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = sampleResponses[query] || 
        `That's a great question about teaching ${selectedStudent}. Homeschooling is all about tailoring the rhythm to your family's unique day. I recommend breaking this into manageable 20-minute chunks with celebratory pauses in between. Would you like a concrete schedule template?`;
      
      setChatMessages(prev => [
        ...prev, 
        { sender: 'coach', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
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
    <div className="mx-auto w-full max-w-[640px] pb-32 pt-4 px-3.5 sm:px-4 transition-all">
      {/* ================================================================
          1. TOP TRIAL BANNER (Free trial — 14 days left + Upgrade →)
          ================================================================ */}
      <div className="mb-4 flex items-center justify-between border-b border-[#e9e2d5] pb-2.5">
        <span className="text-[11px] font-semibold text-[#b9613b]">
          Free trial — 14 days left
        </span>
        <button 
          type="button"
          onClick={onUpgradeClick}
          className="rounded-md border border-[#bac7bf] bg-white/70 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#184635] hover:bg-white transition-colors shadow-2xs cursor-pointer"
        >
          Upgrade →
        </button>
      </div>

      {/* ================================================================
          2. PAGE HEADER (Circle Back Arrow + Coach Title + Subtitle)
          ================================================================ */}
      <div className="mb-3.5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d6cec2] bg-[#faf7f0] text-[#1e282d] hover:bg-white transition-colors shadow-2xs cursor-pointer"
          aria-label="Go back to Home"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div>
          <h1 className="font-serif text-[22px] sm:text-[24px] font-bold leading-tight text-[#16272b]">
            Coach
          </h1>
          <p className="text-[11px] sm:text-[11.5px] font-medium text-[#526068]">
            Here to help with your homeschool
          </p>
        </div>
      </div>

      {/* ================================================================
          3. STUDENT SELECTION PILLS (Student 1 & Student 2)
          ================================================================ */}
      <div className="mb-4 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setSelectedStudent('Student 1')}
          className={`rounded-full px-3.5 py-1 text-[12px] font-semibold transition-all cursor-pointer ${
            selectedStudent === 'Student 1'
              ? 'border border-[#14533c] bg-[#dcf1e7] text-[#14533c]'
              : 'border border-[#df8569] bg-[#faf7f0] text-[#b65a3c] hover:bg-white'
          }`}
        >
          Student 1
        </button>
        <button
          type="button"
          onClick={() => setSelectedStudent('Student 2')}
          className={`rounded-full px-3.5 py-1 text-[12px] font-semibold transition-all cursor-pointer ${
            selectedStudent === 'Student 2'
              ? 'border border-[#14533c] bg-[#dcf1e7] text-[#14533c]'
              : 'border border-[#df8569] bg-[#faf7f0] text-[#b65a3c] hover:bg-white'
          }`}
        >
          Student 2
        </button>
      </div>

      {/* ================================================================
          4. COACH WELCOME SPEECH BUBBLE (Hero Message)
          ================================================================ */}
      <div className="mb-5 flex items-start gap-3">
        {/* Coach Avatar Circle */}
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#135338] text-base sm:text-lg font-bold text-white shadow-2xs font-serif select-none">
          C
        </div>

        {/* Speech Bubble with triangular tail */}
        <div className="relative flex-1 rounded-2xl bg-[#fedebc] p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
          {/* Triangular pointer notch on the left */}
          <div 
            className="absolute -left-2 top-3.5 h-0 w-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-[#fedebc]" 
            aria-hidden="true" 
          />

          <p className="text-[13px] sm:text-[13.5px] font-medium leading-relaxed text-[#22333b]">
            Hi! I'm your homeschool coach. Ask me anything about teaching Student, planning your week, or a subject that's giving you trouble — or tap a suggestion to start.
          </p>
          <p className="mt-2.5 text-[13px] sm:text-[13.5px] font-semibold text-[#be5f39]">
            I'm here to support your unique learning journey.
          </p>
        </div>
      </div>

      {/* ================================================================
          5. SUGGESTED QUESTIONS
          ================================================================ */}
      <div className="mb-5">
        <h2 className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#24373e]">
          Suggested Questions
        </h2>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => {
            const isSelected = selectedSuggestion === suggestion.text;
            return (
              <button
                key={suggestion.text}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion.text)}
                className={`rounded-full px-3.5 py-1.5 text-[12px] sm:text-[12.5px] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#135338] text-white font-semibold shadow-2xs border border-transparent'
                    : 'bg-white border border-[#d8d0c4] text-[#203137] font-medium shadow-2xs hover:bg-[#faf7f2] hover:border-[#c5bcb0]'
                }`}
              >
                {suggestion.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================================================
          DYNAMIC CHAT MESSAGES (If user sends messages)
          ================================================================ */}
      {chatMessages.length > 0 && (
        <div className="mb-5 space-y-3.5 pt-1">
          {chatMessages.map((msg, index) => (
            <div 
              key={index}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {msg.sender === 'coach' ? (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#135338] text-sm font-bold text-white shadow-2xs font-serif">
                  C
                </div>
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#203137] text-xs font-bold text-white shadow-2xs">
                  You
                </div>
              )}

              <div 
                className={`relative max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-[13px] leading-relaxed shadow-2xs whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-[#155e42] text-white font-medium rounded-tr-sm'
                    : 'bg-[#fedebc] text-[#22333b] font-medium rounded-tl-sm'
                }`}
              >
                {msg.text}
                <div className={`mt-1 text-[10px] ${msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#8b5536]'}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#135338] text-sm font-bold text-white shadow-2xs font-serif">
                C
              </div>
              <div className="rounded-2xl bg-[#fedebc] px-3.5 py-2.5 shadow-2xs flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#be5f39] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[#be5f39] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[#be5f39] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* ================================================================
          6. BOTTOM INPUT CARD (Exact match to screenshot)
          ================================================================ */}
      <div className="mt-6 rounded-2xl border border-[#ded5c8] bg-white p-3 sm:p-3.5 shadow-sm">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message your coach about Student..."
              className="w-full rounded-xl border border-[#ded5c8] bg-white px-3.5 py-2.5 sm:py-3 text-[13px] sm:text-[13.5px] text-[#1e282d] placeholder-[#6b7c85] focus:outline-none focus:border-[#155e42] transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#156c47] text-white shadow-[0_4px_14px_rgba(21,108,71,0.35)] hover:bg-[#115839] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
