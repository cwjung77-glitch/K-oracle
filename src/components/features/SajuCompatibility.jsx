"use client";
import { idolsDB } from '../../data/idols';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Heart, Sparkles, RefreshCw, Star, ArrowRight, Download, Share2, Crown, Trophy, Target, Search, Lock } from 'lucide-react';
import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';

export default function SajuCompatibility({ onUnlockPremium }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const [userName, setUserName] = useState('');
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('12:00');
  const [gender, setGender] = useState('female');
  const [showRequestIdol, setShowRequestIdol] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [matchType, setMatchType] = useState('idol');
  const [customName, setCustomName] = useState('');
  const [customDob, setCustomDob] = useState('');
  const [customTime, setCustomTime] = useState('12:00');
  const [customGender, setCustomGender] = useState('male');
  useEffect(() => {
    if(typeof window !== 'undefined') {
      const savedName = localStorage.getItem('userName');
      const savedDob = localStorage.getItem('userDob');
      const savedTime = localStorage.getItem('userTime');
      const savedGender = localStorage.getItem('userGender');
      if (savedName) setUserName(savedName);
      if (savedDob) setDob(savedDob);
      if (savedTime) setTime(savedTime);
      if (savedGender) setGender(savedGender);
    }
  }, []);

  useEffect(() => {
    if (dob) {
      localStorage.setItem('userDob', dob);
      if (userName) localStorage.setItem('userName', userName);
    }
  }, [dob, userName]);

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSharePreview, setShowSharePreview] = useState(false);
  const searchRef = useRef(null);

  // Simulated Crawled Database (Expanded)
  

  const [selectedIdol, setSelectedIdol] = useState(idolsDB[0]);

  // Filter idols based on search query
  const filteredIdols = useMemo(() => {
    if (!searchQuery) return idolsDB.slice(0, 5); // Show top 5 trending if empty
    return idolsDB.filter(idol => 
      idol.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Limit to 5 results to avoid long scrolling
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownloadImage = async () => {
    const card = document.getElementById('ig-story-card');
    if (!card) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(card, { 
        cacheBust: true, 
        pixelRatio: 2,
        backgroundColor: '#09090b',
        style: { transform: 'scale(1)', transformOrigin: 'top left' }
      });
      
      const res = await fetch('/api/download-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl })
      });
      
      if (!res.ok) throw new Error("Failed to generate download");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'K-Oracle_Talisman.png';
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        try {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        } catch(e){}
      }, 1000);

      setIsDownloading(false);
    } catch(e) { 
      console.error(e); 
      setIsDownloading(false); 
      alert("Failed to save image. Please try again.");
    }
  };

  const handleAnalyze = () => {
    if (!dob) {
      alert("Please enter your birth date first!");
      return;
    }
    
    let targetPerson = selectedIdol;
    if (matchType === 'custom') {
      if (!customName || !customDob) {
        alert("Please enter your partner's name and birth date!");
        return;
      }
      targetPerson = { name: customName, dob: customDob };
      setSelectedIdol(targetPerson);
    }
    
    setLoading(true); localStorage.setItem('userDob', dob); localStorage.setItem('userTime', time); localStorage.setItem('userGender', gender); localStorage.setItem('userName', userName || "You");
    
    // 1. User's Element (Fixed based on DOB)
    let userHash = 0;
    for (let i = 0; i < dob.length; i++) userHash = dob.charCodeAt(i) + ((userHash << 5) - userHash);
    userHash = Math.abs(userHash);
    
    // 2. Idol's Element (Fixed based on Idol Name)
    let idolHash = 0;
    for (let i = 0; i < targetPerson.name.length; i++) idolHash = targetPerson.name.charCodeAt(i) + ((idolHash << 5) - idolHash);
    idolHash = Math.abs(idolHash);
    
    const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
    const myElem = elements[userHash % 5];
    const theirElem = elements[idolHash % 5];
    
    // 3. Compatibility Logic (Base score based on element interaction + variation)
    // Saju generating cycle: Wood->Fire->Earth->Metal->Water->Wood
    const elementCycle = { 'Wood': 0, 'Fire': 1, 'Earth': 2, 'Metal': 3, 'Water': 4 };
    const myIndex = elementCycle[myElem];
    const theirIndex = elementCycle[theirElem];
    
    let baseScore = 70;
    let relationship = "Neutral";
    
    if (myIndex === theirIndex) {
      baseScore = 80; // Same element (Good)
      relationship = "Similar Souls";
    } else if ((myIndex + 1) % 5 === theirIndex || (theirIndex + 1) % 5 === myIndex) {
      baseScore = 95; // Generating cycle (Excellent)
      relationship = "Destined Supporters";
    } else {
      baseScore = 65; // Overcoming cycle (Challenging but passionate)
      relationship = "Passionate Clash";
    }
    
    // Add unique variation based on combined hash so it's not always exactly 95 or 65
    const combinedHash = Math.abs(userHash ^ idolHash);
    const score = Math.min(99, baseScore + (combinedHash % 10) - 5);

    const descriptions = {
      'Similar Souls': 'You both share the same energy. According to ancient Saju, you reflect each others deepest thoughts.',
      'Destined Supporters': 'A perfect match! You create a generating cycle, creating a soulmate-level synergy.',
      'Passionate Clash': 'This is a dynamic, magnetic relationship. Though you have opposite energies, it creates an intense bond.'
    };

    const talismans = [
      // Traditional / Mystical
      { text: '액운퇴치', en: "Protection", desc: "Wards off evil and bad luck", type: "classic" },
      { text: "평안무사", en: "Peace", desc: "Grants safety and tranquility", type: "classic" },
      { text: "명예상승", en: "Honor", desc: "Elevates your status and fame", type: "classic" },
      { text: "일취월장", en: "Growth", desc: "Ensures rapid daily progress", type: "classic" },
      { text: "재물폭발", en: "Wealth", desc: "Attracts immense fortune", type: "classic" },
      { text: "전광석화", en: "Speed", desc: "Lightning-fast manifestations", type: "classic" },
      { text: "무병장수", en: "Longevity", desc: "Brings health and long life", type: "classic" },
      { text: "소원성취", en: "Wish", desc: "Makes your deepest desires real", type: "classic" },
      { text: "천생연분", en: "Soulmate", desc: "A match made in heaven", type: "classic" },
      { text: "백년해로", en: "Eternal Bond", desc: "Lifelong harmony together", type: "classic" },
      { text: "만사형통", en: "Success", desc: "Everything goes your way", type: "classic" },
      { text: "운수대통", en: "Good Luck", desc: "A great tide of cosmic luck", type: "classic" },
      { text: "금상첨화", en: "Perfection", desc: "Adding beauty to what's already good", type: "classic" },
      { text: "기사회생", en: "Revival", desc: "Bouncing back from the bottom", type: "classic" },
      { text: "심기일전", en: "Fresh Start", desc: "A renewed mindset and energy", type: "classic" },
      
      // K-Pop / Fandom Modern Vibe
      { text: "인기절정", en: "Superstar", desc: "Reach the peak of popularity", type: "kpop" },
      { text: "매력발산", en: "Potential", desc: "Unleash irresistible charm", type: "kpop" },
      { text: "심쿵주의", en: "Heart Attack", desc: "Causes fatal heart flutters", type: "kpop" },
      { text: "시선강탈", en: "Eye Catcher", desc: "Steals everyone's attention", type: "kpop" },
      { text: "광클성공", en: "Ticketing", desc: "Blesses your concert ticketing", type: "kpop" },
      { text: "덕질만렙", en: "Pro Fan", desc: "Master level fandom energy", type: "kpop" },
      { text: "매력만점", en: "Charisma", desc: "A flawless, charming aura", type: "kpop" },
      { text: "스밍성공", en: "Stream", desc: "Perfect streaming success", type: "kpop" },
      { text: "본방사수", en: "Live Watch", desc: "Never miss a live broadcast", type: "kpop" },
      { text: "입덕완료", en: "Stan", desc: "Officially joining the fandom", type: "kpop" },
      { text: "최애등극", en: "Ultimate Bias", desc: "Crowning your #1 favorite", type: "kpop" },
      { text: "성덕인증", en: "Lucky Fan", desc: "A successful, noticed fan", type: "kpop" },
      { text: "포카당첨", en: "Photocard", desc: "Pull your bias photocard", type: "kpop" },
      { text: "영앤리치", en: "Young & Rich", desc: "Youthful and wealthy vibes", type: "kpop" },
      { text: "폼미쳤다", en: "Crazy Vibe", desc: "Absolutely insane form", type: "kpop" }
    ];

    setTimeout(() => {
      setLoading(false);

      // Filter talismans based on score to prevent semantic contradictions
      let validTalismans = talismans;
      if (score >= 90) {
        validTalismans = talismans.filter(t => ['천생연분', '백년해로', '최애등극', '성덕인증', '만사형통', '운수대통', '영앤리치'].includes(t.text));
      } else if (score >= 70) {
        validTalismans = talismans.filter(t => !['천생연분', '백년해로', '기사회생', '액운퇴치'].includes(t.text));
      } else {
        // Under 70: Protective, Revival, or general fandom luck
        validTalismans = talismans.filter(t => ['액운퇴치', '평안무사', '기사회생', '심기일전', '광클성공', '일취월장', '덕질만렙'].includes(t.text));
      }
      
      if (validTalismans.length === 0) validTalismans = talismans; // fallback

      setResult({
        score: score,
        element: `${myElem} meets ${theirElem}`,
        description: descriptions[relationship],
        talisman: validTalismans[combinedHash % validTalismans.length]
      });
      setStep(2);
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 md:p-10 relative">
      
      {/* Background mystical elements - Wrapped in overflow-hidden to keep them inside the card */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-zinc-300 text-sm font-bold border border-zinc-700/50 mb-4">
            <Sparkles size={16} /> K-Destiny Matrix
          </div>
          <h2 className="text-4xl font-black tracking-tight"><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 drop-shadow-md">Idol Saju</span> <span className="text-zinc-200">Compatibility</span></h2>
          <p className="text-zinc-400 mt-2">Discover your cosmic connection based on Korean Astrology.</p>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-300">1. Enter Your Birth Info</label>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Your Name" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400" />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400" />
                  <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400 appearance-none cursor-pointer"
                  >
                    <option value="female">♀ Female (여성)</option>
                    <option value="male">♂ Male (남성)</option>
                  </select>
              </div>
            </div>

            <div className="space-y-4" ref={searchRef}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <label className="text-sm font-medium text-zinc-300">2. Select Your Partner</label>
                <div className="flex bg-zinc-800 rounded-lg p-1">
                  <button onClick={() => setMatchType('idol')} className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${matchType === 'idol' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'text-zinc-400 hover:text-white'}`}>Idol Match</button>
                  <button onClick={() => setMatchType('custom')} className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${matchType === 'custom' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'text-zinc-400 hover:text-white'}`}>Custom Match</button>
                </div>
              </div>
              
              {matchType === 'custom' ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Partner's Name" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input type="date" value={customDob} onChange={(e) => setCustomDob(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400" />
                    <input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400" />
                    <select value={customGender} onChange={(e) => setCustomGender(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400 appearance-none cursor-pointer">
                      <option value="female">♀ Female</option>
                      <option value="male">♂ Male</option>
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-zinc-500">Search from K-Pop database</span>
                    <span onClick={() => setShowRequestIdol(true)} className="text-xs text-zinc-300 cursor-pointer hover:underline">+ Request Missing Idol</span>
                  </div>
                            {showRequestIdol && (
                <div className="mt-2 p-4 bg-zinc-900 border border-zinc-400/30 rounded-xl animate-in fade-in slide-in-from-top-2 mb-4">
                  {requestStatus ? (
                    <div className="text-zinc-300 text-sm font-bold text-center py-2">{requestStatus}</div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-zinc-400">Request a new idol to be added</span>
                        <button onClick={() => setShowRequestIdol(false)} className="text-xs text-zinc-500 hover:text-zinc-300">Close</button>
                      </div>
                      <div className="flex gap-2">
                        <input type="text" value={requestName} onChange={(e) => setRequestName(e.target.value)} placeholder="Type Idol and Group Name..." className="flex-1 bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-400" />
                        <button onClick={() => { if(requestName.trim()) { setRequestStatus('Request sent to K-Oracle! 🚀'); setTimeout(() => { setShowRequestIdol(false); setRequestStatus(''); setRequestName(''); }, 3000); } }} className="bg-zinc-100 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-white">Send</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
                <div className="relative">
                  <input 
                  type="text" 
                  value={searchQuery}
                  placeholder="Idol Name (e.g. Jungkook)"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400 pl-10" 
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                />
                <Sparkles size={18} className="absolute left-3 top-3.5 text-zinc-500" />
                
                {/* Autocomplete Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl z-20">
                    <div className="px-4 py-2 text-xs text-zinc-500 bg-zinc-900/50">
                      {searchQuery ? 'SEARCH RESULTS' : 'TRENDING SEARCHES'}
                    </div>
                    {filteredIdols.length > 0 ? (
                      filteredIdols.map(idol => (
                        <button 
                          key={idol.name}
                          onClick={() => {
                            setSelectedIdol(idol);
                            setSearchQuery(idol.name);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-zinc-700 flex justify-between items-center transition-colors ${
                            selectedIdol.name === idol.name ? 'bg-white/5 text-zinc-300' : 'text-zinc-300'
                          }`}
                        >
                          <span className="font-bold">{idol.name}</span>
                          <span className="text-xs opacity-60">{idol.dob}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-4 text-center text-zinc-400 text-sm">
                        No idol found. <button className="text-zinc-300 underline ml-1">Add them!</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {selectedIdol && !isDropdownOpen && (
                <div className="mt-4 p-3 bg-white/5 border border-zinc-400/30 rounded-xl text-zinc-300 text-sm flex items-center justify-between animate-in fade-in">
                  <span>Selected: <strong>{selectedIdol.name}</strong></span>
                </div>
              )}
                </>
              )}
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-4 mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black rounded-xl text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-pulse">Reading the Stars...</span>
              ) : (
                <>Analyze Cosmic Bond <ArrowRight size={20} /></>
              )}
            </button>
          </div>
        ) : (
          (() => {
            // Minimalist High-End Theme Logic
            const userElement = result.element.split(' ')[0];
            const isUltraRare = result.score >= 95;
            const currentYear = new Date().getFullYear();
            
            // In Minimalist Option 3, background is always sleek black leather/matte.
            // Text is silver/white foil. 
            // We can add subtle tint based on element for the very faint glow
            const themes = {
              'Wood': { glow: 'rgba(52,211,153,0.1)' },
              'Fire': { glow: 'rgba(248,113,113,0.1)' },
              'Earth': { glow: 'rgba(251,191,36,0.1)' },
              'Metal': { glow: 'rgba(228,228,231,0.1)' },
              'Water': { glow: 'rgba(56,189,248,0.1)' }
            };
            
            const t = themes[userElement] || themes['Metal'];
            
            return (
              <>
                <style>
                  {`
                    @import url('https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&family=Gowun+Batang:wght@700&display=swap');
                    .font-serif-kr { font-family: 'Gowun Batang', serif; }
                    .font-brush-cn { font-family: 'Zhi Mang Xing', cursive; }
                  `}
                </style>
                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {/* High-End Minimalist Digital Talisman Card */}
                  <div className="inline-block relative mb-10 group" style={{ perspective: '1000px' }}>
                    <div className={`w-56 h-[420px] bg-[#0A0A0A] rounded-2xl flex flex-col items-center justify-between relative overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 border-[3px] border-t-zinc-300 border-l-zinc-300 border-b-zinc-500 border-r-zinc-500 ${isUltraRare ? 'ring-4 ring-zinc-300 shadow-[0_0_50px_rgba(255,255,255,0.4)]' : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]'}`} style={{ boxShadow: `0 0 30px ${t.glow}, inset 0 0 30px rgba(0,0,0,1)` }}>
                      {/* Subtle matte texture */}
                      <div data-html2canvas-ignore="true" className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                      
                      {/* Silver foil shimmer effect on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 transform -translate-x-full group-hover:translate-x-full ${isUltraRare ? 'opacity-30 animate-[shimmer_3s_infinite]' : ''}`}></div>
                      
                            <div className={`mt-8 w-12 h-12 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500 font-brush-cn text-4xl font-bold opacity-90 z-10`} style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}>
                              {userElement === 'Fire' ? '火' : userElement === 'Water' ? '水' : userElement === 'Wood' ? '木' : userElement === 'Metal' ? '金' : '土'}
                            </div>
                      
                            <div className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600 text-[52px] font-serif-kr font-bold flex flex-col items-center justify-center gap-0 py-2 leading-[1.1]`} style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0px 1px 1px rgba(255,255,255,0.3))' }}>
                              {result.talisman.text.split('').map((char, i) => (
                                <span key={i} className="mb-0">{char}</span>
                              ))}
                            </div>
                      
                      <div className="relative z-10 w-full flex flex-col items-center mb-6 px-4">
                        <div className="w-10 h-[1px] bg-zinc-600/50 mb-3"></div>
                        <div className="text-zinc-400 font-bold text-xs tracking-[0.2em] uppercase mb-1 text-center">
                          {result.talisman.en}
                        </div>
                        <div className="text-zinc-500 text-[10px] tracking-wider text-center leading-tight mb-2 opacity-80 uppercase">
                          {result.talisman.desc}
                        </div>
                        <div className={`mt-1 text-[8px] text-zinc-600 font-mono tracking-widest font-bold`}>
                          {isUltraRare ? `★ ${currentYear} LEGENDARY ★` : `K-ORACLE // ${currentYear} COLLECTION`}
                        </div>
                      </div>
                    </div>
                    <div data-html2canvas-ignore="true" className={`absolute -inset-4 rounded-[20%] blur-3xl opacity-30 -z-10 ${isUltraRare ? 'bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 animate-pulse' : 'bg-black'}`}></div>
                  </div>
                  
                  {isUltraRare && (
                    <div className="inline-block px-4 py-1 bg-zinc-100/20 border border-zinc-400/50 rounded-full text-zinc-300 text-xs font-bold tracking-widest mb-4 animate-bounce">
                      SOULMATE LEVEL UNLOCKED!
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center justify-center gap-2 mb-6">
                    <span className="text-xl font-bold">{userName || 'You'}</span>
                    <Heart className={`text-red-500 fill-red-500 ${isUltraRare ? 'animate-bounce' : 'animate-pulse'}`} style={{ filter: "drop-shadow(0 0 10px rgba(239,68,68,0.5))" }} />
                    <span className="text-xl font-bold">{selectedIdol.name}</span>
                  </div>

                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 mb-2" style={{ filter: "drop-shadow(0 0 15px rgba(168,85,247,0.4))" }}>
                    {result.score}% Match
                  </div>
                  <div className="text-zinc-300 font-bold mb-6">{result.element}</div>
                  
                  <p className="text-zinc-300 leading-relaxed mb-8 bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
                    {result.description}
                  </p>

                  <div className="w-full flex flex-col gap-3 mb-6">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-bold text-sm text-center mb-3 uppercase tracking-widest flex items-center justify-center gap-2"><Sparkles size={14}/> Premium Deep Chemistry Analysis <Sparkles size={14}/></p>
                    
                    <div onClick={() => { localStorage.setItem('idolName', selectedIdol.name); if(onUnlockPremium) onUnlockPremium(); else alert('Premium feature unavailable.'); }} className="cursor-pointer relative overflow-hidden bg-gradient-to-r from-zinc-900 to-black border border-violet-500/30 rounded-xl p-4 flex items-center justify-between group hover:border-fuchsia-500/60 hover:shadow-[0_0_20px_rgba(217,70,239,0.25)] transition-all transform hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex flex-col gap-1 z-10">
                        <div className="text-zinc-200 group-hover:text-white font-bold flex items-center gap-2 text-sm transition-colors">
                            <Lock size={14} className="text-fuchsia-400 group-hover:text-fuchsia-300 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]" />
                          The Vibe That Catches {selectedIdol.name}'s Eye
                        </div>
                        <div className="text-violet-300/60 text-xs blur-[2.5px] select-none mt-1 group-hover:text-fuchsia-300/80 transition-colors">
                          Based on their chart, they are instinctively drawn to...
                        </div>
                      </div>
                    </div>

                    <div onClick={() => { localStorage.setItem('idolName', selectedIdol.name); if(onUnlockPremium) onUnlockPremium(); else alert('Premium feature unavailable.'); }} className="cursor-pointer relative overflow-hidden bg-gradient-to-r from-zinc-900 to-black border border-violet-500/30 rounded-xl p-4 flex items-center justify-between group hover:border-fuchsia-500/60 hover:shadow-[0_0_20px_rgba(217,70,239,0.25)] transition-all transform hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex flex-col gap-1 z-10">
                        <div className="text-zinc-200 group-hover:text-white font-bold flex items-center gap-2 text-sm transition-colors">
                            <Lock size={14} className="text-fuchsia-400 group-hover:text-fuchsia-300 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]" />
                          When Your Cosmic Energies Align
                        </div>
                        <div className="text-violet-300/60 text-xs blur-[2.5px] select-none mt-1 group-hover:text-fuchsia-300/80 transition-colors">
                          The specific months where your romantic luck peaks...
                        </div>
                      </div>
                    </div>

                    <div onClick={() => { localStorage.setItem('idolName', selectedIdol.name); if(onUnlockPremium) onUnlockPremium(); else alert('Premium feature unavailable.'); }} className="cursor-pointer relative overflow-hidden bg-gradient-to-r from-zinc-900 to-black border border-violet-500/30 rounded-xl p-4 flex items-center justify-between group hover:border-fuchsia-500/60 hover:shadow-[0_0_20px_rgba(217,70,239,0.25)] transition-all transform hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex flex-col gap-1 z-10">
                        <div className="text-zinc-200 group-hover:text-white font-bold flex items-center gap-2 text-sm transition-colors">
                            <Lock size={14} className="text-fuchsia-400 group-hover:text-fuchsia-300 drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]" />
                          How to Unlock Their Heart
                        </div>
                        <div className="text-violet-300/60 text-xs blur-[2.5px] select-none mt-1 group-hover:text-fuchsia-300/80 transition-colors">
                          To make a lasting impression, you need to appeal to their...
                        </div>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => { localStorage.setItem('idolName', selectedIdol.name); if(onUnlockPremium) onUnlockPremium(); else alert('Premium feature unavailable.'); }} className="w-full mb-4 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black rounded-2xl text-lg sm:text-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02]">
                    Unlock Deep Chemistry Report ($4.99)
                  </button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={handleDownloadImage} disabled={isDownloading} className="w-full sm:flex-1 py-4 rounded-2xl bg-zinc-100 text-zinc-900 font-black flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]">
                      {isDownloading ? "Generating..." : <><Download size={20} /> Download Talisman</>}
                    </button>
                    <button onClick={() => { setStep(1); setSearchQuery(''); setIsDropdownOpen(false); }} className="w-full sm:flex-1 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-all font-bold hover:border-zinc-600">
                      Try Another Match
                    </button>
                  </div>
                </div>

                {/* Hidden IG Story Card for Image Generation */}
                <div className="fixed top-0 left-[-9999px] z-[-10] pointer-events-none">
                  <div id="ig-story-card" className="w-[1080px] h-[1920px] pt-12 pb-16 bg-zinc-950 rounded-3xl border border-zinc-800 p-16 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 via-black to-zinc-500/10"></div>
                        <div className="relative z-10 w-full text-center mt-6">
                          <div className="text-zinc-400 font-bold mb-6 uppercase tracking-widest text-4xl">My Cosmic Soulmate</div>
                            <div className="text-[52px] font-black text-white bg-black/80 py-8 px-12 rounded-[3rem] border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-2 w-[900px] mx-auto">
                              <span>{userName ? userName.toUpperCase() : "ME"} ❤️</span>
                              <span className="text-zinc-200">{selectedIdol.name}</span>
                            </div>
                        </div>
                        
                        <div className="relative z-10 my-10">
                          {/* EXACT MATCH BUJEOK (Minimalist) */}
                          <div className={`w-[540px] h-[1050px] bg-[#0A0A0A] rounded-[4rem] border-[8px] flex flex-col items-center justify-between relative overflow-hidden border-[4px] border-t-zinc-300 border-l-zinc-300 border-b-zinc-500 border-r-zinc-500 ${isUltraRare ? 'ring-4 ring-zinc-300 shadow-[0_0_50px_rgba(255,255,255,0.4)]' : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]'}`} style={{ boxShadow: `0 0 30px ${t.glow}, inset 0 0 30px rgba(0,0,0,1)` }}>
                            <div data-html2canvas-ignore="true" className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                            
                            <div className={`mt-16 w-32 h-32 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500 font-brush-cn text-8xl font-bold opacity-90 z-10`} style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}>
                              {userElement === 'Fire' ? '火' : userElement === 'Water' ? '水' : userElement === 'Wood' ? '木' : userElement === 'Metal' ? '金' : '土'}
                            </div>
                            
                            <div className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600 text-[120px] sm:text-[130px] font-serif-kr font-bold flex flex-col items-center justify-center gap-0 py-2 leading-[1.1]`} style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0px 1px 1px rgba(255,255,255,0.3))' }}>
                              {result.talisman.text.split('').map((char, i) => (
                                <span key={i} className="mb-0">{char}</span>
                              ))}
                            </div>
                            
                            <div className="relative z-10 w-full flex flex-col items-center mb-8 px-4">
                              <div className="w-24 h-[3px] bg-zinc-600/50 mb-6"></div>
                              <div className="text-zinc-400 font-bold text-3xl tracking-[0.2em] uppercase mb-4 text-center">
                                {result.talisman.en}
                              </div>
                              <div className="text-zinc-500 text-xl tracking-wider text-center leading-tight mb-6 opacity-80 uppercase">
                                {result.talisman.desc}
                              </div>
                              <div className={`mt-6 text-xl text-zinc-600 font-mono tracking-widest font-bold`}>
                                {isUltraRare ? `★ ${currentYear} LEGENDARY ★` : `K-ORACLE // ${currentYear} COLLECTION`}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative z-10 text-center mb-6">
                          <div className="text-[180px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 mb-6" style={{ filter: "drop-shadow(0 0 20px rgba(168,85,247,0.5))" }}>{result.score}%</div>
                          <div className="text-zinc-300 font-bold tracking-[0.3em] text-4xl uppercase mb-12">
                            {result.score >= 90 ? 'Soulmate Level' : result.score >= 80 ? 'Perfect Match' : result.score >= 70 ? 'Great Synergy' : result.score >= 60 ? 'Magnetic Bond' : 'Karmic Lesson'}
                          </div>
                          
                          <div className="relative z-10 w-fit mx-auto bg-zinc-900/90 border border-zinc-800 text-zinc-300 py-6 px-12 rounded-full flex items-center justify-center gap-4 font-bold shadow-2xl mt-12 text-3xl tracking-widest">
  <Search size={32} className="text-zinc-500" /> k-oracle-omega.vercel.app
</div>
                        </div>

                    </div>
                  </div>
              </>
            );
          })()
        )}
      </div>
    </div>
  );
}












