const fs = require('fs');
let code = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');
code = code.split("userElement === 'Fire' ? '?? : userElement === 'Water' ? '?? : userElement === 'Wood' ? '?? : userElement === 'Metal' ? '?? : '??").join("userElement === 'Fire' ? '火' : userElement === 'Water' ? '水' : userElement === 'Wood' ? '木' : userElement === 'Metal' ? '金' : '土'");
fs.writeFileSync('src/components/features/SajuCompatibility.jsx', code, 'utf8');
