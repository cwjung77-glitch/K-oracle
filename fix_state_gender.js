const fs = require('fs');
let c = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

c = c.replace(
  /const \[dob, setDob\] = useState\(''\); useEffect\(\(\) => \{ if\(typeof window !== "undefined"\) \{ const saved = localStorage\.getItem\("userDob"\); if \(saved\) setDob\(saved\); \} \}, \[\]\);/g,
  `const [dob, setDob] = useState('');
  const [gender, setGender] = useState('female');
  useEffect(() => {
    if(typeof window !== 'undefined') {
      const savedDob = localStorage.getItem('userDob');
      const savedGender = localStorage.getItem('userGender');
      if (savedDob) setDob(savedDob);
      if (savedGender) setGender(savedGender);
    }
  }, []);`
);

// Add select box properly. Let's make sure it replaces the input line correctly
c = c.replace(
  /<input type="time" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" defaultValue="12:00" \/>/g,
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

c = c.replace(
  /setLoading\(true\); localStorage\.setItem\('userDob', dob\); localStorage\.setItem\('userGender', 'female'\);/g,
  `setLoading(true); localStorage.setItem('userDob', dob); localStorage.setItem('userGender', gender);`
);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', c);
