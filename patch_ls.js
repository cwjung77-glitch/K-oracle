const fs = require('fs');

let c = fs.readFileSync('src/app/page.js', 'utf8');

const regex = /\{\/\* Language Toggle \*\/\}[\s\S]*?<\/select>\s*<\/div>/;
const rep = `{/* Language Toggle */}
              <LanguageSwitcher lang={lang} setLang={setLang} showKo={showKo} />`;

c = c.replace(regex, rep);

if (!c.includes('import LanguageSwitcher')) {
  c = c.replace('import React', "import LanguageSwitcher from '../components/ui/LanguageSwitcher';\nimport React");
}

fs.writeFileSync('src/app/page.js', c);
console.log('Patched page.js with LanguageSwitcher!');
