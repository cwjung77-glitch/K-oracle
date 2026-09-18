import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Target, Palette, Zap, Check, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';


const dailyTalismans = [
  { id: 'wealth', ko: '재물폭발', en: 'Wealth Explosion', desc: 'Attracts money and unexpected windfalls today', icon: '💰', bg: 'bg-yellow-900/50', border: 'border-yellow-500/50', text: 'text-yellow-400' },
  { id: 'work', ko: '칼퇴기원', en: 'Off-Work On-Time', desc: 'Smooth workflow and zero overtime today', icon: '🏃', bg: 'bg-blue-900/50', border: 'border-blue-500/50', text: 'text-blue-400' },
  { id: 'study', ko: '벼락치기', en: 'Cramming Success', desc: 'Laser focus and memory retention', icon: '✍️', bg: 'bg-indigo-900/50', border: 'border-indigo-500/50', text: 'text-indigo-400' },
  { id: 'love', ko: '매력발산', en: 'Aura Burst', desc: 'Magnetic charm and romantic luck', icon: '💘', bg: 'bg-pink-900/50', border: 'border-pink-500/50', text: 'text-pink-400' },
  { id: 'health', ko: '강철체력', en: 'Iron Health', desc: 'Infinite stamina and physical vitality', icon: '💪', bg: 'bg-green-900/50', border: 'border-green-500/50', text: 'text-green-400' },
  { id: 'peace', ko: '이너피스', en: 'Serenity Now', desc: 'Calm mind and protection from stress', icon: '🧘', bg: 'bg-teal-900/50', border: 'border-teal-500/50', text: 'text-teal-400' },
  { id: 'luck', ko: '만사형통', en: 'Everything Goes Well', desc: 'General good luck and smooth sailing', icon: '🍀', bg: 'bg-emerald-900/50', border: 'border-emerald-500/50', text: 'text-emerald-400' }
];

function getDailyTalisman(name, dateStr) {
  let hash = 0;
  const str = name + dateStr;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % dailyTalismans.length;
  return dailyTalismans[index];
}

