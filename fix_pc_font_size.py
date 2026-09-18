import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_block = '''                  <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-8 w-full text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                      <h3 className={`text-[2.75rem] leading-[1.1] md:text-[5.5rem] font-black md:leading-[0.85] ${result.cardText} tracking-tighter drop-shadow-sm`}>
                        <span className="md:block">{result.season.split(' ')[0]}</span>
                        <span className="inline md:hidden"> </span>
                        <span className="md:block">{result.season.split(' ')[1]}</span>
                      </h3>
                      <div className={`mt-2 md:mt-4 text-xs md:text-sm font-bold tracking-[0.3em] uppercase ${result.cardText} opacity-80`}>
                        PERSONAL COLOR
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:pt-2 w-full md:w-auto flex justify-center md:justify-end">
                      <div className={`inline-block px-4 py-1.5 md:px-6 md:py-2 bg-white/30 backdrop-blur-md rounded-full text-[11px] md:text-sm font-black ${result.cardText} shadow-sm border border-white/40 uppercase tracking-wider`}>
                        100% Match
                      </div>
                    </div>
                  </div>'''

new_block = '''                  <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-8 w-full text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                      <h3 className={`text-[2.75rem] leading-[1.1] md:text-[4.25rem] font-black md:leading-[0.9] ${result.cardText} tracking-tighter drop-shadow-sm`}>
                        <span className="md:block">{result.season.split(' ')[0]}</span>
                        <span className="inline md:hidden"> </span>
                        <span className="md:block">{result.season.split(' ')[1]}</span>
                      </h3>
                      <div className={`mt-2 md:mt-4 text-xs md:text-sm font-bold tracking-[0.3em] uppercase ${result.cardText} opacity-80`}>
                        PERSONAL COLOR
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:pt-4 w-full md:w-auto flex justify-center md:justify-end">
                      <div className={`inline-block px-4 py-1.5 md:px-8 md:py-5 bg-white/30 backdrop-blur-md rounded-full md:rounded-3xl text-[11px] md:text-xl font-black ${result.cardText} shadow-sm border border-white/40 uppercase tracking-widest text-center leading-[1.1]`}>
                        <span className="inline md:block">100%</span>
                        <span className="inline md:hidden"> </span>
                        <span className="inline md:block">MATCH</span>
                      </div>
                    </div>
                  </div>'''

content = content.replace(old_block, new_block)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
