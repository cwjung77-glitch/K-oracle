import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Layout for Desktop (make it compact like a premium card)
content = content.replace('className="w-full max-w-2xl mx-auto bg-black/60', 'className="w-full max-w-md mx-auto bg-black/60')

# Also, because it's max-w-md now, md:flex-row is no longer a good idea because there is no space.
# We should remove md:flex-row and just keep it stacked.
# Replace: className="flex flex-col gap-6 md:flex-row md:gap-8 justify-between items-center md:items-end w-full"
# With: className="flex flex-col gap-6 justify-between items-center w-full"
content = content.replace('className="flex flex-col gap-6 md:flex-row md:gap-8 justify-between items-center md:items-end w-full"', 'className="flex flex-col gap-6 items-center w-full"')

# Remove md:flex-1 and md:text-right
content = content.replace('className="w-full md:flex-1 text-center md:text-left"', 'className="w-full text-center"')
content = content.replace('className="flex items-center justify-center md:justify-start gap-2 mb-2"', 'className="flex items-center justify-center gap-2 mb-2"')
content = content.replace('className="w-full md:flex-1 text-center md:text-right"', 'className="w-full text-center"')
content = content.replace('className="w-full md:flex-1 flex flex-col items-center md:items-end mt-4 md:mt-0"', 'className="w-full flex flex-col items-center mt-4 md:mt-0"')
content = content.replace('tracking-widest uppercase text-center md:text-right`}', 'tracking-widest uppercase text-center`}')

# 2. Update Download logic
old_download_logic = '''        // try Web Share API first (best UX for native mobile)
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
        }'''

new_download_logic = '''        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
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
        }'''

content = content.replace(old_download_logic, new_download_logic)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
