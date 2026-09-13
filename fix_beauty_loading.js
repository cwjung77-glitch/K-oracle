const fs = require('fs');
let c = fs.readFileSync('src/components/features/BeautyDeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

const oldBlock = `  if (isGenerating || !reportData) {
    return (
      <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-pink-500/30 shadow-[0_0_100px_rgba(236,72,153,0.1)] flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin mb-4 text-pink-500" size={48} />
        <p className="text-xl font-bold animate-pulse text-pink-400">
          {lang === 'es' ? 'La estilista esta analizando tu tono...' : 'The Stylist is analyzing your tone...'}
        </p>
      </div>
    );
  }`;

const newBlock = `  if (isGenerating || !reportData) {
    return (
      <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-pink-500/30 shadow-[0_0_100px_rgba(236,72,153,0.1)] flex flex-col items-center justify-center py-40">
        {!errorMsg ? (
          <>
            <Loader2 className="animate-spin mb-4 text-pink-500" size={48} />
            <p className="text-xl font-bold animate-pulse text-pink-400">
              {lang === 'es' ? 'La estilista esta analizando tu tono...' : 'The Stylist is analyzing your tone...'}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 max-w-md text-center px-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2 text-red-500">
              <AlertCircle size={32} />
            </div>
            <p className="text-xl font-bold text-zinc-300">
              {errorMsg}
            </p>
            <button onClick={fetchReport} className="px-8 py-4 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition-colors shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              Retry Generation (Already Paid)
            </button>
          </div>
        )}
      </div>
    );
  }`;

c = c.replace(/  if \(isGenerating \|\| !reportData\) \{\n\s*return \(\n\s*<div className="w-full bg-\[\#0a0a0a\][\s\S]*?<\/div>\n\s*\);\n\s*\}/, newBlock);

fs.writeFileSync('src/components/features/BeautyDeepDiveReport.jsx', c);
