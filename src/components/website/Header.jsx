import React from 'react';

/**
 * Reusable Header component matching Tabula's design.
 * Located in src/components/website/Header.jsx
 * 
 * Props:
 * - onLogoClick: function called when clicking the Tabula logo (default navigates home)
 * - onAccountClick: function called when clicking Account button
 * - onPrivacyClick: function called when clicking Privacy button
 * - className: additional wrapper classes
 */
export default function Header({
  onLogoClick,
  onAccountClick,
  onPrivacyClick,
  className = '',
}) {
  const handleAction = (callback) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    callback?.();
  };

  return (
    <header
      className={`w-full max-w-[768px] h-[88px] border-b border-[#e8ded0] bg-[#faf7f0] px-6 py-4 transition-all ${className}`}
    >
      <div className="flex w-full items-center justify-between transition-all">
        {/* Left: Tabula Brand & Subtitle */}
        <div
          className="cursor-pointer select-none"
          onClick={() => handleAction(onLogoClick)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAction(onLogoClick); }}
        >
          <div className="flex items-baseline">
            <span
              style={{ fontFamily: 'Lora, serif' }}
              className="text-[30px] font-semibold leading-[100%] tracking-[0%] text-[#212C3E]"
            >
              Tabula
            </span>
            <span
              style={{ fontFamily: 'Lora, serif' }}
              className="text-[32px] font-bold leading-[100%] tracking-[0%] text-[#126041]"
            >
              .
            </span>
          </div>
          <p className="font-inter text-[14px] font-semibold leading-[16px] tracking-[0.3px] align-middle text-[#685949]">
            Classical • Secular
          </p>
        </div>

        {/* Right: Account & Privacy Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleAction(onAccountClick)}
            className="rounded-lg border border-[#d5ccc0] bg-white px-3 py-1 text-[13px] font-semibold text-[#4E7A5B] hover:bg-[#faf6ee] transition-colors shadow-2xs cursor-pointer"
          >
            Account
          </button>
          <button
            type="button"
            onClick={() => handleAction(onPrivacyClick)}
            className="rounded-lg border border-[#d5ccc0] bg-white px-3 py-1 text-[13px] font-semibold text-[#4E7A5B] hover:bg-[#faf6ee] transition-colors shadow-2xs cursor-pointer"
          >
            Privacy
          </button>
        </div>
      </div>
    </ header>
  );
}
