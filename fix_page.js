const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf-8');

content = content.replace(
  "<DailyFortune \n                  key={\daily-\\}\n                  lang={lang}\n                  onGoToPremium={() => { setSelectedPlan('daily'); setShowCheckout(true); }}\n                />",
  "<DailyFortune \n                  key={\daily-\\}\n                  lang={lang}\n                  hasPaid={hasPaid}\n                  onGoToPremium={() => { setSelectedPlan('daily'); setShowCheckout(true); }}\n                />"
);

// Also we must fix the conditional rendering in the premium-report section!
// Currently it says: {activeTab === 'saju' ? <DeepDiveReport lang={lang} /> : <BeautyDeepDiveReport lang={lang} />}
// But if activeTab is 'daily', we should NOT show BeautyDeepDiveReport!
content = content.replace(
  "{activeTab === 'saju' ? <DeepDiveReport lang={lang} /> : <BeautyDeepDiveReport lang={lang} />}",
  "{activeTab === 'saju' ? <DeepDiveReport lang={lang} /> : activeTab === 'beauty' ? <BeautyDeepDiveReport lang={lang} /> : null}"
);

fs.writeFileSync('src/app/page.js', content, 'utf-8');