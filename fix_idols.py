import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='mbcs', errors='ignore') as f:
    content = f.read()

# Match parenthesis that contains a hyphen: `(something - something)` -> `(something)`
# Some characters might be just ?
content = re.sub(r'\([^A-Za-z0-9]+ - ([A-Za-z0-9_\-\s\(\)]+)\)', r'(\1)', content)

# Match parenthesis that only contains non-alphanumeric
content = re.sub(r' \([^A-Za-z0-9]+\)', '', content)
# Sometimes it's just `(???)`
content = re.sub(r' \(\?+\)', '', content)

old_idol_render = '''<div className={`text-sm font-bold ${result.cardText} opacity-70 mt-2 tracking-wide`}>
                        ({result.idol.split('(')[1]}
                      </div>'''

new_idol_render = '''{result.idol.includes('(') && (
                        <div className={`text-sm font-bold ${result.cardText} opacity-70 mt-2 tracking-wide`}>
                          ({result.idol.split('(')[1]}
                        </div>
                      )}'''

content = content.replace(old_idol_render, new_idol_render)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
