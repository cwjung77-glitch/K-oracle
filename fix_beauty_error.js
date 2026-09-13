const fs = require('fs');
let c = fs.readFileSync('src/components/features/BeautyDeepDiveReport.jsx', 'utf8');

c = c.replace(
  /const \[pdfUrl, setPdfUrl\] = useState\(\"\"\);/g,
  `const [pdfUrl, setPdfUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");`
);

c = c.replace(
  /if \(json\.success\) \{\n\s*setReportData\(json\.data\);\n\s*setPdfUrl\(json\.pdfUrl\);\n\s*\}/g,
  `if (json.success) {
            setReportData(json.data);
            setPdfUrl(json.pdfUrl);
          } else {
            if (json.isRateLimit) {
              setErrorMsg(lang === 'ko' ? "우주의 에너지가 폭주하고 있습니다! 1분 뒤에 새로고침하여 다시 시도해주세요." : "The cosmos is overwhelmed! Please wait 1 minute and refresh the page.");
            } else {
              setErrorMsg("AI Generation failed. Please try again later.");
            }
          }`
);

c = c.replace(
  /\} catch \(err\) \{\n\s*console\.error\(\"Failed to fetch beauty report\", err\);\n\s*\}/g,
  `} catch (err) {
          console.error("Failed to fetch beauty report", err);
          setErrorMsg("Network error. Please check your connection.");
        }`
);

c = c.replace(
  /if \(isGenerating \|\| !reportData\) \{\n\s*return \(\n\s*<div className=\"w-full bg-\[\#0a0a0a\] rounded-\[2rem\] border border-pink-500\/30 shadow-\[0_0_100px_rgba\(236,72,153,0\.1\)\] flex flex-col items-center justify-center py-40\">\n\s*<Loader2 className=\"animate-spin mb-4 text-pink-500\" size=\{48\} \/>\n\s*<p className=\"text-xl font-bold animate-pulse text-pink-400\">\n\s*\{lang === 'es' \? 'La estilista esta analizando tu tono\.\.\.' : 'The Stylist is analyzing your tone\.\.\.'\}\n\s*<\/p>\n\s*<\/div>\n\s*\);\n\s*\}/g,
  `if (errorMsg) {
      return (
        <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-pink-500/30 shadow-[0_0_100px_rgba(236,72,153,0.1)] flex flex-col items-center justify-center py-40 px-10 text-center">
          <p className="text-xl font-bold text-red-500 mb-4">{errorMsg}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-pink-500 text-white rounded-lg font-bold">Retry</button>
        </div>
      );
    }
    
    if (isGenerating || !reportData) {
      return (
        <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-pink-500/30 shadow-[0_0_100px_rgba(236,72,153,0.1)] flex flex-col items-center justify-center py-40">
          <Loader2 className="animate-spin mb-4 text-pink-500" size={48} />
          <p className="text-xl font-bold animate-pulse text-pink-400">
            {lang === 'es' ? 'La estilista esta analizando tu tono...' : 'The Stylist is analyzing your tone...'}
          </p>
        </div>
      );
    }`
);

fs.writeFileSync('src/components/features/BeautyDeepDiveReport.jsx', c);
