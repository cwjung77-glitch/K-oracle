const fs = require('fs');

let pc = fs.readFileSync('src/components/features/PersonalColor.jsx', 'utf8');

// 1. html2canvas import
if (!pc.includes("import html2canvas from 'html2canvas'")) {
  pc = pc.replace("import { Sparkles", "import html2canvas from 'html2canvas';\nimport { Sparkles");
}

// 2. id aura-card
pc = pc.replace('<div className="relative p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent shadow-2xl mb-6 overflow-hidden">', '<div id="aura-card" className="relative p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent shadow-2xl mb-6 overflow-hidden">');

// 3. handleShareInstagram
const handleFnPC = `
  const handleShareInstagram = async () => {
    const card = document.getElementById('aura-card');
    if (!card) return;
    try {
      const canvas = await html2canvas(card, { backgroundColor: null, scale: 2, useCORS: true });
      canvas.toBlob(async (blob) => {
        if(!blob) return;
        const file = new File([blob], 'K-Oracle_AuraCard.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try { await navigator.share({ files: [file] }); return; } catch (err) {}
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'K-Oracle_AuraCard.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    } catch(e) { console.error("Error generating image", e); }
  };
`;
pc = pc.replace('const handleImageUpload', handleFnPC + '\n  const handleImageUpload');

// 4. onClick
pc = pc.replace('<button className="w-full mb-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600', '<button onClick={handleShareInstagram} className="w-full mb-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600');

fs.writeFileSync('src/components/features/PersonalColor.jsx', pc, 'utf8');
console.log("PersonalColor updated!");
