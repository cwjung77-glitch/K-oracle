import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Revert to max-w-2xl
content = content.replace('max-w-md mx-auto bg-black/60', 'max-w-2xl mx-auto bg-black/60')

# 2. Update Header
old_header_regex = r'<div className="flex flex-col items-center mb-8 w-full text-center">\s*<h3 className=\{`text-\[2\.75rem\] leading-\[1\.1\] md:text-5xl font-black md:leading-none \$\{result\.cardText\} tracking-tighter drop-shadow-sm`\}>\s*\{result\.season\}\s*</h3>\s*<div className="mt-4 w-full flex justify-center">\s*<div className=\{`inline-block px-4 py-1\.5 bg-white/30 backdrop-blur-md rounded-full text-\[11px\] md:text-xs font-black \$\{result\.cardText\} shadow-sm border border-white/40 uppercase tracking-wider`\}>\s*100% Match\s*</div>\s*</div>\s*</div>'

new_header = '''{/* Header Container */}
                  <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-8 w-full text-center md:text-left">
                    <h3 className={`text-[2.75rem] leading-[1.1] md:text-[5.5rem] font-black md:leading-[0.85] ${result.cardText} tracking-tighter drop-shadow-sm`}>
                      <span className="md:block">{result.season.split(' ')[0]}</span>
                      <span className="inline md:hidden"> </span>
                      <span className="md:block">{result.season.split(' ')[1]}</span>
                    </h3>
                    <div className="mt-4 md:mt-0 md:pt-2 w-full md:w-auto flex justify-center md:justify-end">
                      <div className={`inline-block px-4 py-1.5 md:px-6 md:py-2 bg-white/30 backdrop-blur-md rounded-full text-[11px] md:text-sm font-black ${result.cardText} shadow-sm border border-white/40 uppercase tracking-wider`}>
                        100% Match
                      </div>
                    </div>
                  </div>'''

content = re.sub(old_header_regex, new_header, content)

# 3. Update Bottom Layout (Idol + Palette)
old_bottom = '''<div className="flex flex-col gap-6 items-center w-full">
                    <div className="w-full text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className={`${result.cardText} opacity-60`} size={14} />
                        <div className={`${result.cardText} opacity-70 text-xs font-bold tracking-widest uppercase`}>Your Idol Twin</div>
                      </div>
                      <div className={`text-3xl md:text-4xl font-black ${result.cardText} tracking-tight drop-shadow-sm leading-none`}>
                        {result.idol.split('(')[0].trim()}
                      </div>
                      {result.idol.includes('(') && (
                        <div className={`text-sm font-bold ${result.cardText} opacity-70 mt-2 tracking-wide`}>
                          ({result.idol.split('(')[1]}
                        </div>
                      )}
                    </div>
                    
                    <div className="w-full text-center">
                      <div className={`${result.cardText} opacity-70 text-xs font-bold mb-3 tracking-widest uppercase text-center`}>Your Palette</div>
                      <div className="inline-flex flex-wrap gap-1.5 md:gap-2 p-2 md:p-2.5 rounded-2xl bg-black/10 backdrop-blur-md shadow-inner border border-white/30">
                        {result.bestColors.map((c, i) => (
                          <div key={i} className="w-6 h-6 md:w-8 md:h-8 shrink-0 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-2 md:border-[2.5px] border-white/90 transform hover:scale-110 transition-transform cursor-default" style={{backgroundColor: c.hex}}></div>
                        ))}
                      </div>
                    </div>
                  </div>'''

new_bottom = '''<div className="flex flex-col gap-6 md:flex-row md:gap-8 justify-between items-center md:items-end w-full">
                    <div className="w-full md:flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <Sparkles className={`${result.cardText} opacity-60`} size={14} />
                        <div className={`${result.cardText} opacity-70 text-xs font-bold tracking-widest uppercase`}>Your Idol Twin</div>
                      </div>
                      <div className={`text-3xl md:text-4xl font-black ${result.cardText} tracking-tight drop-shadow-sm leading-none`}>
                        {result.idol.split('(')[0].trim()}
                      </div>
                      {result.idol.includes('(') && (
                        <div className={`text-sm font-bold ${result.cardText} opacity-70 mt-2 tracking-wide`}>
                          ({result.idol.split('(')[1]}
                        </div>
                      )}
                    </div>
                    
                    <div className="w-full md:flex-1 flex flex-col items-center md:items-end mt-4 md:mt-0 text-center md:text-right">
                      <div className={`${result.cardText} opacity-70 text-xs font-bold mb-3 tracking-widest uppercase`}>Your Palette</div>
                      <div className="inline-flex flex-wrap justify-center md:justify-end gap-1.5 md:gap-2 p-2 md:p-2.5 rounded-2xl bg-black/10 backdrop-blur-md shadow-inner border border-white/30">
                        {result.bestColors.map((c, i) => (
                          <div key={i} className="w-6 h-6 md:w-8 md:h-8 shrink-0 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-2 md:border-[2.5px] border-white/90 transform hover:scale-110 transition-transform cursor-default" style={{backgroundColor: c.hex}}></div>
                        ))}
                      </div>
                    </div>
                  </div>'''

content = content.replace(old_bottom, new_bottom)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
