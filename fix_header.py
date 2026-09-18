import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Center the header
old_header = '''<div className="flex flex-col items-start md:items-start mb-8 w-full">
                    <h3 className={`text-[2.75rem] leading-[1.1] md:text-5xl font-black md:leading-none ${result.cardText} tracking-tighter drop-shadow-sm`}>
                      {result.season}
                    </h3>
                    <div className="mt-4 w-full">
                      <div className={`inline-block px-4 py-1.5 bg-white/30 backdrop-blur-md rounded-full text-[11px] md:text-xs font-black ${result.cardText} shadow-sm border border-white/40 uppercase tracking-wider`}>'''

new_header = '''<div className="flex flex-col items-center mb-8 w-full text-center">
                    <h3 className={`text-[2.75rem] leading-[1.1] md:text-5xl font-black md:leading-none ${result.cardText} tracking-tighter drop-shadow-sm`}>
                      {result.season}
                    </h3>
                    <div className="mt-4 w-full flex justify-center">
                      <div className={`inline-block px-4 py-1.5 bg-white/30 backdrop-blur-md rounded-full text-[11px] md:text-xs font-black ${result.cardText} shadow-sm border border-white/40 uppercase tracking-wider`}>'''

content = content.replace(old_header, new_header)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
