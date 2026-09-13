const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8').replace(/\r\n/g, '\n');

if (!c.includes("const displayYear =")) {
  c = c.replace(
    /const \{ type, lang, data \} = await req\.json\(\);/,
    `const { type, lang, data, plan } = await req.json();\n    const displayYear = plan === 'compatibility' ? 'Chemistry' : plan === 'fullyear' ? '2028' : plan === 'bundle' ? '2027-2028' : '2027';`
  );
  fs.writeFileSync('src/app/api/download-pdf/route.js', c);
}
