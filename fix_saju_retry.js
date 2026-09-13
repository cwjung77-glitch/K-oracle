const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

// 1. Add error state and make fetchReport available
if (!c.includes('const [error, setError] = useState(false);')) {
  c = c.replace(
    /const \[isGenerating, setIsGenerating\] = useState\(true\);/,
    `const [isGenerating, setIsGenerating] = useState(true);\n  const [error, setError] = useState(false);`
  );
  
  // 2. Extract fetchReport out of useEffect so it can be called manually
  c = c.replace(
    /useEffect\(\(\) => \{\n\s*const fetchReport = async \(\) => \{/g,
    `const fetchReport = async () => {`
  );
  c = c.replace(
    /fetchReport\(\);\n\s*\}, \[lang\]\);/,
    `};\n\n  useEffect(() => {\n    fetchReport();\n  }, [lang]);`
  );
  
  // 3. Update error handling in fetchReport
  c = c.replace(
    /setAiReport\(isKo \n?\s*\? ".*?1분 후에 새로고침하여 다시 시도해주세요." \n?\s*: "The cosmos is overwhelmed.*?refresh the page."\);/g,
    `setError(true); setAiReport(isKo ? "우주의 기운이 너무 강합니다! 1분 후 아래 버튼을 눌러 다시 시도해주세요." : "The cosmos is overwhelmed! Please wait 1 minute and try again.");`
  );
  c = c.replace(
    /setAiReport\(isKo \? "우주의 흐름이 혼탁합니다. 잠시 후 다시 시도해 주세요." : "The cosmos is experiencing a temporary disturbance. Please try again in a few moments."\);/g,
    `setError(true); setAiReport(isKo ? "우주의 흐름이 혼탁합니다. 잠시 후 아래 버튼을 눌러 다시 시도해 주세요." : "The cosmos is experiencing a temporary disturbance. Please try again below.");`
  );
  c = c.replace(
    /setAiReport\("Error generating report. Please contact support."\);/g,
    `setError(true); setAiReport("Error generating report. Please check your connection and try again.");`
  );
  c = c.replace(
    /setAiReport\(data\.reportText\);/g,
    `setError(false); setAiReport(data.reportText);`
  );
  
  // 4. Update the render
  c = c.replace(
    /\) : \(\n\s*aiReport\n\s*\)/g,
    `) : (\n                <div className="flex flex-col gap-4">\n                  <div className="whitespace-pre-wrap">{aiReport}</div>\n                  {error && (\n                    <button onClick={fetchReport} className="self-start px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.4)]">\n                      Retry Generation (Free)\n                    </button>\n                  )}\n                </div>\n              )`
  );
  
  fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
}
