const fs = require('fs');
let code = fs.readFileSync('src/app/page.js', 'utf8');

const replacements = [
  { search: 'K-ASTROLOGY', replace: "{t('k_astrology', lang) || 'K-ASTROLOGY'}" },
  { search: 'K-BEAUTY', replace: "{t('k_beauty', lang) || 'K-BEAUTY'}" },
  { search: 'Choose Your <span', replace: "{t('choose_destiny', lang) || 'Choose Your'} <span" },
  { search: '>Destiny Plan</span>', replace: ">{t('destiny_plan', lang) || 'Destiny Plan'}</span>" },
  { search: '>Select the cosmic blueprint that guides your future. 90% of our VIPs choose the Bundle.</p>', replace: ">{t('select_cosmic', lang) || 'Select the cosmic blueprint that guides your future. 90% of our VIPs choose the Bundle.'}</p>" },
  { search: '>2026 Q4 Finale</h3>', replace: ">{t('q4_finale', lang) || '2026 Q4 Finale'}</h3>" },
  { search: '>Navigate the remaining 3 months.</p>', replace: ">{t('nav_3_months', lang) || 'Navigate the remaining 3 months.'}</p>" },
  { search: '>Select Plan</button>', replace: ">{t('select_plan', lang) || 'Select Plan'}</button>" },
  { search: '>26+27 VIP Masterplan</h3>', replace: ">{t('vip_masterplan', lang) || '26+27 VIP Masterplan'}</h3>" },
  { search: '>THE ULTIMATE 15-MONTH MASTERPLAN</p>', replace: ">{t('ult_15_months', lang) || 'THE ULTIMATE 15-MONTH MASTERPLAN'}</p>" },
  { search: '>Unlock Masterplan</button>', replace: ">{t('unlock_masterplan', lang) || 'Unlock Masterplan'}</button>" },
  { search: '>2027 Full Year</h3>', replace: ">{t('full_year', lang) || '2027 Full Year'}</h3>" },
  { search: '>Prepare for the new year early.</p>', replace: ">{t('prep_new_year', lang) || 'Prepare for the new year early.'}</p>" },
  { search: 'Unlock Your <span', replace: "{t('unlock_your', lang) || 'Unlock Your'} <span" },
  { search: '>Beauty Blueprint</span>', replace: ">{t('beauty_blueprint_title', lang) || 'Beauty Blueprint'}</span>" },
  { search: '>Get your personalized styling masterplan, including exact wardrobe color matching, hair dye recommendations, and makeup strategies.</p>', replace: ">{t('get_personalized', lang) || 'Get your personalized styling masterplan, including exact wardrobe color matching, hair dye recommendations, and makeup strategies.'}</p>" },
  { search: 'MOST POPULAR', replace: "{t('most_popular', lang) || 'MOST POPULAR'}" },
  { search: '>Full Personal Color Analysis</h3>', replace: ">{t('full_analysis', lang) || 'Full Personal Color Analysis'}</h3>" }
];

// Perform replacements cautiously
for (let r of replacements) {
  // Use simple string replace. K-ASTROLOGY might appear multiple times, we only want the ones inside tags.
  // Actually, K-ASTROLOGY and K-BEAUTY appear once inside span/button.
  if (r.search === 'K-ASTROLOGY' || r.search === 'K-BEAUTY' || r.search === 'MOST POPULAR') {
    code = code.replace(new RegExp(`>\\s*${r.search}\\s*<`, 'g'), `>{${r.replace.replace(/\{|\}/g, '')}}<`);
  } else {
    code = code.replace(r.search, r.replace);
  }
}

fs.writeFileSync('src/app/page.js', code);
console.log('Patched page.js with missing translations!');
