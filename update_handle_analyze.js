const fs = require('fs');
let c = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8').replace(/\r\n/g, '\n');

c = c.replace(
  /const handleAnalyze = \(\) => \{\n\s*if \(\!dob\) \{\n\s*alert\(\"Please enter your birth date first!\"\);\n\s*return;\n\s*\}/,
  `const handleAnalyze = () => {
    if (!dob) {
      alert("Please enter your birth date first!");
      return;
    }
    
    let targetPerson = selectedIdol;
    if (matchType === 'custom') {
      if (!customName || !customDob) {
        alert("Please enter your partner's name and birth date!");
        return;
      }
      targetPerson = { name: customName, dob: customDob };
      setSelectedIdol(targetPerson);
    }`
);

c = c.replace(
  /for \(let i = 0; i < selectedIdol\.name\.length; i\+\+\) idolHash = selectedIdol\.name\.charCodeAt\(i\) \+ \(\(idolHash << 5\) - idolHash\);/,
  `for (let i = 0; i < targetPerson.name.length; i++) idolHash = targetPerson.name.charCodeAt(i) + ((idolHash << 5) - idolHash);`
);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', c);
