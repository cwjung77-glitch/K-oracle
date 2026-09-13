const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

// Find the else block and replace it entirely
const regex = /\} else \{\n\s*if \(data\.isRateLimit\) \{[\s\S]*?\n\s*\}\n\s*\}/;
const newElse = `} else {
          setError(true);
          if (data.isRateLimit) {
            setAiReport(isKo ? "우주의 에너지가 폭주하고 있습니다! 너무 많은 요청이 발생했습니다. 1분 뒤 아래 버튼을 눌러 다시 시도해주세요." : "The cosmos is overwhelmed with energy! Too many users are generating reports right now. Please wait 1 minute and try again below.");
          } else {
            setAiReport(isKo ? "우주의 에너지가 일시적으로 혼란스럽습니다. 아래 버튼을 눌러 다시 시도해 주세요." : "The cosmos is experiencing a temporary disturbance. Please try again below.");
          }
        }`;

c = c.replace(regex, newElse);
fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
