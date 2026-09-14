const fs = require('fs');

let pc = fs.readFileSync('src/components/features/PersonalColor.jsx', 'utf8');
pc = pc.replace(
  'const seasonData = colors.find(c => c.season === targetSeason) || colors[0];',
  'const seasonData = colors.find(c => c.season === targetSeason) || colors[0];\n        if (typeof window !== \'undefined\') localStorage.setItem(\'userPersonalColor\', targetSeason);'
);
fs.writeFileSync('src/components/features/PersonalColor.jsx', pc);

let bdd = fs.readFileSync('src/components/features/BeautyDeepDiveReport.jsx', 'utf8');
bdd = bdd.replace(
  'body: JSON.stringify({ tone: "Winter Cool", lang })',
  'body: JSON.stringify({ tone: (typeof window !== "undefined" ? localStorage.getItem("userPersonalColor") : null) || "Winter Cool", lang })'
);
fs.writeFileSync('src/components/features/BeautyDeepDiveReport.jsx', bdd);
console.log('Done!');
