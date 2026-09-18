'use client';

import { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';

// Simple deterministic hash function based on a string
function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default function BlogEngagement({ title, slug }) {
  const [reactions, setReactions] = useState({ heart: 0, fire: 0, sparkle: 0, shock: 0 });
  const [userReaction, setUserReaction] = useState(null); // 'heart', 'fire', 'sparkle', 'shock', or null

  useEffect(() => {
    // 1. Generate consistent fake numbers based on the article's slug
    const hash = getHash(slug || 'default');
    
    // Use modulo to keep numbers in realistic ranges
    const baseReactions = {
      heart: 120 + (hash % 50),     // 120 ~ 169
      fire: 80 + ((hash * 2) % 30), // 80 ~ 109
      sparkle: 90 + ((hash * 3) % 40), // 90 ~ 129
      shock: 20 + ((hash * 4) % 15)    // 20 ~ 34
    };

    // 2. Check if this specific user has reacted to this specific post before
    const savedReaction = localStorage.getItem(`reaction_${slug}`);
    
    if (savedReaction) {
      setUserReaction(savedReaction);
      // Add +1 to the base number for the reaction they chose
      baseReactions[savedReaction] += 1;
    }
    
    setReactions(baseReactions);
  }, [slug]);

  const handleReact = (type) => {
    // If they already reacted, don't let them spam click
    if (userReaction) return;

    // Immediately increment the clicked reaction
    setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
    setUserReaction(type);
    
    // Save to browser so it remembers if they refresh
    localStorage.setItem(`reaction_${slug}`, type);
  };

  const handleShare = async (platform) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `Check out this cosmic Saju analysis: ${title}`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'native') {
      if (navigator.share) {
        navigator.share({ title, text: shareText, url });
      } else {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    }
  };

  return (
    <div className="py-10 mt-10 border-t border-zinc-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Emoji Reactions */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="text-zinc-400 font-bold text-sm uppercase tracking-wider">React to this analysis</span>
          <div className="flex gap-4">
            <button onClick={() => handleReact('heart')} className={`flex flex-col items-center gap-1 group transition-all ${userReaction === 'heart' ? 'scale-110' : userReaction ? 'opacity-50 grayscale' : 'hover:scale-110'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${userReaction === 'heart' ? 'bg-red-500/20 border-red-500 border-2' : 'bg-zinc-900 border border-zinc-800 group-hover:border-red-500'}`}>❤️</div>
              <span className={`text-xs font-mono ${userReaction === 'heart' ? 'text-red-400 font-bold' : 'text-zinc-500'}`}>{reactions.heart}</span>
            </button>
            <button onClick={() => handleReact('fire')} className={`flex flex-col items-center gap-1 group transition-all ${userReaction === 'fire' ? 'scale-110' : userReaction ? 'opacity-50 grayscale' : 'hover:scale-110'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${userReaction === 'fire' ? 'bg-orange-500/20 border-orange-500 border-2' : 'bg-zinc-900 border border-zinc-800 group-hover:border-orange-500'}`}>🔥</div>
              <span className={`text-xs font-mono ${userReaction === 'fire' ? 'text-orange-400 font-bold' : 'text-zinc-500'}`}>{reactions.fire}</span>
            </button>
            <button onClick={() => handleReact('sparkle')} className={`flex flex-col items-center gap-1 group transition-all ${userReaction === 'sparkle' ? 'scale-110' : userReaction ? 'opacity-50 grayscale' : 'hover:scale-110'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${userReaction === 'sparkle' ? 'bg-yellow-500/20 border-yellow-500 border-2' : 'bg-zinc-900 border border-zinc-800 group-hover:border-yellow-500'}`}>✨</div>
              <span className={`text-xs font-mono ${userReaction === 'sparkle' ? 'text-yellow-400 font-bold' : 'text-zinc-500'}`}>{reactions.sparkle}</span>
            </button>
            <button onClick={() => handleReact('shock')} className={`flex flex-col items-center gap-1 group transition-all ${userReaction === 'shock' ? 'scale-110' : userReaction ? 'opacity-50 grayscale' : 'hover:scale-110'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${userReaction === 'shock' ? 'bg-blue-500/20 border-blue-500 border-2' : 'bg-zinc-900 border border-zinc-800 group-hover:border-blue-500'}`}>😲</div>
              <span className={`text-xs font-mono ${userReaction === 'shock' ? 'text-blue-400 font-bold' : 'text-zinc-500'}`}>{reactions.shock}</span>
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <span className="text-zinc-400 font-bold text-sm uppercase tracking-wider">Share with fandom</span>
          <div className="flex gap-3">
            <button onClick={() => handleShare('twitter')} className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-[#1DA1F2] hover:text-white transition-colors font-bold text-sm flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              X / Twitter
            </button>
            <button onClick={() => handleShare('facebook')} className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-[#1877F2] hover:text-white transition-colors font-bold text-sm flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
            <button onClick={() => handleShare('native')} className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-700 transition-colors font-bold text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
