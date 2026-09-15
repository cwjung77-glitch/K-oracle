const fs = require('fs');

['SajuCompatibility.jsx', 'PersonalColor.jsx'].forEach(file => {
  const p = 'src/components/features/' + file;
  let code = fs.readFileSync(p, 'utf8');
  
  // Replace all short timeouts for revokeObjectURL
  code = code.replace(/setTimeout\(\(\) => \{[\s\S]*?URL\.revokeObjectURL\(url\);[\s\S]*?\}, \d+\);/g, "setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 10000);");
  
  // Just in case it's the one-liner
  code = code.replace(/setTimeout\(\(\) => URL\.revokeObjectURL\(url\), \d+\);/g, "setTimeout(() => { try { document.body.removeChild(a); } catch(e){} URL.revokeObjectURL(url); }, 10000);");
  
  fs.writeFileSync(p, code, 'utf8');
  console.log('Fixed timeout in ' + file);
});
