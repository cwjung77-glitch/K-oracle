const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8').replace(/\r\n/g, '\n');

const targetStr = `                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {result.idolMatch}
                  </p>
                </div>
              </div>
            </div>`;

const replacementStr = `                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {result.idolMatch}
                  </p>
                </div>
              </div>

              {/* Premium Upsell Hook (Blurred Text) */}
              <div className="mt-6 border border-white/5 rounded-2xl relative overflow-hidden group cursor-pointer" onClick={onGoToPremium}>
                <div className="bg-black/80 p-6 filter blur-sm opacity-50 select-none">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm uppercase tracking-widest mb-1 text-rose-400">Deep Romance Destiny</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">Your Peach Blossom star is highly active today, creating a sudden spark with someone unexpected. However, a hidden clash warns of miscommunication...</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm uppercase tracking-widest mb-1 text-emerald-400">Wealth & Career Timing</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">A critical financial window opens between 2 PM and 4 PM. If you act on the Water energy present in your chart, a significant opportunity will...</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-zinc-900/40 rounded-2xl">
                  <Lock size={28} className="text-fuchsia-400 mb-3 drop-shadow-[0_0_10px_rgba(232,121,249,0.5)]" />
                  <p className="text-white font-black text-lg mb-3 text-center drop-shadow-lg">
                    {lang === 'es' ? 'Desbloquear Reporte Profundo ($0.99)' : 'Unlock Deep Romance & Wealth Report'}
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-full shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:scale-105 transition-transform">
                    {lang === 'es' ? 'Solo $0.99' : 'Only $0.99'}
                  </button>
                </div>
              </div>
            </div>`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/features/DailyFortune.jsx', content, 'utf8');
  console.log("UI Successfully Injected!");
} else {
  console.log("Could not find target string even with LF.");
}
