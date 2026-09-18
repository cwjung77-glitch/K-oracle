import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_header = '''                  <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-8 w-full text-center md:text-left">
                    <h3 className={`text-[2.75rem] leading-[1.1] md:text-[5.5rem] font-black md:leading-[0.85] ${result.cardText} tracking-tighter drop-shadow-sm`}>
                      <span className="md:block">{result.season.split(' ')[0]}</span>
                      <span className="inline md:hidden"> </span>
                      <span className="md:block">{result.season.split(' ')[1]}</span>
                    </h3>
                    <div className="mt-4 md:mt-0 md:pt-2 w-full md:w-auto flex justify-center md:justify-end">'''

new_header = '''                  <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-8 w-full text-center md:text-left">
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
                    <div className="mt-5 md:mt-0 md:pt-2 w-full md:w-auto flex justify-center md:justify-end">'''

content = content.replace(old_header, new_header)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
