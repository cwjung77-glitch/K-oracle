const fs = require('fs');

const rule = `LEGAL & LIABILITY RULE: You must NEVER give definitive financial, legal, or medical advice. Use probabilistic and suggestive language (e.g., "The energy favors career exploration", NOT "Quit your job"). Absolutely avoid explicit investment commands. Keep all guidance spiritual and psychological to maintain zero legal liability.\n  `;

let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');
c = c.replaceAll('HUMAN-LIKE WRITING RULE:', rule + 'HUMAN-LIKE WRITING RULE:');
fs.writeFileSync('src/app/api/generate-saju/route.js', c);

let d = fs.readFileSync('src/app/api/generate-beauty/route.js', 'utf8');
d = d.replaceAll('HUMAN-LIKE WRITING RULE:', rule + 'HUMAN-LIKE WRITING RULE:');
fs.writeFileSync('src/app/api/generate-beauty/route.js', d);
