const fs = require('fs');
let c = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8');

c = c.replace(
`    try {
      const res = await fetch('/api/generate-daily', {`,
`    try {
      const todayStr = getLocalDateStr();
      const res = await fetch('/api/generate-daily', {`
);

c = c.replace(
`          setResult(data.data);
          const todayStr = getLocalDateStr();
          localStorage.setItem('daily_date', todayStr);`,
`          setResult(data.data);
          localStorage.setItem('daily_date', todayStr);`
);

fs.writeFileSync('src/components/features/DailyFortune.jsx', c);
console.log('Fixed DailyFortune');