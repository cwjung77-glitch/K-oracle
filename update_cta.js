const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8').replace(/\r\n/g, '\n');

const targetRegex = /<div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-zinc-900\/40 rounded-2xl">[\s\S]*?<\/button>\s*<\/div>/;

const replacement = `<div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-zinc-900/40 rounded-2xl">
                  <Lock size={28} className="text-fuchsia-400 mb-2 drop-shadow-[0_0_10px_rgba(232,121,249,0.5)]" />
                  <p className="text-white font-black text-lg mb-1 text-center drop-shadow-lg">
                    {lang === 'es' ? 'Reporte Profundo + Amuleto Bonus' : 'Deep Report + Bonus Amulet'}
                  </p>
                  <p className="text-zinc-300 text-xs mb-4 text-center font-medium max-w-xs drop-shadow-md">
                    {lang === 'es' ? 'Descubre tu destino y obtén tu amuleto.' : 'Unlock your detailed destiny & get a lucky lock-screen wallpaper.'}
                  </p>
                  <button onClick={onGoToPremium} className="px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-black rounded-full shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:scale-105 transition-transform">
                    {lang === 'es' ? 'Desbloquear Todo ($0.99)' : 'Unlock Both ($0.99)'}
                  </button>
                </div>`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync('src/components/features/DailyFortune.jsx', content, 'utf8');
  console.log("CTA Successfully Updated!");
} else {
  console.log("Could not find target CTA section.");
}
