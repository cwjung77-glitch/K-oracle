"use client";
import { idolsDB } from '../../data/idols';
import { getSajuFromDate } from '../../utils/zodiac';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Heart, Sparkles, RefreshCw, Star, Download, Share2, Crown, Trophy, Target, Search, Lock, Palette, Compass } from 'lucide-react';
import { toPng } from 'html-to-image';

function extractElementFromStem(stemStr = '') {
  if (stemStr.includes('Wood')) return 'Wood';
  if (stemStr.includes('Fire')) return 'Fire';
  if (stemStr.includes('Earth')) return 'Earth';
  if (stemStr.includes('Metal')) return 'Metal';
  if (stemStr.includes('Water')) return 'Water';
  return 'Fire';
}

function computePairCompatibility(userDob, userSaju, targetName, targetDob) {
  const targetSaju = getSajuFromDate(targetDob);
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

  let myElem = userSaju ? extractElementFromStem(userSaju.day.stem) : 'Fire';
  let theirElem = targetSaju ? extractElementFromStem(targetSaju.day.stem) : 'Water';

  let userHash = 0;
  for (let i = 0; i < (userDob || '').length; i++) userHash = userDob.charCodeAt(i) + ((userHash << 5) - userHash);
  userHash = Math.abs(userHash);

  let idolHash = 0;
  const targetStr = (targetName || '') + (targetDob || '');
  for (let i = 0; i < targetStr.length; i++) idolHash = targetStr.charCodeAt(i) + ((idolHash << 5) - idolHash);
  idolHash = Math.abs(idolHash);

  if (!userSaju) myElem = elements[userHash % 5];
  if (!targetSaju) theirElem = elements[idolHash % 5];

  const elementCycle = { Wood: 0, Fire: 1, Earth: 2, Metal: 3, Water: 4 };
  const myIndex = elementCycle[myElem];
  const theirIndex = elementCycle[theirElem];

  let baseScore = 76;
  let relationship = 'Balanced Harmony';

  if (myIndex === theirIndex) {
    baseScore = 84;
    relationship = 'Similar Souls';
  } else if ((myIndex + 1) % 5 === theirIndex || (theirIndex + 1) % 5 === myIndex) {
    baseScore = 93;
    relationship = 'Destined Supporters';
  } else {
    baseScore = 74;
    relationship = 'Magnetic Polarity';
  }

  // Factor in Day Branch harmony bonus from real Manseryeok
  const combinedHash = Math.abs(userHash ^ idolHash);
  const variance = (combinedHash % 11) - 4; // -4 to +6
  const score = Math.min(99, Math.max(62, baseScore + variance));

  return {
    score,
    relationship,
    myElem,
    theirElem,
    targetSaju,
    combinedHash,
  };
}

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

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const [selectedIdol, setSelectedIdol] = useState(idolsDB[0]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('userName') || '';
      const savedDob = localStorage.getItem('userDob') || '';
      setUserName(savedName);
      setDob(savedDob);
      setTime(localStorage.getItem('userTime') || '12:00');
      setGender(localStorage.getItem('userGender') || 'female');

      const params = new URLSearchParams(window.location.search);
      const partnerName = params.get('partnerName');
      const partnerDob = params.get('partnerDob');
      const autoDob = params.get('userDob');
      if (autoDob) {
        setDob(autoDob);
        localStorage.setItem('userDob', autoDob);
      }
      if (partnerName) {
        const matched = idolsDB.find(
          (i) => i.name.toLowerCase() === partnerName.toLowerCase() || i.name.toLowerCase().includes(partnerName.toLowerCase())
        );
        if (matched) {
          setSelectedIdol(matched);
          setMatchType('idol');
          localStorage.setItem('idolName', matched.name);
        } else if (partnerDob) {
          setMatchType('custom');
          setCustomName(partnerName);
          setCustomDob(partnerDob);
          localStorage.setItem('idolName', partnerName);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (dob) localStorage.setItem('userDob', dob);
    if (userName) localStorage.setItem('userName', userName);
  }, [dob, userName]);

  const filteredIdols = useMemo(() => {
    if (!searchQuery) return idolsDB.slice(0, 8);
    return idolsDB.filter((idol) => idol.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8);
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
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#09090b',
        style: { transform: 'scale(1)', transformOrigin: 'top left' },
      });
      const res = await fetch('/api/download-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl }),
      });
      if (!res.ok) throw new Error("Failed to generate download");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `k-oracle-saju-${(userName || 'match').replace(/\s+/g, '-')}-match.jpg`;
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
    if (!requestName) return;
    setRequestStatus(`Thanks! We will add ${requestName} to our DB soon.`);
    setTimeout(() => {
      setRequestStatus('');
      setShowRequestIdol(false);
      setRequestName('');
    }, 3000);
  };

  const runCompatibilityForTarget = (targetObj, isInstantSwitch = false) => {
    const effectiveName = userName || 'VIP Explorer';
    if (!dob) {
      alert("Please enter your birth date.");
      return;
    }
    if (!userName) setUserName(effectiveName);

    if (!isInstantSwitch) setLoading(true);
    localStorage.setItem('userDob', dob);
    localStorage.setItem('userTime', timeUnknown ? 'Unknown' : time);
    localStorage.setItem('userGender', gender);
    localStorage.setItem('userName', effectiveName);

    const targetName = targetObj.name;
    const targetDob = targetObj.dob;
    localStorage.setItem('idolName', targetName);

    const userSaju = getSajuFromDate(dob);
    const pair = computePairCompatibility(dob, userSaju, targetName, targetDob);
    const { score, relationship, myElem, theirElem, targetSaju, combinedHash } = pair;

    // Group Chemistry Leaderboard Calculation
    const targetGroup = targetName.match(/\((.*?)\)/)?.[1] || '';
    let groupLeaderboard = [];
    if (matchType === 'idol' && targetGroup) {
      const groupMembers = idolsDB.filter((i) => {
        const g = i.name.match(/\((.*?)\)/)?.[1] || '';
        return g.toLowerCase() === targetGroup.toLowerCase();
      });
      if (groupMembers.length > 1) {
        groupLeaderboard = groupMembers
          .map((member) => {
            const mPair = computePairCompatibility(dob, userSaju, member.name, member.dob);
            return {
              idol: member,
              memberName: member.name.split(' (')[0],
              score: mPair.score,
              elem: mPair.theirElem,
              dayMaster: mPair.targetSaju?.day?.stem || mPair.theirElem,
              relationship: mPair.relationship,
            };
          })
          .sort((a, b) => b.score - a.score);
      }
    }

    const descriptions = {
      'Similar Souls': `Both of you resonate on the ${myElem} frequency (${userSaju?.day?.stem || myElem} & ${targetSaju?.day?.stem || theirElem}). In Korean Saju, this Mirror Pillar bond creates effortless telepathy and unshakeable emotional comfort.`,
      'Destined Supporters': `A true Generating Cycle (상생)! Your ${userSaju?.day?.stem || myElem} Day Master and their ${targetSaju?.day?.stem || theirElem} Day Master feed each other's aura—creating soulmate-level inspiration, luck, and protection.`,
      'Magnetic Polarity': `Your ${userSaju?.day?.stem || myElem} energy and their ${targetSaju?.day?.stem || theirElem} energy form a high-voltage Yin-Yang attraction. What begins as thrilling contrast matures into an addictive, unforgettable bond.`,
      'Balanced Harmony': `Your Four Pillars weave together with natural grace. Your ${myElem} core and their ${theirElem} essence balance each other's blind spots.`,
    };

    const dynamics = {
      chemistry: score >= 85 ? 'High natural chemistry — magnetic attraction' : score >= 75 ? 'Good chemistry with growing spark' : 'Moderate — builds deeply over time',
      communication: score >= 80 ? 'Deep intuitive telepathy' : score >= 70 ? 'Natural flow with playful banter' : 'Moderate — sparks through curiosity',
      passion: score >= 88 ? 'Strong volcanic intensity' : score >= 75 ? 'Good warm energy exchange' : 'Moderate steady flame',
      trust: score >= 85 ? 'High unshakable foundation' : score >= 72 ? 'Good solid ground' : 'Moderate — grows stronger together',
    };

    const talismans = [
      { text: '천생연분', en: 'Soulmate', desc: 'A match made in heaven', tier: 'high' },
      { text: '백년해로', en: 'Eternal Bond', desc: 'Lifelong harmony together', tier: 'high' },
      { text: '최애등극', en: 'Ultimate Bias', desc: 'An undeniable magnetic attraction', tier: 'high' },
      { text: '성덕인증', en: 'Lucky Fan', desc: 'A dreamlike connection bringing joy', tier: 'high' },
      { text: '운명공동', en: 'Shared Destiny', desc: 'Your paths are cosmically intertwined', tier: 'high' },
      { text: '찰떡궁합', en: 'Perfect Match', desc: 'Fitting together like puzzle pieces', tier: 'high' },
      { text: '비익연리', en: 'Twin Flames', desc: 'Two souls sharing one destiny', tier: 'high' },
      { text: '월하빙인', en: 'Red Thread', desc: 'Bound by the invisible thread of fate', tier: 'high' },
      { text: '연분천정', en: 'Heaven Sent', desc: 'A connection blessed by the heavens', tier: 'high' },
      { text: '쌍방구원', en: 'Mutual Salvation', desc: 'Saving each other through your bond', tier: 'high' },
      { text: '이심전심', en: 'Telepathy', desc: 'Understanding without speaking', tier: 'mid' },
      { text: '환상호흡', en: 'Dream Team', desc: 'Perfect synergy in everything you do', tier: 'mid' },
      { text: '덕통사고', en: 'Instant Crush', desc: 'A sudden, overpowering connection', tier: 'mid' },
      { text: '상호보완', en: 'Mutual Synergy', desc: 'Balancing each other flawlessly', tier: 'mid' },
      { text: '전생인연', en: 'Past Life', desc: 'Lovers or best friends in a past life', tier: 'mid' },
      { text: '음양조화', en: 'Yin & Yang', desc: 'Perfect elemental balance', tier: 'mid' },
      { text: '자석끌림', en: 'Magnetic', desc: 'Opposites attracting fiercely', tier: 'mid' },
      { text: '꽃길만걷', en: 'Flower Path', desc: 'Only beautiful days ahead together', tier: 'mid' },
      { text: '덕질만렙', en: 'Max Devotion', desc: 'Unwavering loyalty and admiration', tier: 'low' },
      { text: '광클성공', en: 'Perfect Timing', desc: 'Meeting at the right cosmic moment', tier: 'low' },
      { text: '일취월장', en: 'Growing Together', desc: 'Inspiring each other to evolve', tier: 'low' },
      { text: '평안무사', en: 'Peaceful', desc: 'A calm relationship free of drama', tier: 'low' },
    ];

    const targetTier = score >= 88 ? 'high' : score >= 75 ? 'mid' : 'low';
    const validTalismans = talismans.filter((t) => t.tier === targetTier);

    const applyResult = () => {
      setResult({
        score,
        relationship,
        summary: descriptions[relationship],
        userElement: myElem,
        theirElement: theirElem,
        userSaju,
        targetSaju,
        groupName: targetGroup,
        groupLeaderboard,
        dynamics,
        talisman: validTalismans[combinedHash % validTalismans.length] || talismans[0],
      });
      setStep(2);
      setLoading(false);
    };

    if (isInstantSwitch) {
      applyResult();
    } else {
      setTimeout(applyResult, 1200);
    }
  };

  const handleMatch = () => {
    if (!dob || !userName) {
      alert("Please enter your name and birth date.");
      return;
    }
    if (matchType === 'idol' && !selectedIdol) {
      alert("Please select an idol.");
      return;
    }
    if (matchType === 'custom' && (!customDob || !customName)) {
      alert("Please enter their name and birth date.");
      return;
    }
    const targetPerson = matchType === 'idol' ? selectedIdol : { name: customName, dob: customDob };
    runCompatibilityForTarget(targetPerson, false);
  };

  const handleShareGroupLeaderboardX = () => {
    if (!result || !result.groupLeaderboard?.length) return;
    const top3 = result.groupLeaderboard
      .slice(0, 3)
      .map((m, idx) => `${idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'} ${m.memberName} (${m.score}%)`)
      .join('\n');
    const text = `🔮 My ${result.groupName} Saju Soulmate Ranking (${result.userSaju?.day?.stem || result.userElement} Day Master):\n${top3}\n\nCheck your K-Pop bias destiny chart:`;
    const url = `https://www.thekoracle.com/?partnerName=${encodeURIComponent(selectedIdol?.name || '')}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const userElement = result?.userElement || 'Fire';
  const isUltraRare = result?.score >= 90;
  const currentYear = new Date().getFullYear();

  const getGroupColors = (group) => {
    if (!group) return { bg: 'from-pink-500/20 to-orange-500/20', border: 'border-pink-500/30', text: 'text-pink-400' };
    const g = group.toUpperCase();
    if (g.includes('BTS')) return { bg: 'from-purple-500/20 to-fuchsia-500/20', border: 'border-purple-500/30', text: 'text-purple-400' };
    if (g.includes('BLACKPINK')) return { bg: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30', text: 'text-pink-400' };
    if (g.includes('TWICE')) return { bg: 'from-orange-400/20 to-pink-400/20', border: 'border-orange-400/30', text: 'text-orange-400' };
    if (g.includes('STRAY KIDS')) return { bg: 'from-red-500/20 to-rose-500/20', border: 'border-red-500/30', text: 'text-red-400' };
    if (g.includes('SEVENTEEN')) return { bg: 'from-rose-400/20 to-blue-400/20', border: 'border-rose-400/30', text: 'text-rose-400' };
    if (g.includes('AESPA')) return { bg: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400' };
    if (g.includes('NEWJEANS')) return { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', text: 'text-blue-400' };
    if (g.includes('ENHYPEN')) return { bg: 'from-red-600/20 to-orange-600/20', border: 'border-red-600/30', text: 'text-red-500' };
    if (g.includes('TXT') || g.includes('TOMORROW X TOGETHER')) return { bg: 'from-cyan-400/20 to-blue-400/20', border: 'border-cyan-400/30', text: 'text-cyan-400' };
    if (g.includes('NCT') || g.includes('WAYV')) return { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', text: 'text-green-400' };
    if (g.includes('ATEEZ')) return { bg: 'from-amber-500/20 to-orange-600/20', border: 'border-amber-500/30', text: 'text-amber-400' };
    return { bg: 'from-pink-500/20 to-orange-500/20', border: 'border-pink-500/30', text: 'text-pink-400' };
  };

  const selectedGroup = selectedIdol?.name ? (selectedIdol.name.match(/\((.*?)\)/)?.[1] || '') : '';
  const selectedIdolName = selectedIdol?.name ? selectedIdol.name.split(' (')[0] : '';
  const groupColors = getGroupColors(selectedGroup);

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 md:p-10 relative mt-8">
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-zinc-300 text-sm font-bold border border-zinc-700/50 mb-4">
            <Sparkles size={16} /> K-Destiny Manseryeok Matrix
          </div>
          <h2 className="text-4xl font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 drop-shadow-md">Saju Compatibility</span>
          </h2>
          <p className="text-zinc-400 mt-2">Decode your authentic Korean Four Pillars synergy &amp; full group bias ranking.</p>
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
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 mb-2 animate-pulse">Calculating Manseryeok Pillars...</h3>
              <p className="text-zinc-400 text-sm tracking-widest uppercase">Aligning Heavenly Stems &amp; Earthly Branches</p>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 relative">
              <div className="flex-1 flex flex-col bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group text-left">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2"><Target size={20} className="text-violet-400" /> My Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Name</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Sarah" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Birth Date</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Birth Time</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} disabled={timeUnknown} className={`w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert ${timeUnknown ? 'opacity-40 cursor-not-allowed' : ''}`} />
                    <label className="flex items-center gap-2 mt-2 cursor-pointer group">
                      <input type="checkbox" checked={timeUnknown} onChange={(e) => setTimeUnknown(e.target.checked)} className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 accent-violet-500 cursor-pointer" />
                      <span className="text-zinc-400 text-xs group-hover:text-zinc-300 transition-colors">I don&apos;t know my birth time</span>
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
                  <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-400">&amp;</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group text-left">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500"></div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-white flex items-center gap-2"><Star size={20} className="text-pink-400" /> Match With</h3>
                  <div className="flex bg-zinc-900 rounded-lg p-1">
                    <button onClick={() => setMatchType('idol')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${matchType === 'idol' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}>Idol</button>
                    <button onClick={() => setMatchType('custom')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${matchType === 'custom' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}>Custom</button>
                  </div>
                </div>

                {matchType === 'idol' ? (
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="relative" ref={searchRef}>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 text-zinc-500" size={18} />
                        <input type="text" placeholder="Search 500+ K-Pop Idols or Groups..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }} onFocus={() => setIsDropdownOpen(true)} className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" />
                      </div>
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto">
                          {filteredIdols.length > 0 ? filteredIdols.map((idol) => (
                            <div key={idol.id} onMouseDown={(e) => { e.preventDefault(); setSelectedIdol(idol); setIsDropdownOpen(false); setSearchQuery(''); }} className="px-4 py-3 hover:bg-zinc-800 cursor-pointer flex justify-between items-center transition-colors border-b border-zinc-800/50 last:border-0">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-600">{idol.name.charAt(0)}</div>
                                <div>
                                  <div className="text-white font-bold text-sm">{idol.name}</div>
                                  <div className="text-zinc-500 text-xs">{idol.dob}</div>
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
                          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${groupColors.bg} border ${groupColors.border} flex items-center justify-center mb-3 transition-colors duration-500`}>
                            <Star size={24} className={`${groupColors.text} transition-colors duration-500`} />
                          </div>
                          <div className="text-xl font-black text-white mb-1">{selectedIdolName}</div>
                          <div className={`text-sm font-bold ${groupColors.text} transition-colors duration-500`}>{selectedGroup}</div>
                          <div className="text-xs text-zinc-500 mt-1 font-mono">{selectedIdol.dob}</div>
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
                      <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" placeholder="e.g. Michael" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Their Birth Date</label>
                      <input type="date" value={customDob} onChange={(e) => setCustomDob(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Their Birth Time</label>
                      <input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)} disabled={customTimeUnknown} className={`w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert ${customTimeUnknown ? 'opacity-40 cursor-not-allowed' : ''}`} />
                      <label className="flex items-center gap-2 mt-2 cursor-pointer group">
                        <input type="checkbox" checked={customTimeUnknown} onChange={(e) => setCustomTimeUnknown(e.target.checked)} className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 accent-pink-500 cursor-pointer" />
                        <span className="text-zinc-400 text-xs group-hover:text-zinc-300 transition-colors">I don&apos;t know their birth time</span>
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
            {/* Exact Manseryeok Pillar Comparison Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-900/70 border border-violet-500/20 p-5 rounded-2xl text-left">
              <div className="flex items-center gap-3 bg-black/50 p-4 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 font-bold">
                  {result.userSaju?.day?.hanja || '命'}
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{userName || 'You'}&apos;s Day Master</div>
                  <div className="text-sm font-black text-white">{result.userSaju ? `${result.userSaju.day.stem} / ${result.userSaju.day.branch}` : `${result.userElement} Element`}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/50 p-4 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-300 font-bold">
                  {result.targetSaju?.day?.hanja || '緣'}
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{matchType === 'idol' ? selectedIdolName : customName}&apos;s Day Master</div>
                  <div className="text-sm font-black text-white">{result.targetSaju ? `${result.targetSaju.day.stem} / ${result.targetSaju.day.branch}` : `${result.theirElement} Element`}</div>
                </div>
              </div>
            </div>

            {/* Massive Score Section */}
            <div className="bg-black/50 border border-white/10 p-8 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full pointer-events-none" />

              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Cosmic Resonance • {result.relationship}</h3>
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
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{result.score}%</span>
                </div>
              </div>

              <h2 className="text-3xl font-black text-white mb-2">
                {result.score >= 90 ? 'Soulmate Level 🔮' : result.score >= 80 ? 'Perfect Match 💖' : result.score >= 70 ? 'Great Synergy ✨' : 'Magnetic Polarity 🌟'}
              </h2>
              <p className="text-zinc-300 max-w-lg mx-auto leading-relaxed">{result.summary}</p>
            </div>

            {/* NEW VIRAL FEATURE: Group Bias Chemistry Leaderboard */}
            {result.groupLeaderboard && result.groupLeaderboard.length > 1 && (
              <div className="bg-gradient-to-b from-zinc-900/90 to-black border border-violet-500/30 rounded-3xl p-6 sm:p-8 text-left shadow-[0_0_40px_rgba(139,92,246,0.1)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-yellow-400 mb-1">
                      <Trophy size={14} /> Viral Fandom Ranking
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Your <span className="text-violet-400">{result.groupName}</span> All-Member Chemistry Ranking
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Click any member below to view your instant Saju match card with them</p>
                  </div>
                  <button
                    onClick={handleShareGroupLeaderboardX}
                    className="px-4 py-2.5 rounded-xl bg-[#1DA1F2]/20 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-white border border-[#1DA1F2]/40 font-bold text-xs flex items-center justify-center gap-2 transition-all shrink-0"
                  >
                    <Share2 size={14} /> Share My {result.groupName} Top 3 on X
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.groupLeaderboard.map((item, idx) => {
                    const isCurrent = selectedIdol?.id === item.idol.id;
                    const rankBadge = idx === 0 ? '🥇 #1 Soulmate' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`;
                    return (
                      <button
                        key={item.idol.id}
                        onClick={() => {
                          setSelectedIdol(item.idol);
                          runCompatibilityForTarget(item.idol, true);
                        }}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all text-left ${
                          isCurrent
                            ? 'bg-gradient-to-r from-violet-600/30 to-pink-600/30 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.2)]'
                            : 'bg-zinc-900/60 hover:bg-zinc-800 border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${idx === 0 ? 'bg-yellow-500 text-black' : 'bg-zinc-800 text-zinc-300'}`}>
                            {rankBadge}
                          </span>
                          <div>
                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                              {item.memberName}
                              {isCurrent && <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500 text-white">Viewing</span>}
                            </div>
                            <div className="text-[11px] text-zinc-400">{item.dayMaster} • {item.relationship}</div>
                          </div>
                        </div>
                        <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-pink-400">
                          {item.score}%
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dynamics Bars */}
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {Object.entries(result.dynamics).map(([key, value]) => {
                let progress = 75;
                if (value.includes('High') || value.includes('Deep') || value.includes('Strong')) progress = 92;
                else if (value.includes('Good') || value.includes('Natural')) progress = 80;
                else if (value.includes('Moderate')) progress = 68;

                return (
                  <div key={key} className="bg-black/40 border border-white/5 p-5 rounded-2xl">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-zinc-300 capitalize flex items-center gap-2">
                        {key === 'chemistry' ? <Sparkles size={16} className="text-pink-400" /> :
                         key === 'communication' ? <RefreshCw size={16} className="text-blue-400" /> :
                         key === 'passion' ? <Heart size={16} className="text-red-400" /> :
                         <Star size={16} className="text-yellow-400" />}
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

              <div className="flex justify-center mb-6">
                <div className={`w-44 h-[380px] bg-[#0A0A0A] rounded-2xl flex flex-col items-center justify-between relative overflow-hidden transition-all duration-500 hover:scale-105 hover:rotate-1 border-[3px] border-t-zinc-300 border-l-zinc-300 border-b-zinc-500 border-r-zinc-500 ${result.score >= 95 ? 'ring-4 ring-zinc-300 shadow-[0_0_50px_rgba(255,255,255,0.4)]' : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]'}`}>
                  <div className="mt-6 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500 font-brush-cn text-3xl font-bold opacity-90 z-10">
                    {result.userElement === 'Fire' ? '火' : result.userElement === 'Water' ? '水' : result.userElement === 'Wood' ? '木' : result.userElement === 'Metal' ? '金' : '土'}
                  </div>
                  <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600 text-[52px] font-serif-kr font-bold flex flex-col items-center justify-center gap-0 py-2 leading-[1.1]">
                    {result.talisman.text.split('').map((char, i) => (
                      <span key={i}>{char}</span>
                    ))}
                  </div>
                  <div className="relative z-10 w-full flex flex-col items-center mb-4 px-3">
                    <div className="w-12 h-[2px] bg-zinc-600/50 mb-3"></div>
                    <div className="text-zinc-400 font-bold text-[10px] tracking-[0.2em] uppercase mb-1 text-center">{result.talisman.en}</div>
                    <div className="text-zinc-500 text-[9px] tracking-wider text-center leading-tight opacity-80 uppercase">{result.talisman.desc}</div>
                    <div className="mt-3 text-[8px] text-zinc-600 font-mono tracking-widest font-bold whitespace-nowrap">
                      {result.score >= 95 ? `✨K-ORACLE // ${currentYear} LEGENDARY✨` : `K-ORACLE // ${currentYear} COLLECTION`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 mb-1">{result.score}%</div>
              <div className="text-zinc-300 font-bold tracking-[0.2em] text-sm uppercase mb-2">
                {result.score >= 90 ? 'Soulmate Level' : result.score >= 80 ? 'Perfect Match' : result.score >= 70 ? 'Great Synergy' : 'Magnetic Bond'}
              </div>
              <div className="text-zinc-500 text-xs font-mono tracking-widest">www.thekoracle.com</div>
            </div>

            {/* Teaser Blur UI */}
            <div className="relative mt-8 mb-6 p-6 sm:p-8 rounded-3xl border border-white/5 bg-zinc-900/50 overflow-hidden text-left">
              <div className="blur-[6px] select-none opacity-40">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Deep Cosmic Chemistry &amp; Past Life Karma</h3>
                <p className="mb-2 text-zinc-300 leading-relaxed">The interaction between your core elements creates a dynamic flow of energy. However, in the upcoming cycle, there is a hidden clash that might trigger unexpected events. If you look closely at your destiny matrix, you will see...</p>
                <p className="text-zinc-300 leading-relaxed">Past life karma indicates a deep, unresolved connection. To harness this cosmic energy correctly, you must...</p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-12">
                <Lock size={36} className="text-fuchsia-500 mb-4 animate-pulse" />
                <h4 className="text-lg sm:text-xl font-black text-white mb-4 text-center px-4">Unlock Your Full 2026-2027 Relationship &amp; Past-Life Karma Report</h4>
                <button
                  onClick={() => {
                    try {
                      localStorage.setItem('idolName', matchType === 'idol' ? selectedIdol.name : customName);
                    } catch (e) {}
                    if (onUnlockPremium) onUnlockPremium();
                  }}
                  className="w-[90%] max-w-sm py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black rounded-2xl text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02]"
                >
                  <Lock size={18} className="text-white/80" /> Unlock Deep Report ($4.99)
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleDownloadImage} disabled={isDownloading} className="w-full sm:flex-1 py-4 rounded-2xl bg-zinc-100 text-zinc-900 font-black flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                {isDownloading ? "Generating..." : <><Download size={20} /> Download Story Card</>}
              </button>
              <button onClick={() => { setStep(1); setSearchQuery(''); setIsDropdownOpen(false); }} className="w-full sm:flex-1 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-all font-bold hover:border-zinc-600">
                Try Another Match
              </button>
            </div>

            {/* Offscreen 1080x1920 IG Story Card */}
            <div className="fixed top-0 left-[-9999px] z-[-10] pointer-events-none">
              <div id="ig-story-card" className="w-[1080px] h-[1920px] pt-12 pb-16 bg-zinc-950 rounded-3xl border border-zinc-800 p-16 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 via-black to-zinc-500/10"></div>
                <div className="relative z-10 w-full text-center mt-6">
                  <div className="text-zinc-400 font-bold mb-6 uppercase tracking-widest text-4xl">My Cosmic Soulmate</div>
                  <div className="text-[52px] font-black text-white bg-black/80 py-8 px-12 rounded-[3rem] border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-2 w-[900px] mx-auto">
                    <span>{userName ? userName.toUpperCase() : "ME"} ❤️</span>
                    <span className="text-zinc-200">{matchType === 'idol' ? selectedIdol.name : customName}</span>
                  </div>
                </div>

                <div className="relative z-10 my-10">
                  <div className={`w-[540px] h-[1050px] bg-[#0A0A0A] rounded-[4rem] flex flex-col items-center justify-between relative overflow-hidden border-[4px] border-t-zinc-300 border-l-zinc-300 border-b-zinc-500 border-r-zinc-500 ${isUltraRare ? 'ring-4 ring-zinc-300 shadow-[0_0_50px_rgba(255,255,255,0.4)]' : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]'}`}>
                    <div className="mt-16 w-32 h-32 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500 font-brush-cn text-8xl font-bold opacity-90 z-10">
                      {userElement === 'Fire' ? '火' : userElement === 'Water' ? '水' : userElement === 'Wood' ? '木' : userElement === 'Metal' ? '金' : '土'}
                    </div>
                    <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600 text-[120px] font-serif-kr font-bold flex flex-col items-center justify-center gap-0 py-2 leading-[1.1]">
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
                      <div className="mt-6 text-xl text-zinc-600 font-mono tracking-widest font-bold whitespace-nowrap">
                        {isUltraRare ? `✨K-ORACLE // ${currentYear} LEGENDARY ✨` : `K-ORACLE // ${currentYear} COLLECTION`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 text-center mb-6">
                  <div className="text-[180px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 mb-6">{result.score}%</div>
                  <div className="text-zinc-300 font-bold tracking-[0.3em] text-4xl uppercase mb-12">
                    {result.score >= 90 ? 'Soulmate Level' : result.score >= 80 ? 'Perfect Match' : result.score >= 70 ? 'Great Synergy' : 'Magnetic Bond'}
                  </div>
                  <div className="relative z-10 w-fit mx-auto bg-zinc-900/90 border border-zinc-800 text-zinc-300 py-6 px-12 rounded-full flex items-center justify-center gap-4 font-bold shadow-2xl mt-12 text-3xl tracking-widest">
                    <Search size={32} className="text-zinc-500" /> www.thekoracle.com
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
