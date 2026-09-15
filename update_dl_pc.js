const fs = require('fs');
let pc = fs.readFileSync('src/components/features/PersonalColor.jsx', 'utf8');

const newFnPC = `
  const [isDownloading, setIsDownloading] = useState(false);
  const handleShareInstagram = async () => {
    const card = document.getElementById('aura-card');
    if (!card) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(card, { 
        backgroundColor: '#09090b', 
        scale: 2, 
        useCORS: true,
        allowTaint: true
      });
      canvas.toBlob(async (blob) => {
        if(!blob) {
          setIsDownloading(false);
          return;
        }
        const file = new File([blob], 'K-Oracle_AuraCard.png', { type: 'image/png' });
        
        let shared = false;
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try { 
            await navigator.share({ files: [file] }); 
            shared = true;
          } catch (err) {}
        }
        
        if (!shared) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'K-Oracle_AuraCard.png';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
        }
        setIsDownloading(false);
      }, 'image/png');
    } catch(e) { 
      setIsDownloading(false);
    }
  };
`;

pc = pc.replace(/const handleShareInstagram = async \(\) => \{[\s\S]*?catch\(e\) \{ console\.error\("Error generating image", e\); \}\s*\};\n/, newFnPC);

pc = pc.replace(/<button onClick=\{handleShareInstagram\} className="w-full mb-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg">/g, '<button onClick={handleShareInstagram} disabled={isDownloading} className="w-full mb-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50">');
pc = pc.replace(/<Share2 size=\{18\} \/> SHARE AURA CARD TO INSTAGRAM/g, '{isDownloading ? "GENERATING..." : <><Share2 size={18} /> SHARE AURA CARD TO INSTAGRAM</>}');

fs.writeFileSync('src/components/features/PersonalColor.jsx', pc, 'utf8');
console.log("updated pc");
