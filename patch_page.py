import re

with open('src/app/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
import_daily = "import DailyFortune from '../components/features/DailyFortune';\n"
if "DailyFortune" not in content:
    content = content.replace("import BeautyDeepDiveReport from '../components/features/BeautyDeepDiveReport';", "import BeautyDeepDiveReport from '../components/features/BeautyDeepDiveReport';\n" + import_daily)

# Change default tab to daily if not set? Actually, let's keep it saju but add the button.
# Let's add the button to the tab switcher.
tab_switcher_regex = r'(<div className="grid grid-cols-[^"]+bg-black/50 p-1\.5 rounded-2xl border border-white/10 shadow-\[0_0_30px_rgba\(0,0,0,0\.5\)\] backdrop-blur-lg w-full max-w-[^"]+mx-auto">)'
new_tab_button = """
            <button 
              onClick={() => { setActiveTab('daily'); localStorage.setItem('purchasedProduct', 'daily'); setHasPaid(false); setResetKey(k => k + 1); }}
              className={`w-full py-3 sm:py-4 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-xs sm:text-base transition-all duration-300 ${
                activeTab === 'daily' 
                  ? 'bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-500/50' 
                  : 'hover:bg-white/5 text-zinc-400'
              }`}
            >
              <Zap size={18} className={activeTab === 'daily' ? 'text-emerald-200' : 'opacity-50'} />
              <span className="tracking-wide">DAILY</span>
            </button>
"""
if "setActiveTab('daily')" not in content:
    content = re.sub(tab_switcher_regex, r'\1' + new_tab_button, content)
    # Update grid-cols-2 to grid-cols-3
    content = content.replace('grid-cols-2 bg-black/50', 'grid-cols-3 bg-black/50')
    content = content.replace('max-w-sm mx-auto', 'max-w-md mx-auto')

# Render the component
render_saju = "{activeTab === 'saju' && ("
render_daily = """
        {activeTab === 'daily' && (
          <DailyFortune 
            key={`daily-${resetKey}`}
            lang={lang}
            onGoToPremium={() => {
              setActiveTab('saju');
              localStorage.setItem('purchasedProduct', 'saju');
              document.getElementById('premium-report')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
"""
if "<DailyFortune" not in content:
    content = content.replace(render_saju, render_daily + render_saju)

with open('src/app/page.js', 'w', encoding='utf-8') as f:
    f.write(content)
