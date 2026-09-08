const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

c = c.replace(/export default function DeepDiveReport\({ lang = "en" }\) {/, 'export default function DeepDiveReport({ lang = "en" }) {\n  const isKo = lang === "ko";');

// Remove the local isKo from the Heatmap IIFE
c = c.replace(/const isKo = lang === 'ko';\s*const months = isKo \?/g, 'const months = isKo ?');

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
