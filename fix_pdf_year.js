const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');

if (!c.includes('const displayYear')) {
  c = c.replace(
    /const \{ type, data, lang \} = body;/,
    "const { type, data, lang, plan } = body;\n    const displayYear = plan === 'fullyear' ? '2028' : plan === 'bundle' ? '2027-2028' : '2027';"
  );
  
  c = c.replace(/2027 Master Report/g, "${displayYear} Master Report");
  c = c.replace(/Reporte Maestro 2027/g, "Reporte Maestro ${displayYear}");
  c = c.replace(/ 2027 K-ORACLE/g, "© ${new Date().getFullYear()} K-ORACLE");
  c = c.replace(/3\. Flujo de Energia 2027/g, "3. Flujo de Energia ${displayYear}");
  c = c.replace(/3\. 2027 Energy Flow/g, "3. ${displayYear} Energy Flow");
  
  fs.writeFileSync('src/app/api/download-pdf/route.js', c);
}
