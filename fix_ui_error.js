const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

c = c.replace(
  /\} else \{ setAiReport\("ERROR: The AI Engine failed to connect\. \(Check if your GEMINI_API_KEY is valid\. Gemini keys usually start with AIzaSy\)\. \\n\\nServer Response: " \+ data\.error\); \}/,
  `} else {
    if (data.isRateLimit) {
      setAiReport(isKo 
        ? "우주의 에너지가 폭주하고 있습니다! 너무 많은 요청이 발생했습니다. 1분 뒤에 새로고침하여 다시 시도해주세요." 
        : "The cosmos is overwhelmed with energy! Too many users are generating reports right now. Please wait 1 minute and refresh the page.");
    } else {
      setAiReport("ERROR: The AI Engine failed to connect. \\n\\nServer Response: " + data.error); 
    }
  }`
);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
