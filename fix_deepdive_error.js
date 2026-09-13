const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

c = c.replace(
  /setAiReport\(\"ERROR: The AI Engine failed to connect\. \\n\\nServer Response: \" \+ data\.error\);/,
  `setAiReport(isKo ? "우주의 에너지가 일시적으로 혼란스럽습니다. 잠시 후 다시 시도해 주세요." : "The cosmos is experiencing a temporary disturbance. Please try again in a few moments.");`
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
