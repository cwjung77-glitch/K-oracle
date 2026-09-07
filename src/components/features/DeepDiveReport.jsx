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
          setAiReport(data.reportText);
          setPdfUrl(data.pdfUrl); } else { setAiReport("ERROR: The AI Engine failed to connect. (Check if your GEMINI_API_KEY is valid. Gemini keys usually start with AIzaSy). \\n\\nServer Response: " + data.error); }
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
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/30 p-8 rounded-3xl">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="text-green-400" size={28} />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">Wealth & Career Matrix</h4>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p><strong>The Opportunity:</strong> A sudden influx of "Unexpected Wealth" (횡재) enters your chart in August. This isn't salary; this is investment return, side-hustle virality, or a massive real estate shift.</p>
              <p><strong>The Danger:</strong> The "Rob Wealth" (겁재) star lurks in March. A trusted associate may ask for a loan or propose a 'too-good-to-be-true' partnership. <em>Refuse gracefully.</em></p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-900/20 to-zinc-900 border border-pink-500/30 p-8 rounded-3xl">
            <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6">
              <HeartPulse className="text-pink-400" size={28} />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">Romance & Network</h4>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p><strong>The Opportunity:</strong> The highly coveted "Peach Blossom" (도화) activates powerfully in May. You will exude a magnetic charm that draws people effortlessly.</p>
              <p><strong>The Danger:</strong> Because your Fire energy is overwhelming, you may come across as too intense or controlling. Practice the art of <em>listening</em>.</p>
            </div>
          </div>
        </section>

        {/* 12-Month Luck Heatmap */}
        <section>
          <h3 className="text-3xl font-black text-white flex items-center gap-3 mb-8">
            <Activity className="text-blue-400" size={32} /> 2027 Energy Flow (Heatmap)
          </h3>
          <div className="bg-zinc-800/30 p-8 rounded-3xl border border-zinc-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              {[
                { m: 'Jan', s: 40 }, { m: 'Feb', s: 50 },
                { m: 'Mar', s: 20 }, { m: 'Apr', s: 70 },
                { m: 'May', s: 85 }, { m: 'Jun', s: 90 },
                { m: 'Jul', s: 95 }, { m: 'Aug', s: 100 },
                { m: 'Sep', s: 80 }, { m: 'Oct', s: 60 },
                { m: 'Nov', s: 30 }, { m: 'Dec', s: 55 }
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
          onClick={async () => { const res = await fetch('/api/download-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: "saju", lang, data: { content: aiReport, dob: localStorage.getItem("userDob") || "1995-10-15" } }) }); const blob = await res.blob(); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'K_Oracle_Saju_Report.pdf'; a.click(); window.URL.revokeObjectURL(url); }}
          disabled={isGenerating}
          className="w-full py-5 bg-zinc-100 text-zinc-900 rounded-2xl font-black text-lg hover:bg-white flex items-center justify-center gap-3 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50"
        >
          <Download size={22} /> Download Premium PDF Masterplan
        </button>

      </div>
    </div>
  );
}





