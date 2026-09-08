const fs = require('fs');
let c = fs.readFileSync('src/components/features/BeautyDeepDiveReport.jsx', 'utf8');

const textReportUI = `
        {/* Cheongdam Styling Masterplan (AI Text) */}
        <section className="bg-zinc-900/50 p-8 rounded-3xl border border-pink-500/30">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="text-pink-400" size={28} />
            {lang === 'es' ? 'Analisis de Estilo de Cheongdam' : 'Cheongdam Styling Analysis'}
          </h3>
          <div className="space-y-6">
            {(reportData.reportText || "Styling report is being generated...").split('\\n').map((line, idx) => {
              const match = line.match(/^\\[CATEGORY:\\s*(.*?)\\]/i);
              if (match) {
                return <h4 key={idx} className="text-xl font-black text-pink-400 mt-8 mb-2 border-b border-pink-500/30 pb-2">{match[1]}</h4>;
              } else if (line.trim().length > 0) {
                return <p key={idx} className="leading-relaxed text-zinc-300 font-serif text-lg">{line}</p>;
              }
              return null;
            })}
          </div>
        </section>
`;

c = c.replace(/\{\/\* Wardrobe Styling \*\/\}/, textReportUI.trim() + '\n\n        {/* Wardrobe Styling */}');

fs.writeFileSync('src/components/features/BeautyDeepDiveReport.jsx', c);
