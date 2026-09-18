import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the corrupted text with AlertTriangle icon and text
old_tip = '?좑툘 Pro Tip:'
new_tip = '<AlertTriangle size={16} className="inline-block mr-1.5 -mt-0.5" /> Pro Tip:'

content = content.replace(old_tip, new_tip)

# Add AlertTriangle to imports
content = content.replace('Upload, Share2, Palette } from \'lucide-react\'', 'Upload, Share2, Palette, AlertTriangle } from \'lucide-react\'')

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
