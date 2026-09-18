import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove Korean text from idol names
content = re.sub(r'\([가-힣\s]+ - ([A-Za-z0-9_\-\s]+)\)', r'(\1)', content)
content = re.sub(r' \([가-힣]+\)', '', content)

# 2. Fix the Header (Title + 100% Match)
new_header = '''<div className="flex flex-col items-start md:items-start mb-8 w-full">
                    <h3 className={`text-[2.75rem] leading-[1.1] md:text-5xl font-black md:leading-none ${result.cardText} tracking-tighter drop-shadow-sm`}>
                      {result.season}
                    </h3>
                    <div className="mt-4 w-full">
                      <div className={`inline-block px-4 py-1.5 bg-white/30 backdrop-blur-md rounded-full text-[11px] md:text-xs font-black ${result.cardText} shadow-sm border border-white/40 uppercase tracking-wider`}>
                        100% Match
                      </div>
                    </div>
                  </div>'''

content = re.sub(r'<div className="flex justify-between items-start mb-8( relative)?">[\s\S]*?100% Match[\s\S]*?</div>\s*</div>', new_header, content)

# 3. Fix Palette Centering
# Original layout wrapper:
content = content.replace('<div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end">', '<div className="flex flex-col gap-6 md:flex-row md:gap-8 justify-between items-center md:items-end w-full">')
content = content.replace('<div className="flex flex-col gap-6 md:flex-row md:gap-8 justify-between items-start md:items-end w-full">', '<div className="flex flex-col gap-6 md:flex-row md:gap-8 justify-between items-center md:items-end w-full">')

# Idol Twin container
content = content.replace('<div className="flex-1">', '<div className="w-full md:flex-1 text-center md:text-left">')

# Idol Twin Icon & Title
content = content.replace('<div className="flex items-center gap-2 mb-2">', '<div className="flex items-center justify-center md:justify-start gap-2 mb-2">')

# Palette wrapper
content = content.replace('<div className="flex-1 md:text-right">', '<div className="w-full md:flex-1 text-center md:text-right">')

# Palette text
content = content.replace('tracking-widest uppercase`}>Your Palette</div>', 'tracking-widest uppercase text-center md:text-right`}>Your Palette</div>')

# Palette circles smaller on mobile
old_circles = '''className="w-8 h-8 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-[2.5px] border-white/90 transform hover:scale-110 transition-transform cursor-default"'''
new_circles = '''className="w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-2 md:border-[2.5px] border-white/90 transform hover:scale-110 transition-transform cursor-default"'''
content = content.replace(old_circles, new_circles)

# Palette box padding
old_palette_box = '''className="inline-flex gap-2 p-2.5 rounded-2xl bg-black/10 backdrop-blur-md shadow-inner border border-white/30"'''
new_palette_box = '''className="inline-flex gap-1.5 md:gap-2 p-2 md:p-2.5 rounded-2xl bg-black/10 backdrop-blur-md shadow-inner border border-white/30"'''
content = content.replace(old_palette_box, new_palette_box)

# 4. Add aura-card ID for Share Instagram
content = content.replace('className={`w-full p-8 md:p-10 rounded-[2rem]', 'id="aura-card" className={`w-full p-6 md:p-10 rounded-3xl')

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
