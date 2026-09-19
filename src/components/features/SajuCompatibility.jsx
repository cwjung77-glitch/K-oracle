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
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [gender, setGender] = useState('female');
  
  const [showRequestIdol, setShowRequestIdol] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  
  const [matchType, setMatchType] = useState('idol');
  const [customName, setCustomName] = useState('');
  const [customDob, setCustomDob] = useState('');
  const [customTime, setCustomTime] = useState('12:00');
  const [customTimeUnknown, setCustomTimeUnknown] = useState(false);
  const [customGender, setCustomGender] = useState('male');

  useEffect(() => {
    if(typeof window !== 'undefined') {
      setUserName(localStorage.getItem('userName') || '');
      setDob(localStorage.getItem('userDob') || '');
      setTime(localStorage.getItem('userTime') || '12:00');
      setGender(localStorage.getItem('userGender') || 'female');
    }
  }, []);

  useEffect(() => {
    if (dob) localStorage.setItem('userDob', dob);
    if (userName) localStorage.setItem('userName', userName);
  }, [dob, userName]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const [selectedIdol, setSelectedIdol] = useState(idolsDB[0]);

  const filteredIdols = useMemo(() => {
    if (!searchQuery) return idolsDB.slice(0, 5);
    return idolsDB.filter(idol => idol.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsDropdownOpen(false);
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
        cacheBust: true, pixelRatio: 2, backgroundColor: '#09090b',
        style: { transform: 'scale(1)', transformOrigin: 'top left' }
      });
      const res = await fetch('/api/download-image', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dataUrl })
      });
      if (!res.ok) throw new Error("Failed to generate download");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `k-oracle-saju-${userName.replace(/\s+/g, '-')}-match.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download image. Try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRequestIdol = () => {
    if(!requestName) return;
    setRequestStatus(`Thanks! We will add ${requestName} to our DB soon.`);
    setTimeout(() => { setRequestStatus(''); setShowRequestIdol(false); setRequestName(''); }, 3000);
  };

  const handleMatch = async () => {
    if (!dob || !userName) { alert("Please enter your name and birth date."); return; }
    if (matchType === 'idol' && !selectedIdol) { alert("Please select an idol."); return; }
    if (matchType === 'custom' && (!customDob || !customName)) { alert("Please enter their name and birth date."); return; }

    setLoading(true);
    localStorage.setItem('userDob', dob);
    localStorage.setItem('userTime', timeUnknown ? 'Unknown' : time);
    localStorage.setItem('userGender', gender);
    localStorage.setItem('userName', userName || "You");
    
    let targetPerson = matchType === 'idol' ? selectedIdol : { name: customName, dob: customDob };
    let targetName = targetPerson.name;
    let targetDob = targetPerson.dob;

    // 1. User's Element (Fixed based on DOB)
    let userHash = 0;
    for (let i = 0; i < dob.length; i++) userHash = dob.charCodeAt(i) + ((userHash << 5) - userHash);
    userHash = Math.abs(userHash);
    
    // 2. Target's Element (Fixed based on Name + DOB)
    let idolHash = 0;
    const targetStr = targetName + (targetDob || '');
    for (let i = 0; i < targetStr.length; i++) idolHash = targetStr.charCodeAt(i) + ((idolHash << 5) - idolHash);
    idolHash = Math.abs(idolHash);
    
    const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
    const myElem = elements[userHash % 5];
    const theirElem = elements[idolHash % 5];
    
    // 3. Compatibility Logic (Base score based on element interaction)
    // Saju generating cycle: Wood->Fire->Earth->Metal->Water->Wood
    const elementCycle = { 'Wood': 0, 'Fire': 1, 'Earth': 2, 'Metal': 3, 'Water': 4 };
    const myIndex = elementCycle[myElem];
    const theirIndex = elementCycle[theirElem];
    
    let baseScore = 70;
    let relationship = "Neutral";
    
    if (myIndex === theirIndex) {
      baseScore = 80; relationship = "Similar Souls";
    } else if ((myIndex + 1) % 5 === theirIndex || (theirIndex + 1) % 5 === myIndex) {
      baseScore = 95; relationship = "Destined Supporters";
    } else {
      baseScore = 65; relationship = "Passionate Clash";
    }
    
    const combinedHash = Math.abs(userHash ^ idolHash);
    const score = Math.min(99, baseScore + (combinedHash % 10) - 5);

    const descriptions = {
      'Similar Souls': 'You both share the same elemental energy. According to ancient Saju, you reflect each other\'s deepest thoughts.',
      'Destined Supporters': 'A perfect match! You create a generating cycle — a soulmate-level synergy written in the Four Pillars.',
      'Passionate Clash': 'This is a dynamic, magnetic relationship. Though you have opposite energies, it creates an intense, passionate bond.',
      'Neutral': 'A balanced connection with potential for growth. Your energies complement each other in unexpected ways.'
    };

    const dynamics = {
      chemistry: score >= 85 ? 'High natural chemistry — magnetic attraction' : score >= 70 ? 'Good chemistry with growing spark' : 'Moderate — builds over time',
      communication: score >= 80 ? 'Deep intuitive understanding' : score >= 65 ? 'Natural flow with minor gaps' : 'Moderate — requires patience',
      passion: score >= 90 ? 'Strong volcanic intensity' : score >= 75 ? 'Good warm energy exchange' : 'Moderate steady flame',
      trust: score >= 85 ? 'High unshakable foundation' : score >= 70 ? 'Good solid ground' : 'Moderate — grows with effort'
    };

    const talismans = [
      { text: '천생연분', en: 'Soulmate', desc: 'A match made in heaven' },
      { text: '백년해로', en: 'Eternal Bond', desc: 'Lifelong harmony together' },
      { text: '기사회생', en: 'Revival', desc: 'Bouncing back from the bottom' },
      { text: '최애등극', en: 'Ultimate Bias', desc: 'An undeniable magnetic attraction' },
      { text: '성덕인증', en: 'Lucky Fan', desc: 'A dreamlike connection bringing joy' },
      { text: '평안무사', en: 'Peace', desc: 'A calm relationship free of drama' },
      { text: '심기일전', en: 'Fresh Start', desc: 'A renewed mindset and energy' },
      { text: '만사형통', en: 'Everything Flows', desc: 'Perfect synergy that just works' },
      { text: '운수대통', en: 'Great Fortune', desc: 'Together you attract massive luck' },
      { text: '영앤리치', en: 'Young & Rich', desc: 'A powerful duo destined for success' },
      { text: '광클성공', en: 'Perfect Timing', desc: 'Meeting at the right cosmic moment' },
      { text: '덕질만렙', en: 'Max Devotion', desc: 'Unwavering loyalty and admiration' },
      { text: '일취월장', en: 'Growing Together', desc: 'Inspiring each other to grow' },
      { text: '액운퇴치', en: 'Protection', desc: 'Your bond wards off negative energy' }
    ];
    
    let validTalismans = talismans;
    if (score >= 90) validTalismans = talismans.filter(t => ['천생연분', '백년해로', '최애등극', '성덕인증', '만사형통', '운수대통', '영앤리치'].includes(t.text));
    else if (score >= 70) validTalismans = talismans.filter(t => !['천생연분', '백년해로', '기사회생', '액운퇴치'].includes(t.text));
    else validTalismans = talismans.filter(t => ['액운퇴치', '평안무사', '기사회생', '심기일전', '광클성공', '일취월장', '덕질만렙'].includes(t.text));
    if (validTalismans.length === 0) validTalismans = talismans;

    setTimeout(() => {
      setResult({
        score,
        summary: descriptions[relationship],
        userElement: myElem,
        dynamics,
        talisman: validTalismans[combinedHash % validTalismans.length]
      });
      setStep(2);
      setLoading(false);
    }, 2000);
  };

  const userElement = result?.userElement || 'Metal';
  const isUltraRare = result?.score >= 90;
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 md:p-10 relative mt-8">
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-zinc-300 text-sm font-bold border border-zinc-700/50 mb-4">
            <Sparkles size={16} /> K-Destiny Matrix
          </div>
          <h2 className="text-4xl font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 drop-shadow-md">Saju Compatibility</span>
          </h2>
          <p className="text-zinc-400 mt-2">Discover your cosmic connection based on Korean Astrology.</p>
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 border-t-2 border-l-2 border-violet-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-b-2 border-r-2 border-fuchsia-500 rounded-full animate-[spin_2s_linear_reverse]"></div>
              <div className="absolute inset-4 border-t-2 border-pink-500 rounded-full animate-[spin_1.5s_linear]"></div>
              <Sparkles size={24} className="text-white animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 mb-2 animate-pulse">Decoding Saju...</h3>
              <p className="text-zinc-400 text-sm tracking-widest uppercase">Analyzing Four Pillars of Destiny</p>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 relative">
              <div className="flex-1 bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2"><Target size={20} className="text-violet-400"/> My Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Name</label>
                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Sarah" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Birth Date</label>
                    <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Birth Time</label>
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} disabled={timeUnknown} className={`w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert ${timeUnknown ? 'opacity-40 cursor-not-allowed' : ''}`} />
                    <label className="flex items-center gap-2 mt-2 cursor-pointer group">
                      <input type="checkbox" checked={timeUnknown} onChange={e => setTimeUnknown(e.target.checked)} className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 accent-violet-500 cursor-pointer" />
                      <span className="text-zinc-400 text-xs group-hover:text-zinc-300 transition-colors">I don't know my birth time</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Gender</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setGender('female')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${gender === 'female' ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>Female</button>
                      <button onClick={() => setGender('male')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${gender === 'male' ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>Male</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center -my-4 md:my-0 md:-mx-4 z-10 relative">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-950 border-[4px] border-zinc-900 flex items-center justify-center shadow-xl">
                  <span className="text-xl md:text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-400">VS</span>
                </div>
              </div>

              <div className="flex-1 bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500"></div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-white flex items-center gap-2"><Star size={20} className="text-pink-400"/> Match With</h3>
                  <div className="flex bg-zinc-900 rounded-lg p-1">
                    <button onClick={() => setMatchType('idol')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${matchType === 'idol' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}>Idol</button>
                    <button onClick={() => setMatchType('custom')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${matchType === 'custom' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}>Custom</button>
                  </div>
                </div>

                {matchType === 'idol' ? (
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="relative" ref={searchRef}>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 text-zinc-500" size={18} />
                        <input type="text" placeholder="Search K-Pop Idols..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }} onFocus={() => setIsDropdownOpen(true)} className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" />
                      </div>
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto">
                          {filteredIdols.length > 0 ? filteredIdols.map(idol => (
                            <div key={idol.id} onMouseDown={(e) => { e.preventDefault(); setSelectedIdol(idol); setIsDropdownOpen(false); setSearchQuery(''); }} className="px-4 py-3 hover:bg-zinc-800 cursor-pointer flex justify-between items-center transition-colors border-b border-zinc-800/50 last:border-0">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-600">{idol.name.charAt(0)}</div>
                                <div>
                                  <div className="text-white font-bold text-sm">{idol.name}</div>
                                  <div className="text-zinc-500 text-xs">{idol.group}</div>
                                </div>
                              </div>
                              {selectedIdol?.id === idol.id && <Heart size={14} className="text-pink-500 fill-pink-500" />}
                            </div>
                          )) : (
                            <div className="px-4 py-6 text-center">
                              <div className="text-zinc-500 text-sm mb-2">Idol not found</div>
                              <button onClick={() => { setShowRequestIdol(true); setIsDropdownOpen(false); }} className="text-pink-400 hover:text-pink-300 text-xs font-bold underline underline-offset-4">Request to add them!</button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-900/50 rounded-xl border border-dashed border-zinc-700 p-4 mt-2">
                      {selectedIdol ? (
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center mb-3">
                            <Star size={24} className="text-pink-400" />
                          </div>
                          <div className="text-xl font-black text-white">{selectedIdol.name}</div>
                          <div className="text-sm font-bold text-pink-400">{selectedIdol.group}</div>
                        </div>
                      ) : (
                        <div className="text-zinc-500 text-sm">Select an idol above</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Their Name</label>
                      <input type="text" value={customName} onChange={e => setCustomName(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" placeholder="e.g. Michael" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Their Birth Date</label>
                      <input type="date" value={customDob} onChange={e => setCustomDob(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Their Birth Time</label>
                      <input type="time" value={customTime} onChange={e => setCustomTime(e.target.value)} disabled={customTimeUnknown} className={`w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert ${customTimeUnknown ? 'opacity-40 cursor-not-allowed' : ''}`} />
                      <label className="flex items-center gap-2 mt-2 cursor-pointer group">
                        <input type="checkbox" checked={customTimeUnknown} onChange={e => setCustomTimeUnknown(e.target.checked)} className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 accent-pink-500 cursor-pointer" />
                        <span className="text-zinc-400 text-xs group-hover:text-zinc-300 transition-colors">I don't know their birth time</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Their Gender</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setCustomGender('female')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${customGender === 'female' ? 'bg-pink-600/20 border-pink-500 text-pink-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>Female</button>
                        <button onClick={() => setCustomGender('male')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${customGender === 'male' ? 'bg-pink-600/20 border-pink-500 text-pink-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>Male</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={handleMatch}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 hover:opacity-90 text-white font-black text-xl transition-all shadow-[0_0_40px_rgba(217,70,239,0.3)] hover:scale-[1.01] flex items-center justify-center gap-3"
            >
              <Sparkles size={24} className="animate-pulse" /> Analyze Cosmic Connection
            </button>
          </div>
        ) : result && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            {/* Massive Score Section */}
            <div className="bg-black/50 border border-white/10 p-8 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full pointer-events-none" />
              
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Cosmic Resonance</h3>
              <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="6" strokeDasharray="283" strokeDashoffset={283 - (283 * result.score) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex flex-col items-center justify-center bg-black/40 rounded-full w-36 h-36 backdrop-blur-sm border border-white/5">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400" style={{ filter: "drop-shadow(0 0 10px rgba(217,70,239,0.3))" }}>{result.score}%</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-black text-white mb-2">
                {result.score >= 90 ? 'Soulmate Level 🔮' : result.score >= 80 ? 'Perfect Match 💖' : result.score >= 70 ? 'Great Synergy ✨' : result.score >= 60 ? 'Magnetic Bond 🌟' : 'Karmic Lesson ⏳'}
              </h2>
              <p className="text-zinc-300 max-w-md mx-auto">{result.summary}</p>
            </div>

            {/* Dynamics Bars */}
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(result.dynamics).map(([key, value]) => {
                let progress = 0;
                if (value.includes('High') || value.includes('Deep') || value.includes('Strong')) progress = 90;
                else if (value.includes('Good') || value.includes('Natural')) progress = 75;
                else if (value.includes('Moderate')) progress = 60;
                else progress = 50;

                return (
                  <div key={key} className="bg-black/40 border border-white/5 p-5 rounded-2xl">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-zinc-300 capitalize flex items-center gap-2">
                        {key === 'chemistry' ? <Sparkles size={16} className="text-pink-400"/> : 
                         key === 'communication' ? <RefreshCw size={16} className="text-blue-400"/> :
                         key === 'passion' ? <Heart size={16} className="text-red-400"/> :
                         <Star size={16} className="text-yellow-400"/>}
                        {key}
                      </h4>
                      <span className="text-xs font-bold text-zinc-500">{progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2.5 mb-3">
                      <div className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-sm text-zinc-400">{value}</p>
                  </div>
                );
              })}
            </div>

            {/* ===== VIRAL TALISMAN CARD (Visible on screen) ===== */}
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&family=Gowun+Batang:wght@700&display=swap');
              .font-serif-kr { font-family: 'Gowun Batang', serif; }
              .font-brush-cn { font-family: 'Zhi Mang Xing', cursive; }
            `}</style>
            <div className="bg-zinc-950 rounded-3xl p-6 border border-white/10 text-center animate-in fade-in duration-700">
              <div className="text-zinc-400 font-bold text-xs uppercase tracking-[0.3em] mb-4">My Cosmic Soulmate</div>
              <div className="bg-black/80 py-3 px-6 rounded-2xl border border-white/10 inline-flex flex-col items-center mb-6 gap-1">
                <span className="text-white font-black text-lg">{userName ? userName.toUpperCase() : "YOU"} ❤️</span>
                <span className="text-zinc-300 font-bold text-lg">{matchType === 'idol' ? selectedIdol?.name : customName}</span>
              </div>

              {/* Talisman card */}
              <div className="flex justify-center mb-6">
                <div className={`w-44 h-[330px] bg-[#0A0A0A] rounded-2xl flex flex-col items-center justify-between relative overflow-hidden transition-all duration-500 hover:scale-105 hover:rotate-1 border-[3px] border-t-zinc-300 border-l-zinc-300 border-b-zinc-500 border-r-zinc-500 ${result.score >= 95 ? 'ring-4 ring-zinc-300 shadow-[0_0_50px_rgba(255,255,255,0.4)]' : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]'}`}>
                  <div className="mt-6 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500 font-brush-cn text-3xl font-bold opacity-90 z-10" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}>
                    {result.userElement === 'Fire' ? '火' : result.userElement === 'Water' ? '水' : result.userElement === 'Wood' ? '木' : result.userElement === 'Metal' ? '金' : '土'}
                  </div>
                  <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600 text-[52px] font-serif-kr font-bold flex flex-col items-center justify-center gap-0 py-2 leading-[1.1]" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0px 1px 1px rgba(255,255,255,0.3))' }}>
                    {result.talisman.text.split('').map((char, i) => (
                      <span key={i}>{char}</span>
                    ))}
                  </div>
                  <div className="relative z-10 w-full flex flex-col items-center mb-4 px-3">
                    <div className="w-12 h-[2px] bg-zinc-600/50 mb-3"></div>
                    <div className="text-zinc-400 font-bold text-[10px] tracking-[0.2em] uppercase mb-1 text-center">{result.talisman.en}</div>
                    <div className="text-zinc-500 text-[9px] tracking-wider text-center leading-tight opacity-80 uppercase">{result.talisman.desc}</div>
                    <div className="mt-3 text-[8px] text-zinc-600 font-mono tracking-widest font-bold whitespace-nowrap">
                      {result.score >= 95 ? `✨K-ORACLE // ${new Date().getFullYear()} LEGENDARY✨` : `K-ORACLE // ${new Date().getFullYear()} COLLECTION`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 mb-1" style={{ filter: "drop-shadow(0 0 15px rgba(168,85,247,0.5))" }}>{result.score}%</div>
              <div className="text-zinc-300 font-bold tracking-[0.2em] text-sm uppercase mb-2">
                {result.score >= 90 ? 'Soulmate Level' : result.score >= 80 ? 'Perfect Match' : result.score >= 70 ? 'Great Synergy' : result.score >= 60 ? 'Magnetic Bond' : 'Karmic Lesson'}
              </div>
              <div className="text-zinc-500 text-xs font-mono tracking-widest">thekoracle.com</div>
            </div>

            <button onClick={() => { localStorage.setItem('idolName', matchType === 'idol' ? selectedIdol.name : customName); if(onUnlockPremium) onUnlockPremium(); else alert('Premium feature unavailable.'); }} className="w-full mb-4 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black rounded-2xl text-lg sm:text-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02]">
              <Lock size={20} className="text-white/80" /> Unlock Deep Saju Reading ($11.99)
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleDownloadImage} disabled={isDownloading} className="w-full sm:flex-1 py-4 rounded-2xl bg-zinc-100 text-zinc-900 font-black flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]">
                {isDownloading ? "Generating..." : <><Download size={20} /> Download Card</>}
              </button>
              <button onClick={() => { setStep(1); setSearchQuery(''); setIsDropdownOpen(false); }} className="w-full sm:flex-1 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-all font-bold hover:border-zinc-600">
                Try Another Match
              </button>
            </div>
            
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&family=Gowun+Batang:wght@700&display=swap');
              .font-serif-kr { font-family: 'Gowun Batang', serif; }
              .font-brush-cn { font-family: 'Zhi Mang Xing', cursive; }
            `}</style>
            
            <div className="fixed top-0 left-[-9999px] z-[-10] pointer-events-none">
              <div id="ig-story-card" className="w-[1080px] h-[1920px] pt-12 pb-16 bg-zinc-950 rounded-3xl border border-zinc-800 p-16 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 via-black to-zinc-500/10"></div>
                    <div className="relative z-10 w-full text-center mt-6">
                      <div className="text-zinc-400 font-bold mb-6 uppercase tracking-widest text-4xl">My Cosmic Soulmate</div>
                        <div className="text-[52px] font-black text-white bg-black/80 py-8 px-12 rounded-[3rem] border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-2 w-[900px] mx-auto">
                          <span>{userName ? userName.toUpperCase() : "ME"} ⚔️</span>
                          <span className="text-zinc-200">{matchType === 'idol' ? selectedIdol.name : customName}</span>
                        </div>
                    </div>
                    
                    <div className="relative z-10 my-10">
                      <div className={`w-[540px] h-[1050px] bg-[#0A0A0A] rounded-[4rem] border-[8px] flex flex-col items-center justify-between relative overflow-hidden border-[4px] border-t-zinc-300 border-l-zinc-300 border-b-zinc-500 border-r-zinc-500 ${isUltraRare ? 'ring-4 ring-zinc-300 shadow-[0_0_50px_rgba(255,255,255,0.4)]' : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]'}`}>
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
                          <div className={`mt-6 text-xl text-zinc-600 font-mono tracking-widest font-bold whitespace-nowrap`}>
                            {isUltraRare ? `✨K-ORACLE // ${currentYear} LEGENDARY ✨` : `K-ORACLE // ${currentYear} COLLECTION`}
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
          </div>
        )}
      </div>
    </div>
  );
}
