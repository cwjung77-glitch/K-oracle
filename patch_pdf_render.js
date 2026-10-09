const fs = require('fs');
const path = require('path');

const pdfRoute = path.join(__dirname, 'src/app/api/download-pdf/route.js');
let content = fs.readFileSync(pdfRoute, 'utf8');

// The replacement logic for download-pdf/route.js beauty block
const beautyRenderLogic = `
        const renderBeautyParsedText = (textStr) => {
          const lines = (textStr || "").split('\\n');
          lines.forEach(line => {
            // Check for MOOD_SCORES
            const moodMatch = line.match(/\\[MOOD_SCORES:\\s*(.*?)\\]/i);
            if (moodMatch) {
              const scores = moodMatch[1].split(',').map(s => parseInt(s.trim()));
              if (scores.length === 5) {
                // Draw Radar Chart
                doc.moveDown(2);
                const cx = doc.page.width / 2;
                const cy = doc.y + 120;
                const r = 100;
                
                // Draw background pentagons
                for (let step = 1; step <= 5; step++) {
                  const stepR = (r / 5) * step;
                  doc.moveTo(cx, cy - stepR);
                  for (let i = 1; i <= 5; i++) {
                    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                    doc.lineTo(cx + Math.cos(angle) * stepR, cy + Math.sin(angle) * stepR);
                  }
                  doc.lineWidth(0.5).strokeColor('#333333').stroke();
                }
                
                // Draw Axes & Labels
                const labels = isEs ? ['Lovely', 'Chic', 'Elegante', 'Natural', 'Glam'] : ['Lovely', 'Chic', 'Elegant', 'Natural', 'Glamorous'];
                for (let i = 0; i < 5; i++) {
                  const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                  doc.moveTo(cx, cy).lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r).lineWidth(0.5).strokeColor('#444').stroke();
                  const lx = cx + Math.cos(angle) * (r + 20);
                  const ly = cy + Math.sin(angle) * (r + 20);
                  doc.font(fontSansBold).fillColor(textColor).fontSize(10).text(labels[i], lx - 30, ly - 5, { align: 'center', width: 60 });
                }
                
                // Draw Value Polygon
                doc.moveTo(cx, cy - (scores[0] / 100) * r);
                for (let i = 1; i < 5; i++) {
                  const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                  doc.lineTo(cx + Math.cos(angle) * (scores[i] / 100) * r, cy + Math.sin(angle) * (scores[i] / 100) * r);
                }
                doc.closePath().lineWidth(2).strokeColor(beautyColor).fillColor(beautyColor).fillOpacity(0.4).fillAndStroke();
                doc.fillOpacity(1); 
                doc.y = cy + 140;
              }
              return; // Skip drawing this line as text
            }
            
            const catMatch = line.match(/^\\[CATEGORY:\\s*(.*?)\\]/i);
            if (catMatch) {
              // Add a new page if it's a major section, except for the first one which goes on page 2
              if (catMatch[1].includes('Color Palette') || catMatch[1].includes('Makeup Blueprint')) {
                addNewPage();
                addBeautyHeader(catMatch[1], isEs ? 'Guia Personalizada' : 'Custom Guide');
              } else {
                doc.moveDown(1);
                doc.font(fontSerifBold).fillColor(beautyColor).fontSize(16).text(catMatch[1], { align: 'left' });
                doc.moveDown(0.5);
              }
            } else if (line.trim().length > 0) {
              // Check for color HEX codes
              const hexMatch = line.match(/(.*?)\\[HEX:\\s*(#[0-9A-Fa-f]{6})\\](.*)/);
              if (hexMatch) {
                // Draw text before hex
                const before = hexMatch[1];
                const hex = hexMatch[2];
                const after = hexMatch[3];
                
                doc.font(fontSerif).fillColor(textColor).fontSize(14).text(before, { continued: true });
                // Draw a small circle or square for the color
                const curX = doc.x;
                const curY = doc.y;
                doc.text("     ", { continued: true }); // Space for the square
                doc.rect(curX + 5, curY + 2, 12, 12).fillAndStroke(hex, '#FFF');
                doc.fillColor(textColor).text(after);
              } else {
                doc.font(fontSerif).fillColor(textColor).fontSize(14).text(line, { lineGap: 10, align: 'left' });
              }
            }
          });
        };
`;

// Replace the existing renderBeautyParsedText with our new logic
content = content.replace(/const renderBeautyParsedText = \([\s\S]*?\};\n/m, beautyRenderLogic);

fs.writeFileSync(pdfRoute, content, 'utf8');
console.log('Patched download-pdf/route.js');
