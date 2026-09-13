const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8').replace(/\r\n/g, '\n');

// Make sure the closing brace for if (!isCompatibility) is added right before // --------- PAGE 5-10
const targetStr = "marks your absolute peak season. Prepare for a major cosmic event.\`, { align: 'center', width: doc.page.width - 100 });";
if (!c.includes('}\n\n      // ---------------- PAGE 5-10: IN-DEPTH TEXT SECTIONS ----------------')) {
  c = c.replace(targetStr, targetStr + "\n      }\n");
}

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
