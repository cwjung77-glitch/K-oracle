const fs = require('fs');

let pageCode = fs.readFileSync('src/app/page.js', 'utf8');

const targetLangToggle = `            {/* Language Toggle */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1 pl-2 sm:pl-3"><Globe size={14} className="text-zinc-500 mr-1" />
              <button 
                onClick={() => setLang('en')}
                className={\`px-3 py-1 text-xs font-bold rounded-full transition-all \${lang === 'en' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}\`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('es')}
                className={\`px-3 py-1 text-xs font-bold rounded-full transition-all \${lang === 'es' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}\`}
              >
                ES
              </button>{showKo && <button onClick={() => setLang('ko')} className={\`px-3 py-1 text-xs font-bold rounded-full transition-all \${lang === 'ko' ? 'bg-zinc-100 text-black' : 'text-zinc-500 hover:text-white'}\`}>KO</button>}</div><button onClick={() => setShowLogin(true)}`;

const replaceLangToggle = `            {/* Language Toggle */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1 pl-2 sm:pl-3 relative group">
              <Globe size={14} className="text-zinc-500 mr-1" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                className="appearance-none bg-transparent text-xs font-bold text-white uppercase tracking-wider outline-none cursor-pointer pr-4 hover:text-zinc-300"
              >
                <option value="en" className="bg-zinc-900 text-white">EN</option>
                <option value="es" className="bg-zinc-900 text-white">ES</option>
                <option value="th" className="bg-zinc-900 text-white">TH</option>
                <option value="id" className="bg-zinc-900 text-white">ID</option>
                <option value="ja" className="bg-zinc-900 text-white">JA</option>
                <option value="de" className="bg-zinc-900 text-white">DE</option>
                <option value="it" className="bg-zinc-900 text-white">IT</option>
                <option value="pt" className="bg-zinc-900 text-white">PT</option>
                <option value="pl" className="bg-zinc-900 text-white">PL</option>
                <option value="ru" className="bg-zinc-900 text-white">RU</option>
                <option value="vi" className="bg-zinc-900 text-white">VI</option>
                <option value="fr" className="bg-zinc-900 text-white">FR</option>
                {showKo && <option value="ko" className="bg-zinc-900 text-white">KO</option>}
              </select>
            </div><button onClick={() => setShowLogin(true)}`;

if (pageCode.includes('onClick={() => setLang(\'en\')}')) {
  pageCode = pageCode.replace(targetLangToggle, replaceLangToggle);
  fs.writeFileSync('src/app/page.js', pageCode);
  console.log("Language dropdown replaced in page.js!");
} else {
  console.log("Target not found!");
}
