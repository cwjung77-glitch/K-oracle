const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

const dailyFortuneUI = `
          {/* Daily Fortune */}
          {!isGenerating && reportData?.dailyFortune && (
            <section className="mb-12">
              <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-1 rounded-2xl">
                <div className="bg-zinc-900 rounded-2xl p-6 border border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-yellow-500" size={20} />
                    <h4 className="text-yellow-500 font-bold uppercase tracking-widest text-sm">{isKo ? '오늘의 맞춤 운세' : 'Your Daily Cosmic Vibe'}</h4>
                  </div>
                  <p className="text-zinc-200 text-lg leading-relaxed font-serif">
                    {reportData.dailyFortune}
                  </p>
                </div>
              </div>
            </section>
          )}
`;

c = c.replace(
  /\{\/\* Core Analysis \(Dynamic AI Fetch\) \*\/\}/,
  dailyFortuneUI + '\n          {/* Core Analysis (Dynamic AI Fetch) */}'
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
