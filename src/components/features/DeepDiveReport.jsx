"use client";

import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, TrendingUp, HeartPulse, Activity, Download, Loader2, Flame } from 'lucide-react';

export default function DeepDiveReport({ lang = "en" }) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [aiReport, setAiReport] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      setIsGenerating(true);
      try {
        const res = await fetch('/api/generate-saju', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ birthData: localStorage.getItem("userDob") || "1995-10-15", gender: localStorage.getItem("userGender") || "female", lang })
        });
        const data = await res.json();
        if (data.success) {
          setAiReport(data.reportText); localStorage.setItem("aiKarma", data.karmaText);
          setPdfUrl(data.pdfUrl); } else { setAiReport("ERROR: The AI Engine failed to connect. (Check if your GEMINI_API_KEY is valid. Gemini keys usually start with AIzaSy). \n\nServer Response: " + data.error); }
      } catch (err) {
        console.error("Failed to fetch report", err);
        setAiReport("Error generating report. Please contact support.");
      } finally {
        setIsGenerating(false);
      }
    };
    fetchReport();
  }, [lang]);

  return (
    <div id="premium-report" className="w-full max-w-5xl mx-auto mt-20 relative animate-in fade-in slide-in-from-bottom-10 duration-1000 border border-yellow-500/30 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(234,179,8,0.1)]">
      
      {/* VIP Header Banner */}
      <div className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-black py-6 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3 font-black text-xl tracking-tighter">
          <Lock size={20} />
          CONFIDENTIAL DESTINY REPORT
        </div>
        <div className="text-sm font-bold opacity-80 mt-2 md:mt-0">
          Generated Exclusively for You
        </div>
      </div>

      <div className="p-8 md:p-12 space-y-16 bg-gradient-to-b from-zinc-900 to-black">
        
        {/* Core Analysis (Dynamic AI Fetch) */}
        <section>
          <h3 className="text-3xl font-black text-white flex items-center gap-3 mb-6">
            <Flame className="text-yellow-500" size={32} /> The Grand Narrative of 2027
          </h3>
          <div className="bg-zinc-800/30 p-8 rounded-2xl border border-zinc-800/50 text-zinc-300 leading-loose text-lg whitespace-pre-wrap font-serif">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-20 text-yellow-500">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="text-lg font-bold animate-pulse">The Grandmaster is analyzing your energy...</p>
              </div>
            ) : (
              aiReport
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
                  <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/30 p-8 rounded-3xl">
                    <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <TrendingUp className="text-green-400" size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">{isKo ? '재물 & 커리어 매트릭스' : 'Wealth & Career Matrix'}</h4>
                    <div className="space-y-4 text-zinc-400 leading-relaxed">
                      <p><strong>{isKo ? '기회:' : 'The Opportunity:'}</strong> {wealthOps[seed % 3]}</p>
                      <p><strong>{isKo ? '위험:' : 'The Danger:'}</strong> {wealthDans[(seed + 1) % 3]}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-900/20 to-zinc-900 border border-pink-500/30 p-8 rounded-3xl">
                    <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <HeartPulse className="text-pink-400" size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">{isKo ? '연애 & 인맥 매트릭스' : 'Romance & Network'}</h4>
                    <div className="space-y-4 text-zinc-400 leading-relaxed">
                      <p><strong>{isKo ? '기회:' : 'The Opportunity:'}</strong> {romOps[(seed + 2) % 3]}</p>
                      <p><strong>{isKo ? '위험:' : 'The Danger:'}</strong> {romDans[(seed + 3) % 3]}</p>
                    </div>
                  </div>
                </div>
              );
            })()}

          </section>

        
          {lang === 'ko' && (
            <section className="mt-8 p-6 bg-zinc-900 border border-yellow-500/30 rounded-2xl">
              <h3 className="text-yellow-500 font-bold mb-4">[ADMIN ONLY] KARMA REVIEW</h3>
              <p className="whitespace-pre-wrap text-sm text-zinc-300">{localStorage.getItem("aiKarma")}</p>
            </section>
          )}

          {/* 12-Month Luck Heatmap */}
        <section>
          <h3 className="text-3xl font-black text-white flex items-center gap-3 mb-8">
            <Activity className="text-blue-400" size={32} /> 2027 Energy Flow (Heatmap)
          </h3>
          <div className="bg-zinc-800/30 p-8 rounded-3xl border border-zinc-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              {[
                ...(() => { let hash = 0; const dob = (typeof window !== 'undefined' ? localStorage.getItem('userDob') : null) || '1995-10-15'; for (let i=0; i<dob.length; i++) hash = dob.charCodeAt(i) + ((hash << 5) - hash); const seed = Math.abs(hash); const isKo = lang === 'ko';
              const months = isKo ? ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] : ['January','February','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return months.map((m, i) => ({ m, s: (((seed >> i) % 70) + 30) })); })()
              ].map((month) => {
                let barColor = 'bg-zinc-500';
                if (month.s >= 85) barColor = 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]';
                else if (month.s <= 35) barColor = 'bg-red-500';
                
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
          </div>
        </section>

        <button 
          onClick={async () => { const res = await fetch('/api/download-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: "saju", lang, data: { content: aiReport, karma: localStorage.getItem("aiKarma"), dob: localStorage.getItem("userDob") || "1995-10-15" } }) }); const blob = await res.blob(); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'K_Oracle_Saju_Report.pdf'; a.click(); window.URL.revokeObjectURL(url); }}
          disabled={isGenerating}
          className="w-full py-5 bg-zinc-100 text-zinc-900 rounded-2xl font-black text-lg hover:bg-white flex items-center justify-center gap-3 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50"
        >
          <Download size={22} /> Download Premium PDF Masterplan
        </button>

      </div>
    </div>
  );
}








