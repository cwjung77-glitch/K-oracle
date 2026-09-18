import re

with open('src/components/features/PersonalColor.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Expand Color Pools (24 colors per season)
spring_old = "colorPool: [{hex:'#FFB6C1', name:'Light Pink'}, {hex:'#FFA07A', name:'Salmon'}, {hex:'#FFDAB9', name:'Peach'}, {hex:'#F0E68C', name:'Khaki'}, {hex:'#98FB98', name:'Mint'}, {hex:'#FF8C00', name:'Dark Orange'}, {hex:'#FF7F50', name:'Coral'}, {hex:'#FFFFE0', name:'Light Yellow'}, {hex:'#ADFF2F', name:'Green Yellow'}, {hex:'#FF69B4', name:'Hot Pink'}, {hex:'#F4A460', name:'Sandy Brown'}, {hex:'#FFE4B5', name:'Moccasin'}]"
spring_new = "colorPool: [{hex:'#FFB6C1', name:'Light Pink'}, {hex:'#FFA07A', name:'Salmon'}, {hex:'#FFDAB9', name:'Peach'}, {hex:'#F0E68C', name:'Khaki'}, {hex:'#98FB98', name:'Mint'}, {hex:'#FF8C00', name:'Dark Orange'}, {hex:'#FF7F50', name:'Coral'}, {hex:'#FFFFE0', name:'Light Yellow'}, {hex:'#ADFF2F', name:'Green Yellow'}, {hex:'#FF69B4', name:'Hot Pink'}, {hex:'#F4A460', name:'Sandy Brown'}, {hex:'#FFE4B5', name:'Moccasin'}, {hex:'#FFA500', name:'Orange'}, {hex:'#FF4500', name:'Orange Red'}, {hex:'#FFD700', name:'Gold'}, {hex:'#BDB76B', name:'Dark Khaki'}, {hex:'#32CD32', name:'Lime Green'}, {hex:'#00FA9A', name:'Medium Spring Green'}, {hex:'#FF1493', name:'Deep Pink'}, {hex:'#FFC0CB', name:'Pink'}, {hex:'#FFEFD5', name:'Papaya Whip'}, {hex:'#FFE4C4', name:'Bisque'}, {hex:'#FFDAB9', name:'Peach Puff'}, {hex:'#FFDEAD', name:'Navajo White'}]"
content = content.replace(spring_old, spring_new)

summer_old = "colorPool: [{hex:'#E6E6FA', name:'Lavender'}, {hex:'#D8BFD8', name:'Thistle'}, {hex:'#B0E0E6', name:'Powder Blue'}, {hex:'#FFC0CB', name:'Pink'}, {hex:'#E0FFFF', name:'Light Cyan'}, {hex:'#87CEFA', name:'Sky Blue'}, {hex:'#FFB6C1', name:'Light Pink'}, {hex:'#DDA0DD', name:'Plum'}, {hex:'#F0F8FF', name:'Alice Blue'}, {hex:'#E6E6FA', name:'Lavender'}, {hex:'#FFF0F5', name:'Lavender Blush'}, {hex:'#ADD8E6', name:'Light Blue'}]"
summer_new = "colorPool: [{hex:'#E6E6FA', name:'Lavender'}, {hex:'#D8BFD8', name:'Thistle'}, {hex:'#B0E0E6', name:'Powder Blue'}, {hex:'#FFC0CB', name:'Pink'}, {hex:'#E0FFFF', name:'Light Cyan'}, {hex:'#87CEFA', name:'Sky Blue'}, {hex:'#FFB6C1', name:'Light Pink'}, {hex:'#DDA0DD', name:'Plum'}, {hex:'#F0F8FF', name:'Alice Blue'}, {hex:'#FFF0F5', name:'Lavender Blush'}, {hex:'#ADD8E6', name:'Light Blue'}, {hex:'#B0C4DE', name:'Light Steel Blue'}, {hex:'#8A2BE2', name:'Blue Violet'}, {hex:'#9370DB', name:'Medium Purple'}, {hex:'#483D8B', name:'Dark Slate Blue'}, {hex:'#4682B4', name:'Steel Blue'}, {hex:'#5F9EA0', name:'Cadet Blue'}, {hex:'#AFEEEE', name:'Pale Turquoise'}, {hex:'#40E0D0', name:'Turquoise'}, {hex:'#00CED1', name:'Dark Turquoise'}, {hex:'#E0B0FF', name:'Mauve'}, {hex:'#D8BFD8', name:'Thistle'}, {hex:'#C8A2C8', name:'Lilac'}, {hex:'#CCCCFF', name:'Periwinkle'}]"
content = content.replace(summer_old, summer_new)

autumn_old = "colorPool: [{hex:'#8B4513', name:'Saddle Brown'}, {hex:'#A0522D', name:'Sienna'}, {hex:'#D2691E', name:'Chocolate'}, {hex:'#CD853F', name:'Peru'}, {hex:'#F4A460', name:'Sandy Brown'}, {hex:'#D2B48C', name:'Tan'}, {hex:'#DEB887', name:'Burlywood'}, {hex:'#BC8F8F', name:'Rosy Brown'}, {hex:'#F5DEB3', name:'Wheat'}, {hex:'#800000', name:'Maroon'}, {hex:'#A52A2A', name:'Brown'}, {hex:'#DAA520', name:'Goldenrod'}]"
autumn_new = "colorPool: [{hex:'#8B4513', name:'Saddle Brown'}, {hex:'#A0522D', name:'Sienna'}, {hex:'#D2691E', name:'Chocolate'}, {hex:'#CD853F', name:'Peru'}, {hex:'#F4A460', name:'Sandy Brown'}, {hex:'#D2B48C', name:'Tan'}, {hex:'#DEB887', name:'Burlywood'}, {hex:'#BC8F8F', name:'Rosy Brown'}, {hex:'#F5DEB3', name:'Wheat'}, {hex:'#800000', name:'Maroon'}, {hex:'#A52A2A', name:'Brown'}, {hex:'#DAA520', name:'Goldenrod'}, {hex:'#B8860B', name:'Dark Goldenrod'}, {hex:'#CD5C5C', name:'Indian Red'}, {hex:'#8B0000', name:'Dark Red'}, {hex:'#556B2F', name:'Dark Olive Green'}, {hex:'#6B8E23', name:'Olive Drab'}, {hex:'#808000', name:'Olive'}, {hex:'#BDB76B', name:'Dark Khaki'}, {hex:'#D2B48C', name:'Tan'}, {hex:'#F0E68C', name:'Khaki'}, {hex:'#EEE8AA', name:'Pale Goldenrod'}, {hex:'#FF8C00', name:'Dark Orange'}, {hex:'#FF7F50', name:'Coral'}]"
content = content.replace(autumn_old, autumn_new)

winter_old = "colorPool: [{hex:'#000000', name:'Black'}, {hex:'#000080', name:'Navy'}, {hex:'#800080', name:'Purple'}, {hex:'#FF00FF', name:'Magenta'}, {hex:'#DC143C', name:'Crimson'}, {hex:'#4B0082', name:'Indigo'}, {hex:'#8B008B', name:'Dark Magenta'}, {hex:'#9400D3', name:'Dark Violet'}, {hex:'#0000CD', name:'Medium Blue'}, {hex:'#C71585', name:'Medium Violet'}, {hex:'#FFFFFF', name:'White'}, {hex:'#00FFFF', name:'Cyan'}]"
winter_new = "colorPool: [{hex:'#000000', name:'Black'}, {hex:'#000080', name:'Navy'}, {hex:'#800080', name:'Purple'}, {hex:'#FF00FF', name:'Magenta'}, {hex:'#DC143C', name:'Crimson'}, {hex:'#4B0082', name:'Indigo'}, {hex:'#8B008B', name:'Dark Magenta'}, {hex:'#9400D3', name:'Dark Violet'}, {hex:'#0000CD', name:'Medium Blue'}, {hex:'#C71585', name:'Medium Violet'}, {hex:'#FFFFFF', name:'White'}, {hex:'#00FFFF', name:'Cyan'}, {hex:'#0000FF', name:'Blue'}, {hex:'#00BFFF', name:'Deep Sky Blue'}, {hex:'#1E90FF', name:'Dodger Blue'}, {hex:'#4169E1', name:'Royal Blue'}, {hex:'#8A2BE2', name:'Blue Violet'}, {hex:'#9932CC', name:'Dark Orchid'}, {hex:'#FF1493', name:'Deep Pink'}, {hex:'#C71585', name:'Medium Violet Red'}, {hex:'#800000', name:'Maroon'}, {hex:'#8B0000', name:'Dark Red'}, {hex:'#B22222', name:'Firebrick'}, {hex:'#F5F5F5', name:'White Smoke'}]"
content = content.replace(winter_old, winter_new)

# 2. Add seeded PRNG
shuffle_old = 'const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());'
shuffle_new = '''const seededRandom = (seed) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const seededShuffle = (array, seed) => {
    let arr = [...array];
    let m = arr.length, t, i;
    let s = seed;
    while (m) {
      i = Math.floor(seededRandom(s++) * m--);
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }
    return arr;
  };
  
  const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());'''
content = content.replace(shuffle_old, shuffle_new)

# 3. Use photoSeed for deterministic generation
logic_old = '''        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const warmth = r - b; // Red vs Blue dominance
  
        let targetSeason = "";
        if (warmth > 5) { // Warm Toned
          targetSeason = luminance > 120 ? "SPRING WARM" : "AUTUMN WARM";
        } else { // Cool Toned
          targetSeason = luminance > 120 ? "SUMMER COOL" : "WINTER COOL";
        }
  
        setTimeout(() => {
          setLoading(false);
          const seasonData = colors.find(c => c.season === targetSeason) || colors[0];
          if (typeof window !== 'undefined') localStorage.setItem('userPersonalColor', targetSeason);
          
          const idolsPool = gender === 'F' ? seasonData.femaleIdols : seasonData.maleIdols;
          const totalIdols = idolsPool.length;
          
          // HYBRID LOGIC: Create a user-specific restricted pool of 3 idols
          let userSeed = localStorage.getItem('k_vibe_user_seed');
          if (!userSeed) {
            userSeed = Math.floor(Math.random() * 10000).toString();
            localStorage.setItem('k_vibe_user_seed', userSeed);
          }
          
          // Deterministic offset based on user seed, season, and gender
          const offset = parseInt(userSeed, 10) + targetSeason.charCodeAt(0) + gender.charCodeAt(0);
          
          const restrictedPool = [
            idolsPool[offset % totalIdols],
            idolsPool[(offset + 3) % totalIdols],
            idolsPool[(offset + 7) % totalIdols]
          ];
  
          // Randomly pick from the restricted pool to simulate AI variance
          const randomIdol = restrictedPool[Math.floor(Math.random() * restrictedPool.length)];
          
          const productsPool = gender === 'F' ? seasonData.femaleProducts : seasonData.maleProducts;
          const randomProducts = shuffle(productsPool).slice(0, 5);
  
          const randomPalette = shuffle(seasonData.colorPool).slice(0, 5);
          const randomTags = shuffle(seasonData.tagPool).slice(0, 2);'''

logic_new = '''        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const warmth = r - b; // Red vs Blue dominance
        const photoSeed = Math.floor(luminance * 100 + warmth * 100 + g * 100); 
  
        let targetSeason = "";
        if (warmth > 5) { // Warm Toned
          targetSeason = luminance > 120 ? "SPRING WARM" : "AUTUMN WARM";
        } else { // Cool Toned
          targetSeason = luminance > 120 ? "SUMMER COOL" : "WINTER COOL";
        }
  
        setTimeout(() => {
          setLoading(false);
          const seasonData = colors.find(c => c.season === targetSeason) || colors[0];
          if (typeof window !== 'undefined') localStorage.setItem('userPersonalColor', targetSeason);
          
          const idolsPool = gender === 'F' ? seasonData.femaleIdols : seasonData.maleIdols;
          
          // Deterministic generation based strictly on the PHOTO's RGB values!
          // This means uploading the EXACT SAME photo gives the EXACT SAME results (trust).
          // But uploading a slightly different photo gives different results (fun/gacha).
          
          const deterministicIdolPool = seededShuffle(idolsPool, photoSeed);
          const randomIdol = deterministicIdolPool[0];
          
          const productsPool = gender === 'F' ? seasonData.femaleProducts : seasonData.maleProducts;
          const randomProducts = seededShuffle(productsPool, photoSeed).slice(0, 5);
  
          const randomPalette = seededShuffle(seasonData.colorPool, photoSeed).slice(0, 5);
          const randomTags = seededShuffle(seasonData.tagPool, photoSeed).slice(0, 2);'''

content = content.replace(logic_old, logic_new)

with open('src/components/features/PersonalColor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
