const fs = require('fs');
const path = require('path');

const routePath = path.join(__dirname, 'src/app/api/download-pdf/route.js');
let code = fs.readFileSync(routePath, 'utf8');

const parseLogic = `
        let rawContent = data.content || '';
        let archetype = '';
        let poeticHook = '';
        let elementsText = '';

        const archMatch = rawContent.match(/\\[ARCHETYPE:\\s*(.*?)\\]/i);
        if (archMatch) { archetype = archMatch[1]; rawContent = rawContent.replace(archMatch[0], ''); }
        
        const hookMatch = rawContent.match(/\\[POETIC_HOOK:\\s*(.*?)\\]/i);
        if (hookMatch) { poeticHook = hookMatch[1]; rawContent = rawContent.replace(hookMatch[0], ''); }
        
        const elMatch = rawContent.match(/\\[ELEMENTS:\\s*(.*?)\\]/i);
        if (elMatch) { elementsText = elMatch[1]; rawContent = rawContent.replace(elMatch[0], ''); }

        data.content = rawContent.trim();
`;

const renderLogic = `
        // ---------------- PAGE 1.5: THE COSMIC SNAPSHOT ----------------
        if (archetype && poeticHook) {
          addNewPage();
          // Draw dark luxury background
          doc.rect(0, 0, doc.page.width, doc.page.height).fill('#080808');
          // Draw subtle border
          doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).lineWidth(1).strokeColor('#2A2A2A').stroke();
          
          doc.moveDown(5);
          doc.font(fontSerifBold).fillColor('#EAB308').fontSize(32).text(archetype, { align: 'center' });
          doc.moveDown(2);
          
          doc.font(fontSerifItalic).fillColor('#D4D4D8').fontSize(15).text('"' + poeticHook + '"', 100, doc.y, { align: 'center', width: doc.page.width - 200, lineGap: 8 });
          
          if (elementsText) {
            doc.moveDown(4);
            doc.font(fontSansBold).fillColor('#A1A1AA').fontSize(11).text('THE ELEMENTAL BALANCE', { align: 'center', characterSpacing: 4 });
            doc.moveDown(2);
            
            // Parse elements like "Wood 20%, Fire 30%, Earth 20%, Metal 10%, Water 20%"
            const elRegex = /(Wood|Fire|Earth|Metal|Water)\\s*(\\d+)%/gi;
            let elMatch;
            const elColors = { 'Wood': '#22C55E', 'Fire': '#EF4444', 'Earth': '#EAB308', 'Metal': '#E4E4E7', 'Water': '#3B82F6' };
            const elYStart = doc.y;
            let currentY = elYStart;
            
            while ((elMatch = elRegex.exec(elementsText)) !== null) {
              const name = elMatch[1].charAt(0).toUpperCase() + elMatch[1].slice(1).toLowerCase();
              const pct = parseInt(elMatch[2], 10);
              const color = elColors[name] || '#FFFFFF';
              
              const barX = 200;
              const barW = doc.page.width - 400; // 200 width
              const barH = 4;
              
              // Text label
              doc.font(fontSerif).fillColor('#A1A1AA').fontSize(10).text(name, barX - 60, currentY - 3, { width: 45, align: 'right' });
              
              // Background bar
              doc.rect(barX, currentY, barW, barH).fill('#222222');
              // Fill bar
              doc.rect(barX, currentY, barW * (pct / 100), barH).fill(color);
              
              // Percentage text
              doc.font(fontSans).fillColor('#E4E4E7').fontSize(10).text(pct + '%', barX + barW + 15, currentY - 3);
              
              currentY += 28;
            }
          }
          doc.fillColor(textColor); // Reset
        }
`;

if (code.includes('// ---------------- PAGE 2: SOUL BLUEPRINT ----------------') && !code.includes('PAGE 1.5')) {
  code = code.replace(
    '// ---------------- PAGE 2: SOUL BLUEPRINT ----------------',
    parseLogic + '\n' + renderLogic + '\n        // ---------------- PAGE 2: SOUL BLUEPRINT ----------------'
  );
  fs.writeFileSync(routePath, code, 'utf8');
  console.log('Successfully injected Page 1.5 logic.');
} else {
  console.log('Logic already injected or could not find anchor.');
}