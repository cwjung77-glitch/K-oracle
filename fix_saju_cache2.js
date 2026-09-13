const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

// Find the start of fetchReport
const startRegex = /const fetchReport = async \(\) => \{\n\s*setIsGenerating\(true\);/g;
const cachedStart = `const fetchReport = async () => {
      setIsGenerating(true);
      const cacheKey = \`saju_\${plan}_\${localStorage.getItem("userDob")}_\${localStorage.getItem("userName")}_\${localStorage.getItem("idolName")}\`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const data = JSON.parse(cached);
          setError(false);
          setAiReport(data.reportText); 
          localStorage.setItem("aiKarma", data.karmaText); 
          setReportData(data);
          setIsGenerating(false);
          return;
        } catch(e) { }
      }`;
      
c = c.replace(startRegex, cachedStart);

// For the success block, wait! I already replaced it with `localStorage.setItem(cacheKey, JSON.stringify(data));` but `cacheKey` was not defined because the top block failed to inject!
c = c.replace(/setReportData\(data\); localStorage\.setItem\(cacheKey, JSON\.stringify\(data\)\);/, `setReportData(data); localStorage.setItem(\`saju_\${plan}_\${localStorage.getItem("userDob")}_\${localStorage.getItem("userName")}_\${localStorage.getItem("idolName")}\`, JSON.stringify(data));`);

// Also fix the first successBlock if it didn't get replaced
c = c.replace(/setError\(false\); setAiReport\(data\.reportText\); localStorage\.setItem\("aiKarma", data\.karmaText\); setReportData\(data\);(?! localStorage)/, `setError(false); setAiReport(data.reportText); localStorage.setItem("aiKarma", data.karmaText); setReportData(data); localStorage.setItem(\`saju_\${plan}_\${localStorage.getItem("userDob")}_\${localStorage.getItem("userName")}_\${localStorage.getItem("idolName")}\`, JSON.stringify(data));`);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
