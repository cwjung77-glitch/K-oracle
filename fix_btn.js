const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf-8');
content = content.replace(
  "localStorage.setItem('idolName', matchType === 'idol' ? selectedIdol.name : customName); if(onUnlockPremium) onUnlockPremium(); else alert('Premium feature unavailable.');",
  "try { localStorage.setItem('idolName', matchType === 'idol' ? selectedIdol.name : customName); } catch(e){} if(onUnlockPremium) onUnlockPremium(); else alert('Premium feature unavailable.');"
);
fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf-8');