const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

if (!c.includes('idolName:')) {
  c = c.replace(
    /plan: localStorage\.getItem\(\"purchasedPlan\"\)/,
    `plan: localStorage.getItem("purchasedPlan"), idolName: localStorage.getItem("idolName")`
  );
  fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
}
