const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');
c = c.replace(/Target Language: \$\{isEs \? 'Spanish' : 'English'\}/g, "Target Language: ${lang === 'ko' ? 'Korean (한국어. MUST write entirely in Korean)' : isEs ? 'Spanish' : 'English'}");
fs.writeFileSync('src/app/api/generate-saju/route.js', c);
