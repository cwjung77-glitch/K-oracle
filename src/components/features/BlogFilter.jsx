'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BlogFilter({ posts }) {
  const [filter, setFilter] = useState('All');

  // Determine categories based on tags. 
  // If a post has "Personal Color", "Color", or "Beauty" tag, it goes to Personal Color.
  // Otherwise it goes to Saju.
  const categorizedPosts = posts.map(post => {
    const isBeauty = post.tags?.some(tag => 
      tag.toLowerCase().includes('color') || tag.toLowerCase().includes('beauty') || tag.toLowerCase().includes('makeup')
    );
    return { ...post, category: isBeauty ? 'Personal Color' : 'Saju' };
  });

  const filteredPosts = categorizedPosts.filter(post => {
    if (filter === 'All') return true;
    return post.category === filter;
  });

  return (
    <>
      <div className="flex justify-center gap-4 mb-12">
        {['All', 'Saju', 'Personal Color'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 border ${
              filter === cat
                ? cat === 'Personal Color' 
                  ? 'bg-pink-500/20 border-pink-500 text-pink-400' 
                  : 'bg-yellow-500/20 border-yellow-500 text-yellow-500'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
            }`}
          >
            {cat === 'All' ? 'All Posts' : cat === 'Saju' ? '🔮 Saju & Destiny' : '💄 Personal Color'}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center text-zinc-500 py-12">No posts found for this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
              <div className={`bg-zinc-900/40 border border-white/10 rounded-3xl p-8 h-full hover:bg-zinc-800/60 transition-all duration-300 ${
                post.category === 'Personal Color' ? 'hover:border-pink-500/50' : 'hover:border-yellow-500/50'
              }`}>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {post.tags?.map(tag => (
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
                <h2 className={`text-2xl font-black mb-3 transition-colors line-clamp-2 ${
                  post.category === 'Personal Color' ? 'group-hover:text-pink-400' : 'group-hover:text-yellow-400'
                }`}>
                  {post.title}
                </h2>
                <p className="text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm font-bold text-zinc-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
