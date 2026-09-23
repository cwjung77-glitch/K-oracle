const fs = require('fs');

// 1. Modify PersonalColor.jsx to store the selected palette in localStorage
let pcContent = fs.readFileSync('src/components/features/PersonalColor.jsx', 'utf8');
const searchString = `const randomPalette = shuffle(seasonData.colorPool).slice(0, 9);`;
if (pcContent.includes(searchString)) {
    const replaceString = `const randomPalette = shuffle(seasonData.colorPool).slice(0, 9);
          if (typeof window !== 'undefined') localStorage.setItem('k_vibe_user_palette', JSON.stringify(randomPalette));`;
    pcContent = pcContent.replace(searchString, replaceString);
    fs.writeFileSync('src/components/features/PersonalColor.jsx', pcContent);
    console.log("PersonalColor patched to save palette.");
}

// 2. Modify BeautyDeepDiveReport.jsx to load and display the palette
let bddrContent = fs.readFileSync('src/components/features/BeautyDeepDiveReport.jsx', 'utf8');
const bddrSearch = `export default function BeautyDeepDiveReport({ lang = "en" }) {`;
const bddrReplace = `export default function BeautyDeepDiveReport({ lang = "en" }) {
  const [userPalette, setUserPalette] = useState([]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem('k_vibe_user_palette');
      if (stored) setUserPalette(JSON.parse(stored));
    } catch(e) {}
  }, []);`;
bddrContent = bddrContent.replace(bddrSearch, bddrReplace);

// Inject the Palette UI in BeautyDeepDiveReport.jsx right before the <div className="grid md:grid-cols-2 gap-8 mb-12">
const injectUiSearch = `<div className="grid md:grid-cols-2 gap-8 mb-12">`;
const injectUiReplace = `{/* 9-Pan Signature Palette (UNLOCKED) */}
        {userPalette.length === 9 && (
          <div className="mb-12 border border-pink-500/30 bg-black/40 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(236,72,153,0.1)]">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-white flex items-center justify-center gap-2 mb-2">
                <Sparkles className="text-pink-400" /> FULL AURA PALETTE UNLOCKED
              </h3>
              <p className="text-zinc-400 font-medium">Your 9 signature colors, perfectly matched to your K-Beauty Vibe.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
              {userPalette.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] border-2 border-white/20 transition-all group-hover:scale-110" style={{backgroundColor: c.hex}}></div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white uppercase tracking-wider">{c.name}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">`;

bddrContent = bddrContent.replace(injectUiSearch, injectUiReplace);

fs.writeFileSync('src/components/features/BeautyDeepDiveReport.jsx', bddrContent);
console.log("BeautyDeepDiveReport patched to display palette.");
