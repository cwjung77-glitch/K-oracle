const fs = require('fs');
let c = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

c = c.replace(
  /<input \n\s*type="date" \n\s*value=\{dob\}\n\s*onChange=\{\(e\) => setDob\(e\.target\.value\)\}\n\s*className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" \n\s*\/>/g,
  '<input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />'
);

c = c.replace(
  /<input type="time" value=\{time\} onChange=\{\(e\) => setTime\(e\.target\.value\)\} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" \/>/g,
  '<input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500" />'
);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', c);
