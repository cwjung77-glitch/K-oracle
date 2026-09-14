import React, { useEffect, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';

export default function CosmicLoader({ isBeauty = false, lang = 'en' }) {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const color = isBeauty ? 'pink' : 'yellow';
  
  // Tailwind dynamic classes need to be constructed carefully, 
  // but since we only have pink/yellow, we can use a simple map.
  const theme = {
    ring1: isBeauty ? 'border-pink-500/20 border-t-pink-500' : 'border-yellow-500/20 border-t-yellow-500',
    ring2: isBeauty ? 'border-pink-500/10 border-b-pink-500' : 'border-yellow-500/10 border-b-yellow-500',
    ring3: isBeauty ? 'border-pink-500/5 border-l-pink-500' : 'border-yellow-500/5 border-l-yellow-500',
    text: isBeauty ? 'text-pink-500' : 'text-yellow-500',
    sparkle: isBeauty ? 'text-pink-300' : 'text-yellow-300',
    glow: isBeauty ? 'shadow-[0_0_50px_rgba(236,72,153,0.3)]' : 'shadow-[0_0_50px_rgba(234,179,8,0.3)]'
  };

  const title = isBeauty 
    ? (lang === 'ko' ? '뷰티 오라를 분석 중입니다' : 'Decoding Beauty Aura')
    : (lang === 'ko' ? '우주의 지혜를 해독 중입니다' : 'Decoding Cosmic Destiny');
    
  const subtitle = isBeauty
    ? (lang === 'ko' ? '청담동 스타일리스트 AI가 매칭을 시작합니다...' : 'Cheongdam Stylist AI is aligning your colors...')
    : (lang === 'ko' ? '수천 년의 명리학 데이터를 분석하고 있습니다...' : 'Aligning your Four Pillars with the cosmos...');

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-8 relative overflow-hidden rounded-3xl p-8 bg-black">
      {/* Background radial glow */}
      <div className={`absolute inset-0 bg-gradient-to-t ${isBeauty ? 'from-pink-900/10' : 'from-yellow-900/10'} to-transparent animate-pulse opacity-50`} />
      
      <div className={`relative flex items-center justify-center w-64 h-64 rounded-full ${theme.glow}`}>
        {/* Core pulsing star */}
        <div className={`absolute inset-0 bg-${isBeauty ? 'pink' : 'yellow'}-500/10 rounded-full animate-ping opacity-20`} />
        
        {/* Orbiting rings (3D effect) */}
        <div className={`absolute w-32 h-32 border-2 rounded-full animate-[spin_3s_linear_infinite] ${theme.ring1}`} />
        <div className={`absolute w-48 h-48 border-[1.5px] rounded-full animate-[spin_5s_linear_infinite_reverse] ${theme.ring2}`} />
        <div className={`absolute w-64 h-64 border border-dashed rounded-full animate-[spin_10s_linear_infinite] ${theme.ring3}`} />
        
        {/* Center Icons */}
        <div className="absolute z-10 flex items-center justify-center animate-pulse">
          <Sparkles className={theme.text} size={40} />
          <Star className={`absolute ${theme.sparkle} animate-ping`} size={20} />
        </div>
      </div>
      
      <div className="text-center z-10 space-y-3 mt-8">
        <h3 className={`text-xl md:text-2xl font-black ${theme.text} uppercase tracking-[0.2em]`}>
          {title}{dots}
        </h3>
        <p className="text-zinc-400 font-mono text-xs md:text-sm tracking-wider opacity-80">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
