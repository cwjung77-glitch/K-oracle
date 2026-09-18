import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace corrupted Rose
content = re.sub(r'"Ros.*?\(BLACKPINK\)"', '"Rose (BLACKPINK)"', content)
content = re.sub(r'Ros챕', 'Rose', content)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
