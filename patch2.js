const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');
const newStep2 = fs.readFileSync('step2_replacement.txt', 'utf8');

const regex = /\) : loading \? \([\s\S]*?\{\/\* Amulet Section \*\//;
content = content.replace(regex, newStep2);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content);
console.log("Step 2 Overhaul Applied!");
