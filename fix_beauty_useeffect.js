const fs = require('fs');
let c = fs.readFileSync('src/components/features/BeautyDeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

// Replace the start of useEffect
c = c.replace(
  /useEffect\(\(\) => \{\n\s*const fetchReport = async \(\) => \{/,
  `const fetchReport = async () => {`
);

// Replace the end of useEffect
c = c.replace(
  /\s*\};\n\s*fetchReport\(\);\n\s*\}, \[lang\]\);/,
  `\n  };\n\n  useEffect(() => {\n    fetchReport();\n  }, [lang]);`
);

fs.writeFileSync('src/components/features/BeautyDeepDiveReport.jsx', c);
