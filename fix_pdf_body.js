const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

c = c.replace(
  /body: JSON\.stringify\(\{ type: \"saju\", lang, data: \{/g,
  `body: JSON.stringify({ type: "saju", lang, plan, data: {`
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
