const fs = require('fs');
let c = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

if (!c.includes('onUnlockPremium')) {
  c = c.replace(
    /export default function SajuCompatibility\(\) \{/,
    `export default function SajuCompatibility({ onUnlockPremium }) {`
  );
  
  c = c.replace(
    /<div className="flex gap-4">\n\s*<button onClick=\{\(\) => \{ setStep\(1\); setSearchQuery\(''\); setIsDropdownOpen\(false\); \}\} className="flex-1 py-4 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold">\n\s*Try Another Match\n\s*<\/button>\n\s*<button onClick=\{\(\) => setShowSharePreview\(true\)\} className="flex-1 py-4 rounded-xl bg-gradient-to-r from-\[\#833AB4\] via-\[\#FD1D1D\] to-\[\#FCAF45\] text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-\[0_0_20px_rgba\(253,29,29,0\.4\)\]">\n\s*Share to Instagram\n\s*<\/button>\n\s*<\/div>/,
    `<button onClick={() => { localStorage.setItem('idolName', selectedIdol.name); onUnlockPremium?.(); }} className="w-full mb-4 py-5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black rounded-2xl text-lg sm:text-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-[1.02]">
      Unlock Deep AI Chemistry Report ($2.99)
    </button>
    <div className="flex gap-4">
      <button onClick={() => { setStep(1); setSearchQuery(''); setIsDropdownOpen(false); }} className="flex-1 py-4 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold">
        Try Another Match
      </button>
      <button onClick={() => setShowSharePreview(true)} className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(253,29,29,0.4)]">
        Share to IG
      </button>
    </div>`
  );
  fs.writeFileSync('src/components/features/SajuCompatibility.jsx', c);
}
