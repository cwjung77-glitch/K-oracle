const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

const newTalismans = `const talismans = [
      // Fan & Idol Chemistry
      { text: '최애등극', en: 'Ultimate Bias', desc: 'An undeniable magnetic attraction' },
      { text: '성덕인증', en: 'Lucky Fan', desc: 'A dreamlike connection bringing joy' },
      { text: '덕질만렙', en: 'Max Devotion', desc: 'Unwavering loyalty and admiration' },
      { text: '덕통사고', en: 'Instant Crush', desc: 'A sudden, overpowering connection' },
      { text: '광클성공', en: 'Perfect Timing', desc: 'Meeting at the right cosmic moment' },
      { text: '쌍방구원', en: 'Mutual Salvation', desc: 'Saving each other through your bond' },
      { text: '환상호흡', en: 'Dream Team', desc: 'Perfect synergy in everything you do' },
      { text: '절대지지', en: 'Absolute Support', desc: 'A pillar of strength for each other' },
      // Soulmate & Destiny
      { text: '천생연분', en: 'Soulmate', desc: 'A match made in heaven' },
      { text: '백년해로', en: 'Eternal Bond', desc: 'Lifelong harmony together' },
      { text: '운명공동', en: 'Shared Destiny', desc: 'Your paths are cosmically intertwined' },
      { text: '찰떡궁합', en: 'Perfect Match', desc: 'Fitting together like puzzle pieces' },
      { text: '이심전심', en: 'Telepathy', desc: 'Understanding without speaking' },
      { text: '수어지교', en: 'Water & Fish', desc: 'An essential, life-giving connection' },
      { text: '지음지기', en: 'True Soulmate', desc: 'Someone who knows your true song' },
      { text: '금상첨화', en: 'Perfect Harmony', desc: 'Making each other shine brighter' },
      // Growth & Peace
      { text: '상호보완', en: 'Mutual Synergy', desc: 'Balancing each other flawlessly' },
      { text: '빛과소금', en: 'Light & Salt', desc: 'Essential and irreplaceable to one another' },
      { text: '유일무이', en: 'One and Only', desc: 'A connection that cannot be replicated' },
      { text: '동고동락', en: 'Thick & Thin', desc: 'Standing together through all times' },
      { text: '평생동반', en: 'Lifelong', desc: 'A companion for the long journey' },
      { text: '불가분의', en: 'Inseparable', desc: 'Bound by invisible red threads' },
      { text: '평안무사', en: 'Peaceful', desc: 'A calm relationship free of drama' },
      { text: '일취월장', en: 'Growing Together', desc: 'Inspiring each other to evolve' },
      // Fun & Cosmic 
      { text: '전생인연', en: 'Past Life', desc: 'Lovers or best friends in a past life' },
      { text: '우주대통', en: 'Cosmic Link', desc: 'The universe aligned for you two' },
      { text: '음양조화', en: 'Yin & Yang', desc: 'Perfect elemental balance' },
      { text: '자석끌림', en: 'Magnetic', desc: 'Opposites attracting fiercely' },
      { text: '운명개척', en: 'Destiny Makers', desc: 'Rewriting the stars together' },
      { text: '꽃길만걷', en: 'Flower Path', desc: 'Only beautiful days ahead together' }
    ];`;

const searchRegex = /const talismans = \[\s*\{ text: '천생연분'[\s\S]*?\}\s*\];/;
content = content.replace(searchRegex, newTalismans);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf8');
