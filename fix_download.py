import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add state
content = content.replace('const [isDownloading, setIsDownloading] = useState(false);',
                          'const [isDownloading, setIsDownloading] = useState(false);\n  const [generatedImage, setGeneratedImage] = useState(null);')

# Update handleShareInstagram
old_handler = '''  const handleShareInstagram = async () => {
    const card = document.getElementById('aura-card');
    if (!card) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(card, { backgroundColor: '#09090b', scale: 2, useCORS: true, allowTaint: true });
      canvas.toBlob(async (blob) => {
        if(!blob) { setIsDownloading(false); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'K-Oracle_AuraCard.png';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { try { document.body.removeChild(a); } catch(e){} }, 2000);
        setIsDownloading(false);
        // try Web Share API
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'K-Oracle_AuraCard.png', {type: 'image/png'})] })) {
           try {
             await navigator.share({
               title: 'My K-Beauty Personal Color',
               files: [new File([blob], 'K-Oracle_AuraCard.png', {type: 'image/png'})]
             });
           } catch(e){}
        } else {
           alert('Image saved to your phone! You can now upload it to Instagram.');
        }
      }, 'image/png');
    } catch (err) {
      console.error("Error generating card image", err);
      alert('Failed to generate image. Please try taking a screenshot instead!');
      setIsDownloading(false);
    }
  };'''

new_handler = '''  const handleShareInstagram = async () => {
    const card = document.getElementById('aura-card');
    if (!card) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(card, { backgroundColor: '#09090b', scale: 2, useCORS: true, allowTaint: true });
      canvas.toBlob(async (blob) => {
        if(!blob) { setIsDownloading(false); return; }
        const url = URL.createObjectURL(blob);
        
        setIsDownloading(false);
        
        // try Web Share API first (best UX for native mobile)
        let shared = false;
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'K-Oracle_AuraCard.png', {type: 'image/png'})] })) {
           try {
             await navigator.share({
               title: 'My K-Beauty Personal Color',
               files: [new File([blob], 'K-Oracle_AuraCard.png', {type: 'image/png'})]
             });
             shared = true;
           } catch(e){}
        }
        
        // If native share was canceled or not supported, show our foolproof popup!
        if (!shared) {
            setGeneratedImage(url);
        }
      }, 'image/png');
    } catch (err) {
      console.error("Error generating card image", err);
      alert('Failed to generate image. Please try taking a screenshot instead!');
      setIsDownloading(false);
    }
  };'''

content = content.replace(old_handler, new_handler)

# Add Modal at the end of the component
modal_jsx = '''

      {generatedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md flex flex-col items-center">
            <button 
              onClick={() => setGeneratedImage(null)}
              className="absolute -top-12 right-0 text-white font-bold text-xl bg-white/20 w-10 h-10 rounded-full flex items-center justify-center"
            >
              ×
            </button>
            <div className="bg-white text-black font-black text-center py-2 px-6 rounded-t-2xl w-full">
              📸 LONG PRESS IMAGE TO SAVE
            </div>
            <img src={generatedImage} alt="Your Aura Card" className="w-full rounded-b-2xl shadow-2xl" />
            <div className="text-white/60 text-sm mt-4 text-center">
              If long press doesn't work, take a screenshot!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}'''

# Replace the last closing divs of the component.
# Usually it's `    </div>\n  );\n}`
content = re.sub(r'\s*</div>\s*\);\s*}\s*$', modal_jsx, content)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
