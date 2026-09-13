const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8');

c = c.replace(
  /useEffect\(\(\) => \{\n\s*if \(typeof window !== 'undefined' && localStorage\.getItem\('hasPaid'\) === 'true'\) \{\n\s*setHasPaid\(true\);\n\s*setTimeout\(\(\) => \{\n\s*document\.getElementById\('premium-report'\)\?\.scrollIntoView\(\{ behavior: 'smooth' \}\);\n\s*\}, 500\);\n\s*\}\n\s*\}, \[\]\);/g,
  `useEffect(() => {
    if (typeof window !== 'undefined') {
      const purchased = localStorage.getItem('purchasedProduct');
      if (purchased) {
        setActiveTab(purchased);
      }
      if (localStorage.getItem('hasPaid') === 'true') {
        setHasPaid(true);
        setTimeout(() => {
          document.getElementById('premium-report')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);`
);

fs.writeFileSync('src/app/page.js', c);
