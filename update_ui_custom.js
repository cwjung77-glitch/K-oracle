const fs = require('fs');
let c = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8').replace(/\r\n/g, '\n');

const searchSectionOld = `<div className="space-y-4" ref={searchRef}>
              <label className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm font-medium text-zinc-300">
                <span>2. Search Your Bias (최애 검색)</span>
                <span onClick={() => setShowRequestIdol(true)} className="text-xs text-yellow-500 cursor-pointer hover:underline">+ Request Missing Idol</span>
              </label>
              
                            {showRequestIdol && (`;

const searchSectionNew = `<div className="space-y-4" ref={searchRef}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <label className="text-sm font-medium text-zinc-300">2. Select Your Partner</label>
                <div className="flex bg-zinc-800 rounded-lg p-1">
                  <button onClick={() => setMatchType('idol')} className={\`px-3 py-1 text-xs font-bold rounded-md transition-colors \${matchType === 'idol' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white'}\`}>Idol Match</button>
                  <button onClick={() => setMatchType('custom')} className={\`px-3 py-1 text-xs font-bold rounded-md transition-colors \${matchType === 'custom' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white'}\`}>Custom Match</button>
                </div>
              </div>
              
              {matchType === 'custom' ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Partner's Name" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input type="date" value={customDob} onChange={(e) => setCustomDob(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
                    <input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />
                    <select value={customGender} onChange={(e) => setCustomGender(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 appearance-none cursor-pointer">
                      <option value="female">♀ Female</option>
                      <option value="male">♂ Male</option>
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-zinc-500">Search from K-Pop database</span>
                    <span onClick={() => setShowRequestIdol(true)} className="text-xs text-yellow-500 cursor-pointer hover:underline">+ Request Missing Idol</span>
                  </div>
                            {showRequestIdol && (`;

c = c.replace(searchSectionOld, searchSectionNew);

// Add missing closing tag for the new `<>` fragment
const endOfSearchOld = `              {selectedIdol && !isDropdownOpen && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-500 text-sm flex items-center justify-between animate-in fade-in">
                  <span>Selected: <strong>{selectedIdol.name}</strong></span>
                </div>
              )}
            </div>`;
const endOfSearchNew = `              {selectedIdol && !isDropdownOpen && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-500 text-sm flex items-center justify-between animate-in fade-in">
                  <span>Selected: <strong>{selectedIdol.name}</strong></span>
                </div>
              )}
                </>
              )}
            </div>`;

c = c.replace(endOfSearchOld, endOfSearchNew);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', c);
