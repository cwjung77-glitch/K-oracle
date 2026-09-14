const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const [search, replace] of replacements) {
    content = content.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
  }
  
  if (original !== content) {
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
}

// 1. page.js
replaceInFile(path.join(__dirname, 'src/app/page.js'), [
  ['2027 Q4 Finale', '2026 Q4 Finale'],
  ['Tier 1: 2027 Q4', 'Tier 1: 2026 Q4'],
  ['27+28 Bundle', '26+27 Bundle'],
  ['Tier 2: 2028', 'Tier 2: 2027'],
  ['2028 Full Year', '2027 Full Year'],
  ['12-Month 2028 Flow', '12-Month 2027 Flow']
]);

// 2. CheckoutModal.jsx
replaceInFile(path.join(__dirname, 'src/components/features/CheckoutModal.jsx'), [
  ['2027 Full Destiny Report', '2026 Full Destiny Report'],
  ['2027 Q4 Finale Report', '2026 Q4 Finale Report'],
  ['2028 Full Year Report', '2027 Full Year Report'],
  ['27+28 Bundle Report', '26+27 Bundle Report']
]);

// 3. DeepDiveReport.jsx
replaceInFile(path.join(__dirname, 'src/components/features/DeepDiveReport.jsx'), [
  ["plan === 'bundle' ? '2027-2028' : '2027'", "plan === 'bundle' ? '2026-2027' : '2026'"],
  ["plan === 'fullyear' ? '2028'", "plan === 'fullyear' ? '2027'"]
]);

// 4. download-pdf/route.js
replaceInFile(path.join(__dirname, 'src/app/api/download-pdf/route.js'), [
  ["plan === 'bundle' ? '2027-2028' : '2027'", "plan === 'bundle' ? '2026-2027' : '2026'"],
  ["plan === 'fullyear' ? '2028'", "plan === 'fullyear' ? '2027'"],
  ["'3. Flujo de Energía 2027'", "'3. Flujo de Energía 2026'"]
]);

// 5. generate-saju/route.js
replaceInFile(path.join(__dirname, 'src/app/api/generate-saju/route.js'), [
  ['targetYears = "2027 and 2028"', 'targetYears = "2026 and 2027"'],
  ['targetYears = "2027"', 'targetYears = "2026"'],
  ['targetYears = "2028"', 'targetYears = "2027"']
]);

console.log("Done updating years to 2026/2027");
