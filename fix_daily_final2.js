const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf-8');

const lockStart = content.indexOf('{/* Premium Upsell Hook');
const lockEndStr = '</div>\n                </div>';
const lockEnd = content.indexOf(lockEndStr, lockStart) + lockEndStr.length;

const premiumUI = `              {hasPaid ? (
                <div className="mt-6 border border-yellow-500/30 rounded-2xl p-6 bg-black relative overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <h3 className="text-yellow-400 font-bold tracking-widest text-sm mb-4 uppercase">{lang === 'es' ? 'Tu Amuleto Exclusivo de Hoy' : 'Your Exclusive Daily Amulet'}</h3>
                    <div className="w-48 h-64 bg-zinc-900 rounded-2xl flex flex-col items-center justify-center p-4 border border-yellow-500/50 mb-4 shadow-xl relative overflow-hidden">
                      <div className="absolute top-2 left-2 right-2 bottom-2 border border-yellow-500/20 rounded-xl"></div>
                      <div className="text-5xl mb-4">{getDailyTalisman(name || 'User', new Date().toISOString().split('T')[0]).icon}</div>
                      <div className="text-2xl font-serif-kr text-yellow-100 font-bold tracking-widest mb-1">{getDailyTalisman(name || 'User', new Date().toISOString().split('T')[0]).ko}</div>
                      <div className="text-xs text-yellow-500 font-bold tracking-widest uppercase mb-1">{getDailyTalisman(name || 'User', new Date().toISOString().split('T')[0]).en}</div>
                      <div className="text-[10px] text-zinc-400 text-center leading-tight">{getDailyTalisman(name || 'User', new Date().toISOString().split('T')[0]).desc}</div>
                    </div>
                    <p className="text-zinc-300 text-sm text-center">
                      {lang === 'es' ? 'Guarda esta imagen en tu celular para atraer buena suerte hoy.' : 'Save this amulet to your phone to attract luck today.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 border border-white/5 rounded-2xl relative overflow-hidden group cursor-pointer" onClick={onGoToPremium}>
                  <div className="bg-black/80 p-6 filter blur-sm opacity-50 select-none">
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-xs font-bold text-zinc-500 mb-1">DEEP ANALYSIS</p>
                        <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-zinc-800 rounded w-full mb-2"></div>
                        <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <Lock className="text-fuchsia-400 mb-3" size={32} />
                    <p className="text-white font-bold text-lg mb-2 text-center">
                      {lang === 'es' ? 'Reporte Profundo + Amuleto Bonus' : 'Deep Report + Bonus Amulet'}
                    </p>
                    <p className="text-zinc-300 text-xs mb-4 text-center font-medium max-w-xs drop-shadow-md">
                      {lang === 'es' ? 'Descubre tu destino y obtén tu amuleto.' : 'Unlock your detailed destiny & get a lucky lock-screen wallpaper.'}
                    </p>
                    <button onClick={onGoToPremium} className="px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-full shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:scale-105 transition-transform">
                      {lang === 'es' ? 'Desbloquear Todo ($0.99)' : 'Unlock Both ($0.99)'}
                    </button>
                  </div>
                </div>
              )}`;

content = content.substring(0, lockStart) + premiumUI + content.substring(lockEnd);
fs.writeFileSync('src/components/features/DailyFortune.jsx', content, 'utf-8');
