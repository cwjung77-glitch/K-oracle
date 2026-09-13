const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

// 1. Add isCompatibility
if (!c.includes('const isCompatibility = plan === "compatibility";')) {
  c = c.replace(
    /const displayYear = plan === 'compatibility' \? 'Cosmic Chemistry' : plan === 'fullyear' \? '2028' : plan === 'bundle' \? '2027-2028' : '2027';/,
    `const displayYear = plan === 'compatibility' ? 'Cosmic Chemistry' : plan === 'fullyear' ? '2028' : plan === 'bundle' ? '2027-2028' : '2027';\n    const isCompatibility = plan === "compatibility";`
  );
}

// 2. Fix "Your Daily Cosmic Vibe"
c = c.replace(
  /h4 className="text-yellow-500 font-bold uppercase tracking-widest text-sm">\{isKo \? '오늘의 맞춤 운세' : 'Your Daily Cosmic Vibe'\}/g,
  `h4 className="text-yellow-500 font-bold uppercase tracking-widest text-sm">{isCompatibility ? (isKo ? '오늘의 궁합 바이브' : 'Today\\'s Chemistry Vibe') : (isKo ? '오늘의 맞춤 운세' : 'Your Daily Cosmic Vibe')}`
);

// 3. Fix Wealth & Career Matrix Header
c = c.replace(
  /h4 className="text-2xl font-bold text-white mb-4">\{isKo \? '재물 & 커리어 매트릭스' : 'Wealth & Career Matrix'\}/g,
  `h4 className="text-2xl font-bold text-white mb-4">{isCompatibility ? (isKo ? '관계 에너지 매트릭스' : 'Relationship Energy Matrix') : (isKo ? '재물 & 커리어 매트릭스' : 'Wealth & Career Matrix')}`
);

// 4. Fix Romance & Network Header
c = c.replace(
  /h4 className="text-2xl font-bold text-white mb-4">\{isKo \? '연애 & 인맥 매트릭스' : 'Romance & Network'\}/g,
  `h4 className="text-2xl font-bold text-white mb-4">{isCompatibility ? (isKo ? '친밀도 & 신뢰 매트릭스' : 'Intimacy & Trust Matrix') : (isKo ? '연애 & 인맥 매트릭스' : 'Romance & Network')}`
);

// 5. Fix Karma Review -> Render beautifully if isCompatibility
c = c.replace(
  /\{lang === 'ko' && \(\n\s*<section className="mt-8 p-6 bg-zinc-900 border border-yellow-500\/30 rounded-2xl">\n\s*<h3 className="text-yellow-500 font-bold mb-4">\[ADMIN ONLY\] KARMA REVIEW<\/h3>\n\s*<div className="space-y-4 text-sm text-zinc-300">[\s\S]*?<\/div>\n\s*<\/section>\n\s*\)\}/g,
  `{isCompatibility && (
            <section className="mt-12 bg-zinc-800/30 p-8 rounded-2xl border border-pink-500/30 text-zinc-300 leading-loose text-lg whitespace-pre-wrap font-serif">
              <h3 className="text-3xl font-black text-white flex items-center gap-3 mb-6">
                <HeartPulse className="text-pink-500" size={32} /> {isKo ? '전생의 인연 (Past Life Karma)' : 'Past Life Connection'}
              </h3>
              <div className="space-y-4">
                {(localStorage.getItem("aiKarma") || "").split('\\n').map((line, idx) => {
                  const match = line.match(/^\\[CATEGORY:\\s*(.*?)\\]/i);
                  if (match) {
                    return <h4 key={idx} className="text-xl font-bold text-pink-400 mt-6 mb-2">{match[1]}</h4>;
                  } else if (line.trim().length > 0) {
                    return <p key={idx}>{line}</p>;
                  }
                  return null;
                })}
              </div>
            </section>
          )}`
);

// 6. Hide 12-month graph if isCompatibility
c = c.replace(
  /\{\/\* 12-Month Luck Heatmap \*\/\}\n\s*<section>/g,
  `{/* 12-Month Luck Heatmap */}\n          {!isCompatibility && (\n          <section>`
);

c = c.replace(
  /<\/div>\n\s*<\/div>\n\s*<\/section>\n\s*<button \n\s*onClick=\{async \(\) =>/g,
  `</div>\n            </div>\n          </section>\n          )}\n\n          <button \n            onClick={async () =>`
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
