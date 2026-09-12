const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

c = c.replace(
  /const \[aiReport, setAiReport\] = useState\(""\);/g,
  `const [aiReport, setAiReport] = useState("");
  const [reportData, setReportData] = useState(null);`
);

c = c.replace(
  /setAiReport\(data\.reportText\); localStorage\.setItem\("aiKarma", data\.karmaText\);/g,
  `setAiReport(data.reportText); localStorage.setItem("aiKarma", data.karmaText); setReportData(data);`
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
