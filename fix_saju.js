const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf-8');
content = content.replace(/k-oracle-omega\.vercel\.app/g, 'thekoracle.com');
content = content.replace(/h-\[330px\]/g, 'h-[380px]');
fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf-8');