"use client";

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Lock, Sparkles, TrendingUp, HeartPulse, Activity, Download, Flame, MessageSquare, Send, Palette, Compass } from 'lucide-react';
import CosmicLoader from '../ui/CosmicLoader';
import HolographicTalismanCard from '../ui/HolographicTalismanCard';

const personalTalismans = [
  { text: '만사형통', en: 'Ultimate Success', desc: 'Everything you do will prosper' },
  { text: '소원성취', en: 'Dreams Realized', desc: 'Your deepest desires will come true' },
  { text: '금옥만당', en: 'Infinite Wealth', desc: 'Gold and jewels will fill your home' },
  { text: '무병장수', en: 'Iron Health', desc: 'A long life free of illness' },
  { text: '입신양명', en: 'Fame & Glory', desc: 'Your name will be known across the world' },
  { text: '일취월장', en: 'Rapid Growth', desc: 'Improving and succeeding day by day' },
  { text: '대기만성', en: 'Late Bloomer', desc: 'Great success comes to those who wait' },
  { text: '승승장구', en: 'Unstoppable', desc: 'Winning every battle you face' },
  { text: '탄탄대로', en: 'Smooth Sailing', desc: 'A clear and easy path ahead' },
  { text: '부귀영화', en: 'Royal Destiny', desc: 'Living a life of luxury and honor' },
  { text: '운수대통', en: 'Lucky Star', desc: 'The universe is aligning in your favor' },
  { text: '액운퇴치', en: 'Karma Shield', desc: 'Blocking all negative energy and bad luck' },
  { text: '귀인도움', en: 'Angel Helper', desc: 'Powerful allies will come to rescue you' },
  { text: '심신안정', en: 'Inner Peace', desc: 'A calm mind and a strong spirit' },
  { text: '자수성가', en: 'Self Made', desc: 'Building an empire with your own hands' },
  { text: '개과천선', en: 'Fresh Start', desc: 'A total transformation of your destiny' },
  { text: '백전백승', en: 'Undefeated', desc: 'Victory is guaranteed in all endeavors' },
  { text: '천우신조', en: 'Divine Help', desc: 'The heavens are actively protecting you' },
  { text: '명예회복', en: 'Redemption', desc: 'Reclaiming your lost honor and status' },
  { text: '일확천금', en: 'Sudden Wealth', desc: 'A massive windfall of money is coming' },
  { text: '기사회생', en: 'Miracle Comeback', desc: 'Rising from the ashes like a phoenix' },
  { text: '재수대길', en: 'Mega Jackpot', desc: 'Extreme luck in finances and business' },
  { text: '가화만사', en: 'Family Harmony', desc: 'Peace and prosperity in your household' },
  { text: '호연지기', en: 'Bold Spirit', desc: 'Fearless energy to conquer the world' },
  { text: '천하무적', en: 'Invincible', desc: 'Nothing can stand in your way' },
  { text: '금의환향', en: 'Glorious Return', desc: 'Returning home in triumph and success' },
  { text: '전도유망', en: 'Bright Future', desc: 'Your potential is limitless' },
  { text: '칠전팔기', en: 'Resilience', desc: 'Falling seven times, standing up eight' },
  { text: '전화위복', en: 'Blessing in Disguise', desc: 'Turning a crisis into a massive opportunity' },
  { text: '마적성공', en: 'Magic Touch', desc: 'Everything you touch turns to gold' },
];

