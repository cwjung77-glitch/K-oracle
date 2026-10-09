const fs = require('fs');
let c = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8');

const target1 = "try {\n      const res = await fetch";
const target2 = "try {\r\n      const res = await fetch";
const replacement1 = "try {\n      const todayStr = getLocalDateStr();\n      const res = await fetch";

let replaced = false;
if (c.includes(target1)) { c = c.replace(target1, replacement1); replaced = true; }
if (c.includes(target2)) { c = c.replace(target2, replacement1); replaced = true; }

const target3 = "const todayStr = getLocalDateStr();\n        localStorage.setItem";
const target4 = "const todayStr = getLocalDateStr();\r\n        localStorage.setItem";
const replacement2 = "localStorage.setItem";

if (c.includes(target3)) { c = c.replace(target3, replacement2); }
if (c.includes(target4)) { c = c.replace(target4, replacement2); }

// In case the previous regex left literal \n
c = c.replace(/try \{\\n      const todayStr = getLocalDateStr\(\);\\n      const res = await fetch/g, replacement1);

fs.writeFileSync('src/components/features/DailyFortune.jsx', c);
console.log('Fixed DailyFortune');
