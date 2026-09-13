const fs = require('fs');
let c = fs.readFileSync('src/components/features/BeautyDeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

// Find the start of fetchReport
const startRegex = /const fetchReport = async \(\) => \{\n\s*setIsGenerating\(true\);/g;
const cachedStart = `const fetchReport = async () => {
      setIsGenerating(true);
      const cacheKey = \`beauty_\${lang}_\${localStorage.getItem("userDob")}\`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const data = JSON.parse(cached);
          setErrorMsg("");
          setReportData(data);
          setIsGenerating(false);
          return;
        } catch(e) { }
      }`;
      
c = c.replace(startRegex, cachedStart);

// Cache the response when successful
c = c.replace(/setReportData\(json\.data\);\n\s*setPdfUrl\(json\.pdfUrl\);/, `setReportData(json.data); localStorage.setItem(\`beauty_\${lang}_\${localStorage.getItem("userDob")}\`, JSON.stringify(json.data));\n              setPdfUrl(json.pdfUrl);`);

fs.writeFileSync('src/components/features/BeautyDeepDiveReport.jsx', c);