const ELEMENT_BEAUTY_PRESCRIPTION = {
  Wood: {
    lacking: 'Fire & Water Balance',
    luckyColor: 'Coral Peach & Dewy Rose',
    hex: '#FF7F50',
    shade: 'Rom&nd Juicy Lasting Tint #09 Litchi Coral',
    reason: 'Your Wood Day Master thrives when warmed by Fire energy—wearing coral-peach and rose lip/blush tones activates your expression star (식상) and attracts career & romantic benefactors.',
  },
  Fire: {
    lacking: 'Earth & Metal Grounding',
    luckyColor: 'Nude Fig & Champagne Gold',
    hex: '#D2B48C',
    shade: 'Dasique Shadow Palette #03 Nude Potion',
    reason: 'Your radiant Fire Day Master channels wealth and stability through soft Earth and Champagne-Gold shimmer, preventing burnout while magnetizing high-value opportunities.',
  },
  Earth: {
    lacking: 'Metal & Wood Vitality',
    luckyColor: 'Mauve Berry & Icy Lavender',
    hex: '#E0B0FF',
    shade: 'Rom&nd Juicy Lasting Tint #25 Bare Grape',
    reason: 'Your grounded Earth Day Master unlocks hidden charm and financial liquidity when paired with crisp Metal/Cool Mauve tones and luminous glass-skin highlights.',
  },
  Metal: {
    lacking: 'Water & Fire Radiance',
    luckyColor: 'Velvet Crimson & Plum Berry',
    hex: '#DC143C',
    shade: 'Clio Dewy Syrup Tint #04 Plum Noir',
    reason: 'Your sharp Metal Day Master commands authority; adding a touch of deep crimson or berry-water gloss softens harsh edges and triggers your Peach Blossom (도화살) attraction.',
  },
  Water: {
    lacking: 'Wood & Fire Warmth',
    luckyColor: 'Apricot Milk Tea & Warm Rose',
    hex: '#F4A460',
    shade: 'Etude Fixing Tint #04 Ginger Milk Tea',
    reason: 'Your deep Water Day Master flows effortlessly toward wealth when anchored by warm apricot, rose-coral, and golden-hour cheek tones.',
  },
};

function getPersonalTalisman(name, dob) {
  const str = name + dob;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return personalTalismans[Math.abs(hash) % personalTalismans.length];
}

function formatCategoryMarkdown(text = '') {
  return text.replace(/\[CATEGORY:\s*(.*?)\]/gi, '\n### 🔮 $1\n');
}

