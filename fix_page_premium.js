const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8');

c = c.replace(
  /\{activeTab === 'saju' \? <SajuCompatibility \/> : <PersonalColor \/>\}/,
  "{activeTab === 'saju' ? <SajuCompatibility onUnlockPremium={() => { setSelectedPlan('compatibility'); setShowCheckout(true); }} /> : <PersonalColor />}"
);

fs.writeFileSync('src/app/page.js', c);
