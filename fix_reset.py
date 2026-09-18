import re

with open('src/app/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add resetKey state
old_state = "  const [recentHistory, setRecentHistory] = useState([]);"
new_state = "  const [recentHistory, setRecentHistory] = useState([]);\n  const [resetKey, setResetKey] = useState(0);"
content = content.replace(old_state, new_state)

# 2. Update handleLogoClick
old_handle = '''  const handleLogoClick = () => {
    if (hasPaid) {
      if (window.confirm(lang === "ko" ? "PDF 마스터플랜을 다운로드하셨나요? 지금 메인으로 돌아가면 분석 결과가 영구적으로 삭제됩니다." : "Did you download your PDF Masterplan? Leaving now will permanently erase your results.")) {
        localStorage.removeItem("hasPaid");
        setHasPaid(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setLogoClicks(p => p + 1);
    if (logoClicks + 1 >= 5) setShowKo(true);
  };'''

new_handle = '''  const handleLogoClick = () => {
    if (hasPaid) {
      if (window.confirm(lang === "ko" ? "PDF 마스터플랜을 다운로드하셨나요? 지금 메인으로 돌아가면 분석 결과가 영구적으로 삭제됩니다." : "Did you download your PDF Masterplan? Leaving now will permanently erase your results.")) {
        localStorage.removeItem("hasPaid");
        setHasPaid(false);
        setResetKey(k => k + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setResetKey(k => k + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setLogoClicks(p => p + 1);
    if (logoClicks + 1 >= 5) setShowKo(true);
  };'''

content = content.replace(old_handle, new_handle)

# 3. Update tab buttons
old_tab_saju = "onClick={() => { setActiveTab('saju'); localStorage.setItem('purchasedProduct', 'saju'); setHasPaid(false); }}"
new_tab_saju = "onClick={() => { setActiveTab('saju'); localStorage.setItem('purchasedProduct', 'saju'); setHasPaid(false); setResetKey(k => k + 1); }}"
content = content.replace(old_tab_saju, new_tab_saju)

old_tab_beauty = "onClick={() => { setActiveTab('beauty'); localStorage.setItem('purchasedProduct', 'beauty'); setHasPaid(false); }}"
new_tab_beauty = "onClick={() => { setActiveTab('beauty'); localStorage.setItem('purchasedProduct', 'beauty'); setHasPaid(false); setResetKey(k => k + 1); }}"
content = content.replace(old_tab_beauty, new_tab_beauty)

# 4. Update component rendering keys
old_render = "{activeTab === 'saju' ? <SajuCompatibility onUnlockPremium={() => { setSelectedPlan('compatibility'); setShowCheckout(true); }} /> : <PersonalColor />}"
new_render = "{activeTab === 'saju' ? <SajuCompatibility key={`saju-${resetKey}`} onUnlockPremium={() => { setSelectedPlan('compatibility'); setShowCheckout(true); }} /> : <PersonalColor key={`beauty-${resetKey}`} />}"
content = content.replace(old_render, new_render)

with open('src/app/page.js', 'w', encoding='utf-8') as f:
    f.write(content)
