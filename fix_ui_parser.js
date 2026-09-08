const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

const parseToHtml = `
              ) : (
                <div className="space-y-6">
                  {aiReport.split('\\n').map((line, idx) => {
                    const match = line.match(/^\\[CATEGORY:\\s*(.*?)\\]/i);
                    if (match) {
                      return <h4 key={idx} className="text-xl font-black text-yellow-500 mt-8 mb-2 border-b border-yellow-500/30 pb-2">{match[1]}</h4>;
                    } else if (line.trim().length > 0) {
                      return <p key={idx} className="leading-relaxed">{line}</p>;
                    }
                    return null;
                  })}
                </div>
              )}
`;

c = c.replace(/              \) : \([\s\S]*?aiReport[\s\S]*?              \)}/, parseToHtml.trim());

const karmaParseToHtml = `
              <section className="mt-8 p-6 bg-zinc-900 border border-yellow-500/30 rounded-2xl">
                <h3 className="text-yellow-500 font-bold mb-4">[ADMIN ONLY] KARMA REVIEW</h3>
                <div className="space-y-4 text-sm text-zinc-300">
                  {(localStorage.getItem("aiKarma") || "").split('\\n').map((line, idx) => {
                    const match = line.match(/^\\[CATEGORY:\\s*(.*?)\\]/i);
                    if (match) {
                      return <h4 key={idx} className="text-lg font-bold text-yellow-400 mt-6 mb-1">{match[1]}</h4>;
                    } else if (line.trim().length > 0) {
                      return <p key={idx}>{line}</p>;
                    }
                    return null;
                  })}
                </div>
              </section>
`;

c = c.replace(/<section className="mt-8 p-6 bg-zinc-900 border border-yellow-500\/30 rounded-2xl">[\s\S]*?<\/section>/, karmaParseToHtml.trim());

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
