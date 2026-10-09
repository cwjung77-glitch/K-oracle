const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf-8');

content = content.replace(/<DailyFortune[\s\S]*?onGoToPremium=\{[\s\S]*?\}\s*\/>/g, `<DailyFortune 
                  key={\`daily-\${resetKey}\`}
                  lang={lang}
                  hasPaid={hasPaid}
                  onGoToPremium={() => { setSelectedPlan('daily'); setShowCheckout(true); }}
                />`);

fs.writeFileSync('src/app/page.js', content, 'utf-8');