"use client";
import React, { useState, useEffect } from 'react';
import SajuCompatibility from '../components/features/SajuCompatibility';
import PersonalColor from '../components/features/PersonalColor';
import CheckoutModal from '../components/features/CheckoutModal';
import DeepDiveReport from '../components/features/DeepDiveReport';
import BeautyDeepDiveReport from '../components/features/BeautyDeepDiveReport';
import LoginModal from '../components/features/LoginModal';
import Link from 'next/link';
import { Sparkles, Moon, Palette, Zap, Lock } from 'lucide-react';

export default function OracleLanding() {
  const [activeTab, setActiveTab] = useState('saju');
  const [showCheckout, setShowCheckout] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('bundle');
  const [showLogin, setShowLogin] = useState(false);
  const [lang, setLang] = useState('en'); const [logoClicks, setLogoClicks] = useState(0); const [showKo, setShowKo] = useState(false);
  const [recentHistory, setRecentHistory] = useState([]);
  useEffect(() => {
    try {
      const hist = JSON.parse(localStorage.getItem('kOracleHistory') || '[]');
      setRecentHistory(hist);
    } catch(e) {}
  }, [hasPaid]);

  const handleLogoClick = () => {
    if (hasPaid) {
      if (window.confirm(lang === 'ko' ? "PDF 마스?�플?�을 ?�운로드?�셨?�요? 지�?메인?�로 ?�아가�?분석 결과가 ?�구?�으�???��?�니??" : "Did you download your PDF Masterplan? Leaving now will permanently erase your results.")) {
        localStorage.removeItem("hasPaid");
        setHasPaid(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setLogoClicks(p => p + 1);
    if (logoClicks + 1 >= 5) setShowKo(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const purchased = localStorage.getItem('purchasedProduct');
      if (purchased) {
        setActiveTab(purchased);
      }
      if (localStorage.getItem('hasPaid') === 'true') {
        setHasPaid(true);
        setTimeout(() => {
          document.getElementById('premium-report')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);


  // Smooth scroll to top when switching tabs to prevent layout jumps/cut-offs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white aurora-bg font-sans selection:bg-zinc-100 selection:text-black pb-24 overflow-x-hidden">
      
      {/* Premium Cosmic Aurora Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[80%] bg-zinc-600/15 blur-[150px] rounded-full mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      <div className="absolute bottom-[-20%] left-[10%] w-[70%] h-[60%] bg-pink-600/15 blur-[150px] rounded-full mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      
      {/* Stardust Effect */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '72px 72px', backgroundPosition: '36px 36px' }} />
      
      {/* Grid Texture Overlay (Kept for depth) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl md:text-2xl font-black tracking-widest cursor-pointer whitespace-nowrap" onClick={handleLogoClick}>
            <span className="text-violet-400">K</span>-ORACLE
          </div>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Blog</Link>
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
              </button>{showKo && <button onClick={() => setLang('ko')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'ko' ? 'bg-zinc-100 text-black' : 'text-zinc-500 hover:text-white'}`}>KO</button>}</div><button onClick={() => setShowLogin(true)}
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
          <Sparkles size={14} className="text-zinc-300 animate-pulse" /> Cyber-Shamanism for the global generation
        </div>
        
        <h1 className="text-[11vw] sm:text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-8">
          <span className="block text-zinc-300 font-serif italic font-medium">Decode Your</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 drop-shadow-lg">Destiny</span> 
          <span className="text-zinc-600 font-sans font-light mx-1 sm:mx-4">&</span> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-500 drop-shadow-lg">Aura</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-16 font-light tracking-wide">
          <strong className="text-zinc-200 font-medium">K-Oracle Saju</strong>: Ancient Korean astrology (Four Pillars of Destiny) meets modern K-Pop compatibility algorithms. Uncover the blueprint of your soul and the exact colors of your aesthetic.
        </p>

        
          {/* Recent History */}
          {!hasPaid && recentHistory.length > 0 && (
            <div className="w-full max-w-sm mx-auto mb-6">
              <h3 className="text-zinc-300 font-bold text-sm mb-3 flex items-center gap-2 justify-center">
                <Sparkles size={14} /> {lang === 'ko' ? '최근 ?�람??기록' : 'Recent Readings'}
              </h3>
              <div className="space-y-2">
                {recentHistory.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      if (item.type === 'saju') {
                        // We reconstruct from cacheKey: saju_{plan}_{dob}_{name}_{idolName}
                        const parts = item.cacheKey.split('_');
                        localStorage.setItem('purchasedPlan', parts[1]);
                        localStorage.setItem('userDob', parts[2]);
                        localStorage.setItem('userName', parts[3]);
                        localStorage.setItem('idolName', parts[4] || '');
                        setActiveTab('saju'); localStorage.setItem('purchasedProduct', 'saju');
                      } else {
                        const parts = item.cacheKey.split('_');
                        localStorage.setItem('userDob', parts[2]);
                        setActiveTab('beauty'); localStorage.setItem('purchasedProduct', 'beauty');
                      }
                      localStorage.setItem('hasPaid', 'true');
                      setHasPaid(true);
                    }}
                    className="w-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 rounded-xl p-3 flex items-center justify-between transition-colors text-left"
                  >
                    <div>
                      <div className="font-bold text-zinc-200 text-sm">{item.type === 'saju' && item.plan === 'compatibility' ? `${item.name} ?�️ ${item.idolName}` : item.name}</div>
                      <div className="text-xs text-zinc-500 capitalize">{item.type === 'saju' ? (item.plan === 'compatibility' ? 'Cosmic Chemistry' : 'Saju Masterplan') : 'K-Beauty'}</div>
                    </div>
                    <div className="text-xs text-zinc-500">{item.date}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom Tab Switcher */}
        <div className="grid grid-cols-2 bg-black/50 p-1.5 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-lg w-full max-w-sm mx-auto">
          <button 
            onClick={() => { setActiveTab('saju'); localStorage.setItem('purchasedProduct', 'saju'); setHasPaid(false); }}
            className={`w-full py-3 sm:py-4 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-xs sm:text-base transition-all duration-300 ${
              activeTab === 'saju' 
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-violet-500/50' 
                : 'text-zinc-500 hover:text-white border border-transparent hover:bg-white/5'
            }`}
          >
            <Moon size={20} className={activeTab === 'saju' ? 'text-zinc-200' : ''} /> 
            <span className="tracking-wide">K-ASTROLOGY</span>
          </button>
          <button 
            onClick={() => { setActiveTab('beauty'); localStorage.setItem('purchasedProduct', 'beauty'); setHasPaid(false); }}
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
          {activeTab === 'saju' ? <SajuCompatibility onUnlockPremium={() => { setSelectedPlan('compatibility'); setShowCheckout(true); }} /> : <PersonalColor />}
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
                  {/* Tier 1: 2026 Q4 */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-zinc-400/30 transition-colors">
                    <h3 className="text-xl font-bold text-zinc-300">2026 Q4 Finale</h3>
                    <p className="text-zinc-500 text-sm mt-2 mb-6">Navigate the remaining 3 months.</p>
                    <div className="text-3xl font-black mb-6">$4.99</div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                      <li className="flex gap-2 items-center"><Zap size={14} className="text-zinc-300 flex-shrink-0" /> Oct - Dec Forecast</li>
                      <li className="flex gap-2 items-center"><Zap size={14} className="text-zinc-300 flex-shrink-0" /> Basic 5 Elements</li>
                    </ul>
                    <button onClick={() => { setSelectedPlan("q4"); setShowCheckout(true); }} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold text-zinc-300">Select Plan</button>
                  </div>

                  {/* Tier 3: Bundle (Most Popular) */}
                  <div className="bg-gradient-to-b from-zinc-800/40 to-black border-2 border-zinc-400 rounded-2xl p-6 flex flex-col relative transform md:-translate-y-4 shadow-lg shadow-white/10 z-10">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-zinc-100 text-black text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">MOST POPULAR</div>
                    <h3 className="text-2xl font-bold text-zinc-300">26+27 Bundle</h3>
                    <p className="text-zinc-400 text-sm mt-2 mb-6">The ultimate 15-month masterplan.</p>
                    <div className="text-4xl font-black mb-6 text-white">$11.99</div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-300 flex-grow">
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> 15-Month Spline Flow Chart</li>
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Full 10-Page VIP PDF</li>
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Deep Love & Wealth Matrix</li>
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> K-Pop Idol Compatibility</li>
                    </ul>
                    <button onClick={() => { setSelectedPlan("bundle"); setShowCheckout(true); }} className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black transition-colors shadow-[0_0_30px_rgba(168,85,247,0.5)]">Unlock Bundle</button>
                  </div>

                  {/* Tier 2: 2027 */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-zinc-400/30 transition-colors">
                    <h3 className="text-xl font-bold text-zinc-300">2027 Full Year</h3>
                    <p className="text-zinc-500 text-sm mt-2 mb-6">Prepare for the new year early.</p>
                    <div className="text-3xl font-black mb-6">$9.99</div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                      <li className="flex gap-2 items-center"><Zap size={14} className="text-zinc-300 flex-shrink-0" /> 12-Month 2027 Flow</li>
                      <li className="flex gap-2 items-center"><Zap size={14} className="text-zinc-300 flex-shrink-0" /> Radar Chart</li>
                    </ul>
                    <button onClick={() => { setSelectedPlan("fullyear"); setShowCheckout(true); }} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold text-zinc-300">Select Plan</button>
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
          selectedPlan={selectedPlan}
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











