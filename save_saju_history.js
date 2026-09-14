const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

const saveHistoryLogic = `
          // Save to kOracleHistory
          try {
            const historyStr = localStorage.getItem('kOracleHistory') || '[]';
            let history = JSON.parse(historyStr);
            const newEntry = {
              type: 'saju',
              plan,
              name: localStorage.getItem('userName') || 'The Client',
              idolName: localStorage.getItem('idolName'),
              date: new Date().toISOString().split('T')[0],
              cacheKey: \`saju_\${plan}_\${localStorage.getItem("userDob")}_\${localStorage.getItem("userName")}_\${localStorage.getItem("idolName")}\`
            };
            // Remove exact duplicates
            history = history.filter(h => h.cacheKey !== newEntry.cacheKey);
            history.unshift(newEntry);
            if (history.length > 5) history = history.slice(0, 5); // Keep last 5
            localStorage.setItem('kOracleHistory', JSON.stringify(history));
          } catch(e) { console.error(e) }
`;

// Insert it right after caching the data
c = c.replace(
  /localStorage\.setItem\(\`saju_\$\{plan\}_\$\{localStorage\.getItem\("userDob"\)\}_\$\{localStorage\.getItem\("userName"\)\}_\$\{localStorage\.getItem\("idolName"\)\}\`, JSON\.stringify\(data\)\);/g,
  `localStorage.setItem(\`saju_\${plan}_\${localStorage.getItem("userDob")}_\${localStorage.getItem("userName")}_\${localStorage.getItem("idolName")}\`, JSON.stringify(data));${saveHistoryLogic}`
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
