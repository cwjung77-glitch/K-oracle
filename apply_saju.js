const fs = require('fs');

// Fix SajuCompatibility.jsx
let saju = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

// 1. html2canvas import
if (!saju.includes("import html2canvas from 'html2canvas'")) {
  saju = saju.replace("import { Sparkles", "import html2canvas from 'html2canvas';\nimport { Sparkles");
}

// 2. id ig-story-card
saju = saju.replace('<div className="w-full aspect-[9/16] bg-zinc-950 rounded-3xl border border-zinc-800 p-6', '<div id="ig-story-card" className="w-full aspect-[9/16] bg-zinc-950 rounded-3xl border border-zinc-800 p-6');

// 3. handleDownloadImage
const handleFn = `
  const handleDownloadImage = async () => {
    const card = document.getElementById('ig-story-card');
    if (!card) return;
    try {
      const canvas = await html2canvas(card, { backgroundColor: '#09090b', scale: 2, useCORS: true });
      canvas.toBlob(async (blob) => {
        if(!blob) return;
        const file = new File([blob], 'K-Oracle_Compatibility_IG.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try { await navigator.share({ files: [file] }); return; } catch (err) {}
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'K-Oracle_Compatibility_IG.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    } catch(e) { console.error("Error generating image", e); }
  };
`;
saju = saju.replace('const handleAnalyze', handleFn + '\n  const handleAnalyze');

// 4. onClick
saju = saju.replace('<button className="mt-6 w-full py-4 rounded-xl bg-white text-black font-black', '<button onClick={handleDownloadImage} className="mt-6 w-full py-4 rounded-xl bg-white text-black font-black');

// 5. watermark
saju = saju.replace('Discover Yours at K-ORACLE.com', 'Discover Yours at k-oracle-omega.vercel.app');

// 6. rice-paper CORS bypass
saju = saju.replaceAll("https://www.transparenttextures.com/patterns/rice-paper-2.png", "/rice-paper.png");

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', saju, 'utf8');
console.log("Saju updated!");
