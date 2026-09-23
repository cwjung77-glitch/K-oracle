const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

const oldQ4Regex = /<ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">[\s\S]*?Oct - Dec Forecast<\/li>[\s\S]*?Basic 5 Elements<\/li>\s*<\/ul>/;
const newQ4 = `<ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                        <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> Oct - Dec 2026 Forecast</li>
                        <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> Basic 5 Elements (Web View)</li>
                        <li className="flex gap-2 items-start text-zinc-600 line-through decoration-zinc-700 mt-2"><Zap size={14} className="text-zinc-700 flex-shrink-0 mt-1" /> PDF Report Download</li>
                        <li className="flex gap-2 items-start text-zinc-600 line-through decoration-zinc-700"><Zap size={14} className="text-zinc-700 flex-shrink-0 mt-1" /> Premium 2027 Amulet</li>
                      </ul>`;

const oldBundleRegex = /<ul className="space-y-3 mb-8 text-sm text-zinc-300 flex-grow">[\s\S]*?Hidden Karma & Destiny Analysis<\/li>\s*<\/ul>/;
const newBundle = `<ul className="space-y-3 mb-8 text-sm text-zinc-200 flex-grow">
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> 15-Month Energy Flow (Q4 '26 + 2027)</li>
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Comprehensive VIP PDF Report</li>
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Deep Love & Wealth Matrix</li>
                        <li className="flex gap-2 items-start font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-300 mt-3 border border-white/10 p-2 rounded-lg bg-black/40"><Zap size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" /> 🎁 Exclusive 2027 Protection Amulet (Digital Wallpaper)</li>
                      </ul>`;

const oldFullYearRegex = /<ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">[\s\S]*?Deep Love & Wealth Matrix<\/li>\s*<\/ul>/;
const newFullYear = `<ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                        <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> 12-Month 2027 Flow</li>
                        <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> Deep Love & Wealth Matrix</li>
                        <li className="flex gap-2 items-start text-white font-bold mt-2"><Zap size={14} className="text-fuchsia-400 flex-shrink-0 mt-1" /> Comprehensive PDF Download</li>
                        <li className="flex gap-2 items-start text-zinc-600 line-through decoration-zinc-700 mt-2"><Zap size={14} className="text-zinc-700 flex-shrink-0 mt-1" /> Premium 2027 Amulet</li>
                      </ul>`;

content = content.replace(oldQ4Regex, newQ4);
content = content.replace(oldBundleRegex, newBundle);
content = content.replace(oldFullYearRegex, newFullYear);

// Update title slightly for clarity
content = content.replace('26+27 Bundle', '26+27 VIP Masterplan');

fs.writeFileSync('src/app/page.js', content, 'utf8');
console.log("Pricing updated!");
