"use client";

import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, TrendingUp, HeartPulse, Activity, Download, Loader2, Flame } from 'lucide-react';
import CosmicLoader from '../ui/CosmicLoader';


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
  { text: '마적성공', en: 'Magic Touch', desc: 'Everything you touch turns to gold' }
];

function getPersonalTalisman(name, dob) {
  const str = name + dob;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return personalTalismans[Math.abs(hash) % personalTalismans.length];
}
export default function DeepDiveReport({ lang = "en" }) {
  const isKo = lang === "ko";
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState(false);
  const [aiReport, setAiReport] = useState("");
  const [reportData, setReportData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const plan = typeof window !== 'undefined' ? localStorage.getItem("purchasedPlan") || "bundle" : "bundle";
  const displayYear = plan === 'compatibility' ? 'Cosmic Chemistry' : plan === 'fullyear' ? '2027' : plan === 'bundle' ? '2026-2027' : '2026';
    const isCompatibility = plan === "compatibility";

  const fetchReport = async () => {
      setIsGenerating(true);
      
      let dailyVibe = "";
      try {
        const cachedDaily = localStorage.getItem('daily_result');
        if (cachedDaily) {
           dailyVibe = JSON.parse(cachedDaily).data.vibe;
        }
      } catch(e) {}
      
      const cacheKey = `saju_${plan}_${localStorage.getItem("userDob")}_${localStorage.getItem("userName")}_${localStorage.getItem("idolName")}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const data = JSON.parse(cached);
          if (data.karmaText === "Included in the main report." || data.dailyFortune === "Included in the main report.") {
            localStorage.removeItem(cacheKey);
          } else {
            setError(false);
            setAiReport(data.reportText); 
            localStorage.setItem("aiKarma", data.karmaText); 
            setReportData(data);
            setIsGenerating(false);
            return;
          }
        } catch(e) { }
      }
      try {
        const res = await fetch('/api/generate-saju', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: localStorage.getItem("purchasedPlan"), idolName: localStorage.getItem("idolName"), userName: localStorage.getItem("userName") || "The Client" || "bundle", birthData: (localStorage.getItem("userDob") || "1995-10-15") + " " + (localStorage.getItem("userTime") || "12:00"), gender: localStorage.getItem("userGender") || "female", lang, dailyVibe })
        });
        const data = await res.json();
          if (data.success) {
            setError(false); setAiReport(data.reportText); localStorage.setItem("aiKarma", data.karmaText); setReportData(data); localStorage.setItem(`saju_${plan}_${localStorage.getItem("userDob")}_${localStorage.getItem("userName")}_${localStorage.getItem("idolName")}`, JSON.stringify(data));
            // Save to kOracleHistory
            try {
              const historyStr = localStorage.getItem('kOracleHistory') || '[]';
              let history = JSON.parse(historyStr);
              const newEntry = {
                type: 'saju',
                plan,
                name: localStorage.getItem('userName') || 'The Client',
                idolName: localStorage.getItem('idolName'),
                date: new Date().toISOString().split('T')[0],
                cacheKey: `saju_${plan}_${localStorage.getItem("userDob")}_${localStorage.getItem("userName")}_${localStorage.getItem("idolName")}`
              };
              history = history.filter(h => h.cacheKey !== newEntry.cacheKey);
              history.unshift(newEntry);
              if (history.length > 5) history = history.slice(0, 5);
              localStorage.setItem('kOracleHistory', JSON.stringify(history));
            } catch(e) { console.error(e) }
  
            setPdfUrl(data.pdfUrl); } else {
            setError(true);
            localStorage.removeItem("aiKarma");
            if (data.isRateLimit) {
              setAiReport(isKo ? "우주의 에너지가 폭발하고 있습니다! 너무 많은 요청이 발생했습니다. 1분 뒤에 아래 버튼을 눌러 다시 시도해주세요." : "The cosmos is overwhelmed with energy! Too many users are generating reports right now. Please wait 1 minute and try again below.");
            } else {
              setAiReport(isKo ? "우주의 에너지가 일시적으로 혼란스럽습니다. 아래 버튼을 눌러 다시 시도해 주세요." : "The cosmos is experiencing a temporary disturbance. Please try again below.");
            }
          }
        } catch (err) {
          console.error("Failed to fetch report", err);
          setError(true); localStorage.removeItem("aiKarma"); setAiReport("Cosmic interference detected. Please retry the generation.");
        } finally {
        setIsGenerating(false);
      }
    };

  useEffect(() => {
    fetchReport();
  }, [lang]);

  return (
    <div id="premium-report" className="w-full max-w-5xl mx-auto mt-20 relative animate-in fade-in slide-in-from-bottom-10 duration-1000 border border-zinc-400/30 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(234,179,8,0.1)]">
      
      {/* VIP Header Banner */}
      <div className="bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-600 text-black py-6 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3 font-black text-xl tracking-tighter">
          <Lock size={20} />
          CONFIDENTIAL DESTINY REPORT
        </div>
        <div className="text-sm font-bold opacity-80 mt-2 md:mt-0">
          Generated Exclusively for You
        </div>
      </div>

      <div className="p-8 md:p-12 space-y-16 bg-gradient-to-b from-zinc-900 to-black">
        
        
          
            {/* Exclusive Personal Amulet */}
            {!isGenerating && !isCompatibility && (
              <section className="mb-12 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="text-yellow-400" size={24} />
                  <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 font-bold uppercase tracking-widest text-lg">Your Exclusive 2027 Amulet</h4>
                </div>
                
                <div className="w-64 h-[460px] bg-gradient-to-b from-zinc-900 to-black rounded-[2rem] flex flex-col items-center justify-between relative overflow-hidden transition-all duration-500 border-[3px] border-t-yellow-300/50 border-l-yellow-300/50 border-b-yellow-600/50 border-r-yellow-600/50 shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay"></div>
                  
                  <div className="mt-8 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-500 font-brush-cn text-5xl font-bold opacity-90 z-10" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}>
                    {reportData?.userElement === 'Fire' ? '火' : reportData?.userElement === 'Water' ? '水' : reportData?.userElement === 'Wood' ? '木' : reportData?.userElement === 'Metal' ? '金' : '土'}
                  </div>
                  
                  <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-yellow-100 to-yellow-600 text-[64px] font-serif-kr font-bold flex flex-col items-center justify-center gap-0 py-2 leading-[1.1]" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0px 1px 1px rgba(234,179,8,0.3))' }}>
                    {getPersonalTalisman(typeof window !== 'undefined' ? localStorage.getItem("userName") || "" : "", typeof window !== 'undefined' ? localStorage.getItem("userDob") || "" : "").text.split('').map((char, i) => (
                      <span key={i}>{char}</span>
                    ))}
                  </div>
                  
                  <div className="relative z-10 w-full flex flex-col items-center mb-6 px-3">
                    <div className="w-16 h-[2px] bg-yellow-600/50 mb-3"></div>
                    <div className="text-yellow-400 font-bold text-[11px] tracking-[0.2em] uppercase mb-1 text-center">
                      {getPersonalTalisman(typeof window !== 'undefined' ? localStorage.getItem("userName") || "" : "", typeof window !== 'undefined' ? localStorage.getItem("userDob") || "" : "").en}
                    </div>
                    <div className="text-zinc-400 text-[10px] tracking-wider text-center leading-tight opacity-90 uppercase">
                      {getPersonalTalisman(typeof window !== 'undefined' ? localStorage.getItem("userName") || "" : "", typeof window !== 'undefined' ? localStorage.getItem("userDob") || "" : "").desc}
                    </div>
                    <div className="mt-4 text-[9px] text-yellow-600/80 font-mono tracking-widest font-bold whitespace-nowrap">
                      K-ORACLE // 2027 VIP
                    </div>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm mt-6 text-center max-w-md px-4">This digital talisman has been uniquely generated based on your Destiny Matrix to protect your energy in 2027.</p>
              </section>
            )}
\n            {/* Daily Fortune */}
          {!isGenerating && reportData?.dailyFortune && (
            <section className="mb-12">
              <div className="bg-gradient-to-r from-zinc-500/10 to-transparent p-1 rounded-2xl">
                <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-700/50 shadow-lg shadow-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-zinc-300" size={20} />
                    <h4 className="text-zinc-300 font-bold uppercase tracking-widest text-sm">{isCompatibility ? (isKo ? '오늘의 궁합 바이브' : 'Today\'s Chemistry Vibe') : (isKo ? '오늘의 맞춤 운세' : 'Your Daily Cosmic Vibe')}</h4>
                  </div>
                  <p className="text-zinc-200 text-lg leading-relaxed font-serif">
                    {reportData.dailyFortune}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Core Analysis (Dynamic Fetch) */}
        <section>
          <h3 className="text-3xl font-black neo-text tracking-tight flex flex-col sm:flex-row sm:items-center items-start gap-4 sm:gap-3 mb-6">
            <Flame className="text-zinc-300" size={32} /> The Grand Narrative of {displayYear}
          </h3>
          <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl text-zinc-300 leading-[2] sm:leading-[2.2] tracking-wide text-base sm:text-lg font-serif text-left">
            {isGenerating ? (
              <CosmicLoader isBeauty={false} lang={lang} />
            ) : (
                <div className="flex flex-col gap-4">
                  {aiReport.split('\n').map((para, idx) => {
  const match = para.match(/^\[CATEGORY:\s*(.*?)\]/i);
  if(match) return <h4 key={idx} className="text-xl font-bold text-zinc-100 mt-6 mb-2">{match[1]}</h4>;
  if(para.trim().length === 0) return null;
  return <p key={idx} className="mb-4 leading-relaxed">{para}</p>;
})}
                  {error && (
                    <button onClick={fetchReport} className="self-start px-6 py-3 bg-zinc-100 text-black font-bold rounded-xl hover:bg-white transition-colors shadow-lg shadow-black/50">
                      Retry Generation
                    </button>
                  )}
                </div>
              )}
          </div>
        </section>

        {/* Detailed 3 Pillars Grid */}
        <section>

            {(() => {
              let hash = 0;
              const dob = (typeof window !== 'undefined' ? localStorage.getItem('userDob') : null) || '1995-10-15';
              for (let i = 0; i < dob.length; i++) hash = dob.charCodeAt(i) + ((hash << 5) - hash);
              const seed = Math.abs(hash);
              const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
              const elements = isKo ? ['목(Wood)', '화(Fire)', '토(Earth)', '금(Metal)', '수(Water)'] : ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
              
              const m1 = months[seed % 12];
              const m2 = months[(seed + 3) % 12];
              const m3 = months[(seed + 7) % 12];
              const elem = elements[(seed + 2) % 5];
              
              const wealthOps = isKo ? [
                m1 + '에 "횡재수"가 강하게 들어옵니다. 월급 외의 투자 수익, 사이드 프로젝트의 성공, 또는 부동산 자산의 급격한 상승이 예상됩니다.',
                m1 + '에 "금여성"이 빛납니다. 잊고 있던 자산이나 숨겨진 투자처에서 폭발적인 수익이 발생할 수 있습니다.',
                m1 + '에 강력한 "귀인"이 나타나 당신의 수입을 배가시킬 매우 수익성 높은 제안을 할 것입니다.'
              ] : [
                'A sudden influx of "Unexpected Wealth" (횡재) enters your chart in ' + m1 + '. This isn\'t salary; this is investment return, side-hustle virality, or a massive real estate shift.',
                'The "Golden Coffer" (금여) star shines bright in ' + m1 + '. Hidden assets or forgotten investments will suddenly yield explosive returns.',
                'A powerful benefactor (귀인) arrives in ' + m1 + ', offering a highly lucrative opportunity that multiplies your income streams.'
              ];
              const wealthDans = isKo ? [
                m2 + '에 "겁재"가 숨어 있습니다. 믿었던 지인이 돈을 빌려달라고 하거나 너무 좋은 조건의 동업을 제안할 수 있습니다. 단호하게 거절하십시오.',
                m2 + '에는 "재물 손실"의 구간입니다. 이 시기에는 충동적인 명품 소비나 고위험 코인 투자를 절대 피하십시오.',
                m2 + '에 예상치 못한 세금이나 법률 비용이 발생할 수 있습니다. 모든 계약서를 두 번 확인하고 회계를 엄격히 관리하십시오.'
              ] : [
                'The "Rob Wealth" (겁재) star lurks in ' + m2 + '. A trusted associate may ask for a loan or propose a too-good-to-be-true partnership. Refuse gracefully.',
                'Beware of the "Financial Leak" (재물손실) phase in ' + m2 + '. Avoid impulsive luxury purchases or high-risk crypto trading during this period.',
                'A sudden tax or legal expense could arise in ' + m2 + '. Double-check all contracts and maintain strict accounting.'
              ];
              const romOps = isKo ? [
                m3 + '에 모두가 부러워하는 "도화살"이 강하게 발동합니다. 가만히 있어도 사람들을 끌어당기는 치명적인 매력을 발산할 것입니다.',
                m3 + '에 "홍란성"이 뜹니다. 가벼운 만남이 운명적이고 영혼이 통하는 깊은 관계로 발전할 수 있습니다.',
                m3 + '에 당신의 카리스마 에너지가 최고조에 달합니다. 비즈니스 네트워크를 확장하고 고부가가치 고객을 유치할 완벽한 타이밍입니다.'
              ] : [
                'The highly coveted "Peach Blossom" (도화) activates powerfully in ' + m3 + '. You will exude a magnetic charm that draws people effortlessly.',
                'The "Red Matchmaker" (홍란) star appears in ' + m3 + '. A seemingly casual encounter could evolve into a fateful, soul-deep connection.',
                'Your charismatic energy peaks in ' + m3 + '. It is the perfect time to expand your professional network and secure high-value clients.'
              ];
              const romDans = isKo ? [
                '당신의 ' + elem + ' 에너지가 너무 압도적이라 타인에게 지나치게 강압적이거나 통제하려 드는 것처럼 보일 수 있습니다. 경청하는 연습을 하십시오.',
                '일시적으로 "고신살(외로움)"의 그림자가 드리워집니다. 연인과 단절감을 느낄 수 있으니 열린 소통으로 간극을 메우십시오.',
                '과거의 연인이나 독이 되는 직장 동료가 다시 당신의 삶에 끼어들려 할 수 있습니다. 당신의 오라를 보호하기 위해 에너지를 단호히 끊어내십시오.'
              ] : [
                'Because your ' + elem + ' energy is overwhelming, you may come across as too intense or controlling. Practice the art of listening.',
                'The "Lonely Star" (고신) shadow casts over you temporarily. You might feel disconnected from your partner. Communicate openly to bridge the gap.',
                'Past lovers or toxic colleagues may attempt to re-enter your life. Cut the energetic cord decisively to protect your aura.'
              ];
              
              return (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/30 p-6 sm:p-8 rounded-3xl">
                    <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <TrendingUp className="text-green-400" size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">{isCompatibility ? (isKo ? '관계 에너지 매트릭스' : 'Relationship Energy Matrix') : (isKo ? '재물 & 커리어 매트릭스' : 'Wealth & Career Matrix')}</h4>
                    <div className="space-y-4 text-zinc-400 leading-relaxed">
                      <p><strong>{isKo ? '기회:' : 'The Opportunity:'}</strong> {reportData?.matrixData?.wealth?.opportunity || wealthOps[seed % 3]}</p>
                      <p><strong>{isKo ? '위험:' : 'The Danger:'}</strong> {reportData?.matrixData?.wealth?.danger || wealthDans[(seed + 1) % 3]}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-900/20 to-zinc-900 border border-pink-500/30 p-6 sm:p-8 rounded-3xl">
                    <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <HeartPulse className="text-pink-400" size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">{isCompatibility ? (isKo ? '친밀도 & 신뢰 매트릭스' : 'Intimacy & Trust Matrix') : (isKo ? '연애 & 인맥 매트릭스' : 'Romance & Network')}</h4>
                    <div className="space-y-4 text-zinc-400 leading-relaxed">
                      <p><strong>{isKo ? '기회:' : 'The Opportunity:'}</strong> {reportData?.matrixData?.romance?.opportunity || romOps[(seed + 2) % 3]}</p>
                      <p><strong>{isKo ? '위험:' : 'The Danger:'}</strong> {reportData?.matrixData?.romance?.danger || romDans[(seed + 3) % 3]}</p>
                    </div>
                  </div>
                </div>
              );
            })()}

          </section>

        
          {isCompatibility && (
            <section className="mt-12 bg-zinc-800/30 p-8 rounded-2xl border border-pink-500/30 text-zinc-300 leading-[2] sm:leading-[2.2] tracking-wide text-base sm:text-lg font-serif text-left">
              <h3 className="text-3xl font-black neo-text tracking-tight flex flex-col sm:flex-row sm:items-center items-start gap-4 sm:gap-3 mb-6">
                <HeartPulse className="text-pink-500" size={32} /> {isKo ? '전생의 인연 (Past Life Karma)' : 'Past Life Connection'}
              </h3>
              <div className="space-y-4">
                {(localStorage.getItem("aiKarma") || "").split('\n').map((line, idx) => {
                  const match = line.match(/^\[CATEGORY:\s*(.*?)\]/i);
                  if (match) {
                    return <h4 key={idx} className="text-xl font-bold text-pink-400 mt-6 mb-2">{match[1]}</h4>;
                  } else if (line.trim().length > 0) {
                    return <p key={idx}>{line}</p>;
                  }
                  return null;
                })}
              </div>
            </section>
          )}

          {/* 12-Month Luck Heatmap */}
          {!isCompatibility && (
          <section>
          <h3 className="text-3xl font-black neo-text tracking-tight flex flex-col sm:flex-row sm:items-center items-start gap-4 sm:gap-3 mb-8">
            <Activity className="text-blue-400" size={32} /> {displayYear} Energy Flow (Heatmap)
          </h3>
          <div className="bg-zinc-800/30 p-6 sm:p-8 rounded-3xl border border-zinc-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              {[
                ...(() => { 
                  let hash = 0; 
                  const dob = (typeof window !== 'undefined' ? localStorage.getItem('userDob') : null) || '1995-10-15'; 
                  for (let i=0; i<dob.length; i++) hash = dob.charCodeAt(i) + ((hash << 5) - hash); 
                  let seed = Math.abs(hash); 
                  let monthsData = [];
                  if (plan === 'q4') {
                    const mNames = isKo ? ['10월','11월','12월'] : ['Oct','Nov','Dec'];
                    monthsData = mNames.map((m, i) => ({ m, y: 2026, idx: i + 9 }));
                  } else if (plan === 'bundle') {
                    const m26Names = isKo ? ['26년 10월','11월','12월'] : ['Oct 26','Nov 26','Dec 26'];
                    const m27Names = isKo ? ['27년 1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] : ['Jan 27','Feb 27','Mar 27','Apr 27','May 27','Jun 27','Jul 27','Aug 27','Sep 27','Oct 27','Nov 27','Dec 27'];
                    const m26 = m26Names.map((m, i) => ({ m, y: 2026, idx: i + 9 }));
                    const m27 = m27Names.map((m, i) => ({ m, y: 2027, idx: i }));
                    monthsData = [...m26, ...m27];
                  } else {
                    const mNames = isKo ? ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    monthsData = mNames.map((m, i) => ({ m, y: 2027, idx: i }));
                  }
                  
                  return monthsData.map(({ m, y, idx }) => {
                    const combinedSeed = seed + y * 100 + idx;
                    return { m, s: (((combinedSeed * 17) % 70) + 30) };
                  });
                })()
              ].map((month) => {
                let barColor = 'bg-zinc-500';
                if (month.s >= 85) barColor = 'bg-zinc-100 shadow-[0_0_15px_rgba(234,179,8,0.5)]';
                else if (month.s <= 35) barColor = 'bg-zinc-500';
                
                return (
                  <div key={month.m} className="flex flex-col items-center gap-2">
                    <div className="h-32 w-full bg-zinc-900 rounded-lg flex items-end p-1 border border-zinc-800">
                      <div className={`w-full rounded-md transition-all ${barColor}`} style={{ height: `${month.s}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-zinc-400">{month.m}</span>
                  </div>
                )
              })}
            </div>
              
              {/* Heatmap Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-6 border-t border-zinc-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-100 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
                  <span className="text-sm font-semibold text-zinc-300">{isKo ? '대운 (최고 전성기)' : 'Peak Energy (85%+)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-500"></div>
                  <span className="text-sm font-semibold text-zinc-400">{isKo ? '평운 (안정기)' : 'Stable Energy'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <span className="text-sm font-semibold text-zinc-300">{isKo ? '흉운 (주의 구간)' : 'Caution (35%-)'}</span>
                </div>
              </div>
              
            </div>
          </section>
          )}

          <button 
            onClick={async () => { const res = await fetch('/api/download-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: "saju", lang, plan, data: { content: aiReport, karma: localStorage.getItem("aiKarma"), dob: localStorage.getItem("userDob") || "1995-10-15" } }) }); const blob = await res.blob(); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'K_Oracle_Saju_Report.pdf'; a.click(); window.URL.revokeObjectURL(url); }}
          disabled={isGenerating || error}
          className="w-full py-5 bg-zinc-100 text-zinc-900 rounded-2xl font-black text-lg hover:bg-white flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50"
        >
          <Download size={22} className="mb-1 sm:mb-0" /> <span className="text-center leading-tight">Download Premium PDF<br className="block sm:hidden"/> Masterplan</span>
        </button>

      </div>
    </div>
  );
}








