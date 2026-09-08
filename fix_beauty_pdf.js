const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');

const beautyPdf = `
      } else if (type === 'beauty') {
        // Change primary color for Beauty
        const beautyColor = '#EC4899';
        
        // Helper for Headers (override with beauty color)
        const addBeautyHeader = (title, subtitle) => {
          doc.font(fontSerifBold).fillColor(beautyColor).fontSize(24).text(title, 50, 60, { align: 'left' });
          doc.font(fontSerifItalic).fillColor('#A1A1AA').fontSize(14).text(subtitle, 50, 90, { align: 'left' });
          doc.moveTo(50, 115).lineTo(doc.page.width - 50, 115).lineWidth(0.5).strokeColor('#333333').stroke();
          doc.y = 140;
        };

        const renderBeautyParsedText = (textStr) => {
          const lines = (textStr || "").split('\\n');
          lines.forEach(line => {
            const match = line.match(/^\\[CATEGORY:\\s*(.*?)\\]/i);
            if (match) {
              doc.moveDown(1);
              doc.font(fontSerifBold).fillColor(beautyColor).fontSize(16).text(match[1], { align: 'left' });
              doc.moveDown(0.5);
            } else if (line.trim().length > 0) {
              doc.font(fontSerif).fillColor(textColor).fontSize(14).text(line, { lineGap: 10, align: 'justify' });
            }
          });
        };

        // ---------------- PAGE 1: COVER ----------------
        addNewPage();
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#050505');
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).lineWidth(1.5).strokeColor(beautyColor).stroke();
        
        doc.font(fontSerifBold).fillColor(beautyColor).fontSize(54).text('K-BEAUTY', 0, 280, { align: 'center', characterSpacing: 12 });
        doc.font(fontSans).fillColor(textColor).fontSize(16).text(isEs ? 'TU PLAN MAESTRO DE ESTILO' : 'YOUR STYLING MASTERPLAN', { align: 'center', characterSpacing: 4 });
        doc.moveDown(2);
        doc.font(fontSerifItalic).fillColor('#888888').fontSize(14).text(isEs ? 'Reporte Maestro 2027 (Edicion VIP)' : '2027 Master Report (VIP Edition)', { align: 'center' });
        
        // ---------------- PAGE 2: AI STYLING REPORT ----------------
        addNewPage();
        addBeautyHeader(isKo ? '1. 스타일링 분석' : isEs ? '1. Analisis de Estilo' : '1. Styling Analysis', isEs ? 'El secreto de Cheongdam' : 'The Cheongdam Secret');
        renderBeautyParsedText(data.reportText || "Data is missing.");
`;

c = c.replace(/} else {[\s\S]*?doc\.font\(fontSerifBold\)\.fillColor\(textColor\)\.fontSize\(20\)\.text\('BEAUTY REPORT - UNDER CONSTRUCTION', 50, 100\);/, beautyPdf.trim());

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
