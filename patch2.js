const fs = require('fs');
const path = 'src/app/api/generate-saju/route.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'User: ${userName}, gender: ${gender}, born: ${birthData}.\n  Daily Vibe Context',
  'User: ${userName}, gender: ${gender}, born: ${birthData}.${exactSajuInfo}\n  Daily Vibe Context'
);

fs.writeFileSync(path, content);
