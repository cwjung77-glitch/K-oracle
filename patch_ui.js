const fs = require('fs');

function patchSaju() {
  const path = 'src/components/features/SajuCompatibility.jsx';
  let c = fs.readFileSync(path, 'utf8');

  // I'll replace using regex to be safe
  const regex = /<button onClick=\{\(\) => \{ try \{ localStorage\.setItem\('idolName'[^>]+>\s*<Lock size=\{20\} className="text-white\/80" \/> Unlock Deep Chemistry Report \(\$4\.99\)\s*<\/button>/g;
  
  const newUI = `{/* Teaser Blur UI */}
            <div className="relative mt-8 mb-6 p-6 sm:p-8 rounded-3xl border border-white/5 bg-zinc-900/50 overflow-hidden">
              <div className="blur-[6px] select-none opacity-40">
                <h3 className="text-xl font-bold mb-3 text-pink-400">Deep Cosmic Chemistry & Past Life Karma</h3>
                <p className="mb-2 text-zinc-300 leading-relaxed">The interaction between your core elements creates a dynamic flow of energy. However, in the upcoming cycle, there is a hidden clash that might trigger unexpected events. If you look closely at your destiny matrix, you will see...</p>
                <p className="text-zinc-300 leading-relaxed">Past life karma indicates a deep, unresolved connection. To harness this cosmic energy correctly, you must...</p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-12">
                <Lock size={36} className="text-fuchsia-500 mb-4 animate-pulse" />
                <h4 className="text-lg sm:text-xl font-black text-white mb-4 text-center px-4">Unlock the Hidden Truth of Your Destiny</h4>
                <button onClick={() => { try { localStorage.setItem('idolName', matchType === 'idol' ? selectedIdol.name : customName); } catch(e){} if(onUnlockPremium) onUnlockPremium(); else alert('Premium feature unavailable.'); }} className="w-[90%] max-w-sm py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black rounded-2xl text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.02]">
                  <Lock size={18} className="text-white/80" /> Unlock Deep Report ($4.99)
                </button>
              </div>
            </div>`;

  c = c.replace(regex, newUI);
  fs.writeFileSync(path, c);
  console.log('patched SajuCompatibility');
}

function patchBeauty() {
  const path = 'src/components/features/PersonalColor.jsx';
  let c = fs.readFileSync(path, 'utf8');

  // Let's find the beauty unlock button
  // I don't know the exact string, so I'll just look for a button containing Unlock
  // But wait, I'll do this later or use a different script for beauty.
}

patchSaju();
