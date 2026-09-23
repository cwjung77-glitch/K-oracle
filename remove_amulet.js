const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8');

// The Amulet block starts around `            {/* Daily Amulet Freemium Hook */}` (wait, maybe that comment isn't there, let me match the exact div)
// Let's match from `<div className="bg-zinc-900/80 backdrop-blur-xl ... Your Daily Amulet` to `            </div>` before `          </div>\n        )}`

const regex = /<div className="bg-zinc-900\/80 backdrop-blur-xl[\s\S]*?Your Daily Amulet[\s\S]*?High-res download for lock screen\.<\/p>\s*<\/div>\s*<\/div>\s*\);\s*\}\)\(\)\}\s*<\/div>/g;

content = content.replace(regex, '');

fs.writeFileSync('src/components/features/DailyFortune.jsx', content, 'utf8');
console.log("Removed Amulet Section!");
