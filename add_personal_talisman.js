const fs = require('fs');

let content = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf-8');

const talismansCode = `
const personalTalismans = [
  { text: '만사형통', en: 'Ultimate Success', desc: 'Everything you do will prosper' },
  { text: '소원성취', en: 'Dreams Realized', desc: 'Your deepest desires will come true' },
  { text: '금옥만당', en: 'Infinite Wealth', desc: 'Gold and jewels will fill your home' },
  { text: '무병장수', en: 'Iron Health', desc: 'A long life free of illness' },
  { text: '입신양명', en: 'Fame & Glory', desc: 'Your name will be known across the world' },
  { text: '일취월장', en: 'Rapid Growth', desc: 'Improving and succeeding day by day' },
  { text: '대기만성', en: 'Late Bloomer', desc: 'Great success comes to those who wait' },
  { text: '승승장구', en: 'Unstoppable', desc: 'Winning every battle you face' },
  { text: '탄탄대로', en: 'Smooth Sailing', desc: 'A clear and easy path ahead' },
  { text: '부귀영화', en: 'Royal Destiny', desc: 'Living a life of luxury and honor' },
  { text: '운수대통', en: 'Lucky Star', desc: 'The universe is aligning in your favor' },
  { text: '액운퇴치', en: 'Karma Shield', desc: 'Blocking all negative energy and bad luck' },
  { text: '귀인도움', en: 'Angel Helper', desc: 'Powerful allies will come to rescue you' },
  { text: '심신안정', en: 'Inner Peace', desc: 'A calm mind and a strong spirit' },
  { text: '자수성가', en: 'Self Made', desc: 'Building an empire with your own hands' },
  { text: '개과천선', en: 'Fresh Start', desc: 'A total transformation of your destiny' },
  { text: '백전백승', en: 'Undefeated', desc: 'Victory is guaranteed in all endeavors' },
  { text: '천우신조', en: 'Divine Help', desc: 'The heavens are actively protecting you' },
  { text: '명예회복', en: 'Redemption', desc: 'Reclaiming your lost honor and status' },
  { text: '일확천금', en: 'Sudden Wealth', desc: 'A massive windfall of money is coming' },
  { text: '기사회생', en: 'Miracle Comeback', desc: 'Rising from the ashes like a phoenix' },
  { text: '재수대길', en: 'Mega Jackpot', desc: 'Extreme luck in finances and business' },
  { text: '가화만사', en: 'Family Harmony', desc: 'Peace and prosperity in your household' },
  { text: '호연지기', en: 'Bold Spirit', desc: 'Fearless energy to conquer the world' },
  { text: '천하무적', en: 'Invincible', desc: 'Nothing can stand in your way' },
  { text: '금의환향', en: 'Glorious Return', desc: 'Returning home in triumph and success' },
  { text: '전도유망', en: 'Bright Future', desc: 'Your potential is limitless' },
  { text: '칠전팔기', en: 'Resilience', desc: 'Falling seven times, standing up eight' },
  { text: '전화위복', en: 'Blessing in Disguise', desc: 'Turning a crisis into a massive opportunity' },
  { text: '마적성공', en: 'Magic Touch', desc: 'Everything you touch turns to gold' }
];

function getPersonalTalisman(name, dob) {
  const str = name + dob;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return personalTalismans[Math.abs(hash) % personalTalismans.length];
}
`;

// Insert the arrays outside the component
content = content.replace("export default function DeepDiveReport", talismansCode + "\\nexport default function DeepDiveReport");

// Find where to inject the talisman UI. We can put it right below the Daily Fortune section, or right at the top of the report.
const talismanUI = `
            {/* Exclusive Personal Amulet */}
            {!isGenerating && !isCompatibility && (
              <section className="mb-12 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="text-yellow-400" size={24} />
                  <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 font-bold uppercase tracking-widest text-lg">Your Exclusive 2027 Amulet</h4>
                </div>
                
                <div className="w-64 h-[460px] bg-gradient-to-b from-zinc-900 to-black rounded-[2rem] flex flex-col items-center justify-between relative overflow-hidden transition-all duration-500 border-4 border-t-yellow-300/50 border-l-yellow-300/50 border-b-yellow-600/50 border-r-yellow-600/50 shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay"></div>
                  
                  <div className="mt-8 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-500 font-brush-cn text-5xl font-bold opacity-90 z-10" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}>
                    {reportData?.userElement === 'Fire' ? '火' : reportData?.userElement === 'Water' ? '水' : reportData?.userElement === 'Wood' ? '木' : reportData?.userElement === 'Metal' ? '金' : '土'}
                  </div>
                  
                  <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-white via-yellow-100 to-yellow-600 text-[64px] font-serif-kr font-bold flex flex-col items-center justify-center gap-0 py-2 leading-[1.1]" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8)) drop-shadow(0px 1px 1px rgba(234,179,8,0.3))' }}>
                    {getPersonalTalisman(localStorage.getItem("userName") || "", localStorage.getItem("userDob") || "").text.split('').map((char, i) => (
                      <span key={i}>{char}</span>
                    ))}
                  </div>
                  
                  <div className="relative z-10 w-full flex flex-col items-center mb-6 px-3">
                    <div className="w-16 h-[2px] bg-yellow-600/50 mb-3"></div>
                    <div className="text-yellow-400 font-bold text-[11px] tracking-[0.2em] uppercase mb-1 text-center">
                      {getPersonalTalisman(localStorage.getItem("userName") || "", localStorage.getItem("userDob") || "").en}
                    </div>
                    <div className="text-zinc-400 text-[10px] tracking-wider text-center leading-tight opacity-90 uppercase">
                      {getPersonalTalisman(localStorage.getItem("userName") || "", localStorage.getItem("userDob") || "").desc}
                    </div>
                    <div className="mt-4 text-[9px] text-yellow-600/80 font-mono tracking-widest font-bold whitespace-nowrap">
                      K-ORACLE // 2027 VIP
                    </div>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm mt-6 text-center max-w-md">This digital talisman has been uniquely generated based on your Destiny Matrix to protect your energy in 2027.</p>
              </section>
            )}
`;

content = content.replace("{/* Daily Fortune */}", talismanUI + "\\n            {/* Daily Fortune */}");

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', content, 'utf-8');
