const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8');

// Replace overlaps
content = content.replace(/ko: '영앤리치'/g, "ko: '돈길만걷자'");
content = content.replace(/ko: '천생연분'/g, "ko: '운명적만남'");
content = content.replace(/ko: '만사형통'/g, "ko: '무사무탈'");
content = content.replace(/ko: '광클성공'/g, "ko: '금손광클'");
content = content.replace(/ko: '성덕인증'/g, "ko: '아이돌픽'");
content = content.replace(/ko: '운수대통'/g, "ko: '금손강림'");

fs.writeFileSync('src/components/features/DailyFortune.jsx', content, 'utf8');
console.log("Overlap fixed!");
