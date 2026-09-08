"use client";

import React, { useState, useEffect } from 'react';
import { Shirt, Scissors, ShoppingBag, Download, Star, Sparkles, Loader2, Check, X } from 'lucide-react';

export default function BeautyDeepDiveReport({ lang = "en" }) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      setIsGenerating(true);
      try {
        const res = await fetch('/api/generate-beauty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tone: "Winter Cool", lang })
        });
        const json = await res.json();
        if (json.success) {
          setReportData(json.data);
          setPdfUrl(json.pdfUrl);
        }
      } catch (err) {
        console.error("Failed to fetch beauty report", err);
      } finally {
        setIsGenerating(false);
      }
    };
    fetchReport();
  }, [lang]);

  if (isGenerating || !reportData) {
    return (
      <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-pink-500/30 shadow-[0_0_100px_rgba(236,72,153,0.1)] flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin mb-4 text-pink-500" size={48} />
        <p className="text-xl font-bold animate-pulse text-pink-400">
          {lang === 'es' ? 'La estilista está analizando tu tono...' : 'The Stylist is analyzing your tone...'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Header Banner */}
      <div className="relative h-64 bg-gradient-to-br from-pink-900 via-purple-900 to-black overflow-hidden flex items-end p-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 w-full flex justify-between items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-4">
              <Star size={14} className="text-yellow-400" /> Premium Unlocked
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              {lang === 'es' ? 'Tu Plan de Belleza' : 'Your Beauty Blueprint'}
            </h2>
            <p className="text-zinc-300 mt-2 font-medium">
              {lang === 'es' ? 'El plan maestro de estilo de 30 días.' : 'The ultimate 30-day styling masterplan.'}
            </p>
          </div>
          <div className="hidden md:block">
            <Sparkles size={48} className="text-white/20" />
          </div>
        </div>
      </div>

      <div className="p-10 space-y-12">
        
        {/* Cheongdam Styling Masterplan (AI Text) */}
        <section className="bg-zinc-900/50 p-8 rounded-3xl border border-pink-500/30">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="text-pink-400" size={28} />
            {lang === 'es' ? 'Analisis de Estilo de Cheongdam' : 'Cheongdam Styling Analysis'}
          </h3>
          <div className="space-y-6">
            {(reportData.reportText || "Styling report is being generated...").split('\n').map((line, idx) => {
              const match = line.match(/^\[CATEGORY:\s*(.*?)\]/i);
              if (match) {
                return <h4 key={idx} className="text-xl font-black text-pink-400 mt-8 mb-2 border-b border-pink-500/30 pb-2">{match[1]}</h4>;
              } else if (line.trim().length > 0) {
                return <p key={idx} className="leading-relaxed text-zinc-300 font-serif text-lg">{line}</p>;
              }
              return null;
            })}
          </div>
        </section>

        {/* Wardrobe Styling */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center border border-blue-500/30">
              <Shirt className="text-blue-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Wardrobe & Fabric Guide</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
              <h4 className="text-zinc-300 font-bold uppercase tracking-wider text-sm mb-4 text-emerald-400 flex items-center gap-2">
                <Check size={16} /> Do's (Best Matches)
              </h4>
              <ul className="space-y-4 text-zinc-400">
                {reportData.wardrobe.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-1">✓</span> 
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
              <h4 className="text-zinc-300 font-bold uppercase tracking-wider text-sm mb-4 text-red-400 flex items-center gap-2">
                <X size={16} /> Don'ts (Avoid)
              </h4>
              <ul className="space-y-4 text-zinc-400">
                {reportData.wardrobe.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-1">✕</span> 
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Hair Dye Recommendation */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 flex items-center justify-center border border-pink-500/30">
              <Scissors className="text-pink-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Salon Hair Color Formula</h3>
          </div>
          <div className="bg-gradient-to-r from-zinc-900 to-black p-8 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <p className="text-zinc-400 leading-relaxed">
                {lang === 'es' 
                  ? 'Muestra esta especificación exacta a tu estilista. Tu matiz requiere niveles de decoloración específicos.'
                  : 'Show this exact specification to your hairstylist. Your undertone requires specific bleach levels.'}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Target Shade</span>
                  <span className="text-white font-bold">{reportData.hair.targetShade}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Bleach Level</span>
                  <span className="text-white font-bold">{reportData.hair.bleachLevel}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-zinc-500">Toner Formula</span>
                  <span className="text-white font-bold">{reportData.hair.tonerFormula}</span>
                </div>
              </div>
            </div>
            <div className="w-32 h-32 rounded-full shadow-[0_0_50px_rgba(236,72,153,0.1)] border-4 border-zinc-800 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-[#1a1c29] to-[#2d1b2e]">
              <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs font-bold text-center p-4 leading-tight">Target Tone</div>
            </div>
          </div>
        </section>

        {/* Exclusive Shopping Cart */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center border border-green-500/30">
              <ShoppingBag className="text-green-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">VIP Shopping Links</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 flex items-center justify-between hover:bg-zinc-800/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg"></div>
                <div>
                  <div className="text-white font-bold">Full 5-Step Makeup Kit (Olive Young)</div>
                  <div className="text-zinc-500 text-sm">One-click add to cart for your exact tone.</div>
                </div>
              </div>
              <div className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg font-bold text-sm">Open Link</div>
            </div>
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 flex items-center justify-between hover:bg-zinc-800/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg"></div>
                <div>
                  <div className="text-white font-bold">Recommended Color Lenses (Olens)</div>
                  <div className="text-zinc-500 text-sm">High-contrast cool tone lenses.</div>
                </div>
              </div>
              <div className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg font-bold text-sm">Open Link</div>
            </div>
          </div>
        </section>

        {/* Download PDF */}
        <div className="pt-8 border-t border-zinc-800">
          <button 
            onClick={async () => { const res = await fetch('/api/download-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: "beauty", lang, data: reportData }) }); const blob = await res.blob(); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'K_Oracle_Beauty_Report.pdf'; a.click(); window.URL.revokeObjectURL(url); }}
            className="w-full py-5 bg-gradient-to-r from-zinc-200 to-white text-zinc-900 rounded-2xl font-black text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            <Download size={22} /> {lang === 'es' ? 'Descargar Guía Premium en PDF' : 'Download Full PDF Guide'}
          </button>
        </div>

      </div>
    </div>
  );
}