export default function DeepDiveReport({ lang = "en" }) {
  const isKo = lang === "ko";
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState(false);
  const [aiReport, setAiReport] = useState("");
  const [karmaReport, setKarmaReport] = useState("");
  const [reportData, setReportData] = useState(null);

  // Interactive 1:1 Saju Master Q&A State
  const [oracleMessages, setOracleMessages] = useState([
    {
      role: 'master',
      text: isKo
        ? '운명의 서재에 오신 것을 환영합니다. 사주 원국과 2026~2027 대운 흐름을 바탕으로 재물 타이밍, 이직/사업, 연애/궁합 등 더 깊이 알고 싶은 질문을 남겨주세요.'
        : 'Welcome to the Inner Sanctum. Your Four Pillars chart is open before me. Ask any follow-up question regarding your 2026-2027 wealth timing, career pivot, or romantic destiny.',
    },
  ]);
  const [oracleInput, setOracleInput] = useState('');

  const plan = typeof window !== 'undefined' ? localStorage.getItem("purchasedPlan") || "bundle" : "bundle";
  const displayYear = plan === 'compatibility' ? 'Cosmic Chemistry' : plan === 'fullyear' ? '2027' : plan === 'bundle' ? '2026-2027' : '2026';
  const isCompatibility = plan === "compatibility";

  const fetchReport = async () => {
    setIsGenerating(true);

    let dailyVibe = "";
    try {
      const cachedDaily = localStorage.getItem('daily_result');
      if (cachedDaily) {
        dailyVibe = JSON.parse(cachedDaily)?.vibe || "";
      }
    } catch (e) {}

    const userDob = localStorage.getItem("userDob") || "1995-10-15";
    const userName = localStorage.getItem("userName") || "VIP Client";
    const idolName = localStorage.getItem("idolName") || "";
    const cacheKey = `saju_v2_${plan}_${userDob}_${userName}_${idolName}_${lang}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        const data = JSON.parse(cached);
        if (data && data.reportText) {
          setError(false);
          setAiReport(data.reportText);
          setKarmaReport(data.karmaText || "");
          localStorage.setItem("aiKarma", data.karmaText || "");
          setReportData(data);
          setIsGenerating(false);
          return;
        }
      } catch (e) {}
    }

    try {
      const res = await fetch('/api/generate-saju', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          idolName,
          userName,
          birthData: userDob + " " + (localStorage.getItem("userTime") || "12:00"),
          gender: localStorage.getItem("userGender") || "female",
          lang,
          dailyVibe,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setError(false);
        setAiReport(data.reportText);
        setKarmaReport(data.karmaText || "");
        localStorage.setItem("aiKarma", data.karmaText || "");
        setReportData(data);
        localStorage.setItem(cacheKey, JSON.stringify(data));

        try {
          const historyStr = localStorage.getItem('kOracleHistory') || '[]';
          let history = JSON.parse(historyStr);
          const newEntry = {
            type: 'saju',
            plan,
            dob: userDob,
            name: userName,
            idolName,
            lang,
            date: new Date().toISOString().split('T')[0],
            cacheKey,
          };
          history = history.filter((h) => h.cacheKey !== newEntry.cacheKey);
          history.unshift(newEntry);
          if (history.length > 5) history = history.slice(0, 5);
          localStorage.setItem('kOracleHistory', JSON.stringify(history));
        } catch (e) {
          console.error(e);
        }
      } else {
        setError(true);
        localStorage.removeItem("aiKarma");
        if (data.isRateLimit) {
          setAiReport(isKo ? "우주의 에너지가 폭발하고 있습니다! 1분 뒤에 다시 시도해주세요." : "The cosmos is overwhelmed with energy! Please wait 1 minute and try again below.");
        } else {
          setAiReport(isKo ? "우주의 에너지가 일시적으로 혼란스럽습니다. 아래 버튼을 눌러 다시 시도해 주세요." : "The cosmos is experiencing a temporary disturbance. Please try again below.");
        }
      }
    } catch (err) {
      console.error("Failed to fetch report", err);
      setError(true);
      localStorage.removeItem("aiKarma");
      setAiReport("Cosmic interference detected. Please retry the generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [lang]);

  const handleOracleAsk = (e) => {
    e.preventDefault();
    if (!oracleInput.trim()) return;
    const q = oracleInput.trim();
    setOracleMessages((prev) => [...prev, { role: 'user', text: q }]);
    setOracleInput('');

    const uElem = reportData?.userElement || 'Fire';
    const dayMasterStr = reportData?.sajuChart?.dayMaster || `${uElem} Day Master`;
    const qLower = q.toLowerCase();
    let reply = '';

    if (qLower.includes('money') || qLower.includes('wealth') || qLower.includes('career') || qLower.includes('재물') || qLower.includes('돈') || qLower.includes('이직')) {
      reply = isKo
        ? `${dayMasterStr} 일간인 당신의 재물운은 2027년 상반기 식상생재(창의력과 표현력이 수익으로 연결되는 흐름)에서 가장 강하게 폭발합니다. 단기 투기보다는 본인의 전문성을 브랜드화하거나 새로운 파트너십을 맺을 때 큰 금전적 성취가 따릅니다.`
        : `For your ${dayMasterStr} chart, wealth expansion peaks when you activate your Output Star (식상생재). Rather than passive waiting, your biggest financial jump in the 2026-2027 cycle comes from launching a visible project, negotiating a bold role upgrade, or monetizing your personal expertise.`;
    } else if (qLower.includes('love') || qLower.includes('romance') || qLower.includes('partner') || qLower.includes('연애') || qLower.includes('궁합') || qLower.includes('결혼')) {
      reply = isKo
        ? `${dayMasterStr} 에너지는 겉으로는 단단해 보이지만 내면의 깊은 정서적 교감을 갈망합니다. 다가오는 도화(Peach Blossom) 기운이 강해지는 시기에 운명적인 끌림을 주는 인연이 가까워지며, 서로의 다름을 인정할 때 가장 완벽한 음양의 조화를 이룹니다.`
        : `Your ${dayMasterStr} energy radiates magnetic warmth when your guard is lowered. In this cycle, your Peach Blossom (도화) star awakens through shared creative or cultural interests—expect an intense soul-level recognition rather than a superficial connection.`;
    } else {
      reply = isKo
        ? `${dayMasterStr} 원국의 핵심 개운법은 자신의 오행 리듬을 믿고 과감하게 실행에 옮기는 것입니다. 망설이던 계획이 있다면 대운의 흐름이 상승하는 이번 분기에 첫발을 내딛으십시오.`
        : `According to your ${dayMasterStr} Four Pillars matrix, the universe rewards decisive movement during this transition. Release outdated obligations that drain your ${uElem} vitality so new benefactors (귀인) can enter your orbit.`;
    }

    setTimeout(() => {
      setOracleMessages((prev) => [...prev, { role: 'master', text: reply }]);
    }, 500);
  };

  const userElem = reportData?.userElement || 'Fire';
  const beautyRx = ELEMENT_BEAUTY_PRESCRIPTION[userElem] || ELEMENT_BEAUTY_PRESCRIPTION.Fire;

  return (
    <div id="premium-report" className="w-full max-w-5xl mx-auto mt-20 relative animate-in fade-in slide-in-from-bottom-10 duration-1000 border border-zinc-400/30 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(234,179,8,0.1)] text-left">
      {/* VIP Header Banner */}
      <div className="bg-gradient-to-r from-zinc-600 via-zinc-300 to-zinc-600 text-black py-6 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3 font-black text-xl tracking-tighter">
          <Lock size={20} />
          CONFIDENTIAL DESTINY REPORT ({displayYear.toUpperCase()})
        </div>
        <div className="text-sm font-bold opacity-80 mt-2 md:mt-0">
          Verified by 50-Master Korean Manseryeok Engine
        </div>
      </div>

      <div className="p-6 sm:p-8 md:p-12 space-y-16 bg-gradient-to-b from-zinc-900 to-black">
        {/* Exact 4 Pillars Manseryeok Chart Badge */}
        {!isGenerating && reportData?.sajuChart && (
          <section className="bg-black/60 border border-yellow-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Compass className="text-yellow-400" size={22} />
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                  {isKo ? '정밀 사주팔자 원국 (Four Pillars of Destiny)' : 'Exact Four Pillars Manseryeok Chart'}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-bold">
                Day Master: {reportData.sajuChart.dayMaster}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { label: isKo ? '시주 (Hour Pillar)' : 'Hour Pillar', val: reportData.sajuChart.hourPillar, hanja: reportData.sajuChart.raw?.time },
                { label: isKo ? '일주 (Day / Self)' : 'Day Pillar (Self)', val: reportData.sajuChart.dayPillar, hanja: reportData.sajuChart.raw?.day, highlight: true },
                { label: isKo ? '월주 (Month Pillar)' : 'Month Pillar', val: reportData.sajuChart.monthPillar, hanja: reportData.sajuChart.raw?.month },
                { label: isKo ? '연주 (Year Pillar)' : 'Year Pillar', val: reportData.sajuChart.yearPillar, hanja: reportData.sajuChart.raw?.year },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    p.highlight ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)]' : 'bg-zinc-900/80 border-white/10'
                  }`}
                >
                  <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">{p.label}</div>
                  {p.hanja && <div className="text-2xl font-serif text-yellow-400 font-bold mb-1">{p.hanja}</div>}
                  <div className="text-xs sm:text-sm font-bold text-zinc-200 leading-snug">{p.val}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Element Progress Bars & Poetic Quote */}
        {!isGenerating && !isCompatibility && reportData?.elementalBalance && (
          <section className="mb-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600 mb-4 font-bold">
              &ldquo;{reportData.archetype}&rdquo;
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl font-light italic mb-10 max-w-2xl leading-relaxed">
              {reportData.poeticHook}
            </p>

            <div className="w-full max-w-md bg-zinc-900/80 p-8 rounded-[2rem] border border-white/5 shadow-2xl space-y-5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] text-left mb-6 border-b border-white/5 pb-4">Elemental Blueprint</h3>
              {[
                { name: 'Wood', value: reportData.elementalBalance.Wood, color: 'bg-green-500', shadow: 'shadow-[0_0_10px_rgba(34,197,94,0.5)]' },
                { name: 'Fire', value: reportData.elementalBalance.Fire, color: 'bg-red-500', shadow: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]' },
                { name: 'Earth', value: reportData.elementalBalance.Earth, color: 'bg-yellow-600', shadow: 'shadow-[0_0_10px_rgba(202,138,4,0.5)]' },
                { name: 'Metal', value: reportData.elementalBalance.Metal, color: 'bg-zinc-300', shadow: 'shadow-[0_0_10px_rgba(212,212,216,0.5)]' },
                { name: 'Water', value: reportData.elementalBalance.Water, color: 'bg-blue-500', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
              ].map((el) => (
                <div key={el.name} className="flex items-center gap-4 group">
                  <div className="w-16 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider group-hover:text-white transition-colors">{el.name}</div>
                  <div className="flex-1 h-2 bg-black rounded-full overflow-hidden relative">
                    <div
                      className={`absolute top-0 left-0 h-full ${el.color} ${el.shadow} transition-all duration-1000 ease-out rounded-full`}
                      style={{ width: `${el.value}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-xs font-mono text-zinc-400">{el.value}%</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Exclusive Personal Amulet */}
        {!isGenerating && !isCompatibility && (
          <section className="mb-12 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-400" size={24} />
              <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 font-bold uppercase tracking-widest text-lg">Your Exclusive 2027 3D Holographic Amulet</h4>
            </div>

            <HolographicTalismanCard
              element={userElem}
              talisman={getPersonalTalisman(
                typeof window !== 'undefined' ? localStorage.getItem("userName") || "" : "",
                typeof window !== 'undefined' ? localStorage.getItem("userDob") || "" : ""
              )}
              userName={typeof window !== 'undefined' ? localStorage.getItem("userName") || "VIP CLIENT" : "VIP CLIENT"}
              userDayMaster={reportData?.sajuChart?.dayMaster || `${userElem} Day Master`}
              score={98}
              isLegendary={true}
              editionLabel="K-ORACLE // 2027 VIP MASTER"
              size="large"
            />
            <p className="text-zinc-500 text-sm mt-5 text-center max-w-md px-4">
              Tap the amulet to flip to your Secret Royal Manseryeok Decree, or toggle 360° Slow Spin mode.
            </p>
          </section>
        )}

        {/* Section 1: Core Analysis (Markdown Rendered) */}
        <section>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3 mb-6">
            <Flame className="text-yellow-400" size={32} /> The Grand Narrative of {displayYear}
          </h3>
          <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl bg-zinc-900/50 border border-white/10 text-zinc-300 leading-relaxed text-base sm:text-lg">
            {isGenerating ? (
              <CosmicLoader isBeauty={false} lang={lang} />
            ) : (
              <div className="prose prose-invert prose-yellow max-w-none prose-headings:text-yellow-400 prose-headings:font-black prose-headings:mt-8 prose-headings:mb-3 prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{formatCategoryMarkdown(aiReport)}</ReactMarkdown>
                {error && (
                  <button onClick={fetchReport} className="mt-4 px-6 py-3 bg-zinc-100 text-black font-bold rounded-xl hover:bg-white transition-colors shadow-lg">
                    Retry Generation
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Hidden Karma, Wealth & Love Matrix (Now visible for ALL Paid Plans!) */}
        {!isGenerating && (karmaReport || (typeof window !== 'undefined' && localStorage.getItem("aiKarma"))) && (
          <section className="bg-zinc-900/50 p-6 sm:p-8 md:p-10 rounded-3xl border border-pink-500/30">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3 mb-6">
              <HeartPulse className="text-pink-500" size={32} />
              {isCompatibility
                ? (isKo ? '2. 전생의 인연 & 카르마 매트릭스' : '2. Past Life Connection & Karmic Destiny')
                : (isKo ? '2. 히든 카르마 & 재물·연애 심층 매트릭스' : '2. Hidden Karma, Wealth & Love Matrix')}
            </h3>
            <div className="prose prose-invert prose-pink max-w-none prose-headings:text-pink-400 prose-headings:font-black prose-headings:mt-8 prose-headings:mb-3 prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {formatCategoryMarkdown(karmaReport || (typeof window !== 'undefined' ? localStorage.getItem("aiKarma") : "") || "")}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* Detailed 2 Pillars Matrix Cards */}
        <section>
          {(() => {
            let hash = 0;
            const dob = (typeof window !== 'undefined' ? localStorage.getItem('userDob') : null) || '1995-10-15';
            for (let i = 0; i < dob.length; i++) hash = dob.charCodeAt(i) + ((hash << 5) - hash);
            const seed = Math.abs(hash);
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const m1 = months[seed % 12];
            const m2 = months[(seed + 3) % 12];
            const m3 = months[(seed + 7) % 12];

            const wealthOps = isKo
              ? [`${m1}에 "횡재수"와 식상생재의 흐름이 강하게 들어옵니다. 본업 외의 사이드 프로젝트나 새로운 제안에서 큰 수익이 예상됩니다.`]
              : [`A strong wave of "Unexpected Wealth" (횡재) enters your chart in ${m1}. Side projects, creative launches, or strategic negotiations yield high returns.`];
            const wealthDans = isKo
              ? [`${m2}에는 "겁재(재물 누수)"를 주의하십시오. 지인과의 금전 거래나 충동적인 고위험 투자를 피하고 현금 흐름을 지키십시오.`]
              : [`Guard against the "Rob Wealth" (겁재) phase in ${m2}. Avoid lending money or impulsive high-risk speculation during this window.`];
            const romOps = isKo
              ? [`${m3}에 매력의 별인 "도화살"과 "홍란성"이 동시에 빛납니다. 가만히 있어도 사람을 끌어당기는 강력한 오라가 발산됩니다.`]
              : [`Your "Peach Blossom" (도화) star peaks in ${m3}. You will radiate effortless magnetic charisma that attracts soulmate-level connections.`];
            const romDans = isKo
              ? [`당신의 ${userElem} 에너지가 과열될 때 감정 표현이 직설적으로 변할 수 있습니다. 부드러운 경청이 관계를 지키는 열쇠입니다.`]
              : [`When your ${userElem} energy runs hot, you may seem overly independent. Practice active warmth and open communication.`];

            return (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/30 p-6 sm:p-8 rounded-3xl">
                  <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingUp className="text-green-400" size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{isCompatibility ? (isKo ? '관계 에너지 매트릭스' : 'Relationship Energy Matrix') : (isKo ? '재물 & 커리어 매트릭스' : 'Wealth & Career Matrix')}</h4>
                  <div className="space-y-4 text-zinc-300 leading-relaxed">
                    <p><strong className="text-green-400">{isKo ? '핵심 기회:' : 'The Opportunity:'}</strong> {wealthOps[0]}</p>
                    <p><strong className="text-amber-400">{isKo ? '주의 구간:' : 'The Caution:'}</strong> {wealthDans[0]}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-900/20 to-zinc-900 border border-pink-500/30 p-6 sm:p-8 rounded-3xl">
                  <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <HeartPulse className="text-pink-400" size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{isCompatibility ? (isKo ? '친밀도 & 신뢰 매트릭스' : 'Intimacy & Trust Matrix') : (isKo ? '연애 & 인맥 매트릭스' : 'Romance & Network Matrix')}</h4>
                  <div className="space-y-4 text-zinc-300 leading-relaxed">
                    <p><strong className="text-pink-400">{isKo ? '핵심 기회:' : 'The Opportunity:'}</strong> {romOps[0]}</p>
                    <p><strong className="text-amber-400">{isKo ? '주의 구간:' : 'The Caution:'}</strong> {romDans[0]}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* NEW FEATURE: Saju x K-Beauty Elemental Luck Prescription (오행 개운 메이크업 처방) */}
        <section className="bg-gradient-to-r from-pink-950/40 via-zinc-900 to-purple-950/40 p-6 sm:p-8 rounded-3xl border border-pink-500/30 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-widest">
                <Palette size={14} /> Saju × K-Beauty Elemental Luck Prescription (개운 뷰티 처방)
              </div>
              <h3 className="text-2xl font-black text-white">
                Boost Your {userElem} Day Master with <span className="text-pink-400">{beautyRx.luckyColor}</span>
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">{beautyRx.reason}</p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs font-bold text-zinc-200">
                  <span className="w-3.5 h-3.5 rounded-full inline-block border border-white/30" style={{ backgroundColor: beautyRx.hex }} />
                  Recommended K-Beauty Item: {beautyRx.shade}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
              <a
                href="https://www.yesstyle.com/en/korean-beauty-makeup/list.html/bcc.15478_bpt.46?rco=KVIBE777"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-sm text-center shadow-lg transition-all"
              >
                Shop Lucky Shade (Code: KVIBE777) &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* 12-Month Luck Heatmap */}
        {!isCompatibility && (
          <section>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3 mb-8">
              <Activity className="text-blue-400" size={32} /> {displayYear} Energy Flow (Heatmap)
            </h3>
            <div className="bg-zinc-800/30 p-6 sm:p-8 rounded-3xl border border-zinc-700/50">
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-6">
                {(() => {
                  let hash = 0;
                  const dob = (typeof window !== 'undefined' ? localStorage.getItem('userDob') : null) || '1995-10-15';
                  for (let i = 0; i < dob.length; i++) hash = dob.charCodeAt(i) + ((hash << 5) - hash);
                  let seed = Math.abs(hash);
                  let monthsData = [];
                  if (plan === 'q4') {
                    const mNames = isKo ? ['10월', '11월', '12월'] : ['Oct', 'Nov', 'Dec'];
                    monthsData = mNames.map((m, i) => ({ m, y: 2026, idx: i + 9 }));
                  } else if (plan === 'bundle') {
                    const m26Names = isKo ? ['26년 10월', '11월', '12월'] : ['Oct 26', 'Nov 26', 'Dec 26'];
                    const m27Names = isKo ? ['27년 1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] : ['Jan 27', 'Feb 27', 'Mar 27', 'Apr 27', 'May 27', 'Jun 27', 'Jul 27', 'Aug 27', 'Sep 27', 'Oct 27', 'Nov 27', 'Dec 27'];
                    const m26 = m26Names.map((m, i) => ({ m, y: 2026, idx: i + 9 }));
                    const m27 = m27Names.map((m, i) => ({ m, y: 2027, idx: i }));
                    monthsData = [...m26, ...m27];
                  } else {
                    const mNames = isKo ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    monthsData = mNames.map((m, i) => ({ m, y: 2027, idx: i }));
                  }

                  return monthsData.map(({ m, y, idx }) => {
                    const combinedSeed = seed + y * 100 + idx;
                    const s = ((combinedSeed * 17) % 70) + 30;
                    let barColor = 'bg-zinc-500';
                    if (s >= 85) barColor = 'bg-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)]';
                    else if (s <= 35) barColor = 'bg-red-500/70';

                    return (
                      <div key={m} className="flex flex-col items-center gap-2">
                        <div className="h-32 w-full bg-zinc-900 rounded-lg flex items-end p-1 border border-zinc-800">
                          <div className={`w-full rounded-md transition-all ${barColor}`} style={{ height: `${s}%` }}></div>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-zinc-400">{m}</span>
                      </div>
                    );
                  });
                })()}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-6 border-t border-zinc-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
                  <span className="text-sm font-semibold text-zinc-300">{isKo ? '대운 (최고 전성기 85%+)' : 'Peak Energy (85%+)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-500"></div>
                  <span className="text-sm font-semibold text-zinc-400">{isKo ? '평운 (안정기)' : 'Stable Energy'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <span className="text-sm font-semibold text-zinc-300">{isKo ? '흉운 (주의 구간 35%-)' : 'Caution Window (35%-)'}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NEW FEATURE: 1:1 Interactive VIP Saju Master Q&A Sanctum */}
        <section className="bg-gradient-to-b from-zinc-900 to-black p-6 sm:p-8 rounded-3xl border border-yellow-500/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
              <MessageSquare className="text-yellow-400" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{isKo ? '1:1 VIP 사주 마스터 심층 문답' : '1:1 VIP Saju Master Follow-Up Consultation'}</h3>
              <p className="text-xs text-zinc-400">{isKo ? '당신의 사주 원국을 바탕으로 재물, 이직, 연애 타이밍을 추가로 질문하세요' : 'Ask custom follow-up questions based on your calculated Four Pillars'}</p>
            </div>
          </div>

          <div className="bg-black/60 border border-white/5 rounded-2xl p-4 max-h-64 overflow-y-auto space-y-3 mb-4">
            {oracleMessages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-yellow-500 text-black font-bold rounded-br-none'
                    : 'bg-zinc-800/90 text-zinc-200 border border-yellow-500/20 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {[
              isKo ? '2027년 최고 재물운 타이밍은?' : 'Best month for wealth & career move?',
              isKo ? '나의 연애/도화살이 가장 강한 시기는?' : 'When does my Peach Blossom love luck peak?',
              isKo ? '내 일간(Day Master)의 핵심 개운법은?' : 'How do I activate my Day Master luck?',
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setOracleInput(preset)}
                className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-yellow-300 border border-yellow-500/20 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>

          <form onSubmit={handleOracleAsk} className="flex gap-2">
            <input
              type="text"
              value={oracleInput}
              onChange={(e) => setOracleInput(e.target.value)}
              placeholder={isKo ? '사주 마스터에게 추가 질문을 입력하세요...' : 'Ask the Saju Master (e.g. Career change in 2027?)...'}
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-xl flex items-center gap-2 text-sm transition-colors"
            >
              <Send size={16} /> {isKo ? '질문' : 'Ask'}
            </button>
          </form>
        </section>

        <button
          onClick={async () => {
            const res = await fetch('/api/download-pdf', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: "saju",
                lang,
                plan,
                data: {
                  content: aiReport,
                  karma: karmaReport || localStorage.getItem("aiKarma"),
                  dob: localStorage.getItem("userDob") || "1995-10-15",
                  archetype: reportData?.archetype,
                  poeticHook: reportData?.poeticHook,
                  elementalBalance: reportData?.elementalBalance,
                  sajuChart: reportData?.sajuChart,
                },
              }),
            });
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'K_Oracle_Saju_Report.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
          }}
          disabled={isGenerating || error}
          className="w-full py-5 bg-zinc-100 text-zinc-900 rounded-2xl font-black text-lg hover:bg-white flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50"
        >
          <Download size={22} className="mb-1 sm:mb-0" />
          <span className="text-center leading-tight">Download Premium PDF Masterplan</span>
        </button>
      </div>
    </div>
  );
}
