const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8').replace(/\r\n/g, '\n');

const regex = /\n\s*\{\/\* Daily Amulet Freemium Hook \*\/\}[\s\S]*?\}\)\(\)\}\n\s*<\/div>/;
if (regex.test(content)) {
  content = content.replace(regex, '');
  fs.writeFileSync('src/components/features/DailyFortune.jsx', content, 'utf8');
  console.log("Amulet fully removed with regex!");
} else {
  console.log("Regex failed.");
}
