"use client";

import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Repeat, Sparkles } from 'lucide-react';

const ELEMENT_THEMES = {
  Fire: {
    hanja: '火',
    label: 'FIRE • 丙丁火',
    direction: 'South (남쪽 • 離宮)',
    luckyHour: '11:00 - 13:00 (午時)',
    borderGrad: 'from-amber-300 via-red-500 to-yellow-500',
    bgGrad: 'from-[#1a0707] via-[#0d0505] to-[#050505]',
    glowColor: 'rgba(239, 68, 68, 0.35)',
    accentText: 'text-amber-300',
    calligraphyGrad: 'from-yellow-100 via-amber-300 to-red-400',
    ringColor: '#f59e0b',
  },
  Water: {
    hanja: '水',
    label: 'WATER • 壬癸水',
    direction: 'North (북쪽 • 坎宮)',
    luckyHour: '23:00 - 01:00 (子時)',
    borderGrad: 'from-cyan-200 via-blue-500 to-indigo-500',
    bgGrad: 'from-[#061220] via-[#050911] to-[#050505]',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    accentText: 'text-cyan-300',
    calligraphyGrad: 'from-white via-cyan-200 to-blue-400',
    ringColor: '#38bdf8',
  },
  Wood: {
    hanja: '木',
    label: 'WOOD • 甲乙木',
    direction: 'East (동쪽 • 震宮)',
    luckyHour: '05:00 - 07:00 (卯時)',
    borderGrad: 'from-emerald-200 via-green-500 to-amber-400',
    bgGrad: 'from-[#061a11] via-[#050e0a] to-[#050505]',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    accentText: 'text-emerald-300',
    calligraphyGrad: 'from-emerald-50 via-emerald-200 to-amber-300',
    ringColor: '#34d399',
  },
  Metal: {
    hanja: '金',
    label: 'METAL • 庚辛金',
    direction: 'West (서쪽 • 兌宮)',
    luckyHour: '17:00 - 19:00 (酉時)',
    borderGrad: 'from-white via-zinc-300 to-violet-400',
    bgGrad: 'from-[#14141d] via-[#0a0a0f] to-[#050505]',
    glowColor: 'rgba(196, 181, 253, 0.35)',
    accentText: 'text-violet-200',
    calligraphyGrad: 'from-white via-zinc-200 to-violet-300',
    ringColor: '#e4e4e7',
  },
  Earth: {
    hanja: '土',
    label: 'EARTH • 戊己土',
    direction: 'Center (중앙 • 中宮)',
    luckyHour: '13:00 - 15:00 (未時)',
    borderGrad: 'from-yellow-200 via-amber-500 to-yellow-700',
    bgGrad: 'from-[#1c1506] via-[#0e0b04] to-[#050505]',
    glowColor: 'rgba(234, 179, 8, 0.38)',
    accentText: 'text-yellow-300',
    calligraphyGrad: 'from-yellow-50 via-yellow-200 to-amber-500',
    ringColor: '#eab308',
  },
};

