const fs = require('fs');
let c = fs.readFileSync('src/components/features/BeautyDeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

const saveHistoryLogic = `
          // Save to kOracleHistory
          try {
            const historyStr = localStorage.getItem('kOracleHistory') || '[]';
            let history = JSON.parse(historyStr);
            const newEntry = {
              type: 'beauty',
              lang,
              name: 'Beauty Masterplan',
              date: new Date().toISOString().split('T')[0],
              cacheKey: \`beauty_\${lang}_\${localStorage.getItem("userDob")}\`
            };
            history = history.filter(h => h.cacheKey !== newEntry.cacheKey);
            history.unshift(newEntry);
            if (history.length > 5) history = history.slice(0, 5);
            localStorage.setItem('kOracleHistory', JSON.stringify(history));
          } catch(e) { console.error(e) }
`;

c = c.replace(
  /localStorage\.setItem\(\`beauty_\$\{lang\}_\$\{localStorage\.getItem\("userDob"\)\}\`, JSON\.stringify\(json\.data\)\);/g,
  `localStorage.setItem(\`beauty_\${lang}_\${localStorage.getItem("userDob")}\`, JSON.stringify(json.data));${saveHistoryLogic}`
);

fs.writeFileSync('src/components/features/BeautyDeepDiveReport.jsx', c);
