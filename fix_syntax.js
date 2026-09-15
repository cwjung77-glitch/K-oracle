const fs = require('fs');
let lines = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8').split('\n');
lines = lines.map(line => {
  if (line.includes("userElement === 'Fire'")) {
    const prefix = line.split("{userElement ===")[0];
    return prefix + "{userElement === 'Fire' ? '火' : userElement === 'Water' ? '水' : userElement === 'Wood' ? '木' : userElement === 'Metal' ? '金' : '土'}";
  }
  return line;
});
fs.writeFileSync('src/components/features/SajuCompatibility.jsx', lines.join('\n'), 'utf8');
console.log('Fixed successfully');
