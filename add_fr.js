const fs = require('fs');

const frObj = `
  fr: {
    free_daily_fortune: 'HOROSCOPE QUOTIDIEN GRATUIT',
    beauty_blueprint: 'Votre Plan de Beauté',
    beauty_subtitle: 'Le plan directeur ultime de style de 30 jours.',
    cheongdam_analysis: 'Analyse de Style Cheongdam',
    makeup_kit: 'Kit de Maquillage K-Beauty (YesStyle)',
    vip_discount: 'Achetez avec la remise VIP appliquée',
    skincare: 'Soins Coréens Essentiels (YesStyle)',
    download_pdf: 'Télécharger le Guide PDF Complet',
    name: 'Nom',
    birth_date: 'Date de Naissance',
    gender: 'Genre',
    reveal_fortune: 'Révéler Ma Fortune',
    decoding: 'Décodage de votre destin...',
    lucky_color: 'Couleur Chanceuse',
    idol_match: 'Correspondance d\\'Idole',
    exclusive_amulet: 'Votre Amulette Quotidienne Exclusive',
    download_amulet: 'Télécharger l\\'Amulette',
    save_amulet: 'Enregistrez cette amulette sur votre téléphone pour attirer la chance aujourd\\'hui.',
    deep_report: 'Rapport Détaillé + Amulette Bonus',
    unlock_desc: 'Déverrouillez votre destin détaillé et obtenez un fond d\\'écran porte-bonheur.',
    unlock_btn: 'Déverrouiller les Deux ($0.99)',
  },
`;

let code = fs.readFileSync('src/locales/i18n.js', 'utf8');
code = code.replace('export function', frObj + 'export function');
fs.writeFileSync('src/locales/i18n.js', code);
console.log('French added.');
