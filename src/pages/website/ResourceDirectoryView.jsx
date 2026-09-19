import React, { useState, useMemo } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const DIRECTORY_RESOURCES = [
  // Full Curriculum Packages
  { id: 1, name: 'Bookshark', category: 'Full Curriculum Packages', description: 'Literature-based secular homeschool curriculum using living books. Complete packages with instructor guides and schedules. Parent reads aloud daily.', tags: ['Parent-Led'], philosophies: ['Charlotte Mason', 'Classical'], faithTradition: 'Secular only', isFree: false, isNew: true },
  { id: 2, name: 'Time4Learning', category: 'Full Curriculum Packages', description: 'Online curriculum for PreK–12. Animated lessons, automatic grading, and progress reports. Child works independently on the computer.', tags: ['Virtual'], philosophies: ['Traditional'], faithTradition: 'Secular only', isFree: false, isNew: false },
  { id: 3, name: 'Outschool', category: 'Full Curriculum Packages', description: 'Live and on-demand classes taught by independent teachers. Wide variety of subjects and grade levels.', tags: ['Virtual'], philosophies: ['Traditional', 'Eclectic'], faithTradition: 'Secular only', isFree: false, isNew: true },
  { id: 4, name: 'Sonlight', category: 'Full Curriculum Packages', description: 'Literature-rich Christian curriculum built around daily read-alouds with the parent. Complete instructor guides included.', tags: ['Parent-Led'], philosophies: ['Charlotte Mason', 'Classical'], faithTradition: 'Christian', isFree: false, isNew: false },
  { id: 5, name: "My Father's World", category: 'Full Curriculum Packages', description: 'Bible-based unit study curriculum. Parent-led daily lessons integrating all subjects around one theme.', tags: ['Parent-Led'], philosophies: ['Unit Studies'], faithTradition: 'Christian', isFree: false, isNew: false },
  { id: 6, name: 'The Good and the Beautiful', category: 'Full Curriculum Packages', description: 'Beautiful curriculum with parent-led lessons and some independent student workbook time. Strong language arts and nature study.', tags: ['Both'], philosophies: ['Charlotte Mason', 'Classical'], faithTradition: 'Christian', isFree: false, isNew: false },
  { id: 7, name: 'Masterbooks', category: 'Full Curriculum Packages', description: 'Conversational textbook-style curriculum. Mix of independent reading and parent discussion. Very affordable.', tags: ['Both'], philosophies: ['Traditional', 'Classical'], faithTradition: 'Christian', isFree: false, isNew: false },
  { id: 8, name: 'Timberdoodle', category: 'Full Curriculum Packages', description: 'Kits combining hands-on manipulatives and independent workbooks. Mix of parent-led and self-directed activities.', tags: ['Both'], philosophies: ['Charlotte Mason', 'Eclectic'], faithTradition: 'Secular only', isFree: false, isNew: false },
  { id: 9, name: 'Abeka', category: 'Full Curriculum Packages', description: 'Traditional Christian textbook curriculum. Video school option allows child to watch recorded classroom lessons independently.', tags: ['Both'], philosophies: ['Traditional'], faithTradition: 'Christian', isFree: false, isNew: false },
  { id: 10, name: 'Bob Jones University Press (BJU)', category: 'Full Curriculum Packages', description: 'Academically rigorous Christian curriculum with full video school option — child watches recorded classroom teachers for each subject.', tags: ['Virtual'], philosophies: ['Traditional'], faithTradition: 'Christian', isFree: false, isNew: false },
  { id: 11, name: 'Veritas Press', category: 'Full Curriculum Packages', description: 'Classical Christian curriculum. Self-paced online option available alongside traditional parent-led materials.', tags: ['Both'], philosophies: ['Classical'], faithTradition: 'Christian', isFree: false, isNew: false },
  // Virtual Learning
  { id: 12, name: 'Time4Learning', category: 'Virtual Learning', description: 'Complete online PreK–12 curriculum. Animated, self-paced lessons in all subjects with automatic scheduling. Child works fully independently.', tags: ['Virtual'], philosophies: ['Traditional'], faithTradition: 'Secular only', isFree: false, isNew: false },
  { id: 13, name: 'Outschool', category: 'Virtual Learning', description: 'Live small-group video classes on every subject taught by independent teachers. Flexible scheduling. Pay per class.', tags: ['Virtual'], philosophies: ['Eclectic'], faithTradition: 'Secular only', isFree: false, isNew: false },
  { id: 14, name: 'Khan Academy', category: 'Virtual Learning', description: 'Free practice exercises, instructional videos, and a personalized learning dashboard. Covers math, science, history, and more.', tags: ['Virtual'], philosophies: ['Traditional'], faithTradition: 'Secular only', isFree: true, isNew: false },
  { id: 15, name: 'Mystery Science', category: 'Virtual Learning', description: 'Open-and-go science lessons with minimal prep. Video-led lessons followed by hands-on activities.', tags: ['Virtual'], philosophies: ['Traditional', 'Charlotte Mason'], faithTradition: 'Secular only', isFree: false, isNew: false },
];

