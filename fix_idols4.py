import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the duplicate maleIdols issue!
# Example to fix:
# femaleIdols: [...],\n        maleIdols: [...],,\n      maleIdols: [...],\n        desc:

# Let's just find each whole block and replace it correctly.
# The block starts with `femaleIdols:` and ends right before `desc:`
content = re.sub(r'femaleIdols: \[.*?\],\n\s*maleIdols: \[.*?\],,\n\s*maleIdols: \[.*?\],\n\s*(desc: "Like your idol skin twin! You look glowing)',
    r'femaleIdols: ["Suzy", "Sana (TWICE)", "Joy (Red Velvet)", "Nayeon (TWICE)", "Minji (NewJeans)", "Eunchae (LE SSERAFIM)", "Rei (IVE)", "Winter (aespa)", "Chuu", "Yuqi ((G)I-DLE)", "Yeri (Red Velvet)", "Ningning (aespa)", "Sakura (LE SSERAFIM)", "Ryujin (ITZY)", "Yujin (Kep1er)", "Jiwon (fromis_9)", "YooA (Oh My Girl)", "Lia (ITZY)", "Dayeon (Kep1er)", "Tsuki (Billlie)"],\n        maleIdols: ["V (BTS)", "Cha Eunwoo (ASTRO)", "Minhyun", "Jungwoo (NCT)", "Sunoo (ENHYPEN)", "Soobin (TXT)", "Jaehyun (BOYNEXTDOOR)", "DK (SEVENTEEN)", "Jeno (NCT)", "Doyoung (NCT)", "Rowoon", "Huening Kai (TXT)", "Taehyun (TXT)", "Jake (ENHYPEN)", "Anton (RIIZE)", "Eunseok (RIIZE)", "Seungkwan (SEVENTEEN)", "Hoshi (SEVENTEEN)", "Han (Stray Kids)", "Seungmin (Stray Kids)"],\n        \1', content, flags=re.DOTALL)

content = re.sub(r'femaleIdols: \[.*?\],\n\s*maleIdols: \[.*?\],,\n\s*maleIdols: \[.*?\],\n\s*(desc: "Like your idol skin twin! Your skin looks flawless)',
    r'femaleIdols: ["Wonyoung (IVE)", "Irene (Red Velvet)", "Chaewon (LE SSERAFIM)", "Hanni (NewJeans)", "Sullyoon (NMIXX)", "An Yujin (IVE)", "Miyeon ((G)I-DLE)", "Haerin (NewJeans)", "Isa (STAYC)", "Arin (Oh My Girl)", "Binnie (Oh My Girl)", "Wendy (Red Velvet)", "Yeseo (Kep1er)", "J (STAYC)", "Sieun (STAYC)", "Xiaoting (Kep1er)", "Jiwoo (NMIXX)", "Haewon (NMIXX)", "Seeun (STAYC)", "Natty (KISS OF LIFE)"],\n        maleIdols: ["Jungkook (BTS)", "Wonbin (RIIZE)", "Beomgyu (TXT)", "Mark (NCT)", "Taemin (SHINee)", "Baekhyun (EXO)", "Joshua (SEVENTEEN)", "Sunghoon (ENHYPEN)", "Sohee (RIIZE)", "Renjun (NCT)", "Chenle (NCT)", "I.N (Stray Kids)", "Wonwoo (SEVENTEEN)", "Vernon (SEVENTEEN)", "Dino (SEVENTEEN)", "Jungwon (ENHYPEN)", "Ni-ki (ENHYPEN)", "Taesan (BOYNEXTDOOR)", "Leehan (BOYNEXTDOOR)", "Hyunsuk (TREASURE)"],\n        \1', content, flags=re.DOTALL)

content = re.sub(r'femaleIdols: \[.*?\],\n\s*maleIdols: \[.*?\],,\n\s*maleIdols: \[.*?\],\n\s*(desc: "Like your idol skin twin! You rock deep, rich)',
    r'femaleIdols: ["Jennie (BLACKPINK)", "Seulgi (Red Velvet)", "Kazuha (LE SSERAFIM)", "Danielle (NewJeans)", "Giselle (aespa)", "Rosé (BLACKPINK)", "Hwasa (MAMAMOO)", "Gaeul (IVE)", "Yeji (ITZY)", "Minnie ((G)I-DLE)", "Soyeon ((G)I-DLE)", "Lisa (BLACKPINK)", "Yunjin (LE SSERAFIM)", "Chaeryeong (ITZY)", "Momo (TWICE)", "Mina (TWICE)", "Tzuyu (TWICE)", "Jihyo (TWICE)", "Sumin (STAYC)", "Julie (KISS OF LIFE)"],\n        maleIdols: ["Kai (EXO)", "Mingyu (SEVENTEEN)", "Yeonjun (TXT)", "Haechan (NCT)", "Hyunjin (Stray Kids)", "Jimin (BTS)", "Jeonghan (SEVENTEEN)", "Jay (ENHYPEN)", "Jaehyun (NCT)", "Johnny (NCT)", "Yuta (NCT)", "S.Coups (SEVENTEEN)", "Jun (SEVENTEEN)", "Bang Chan (Stray Kids)", "Changbin (Stray Kids)", "RM (BTS)", "J-Hope (BTS)", "Haruto (TREASURE)", "Yoshi (TREASURE)", "Asahi (TREASURE)"],\n        \1', content, flags=re.DOTALL)

content = re.sub(r'femaleIdols: \[.*?\],\n\s*maleIdols: \[.*?\],,\n\s*maleIdols: \[.*?\],\n\s*(desc: "Like your idol skin twin! High-contrast, icy)',
    r'femaleIdols: ["Karina (aespa)", "Jisoo (BLACKPINK)", "Chaeyoung (TWICE)", "Hyein (NewJeans)", "Yuna (ITZY)", "Leeseo (IVE)", "Shuhua ((G)I-DLE)", "Kyujin (NMIXX)", "Yoon (STAYC)", "Lily (NMIXX)", "Moonbyul (MAMAMOO)", "Solar (MAMAMOO)", "Eunbi (Kwon Eunbi)", "Liz (IVE)", "Bae (NMIXX)", "Jeongyeon (TWICE)", "Dahyun (TWICE)", "Seoyeon (fromis_9)", "Nakyung (fromis_9)", "Belle (KISS OF LIFE)"],\n        maleIdols: ["Sehun (EXO)", "Taeyong (NCT)", "Felix (Stray Kids)", "Sungchan (RIIZE)", "Lee Know (Stray Kids)", "Suga (BTS)", "Minghao (SEVENTEEN)", "Heeseung (ENHYPEN)", "Shotaro (RIIZE)", "Jin (BTS)", "Ten (WayV)", "Xiaojun (WayV)", "Hendery (WayV)", "Woozi (SEVENTEEN)", "Woonhak (BOYNEXTDOOR)", "Riwoo (BOYNEXTDOOR)", "Jihoon (TREASURE)", "Junkyu (TREASURE)", "Doyoung (TREASURE)", "Jeongwoo (TREASURE)"],\n        \1', content, flags=re.DOTALL)


with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
