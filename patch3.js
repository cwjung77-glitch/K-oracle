const fs = require('fs');
const path = 'src/app/api/generate-saju/route.js';
let content = fs.readFileSync(path, 'utf8');

// The first prompt block for compatibility
const block1 = 'You are an elite Gen-Z Korean Saju compatibility expert.\\nUser: ${userName}, gender: ${gender}, born: ${birthData}.';
const target1 = 'You are an elite Gen-Z Korean Saju compatibility expert.\\nUser: ${userName}, gender: ${gender}, born: ${birthData}.${exactSajuInfo}';

// The second prompt block for normal saju
const block2 = 'You are a highly sought-after, brutally honest Gen-Z Korean Saju master.\\n  User: ${userName}, gender: ${gender}, born: ${birthData}.';
const target2 = 'You are a highly sought-after, brutally honest Gen-Z Korean Saju master.\\n  User: ${userName}, gender: ${gender}, born: ${birthData}.${exactSajuInfo}';

// Restore original string first just in case
content = content.replace('born: ${birthData}.${exactSajuInfo}', 'born: ${birthData}.');
content = content.replace('born: ${birthData}.${exactSajuInfo}', 'born: ${birthData}.');

content = content.replace(block1, target1);
content = content.replace(block2, target2);

fs.writeFileSync(path, content);
console.log('done');
