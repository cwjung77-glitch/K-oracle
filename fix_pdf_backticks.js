const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');

c = c.replace(/'Reporte Maestro \$\{displayYear\} \(Edicion VIP\)'/g, "`Reporte Maestro ${displayYear} (Edicion VIP)`");
c = c.replace(/'\$\{displayYear\} Master Report \(VIP Edition\)'/g, "`${displayYear} Master Report (VIP Edition)`");
c = c.replace(/'3\. Flujo de Energia \$\{displayYear\}'/g, "`3. Flujo de Energia ${displayYear}`");
c = c.replace(/'3\. \$\{displayYear\} Energy Flow'/g, "`3. ${displayYear} Energy Flow`");
c = c.replace(/'© \$\{new Date\(\)\.getFullYear\(\)\} K-ORACLE\. STRICTLY CONFIDENTIAL\.'/g, "`© ${new Date().getFullYear()} K-ORACLE. STRICTLY CONFIDENTIAL.`");

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
