const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');

const karmaPage = `
        // ---------------- PAGE 2.5: PAST LIFE KARMA ----------------
        addNewPage();
        addHeader(isEs ? '2. Analisis de Vidas Pasadas' : '2. Past Life Analysis', isEs ? 'Karma y Deudas' : 'Karma and Debts');
        doc.font(fontSerif).fillColor(textColor).fontSize(14).text(data.karma || (isEs ? 'Tu karma esta limpio.' : 'Your karma is clear.'), { lineGap: 10, align: 'justify' });

`;

c = c.replace("// ---------------- PAGE 3: 5 ELEMENTS RADAR CHART ----------------", karmaPage + "        // ---------------- PAGE 3: 5 ELEMENTS RADAR CHART ----------------");
c = c.replace("'2. Balance de los 5 Elementos' : '2. The 5 Elements Balance'", "'3. Balance de los 5 Elementos' : '3. The 5 Elements Balance'");
c = c.replace("'3. Flujo de Energia 2027' : '3. 2027 Energy Flow'", "'4. Flujo de Energia 2027' : '4. 2027 Energy Flow'");

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
