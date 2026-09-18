import re

with open("src/app/page.js", "r", encoding="utf-8") as f:
    content = f.read()

# Hide Monetization section if activeTab === 'daily'
# Find: <section className="mt-32 border-t border-white/5 bg-zinc-950/50 py-24 px-6 relative" id="premium-report">
# Replace with: {activeTab !== 'daily' && ( <section ... > ... </section> )}

if "{activeTab !== 'daily' && (" not in content:
    start_tag = '<section className="mt-32 border-t border-white/5 bg-zinc-950/50 py-24 px-6 relative" id="premium-report">'
    new_start_tag = "{activeTab !== 'daily' && (\n        " + start_tag
    content = content.replace(start_tag, new_start_tag)
    
    # We need to find the matching closing </section>
    # It's right before {/* Footer Section */}
    footer_tag = '{/* Footer Section */}'
    new_footer_tag = '      )}\n\n      ' + footer_tag
    content = content.replace(footer_tag, new_footer_tag)

with open("src/app/page.js", "w", encoding="utf-8") as f:
    f.write(content)
