"use client";

import { t } from '../../locales/i18n';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Shirt, Scissors, ShoppingBag, Download, Star, Sparkles, Check, X, AlertCircle, MessageSquare, Send, Palette } from 'lucide-react';
import CosmicLoader from '../ui/CosmicLoader';

const FALLBACK_EXTRAS = {
  wardrobe: {
    dos: [
      'Structured tailoring and high-clarity fabrics near the collar line',
      'Signature seasonal accent tones that harmonize with your natural melanin contrast',
      'Clean metallic hardware aligned with your cool/warm skin undertone',
    ],
    donts: [
      'Muddy, overly desaturated tones that drain facial luminosity',
      'Harsh contrasting shades that create dark shadows under the eyes',
      'Clashing metallic finishes right next to your jawline',
    ],
  },
  hair: {
    targetShade: 'Cheongdam Signature Gloss Ash / Espresso',
    bleachLevel: 'Level 5-7 (Customized Undertone Balance)',
    tonerFormula: '6.11 Cool Ash + Pearl Gloss Veil (10 Vol)',
  },
};

export default function BeautyDeepDiveReport({ lang = "en" }) {
  const [userPalette, setUserPalette] = useState([]);
  const [userTone, setUserTone] = useState("Winter Cool");
  const [isGenerating, setIsGenerating] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // VIP Stylist Concierge Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'stylist',
      text: lang === 'ko'
        ? '안녕하세요, VIP 고객님! 청담 퍼스널컬러 수석 디렉터입니다. 분석된 리포트를 바탕으로 립 제품 추천, 염색 컬러, 코디 조합 등 궁금한 점을 편하게 물어보세요.'
        : 'Welcome to the Cheongdam VIP Styling Lounge! Ask me anything about your 12-season makeup shades, hair dye formula, jewelry metals, or outfit combinations.',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('k_vibe_user_palette');
      if (stored) setUserPalette(JSON.parse(stored));
      const savedTone = localStorage.getItem('userPersonalColor');
      if (savedTone) setUserTone(savedTone);
    } catch (e) {}
  }, []);

  const fetchReport = async () => {
    setIsGenerating(true);
    const tone = (typeof window !== "undefined" ? localStorage.getItem("userPersonalColor") : null) || "Winter Cool";
    setUserTone(tone);
    const cacheKey = `beauty_v2_${lang}_${tone}`;
    const cached = typeof window !== "undefined" ? localStorage.getItem(cacheKey) : null;

    if (cached && cached !== "undefined") {
      try {
        const data = JSON.parse(cached);
        if (data && data.reportText) {
          setErrorMsg("");
          setReportData({
            ...FALLBACK_EXTRAS,
            ...data,
            wardrobe: data.wardrobe || FALLBACK_EXTRAS.wardrobe,
            hair: data.hair || FALLBACK_EXTRAS.hair,
          });
          setIsGenerating(false);
          return;
        }
      } catch (e) {}
    }

    try {
      const res = await fetch('/api/generate-beauty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tone, lang }),
      });
      const json = await res.json();
      const payload = json.data || json;

      if (json.success && payload && payload.reportText) {
        const normalized = {
          ...FALLBACK_EXTRAS,
          ...payload,
          wardrobe: payload.wardrobe || FALLBACK_EXTRAS.wardrobe,
          hair: payload.hair || FALLBACK_EXTRAS.hair,
        };
        setReportData(normalized);
        localStorage.setItem(cacheKey, JSON.stringify(normalized));

        try {
          const historyStr = localStorage.getItem('kOracleHistory') || '[]';
          let history = JSON.parse(historyStr);
          const newEntry = {
            type: 'beauty',
            lang,
            tone,
            dob: localStorage.getItem("userDob") || '',
            name: `${tone} Beauty Masterplan`,
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
        if (json.isRateLimit) {
          setErrorMsg(lang === 'ko' ? "우주의 에너지가 폭주하고 있습니다! 1분 뒤에 아래 버튼을 눌러 다시 시도해주세요." : "The cosmos is overwhelmed! Please wait 1 minute and try again below.");
        } else {
          setErrorMsg("Report generation failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Failed to fetch beauty report", err);
      setErrorMsg("Network error. Please check your connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [lang]);

  const handleStylistAsk = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const q = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', text: q }]);
    setChatInput('');

    const qLower = q.toLowerCase();
    const isWarm = userTone.toUpperCase().includes('WARM') || userTone.toUpperCase().includes('SPRING') || userTone.toUpperCase().includes('AUTUMN');
    let answer = '';

    if (qLower.includes('lip') || qLower.includes('틴트') || qLower.includes('립')) {
      answer = isWarm
        ? `For your ${userTone} profile, avoid blue-based fuchsias. Layer a sheer peach-beige base across the lip line and tap aglazed coral-fig or terracotta-rose tint (like Rom&nd Juicy Lasting Tint #09 Litchi Coral or #23 Nucadamia) at the inner center.`
        : `For your ${userTone} profile, avoid orange or warm brick shades. Apply a cool mauve-rose blur base and layer a high-gloss berry or plum tint (like Rom&nd #25 Bare Grape or Clio #04 Plum Noir) in the center for instant skin brightening.`;
    } else if (qLower.includes('hair') || qLower.includes('염색') || qLower.includes('머리')) {
      answer = `Your optimal salon formula is "${reportData?.hair?.targetShade || FALLBACK_EXTRAS.hair.targetShade}" at ${reportData?.hair?.bleachLevel || FALLBACK_EXTRAS.hair.bleachLevel} using ${reportData?.hair?.tonerFormula || FALLBACK_EXTRAS.hair.tonerFormula}. Ask your stylist to keep root warmth aligned with your undertone so your jawline looks sharper.`;
    } else if (qLower.includes('gold') || qLower.includes('silver') || qLower.includes('주얼리') || qLower.includes('악세사리') || qLower.includes('jewelry')) {
      answer = isWarm
        ? `14K/18K Champagne Gold, Warm Rose Gold, and creamy pearl hardware harmonize best with your ${userTone} skin luminosity. Avoid icy chrome silver near your face.`
        : `925 Sterling Silver, Platinum, White Gold, and icy crystal accents immediately sharpen and brighten your ${userTone} complexion. Keep yellow gold away from your collarbones.`;
    } else {
      answer = isWarm
        ? `As a ${userTone} muse, your key Cheongdam secret is warm luminance and low-to-medium golden contrast. Anchor your daily look with warm ivory, camel, or peach-coral tones near the face, and finish with a dewy apricot-rose cheek glow.`
        : `As a ${userTone} muse, your key Cheongdam secret is crisp clarity and cool-toned contrast. Anchor your look with optic white, cool lavender, charcoal, or icy berry accents near the face, and keep your base semi-glow with zero yellow oxidation.`;
    }

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: 'stylist', text: answer }]);
    }, 500);
  };

  if (isGenerating || !reportData) {
    return (
      <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-pink-500/30 shadow-[0_0_100px_rgba(236,72,153,0.1)] overflow-hidden">
        {!errorMsg ? (
          <CosmicLoader isBeauty={true} lang={lang} />
        ) : (
          <div className="flex flex-col items-center justify-center mx-auto gap-6 max-w-md text-center px-4 py-20">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2 text-red-500">
              <AlertCircle size={32} />
            </div>
            <p className="text-xl font-bold text-zinc-300">{errorMsg}</p>
            <button onClick={fetchReport} className="px-8 py-4 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition-colors shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              Retry Generation (Already Paid)
            </button>
          </div>
        )}
      </div>
    );
  }

  // Extract inline hex swatches mentioned in reportText
  const extractedHexes = [...(reportData.reportText || '').matchAll(/\[HEX:\s*(#[0-9A-Fa-f]{6})\]/g)].map((m) => m[1]);
  const cleanedReportText = (reportData.reportText || 'Styling report is ready.')
    .replace(/\[MOOD_SCORES:[^\]]+\]/gi, '')
    .replace(/\[CATEGORY:\s*(.*?)\]/gi, '\n### ✨ $1\n')
    .replace(/\[HEX:\s*(#[0-9A-Fa-f]{6})\]/gi, '`$1`');

  const wardrobeDos = reportData.wardrobe?.dos || FALLBACK_EXTRAS.wardrobe.dos;
  const wardrobeDonts = reportData.wardrobe?.donts || FALLBACK_EXTRAS.wardrobe.donts;
  const hairInfo = reportData.hair || FALLBACK_EXTRAS.hair;

  return (
    <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 text-left">
      {/* Header Banner */}
      <div className="relative h-64 bg-gradient-to-br from-pink-900 via-purple-900 to-black overflow-hidden flex items-end p-8 sm:p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 w-full flex justify-between items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-4">
              <Star size={14} className="text-yellow-400" /> VIP Cheongdam Edition • {userTone}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              {t('beauty_blueprint', lang) || 'K-Beauty Masterplan'}
            </h2>
            <p className="text-zinc-300 mt-2 font-medium">
              {lang === 'es' ? 'El plan maestro de estilo de 30 días.' : 'Your complete 12-season Cheongdam celebrity styling blueprint.'}
            </p>
          </div>
          <div className="hidden md:block">
            <Sparkles size={48} className="text-white/20" />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10 space-y-12">
        {/* Unlocked Full 9-Pan Signature Palette */}
        {(userPalette.length > 0 || extractedHexes.length > 0) && (
          <section className="bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-pink-500/20">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Palette className="text-pink-400" size={24} />
              Unlocked VIP 9-Pan Aura Swatches ({userTone})
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-3">
              {(userPalette.length > 0
                ? userPalette
                : extractedHexes.slice(0, 9).map((hex, i) => ({ hex, name: `Shade ${i + 1}` }))
              ).map((swatch, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 bg-black/40 p-3 rounded-2xl border border-white/5">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="text-[11px] font-bold text-zinc-200 text-center leading-tight">{swatch.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{swatch.hex}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cheongdam Styling Masterplan (Markdown Rendered) */}
        <section className="bg-zinc-900/50 p-6 sm:p-8 rounded-3xl border border-pink-500/30">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="text-pink-400" size={28} />
            {t('cheongdam_analysis', lang) || 'Cheongdam Director Analysis'}
          </h3>
          <div className="prose prose-invert prose-pink max-w-none prose-headings:text-pink-400 prose-headings:font-black prose-headings:border-b prose-headings:border-pink-500/20 prose-headings:pb-2 prose-headings:mt-8 prose-p:text-zinc-300 prose-p:leading-relaxed prose-li:text-zinc-300 prose-strong:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{cleanedReportText}</ReactMarkdown>
          </div>
        </section>

        {/* Wardrobe Styling */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center border border-blue-500/30">
              <Shirt className="text-blue-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Wardrobe &amp; Fabric Guide</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4 text-emerald-400 flex items-center gap-2">
                <Check size={16} /> Do&apos;s (Best Matches)
              </h4>
              <ul className="space-y-4 text-zinc-300 text-sm sm:text-base">
                {wardrobeDos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4 text-red-400 flex items-center gap-2">
                <X size={16} /> Don&apos;ts (Avoid)
              </h4>
              <ul className="space-y-4 text-zinc-300 text-sm sm:text-base">
                {wardrobeDonts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-0.5">✕</span>
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
          <div className="bg-gradient-to-r from-zinc-900 to-black p-6 sm:p-8 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 w-full">
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                {lang === 'es'
                  ? 'Muestra esta especificación exacta a tu estilista. Tu matiz requiere niveles de decoloración específicos.'
                  : 'Show this exact specification card to your salon colorist for zero-brassiness undertone alignment.'}
              </p>
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between border-b border-zinc-800 pb-2 gap-4">
                  <span className="text-zinc-500">Target Shade</span>
                  <span className="text-white font-bold text-right">{hairInfo.targetShade}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2 gap-4">
                  <span className="text-zinc-500">Bleach Level</span>
                  <span className="text-white font-bold text-right">{hairInfo.bleachLevel}</span>
                </div>
                <div className="flex justify-between pb-2 gap-4">
                  <span className="text-zinc-500">Toner Formula</span>
                  <span className="text-pink-400 font-mono font-bold text-right">{hairInfo.tonerFormula}</span>
                </div>
              </div>
            </div>
            <div className="w-28 h-28 rounded-full shadow-[0_0_50px_rgba(236,72,153,0.15)] border-4 border-pink-500/30 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-[#2b1d28] via-[#1a1625] to-[#0f0c14] flex items-center justify-center">
              <div className="text-pink-200/80 text-xs font-bold text-center px-3 leading-tight">{userTone} Gloss</div>
            </div>
          </div>
        </section>

        {/* Interactive 1:1 Cheongdam Stylist VIP Concierge Q&A */}
        <section className="bg-gradient-to-b from-zinc-900/90 to-black p-6 sm:p-8 rounded-3xl border border-pink-500/30 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center">
              <MessageSquare className="text-pink-400" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">1:1 Cheongdam Stylist VIP Concierge</h3>
              <p className="text-xs text-zinc-400">Ask follow-up questions about lip tints, hair dye, or jewelry for your {userTone} tone</p>
            </div>
          </div>

          <div className="bg-black/60 border border-white/5 rounded-2xl p-4 max-h-64 overflow-y-auto space-y-3 mb-4">
            {chatMessages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-pink-600 text-white font-medium rounded-br-none'
                    : 'bg-zinc-800/90 text-zinc-200 border border-white/10 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {['Best daily lip tint?', 'Gold or silver jewelry?', 'Salon hair dye formula?'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setChatInput(preset)}
                className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-pink-300 border border-pink-500/20 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>

          <form onSubmit={handleStylistAsk} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask your Cheongdam stylist (e.g. Best blush shade for me?)..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl flex items-center gap-2 text-sm transition-colors"
            >
              <Send size={16} /> Ask
            </button>
          </form>
        </section>

        {/* Exclusive Shopping Cart */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center border border-green-500/30">
              <ShoppingBag className="text-green-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">VIP Shopping Links (Reward Code: KVIBE777)</h3>
          </div>
          <div className="space-y-4">
            <div
              className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 flex items-center justify-between hover:bg-zinc-800/80 transition-colors cursor-pointer"
              onClick={() => window.open('https://www.yesstyle.com/en/list.html?q=korean+makeup&rco=KVIBE777', '_blank')}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-xl">💄</div>
                <div>
                  <div className="text-white font-bold">{lang === 'es' ? 'Kit de Maquillaje K-Beauty (YesStyle)' : `Curated ${userTone} Makeup Kit (YesStyle)`}</div>
                  <div className="text-zinc-500 text-sm">{t('vip_discount', lang) || 'Extra VIP discount applied with code KVIBE777'}</div>
                </div>
              </div>
              <div className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg font-bold text-sm">Shop Now</div>
            </div>
            <div
              className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 flex items-center justify-between hover:bg-zinc-800/80 transition-colors cursor-pointer"
              onClick={() => window.open('https://www.yesstyle.com/en/list.html?q=korean+skincare&rco=KVIBE777', '_blank')}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-xl">✨</div>
                <div>
                  <div className="text-white font-bold">{lang === 'es' ? 'Cuidado de Piel Coreano (YesStyle)' : 'Cheongdam Glass-Skin Prep Essentials (YesStyle)'}</div>
                  <div className="text-zinc-500 text-sm">{t('vip_discount', lang) || 'Extra VIP discount applied with code KVIBE777'}</div>
                </div>
              </div>
              <div className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg font-bold text-sm">Shop Now</div>
            </div>
          </div>
        </section>

        {/* Download PDF */}
        <div className="pt-8 border-t border-zinc-800">
          <button
            onClick={async () => {
              const res = await fetch('/api/download-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: "beauty", lang, data: reportData }),
              });
              const blob = await res.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'K_Oracle_Beauty_Report.pdf';
              a.click();
              window.URL.revokeObjectURL(url);
            }}
            className="w-full py-5 bg-gradient-to-r from-zinc-200 to-white text-zinc-900 rounded-2xl font-black text-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            <Download size={22} /> {lang === 'es' ? 'Descargar Guía Premium en PDF' : 'Download Full PDF Guide'}
          </button>
        </div>
      </div>
    </div>
  );
}
