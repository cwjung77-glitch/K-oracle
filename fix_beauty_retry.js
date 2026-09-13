const fs = require('fs');
let c = fs.readFileSync('src/components/features/BeautyDeepDiveReport.jsx', 'utf8').replace(/\r\n/g, '\n');

// 1. Extract fetchReport out of useEffect
if (!c.includes('const fetchReport = async () => {')) {
  c = c.replace(
    /useEffect\(\(\) => \{\n\s*const fetchReport = async \(\) => \{/g,
    `const fetchReport = async () => {`
  );
  c = c.replace(
    /fetchReport\(\);\n\s*\}, \[lang\]\);/g,
    `};\n\n  useEffect(() => {\n    fetchReport();\n  }, [lang]);`
  );
  
  // 2. Clear errorMsg before fetching
  c = c.replace(
    /setIsGenerating\(true\);/g,
    `setIsGenerating(true);\n        setErrorMsg("");`
  );
  
  // 3. Import AlertCircle
  c = c.replace(
    /import \{ Sparkles, Share2, Palette, ScanFace, CheckCircle2, Star, Download, Lock \} from 'lucide-react';/,
    `import { Sparkles, Share2, Palette, ScanFace, CheckCircle2, Star, Download, Lock, Loader2, AlertCircle } from 'lucide-react';`
  );

  // 4. Update the loading/error UI
  const oldLoading = `<Loader2 className="animate-spin mb-4 text-pink-500" size={48} />
          <p className="text-xl font-bold animate-pulse text-pink-400">
            {lang === 'es' ? 'La estilista esta analizando tu tono...' : 'The Stylist is analyzing your tone...'}
          </p>`;
          
  const newLoading = `{!errorMsg ? (
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
          )}`;
          
  c = c.replace(oldLoading, newLoading);
  
  fs.writeFileSync('src/components/features/BeautyDeepDiveReport.jsx', c);
}
