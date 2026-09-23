const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8');

// Use regex to remove the old $11.99 banner completely
content = content.replace(/<div className="bg-gradient-to-br from-violet-900\/40 to-fuchsia-900\/40[\s\S]*?<\/button>\s*<\/div>/g, '');

fs.writeFileSync('src/components/features/DailyFortune.jsx', content, 'utf8');
console.log("Removed $11.99 banner");
