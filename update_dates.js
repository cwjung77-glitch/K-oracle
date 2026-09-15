const fs = require('fs');
['bts-rm-saju-four-pillars-destiny-analysis.md', 'bts-jin-saju-destiny-analysis.md'].forEach(file => {
  const p = 'src/content/blog/' + file;
  let code = fs.readFileSync(p, 'utf8');
  code = code.replace(/date: ".*"/, 'date: "2026-09-14"');
  fs.writeFileSync(p, code, 'utf8');
  console.log('Updated date in ' + file);
});
