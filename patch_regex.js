const fs = require('fs');
let content = fs.readFileSync('src/components/features/PersonalColor.jsx', 'utf8');

const newPaletteBreakdown = `
              {/* 9-Pan Signature Palette Breakdown */}
              <div className="mb-8 border-t border-zinc-800 pt-8">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                  <Palette className={result.textColor} size={20} /> Your Signature 9-Pan Palette
                </h4>
                <div className="relative">
                  <div className="grid grid-cols-3 gap-3 bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-2xl">
                    {/* Top 3: Visible Core Colors */}
                    {result.bestColors.slice(0, 3).map((c, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className="w-full aspect-square rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)] border-2 border-white/20 hover:scale-105 transition-transform" style={{backgroundColor: c.hex}}></div>
                        <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider text-center">{c.name}</span>
                      </div>
                    ))}
                    
                    {/* Bottom 6: Blurred Deep Aura Colors */}
                    {result.bestColors.slice(3, 9).map((c, i) => (
                      <div key={i+3} className="flex flex-col items-center gap-2 blur-md opacity-60">
                        <div className="w-full aspect-square rounded-full shadow-lg border-2 border-zinc-700" style={{backgroundColor: c.hex}}></div>
                        <span className="text-xs text-zinc-600 font-medium uppercase tracking-wider text-center">Locked</span>
                      </div>
                    ))}
                  </div>

                  {/* Lock Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-[75%] flex flex-col items-center justify-center p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-2xl">
                    <AlertTriangle className="text-yellow-500 mb-3" size={28} />
                    <p className="text-sm text-zinc-300 text-center font-medium max-w-[250px] mb-4">
                      Unlock your 6 hidden deep aura colors and matching K-Beauty product list in the full report.
                    </p>
                    <button onClick={() => window.location.href="#pricing"} className="px-6 py-2 bg-white text-black font-bold text-sm rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
                      Unlock Full Palette ($9.99)
                    </button>
                  </div>
                </div>
              </div>`;

// Regex to replace the entire Palette Breakdown block
const regex = /\{\/\* Palette Breakdown \*\/\}([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/;

if (regex.test(content)) {
    content = content.replace(regex, newPaletteBreakdown);
    fs.writeFileSync('src/components/features/PersonalColor.jsx', content);
    console.log('Regex replace successful!');
} else {
    console.log('Regex did not match!');
}
