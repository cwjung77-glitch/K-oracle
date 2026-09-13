const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Check isCompatibility
if (!c.includes('const isCompatibility = plan === "compatibility";')) {
  c = c.replace(
    /const displayYear = plan === 'compatibility' \? 'Cosmic Chemistry' : plan === 'fullyear' \? '2028' : plan === 'bundle' \? '2027-2028' : '2027';/,
    `const displayYear = plan === 'compatibility' ? 'Cosmic Chemistry' : plan === 'fullyear' ? '2028' : plan === 'bundle' ? '2027-2028' : '2027';\n    const isCompatibility = plan === "compatibility";`
  );
}

// 2. Cover Title
c = c.replace(
  /doc\.font\(fontSerifBold\)\.fillColor\(primaryColor\)\.fontSize\(54\)\.text\('K-ORACLE', 0, 280, \{ align: 'center', characterSpacing: 12 \}\);/,
  `doc.font(fontSerifBold).fillColor(primaryColor).fontSize(54).text(isCompatibility ? 'K-CHEMISTRY' : 'K-ORACLE', 0, 280, { align: 'center', characterSpacing: 12 });`
);
c = c.replace(
  /doc\.font\(fontSans\)\.fillColor\(textColor\)\.fontSize\(16\)\.text\(isEs \? 'DECODIFICA TU DESTINO Y AURA' : 'DECODE YOUR DESTINY & AURA', \{ align: 'center', characterSpacing: 4 \}\);/,
  `doc.font(fontSans).fillColor(textColor).fontSize(16).text(isCompatibility ? (isEs ? 'Sinergia Cosmica Decodificada' : 'COSMIC SYNERGY DECODED') : (isEs ? 'DECODIFICA TU DESTINO Y AURA' : 'DECODE YOUR DESTINY & AURA'), { align: 'center', characterSpacing: 4 });`
);

// 3. Page 2 Title
c = c.replace(
  /addHeader\(isKo \? '1\. 영혼의 매트릭스' : isEs \? '1\. Matriz de tu Alma' : '1\. The Soul Matrix', isEs \? 'El nucleo de tu identidad cosmica' : 'The core of your cosmic identity'\);/,
  `addHeader(isCompatibility ? (isKo ? '1. 관계 케미스트리' : '1. Relationship Chemistry') : (isKo ? '1. 영혼의 매트릭스' : isEs ? '1. Matriz de tu Alma' : '1. The Soul Matrix'), isCompatibility ? 'The spark and the conflict' : (isEs ? 'El nucleo de tu identidad cosmica' : 'The core of your cosmic identity'));`
);

// 4. Page 2.5 Title
c = c.replace(
  /addHeader\(isKo \? '2\. 전생 분석' : isEs \? '2\. Analisis de Vidas Pasadas' : '2\. Past Life Analysis', isKo \? '카르마와 업보' : isEs \? 'Karma y Deudas' : 'Karma and Debts'\);/,
  `addHeader(isCompatibility ? (isKo ? '2. 전생의 인연' : '2. Past Life Connection') : (isKo ? '2. 전생 분석' : isEs ? '2. Analisis de Vidas Pasadas' : '2. Past Life Analysis'), isKo ? '카르마와 업보' : isEs ? 'Karma y Deudas' : 'Karma and Debts');`
);

// 5. Hide Page 3 and 4
c = c.replace(
  /\/\/ ---------------- PAGE 3: 5 ELEMENTS RADAR CHART ----------------/,
  `if (!isCompatibility) {\n      // ---------------- PAGE 3: 5 ELEMENTS RADAR CHART ----------------`
);
c = c.replace(
  /doc\.x = 50; doc\.y = 520; doc\.font\(fontSerif\)\.fillColor\(textColor\)\.fontSize\(14\)\.text\(isEs \? 'Agosto a Septiembre marca tu temporada cumbre\. Preparate\.' : \`\\\$\{months\[scores\.indexOf\(Math\.max\(\.\.\.scores\)\)\]\} marks your absolute peak season\. Prepare for a major cosmic event\.\`, \{ align: 'center', width: doc\.page\.width - 100 \}\);/,
  `doc.x = 50; doc.y = 520; doc.font(fontSerif).fillColor(textColor).fontSize(14).text(isEs ? 'Agosto a Septiembre marca tu temporada cumbre. Preparate.' : \`\${months[scores.indexOf(Math.max(...scores))]} marks your absolute peak season. Prepare for a major cosmic event.\`, { align: 'center', width: doc.page.width - 100 });\n      }`
);

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
