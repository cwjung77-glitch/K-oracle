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
        <div className="grid grid-cols-2 bg-black/50 p-1.5 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-lg w-full max-w-sm mx-auto">
          <button 
            onClick={() => { setActiveTab('saju'); setHasPaid(false); }}
            className={`w-full py-3 sm:py-4 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-xs sm:text-base transition-all duration-300 ${
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
            className={`w-full py-3 sm:py-4 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-xs sm:text-base transition-all duration-300 ${
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
          <div className="text-center w-full max-w-5xl mx-auto">
            {activeTab === 'saju' ? (
              <div className="max-w-5xl mx-auto w-full px-4">
                <h2 className="text-3xl md:text-5xl font-black mb-4">Choose Your Destiny Plan</h2>
                <p className="text-zinc-400 mb-12 text-lg">Select the cosmic blueprint that guides your future. 90% of our VIPs choose the Bundle.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  {/* Tier 1: 2027 Q4 */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-yellow-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-zinc-300">2027 Q4 Finale</h3>
                    <p className="text-zinc-500 text-sm mt-2 mb-6">Navigate the remaining 3 months.</p>
                    <div className="text-3xl font-black mb-6">$2.99</div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                      <li className="flex gap-2 items-center"><Zap size={14} className="text-yellow-500 flex-shrink-0" /> Oct - Dec Forecast</li>
                      <li className="flex gap-2 items-center"><Zap size={14} className="text-yellow-500 flex-shrink-0" /> Basic 5 Elements</li>
                    </ul>
                    <button onClick={() => { setHasPaid(true); }} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold text-zinc-300">Select Plan</button>
                  </div>

                  {/* Tier 3: Bundle (Most Popular) */}
                  <div className="bg-gradient-to-b from-yellow-900/20 to-black border-2 border-yellow-500 rounded-2xl p-6 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(234,179,8,0.15)] z-10">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">MOST POPULAR</div>
                    <h3 className="text-2xl font-bold text-yellow-500">27+28 Bundle</h3>
                    <p className="text-zinc-400 text-sm mt-2 mb-6">The ultimate 15-month masterplan.</p>
                    <div className="text-4xl font-black mb-6 text-white">$5.99</div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-300 flex-grow">
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" /> 15-Month Spline Flow Chart</li>
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" /> Full 10-Page VIP PDF</li>
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" /> Deep Love & Wealth Matrix</li>
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" /> K-Pop Idol Compatibility</li>
                    </ul>
                    <button onClick={() => { setHasPaid(true); }} className="w-full py-4 rounded-xl bg-yellow-500 text-black font-black hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.4)]">Unlock Bundle</button>
                  </div>

                  {/* Tier 2: 2028 */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-yellow-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-zinc-300">2028 Full Year</h3>
                    <p className="text-zinc-500 text-sm mt-2 mb-6">Prepare for the new year early.</p>
                    <div className="text-3xl font-black mb-6">$4.99</div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                      <li className="flex gap-2 items-center"><Zap size={14} className="text-yellow-500 flex-shrink-0" /> 12-Month 2028 Flow</li>
                      <li className="flex gap-2 items-center"><Zap size={14} className="text-yellow-500 flex-shrink-0" /> Radar Chart</li>
                    </ul>
                    <button onClick={() => { setHasPaid(true); }} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold text-zinc-300">Select Plan</button>
                  </div>
                </div>
              </div>
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








