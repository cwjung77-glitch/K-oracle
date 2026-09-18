import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_branding = 'className={`flex items-center gap-2 mb-6 ${result.cardText} opacity-60`}'
new_branding = 'className={`flex items-center justify-center text-center gap-2 mb-6 ${result.cardText} opacity-60`}'

content = content.replace(old_branding, new_branding)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
