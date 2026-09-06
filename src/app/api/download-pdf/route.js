import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

export async function POST(req) {
  try {
    // We now accept type (saju/beauty), lang, and the raw data payload.
    const { type, lang, data } = await req.json();

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    const pdfPromise = new Promise((resolve) => doc.on('end', () => resolve(Buffer.concat(buffers))));

    // Helper functions for PDF styling
    const addCoverPage = (title, subtitle, color) => {
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#111111');
      doc.fillColor(color).fontSize(40).text('K-ORACLE', 0, 250, { align: 'center', characterSpacing: 10 });
      doc.fillColor('#FFFFFF').fontSize(24).text(title, { align: 'center' });
      doc.moveDown(2);
      doc.fillColor('#888888').fontSize(14).text(subtitle, { align: 'center' });
      doc.addPage();
    };

    const addSectionHeader = (title, color) => {
      doc.rect(50, doc.y, doc.page.width - 100, 30).fill(color);
      doc.fillColor('#000000').fontSize(16).text(title, 60, doc.y - 22, { align: 'left' });
      doc.moveDown(2);
    };

    if (type === 'saju') {
      const isEs = lang === 'es';
      const brandColor = '#EAB308'; // Yellow
      
      // Cover Page
      addCoverPage(
        isEs ? 'Plan Maestro de Destino 2027' : '2027 Destiny Masterplan',
        isEs ? 'Preparado exclusivamente para ti' : 'Prepared exclusively for you',
        brandColor
      );

      // Page 2: Core Analysis
      doc.fillColor('#000000'); // Switch back to black text on white bg
      addSectionHeader(isEs ? '1. Análisis del Alma' : '1. Core Soul Analysis', brandColor);
      doc.fillColor('#333333').fontSize(12).text(data.content, { lineGap: 6 });
      doc.moveDown(2);

      // Wealth & Career Matrix
      addSectionHeader(isEs ? '2. Matriz de Riqueza y Carrera' : '2. Wealth & Career Matrix', '#4ADE80');
      doc.fillColor('#333333').fontSize(12).text(isEs ? 'La Oportunidad: Un ingreso repentino de "Riqueza Inesperada" (횡재) entra en tu carta en agosto. Esto no es salario; esto es retorno de inversión o viralidad de un negocio secundario.\n\nEl Peligro: La estrella de "Robar Riqueza" (겁재) acecha en marzo. Un socio de confianza podría pedir un préstamo. Recházalo cortésmente.' : 'The Opportunity: A sudden influx of "Unexpected Wealth" (횡재) enters your chart in August. This isn\'t salary; this is investment return or side-hustle virality.\n\nThe Danger: The "Rob Wealth" (겁재) star lurks in March. A trusted associate may ask for a loan. Refuse gracefully.', { lineGap: 6 });
      doc.addPage();

      // Page 3: 12-Month Calendar
      addSectionHeader(isEs ? '3. Flujo de Energía de 12 Meses' : '3. 12-Month Energy Flow', '#60A5FA');
      const months = isEs ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const scores = [40, 50, 20, 70, 85, 90, 95, 100, 80, 60, 30, 55];
      
      months.forEach((m, i) => {
        const score = scores[i];
        const status = score >= 85 ? (isEs ? 'Éxito' : 'Peak') : score <= 35 ? (isEs ? 'Cuidado' : 'Danger') : (isEs ? 'Estable' : 'Stable');
        doc.fillColor('#000000').fontSize(12).text(`${m}: ${score}% Energy - ${status}`, { lineGap: 10 });
      });
      
    } else if (type === 'beauty') {
      const isEs = lang === 'es';
      const brandColor = '#EC4899'; // Pink
      
      // Cover Page
      addCoverPage(
        isEs ? 'Tu Plan de Belleza (VIP)' : 'Your Beauty Blueprint (VIP)',
        isEs ? 'Guía de Estilo de 30 Días' : '30-Day Styling Guide',
        brandColor
      );

      // Page 2: Wardrobe
      doc.fillColor('#000000');
      addSectionHeader(isEs ? '1. Guía de Vestuario y Telas' : '1. Wardrobe & Fabric Guide', brandColor);
      
      doc.fillColor('#10B981').fontSize(14).text("DO'S (BEST MATCHES)");
      doc.moveDown(0.5);
      doc.fillColor('#333333').fontSize(12);
      data.wardrobe.dos.forEach(item => { doc.text(`• ${item}`, { lineGap: 4 }); });
      doc.moveDown(2);

      doc.fillColor('#EF4444').fontSize(14).text("DON'TS (AVOID)");
      doc.moveDown(0.5);
      doc.fillColor('#333333').fontSize(12);
      data.wardrobe.donts.forEach(item => { doc.text(`• ${item}`, { lineGap: 4 }); });
      doc.addPage();

      // Page 3: Hair
      addSectionHeader(isEs ? '2. Fórmula de Color de Salón' : '2. Salon Hair Color Formula', '#A855F7');
      doc.fillColor('#333333').fontSize(12)
         .text(`${isEs ? 'Tono Objetivo' : 'Target Shade'}: ${data.hair.targetShade}`, { lineGap: 8 })
         .text(`${isEs ? 'Nivel de Decoloración' : 'Bleach Level'}: ${data.hair.bleachLevel}`, { lineGap: 8 })
         .text(`${isEs ? 'Fórmula de Tónico' : 'Toner Formula'}: ${data.hair.tonerFormula}`, { lineGap: 8 });
      doc.moveDown(2);

      // Shopping Links
      addSectionHeader(isEs ? '3. Lista de Compras VIP' : '3. VIP Shopping List', '#34D399');
      doc.fillColor('#2563EB').fontSize(12)
         .text('1. Full 5-Step Makeup Kit (Olive Young)', { link: 'https://global.oliveyoung.com', underline: true, lineGap: 10 })
         .text('2. High-Contrast Color Lenses (Olens)', { link: 'https://olensglobal.com', underline: true, lineGap: 10 })
         .text('3. Premium Silk Blouse (W Concept)', { link: 'https://us.wconcept.com', underline: true, lineGap: 10 });
    }

    // Add final page footer
    doc.moveDown(4);
    doc.fillColor('#999999').fontSize(10).text('© 2027 K-ORACLE AI. All Rights Reserved.', { align: 'center' });

    doc.end();
    const pdfBuffer = await pdfPromise;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="K_Oracle_${type.toUpperCase()}_Report.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
