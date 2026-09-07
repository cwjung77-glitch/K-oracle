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
    doc.on('pageAdded', () => { doc.rect(0, 0, doc.page.width, doc.page.height).fill(bgColor); doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).lineWidth(1).strokeColor('#2A2A2A').stroke(); doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).lineWidth(0.5).strokeColor('#444444').stroke(); doc.y = 60; doc.x = 50; }); const addNewPage = () => { doc.addPage(); };

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
      
      doc.font(fontSans).fillColor('#555555').fontSize(10).text('© 2027 K-ORACLE AI. STRICTLY CONFIDENTIAL.', 0, 750, { align: 'center', characterSpacing: 4 });

      // ---------------- PAGE 2: SOUL BLUEPRINT ----------------
      addNewPage();
      addHeader(isEs ? '1. Matriz de tu Alma' : '1. The Soul Matrix', isEs ? 'El núcleo de tu identidad cósmica' : 'The core of your cosmic identity');
      doc.font(fontSerif).fillColor(textColor).fontSize(14).text(data.content || (isEs ? 'Tu energía se alinea con la fuerza del Fuego. Iluminas la oscuridad pero debes tener cuidado de no quemarte.' : 'Your energy aligns with the force of Fire. You illuminate the darkness but must be careful not to burn out.'), { lineGap: 10, align: 'justify' });

      // ---------------- PAGE 3: 5 ELEMENTS RADAR CHART ----------------
      addNewPage();
      addHeader(isEs ? '2. Balance de los 5 Elementos' : '2. The 5 Elements Balance', isEs ? 'La alquimia de tu energía' : 'The alchemy of your energy');
      
      const cx = doc.page.width / 2;
      const cy = 340;
      const r = 140;
      const elements = isEs ? ['Madera', 'Fuego', 'Tierra', 'Metal', 'Agua'] : ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
      const values = [80, 40, 95, 60, 50]; 

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
      const scores = [30, 45, 60, 40, 85, 95, 70, 80, 100, 60, 50, 75];

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
      
      doc.x = 50; doc.y = 520; doc.font(fontSerif).fillColor(textColor).fontSize(14).text(isEs ? 'Agosto a Septiembre marca tu temporada cumbre. Prepárate.' : 'August to September marks your peak season. Prepare for a major event.', { align: 'center', width: doc.page.width - 100 });

      // ---------------- PAGE 5-10: IN-DEPTH TEXT SECTIONS ----------------
      const sections = isEs ? [
        ['4. Matriz de Riqueza y Carrera', 'El Dinero Inesperado'],
        ['5. Análisis de Vidas Pasadas', 'Karma y Deudas'],
        ['6. Matriz de Amor y Aura', 'Tu Hilo Rojo'],
        ['7. Compatibilidad con Ídolos', 'El Vínculo Cósmico'],
        ['8. Números y Colores de la Suerte', 'Geometría del Alma'],
        ['9. El Veredicto Final', 'Tu Destino en 2027']
      ] : [
        ['4. Wealth & Career Matrix', 'The Unexpected Windfall'],
        ['5. Past Life Analysis', 'Karma and Debts'],
        ['6. Love & Aura Matrix', 'Your Red String of Fate'],
        ['7. K-Pop Idol Compatibility', 'The Cosmic Bond'],
        ['8. Lucky Numbers & Colors', 'Soul Geometry'],
        ['9. The Final Verdict', 'Your Destiny in 2027']
      ];

      const dummyContent = isEs ? 
        'Los textos antiguos sugieren que tu energía fluctúa con los ciclos lunares. Durante este período, experimentarás una alineación profunda de tu propósito. No rechaces nuevas oportunidades que lleguen disfrazadas de desafíos. La presencia de la estrella "Caballo Volador" (역마) en tu carta indica viajes internacionales o reubicación que traerán ganancias financieras masivas.\n\nEvita asociaciones impulsivas en Marzo y Octubre. Tus años dorados financieros comienzan a manifestarse hacia el final de la década.' : 
        'The ancient texts suggest your energy fluctuates with the lunar cycles. During this period, you will experience a profound alignment of your purpose. Do not refuse new opportunities that arrive disguised as challenges. The presence of the "Flying Horse" (역마) star in your chart indicates international travel or relocation that will bring massive financial gain.\n\nAvoid impulsive partnerships in March and October. Your golden financial years begin to manifest toward the end of the decade.';

      for (let i = 0; i < 6; i++) {
        addNewPage();
        addHeader(sections[i][0], sections[i][1]);
        doc.font(fontSerif).fillColor(textColor).fontSize(14).text(dummyContent, { lineGap: 12, align: 'justify' });
        doc.moveDown();
        doc.font(fontSerifItalic).fillColor('#A1A1AA').fontSize(14).text(dummyContent, { lineGap: 12, align: 'justify' });
      }

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


