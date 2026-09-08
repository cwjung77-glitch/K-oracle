const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');

const parseAndRender = `
        const renderParsedText = (textStr) => {
          const lines = textStr.split('\\n');
          lines.forEach(line => {
            const match = line.match(/^\\[CATEGORY:\s*(.*?)\\]/i);
            if (match) {
              doc.moveDown(1);
              doc.font(fontSerifBold).fillColor(primaryColor).fontSize(16).text(match[1], { align: 'left' });
              doc.moveDown(0.5);
            } else if (line.trim().length > 0) {
              doc.font(fontSerif).fillColor(textColor).fontSize(14).text(line, { lineGap: 10, align: 'justify' });
            }
          });
        };
`;

const replace1 = `
        addHeader(isKo ? '1. 영혼의 매트릭스' : isEs ? '1. Matriz de tu Alma' : '1. The Soul Matrix', isEs ? 'El nucleo de tu identidad cosmica' : 'The core of your cosmic identity');
        renderParsedText(data.content || (isEs ? 'Tu energia se alinea con la fuerza del Fuego. Iluminas la oscuridad pero debes tener cuidado de no quemarte.' : 'Your energy aligns with the force of Fire. You illuminate the darkness but must be careful not to burn out.'));
`;

const replace2 = `
          addHeader(isKo ? '2. 전생 분석' : isEs ? '2. Analisis de Vidas Pasadas' : '2. Past Life Analysis', isKo ? '카르마와 업보' : isEs ? 'Karma y Deudas' : 'Karma and Debts');
          renderParsedText(data.karma || (isEs ? 'Tu karma esta limpio.' : 'Your karma is clear.'));
`;

// Inject parseAndRender just before Page 2
c = c.replace("// ---------------- PAGE 2: SOUL BLUEPRINT ----------------", parseAndRender + "\n        // ---------------- PAGE 2: SOUL BLUEPRINT ----------------");
c = c.replace(/addHeader\(isKo \? '1.*?\n.*?\);/, replace1.trim());
c = c.replace(/addHeader\(isKo \? '2.*?\n.*?\);/, replace2.trim());

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
