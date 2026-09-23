const fs = require('fs');

let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

// 1. We replace the Step 1 UI block.
// The Step 1 block starts with: `{step === 1 ? (`
// and ends right before `) : loading ? (`

const step1Start = `{step === 1 ? (`;
const step1End = `) : loading ? (`;

const step1Regex = /\{step === 1 \? \([\s\S]*?\) : loading \? \(/;

const newStep1 = `{step === 1 ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* VS Layout Container */}
              <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 relative">
                
                {/* Left: User Card */}
                <div className="flex-1 bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                  <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2"><Target size={20} className="text-violet-400"/> My Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Name</label>
                      <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Sarah" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Birth Date</label>
                      <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Gender</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setGender('female')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${gender === 'female' ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>Female</button>
                        <button onClick={() => setGender('male')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${gender === 'male' ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>Male</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VS Badge */}
                <div className="flex items-center justify-center -my-4 md:my-0 md:-mx-4 z-10 relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-950 border-[4px] border-zinc-900 flex items-center justify-center shadow-xl">
                    <span className="text-xl md:text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-400">VS</span>
                  </div>
                </div>

                {/* Right: Partner/Idol Card */}
                <div className="flex-1 bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500"></div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-white flex items-center gap-2"><Star size={20} className="text-pink-400"/> Match With</h3>
                    <div className="flex bg-zinc-900 rounded-lg p-1">
                      <button onClick={() => setMatchType('idol')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${matchType === 'idol' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}>Idol</button>
                      <button onClick={() => setMatchType('custom')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${matchType === 'custom' ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}>Custom</button>
                    </div>
                  </div>

                  {matchType === 'idol' ? (
                    <div className="space-y-4 h-full flex flex-col">
                      <div className="relative" ref={searchRef}>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 text-zinc-500" size={18} />
                          <input type="text" placeholder="Search K-Pop Idols..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); }} onFocus={() => setIsDropdownOpen(true)} className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" />
                        </div>
                        {isDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto">
                            {filteredIdols.length > 0 ? filteredIdols.map(idol => (
                              <div key={idol.id} onClick={() => { setSelectedIdol(idol); setIsDropdownOpen(false); setSearchQuery(''); }} className="px-4 py-3 hover:bg-zinc-800 cursor-pointer flex justify-between items-center transition-colors border-b border-zinc-800/50 last:border-0">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-600">{idol.name.charAt(0)}</div>
                                  <div>
                                    <div className="text-white font-bold text-sm">{idol.name}</div>
                                    <div className="text-zinc-500 text-xs">{idol.group}</div>
                                  </div>
                                </div>
                                {selectedIdol?.id === idol.id && <Heart size={14} className="text-pink-500 fill-pink-500" />}
                              </div>
                            )) : (
                              <div className="px-4 py-6 text-center">
                                <div className="text-zinc-500 text-sm mb-2">Idol not found</div>
                                <button onClick={() => { setShowRequestIdol(true); setIsDropdownOpen(false); }} className="text-pink-400 hover:text-pink-300 text-xs font-bold underline underline-offset-4">Request to add them!</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-900/50 rounded-xl border border-dashed border-zinc-700 p-4 mt-2">
                        {selectedIdol ? (
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center mb-3">
                              <Star size={24} className="text-pink-400" />
                            </div>
                            <div className="text-xl font-black text-white">{selectedIdol.name}</div>
                            <div className="text-sm font-bold text-pink-400">{selectedIdol.group}</div>
                          </div>
                        ) : (
                          <div className="text-zinc-500 text-sm">Select an idol above</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Their Name</label>
                        <input type="text" value={customName} onChange={e => setCustomName(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors" placeholder="e.g. Michael" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Their Birth Date</label>
                        <input type="date" value={customDob} onChange={e => setCustomDob(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Their Gender</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => setCustomGender('female')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${customGender === 'female' ? 'bg-pink-600/20 border-pink-500 text-pink-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>Female</button>
                          <button onClick={() => setCustomGender('male')} className={`py-3 rounded-xl border font-bold text-sm transition-all ${customGender === 'male' ? 'bg-pink-600/20 border-pink-500 text-pink-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>Male</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handleMatch}
                className="w-full mt-4 py-5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 hover:opacity-90 text-white font-black text-xl transition-all shadow-[0_0_40px_rgba(217,70,239,0.3)] hover:scale-[1.01] flex items-center justify-center gap-3 group"
              >
                <Sparkles size={24} className="group-hover:animate-pulse" /> Analyze Cosmic Connection
              </button>

              {showRequestIdol && (
                <div className="mt-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <h4 className="font-bold text-white mb-2">Request an Idol</h4>
                  <div className="flex gap-2">
                    <input type="text" value={requestName} onChange={e => setRequestName(e.target.value)} placeholder="Idol Name & Group" className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                    <button onClick={handleRequestIdol} className="px-4 bg-white text-black font-bold rounded-lg text-sm hover:bg-zinc-200">Send</button>
                  </div>
                  {requestStatus && <p className="text-green-400 text-xs mt-2">{requestStatus}</p>}
                </div>
              )}
            </div>
          ) : loading ? (`;

content = content.replace(step1Regex, newStep1);

// Write changes
fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content);
console.log("Step 1 Overhaul Applied!");
