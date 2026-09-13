const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

// Add caching logic to fetchReport
if (!c.includes('const cacheKey = `saju_${plan}_${localStorage.getItem("userDob")}_${localStorage.getItem("userName")}_${localStorage.getItem("idolName")}`;')) {
  const fetchReportStart = `const fetchReport = async () => {\n        setIsGenerating(true);\n        setError(false);`;
  const fetchReportCached = `const fetchReport = async () => {
        setIsGenerating(true);
        setError(false);
        const cacheKey = \`saju_\${plan}_\${localStorage.getItem("userDob")}_\${localStorage.getItem("userName")}_\${localStorage.getItem("idolName")}\`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          try {
            const data = JSON.parse(cached);
            setAiReport(data.reportText); 
            localStorage.setItem("aiKarma", data.karmaText); 
            setReportData(data);
            setPdfUrl(data.pdfUrl);
            setIsGenerating(false);
            return;
          } catch(e) { /* ignore parse error */ }
        }`;
        
  c = c.replace(fetchReportStart, fetchReportCached);
  
  // Cache the response when successful
  const successBlock = `setError(false); setAiReport(data.reportText); localStorage.setItem("aiKarma", data.karmaText); setReportData(data);`;
  const successCached = `setError(false); setAiReport(data.reportText); localStorage.setItem("aiKarma", data.karmaText); setReportData(data); localStorage.setItem(cacheKey, JSON.stringify(data));`;
  c = c.replace(successBlock, successCached);
  
  fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
}
