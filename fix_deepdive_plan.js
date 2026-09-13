const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

c = c.replace(
  /body: JSON\.stringify\(\{ birthData: \(localStorage\.getItem\(\"userDob\"\)/,
  `body: JSON.stringify({ plan: localStorage.getItem("purchasedPlan") || "bundle", birthData: (localStorage.getItem("userDob")`
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
