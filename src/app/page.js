"use client";
import React, { useState, useEffect } from 'react';
import SajuCompatibility from '../components/features/SajuCompatibility';
import PersonalColor from '../components/features/PersonalColor';
import CheckoutModal from '../components/features/CheckoutModal';
import DeepDiveReport from '../components/features/DeepDiveReport';
import BeautyDeepDiveReport from '../components/features/BeautyDeepDiveReport';
import LoginModal from '../components/features/LoginModal';
import { Sparkles, Moon, Palette, Zap, Lock } from 'lucide-react';

export default function OracleLanding() {
  const [activeTab, setActiveTab] = useState('saju');
  const [showCheckout, setShowCheckout] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [lang, setLang] = useState('en');

  // Smooth scroll to top when switching tabs to prevent layout jumps/cut-offs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-500 selection:text-black pb-24 overflow-hidden">
      
      {/* Ambient Cosmic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-black tracking-widest cursor-pointer whitespace-nowrap" onClick={() => window.scrollTo(0,0)}>
            <span className="text-yellow-500">K</span>-ORACLE
          </div>
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1">
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('es')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'es' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                ES
              </button>
            </div>
            <button 
              onClick={() => setShowLogin(true)}
              className="px-6 py-2 text-xs font-bold tracking-widest bg-white text-black rounded-full hover:bg-zinc-200 transition-colors uppercase"
            >
              Log In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 px-6 max-w-5xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 border border-white/10 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Sparkles size={14} className="text-yellow-500 animate-pulse" /> Cyber-Shamanism for the global generation
        </div>
        
        <h1 className="text-[11vw] sm:text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-8">
          <span className="block text-zinc-300 font-serif italic font-medium">Decode Your</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 drop-shadow-lg">Destiny</span> 
          <span className="text-zinc-600 font-sans font-light mx-1 sm:mx-4">&</span> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-500 drop-shadow-lg">Aura</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-16 font-light tracking-wide">
          Ancient Korean astrology meets modern K-Beauty algorithms. 
          Uncover the blueprint of your soul and the exact colors of your aesthetic.
        </p>

        {/* Custom Tab Switcher */}
        <div className="inline-flex bg-black/50 p-1.5 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-lg">
          <button 
            onClick={() => { setActiveTab('saju'); setHasPaid(false); }}
            className={`px-3 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-xs sm:text-base transition-all duration-300 ${
              activeTab === 'saju' 
                ? 'bg-gradient-to-r from-yellow-600/90 to-red-600/90 text-white shadow-[0_0_20px_rgba(234,179,8,0.3)] border border-yellow-500/50' 
                : 'text-zinc-500 hover:text-white border border-transparent hover:bg-white/5'
            }`}
          >
            <Moon size={20} className={activeTab === 'saju' ? 'text-yellow-200' : ''} /> 
            <span className="tracking-wide">K-ASTROLOGY</span>
          </button>
          <button 
            onClick={() => { setActiveTab('beauty'); setHasPaid(false); }}
            className={`px-3 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-xs sm:text-base transition-all duration-300 ${
              activeTab === 'beauty' 
                ? 'bg-gradient-to-r from-pink-500/90 to-blue-500/90 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] border border-pink-500/50' 
                : 'text-zinc-500 hover:text-white border border-transparent hover:bg-white/5'
            }`}
          >
            <Palette size={20} className={activeTab === 'beauty' ? 'text-pink-200' : ''} /> 
            <span className="tracking-wide">K-BEAUTY</span>
          </button>
        </div>
      </section>

      {/* Active Feature Area */}
      <section className="px-6 relative">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'saju' ? <SajuCompatibility /> : <PersonalColor />}
        </div>
      </section>

      {/* Monetization / Upsell Section */}
      <section className="mt-32 border-t border-white/5 bg-zinc-950/50 py-24 px-6 relative" id="premium-report">
        
        {!hasPaid ? (
          <div className="text-center max-w-xl mx-auto">
            {activeTab === 'saju' ? (
              <>
                <h2 className="text-3xl font-black mb-4">Want the Deep Dive?</h2>
                <p className="text-zinc-400 mb-8">Unlock your 2027 Full Year Saju Report or get a 1:1 Live Consultation.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="px-8 py-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 font-bold hover:bg-yellow-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock size={18} /> Unlock 2027 Destiny Report ($4.99)
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-black mb-4">Unlock Your Beauty Blueprint</h2>
                <p className="text-zinc-400 mb-8">Get your personalized 30-day styling masterplan, including exact hair dye formulas and VIP shopping lists.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="px-8 py-4 rounded-xl border border-pink-500/30 bg-pink-500/10 text-pink-400 font-bold hover:bg-pink-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock size={18} /> Unlock Premium Report ($9.99)
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {activeTab === 'saju' ? <DeepDiveReport lang={lang} /> : <BeautyDeepDiveReport lang={lang} />}
          </div>
        )}
      </section>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        activeTab={activeTab}
        onSuccess={() => {
          setShowCheckout(false);
          setHasPaid(true);
          // Scroll to the report
          setTimeout(() => {
            document.getElementById('premium-report')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }} 
      />

      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
      />

    </div>
  );
}





