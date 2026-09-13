const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

c = c.replace(
  /const displayYear = plan === 'fullyear' \? '2028' : plan === 'bundle' \? '2027-2028' : '2027';/,
  `const displayYear = plan === 'compatibility' ? 'Cosmic Chemistry' : plan === 'fullyear' ? '2028' : plan === 'bundle' ? '2027-2028' : '2027';`
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
