const fs = require('fs');
let saju = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

const newFn = `
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownloadImage = async () => {
    const card = document.getElementById('ig-story-card');
    if (!card) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(card, { 
        backgroundColor: '#09090b', 
        scale: 2, 
        useCORS: true,
        logging: true,
        allowTaint: true
      });
      canvas.toBlob(async (blob) => {
        if(!blob) {
          alert("Failed to generate image blob.");
          setIsDownloading(false);
          return;
        }
        const file = new File([blob], 'K-Oracle_Compatibility_IG.png', { type: 'image/png' });
        
        let shared = false;
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try { 
            await navigator.share({ files: [file], title: 'My Cosmic Soulmate' }); 
            shared = true;
          } catch (err) {
            console.log("Share cancelled or failed", err);
          }
        }
        
        if (!shared) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'K-Oracle_Compatibility_IG.png';
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
      console.error("Error generating image", e); 
      alert("Error: " + e.message);
      setIsDownloading(false);
    }
  };
`;

saju = saju.replace(/const handleDownloadImage = async \(\) => \{[\s\S]*?catch\(e\) \{ console\.error\("Error generating image", e\); \}\s*\};\n/, newFn);

// update button
saju = saju.replace(/<button onClick=\{handleDownloadImage\} className="mt-6 w-full py-4 rounded-xl bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">/g, '<button onClick={handleDownloadImage} disabled={isDownloading} className="mt-6 w-full py-4 rounded-xl bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50">');
saju = saju.replace(/<Download size=\{20\} \/> Save to Camera Roll/g, '{isDownloading ? "Generating..." : <><Download size={20} /> Save to Camera Roll</>}');

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', saju, 'utf8');
console.log("updated");
