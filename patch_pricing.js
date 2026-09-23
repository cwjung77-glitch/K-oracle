const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

const oldQ4 = `<ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                        <li className="flex gap-2 items-center"><Zap size={14} className="text-zinc-300 flex-shrink-0" /> Oct - Dec Forecast</li>
                        <li className="flex gap-2 items-center"><Zap size={14} className="text-zinc-300 flex-shrink-0" /> Basic 5 Elements</li>
                      </ul>`;

const newQ4 = `<ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                        <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> Oct - Dec 2026 Forecast</li>
                        <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> Basic 5 Elements (Web View)</li>
                        <li className="flex gap-2 items-start text-zinc-600 line-through decoration-zinc-700"><Zap size={14} className="text-zinc-700 flex-shrink-0 mt-1" /> PDF Report Download</li>
                      </ul>`;

const oldFullYear = `<ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                        <li className="flex gap-2 items-center"><Zap size={14} className="text-zinc-300 flex-shrink-0" /> 12-Month 2027 Flow</li>
                        <li className="flex gap-2 items-center"><Zap size={14} className="text-zinc-300 flex-shrink-0" /> Deep Love & Wealth Matrix</li>
                      </ul>`;

const newFullYear = `<ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                        <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> 12-Month 2027 Flow</li>
                        <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> Deep Love & Wealth Matrix</li>
                        <li className="flex gap-2 items-start text-white font-bold"><Zap size={14} className="text-fuchsia-400 flex-shrink-0 mt-1" /> Comprehensive PDF Download</li>
                        <li className="flex gap-2 items-start text-zinc-600 line-through decoration-zinc-700 mt-2"><Zap size={14} className="text-zinc-700 flex-shrink-0 mt-1" /> Premium 2027 Amulet</li>
                      </ul>`;

const oldBundle = `<ul className="space-y-3 mb-8 text-sm text-zinc-300 flex-grow">
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> 15-Month Energy Flow Heatmap</li>
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Comprehensive VIP PDF</li>
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Deep Love & Wealth Matrix</li>
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Hidden Karma & Destiny Analysis</li>
                      </ul>`;

const newBundle = `<ul className="space-y-3 mb-8 text-sm text-zinc-200 flex-grow">
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> 15-Month Energy Flow (Q4'26 + '27)</li>
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Comprehensive VIP PDF Report</li>
                        <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Hidden Karma & Destiny Matrix</li>
                        <li className="flex gap-2 items-start font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-300 mt-2 border border-white/20 p-2 rounded-lg bg-black/40"><Zap size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" /> Exclusive 2027 Protection Amulet (Digital Wallpaper)</li>
                      </ul>`;

content = content.replace(oldQ4, newQ4);
content = content.replace(oldFullYear, newFullYear);
content = content.replace(oldBundle, newBundle);

fs.writeFileSync('src/app/page.js', content, 'utf8');
