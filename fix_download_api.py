import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_handler = '''  const handleShareInstagram = async () => {
    const card = document.getElementById('aura-card');
    if (!card) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(card, { backgroundColor: '#09090b', scale: 2, useCORS: true, allowTaint: true });
      canvas.toBlob(async (blob) => {
        if(!blob) { setIsDownloading(false); return; }
        const url = URL.createObjectURL(blob);
        
        setIsDownloading(false);
        
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (!isMobile) {
            // Desktop: Direct download like a PDF
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'K-Oracle_AuraCard.png';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => { try { document.body.removeChild(a); } catch(e){} }, 2000);
        } else {
            // Mobile: Try native share first
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
            
            // If share fails or unsupported (e.g. Kakao/IG browser), show the foolproof popup
            if (!shared) {
                setGeneratedImage(url);
            }
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
      const dataUrl = canvas.toDataURL('image/png');
      
      const res = await fetch('/api/download-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl, filename: 'K-Beauty_AuraCard.png' })
      });
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'K-Beauty_AuraCard.png';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { 
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      setIsDownloading(false);
    } catch (err) {
      console.error("Error generating card image", err);
      alert('Failed to generate image. Please try taking a screenshot instead!');
      setIsDownloading(false);
    }
  };'''

content = content.replace(old_handler, new_handler)

# Remove the modal block at the bottom
modal_start = '{generatedImage && ('
modal_regex = r'\{generatedImage && \([\s\S]*?</div>\s*\)\}'
content = re.sub(modal_regex, '', content)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
