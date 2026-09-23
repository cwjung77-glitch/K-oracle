const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8').replace(/\r\n/g, '\n');

const helperVars = `
  const selectedGroup = selectedIdol?.name ? (selectedIdol.name.match(/\\((.*?)\\)/)?.[1] || '') : '';
  const selectedIdolName = selectedIdol?.name ? selectedIdol.name.split(' (')[0] : '';
  const groupColors = getGroupColors(selectedGroup);
  
  return (
`;
content = content.replace('  return (\n', helperVars);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf8');
console.log("Variables injected!");