const PHILOSOPHY_OPTIONS = ['All', 'Classical', 'Charlotte Mason', 'Montessori', 'Traditional', 'Unit Studies', 'Eclectic'];
const FAITH_OPTIONS = ['All', 'Secular only', 'Christian', 'Catholic', 'Jewish', 'Islamic', 'Hindu', 'Buddhist', 'LDS'];
const LEARNING_STYLE_OPTIONS = ['All', 'Virtual', 'Parent-Led', 'Both'];

// ─── Private sub-components ───────────────────────────────────────────────────

function FilterChip({ label, active, onClick }) {
  return (<button
    type="button"
    onClick={onClick}
    className={`rounded-full px-3 py-1 text-[11.5px] font-semibold transition-all cursor-pointer border ${active
        ? 'bg-[#1b6b50] text-white border-[#1b6b50] shadow-sm hover:bg-[#14553f] active:scale-[0.99]'
        : 'bg-white text-[#37474c] border-[#ddd6c8] hover:border-[#1b6b50] hover:text-[#1b6b50] hover:bg-[#f7faf8] active:scale-[0.99]'
      }`}
  >
    {label}
  </button>
  );
}

function TagBadge({ label }) {
  const colors = {
    'Virtual': 'bg-[#e8f5ff] text-[#1565c0] border-[#bcd8f5]',
    'Parent-Led': 'bg-[#f0faf5] text-[#1b6b50] border-[#b2ddc8]',
    'Both': 'bg-[#fdf5e6] text-[#b06904] border-[#f0d8a0]',
    'Free': 'bg-[#f0faf5] text-[#1b6b50] border-[#b2ddc8]',
    'Christian': 'bg-[#f5f0fb] text-[#6d28d9] border-[#ddd0f5]',
    'Catholic': 'bg-[#f5f0fb] text-[#6d28d9] border-[#ddd0f5]',
  };
  const cls = colors[label] ?? 'bg-[#f5f0e8] text-[#526068] border-[#ddd6c8]';
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${cls}`}>
      {label}
    </span>
  );
}

function ResourceCard({ resource }) {
  return (
    <div className="flex flex-col rounded-xl border border-[#e9e2d5] bg-white p-4 shadow-2xs transition-all hover:shadow-xs hover:border-[#c8ddd4]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="font-serif text-sm font-bold text-[#172b30] leading-snug">
              {resource.name}
            </h3>
            {resource.isNew && (
              <span className="rounded bg-[#fdf5df] px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider text-[#b06904]">
                NEW
              </span>
            )}
            {resource.isFree && <TagBadge label="Free" />}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-1 justify-end">
          {resource.tags.map((t) => (
            <TagBadge key={t} label={t} />
          ))}
          {resource.faithTradition !== 'Secular only' && (
            <TagBadge label={resource.faithTradition} />
          )}
        </div>
      </div>

      <p className="mt-2 text-[11.5px] leading-relaxed text-[#526068]">
        {resource.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1">
        {resource.philosophies.map((p) => (
          <span
            key={p}
            className="rounded-md bg-[#f0ece4] px-2 py-0.5 text-[10px] font-medium text-[#526068]"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-[#e9e2d5] bg-white py-14 px-6 text-center shadow-2xs">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0ece4]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8c9b9f" strokeWidth="1.8">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <h3 className="font-serif text-base font-bold text-[#172b30]">No resources found</h3>
      <p className="mt-1 max-w-xs text-xs text-[#526068]">
        Try adjusting your filters or search terms.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 rounded-lg bg-[#1b6b50] px-5 py-2 text-xs font-semibold text-white hover:bg-[#14553f] transition-colors cursor-pointer"
      >
        Clear all filters
      </button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ResourceDirectoryView({ searchQuery, onSearchChange }) {
  const [learningStyle, setLearningStyle] = useState('All');
  const [philosophy, setPhilosophy] = useState('All');
  const [faithTradition, setFaithTradition] = useState('All');
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    return DIRECTORY_RESOURCES.filter((r) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !r.name.toLowerCase().includes(q) &&
          !r.description.toLowerCase().includes(q) &&
          !r.philosophies.join(' ').toLowerCase().includes(q)
        )
          return false;
      }
      if (learningStyle !== 'All' && !r.tags.includes(learningStyle)) return false;
      if (philosophy !== 'All' && !r.philosophies.includes(philosophy)) return false;
      if (faithTradition !== 'All' && r.faithTradition !== faithTradition) return false;
      if (freeOnly && !r.isFree) return false;
      return true;
    });
  }, [searchQuery, learningStyle, philosophy, faithTradition, freeOnly]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((r) => {
      if (!map[r.category]) map[r.category] = [];
      map[r.category].push(r);
    });
    return map;
  }, [filtered]);

  const clearFilters = () => {
    onSearchChange('');
    setLearningStyle('All');
    setPhilosophy('All');
    setFaithTradition('All');
    setFreeOnly(false);
  };

  return (
    <div>
      {/* ── Search Bar ── */}
      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-[#e9e2d5] bg-white px-3.5 py-2.5 shadow-2xs">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8c9b9f"
          strokeWidth="2.2"
          className="shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, subject, or keyword..."
          className="w-full bg-transparent text-xs text-[#2b3a3f] placeholder-[#9aa7ab] focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="text-[#9aa7ab] hover:text-[#526068] transition-colors cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Filters ── */}
      <div className="mb-5 space-y-3">
        <div>
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8c9b9f]">
            Learning style
          </p>
          <div className="flex flex-wrap gap-1.5">
            {LEARNING_STYLE_OPTIONS.map((opt) => (
              <FilterChip key={opt} label={opt} active={learningStyle === opt} onClick={() => setLearningStyle(opt)} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8c9b9f]">
            Philosophy
          </p>
          <div className="flex flex-wrap gap-1.5">
            {PHILOSOPHY_OPTIONS.map((opt) => (
              <FilterChip key={opt} label={opt} active={philosophy === opt} onClick={() => setPhilosophy(opt)} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8c9b9f]">
            Faith tradition
          </p>
          <div className="flex flex-wrap gap-1.5">
            {FAITH_OPTIONS.map((opt) => (
              <FilterChip key={opt} label={opt} active={faithTradition === opt} onClick={() => setFaithTradition(opt)} />
            ))}
          </div>
        </div>

        {/* Results bar */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setFreeOnly((v) => !v)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-semibold transition-all cursor-pointer ${freeOnly
                ? 'bg-[#1b6b50] text-white border-[#1b6b50]'
                : 'bg-white text-[#37474c] border-[#ddd6c8] hover:border-[#1b6b50]'
              }`}
          >
            <span className={freeOnly ? 'text-white' : 'text-[#1b6b50]'}>✓</span>
            Free only
          </button>
          <span className="text-[11.5px] font-semibold text-[#526068]">
            {filtered.length} Result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Grouped resource list ── */}
      {Object.keys(grouped).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <section key={category}>
              <h2 className="mb-3 font-serif text-base font-bold text-[#172b30] border-b border-[#e9e2d5] pb-1.5">
                {category}
              </h2>
              <div className="space-y-3">
                {items.map((r) => (
                  <ResourceCard key={`${r.id}-${r.category}`} resource={r} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <EmptyState onClear={clearFilters} />
      )}
    </div>
  );
}
