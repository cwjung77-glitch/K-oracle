const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8');
c = c.replace(/<\/button>\{showKo && <button onClick=\{\(\) => setLang\('ko'\)\} className=\{px-3 py-1 text-xs font-bold rounded-full transition-all \\\}>KO<\/button>\}/, 
  `</button>{showKo && <button onClick={() => setLang('ko')} className={\`px-3 py-1 text-xs font-bold rounded-full transition-all \${lang === 'ko' ? 'bg-yellow-500 text-black' : 'text-zinc-500 hover:text-white'}\`}>KO</button>}`);
fs.writeFileSync('src/app/page.js', c);
