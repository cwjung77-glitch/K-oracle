const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

c = c.replace(/<p><strong>\{isKo \? '[^']+' : 'The Opportunity:'\}<\/strong> \{wealthOps\[seed % 3\]\}<\/p>/, "<p><strong>{isKo ? '기회:' : 'The Opportunity:'}</strong> {reportData?.matrixData?.wealth?.opportunity || wealthOps[seed % 3]}</p>");
c = c.replace(/<p><strong>\{isKo \? '[^']+' : 'The Danger:'\}<\/strong> \{wealthDans\[\(seed \+ 1\) % 3\]\}<\/p>/, "<p><strong>{isKo ? '위험:' : 'The Danger:'}</strong> {reportData?.matrixData?.wealth?.danger || wealthDans[(seed + 1) % 3]}</p>");

c = c.replace(/<p><strong>\{isKo \? '[^']+' : 'The Opportunity:'\}<\/strong> \{romOps\[\(seed \+ 2\) % 3\]\}<\/p>/, "<p><strong>{isKo ? '기회:' : 'The Opportunity:'}</strong> {reportData?.matrixData?.romance?.opportunity || romOps[(seed + 2) % 3]}</p>");
c = c.replace(/<p><strong>\{isKo \? '[^']+' : 'The Danger:'\}<\/strong> \{romDans\[\(seed \+ 3\) % 3\]\}<\/p>/, "<p><strong>{isKo ? '위험:' : 'The Danger:'}</strong> {reportData?.matrixData?.romance?.danger || romDans[(seed + 3) % 3]}</p>");

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
