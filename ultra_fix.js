const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

const newGrid = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  {/* Tier 1: 2026 Q4 */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-zinc-400/30 transition-colors">
                    <h3 className="text-2xl font-black text-zinc-100">2026 Q4 Finale</h3>
                    <p className="text-zinc-500 text-sm mt-2 mb-6">Navigate the remaining 3 months.</p>
                    <div className="text-4xl font-black mb-6 text-zinc-100"><span className="text-2xl text-zinc-500 mr-1">$</span>4.99</div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                      <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> Oct - Dec 2026 Forecast</li>
                      <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> Basic 5 Elements (Web)</li>
                      <li className="flex gap-2 items-start text-zinc-600 line-through decoration-zinc-700 mt-2"><Zap size={14} className="text-zinc-700 flex-shrink-0 mt-1" /> PDF Report Download</li>
                      <li className="flex gap-2 items-start text-zinc-600 line-through decoration-zinc-700"><Zap size={14} className="text-zinc-700 flex-shrink-0 mt-1" /> Premium 2027 Amulet</li>
                    </ul>
                    <button onClick={() => { setSelectedPlan("q4"); setShowCheckout(true); }} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold text-zinc-300">Select Plan</button>
                  </div>

                  {/* Tier 3: Bundle (Most Popular) */}
                  <div className="bg-gradient-to-b from-zinc-800/40 to-black border-2 border-zinc-400 rounded-2xl p-6 flex flex-col relative transform md:-translate-y-4 shadow-lg shadow-white/10 z-10">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-zinc-100 text-black text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">MOST POPULAR</div>
                    <h3 className="text-3xl font-black text-white drop-shadow-md">26+27 VIP Masterplan</h3>
                    <p className="text-violet-300 font-bold text-sm mt-2 mb-4 tracking-wide">THE ULTIMATE 15-MONTH MASTERPLAN</p>
                    <div className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-400 drop-shadow-md"><span className="text-3xl text-violet-500/80 mr-1">$</span>11.99</div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-200 flex-grow">
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> 15-Month Energy Flow (Q4 '26 + 2027)</li>
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Comprehensive VIP PDF Report</li>
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Deep Love & Wealth Matrix</li>
                      <li className="flex gap-2 items-start"><Zap size={16} className="text-zinc-300 flex-shrink-0 mt-0.5" /> Hidden Karma & Destiny Matrix</li>
                      <li className="flex gap-2 items-start font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-300 mt-3 border border-white/10 p-2 rounded-lg bg-black/40"><Zap size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" /> 🎁 Exclusive 2027 Protection Amulet</li>
                    </ul>
                    <button onClick={() => { setSelectedPlan("bundle"); setShowCheckout(true); }} className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black transition-colors shadow-[0_0_30px_rgba(168,85,247,0.5)]">Unlock Masterplan</button>
                  </div>

                  {/* Tier 2: 2027 */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-zinc-400/30 transition-colors">
                    <h3 className="text-2xl font-black text-zinc-100">2027 Full Year</h3>
                    <p className="text-zinc-500 text-sm mt-2 mb-6">Prepare for the new year early.</p>
                    <div className="text-4xl font-black mb-6 text-zinc-100"><span className="text-2xl text-zinc-500 mr-1">$</span>9.99</div>
                    <ul className="space-y-3 mb-8 text-sm text-zinc-400 flex-grow">
                      <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> 12-Month 2027 Flow</li>
                      <li className="flex gap-2 items-start"><Zap size={14} className="text-zinc-300 flex-shrink-0 mt-1" /> Deep Love & Wealth Matrix</li>
                      <li className="flex gap-2 items-start text-white font-bold mt-2"><Zap size={14} className="text-fuchsia-400 flex-shrink-0 mt-1" /> Comprehensive PDF Download</li>
                      <li className="flex gap-2 items-start text-zinc-600 line-through decoration-zinc-700 mt-2"><Zap size={14} className="text-zinc-700 flex-shrink-0 mt-1" /> Premium 2027 Amulet</li>
                    </ul>
                    <button onClick={() => { setSelectedPlan("fullyear"); setShowCheckout(true); }} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold text-zinc-300">Select Plan</button>
                  </div>
                </div>`;

const startIdx = content.indexOf('<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">');

// Find the exact closing div before the Beauty Blueprint section
const beautyIdx = content.indexOf('Unlock Your <span className="text-transparent');
let endIdx = content.lastIndexOf('</div>', beautyIdx);
endIdx = content.lastIndexOf('</div>', endIdx - 1);
endIdx = content.lastIndexOf('</div>', endIdx - 1); 

// Fallback search to ensure we replace just the grid div
const before = content.substring(0, startIdx);
let after = content.substring(startIdx);
const splitArr = after.split(') : (');
const gridContent = splitArr[0];
const remaining = ') : (' + splitArr.slice(1).join(') : (');

// We just replace the gridContent's grid div.
const lastDivIdxInGrid = gridContent.lastIndexOf('</div>');
const innerGridCut = gridContent.substring(0, lastDivIdxInGrid); 
// actually it's easier to just do:
const safeAfter = content.substring(content.indexOf('</div>\n                </div>\n              ) : ('));
let finalAfter = content.substring(content.indexOf(') : (', startIdx));
// Wait, the original code had:
//               </div>
//             </div>
//           ) : (
//             <>
//               <h2 className="text-3xl md:text-5xl font-black mb-4">Unlock Your

// So let's split by `) : (`
const arr = content.split(') : (');
const part1 = arr[0];
const gridStart = part1.indexOf('<div className="grid grid-cols-1 md:grid-cols-3');
const prefix = part1.substring(0, gridStart);
// Replace part1
const newPart1 = prefix + newGrid + '\n                </div>\n              ';
const finalContent = newPart1 + ') : (' + arr.slice(1).join(') : (');

fs.writeFileSync('src/app/page.js', finalContent, 'utf8');
console.log('Fixed correctly via script 3!');
