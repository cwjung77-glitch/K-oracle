const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

const replacement = `
            {(() => {
              let hash = 0;
              const dob = (typeof window !== 'undefined' ? localStorage.getItem('userDob') : null) || '1995-10-15';
              for (let i = 0; i < dob.length; i++) hash = dob.charCodeAt(i) + ((hash << 5) - hash);
              const seed = Math.abs(hash);
              const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
              const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
              
              const m1 = months[seed % 12];
              const m2 = months[(seed + 3) % 12];
              const m3 = months[(seed + 7) % 12];
              const elem = elements[(seed + 2) % 5];
              
              const wealthOps = [
                'A sudden influx of "Unexpected Wealth" (횡재) enters your chart in ' + m1 + '. This isn\\'t salary; this is investment return, side-hustle virality, or a massive real estate shift.',
                'The "Golden Coffer" (금여) star shines bright in ' + m1 + '. Hidden assets or forgotten investments will suddenly yield explosive returns.',
                'A powerful benefactor (귀인) arrives in ' + m1 + ', offering a highly lucrative opportunity that multiplies your income streams.'
              ];
              const wealthDans = [
                'The "Rob Wealth" (겁재) star lurks in ' + m2 + '. A trusted associate may ask for a loan or propose a too-good-to-be-true partnership. Refuse gracefully.',
                'Beware of the "Financial Leak" (재물손실) phase in ' + m2 + '. Avoid impulsive luxury purchases or high-risk crypto trading during this period.',
                'A sudden tax or legal expense could arise in ' + m2 + '. Double-check all contracts and maintain strict accounting.'
              ];
              const romOps = [
                'The highly coveted "Peach Blossom" (도화) activates powerfully in ' + m3 + '. You will exude a magnetic charm that draws people effortlessly.',
                'The "Red Matchmaker" (홍란) star appears in ' + m3 + '. A seemingly casual encounter could evolve into a fateful, soul-deep connection.',
                'Your charismatic energy peaks in ' + m3 + '. It is the perfect time to expand your professional network and secure high-value clients.'
              ];
              const romDans = [
                'Because your ' + elem + ' energy is overwhelming, you may come across as too intense or controlling. Practice the art of listening.',
                'The "Lonely Star" (고신) shadow casts over you temporarily. You might feel disconnected from your partner. Communicate openly to bridge the gap.',
                'Past lovers or toxic colleagues may attempt to re-enter your life. Cut the energetic cord decisively to protect your aura.'
              ];
              
              return (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-900/20 to-zinc-900 border border-green-500/30 p-8 rounded-3xl">
                    <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <TrendingUp className="text-green-400" size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Wealth & Career Matrix</h4>
                    <div className="space-y-4 text-zinc-400 leading-relaxed">
                      <p><strong>The Opportunity:</strong> {wealthOps[seed % 3]}</p>
                      <p><strong>The Danger:</strong> {wealthDans[(seed + 1) % 3]}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-900/20 to-zinc-900 border border-pink-500/30 p-8 rounded-3xl">
                    <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6">
                      <HeartPulse className="text-pink-400" size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Romance & Network</h4>
                    <div className="space-y-4 text-zinc-400 leading-relaxed">
                      <p><strong>The Opportunity:</strong> {romOps[(seed + 2) % 3]}</p>
                      <p><strong>The Danger:</strong> {romDans[(seed + 3) % 3]}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
`;

const regex = /<section className="grid md:grid-cols-2 gap-8">(.|\n)*?<\/section>/;
c = c.replace(regex, '<section>\n' + replacement + '\n          </section>');
fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
