const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8');

const startIdx = content.indexOf('{/* Daily Amulet Freemium Hook */}');
const endStr = "})()}\n          </div>";
const endIdx = content.indexOf(endStr, startIdx);

if (startIdx > -1 && endIdx > -1) {
  const blockToRemove = content.substring(startIdx, endIdx + endStr.length);
  content = content.replace(blockToRemove, '');
  fs.writeFileSync('src/components/features/DailyFortune.jsx', content, 'utf8');
  console.log("Amulet fully removed!");
} else {
  console.log("Failed to find amulet bounds.");
}
