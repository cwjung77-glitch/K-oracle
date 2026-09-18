import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will just write a regex that strips EVERYTHING inside parenthesis EXCEPT English letters, numbers, and hyphens if it is followed by a group name.
# Or better, just strip everything before the hyphen in the parenthesis!
# Match `(ANYTHING - GroupName)` -> `(GroupName)`
content = re.sub(r'\([^)]+?-\s*([A-Za-z0-9_\-\s]+)\)', r'(\1)', content)

# Match `(ANYTHING)` where ANYTHING does not contain any English letter.
content = re.sub(r' \([^A-Za-z0-9]+\)', '', content)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