export default function DailyFortune({ lang, onGoToPremium }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');

  useEffect(() => {
    // Load saved info
    if(typeof window !== 'undefined') {
      setName(localStorage.getItem('userName') || '');
      setDob(localStorage.getItem('userDob') || '');
      setGender(localStorage.getItem('userGender') || 'female');
      
      // Check cache for today
      const todayStr = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem('daily_date');
      if (savedDate === todayStr) {
        const cached = localStorage.getItem('daily_result');
        if (cached) setResult(JSON.parse(cached));
      } else {
        localStorage.removeItem('daily_result');
        localStorage.removeItem('daily_date');
      }
    }
  }, []);

  const handleGenerate = async () => {
    if(!dob || !name) {
      alert(lang === 'ko' ? "이름과 생년월일을 입력해주세요." : "Please enter your name and birth date.");
      return;
    }
    setLoading(true);
    
    // Save to local storage
    localStorage.setItem('userName', name);
    localStorage.setItem('userDob', dob);
    localStorage.setItem('userGender', gender);

    try {
      const res = await fetch('/api/generate-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthData: dob, gender, lang, userName: name })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        const todayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem('daily_date', todayStr);
        localStorage.setItem('daily_result', JSON.stringify(data.data));
      } else {
        alert("Failed to generate fortune.");
      }
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-16">
      
      {!result && !loading && (
        <div className="bg-zinc-900/50 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
              {lang === "es" ? "Fortuna Diaria Gratis" : "Free Daily Fortune"}
            </h2>
            <p className="text-zinc-400 text-sm">
              {lang === "es" ? "Alinea tu energía de hoy y descubre tu color de la suerte." : "Align your energy for today and discover your lucky color."}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">{lang === 'es' ? 'Nombre' : 'Name'}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Sarah" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">{lang === 'es' ? 'Fecha de Nacimiento' : 'Birth Date'}</label>
              <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">{lang === 'es' ? 'Género' : 'Gender'}</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setGender('female')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${gender === 'female' ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-black/50 border-white/5 text-zinc-400'}`}>Female</button>
                <button onClick={() => setGender('male')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${gender === 'male' ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-black/50 border-white/5 text-zinc-400'}`}>Male</button>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black text-lg transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
            >
              <Sparkles size={18} /> {lang === 'es' ? 'Ver Mi Fortuna' : 'Reveal My Fortune'}
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="bg-zinc-900/50 backdrop-blur-md p-10 rounded-3xl border border-white/10 flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-violet-500/20 rounded-full animate-ping" />
            <div className="absolute inset-2 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full animate-spin flex items-center justify-center">
              <Sparkles className="text-white w-6 h-6 animate-pulse" />
            </div>
          </div>
          <p className="text-zinc-300 font-bold animate-pulse">{lang === 'es' ? 'Descifrando tu destino...' : 'Decoding your destiny...'}</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6">
          <div className="bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.3em] mb-2">{new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
              <div className="inline-flex items-end gap-2 mb-4">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{result.score}</span>
                <span className="text-xl text-zinc-500 font-bold mb-2">/ 100</span>
              </div>
              <p className="text-lg text-zinc-200 leading-relaxed max-w-lg mx-auto">
                "{result.vibe}"
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-black/50 border border-white/5 p-5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Palette size={16} className="text-pink-400" />
                  <h4 className="font-bold text-zinc-300 text-sm uppercase tracking-widest">{lang === 'es' ? 'Color de la Suerte' : 'Lucky Color'}</h4>
                </div>
                <div className="text-xl font-black text-white mb-2">{result.luckyColor}</div>
                <p className="text-zinc-400 text-sm mb-4">Enhance your aura today with <strong className="text-pink-300">{result.luckyItem}</strong>.</p>
                <a href="https://www.yesstyle.com/en/list.html?q=makeup&rco=KVIBE777" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold bg-pink-500/20 text-pink-300 px-3 py-1.5 rounded-full hover:bg-pink-500/30 transition-colors">
                  Buy on YesStyle <ChevronRight size={12} />
                </a>
              </div>

              <div className="bg-black/50 border border-white/5 p-5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={16} className="text-violet-400" />
                  <h4 className="font-bold text-zinc-300 text-sm uppercase tracking-widest">{lang === 'es' ? 'Match de Ídolo' : 'Idol Match'}</h4>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {result.idolMatch}
                </p>
              </div>
            </div>
          </div>

          
          {/* Daily Amulet Freemium Hook */}
          <div className="bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Zap size={20} className="text-yellow-400" />
              <h3 className="text-xl font-black text-white uppercase tracking-widest">{lang === 'es' ? 'Tu Amuleto Diario' : 'Your Daily Amulet'}</h3>
            </div>
            <p className="text-zinc-400 text-sm text-center mb-6 max-w-md mx-auto">
              {lang === 'es' ? 'Descarga este amuleto de la suerte para tu fondo de pantalla y atrae energía positiva hoy.' : 'Download this lucky charm as your phone lock screen to attract positive energy today.'}
            </p>

            {(() => {
              const todayStr = new Date().toISOString().split('T')[0];
              const talisman = getDailyTalisman(name, todayStr);
              return (
                <div className="relative max-w-sm mx-auto">
                  {/* Blurred Amulet inside */}
                  <div className={"w-full aspect-[9/16] rounded-2xl flex flex-col items-center justify-center p-6 filter blur-md opacity-60 " + talisman.bg + " border " + talisman.border}>
                    <div className="text-7xl mb-6">{talisman.icon}</div>
                    <h4 className={"text-4xl font-black mb-2 " + talisman.text}>{talisman.ko}</h4>
                    <p className={"text-sm uppercase tracking-widest font-bold mb-4 " + talisman.text}>{talisman.en}</p>
                    <p className="text-white text-center text-sm">{talisman.desc}</p>
                  </div>

                  {/* Lock Overlay */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-white/20">
                    <Lock size={32} className="text-yellow-400 mb-4 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                    <p className="text-white font-black text-lg mb-2 text-center drop-shadow-md">Unlock Amulet</p>
                    <button onClick={onGoToPremium} className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-105 transition-transform">
                      Only $0.99
                    </button>
                    <p className="text-zinc-300 text-xs mt-4 text-center">One-time purchase.<br/>High-res download for lock screen.</p>
                  </div>
                </div>
              );
            })()}
          </div>


          <div className="bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 border border-violet-500/30 p-6 sm:p-8 rounded-3xl text-center relative overflow-hidden group cursor-pointer hover:border-violet-400/50 transition-colors" onClick={onGoToPremium}>
            <div className="absolute inset-0 bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Lock size={24} className="text-violet-300 mx-auto mb-3" />
            <h3 className="text-xl font-black text-white mb-2">{lang === 'es' ? 'Desbloquea Tu Destino Completo' : 'Unlock Your Full Destiny'}</h3>
            <p className="text-zinc-400 text-sm mb-5 max-w-md mx-auto">
              {lang === 'es' ? '¿Quieres saber qué te deparan los próximos 15 meses? Obtén tu reporte Saju detallado de 30 páginas por $11.99.' : 'Want to know what the next 15 months hold? Get your detailed 30-page Saju report for $11.99.'}
            </p>
            <button className="bg-white text-black font-black px-6 py-3 rounded-full text-sm hover:scale-105 transition-transform">
              {lang === 'es' ? 'Ver Planes Premium' : 'View Premium Plans'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
