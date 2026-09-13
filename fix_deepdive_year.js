const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

if (!c.includes("const displayYear =")) {
  c = c.replace(
    /const \[pdfUrl, setPdfUrl\] = useState\(\"\"\);/,
    `const [pdfUrl, setPdfUrl] = useState("");
  const plan = typeof window !== 'undefined' ? localStorage.getItem("purchasedPlan") || "bundle" : "bundle";
  const displayYear = plan === 'fullyear' ? '2028' : plan === 'bundle' ? '2027-2028' : '2027';`
  );
}

c = c.replace(
  /The Grand Narrative of 2027/g,
  `The Grand Narrative of {displayYear}`
);

c = c.replace(
  /2027 Energy Flow \(Heatmap\)/g,
  `{displayYear} Energy Flow (Heatmap)`
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
