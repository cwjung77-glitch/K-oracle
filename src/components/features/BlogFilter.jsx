'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, Sparkles, ChevronDown } from 'lucide-react';

const PAGE_SIZE = 24;

export default function BlogFilter({ posts }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLang, setUserLang] = useState('en');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const saved = localStorage.getItem('kOracleLang');
    if (saved) setUserLang(saved);
  }, []);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter, searchQuery, userLang]);

  const filteredPosts = useMemo(() => {
    const baseMap = new Map();

    posts.forEach((post) => {
      const match = post.slug.match(/(.+)-(en|es|th|id|ja|de|it|pt|pl|ru|vi|fr)$/);
      const base = match ? match[1] : post.slug;
      const lang = match ? match[2] : 'en';
      if (!baseMap.has(base)) baseMap.set(base, {});
      baseMap.get(base)[lang] = post;
    });

    const languageFiltered = [];
    for (const [, variants] of baseMap.entries()) {
      if (variants[userLang]) languageFiltered.push(variants[userLang]);
      else if (variants['en']) languageFiltered.push(variants['en']);
      else languageFiltered.push(Object.values(variants)[0]);
    }

    const q = searchQuery.trim().toLowerCase();

    return languageFiltered
      .map((post) => {
        const isBeauty = post.tags?.some((tag) => {
          const tl = tag.toLowerCase();
          return tl.includes('color') || tl.includes('beauty') || tl.includes('makeup') || tl.includes('warm') || tl.includes('cool');
        }) || post.slug.includes('personal-color');
        return { ...post, category: isBeauty ? 'Personal Color' : 'Saju' };
      })
      .filter((post) => {
        if (filter !== 'All' && post.category !== filter) return false;
        if (!q) return true;
        return (
          post.title?.toLowerCase().includes(q) ||
          post.excerpt?.toLowerCase().includes(q) ||
          post.slug?.toLowerCase().includes(q) ||
          post.tags?.some((t) => t.toLowerCase().includes(q))
        );
      });
  }, [posts, userLang, filter, searchQuery]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <>
      {/* Real-Time Search & Category Filter Bar */}
      <div className="max-w-2xl mx-auto mb-10 space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search K-Pop idols, groups (BTS, SEVENTEEN, ATEEZ, NewJeans...), Saju, or Personal Color..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500/60 transition-colors shadow-xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-full"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {['All', 'Saju', 'Personal Color'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${
                filter === cat
                  ? cat === 'Personal Color'
                    ? 'bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.2)]'
                    : 'bg-yellow-500/20 border-yellow-500 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.2)]'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat === 'All' ? `All Topics (${filteredPosts.length})` : cat === 'Saju' ? '🔮 Saju & Destiny' : '🎨 K-Beauty Personal Color'}
            </button>
          ))}
        </div>
      </div>

      {displayedPosts.length === 0 ? (
        <div className="text-center text-zinc-500 py-16 bg-zinc-900/30 rounded-3xl border border-white/5">
          <Sparkles className="mx-auto mb-3 text-zinc-600" size={32} />
          <p className="text-lg font-bold text-zinc-400">No matching articles found for &ldquo;{searchQuery}&rdquo;</p>
          <p className="text-sm text-zinc-600 mt-1">Try searching another K-Pop group or idol name.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
                <div
                  className={`bg-zinc-900/40 border border-white/10 rounded-3xl p-8 h-full hover:bg-zinc-800/60 transition-all duration-300 flex flex-col justify-between ${
                    post.category === 'Personal Color' ? 'hover:border-pink-500/50' : 'hover:border-yellow-500/50'
                  }`}
                >
                  <div>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                            post.category === 'Personal Color'
                              ? 'bg-pink-500/10 text-pink-400'
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2
                      className={`text-2xl font-black mb-3 transition-colors line-clamp-2 ${
                        post.category === 'Personal Color' ? 'group-hover:text-pink-400' : 'group-hover:text-yellow-400'
                      }`}
                    >
                      {post.title}
                    </h2>
                    <p className="text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-zinc-500 pt-4 border-t border-white/5">
                    <span>{post.author || 'K-Oracle'}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {visibleCount < filteredPosts.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white font-black transition-all shadow-xl"
              >
                Load More Cosmic Insights ({filteredPosts.length - visibleCount} remaining)
                <ChevronDown size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
