const fs = require('fs');
let c = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8').replace(/\r\n/g, '\n');

// 1. Add userName state
if (!c.includes('const [userName, setUserName]')) {
  c = c.replace(
    /const \[dob, setDob\] = useState\(''\);/,
    `const [userName, setUserName] = useState('');\n  const [dob, setDob] = useState('');`
  );
  
  // 2. Load and save userName in useEffect
  c = c.replace(
    /const savedDob = localStorage\.getItem\('userDob'\);/,
    `const savedName = localStorage.getItem('userName');\n      const savedDob = localStorage.getItem('userDob');`
  );
  c = c.replace(
    /if \(savedDob\) setDob\(savedDob\);/,
    `if (savedName) setUserName(savedName);\n      if (savedDob) setDob(savedDob);`
  );
  c = c.replace(
    /localStorage\.setItem\('userDob', dob\);/,
    `localStorage.setItem('userDob', dob);\n      if (userName) localStorage.setItem('userName', userName);`
  );
  c = c.replace(
    /\[dob\]\);/,
    `[dob, userName]);`
  );
  
  // 3. Save userName in handleAnalyze
  c = c.replace(
    /localStorage\.setItem\('userDob', dob\); localStorage\.setItem\('userTime', time\); localStorage\.setItem\('userGender', gender\);/,
    `localStorage.setItem('userDob', dob); localStorage.setItem('userTime', time); localStorage.setItem('userGender', gender); localStorage.setItem('userName', userName || "You");`
  );
  
  // 4. Render userName input
  c = c.replace(
    /<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">\n\s*<input type="date"/,
    `<input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Your Name" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 mb-4" />\n              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">\n                <input type="date"`
  );
  
  // 5. Update UI to show userName
  c = c.replace(
    /<span className="text-xl font-bold">You<\/span>/g,
    `<span className="text-xl font-bold">{userName || 'You'}</span>`
  );
  c = c.replace(
    /ME ❤️ \{selectedIdol\.name\}/g,
    `{userName ? userName.toUpperCase() : 'ME'} ❤️ {selectedIdol.name}`
  );
  
  fs.writeFileSync('src/components/features/SajuCompatibility.jsx', c);
}
