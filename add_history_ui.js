const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Add recentHistory state
const statesRegex = /const \[showKo, setShowKo\] = useState\(false\);\n/;
c = c.replace(statesRegex, `const [showKo, setShowKo] = useState(false);\n  const [recentHistory, setRecentHistory] = useState([]);\n  useEffect(() => {\n    try {\n      const hist = JSON.parse(localStorage.getItem('kOracleHistory') || '[]');\n      setRecentHistory(hist);\n    } catch(e) {}\n  }, [hasPaid]);\n`);

// 2. Add Recent History UI above the tab switcher
const tabSwitcherStr = `{/* Custom Tab Switcher */}`;
const recentHistoryUI = `
          {/* Recent History */}
          {!hasPaid && recentHistory.length > 0 && (
            <div className="w-full max-w-sm mx-auto mb-6">
              <h3 className="text-yellow-500 font-bold text-sm mb-3 flex items-center gap-2 justify-center">
                <Sparkles size={14} /> {lang === 'ko' ? '최근 열람한 기록' : 'Recent Readings'}
              </h3>
              <div className="space-y-2">
                {recentHistory.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      if (item.type === 'saju') {
                        // We reconstruct from cacheKey: saju_{plan}_{dob}_{name}_{idolName}
                        const parts = item.cacheKey.split('_');
                        localStorage.setItem('purchasedPlan', parts[1]);
                        localStorage.setItem('userDob', parts[2]);
                        localStorage.setItem('userName', parts[3]);
                        localStorage.setItem('idolName', parts[4] || '');
                        setActiveTab('saju');
                      } else {
                        const parts = item.cacheKey.split('_');
                        localStorage.setItem('userDob', parts[2]);
                        setActiveTab('beauty');
                      }
                      localStorage.setItem('hasPaid', 'true');
                      setHasPaid(true);
                    }}
                    className="w-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 rounded-xl p-3 flex items-center justify-between transition-colors text-left"
                  >
                    <div>
                      <div className="font-bold text-zinc-200 text-sm">{item.type === 'saju' && item.plan === 'compatibility' ? \`\${item.name} ❤️ \${item.idolName}\` : item.name}</div>
                      <div className="text-xs text-zinc-500 capitalize">{item.type === 'saju' ? (item.plan === 'compatibility' ? 'Cosmic Chemistry' : 'Saju Masterplan') : 'K-Beauty'}</div>
                    </div>
                    <div className="text-xs text-zinc-500">{item.date}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
`;

c = c.replace(tabSwitcherStr, `${recentHistoryUI}\n          {/* Custom Tab Switcher */}`);

fs.writeFileSync('src/app/page.js', c);
