import re

with open("src/app/page.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove the DAILY tab from the grid switcher.
# We will use regex to find the tab switcher and replace it.
tab_switcher_regex = r'<div className="grid grid-cols-3 bg-black/50 p-1\.5 rounded-2xl border border-white/10 shadow-\[0_0_30px_rgba\(0,0,0,0\.5\)\] backdrop-blur-lg w-full max-w-md mx-auto">.*?<button\s+onClick=\{\(\) => \{ setActiveTab\(\'saju\'\)'
replacement_tab_switcher = """<div className="grid grid-cols-2 bg-black/50 p-1.5 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-lg w-full max-w-sm mx-auto">
            <button 
              onClick={() => { setActiveTab('saju');"""
content = re.sub(tab_switcher_regex, replacement_tab_switcher, content, flags=re.DOTALL)

# 2. Add the DAILY standalone banner ABOVE the tab switcher.
banner_html = """
          {/* Daily Fortune Standalone Banner */}
          <div className="max-w-sm mx-auto mb-6">
            <button 
              onClick={() => { setActiveTab('daily'); localStorage.setItem('purchasedProduct', 'daily'); setHasPaid(false); setResetKey(k => k + 1); }}
              className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 text-lg transition-all duration-300 shadow-xl ${
                activeTab === 'daily' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-400' 
                  : 'bg-zinc-900 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-500/60 hover:text-emerald-200'
              }`}
            >
              <Zap size={22} className={activeTab === 'daily' ? 'text-emerald-100 animate-pulse' : 'text-emerald-400'} />
              {lang === 'es' ? 'Fortuna Diaria Gratis' : 'FREE DAILY FORTUNE'}
            </button>
          </div>

"""
# Find where the tab switcher is and insert banner_html right before it.
if "Daily Fortune Standalone Banner" not in content:
    content = content.replace('{/* Custom Tab Switcher */}', banner_html + '{/* Custom Tab Switcher */}')

# 3. Fix the rendering logic below:
# Replace the ternary with proper conditionals.
old_render = "{activeTab === 'saju' ? <SajuCompatibility key={`saju-${resetKey}`} onUnlockPremium={() => { setSelectedPlan('compatibility'); setShowCheckout(true); }} /> : <PersonalColor key={`beauty-${resetKey}`} />}"
new_render = """
            {activeTab === 'daily' && (
              <DailyFortune 
                key={`daily-${resetKey}`}
                lang={lang}
                onGoToPremium={() => {
                  setActiveTab('saju');
                  localStorage.setItem('purchasedProduct', 'saju');
                  setTimeout(() => {
                    document.getElementById('premium-report')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              />
            )}
            {activeTab === 'saju' && <SajuCompatibility key={`saju-${resetKey}`} onUnlockPremium={() => { setSelectedPlan('compatibility'); setShowCheckout(true); }} />}
            {activeTab === 'beauty' && <PersonalColor key={`beauty-${resetKey}`} />}
"""
if "activeTab === 'daily' && (" not in content:
    content = content.replace(old_render, new_render)
else:
    # It might already have my botched patch, let's fix it manually.
    pass # Wait, my previous patch didn't add DailyFortune to the render block because the search string wasn't found. 
    # Let me ensure the old_render is replaced.
    content = content.replace(old_render, new_render)

# Let's double check if my botch patch added DailyFortune earlier.
# Looking at the previous grep, `<DailyFortune` wasn't added to the JSX, which means the python patch failed to find `old_render`.
# Oh! The old python script searched for "{activeTab === 'saju' && (" which didn't exist, it was a ternary! That's why it failed.
# Now I am correctly targeting the ternary.

with open("src/app/page.js", "w", encoding="utf-8") as f:
    f.write(content)
