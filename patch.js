const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');
const newStep1 = fs.readFileSync('step1_replacement.txt', 'utf8');

const regex = /\{step === 1 \? \([\s\S]*?\) : loading \? \(/;
content = content.replace(regex, newStep1);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content);
console.log("Step 1 Overhaul Applied!");
