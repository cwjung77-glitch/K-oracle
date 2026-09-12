const fs = require('fs');

const path = 'src/components/features/SajuCompatibility.jsx';
let c = fs.readFileSync(path, 'utf8');

// 1. Add gender state and storage init
c = c.replace(
  /const \[dob, setDob\] = useState\(''\);\n\s*useEffect\(\(\) => \{\n\s*if\s*\(typeof window !== "undefined"\)\s*\{\n\s*const saved = localStorage\.getItem\("userDob"\);\n\s*if \(saved\) setDob\(saved\);\n\s*\}\n\s*\}, \[\]\);/s,
  `const [dob, setDob] = useState('');
  const [gender, setGender] = useState('female');
  useEffect(() => {
    if(typeof window !== "undefined") {
      const savedDob = localStorage.getItem("userDob");
      const savedGender = localStorage.getItem("userGender");
      if (savedDob) setDob(savedDob);
      if (savedGender) setGender(savedGender);
    }
  }, []);`
);

// 2. Add auto-save for gender
c = c.replace(
  /useEffect\(\(\) => \{\n\s*if \(dob\) \{\n\s*localStorage\.setItem\('userDob', dob\);\n\s*\}\n\s*\}, \[dob\]\);/s,
  `useEffect(() => {
    if (dob) localStorage.setItem('userDob', dob);
    if (gender) localStorage.setItem('userGender', gender);
  }, [dob, gender]);`
);

// 3. Add gender select to UI and update grid columns
c = c.replace(
  /<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">/,
  '<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">'
);
c = c.replace(
  /<input type="time" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" defaultValue="12:00" \/>/,
  `<input type="time" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" defaultValue="12:00" />
                  <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 appearance-none cursor-pointer"
                  >
                    <option value="female">♀ Female (여성)</option>
                    <option value="male">♂ Male (남성)</option>
                  </select>`
);

// 4. Update handleAnalyze to save gender
c = c.replace(
  /setLoading\(true\); localStorage\.setItem\('userDob', dob\);/,
  `setLoading(true); localStorage.setItem('userDob', dob); localStorage.setItem('userGender', gender);`
);

fs.writeFileSync(path, c);
