const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8');

const effect = `useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('hasPaid') === 'true') {
      setHasPaid(true);
      setTimeout(() => {
        document.getElementById('premium-report')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);`;

c = c.replace(/const \[lang, setLang\].*?useState\(false\);/, (m) => m + '\n\n  ' + effect + '\n');

fs.writeFileSync('src/app/page.js', c);
