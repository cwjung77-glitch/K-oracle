const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf-8');

// Add imports
if (!content.includes("from 'html-to-image'")) {
  content = content.replace(
    "import { Sparkles, Star, Target, Palette, Zap, Check, Lock, ChevronRight } from 'lucide-react';",
    "import { Sparkles, Star, Target, Palette, Zap, Check, Lock, ChevronRight, Download } from 'lucide-react';\nimport { toPng } from 'html-to-image';"
  );
}

// Add state and function
const functionBlock = `
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownloadImage = async () => {
    const card = document.getElementById('daily-talisman-card');
    if (!card) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(card, { 
        cacheBust: true, pixelRatio: 3, backgroundColor: '#09090b',
        style: { transform: 'scale(1)', transformOrigin: 'top left' }
      });
      const res = await fetch('/api/download-image', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dataUrl })
      });
      if (!res.ok) throw new Error("Failed to generate download");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`daily-amulet.jpg\`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download image. Try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGenerate = async () => {`;

content = content.replace("  const handleGenerate = async () => {", functionBlock);

// Add id to the amulet card and a download button below it
const amuletBlock = `                    <div id="daily-talisman-card" className="w-48 h-64 bg-zinc-900 rounded-2xl flex flex-col items-center justify-center p-4 border border-yellow-500/50 mb-4 shadow-xl relative overflow-hidden">
                      <div className="absolute top-2 left-2 right-2 bottom-2 border border-yellow-500/20 rounded-xl"></div>
                      <div className="text-5xl mb-4">{getDailyTalisman(name || 'User', new Date().toISOString().split('T')[0]).icon}</div>
                      <div className="text-2xl font-serif-kr text-yellow-100 font-bold tracking-widest mb-1">{getDailyTalisman(name || 'User', new Date().toISOString().split('T')[0]).ko}</div>
                      <div className="text-xs text-yellow-500 font-bold tracking-widest uppercase mb-1">{getDailyTalisman(name || 'User', new Date().toISOString().split('T')[0]).en}</div>
                      <div className="text-[10px] text-zinc-400 text-center leading-tight">{getDailyTalisman(name || 'User', new Date().toISOString().split('T')[0]).desc}</div>
                    </div>
                    <button onClick={handleDownloadImage} disabled={isDownloading} className="px-6 py-2.5 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-500 border border-yellow-500/50 rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)] disabled:opacity-50">
                      {isDownloading ? <Sparkles className="animate-spin" size={16} /> : <Download size={16} />}
                      {lang === 'es' ? 'Descargar' : 'Download Amulet'}
                    </button>
                    <p className="text-zinc-400 text-xs text-center mt-4 max-w-[200px]">`;

// Find the target to replace
const oldAmuletBlockRegex = /<div className="w-48 h-64 bg-zinc-900 rounded-2xl flex flex-col items-center justify-center p-4 border border-yellow-500\/50 mb-4 shadow-xl relative overflow-hidden">[\s\S]*?<p className="text-zinc-300 text-sm text-center">/m;

content = content.replace(oldAmuletBlockRegex, amuletBlock);

fs.writeFileSync('src/components/features/DailyFortune.jsx', content, 'utf-8');
