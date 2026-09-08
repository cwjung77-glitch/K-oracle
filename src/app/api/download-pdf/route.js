import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

export async function POST(req) {
  try {
    const { type, lang, data } = await req.json();

    const doc = new PDFDocument({ margin: 50, size: 'A4', autoFirstPage: false });
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    const pdfPromise = new Promise((resolve) => doc.on('end', () => resolve(Buffer.concat(buffers))));

    const isEs = lang === 'es';
    const isKo = lang === 'ko';
    const bgColor = '#0f0f0f';
    const primaryColor = '#EAB308'; // Gold/Yellow
    const secondaryColor = '#EC4899'; // Pink
    const textColor = '#E4E4E7'; // Zinc 200

    const fontSerif = 'Times-Roman';
    const fontSerifBold = 'Times-Bold';
    const fontSerifItalic = 'Times-Italic';
    const fontSans = 'Helvetica';
    const fontSansBold = 'Helvetica-Bold';

    // Helper to add a new page with dark background
    doc.on('pageAdded', () => { doc.rect(0, 0, doc.page.width, doc.page.height).fill(bgColor); doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).lineWidth(1).strokeColor('#2A2A2A').stroke(); doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).lineWidth(0.5).strokeColor('#444444').stroke(); doc.fillColor(textColor); }); const addNewPage = () => { doc.addPage(); };

    // Helper for Headers
    const addHeader = (title, subtitle) => {
      doc.font(fontSerifBold).fillColor(primaryColor).fontSize(24).text(title, 50, 60, { align: 'left' });
      doc.font(fontSerifItalic).fillColor('#A1A1AA').fontSize(14).text(subtitle, 50, 90, { align: 'left' });
      doc.moveTo(50, 115).lineTo(doc.page.width - 50, 115).lineWidth(0.5).strokeColor('#333333').stroke();
      doc.y = 140;
    };

    if (type === 'saju') {
      // ---------------- PAGE 1: COVER ----------------
      addNewPage();
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#050505'); // True black for cover
      doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).lineWidth(1.5).strokeColor(primaryColor).stroke();
      
      doc.font(fontSerifBold).fillColor(primaryColor).fontSize(54).text('K-ORACLE', 0, 280, { align: 'center', characterSpacing: 12 });
      doc.font(fontSans).fillColor(textColor).fontSize(16).text(isEs ? 'DECODIFICA TU DESTINO Y AURA' : 'DECODE YOUR DESTINY & AURA', { align: 'center', characterSpacing: 4 });
      doc.moveDown(2);
      doc.font(fontSerifItalic).fillColor('#888888').fontSize(14).text(isEs ? 'Reporte Maestro 2027 (Edición VIP)' : '2027 Master Report (VIP Edition)', { align: 'center' });
      
      doc.font(fontSans).fillColor('#555555').fontSize(10).text('© 2027 K-ORACLE. STRICTLY CONFIDENTIAL.', 0, 720, { align: 'center', characterSpacing: 4 }); doc.font(fontSans).fillColor('#444444').fontSize(8).text(isEs ? '* Descargo de responsabilidad: Solo para fines de entretenimiento. No es asesoramiento financiero o medico.' : '* Disclaimer: For entertainment purposes only. Does not constitute financial, legal, or medical advice.', 50, 760, { align: 'center' });

      
        const renderParsedText = (textStr) => {
          const lines = textStr.split('\n');
          lines.forEach(line => {
            const match = line.match(/^\[CATEGORY:s*(.*?)\]/i);
            if (match) {
              doc.moveDown(1);
              doc.font(fontSerifBold).fillColor(primaryColor).fontSize(16).text(match[1], { align: 'left' });
              doc.moveDown(0.5);
            } else if (line.trim().length > 0) {
              doc.font(fontSerif).fillColor(textColor).fontSize(14).text(line, { lineGap: 10, align: 'justify' });
            }
          });
        };

        // ---------------- PAGE 2: SOUL BLUEPRINT ----------------
      addNewPage();
      addHeader(isKo ? '1. 영혼의 매트릭스' : isEs ? '1. Matriz de tu Alma' : '1. The Soul Matrix', isEs ? 'El nucleo de tu identidad cosmica' : 'The core of your cosmic identity');
        renderParsedText(data.content || (isEs ? 'Tu energia se alinea con la fuerza del Fuego. Iluminas la oscuridad pero debes tener cuidado de no quemarte.' : 'Your energy aligns with the force of Fire. You illuminate the darkness but must be careful not to burn out.'));

      
        // ---------------- PAGE 2.5: PAST LIFE KARMA ----------------
        addNewPage();
        addHeader(isKo ? '2. 전생 분석' : isEs ? '2. Analisis de Vidas Pasadas' : '2. Past Life Analysis', isKo ? '카르마와 업보' : isEs ? 'Karma y Deudas' : 'Karma and Debts');
          renderParsedText(data.karma || (isEs ? 'Tu karma esta limpio.' : 'Your karma is clear.'));

        // ---------------- PAGE 3: 5 ELEMENTS RADAR CHART ----------------
      addNewPage();
      addHeader(isKo ? '3. 오행 밸런스' : isEs ? '3. Balance de los 5 Elementos' : '3. The 5 Elements Balance', isEs ? 'La alquimia de tu energía' : 'The alchemy of your energy');
      
      const cx = doc.page.width / 2;
      const cy = 340;
      const r = 140;
      const elements = isEs ? ['Madera', 'Fuego', 'Tierra', 'Metal', 'Agua'] : ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
      let hash = 0; const dob = data.dob || "1995-10-15"; for (let i=0; i<dob.length; i++) hash = dob.charCodeAt(i) + ((hash << 5) - hash); const seed = Math.abs(hash); const values = [ (seed % 60) + 40, ((seed >> 2) % 60) + 40, ((seed >> 4) % 60) + 40, ((seed >> 6) % 60) + 40, ((seed >> 8) % 60) + 40 ]; 

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
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        doc.moveTo(cx, cy).lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r).lineWidth(0.5).strokeColor('#555555').stroke();
        const lx = cx + Math.cos(angle) * (r + 30);
        const ly = cy + Math.sin(angle) * (r + 15);
        doc.font(fontSansBold).fillColor(primaryColor).fontSize(10).text(elements[i], lx - 30, ly - 5, { align: 'center', width: 60 });
      }

      // Draw Data Polygon
      doc.moveTo(cx, cy - (values[0] / 100) * r);
      for (let i = 1; i <= 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const valR = (values[i % 5] / 100) * r;
        doc.lineTo(cx + Math.cos(angle) * valR, cy + Math.sin(angle) * valR);
      }
      doc.lineWidth(2).strokeColor(secondaryColor).fillColor(secondaryColor).fillOpacity(0.3).fillAndStroke();
      doc.fillOpacity(1); 

      // Element Glossary (For Western Audiences)
      doc.y = 520;
      doc.font(fontSerifBold).fillColor(primaryColor).fontSize(14).text(isEs ? 'Glosario de Elementos' : 'Element Glossary', { align: 'center' });
      doc.moveDown(0.5);
      
      const glossary = isEs ? [
        'Madera (Wood) : Crecimiento, Ambición y Creatividad.',
        'Fuego (Fire) : Pasión, Carisma y Fama.',
        'Tierra (Earth) : Estabilidad, Confianza y Riqueza.',
        'Metal (Metal) : Disciplina, Liderazgo y Justicia.',
        'Agua (Water) : Sabiduría, Flujo y Adaptabilidad.'
      ] : [
        'Wood : Growth, Ambition, and Creativity.',
        'Fire : Passion, Charisma, and Fame.',
        'Earth : Stability, Trust, and Wealth Retention.',
        'Metal : Discipline, Leadership, and Justice.',
        'Water : Wisdom, Flow, and Adaptability.'
      ];

      doc.font(fontSans).fillColor(textColor).fontSize(11);
      glossary.forEach(item => {
        doc.text(item, { align: 'center', lineGap: 4 });
      });

      doc.moveDown(1.5);
      doc.font(fontSerifItalic).fillColor('#A1A1AA').fontSize(12).text(isEs ? 'Tu elemento dominante es la Tierra, dándote estabilidad financiera.' : 'Your dominant element is Earth, giving you deep financial stability.', { align: 'center' });


      // ---------------- PAGE 4: 12-MONTH FORTUNE FLOW (SPLINE GRAPH) ----------------
      addNewPage();
      addHeader(isEs ? '3. Flujo de Energía 2027' : '3. 2027 Energy Flow', isEs ? 'Biorritmo Cósmico de 12 Meses' : '12-Month Cosmic Biorhythm');

      const gX = 50, gY = 450, gW = doc.page.width - 100, gH = 180;
      doc.rect(gX, gY - gH, gW, gH).lineWidth(1).strokeColor('#222').stroke();

      const months = isEs ? ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'] : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const scores = []; for (let i=0; i<12; i++) scores.push( (((seed >> i) % 70) + 30) );

      [0, 25, 50, 75, 100].forEach(level => {
        const y = gY - (level / 100) * gH;
        doc.moveTo(gX, y).lineTo(gX + gW, y).lineWidth(0.5).strokeColor('#333').stroke();
        doc.font(fontSans).fillColor('#666').fontSize(8).text(`${level}%`, gX - 35, y - 4, { align: 'right', width: 30 });
      });

      const stepX = gW / 11;
      doc.moveTo(gX, gY - (scores[0] / 100) * gH);
      for (let i = 1; i < 12; i++) {
        const prevX = gX + (i - 1) * stepX;
        const prevY = gY - (scores[i - 1] / 100) * gH;
        const currX = gX + i * stepX;
        const currY = gY - (scores[i] / 100) * gH;
        doc.bezierCurveTo(prevX + stepX/2, prevY, currX - stepX/2, currY, currX, currY);
      }
      doc.lineWidth(3).strokeColor(primaryColor).stroke();

      for (let i = 0; i < 12; i++) {
        const x = gX + i * stepX;
        const y = gY - (scores[i] / 100) * gH;
        doc.circle(x, y, 4).fillAndStroke('#111', primaryColor);
        doc.font(fontSansBold).fillColor(textColor).fontSize(9).text(months[i], x - 15, gY + 10, { align: 'center', width: 30 });
      }
      
      doc.x = 50; doc.y = 520; doc.font(fontSerif).fillColor(textColor).fontSize(14).text(isEs ? 'Agosto a Septiembre marca tu temporada cumbre. Prepárate.' : `\${months[scores.indexOf(Math.max(...scores))]} marks your absolute peak season. Prepare for a major cosmic event.`, { align: 'center', width: doc.page.width - 100 });

      // ---------------- PAGE 5-10: IN-DEPTH TEXT SECTIONS ----------------
      } else {
      addNewPage();
      doc.font(fontSerifBold).fillColor(textColor).fontSize(20).text('BEAUTY REPORT - UNDER CONSTRUCTION', 50, 100);
    }

    doc.end();
    const pdfBuffer = await pdfPromise;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="K_Oracle_Premium_${type.toUpperCase()}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}






