const fs = require('fs');

function replaceI18n(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  
  // Basic naive replacements (for 12 languages, we'd ideally use a dictionary)
  // For now, since I only generated the i18n file but didn't hook it up,
  // I will just let the system know I'm making progress, or I can hook it up.
  // Actually, to fully hook it up:
  // 1. Import { t } from '../../locales/i18n.js'
  // 2. Replace {lang === 'es' ? '...' : '...'} with {t('...', lang)}
  
  // Instead of complex AST parsing, let's just do targeted string replacements.
  const isComponents = filePath.includes('components');
  const importPath = isComponents ? "../../locales/i18n" : "../locales/i18n";
  
  if (!code.includes('import { t }')) {
    code = code.replace("import React", `import { t } from '${importPath}';\nimport React`);
  }
  
  // Define mappings
  const map = [
    [/\{lang === 'es' \? 'Fortuna Diaria Gratis' : 'FREE DAILY FORTUNE'\}/g, "{t('free_daily_fortune', lang)}"],
    [/\{lang === 'es' \? 'Tu Plan de Belleza' : 'Your Beauty Blueprint'\}/g, "{t('beauty_blueprint', lang)}"],
    [/\{lang === 'es' \? 'El plan maestro de estilo de 30 dias.' : 'The ultimate 30-day styling masterplan.'\}/g, "{t('beauty_subtitle', lang)}"],
    [/\{lang === 'es' \? 'Analisis de Estilo de Cheongdam' : 'Cheongdam Styling Analysis'\}/g, "{t('cheongdam_analysis', lang)}"],
    [/\{lang === 'es' \? 'Kit de Maquillaje K-Beauty \\(YesStyle\\)' : 'K-Beauty Makeup Kit \\(YesStyle\\)'\}/g, "{t('makeup_kit', lang)}"],
    [/\{lang === 'es' \? 'Compra con descuento VIP aplicado' : 'Shop with VIP discount applied'\}/g, "{t('vip_discount', lang)}"],
    [/\{lang === 'es' \? 'Cuidado de Piel Coreano \\(YesStyle\\)' : 'Korean Skincare Essentials \\(YesStyle\\)'\}/g, "{t('skincare', lang)}"],
    [/\{lang === 'es' \? 'Descargar Guia Premium en PDF' : 'Download Full PDF Guide'\}/g, "{t('download_pdf', lang)}"],
    [/\{lang === 'es' \? 'Nombre' : 'Name'\}/g, "{t('name', lang)}"],
    [/\{lang === 'es' \? 'Fecha de Nacimiento' : 'Birth Date'\}/g, "{t('birth_date', lang)}"],
    [/\{lang === 'es' \? 'Genero' : 'Gender'\}/g, "{t('gender', lang)}"],
    [/\{lang === 'es' \? 'Ver Mi Fortuna' : 'Reveal My Fortune'\}/g, "{t('reveal_fortune', lang)}"],
    [/\{lang === 'es' \? 'Descifrando tu destino...' : 'Decoding your destiny...'\}/g, "{t('decoding', lang)}"],
    [/\{lang === 'es' \? 'Color de la Suerte' : 'Lucky Color'\}/g, "{t('lucky_color', lang)}"],
    [/\{lang === 'es' \? 'Match de Idolo' : 'Idol Match'\}/g, "{t('idol_match', lang)}"],
    [/\{lang === 'es' \? 'Tu Amuleto Exclusivo de Hoy' : 'Your Exclusive Daily Amulet'\}/g, "{t('exclusive_amulet', lang)}"],
    [/\{lang === 'es' \? 'Descargar' : 'Download Amulet'\}/g, "{t('download_amulet', lang)}"],
    [/\{lang === 'es' \? 'Guarda esta imagen en tu celular para atraer buena suerte hoy.' : 'Save this amulet to your phone to attract luck today.'\}/g, "{t('save_amulet', lang)}"],
    [/\{lang === 'es' \? 'Reporte Profundo \\+ Amuleto Bonus' : 'Deep Report \\+ Bonus Amulet'\}/g, "{t('deep_report', lang)}"],
    [/\{lang === 'es' \? 'Descubre tu destino y obten tu amuleto.' : 'Unlock your detailed destiny & get a lucky lock-screen wallpaper.'\}/g, "{t('unlock_desc', lang)}"],
    [/\{lang === 'es' \? 'Desbloquear Todo \\(\\$0\\.99\\)' : 'Unlock Both \\(\\$0\\.99\\)'\}/g, "{t('unlock_btn', lang)}"]
  ];

  map.forEach(([regex, replacement]) => {
    code = code.replace(regex, replacement);
  });
  
  fs.writeFileSync(filePath, code);
  console.log('Patched', filePath);
}

replaceI18n('src/components/features/BeautyDeepDiveReport.jsx');
replaceI18n('src/components/features/DailyFortune.jsx');
replaceI18n('src/app/page.js');
