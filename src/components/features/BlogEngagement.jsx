'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Share2, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { idolsDB } from '@/data/idols';

function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default function BlogEngagement({ title, slug }) {
  const router = useRouter();
  const [reactions, setReactions] = useState({ heart: 0, fire: 0, sparkle: 0, shock: 0 });
  const [userReaction, setUserReaction] = useState(null);
  const [quickName, setQuickName] = useState('');
  const [quickDob, setQuickDob] = useState('');

  // Automatically detect which idol from idolsDB this blog post is about!
  const matchedIdol = useMemo(() => {
    const slugLower = (slug || '').toLowerCase();
    const titleLower = (title || '').toLowerCase();
    return (
      idolsDB.find((idol) => {
        const member = idol.name.split(' (')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
        const group = (idol.name.match(/\((.*?)\)/)?.[1] || '').toLowerCase().replace(/[^a-z0-9]/g, '-');
        return (
          (member.length >= 2 && slugLower.includes(member) && (!group || slugLower.includes(group))) ||
          (member.length >= 3 && titleLower.includes(idol.name.split(' (')[0].toLowerCase()))
        );
      }) || idolsDB[0]
    );
  }, [slug, title]);

  useEffect(() => {
    const hash = getHash(slug || 'default');
    const baseReactions = {
      heart: 120 + (hash % 50),
      fire: 80 + ((hash * 2) % 30),
      sparkle: 90 + ((hash * 3) % 40),
      shock: 20 + ((hash * 4) % 15),
    };

    const savedReaction = localStorage.getItem(`reaction_${slug}`);
    if (savedReaction) {
      setUserReaction(savedReaction);
      baseReactions[savedReaction] += 1;
    }
    setReactions(baseReactions);

    const savedName = localStorage.getItem('userName');
    const savedDob = localStorage.getItem('userDob');
    if (savedName) setQuickName(savedName);
    if (savedDob) setQuickDob(savedDob);
  }, [slug]);

  const handleReact = (type) => {
    if (userReaction) return;
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setUserReaction(type);
    localStorage.setItem(`reaction_${slug}`, type);
  };

  const handleShare = async (platform) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `Check out this cosmic Saju & K-Beauty analysis: ${title}`;

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

  const handleQuickCompatibility = (e) => {
    e.preventDefault();
    if (!quickDob) {
      alert('Please enter your birth date to test your compatibility!');
      return;
    }
    localStorage.setItem('userName', quickName || 'VIP Fan');
    localStorage.setItem('userDob', quickDob);
    localStorage.setItem('idolName', matchedIdol.name);
    localStorage.setItem('purchasedProduct', 'saju');
    router.push(`/?tab=saju&partnerName=${encodeURIComponent(matchedIdol.name)}&userDob=${encodeURIComponent(quickDob)}`);
  };

  return (
    <div className="py-10 mt-10 border-t border-zinc-800 space-y-10">
      {/* NEW FEATURE: 3-Second Inline Idol Compatibility Funnel Widget */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/50 via-zinc-900 to-fuchsia-950/40 border border-violet-500/40 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles size={13} /> 3-Second Instant Saju Match
            </div>
            <h3 className="text-2xl font-black text-white flex items-center gap-2 flex-wrap">
              Test Your Cosmic Compatibility with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">{matchedIdol.name}</span>
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Enter your birth date below to calculate your Korean Four Pillars synergy &amp; full group ranking with {matchedIdol.name}.
            </p>
          </div>
        </div>

        <form onSubmit={handleQuickCompatibility} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={quickName}
            onChange={(e) => setQuickName(e.target.value)}
            placeholder="Your Name (e.g. Sarah)"
            className="px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-violet-400"
          />
          <input
            type="date"
            value={quickDob}
            onChange={(e) => setQuickDob(e.target.value)}
            required
            className="px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-400 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Heart size={16} className="fill-white" /> Check Match % <ArrowRight size={16} />
          </button>
        </form>
      </div>

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
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              X / Twitter
            </button>
            <button onClick={() => handleShare('facebook')} className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-[#1877F2] hover:text-white transition-colors font-bold text-sm flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
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
