const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

const karmaDump = `
          {lang === 'ko' && (
            <section className="mt-8 p-6 bg-zinc-900 border border-yellow-500/30 rounded-2xl">
              <h3 className="text-yellow-500 font-bold mb-4">[ADMIN ONLY] KARMA REVIEW</h3>
              <p className="whitespace-pre-wrap text-sm text-zinc-300">{localStorage.getItem("aiKarma")}</p>
            </section>
          )}
`;

c = c.replace("{/* 12-Month Luck Heatmap */}", karmaDump + "\n          {/* 12-Month Luck Heatmap */}");

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
