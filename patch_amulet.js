const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8');

const talismanDefs = `
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
`;

if (!content.includes('dailyTalismans')) {
    content = content.replace("export default function DailyFortune", talismanDefs + "\nexport default function DailyFortune");
}

const hookJSX = `
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
`;

// Insert it right before the $11.99 premium hook
const searchStr = `<div className="bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 border border-violet-500/30 p-6 sm:p-8 rounded-3xl text-center relative overflow-hidden group cursor-pointer hover:border-violet-400/50 transition-colors" onClick={onGoToPremium}>`;
if (content.includes(searchStr)) {
    content = content.replace(searchStr, hookJSX + "\n\n          " + searchStr);
    fs.writeFileSync('src/components/features/DailyFortune.jsx', content);
    console.log("Successfully patched Daily Fortune!");
} else {
    console.log("Could not find the injection point in Daily Fortune.");
}
