const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');

c = c.replace(
  /const displayYear = plan === 'fullyear' \? '2028' : plan === 'bundle' \? '2027-2028' : '2027';/,
  `const displayYear = plan === 'compatibility' ? 'Chemistry' : plan === 'fullyear' ? '2028' : plan === 'bundle' ? '2027-2028' : '2027';`
);

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
