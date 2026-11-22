'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Sparkles } from 'lucide-react';

export default function IdolDirectoryClient({ groupedIdols, sortedGroups, totalCount }) {
  const [query, setQuery] = useState('');

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedGroups.map((g) => ({ group: g, members: groupedIdols[g] }));

    const result = [];
    sortedGroups.forEach((group) => {
      const groupMatches = group.toLowerCase().includes(q);
      const matchingMembers = groupedIdols[group].filter(
        (m) => groupMatches || m.member.toLowerCase().includes(q) || m.dob?.includes(q)
      );
      if (matchingMembers.length > 0) {
        result.push({ group, members: matchingMembers });
      }
    });
    return result;
  }, [query, groupedIdols, sortedGroups]);

  return (
    <>
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${totalCount} K-Pop idols or groups (e.g. BTS, SEVENTEEN, ATEEZ, WayV, NewJeans)...`}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900/90 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition-colors shadow-xl"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-full"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 rounded-3xl border border-zinc-800">
          <Sparkles className="mx-auto mb-3 text-zinc-600" size={32} />
          <p className="text-lg font-bold text-zinc-400">No idols found matching &ldquo;{query}&rdquo;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGroups.map(({ group, members }) => (
            <div key={group} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 hover:border-yellow-500/30 transition-colors">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
                <h2 className="text-2xl font-black text-yellow-500">{group}</h2>
                <span className="text-xs font-bold text-zinc-500 bg-zinc-800/80 px-2.5 py-1 rounded-full">
                  {members.length} {members.length === 1 ? 'Idol' : 'Idols'}
                </span>
              </div>
              <ul className="space-y-2.5">
                {members.map((idol) => (
                  <li key={idol.slug} className="flex items-center justify-between">
                    <Link
                      href={`/idols/${idol.slug}`}
                      className="text-zinc-200 hover:text-white hover:underline decoration-yellow-500 underline-offset-4 transition-all font-medium"
                    >
                      {idol.member}
                    </Link>
                    <span className="text-xs font-mono text-zinc-500">{idol.dob}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
