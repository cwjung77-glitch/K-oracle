const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

if (!c.includes('userName: localStorage.getItem("userName")')) {
  c = c.replace(
    /idolName: localStorage\.getItem\(\"idolName\"\)/,
    `idolName: localStorage.getItem("idolName"), userName: localStorage.getItem("userName") || "The Client"`
  );
  fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
}
