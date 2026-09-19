import React, { useState } from 'react';
import ResourceDirectoryView  from './ResourceDirectoryView';
import ResourceCommunityView  from './ResourceCommunityView';

/**
 * ResourceLibraryView — shell component.
 *
 * Owns:
 *  • Free trial banner
 *  • Page header (back arrow + title)
 *  • Directory / Community Reviews tab switcher
 *  • Shared search bar (passed down as props)
 *
 * Delegates content to:
 *  • ResourceDirectoryView  — Directory tab
 *  • ResourceCommunityView  — Community Reviews tab
 */
export default function ResourceLibraryView({ onBackToHome, onUpgradeClick }) {
  const [activeTab,    setActiveTab]    = useState('community');
  const [searchQuery,  setSearchQuery]  = useState('');

  const isDirectory = activeTab === 'directory';

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery(''); // reset search when switching tabs
  };

  return (
    <div className="mx-auto w-full max-w-[960px] lg:max-w-[1024px] px-4 sm:px-8 pb-36">

      {/* ══════════════════════════════════════════════
          FREE TRIAL BANNER
          ══════════════════════════════════════════════ */}
      <div className="flex items-center justify-between border-b border-[#e9e2d5] py-2.5">
        <span className="text-[12px] font-semibold text-[#bf643e]">
          Free trial — 14 days left
        </span>
        <button
          type="button"
          onClick={onUpgradeClick}
          className="rounded-lg border border-[#d0c8b9] bg-white px-3.5 py-1.5 text-[11px] font-bold text-[#172b30] hover:bg-[#faf5eb] transition-colors cursor-pointer shadow-2xs"
        >
          Upgrade →
        </button>
      </div>

      <div className="pt-5">
        {/* ══════════════════════════════════════════════
            PAGE HEADER
            ══════════════════════════════════════════════ */}
        <div className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d0c8b9] bg-white text-[#172b30] hover:bg-[#faf5eb] transition-colors cursor-pointer shadow-2xs"
            aria-label="Go back"
          >
            ←
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#172b30] leading-tight">
              Resource Library
            </h1>
            <p className="text-[11.5px] text-[#526068]">
              135+ curated resources plus community curriculum reviews.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TAB SWITCHER
            ══════════════════════════════════════════════ */}
        <div className="mb-4 flex rounded-2xl border border-[#e9e2d5] bg-white p-1.5 shadow-2xs">
          <button
            type="button"
            onClick={() => handleTabChange('directory')}
            className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer ${
              isDirectory
                ? 'bg-white text-[#172b30] shadow-sm border border-[#e9e2d5]'
                : 'text-[#526068] hover:text-[#172b30]'
            }`}
          >
            Directory
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('community')}
            className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer ${
              !isDirectory
                ? 'bg-[#bf643e] text-white shadow-sm'
                : 'text-[#526068] hover:text-[#172b30]'
            }`}
          >
            Community Reviews
          </button>
        </div>

        {/* ══════════════════════════════════════════════
            ACTIVE PAGE CONTENT
            ══════════════════════════════════════════════ */}
        {isDirectory ? (
          <ResourceDirectoryView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        ) : (
          <ResourceCommunityView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
      </div>
    </div>
  );
}
