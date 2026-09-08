const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');
c = c.replace(/Target Language: \$\{lang === 'ko' \? 'Korean.*?' : isEs \? 'Spanish' : 'English'\}/g, "Target Language: ${lang === 'ko' ? 'Korean (Native Korean Language)' : isEs ? 'Spanish' : 'English'}");
fs.writeFileSync('src/app/api/generate-saju/route.js', c);
