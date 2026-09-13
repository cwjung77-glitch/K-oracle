const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8').replace(/\r\n/g, '\n');

if (!c.includes("const isCompatibility = plan === 'compatibility';")) {
  c = c.replace(/const displayYear = plan === 'compatibility' \? 'Chemistry' : plan === 'fullyear' \? '2028' : plan === 'bundle' \? '2027-2028' : '2027';/, `const displayYear = plan === 'compatibility' ? 'Chemistry' : plan === 'fullyear' ? '2028' : plan === 'bundle' ? '2027-2028' : '2027';\n    const isCompatibility = plan === 'compatibility';`);
}

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
