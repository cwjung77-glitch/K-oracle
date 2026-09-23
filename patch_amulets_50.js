const fs = require('fs');
let content = fs.readFileSync('src/components/features/DailyFortune.jsx', 'utf8');

const newTalismans = `const dailyTalismans = [
  // Wealth & Money (10)
  { id: 'wealth_1', ko: '재물폭발', en: 'Wealth Explosion', desc: 'Attracts money and unexpected windfalls today', icon: '💰', bg: 'bg-yellow-900/50', border: 'border-yellow-500/50', text: 'text-yellow-400' },
  { id: 'wealth_2', ko: '벼락부자', en: 'Sudden Wealth', desc: 'Luck for lotteries and sudden financial gains', icon: '💸', bg: 'bg-yellow-800/50', border: 'border-yellow-400/50', text: 'text-yellow-300' },
  { id: 'wealth_3', ko: '영앤리치', en: 'Young & Rich', desc: 'Manifest a luxurious and abundant lifestyle', icon: '💎', bg: 'bg-cyan-900/50', border: 'border-cyan-500/50', text: 'text-cyan-400' },
  { id: 'wealth_4', ko: '지름신퇴치', en: 'No Impulse Buys', desc: 'Protects your wallet from unnecessary shopping', icon: '🛑', bg: 'bg-red-900/50', border: 'border-red-500/50', text: 'text-red-400' },
  { id: 'wealth_5', ko: '월급루팡', en: 'Salary Lupin', desc: 'Getting paid while doing the absolute minimum', icon: '🥷', bg: 'bg-stone-900/50', border: 'border-stone-500/50', text: 'text-stone-400' },
  { id: 'wealth_6', ko: '소확행', en: 'Small Joys', desc: 'Finding great happiness in small purchases', icon: '☕', bg: 'bg-orange-900/50', border: 'border-orange-500/50', text: 'text-orange-400' },
  { id: 'wealth_7', ko: '대박기원', en: 'Jackpot Energy', desc: 'Massive success in investments or crypto', icon: '🚀', bg: 'bg-red-900/50', border: 'border-orange-500/50', text: 'text-orange-400' },
  { id: 'wealth_8', ko: '플렉스', en: 'Guilt-Free Flex', desc: 'Treat yourself because you deserve it today', icon: '🛍️', bg: 'bg-fuchsia-900/50', border: 'border-fuchsia-500/50', text: 'text-fuchsia-400' },
  { id: 'wealth_9', ko: '통장요정', en: 'Account Fairy', desc: 'Your bank account balance mysteriously grows', icon: '🧚', bg: 'bg-green-900/50', border: 'border-green-400/50', text: 'text-green-300' },
  { id: 'wealth_10', ko: '빚청산', en: 'Debt Clearer', desc: 'Smooth path to financial freedom', icon: '✂️', bg: 'bg-zinc-800/50', border: 'border-zinc-400/50', text: 'text-zinc-300' },

  // Work & Study (10)
  { id: 'work_1', ko: '칼퇴기원', en: 'Off-Work On-Time', desc: 'Smooth workflow and zero overtime today', icon: '🏃', bg: 'bg-blue-900/50', border: 'border-blue-500/50', text: 'text-blue-400' },
  { id: 'work_2', ko: '벼락치기', en: 'Cramming Success', desc: 'Laser focus and 200% memory retention', icon: '✍️', bg: 'bg-indigo-900/50', border: 'border-indigo-500/50', text: 'text-indigo-400' },
  { id: 'work_3', ko: '면접프리패스', en: 'Interview Pass', desc: 'Confidence boost and perfect answers', icon: '👔', bg: 'bg-slate-900/50', border: 'border-slate-500/50', text: 'text-slate-400' },
  { id: 'work_4', ko: '아이디어폭발', en: 'Brainstorm Genius', desc: 'Endless creativity and problem-solving skills', icon: '💡', bg: 'bg-yellow-900/50', border: 'border-yellow-400/50', text: 'text-yellow-300' },
  { id: 'work_5', ko: '상사기분최상', en: 'Boss is Happy', desc: 'Your manager is in a great mood all day', icon: '😊', bg: 'bg-emerald-900/50', border: 'border-emerald-500/50', text: 'text-emerald-400' },
  { id: 'work_6', ko: '승진가도', en: 'Promotion Path', desc: 'Your hard work is finally recognized', icon: '📈', bg: 'bg-rose-900/50', border: 'border-rose-500/50', text: 'text-rose-400' },
  { id: 'work_7', ko: '발표의신', en: 'God of Pitching', desc: 'Flawless presentation and captivated audience', icon: '🎤', bg: 'bg-purple-900/50', border: 'border-purple-500/50', text: 'text-purple-400' },
  { id: 'work_8', ko: '오류해결', en: 'Bug Fixer', desc: 'Find the solution to that impossible problem', icon: '🐛', bg: 'bg-lime-900/50', border: 'border-lime-500/50', text: 'text-lime-400' },
  { id: 'work_9', ko: '팀워크만렙', en: 'Perfect Synergy', desc: 'No drama, just smooth collaboration', icon: '🤝', bg: 'bg-sky-900/50', border: 'border-sky-500/50', text: 'text-sky-400' },
  { id: 'work_10', ko: '휴가승인', en: 'PTO Approved', desc: 'Your time-off request gets instantly accepted', icon: '🌴', bg: 'bg-cyan-900/50', border: 'border-cyan-500/50', text: 'text-cyan-400' },

  // Love & Relationships (10)
  { id: 'love_1', ko: '매력발산', en: 'Aura Burst', desc: 'Magnetic charm and romantic luck', icon: '💘', bg: 'bg-pink-900/50', border: 'border-pink-500/50', text: 'text-pink-400' },
  { id: 'love_2', ko: '철벽방어', en: 'Iron Shield', desc: 'Protect your peace from toxic people', icon: '🛡️', bg: 'bg-slate-900/50', border: 'border-slate-500/50', text: 'text-slate-400' },
  { id: 'love_3', ko: '구남친퇴치', en: 'Ex Repellent', desc: 'Keep unwanted past lovers far away', icon: '👻', bg: 'bg-zinc-900/50', border: 'border-red-500/50', text: 'text-red-400' },
  { id: 'love_4', ko: '썸남썸녀', en: 'Flirting Success', desc: 'Sparks fly with your crush today', icon: '🥰', bg: 'bg-rose-900/50', border: 'border-rose-400/50', text: 'text-rose-300' },
  { id: 'love_5', ko: '천생연분', en: 'Soulmate Alert', desc: 'High chance of meeting someone special', icon: '🎀', bg: 'bg-pink-800/50', border: 'border-pink-400/50', text: 'text-pink-200' },
  { id: 'love_6', ko: '심쿵유발', en: 'Heart Flutter', desc: 'You will make someones heart skip a beat', icon: '💓', bg: 'bg-fuchsia-900/50', border: 'border-fuchsia-500/50', text: 'text-fuchsia-400' },
  { id: 'love_7', ko: '인기폭발', en: 'Main Character', desc: 'Everyone wants your attention today', icon: '👑', bg: 'bg-yellow-900/50', border: 'border-yellow-500/50', text: 'text-yellow-400' },
  { id: 'love_8', ko: '눈치백단', en: 'Mind Reader', desc: 'Easily understand what others are feeling', icon: '👀', bg: 'bg-indigo-900/50', border: 'border-indigo-500/50', text: 'text-indigo-400' },
  { id: 'love_9', ko: '싸움방지', en: 'Peace Maker', desc: 'Smooth over any arguments with a partner', icon: '🕊️', bg: 'bg-sky-900/50', border: 'border-sky-500/50', text: 'text-sky-400' },
  { id: 'love_10', ko: '고백성공', en: 'Yes!', desc: 'They will say yes to your confession', icon: '💌', bg: 'bg-red-900/50', border: 'border-red-500/50', text: 'text-red-400' },

  // Health & Daily Life (10)
  { id: 'health_1', ko: '강철체력', en: 'Iron Health', desc: 'Infinite stamina and physical vitality', icon: '💪', bg: 'bg-green-900/50', border: 'border-green-500/50', text: 'text-green-400' },
  { id: 'health_2', ko: '이너피스', en: 'Serenity Now', desc: 'Calm mind and protection from stress', icon: '🧘', bg: 'bg-teal-900/50', border: 'border-teal-500/50', text: 'text-teal-400' },
  { id: 'health_3', ko: '꿀잠기원', en: 'Deep Sleep', desc: 'Wake up fully refreshed and energized', icon: '🛌', bg: 'bg-blue-900/50', border: 'border-blue-400/50', text: 'text-blue-300' },
  { id: 'health_4', ko: '다이어트성공', en: 'Diet Victory', desc: 'Willpower to resist midnight snacks', icon: '🥗', bg: 'bg-lime-900/50', border: 'border-lime-500/50', text: 'text-lime-400' },
  { id: 'health_5', ko: '배달음식성공', en: 'Foodie Luck', desc: 'Your takeout order will be absolutely delicious', icon: '🍕', bg: 'bg-orange-900/50', border: 'border-orange-500/50', text: 'text-orange-400' },
  { id: 'health_6', ko: '멘탈갑', en: 'Unbreakable', desc: 'Nothing can ruin your mood today', icon: '🛡️', bg: 'bg-zinc-900/50', border: 'border-zinc-500/50', text: 'text-zinc-400' },
  { id: 'health_7', ko: '피부미인', en: 'Glowing Skin', desc: 'Your aura and complexion are flawless today', icon: '✨', bg: 'bg-rose-900/50', border: 'border-rose-300/50', text: 'text-rose-200' },
  { id: 'health_8', ko: '교통체증패스', en: 'Green Lights', desc: 'No traffic jams or train delays on your commute', icon: '🚦', bg: 'bg-emerald-900/50', border: 'border-emerald-500/50', text: 'text-emerald-400' },
  { id: 'health_9', ko: '분실물방지', en: 'Item Keeper', desc: 'You wont lose your keys or phone today', icon: '🔑', bg: 'bg-amber-900/50', border: 'border-amber-500/50', text: 'text-amber-400' },
  { id: 'health_10', ko: '만사형통', en: 'Perfect Day', desc: 'General good luck and smooth sailing', icon: '🍀', bg: 'bg-emerald-900/50', border: 'border-emerald-400/50', text: 'text-emerald-300' },

  // K-Pop & Fandom (10)
  { id: 'kpop_1', ko: '티켓팅성공', en: 'Ticketing Win', desc: 'Secure front-row VIP seats for the concert', icon: '🎫', bg: 'bg-purple-900/50', border: 'border-purple-500/50', text: 'text-purple-400' },
  { id: 'kpop_2', ko: '광클성공', en: 'God Speed Click', desc: 'Fastest internet connection for merch drops', icon: '🖱️', bg: 'bg-cyan-900/50', border: 'border-cyan-500/50', text: 'text-cyan-400' },
  { id: 'kpop_3', ko: '최애영접', en: 'Meeting Bias', desc: 'High chance of a lucky encounter with your idol', icon: '😭', bg: 'bg-pink-900/50', border: 'border-pink-500/50', text: 'text-pink-400' },
  { id: 'kpop_4', ko: '덕계못파괴', en: 'Lucky Fan', desc: 'Your comment gets read during a live stream', icon: '📱', bg: 'bg-indigo-900/50', border: 'border-indigo-500/50', text: 'text-indigo-400' },
  { id: 'kpop_5', ko: '포카교환', en: 'Photocard Luck', desc: 'Pull your bias from the random album album', icon: '🃏', bg: 'bg-rose-900/50', border: 'border-rose-500/50', text: 'text-rose-400' },
  { id: 'kpop_6', ko: '컴백대박', en: 'Perfect Comeback', desc: 'Your favorite group breaks all the records', icon: '🏆', bg: 'bg-yellow-900/50', border: 'border-yellow-500/50', text: 'text-yellow-400' },
  { id: 'kpop_7', ko: '성덕인증', en: 'Noticed by Senpai', desc: 'Your idol replies to your post or fan-letter', icon: '💌', bg: 'bg-red-900/50', border: 'border-red-500/50', text: 'text-red-400' },
  { id: 'kpop_8', ko: '시야확보', en: 'Clear View', desc: 'No tall people blocking your view at the show', icon: '👀', bg: 'bg-sky-900/50', border: 'border-sky-500/50', text: 'text-sky-400' },
  { id: 'kpop_9', ko: '운수대통', en: 'Golden Hands', desc: 'Win the fan-sign raffle event', icon: '✍️', bg: 'bg-amber-900/50', border: 'border-amber-500/50', text: 'text-amber-400' },
  { id: 'kpop_10', ko: '어덕행덕', en: 'Happy Fangirl', desc: 'Stress-free, pure joy in loving your idol', icon: '💖', bg: 'bg-pink-800/50', border: 'border-pink-400/50', text: 'text-pink-300' }
];`

// Replace the old array. The old array is defined between `const dailyTalismans = [` and the `];` before `function getDailyTalisman`
const regex = /const dailyTalismans = \[[\s\S]*?\];/;
content = content.replace(regex, newTalismans);

fs.writeFileSync('src/components/features/DailyFortune.jsx', content);
console.log("Replaced daily talismans with 50 items!");
