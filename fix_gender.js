const fs = require('fs');
let c = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

c = c.replace(/const \[dob, setDob\] = useState\(''\); useEffect\(\(\) => \{ if\(typeof window !== "undefined"\) \{ const saved = localStorage\.getItem\("userDob"\); if \(saved\) setDob\(saved\); \} \}, \[\]\);/, 'const [dob, setDob] = useState(\'\'); const [gender, setGender] = useState(\'female\'); useEffect(() => { if(typeof window !== "undefined") { const savedDob = localStorage.getItem("userDob"); const savedGender = localStorage.getItem("userGender"); if (savedDob) setDob(savedDob); if (savedGender) setGender(savedGender); } }, []);');

c = c.replace(/if \(dob\) \{\n\s*localStorage\.setItem\('userDob', dob\);\n\s*\}/, 'if (dob) localStorage.setItem(\'userDob\', dob);\n    if (gender) localStorage.setItem(\'userGender\', gender);');

c = c.replace(/<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">/, '<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">');

c = c.replace(/<input type="time" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" defaultValue="12:00" \/>/, '<input type="time" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" defaultValue="12:00" />\n                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 appearance-none">\n                    <option value="female">Female (여성)</option>\n                    <option value="male">Male (남성)</option>\n                  </select>');

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', c);
