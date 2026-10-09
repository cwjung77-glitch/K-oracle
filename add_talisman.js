const fs = require('fs');

let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf-8');

const newTalismans = `
      { text: '연분천정', en: 'Heaven Sent', desc: 'A connection blessed by the heavens' },
      { text: '월하빙인', en: 'Red Thread', desc: 'Bound by the invisible thread of fate' },
      { text: '비익연리', en: 'Twin Flames', desc: 'Two souls sharing one destiny' },
      { text: '일편단심', en: 'Pure Devotion', desc: 'Unchanging and unwavering love' },
      { text: '금란지교', en: 'Golden Bond', desc: 'A strong and beautiful relationship' },
      { text: '관포지교', en: 'Deepest Trust', desc: 'Unbreakable faith in one another' },
      { text: '수어지교', en: 'Vital Force', desc: 'You give life and energy to each other' },
      { text: '지란지교', en: 'Fragrant Bond', desc: 'A relationship that smells like sweet orchids' },
      { text: '교칠지교', en: 'Glued Together', desc: 'So close you cannot be separated' },
      { text: '단금지교', en: 'Iron Clad', desc: 'A bond strong enough to cut through metal' }`;

content = content.replace(
  "{ text: '꽃길만걷', en: 'Flower Path', desc: 'Only beautiful days ahead together' }",
  "{ text: '꽃길만걷', en: 'Flower Path', desc: 'Only beautiful days ahead together' }," + newTalismans
);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf-8');