const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Inject handleLogoClick inside OracleLanding
if (!c.includes('const handleLogoClick = () => {')) {
  c = c.replace(
    /export default function OracleLanding\(\) \{/,
    `export default function OracleLanding() {\n  const handleLogoClick = () => {
    if (hasPaid) {
      if (window.confirm(lang === 'ko' ? "PDF 마스터플랜을 다운로드하셨나요? 지금 메인으로 돌아가면 분석 결과가 영구적으로 삭제됩니다." : "Did you download your PDF Masterplan? Leaving now will permanently erase your results.")) {
        localStorage.removeItem("hasPaid");
        setHasPaid(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setLogoClicks(p => p + 1);
    if (logoClicks + 1 >= 5) setShowKo(true);
  };`
  );
}

// 2. Replace the old onClick with the new handleLogoClick
c = c.replace(
  /onClick=\{\(\) => \{\s*window\.scrollTo\(0,0\);\s*setLogoClicks\(p => p \+ 1\);\s*if \(logoClicks \+ 1 >= 5\) setShowKo\(true\);\s*\}\}/,
  `onClick={handleLogoClick}`
);

fs.writeFileSync('src/app/page.js', c);
