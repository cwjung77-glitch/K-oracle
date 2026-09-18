import re

with open('src/app/layout.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_head = "<head>"
new_head = """<head>
        <meta name="fo-verify" content="a3dbfbf2-262f-4ef6-9a39-4937464bd3d2">"""

if 'name="fo-verify"' not in content:
    content = content.replace(old_head, new_head)
    
with open('src/app/layout.js', 'w', encoding='utf-8') as f:
    f.write(content)