export default function HolographicTalismanCard({
  element = 'Earth',
  talisman = { text: '일취월장', en: 'GROWING TOGETHER', desc: 'INSPIRING EACH OTHER TO EVOLVE' },
  userName = 'YOU',
  partnerName = '',
  userDayMaster = '',
  partnerDayMaster = '',
  score = 92,
  isLegendary = false,
  editionLabel = 'K-ORACLE // 2027 ROYAL ARCHIVE',
  size = 'normal', // 'normal' or 'large'
}) {
  const theme = ELEMENT_THEMES[element] || ELEMENT_THEMES.Earth;
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoSpin360, setAutoSpin360] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovering: false });
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || autoSpin360) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 18;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setTilt({ x: rotateX, y: rotateY, glareX, glareY, isHovering: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHovering: false });
  };

  const cardWidth = size === 'large' ? 'w-64 sm:w-72' : 'w-56 sm:w-60';
  const cardHeight = size === 'large' ? 'h-[460px] sm:h-[490px]' : 'h-[410px] sm:h-[430px]';
  const charSize = size === 'large' ? 'text-[58px] sm:text-[64px]' : 'text-[50px] sm:text-[54px]';

  // Compute dynamic 3D transform
  let dynamicTransform = undefined;
  if (tilt.isHovering && !autoSpin360) {
    const baseFlip = isFlipped ? 180 : 0;
    dynamicTransform = `rotateX(${tilt.x.toFixed(1)}deg) rotateY(${(baseFlip + tilt.y).toFixed(1)}deg) scale3d(1.04, 1.04, 1.04)`;
  } else if (isFlipped && !autoSpin360) {
    dynamicTransform = 'rotateY(180deg)';
  }

  return (
    <div className="flex flex-col items-center select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&family=Gowun+Batang:wght@700&display=swap');
        .font-serif-kr { font-family: 'Gowun Batang', serif; }
        .font-brush-cn { font-family: 'Zhi Mang Xing', cursive; }

        @keyframes talismanEntrance360 {
          0% {
            transform: perspective(1200px) rotateY(0deg) rotateX(12deg) scale(0.82);
            filter: brightness(1.8);
          }
          65% {
            transform: perspective(1200px) rotateY(375deg) rotateX(-4deg) scale(1.04);
            filter: brightness(1.2);
          }
          100% {
            transform: perspective(1200px) rotateY(360deg) rotateX(0deg) scale(1);
            filter: brightness(1);
          }
        }

        @keyframes talismanFloatSway {
          0%, 100% {
            transform: translateY(0px) rotateY(-14deg) rotateX(3deg);
          }
          50% {
            transform: translateY(-10px) rotateY(14deg) rotateX(-3deg);
          }
        }

        @keyframes talismanSlowSpin360 {
          0% {
            transform: translateY(0px) rotateY(0deg) rotateX(3deg);
          }
          50% {
            transform: translateY(-8px) rotateY(180deg) rotateX(-3deg);
          }
          100% {
            transform: translateY(0px) rotateY(360deg) rotateX(3deg);
          }
        }

        @keyframes holoShimmerSweep {
          0% { transform: translateX(-140%) rotate(25deg); }
          50%, 100% { transform: translateX(220%) rotate(25deg); }
        }

        .talisman-entrance {
          animation: talismanEntrance360 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .talisman-sway {
          animation: talismanFloatSway 7s ease-in-out infinite;
        }
        .talisman-spin-360 {
          animation: talismanSlowSpin360 12s linear infinite;
        }
        .talisman-spin-360:hover {
          animation-play-state: paused;
        }
        .holo-shimmer-bar {
          animation: holoShimmerSweep 5.5s ease-in-out infinite;
        }
      `}</style>

      {/* Outer 3D Perspective Stage */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (autoSpin360) setAutoSpin360(false);
          setIsFlipped((prev) => !prev);
        }}
        className="relative py-4 px-6 cursor-pointer group"
        style={{ perspective: '1200px' }}
        title="Click to flip Front / Back"
      >
        {/* Ambient Elemental Aura Halo Behind Card */}
        <div
          className="absolute inset-6 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)` }}
        />

        {/* 3D Card Body (Preserve-3D) */}
        <div
          className={`relative ${cardWidth} ${cardHeight} transition-transform duration-700 ease-out ${
            !hasEntered
              ? 'talisman-entrance'
              : autoSpin360
              ? 'talisman-spin-360'
              : !tilt.isHovering && !isFlipped
              ? 'talisman-sway'
              : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: dynamicTransform,
          }}
        >
          {/* ================= FRONT FACE (SACRED TALISMAN) ================= */}
          <div
            className={`absolute inset-0 rounded-[2rem] p-[2.5px] bg-gradient-to-br ${theme.borderGrad} shadow-[0_20px_50px_rgba(0,0,0,0.85)]`}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className={`relative w-full h-full rounded-[calc(2rem-2.5px)] bg-gradient-to-b ${theme.bgGrad} flex flex-col items-center justify-between overflow-hidden px-5 py-6`}>
              {/* Inner Fine Gold Frame & Corner Ornaments */}
              <div className="absolute inset-2.5 rounded-[1.5rem] border border-white/15 pointer-events-none" />
              <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-yellow-400/60 pointer-events-none" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-yellow-400/60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-yellow-400/60 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-yellow-400/60 pointer-events-none" />

              {/* Rotating Sacred Celestial Star-Chart Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.14]">
                <svg className="w-52 h-52 animate-[spin_45s_linear_infinite]" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="88" stroke={theme.ringColor} strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="68" stroke={theme.ringColor} strokeWidth="1" />
                  <circle cx="100" cy="100" r="46" stroke={theme.ringColor} strokeWidth="0.75" strokeDasharray="2 3" />
                  <polygon points="100,16 173,142 27,142" stroke={theme.ringColor} strokeWidth="0.8" fill="none" />
                  <polygon points="100,184 173,58 27,58" stroke={theme.ringColor} strokeWidth="0.8" fill="none" />
                  <line x1="100" y1="8" x2="100" y2="192" stroke={theme.ringColor} strokeWidth="0.5" />
                  <line x1="8" y1="100" x2="192" y2="100" stroke={theme.ringColor} strokeWidth="0.5" />
                </svg>
              </div>

              {/* Holographic Iridescent Foil Sweep */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="holo-shimmer-bar absolute top-[-30%] left-0 w-20 h-[160%] bg-gradient-to-r from-transparent via-white/15 to-transparent blur-sm" />
              </div>

              {/* Dynamic Mouse Glare */}
              {tilt.isHovering && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.22), transparent 55%)`,
                  }}
                />
              )}

              {/* Top Element Emblem & Pill */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-[9px] font-mono tracking-[0.28em] text-zinc-400 uppercase mb-1">
                  {theme.label}
                </span>
                <div
                  className={`text-4xl font-brush-cn font-bold text-transparent bg-clip-text bg-gradient-to-b ${theme.calligraphyGrad} drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]`}
                >
                  {theme.hanja}
                </div>
              </div>

              {/* Center 4-Character Sacred Korean Calligraphy */}
              <div className="relative z-10 flex flex-col items-center justify-center my-1">
                <div
                  className={`text-transparent bg-clip-text bg-gradient-to-br ${theme.calligraphyGrad} ${charSize} font-serif-kr font-bold flex flex-col items-center justify-center leading-[1.08] tracking-tight`}
                  style={{
                    filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.9)) drop-shadow(0px 0px 15px rgba(234,179,8,0.25))',
                  }}
                >
                  {(talisman?.text || '일취월장').split('').map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </div>

                {/* Traditional Vermilion Red Seal Stamp (낙관: 天命) */}
                <div className="absolute -right-7 bottom-1 w-7 h-7 rounded-sm bg-red-700/90 border border-red-400/80 shadow-[0_0_12px_rgba(220,38,38,0.6)] flex flex-col items-center justify-center leading-none p-0.5 rotate-[-4deg]">
                  <span className="text-[9px] font-serif text-red-100 font-black tracking-tighter">天命</span>
                  <span className="text-[8px] font-serif text-red-100 font-black tracking-tighter">之印</span>
                </div>
              </div>

              {/* Bottom Meaning & Edition Footer */}
              <div className="relative z-10 w-full flex flex-col items-center text-center">
                <div className="w-14 h-[1.5px] bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent mb-2.5" />
                <div className={`font-black text-[11px] tracking-[0.22em] uppercase mb-1 ${theme.accentText}`}>
                  {talisman?.en}
                </div>
                <div className="text-zinc-400 text-[9.5px] tracking-wider leading-tight uppercase max-w-[180px] line-clamp-2">
                  {talisman?.desc}
                </div>
                <div className="mt-2.5 text-[8px] text-zinc-500 font-mono tracking-[0.2em] font-bold">
                  {isLegendary ? '✨ LEGENDARY EDITION ✨' : editionLabel}
                </div>
              </div>
            </div>
          </div>

          {/* ================= BACK FACE (SECRET MANSERYEOK CERTIFICATE) ================= */}
          <div
            className={`absolute inset-0 rounded-[2rem] p-[2.5px] bg-gradient-to-tl ${theme.borderGrad} shadow-[0_20px_50px_rgba(0,0,0,0.85)]`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className={`relative w-full h-full rounded-[calc(2rem-2.5px)] bg-gradient-to-b ${theme.bgGrad} flex flex-col items-center justify-between overflow-hidden px-5 py-6 text-center`}>
              <div className="absolute inset-2.5 rounded-[1.5rem] border border-yellow-500/20 pointer-events-none" />

              {/* Top Seal Header */}
              <div className="relative z-10">
                <div className="text-[9px] font-mono tracking-[0.25em] text-yellow-400/90 uppercase mb-1">
                  ROYAL MANSERYEOK SEAL
                </div>
                <div className="text-sm font-black text-white tracking-widest uppercase">
                  天命認證書 • DESTINY DECREE
                </div>
                <div className="w-16 h-px bg-yellow-500/40 mx-auto mt-2" />
              </div>

              {/* Center Manseryeok Data & Lucky Compass */}
              <div className="relative z-10 w-full space-y-3 my-auto py-2">
                <div className="bg-black/60 border border-white/10 rounded-xl p-3">
                  <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Cosmic Bond</div>
                  <div className="text-xs font-black text-white truncate">
                    {userName || 'YOU'} {partnerName ? `❤️ ${partnerName.split(' (')[0]}` : ''}
                  </div>
                  {score && (
                    <div className={`text-xl font-black mt-0.5 ${theme.accentText}`}>
                      {score}% Resonance
                    </div>
                  )}
                </div>

                <div className="bg-black/60 border border-white/10 rounded-xl p-3 space-y-1.5 text-left">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500">Core Element:</span>
                    <span className="text-zinc-200 font-bold">{userDayMaster || `${element} (${theme.hanja})`}</span>
                  </div>
                  {partnerDayMaster && (
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-500">Partner Pillar:</span>
                      <span className="text-zinc-200 font-bold">{partnerDayMaster}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500">Lucky Direction:</span>
                    <span className="text-yellow-300 font-bold">{theme.direction}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500">Power Hour:</span>
                    <span className="text-zinc-200 font-bold">{theme.luckyHour}</span>
                  </div>
                </div>

                {/* Royal Vermilion Stamp */}
                <div className="pt-1 flex justify-center">
                  <div className="w-12 h-12 rounded-md bg-red-800/90 border-2 border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.5)] flex flex-col items-center justify-center leading-tight">
                    <span className="text-xs font-serif text-red-100 font-black tracking-widest">天命</span>
                    <span className="text-xs font-serif text-red-100 font-black tracking-widest">認證</span>
                  </div>
                </div>
              </div>

              {/* Bottom Verification Note */}
              <div className="relative z-10">
                <div className="text-[8.5px] text-zinc-400 tracking-wider uppercase">
                  Verified by 50-Master Matrix
                </div>
                <div className="text-[8px] text-yellow-500/80 font-mono tracking-widest mt-0.5">
                  WWW.THEKORACLE.COM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar (Flip Front/Back + 360° Auto-Spin Toggle) */}
      <div className="flex items-center gap-2.5 mt-2">
        <button
          type="button"
          onClick={() => {
            setAutoSpin360(false);
            setIsFlipped((prev) => !prev);
          }}
          className="px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-xs font-bold text-zinc-200 flex items-center gap-1.5 transition-all shadow-md"
        >
          <Repeat size={13} className="text-yellow-400" />
          {isFlipped ? 'View Front Talisman' : 'Flip to Secret Seal (뒷면 보기)'}
        </button>

        <button
          type="button"
          onClick={() => setAutoSpin360((prev) => !prev)}
          className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
            autoSpin360
              ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
              : 'bg-zinc-900 hover:bg-zinc-800 border-white/15 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <RotateCw size={13} className={autoSpin360 ? 'animate-spin text-yellow-300' : ''} />
          {autoSpin360 ? '360° Spin: ON' : '360° Slow Spin'}
        </button>
      </div>
    </div>
  );
}
