const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');

c = c.replace(/const isEs = lang === 'es';/g, "const isEs = lang === 'es';\n    const isKo = lang === 'ko';");

// Replace Header 1
c = c.replace(/isEs \? '1. Matriz de tu Alma' : '1. The Soul Matrix'/g, "isKo ? '1. 영혼의 매트릭스' : isEs ? '1. Matriz de tu Alma' : '1. The Soul Matrix'");
c = c.replace(/isEs \? 'El nucleo de tu identidad cosmica' : 'The core of your cosmic identity'/g, "isKo ? '우주적 정체성의 핵심' : isEs ? 'El nucleo de tu identidad cosmica' : 'The core of your cosmic identity'");

// Replace Header 2 (Karma)
c = c.replace(/isEs \? '2. Analisis de Vidas Pasadas' : '2. Past Life Analysis'/g, "isKo ? '2. 전생 분석' : isEs ? '2. Analisis de Vidas Pasadas' : '2. Past Life Analysis'");
c = c.replace(/isEs \? 'Karma y Deudas' : 'Karma and Debts'/g, "isKo ? '카르마와 업보' : isEs ? 'Karma y Deudas' : 'Karma and Debts'");

// Replace Header 3 (Radar)
c = c.replace(/isEs \? '3. Balance de los 5 Elementos' : '3. The 5 Elements Balance'/g, "isKo ? '3. 오행 밸런스' : isEs ? '3. Balance de los 5 Elementos' : '3. The 5 Elements Balance'");
c = c.replace(/isEs \? 'La alquimia de tu energia' : 'The alchemy of your energy'/g, "isKo ? '에너지의 연금술' : isEs ? 'La alquimia de tu energia' : 'The alchemy of your energy'");

// Replace Header 4 (Spline)
c = c.replace(/isEs \? '4. Flujo de Energia 2027' : '4. 2027 Energy Flow'/g, "isKo ? '4. 2027년 에너지 흐름' : isEs ? '4. Flujo de Energia 2027' : '4. 2027 Energy Flow'");
c = c.replace(/isEs \? 'Biorritmo Cosmico de 12 Meses' : '12-Month Cosmic Biorhythm'/g, "isKo ? '12개월 우주 바이오리듬' : isEs ? 'Biorritmo Cosmico de 12 Meses' : '12-Month Cosmic Biorhythm'");

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
