"use client";

import React, { useState } from 'react';
import { Camera, Sparkles, CheckCircle2, ScanFace, Upload, Share2, Palette } from 'lucide-react';

export default function PersonalColor() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ... (colors array remains here, unchanged)
  // I will just keep the whole colors array in the output so nothing breaks.

  const colors = [
    {
      season: "SPRING WARM",
      kor: "봄 웜톤",
      theme: "from-orange-200 via-yellow-100 to-amber-200",
      textColor: "text-orange-400",
      cardText: "text-orange-900",
      femaleIdols: ["Suzy (수지)", "Sana (사나 - TWICE)", "Joy (조이 - Red Velvet)", "Nayeon (나연 - TWICE)", "Minji (민지 - NewJeans)", "Eunchae (은채 - LE SSERAFIM)", "Rei (레이 - IVE)", "Winter (윈터 - aespa)", "Chuu (츄)", "Yuqi (우기 - (G)I-DLE)", "Yeri (예리 - Red Velvet)", "Ningning (닝닝 - aespa)", "Sakura (사쿠라 - LE SSERAFIM)", "Ryujin (류진 - ITZY)", "Yujin (최유진 - Kep1er)", "Jiwon (지원 - fromis_9)", "YooA (유아 - Oh My Girl)", "Lia (리아 - ITZY)", "Dayeon (다연 - Kep1er)", "Tsuki (츠키 - Billlie)"],
      maleIdols: ["V (뷔 - BTS)", "Cha Eunwoo (차은우 - ASTRO)", "Minhyun (황민현)", "Jungwoo (정우 - NCT)", "Sunoo (선우 - ENHYPEN)", "Soobin (수빈 - TXT)", "Jaehyun (재현 - BOYNEXTDOOR)", "DK (도겸 - SEVENTEEN)", "Jeno (제노 - NCT)", "Doyoung (도영 - NCT)", "Rowoon (로운)", "Huening Kai (휴닝카이 - TXT)", "Taehyun (태현 - TXT)", "Jake (제이크 - ENHYPEN)", "Anton (앤톤 - RIIZE)", "Eunseok (은석 - RIIZE)", "Seungkwan (승관 - SEVENTEEN)", "Hoshi (호시 - SEVENTEEN)", "Han (한 - Stray Kids)", "Seungmin (승민 - Stray Kids)"],
      desc: "Like your idol skin twin! You look glowing in bright, warm, and peachy colors. Your aura is fresh, vibrant, and incredibly lovely.",
      colorPool: [{hex:'#FFB6C1', name:'Light Pink'}, {hex:'#FFA07A', name:'Salmon'}, {hex:'#FFDAB9', name:'Peach'}, {hex:'#F0E68C', name:'Khaki'}, {hex:'#98FB98', name:'Mint'}, {hex:'#FF8C00', name:'Dark Orange'}, {hex:'#FF7F50', name:'Coral'}, {hex:'#FFFFE0', name:'Light Yellow'}, {hex:'#ADFF2F', name:'Green Yellow'}, {hex:'#FF69B4', name:'Hot Pink'}, {hex:'#F4A460', name:'Sandy Brown'}, {hex:'#FFE4B5', name:'Moccasin'}],
      tagPool: [{bg:'bg-orange-500/20', text:'text-orange-400', label:'Peach'}, {bg:'bg-yellow-500/20', text:'text-yellow-400', label:'Coral'}, {bg:'bg-lime-500/20', text:'text-lime-400', label:'Fresh Green'}, {bg:'bg-amber-500/20', text:'text-amber-400', label:'Warm Gold'}],
      femaleProducts: [
        {name: "Rom&nd Juicy Lasting Tint", shade: "#09 Litchi Coral", price: "$11.99"},
        {name: "Dasique Shadow Palette", shade: "#03 Nude Potion", price: "$29.99"},
        {name: "Peripera Ink Mood Glowy", shade: "#01 Best Babe", price: "$10.50"},
        {name: "Clio Pro Eye Palette", shade: "#11 Walking on the Cosy Alley", price: "$28.00"},
        {name: "3CE Face Blush", shade: "#Peach Splash", price: "$18.00"}
      ],
      maleProducts: [
        {name: "BeReady Blue Cushion", shade: "#02 Ryan (Warm Beige)", price: "$24.00"},
        {name: "OBgE Natural Cover Foundation", shade: "#Beige", price: "$28.50"},
        {name: "DASHU Mens Perfect Lip Balm", shade: "#Natural Red", price: "$12.00"},
        {name: "Rom&nd Han All Flat Brow", shade: "#Mild Woody", price: "$10.50"},
        {name: "Round Lab Birch Juice", shade: "#Tone-up Sun Cream", price: "$21.00"}
      ]
    },
    {
      season: "SUMMER COOL",
      kor: "여름 쿨톤",
      theme: "from-pink-200 via-purple-100 to-blue-200",
      textColor: "text-pink-400",
      cardText: "text-indigo-900",
      femaleIdols: ["Wonyoung (원영 - IVE)", "Irene (아이린 - Red Velvet)", "Chaewon (채원 - LE SSERAFIM)", "Hanni (하니 - NewJeans)", "Sullyoon (설윤 - NMIXX)", "An Yujin (안유진 - IVE)", "Miyeon (미연 - (G)I-DLE)", "Haerin (해린 - NewJeans)", "Isa (아이사 - STAYC)", "Arin (아린 - Oh My Girl)", "Binnie (유빈 - Oh My Girl)", "Wendy (웬디 - Red Velvet)", "Yeseo (예서 - Kep1er)", "J (제이 - STAYC)", "Sieun (시은 - STAYC)", "Xiaoting (샤오팅 - Kep1er)", "Jiwoo (지우 - NMIXX)", "Haewon (해원 - NMIXX)", "Seeun (세은 - STAYC)", "Natty (나띠 - KISS OF LIFE)"],
      maleIdols: ["Jungkook (정국 - BTS)", "Wonbin (원빈 - RIIZE)", "Beomgyu (범규 - TXT)", "Mark (마크 - NCT)", "Taemin (태민 - SHINee)", "Baekhyun (백현 - EXO)", "Joshua (조슈아 - SEVENTEEN)", "Sunghoon (성훈 - ENHYPEN)", "Sohee (소희 - RIIZE)", "Renjun (런쥔 - NCT)", "Chenle (천러 - NCT)", "I.N (아이엔 - Stray Kids)", "Wonwoo (원우 - SEVENTEEN)", "Vernon (버논 - SEVENTEEN)", "Dino (디노 - SEVENTEEN)", "Jungwon (정원 - ENHYPEN)", "Ni-ki (니키 - ENHYPEN)", "Taesan (태산 - BOYNEXTDOOR)", "Leehan (이한 - BOYNEXTDOOR)", "Hyunsuk (현석 - TREASURE)"],
      desc: "Like your idol skin twin! Your skin looks flawless with pastel and cool-toned makeup. Your aura is elegant, clear, and sophisticated.",
      colorPool: [{hex:'#E6E6FA', name:'Lavender'}, {hex:'#D8BFD8', name:'Thistle'}, {hex:'#B0E0E6', name:'Powder Blue'}, {hex:'#FFC0CB', name:'Pink'}, {hex:'#E0FFFF', name:'Light Cyan'}, {hex:'#87CEFA', name:'Sky Blue'}, {hex:'#FFB6C1', name:'Light Pink'}, {hex:'#DDA0DD', name:'Plum'}, {hex:'#F0F8FF', name:'Alice Blue'}, {hex:'#E6E6FA', name:'Lavender'}, {hex:'#FFF0F5', name:'Lavender Blush'}, {hex:'#ADD8E6', name:'Light Blue'}],
      tagPool: [{bg:'bg-pink-500/20', text:'text-pink-400', label:'Pastel Pink'}, {bg:'bg-blue-500/20', text:'text-blue-400', label:'Lavender'}, {bg:'bg-indigo-500/20', text:'text-indigo-400', label:'Mute Blue'}, {bg:'bg-fuchsia-500/20', text:'text-fuchsia-400', label:'Cool Berry'}],
      femaleProducts: [
        {name: "Rom&nd Juicy Lasting Tint", shade: "#25 Bare Grape", price: "$11.99"},
        {name: "Dasique Shadow Palette", shade: "#16 Violet Knit", price: "$29.99"},
        {name: "Hince True Dimension Glow", shade: "#Clear", price: "$22.00"},
        {name: "Amuse Jel-Fit Tint", shade: "#06 Seoul Girl", price: "$18.50"},
        {name: "Laka Fruity Glam Tint", shade: "#103 Humming", price: "$14.00"}
      ],
      maleProducts: [
        {name: "BeReady Blue Cushion", shade: "#01 Stone (Cool Ivory)", price: "$24.00"},
        {name: "OBgE Mood Earth Stick", shade: "#Cool Shading", price: "$19.00"},
        {name: "Innisfree Dewy Tint Balm", shade: "#02 Melon Coral", price: "$14.00"},
        {name: "Laneige Homme BB Cream", shade: "#Light Tone", price: "$26.00"},
        {name: "Etude Bare Edge Brow", shade: "#Light Gray", price: "$9.50"}
      ]
    },
    {
      season: "AUTUMN WARM",
      kor: "가을 웜톤",
      theme: "from-amber-700 via-orange-800 to-red-900",
      textColor: "text-amber-500",
      cardText: "text-amber-100",
      femaleIdols: ["Jennie (제니 - BLACKPINK)", "Seulgi (슬기 - Red Velvet)", "Kazuha (카즈하 - LE SSERAFIM)", "Danielle (다니엘 - NewJeans)", "Giselle (지젤 - aespa)", "Rosé (로제 - BLACKPINK)", "Hwasa (화사 - MAMAMOO)", "Gaeul (가을 - IVE)", "Yeji (예지 - ITZY)", "Minnie (민니 - (G)I-DLE)", "Soyeon (소연 - (G)I-DLE)", "Lisa (리사 - BLACKPINK)", "Yunjin (윤진 - LE SSERAFIM)", "Chaeryeong (채령 - ITZY)", "Momo (모모 - TWICE)", "Mina (미나 - TWICE)", "Tzuyu (쯔위 - TWICE)", "Jihyo (지효 - TWICE)", "Sumin (수민 - STAYC)", "Julie (쥴리 - KISS OF LIFE)"],
      maleIdols: ["Kai (카이 - EXO)", "Mingyu (민규 - SEVENTEEN)", "Yeonjun (연준 - TXT)", "Haechan (해찬 - NCT)", "Hyunjin (현진 - Stray Kids)", "Jimin (지민 - BTS)", "Jeonghan (정한 - SEVENTEEN)", "Jay (제이 - ENHYPEN)", "Jaehyun (재현 - NCT)", "Johnny (쟈니 - NCT)", "Yuta (유타 - NCT)", "S.Coups (에스쿱스 - SEVENTEEN)", "Jun (준 - SEVENTEEN)", "Bang Chan (방찬 - Stray Kids)", "Changbin (창빈 - Stray Kids)", "RM (알엠 - BTS)", "J-Hope (제이홉 - BTS)", "Haruto (하루토 - TREASURE)", "Yoshi (요시 - TREASURE)", "Asahi (아사히 - TREASURE)"],
      desc: "Like your idol skin twin! You rock deep, rich, and earthy tones. Your aura is luxurious, chic, and effortlessly cool.",
      colorPool: [{hex:'#8B4513', name:'Saddle Brown'}, {hex:'#A0522D', name:'Sienna'}, {hex:'#D2691E', name:'Chocolate'}, {hex:'#CD853F', name:'Peru'}, {hex:'#F4A460', name:'Sandy Brown'}, {hex:'#D2B48C', name:'Tan'}, {hex:'#DEB887', name:'Burlywood'}, {hex:'#BC8F8F', name:'Rosy Brown'}, {hex:'#F5DEB3', name:'Wheat'}, {hex:'#800000', name:'Maroon'}, {hex:'#A52A2A', name:'Brown'}, {hex:'#DAA520', name:'Goldenrod'}],
      tagPool: [{bg:'bg-amber-500/20', text:'text-amber-400', label:'Brick Red'}, {bg:'bg-orange-900/20', text:'text-orange-400', label:'Mute Brown'}, {bg:'bg-yellow-700/20', text:'text-yellow-600', label:'Deep Gold'}, {bg:'bg-red-800/20', text:'text-red-400', label:'Chili'}],
      femaleProducts: [
        {name: "Peripera Ink Velvet", shade: "#23 Nutty Nude", price: "$9.99"},
        {name: "3CE Multi Eye Color Palette", shade: "#Overtake", price: "$35.00"},
        {name: "Etude Fixing Tint", shade: "#04 Ginger Milk Tea", price: "$12.00"},
        {name: "Rom&nd Zero Matte Lip", shade: "#09 Shell Nude", price: "$13.50"},
        {name: "Too Cool For School", shade: "#Artclass By Rodin", price: "$16.00"}
      ],
      maleProducts: [
        {name: "BeReady Blue Cushion", shade: "#03 Jeffrey (Deep Warm)", price: "$24.00"},
        {name: "OBgE Perfect Ombre Shading", shade: "#Warm Contour", price: "$22.00"},
        {name: "DASHU Double Appeal Lip", shade: "#Brick Red", price: "$12.50"},
        {name: "HERA Homme CC Cream", shade: "#Natural", price: "$32.00"},
        {name: "Too Cool For School", shade: "#Artclass Shading", price: "$16.00"}
      ]
    },
    {
      season: "WINTER COOL",
      kor: "겨울 쿨톤",
      theme: "from-fuchsia-900 via-purple-900 to-indigo-950",
      textColor: "text-fuchsia-400",
      cardText: "text-fuchsia-100",
      femaleIdols: ["Karina (카리나 - aespa)", "Jisoo (지수 - BLACKPINK)", "Chaeyoung (채영 - TWICE)", "Hyein (혜인 - NewJeans)", "Yuna (유나 - ITZY)", "Leeseo (이서 - IVE)", "Shuhua (슈화 - (G)I-DLE)", "Kyujin (규진 - NMIXX)", "Yoon (윤 - STAYC)", "Lily (릴리 - NMIXX)", "Moonbyul (문별 - MAMAMOO)", "Solar (솔라 - MAMAMOO)", "Eunbi (권은비)", "Liz (리즈 - IVE)", "Bae (배이 - NMIXX)", "Jeongyeon (정연 - TWICE)", "Dahyun (다현 - TWICE)", "Seoyeon (서연 - fromis_9)", "Nakyung (이나경 - fromis_9)", "Belle (벨 - KISS OF LIFE)"],
      maleIdols: ["Sehun (세훈 - EXO)", "Taeyong (태용 - NCT)", "Felix (필릭스 - Stray Kids)", "Sungchan (성찬 - RIIZE)", "Lee Know (리노 - Stray Kids)", "Suga (슈가 - BTS)", "Minghao (디에잇 - SEVENTEEN)", "Heeseung (희승 - ENHYPEN)", "Shotaro (쇼타로 - RIIZE)", "Jin (진 - BTS)", "Ten (텐 - NCT)", "Xiaojun (샤오쥔 - WayV)", "Hendery (헨드리 - WayV)", "Woozi (우지 - SEVENTEEN)", "Woonhak (운학 - BOYNEXTDOOR)", "Riwoo (리우 - BOYNEXTDOOR)", "Jihoon (지훈 - TREASURE)", "Junkyu (준규 - TREASURE)", "Doyoung (도영 - TREASURE)", "Jeongwoo (정우 - TREASURE)"],
      desc: "Like your idol skin twin! High-contrast, icy, and deep colors make your features pop. Your aura is striking, sharp, and intensely charismatic.",
      colorPool: [{hex:'#000000', name:'Black'}, {hex:'#000080', name:'Navy'}, {hex:'#800080', name:'Purple'}, {hex:'#FF00FF', name:'Magenta'}, {hex:'#DC143C', name:'Crimson'}, {hex:'#4B0082', name:'Indigo'}, {hex:'#8B008B', name:'Dark Magenta'}, {hex:'#9400D3', name:'Dark Violet'}, {hex:'#0000CD', name:'Medium Blue'}, {hex:'#C71585', name:'Medium Violet'}, {hex:'#FFFFFF', name:'White'}, {hex:'#00FFFF', name:'Cyan'}],
      tagPool: [{bg:'bg-purple-500/20', text:'text-purple-400', label:'Icy Plum'}, {bg:'bg-fuchsia-900/20', text:'text-fuchsia-400', label:'True Black'}, {bg:'bg-blue-900/20', text:'text-blue-400', label:'Navy'}, {bg:'bg-pink-700/20', text:'text-pink-300', label:'Magenta'}],
      femaleProducts: [
        {name: "Clio Dewy Syrup Tint", shade: "#04 Plum Noir", price: "$14.99"},
        {name: "Wakemake Soft Blurring Eye Palette", shade: "#02 Lively Blurring", price: "$32.00"},
        {name: "Rom&nd Blur Fudge Tint", shade: "#07 Cool Rose Up", price: "$13.00"},
        {name: "Hince Mood Enhancer Liquid", shade: "#09 Unlocked", price: "$19.00"},
        {name: "Dasique Water Blur Tint", shade: "#05 Berry Compote", price: "$14.50"}
      ],
      maleProducts: [
        {name: "BeReady Blue Cushion", shade: "#04 Damien (Cool Deep)", price: "$24.00"},
        {name: "OBgE Natural Cover", shade: "#Cool Ivory", price: "$28.50"},
        {name: "DASHU Mens Color Lip Balm", shade: "#Plum Red", price: "$12.00"},
        {name: "IOPE Men Anti-Aging BB", shade: "#Clear", price: "$35.00"},
        {name: "Wakemake Pen Liner", shade: "#02 Brown (Subtle)", price: "$14.00"}
      ]
    }
  ];

  const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());
  
  const [uploadedFile, setUploadedFile] = useState(null);
  const [gender, setGender] = useState('F');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setUploadedFile(file);
    }
  };

  const handleScan = () => {
    if (!imagePreview) return;
    setLoading(true);

    // REAL PIXEL RGB ANALYSIS
    const img = new Image();
    img.src = imagePreview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);
      
      const imgData = ctx.getImageData(0, 0, 50, 50).data;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < imgData.length; i += 4) {
        r += imgData[i];
        g += imgData[i + 1];
        b += imgData[i + 2];
      }
      const pixelCount = imgData.length / 4;
      r /= pixelCount;
      g /= pixelCount;
      b /= pixelCount;

      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
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
        const randomTags = shuffle(seasonData.tagPool).slice(0, 2);

        setResult({ 
          ...seasonData, 
          idol: randomIdol,
          bestColors: randomPalette,
          products: randomProducts,
          tags: randomTags
        });
        setStep(2);
      }, 2000); // Keep the UI delay for dramatic scanning effect
    };
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-[0_0_50px_rgba(236,72,153,0.05)] relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold border border-pink-500/20 mb-4 tracking-widest uppercase">
            <ScanFace size={14} /> Cosmic Tone Scanner
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">K-Beauty Personal Color</h2>
          <p className="text-zinc-200 mt-3 font-medium text-lg">Upload a selfie to decode your exact undertone and discover your K-Pop idol skin twin.</p>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            
            {/* Gender Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/5 p-1 rounded-full inline-flex border border-white/10 shadow-inner">
                <button 
                  onClick={() => setGender('F')}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${gender === 'F' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Female
                </button>
                <button 
                  onClick={() => setGender('M')}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${gender === 'M' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Male
                </button>
              </div>
            </div>

            <input 
              type="file" 
              id="camera-upload" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
            
            <label 
              htmlFor="camera-upload"
              className="w-full h-72 border border-zinc-800 rounded-2xl relative overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center cursor-pointer group shadow-inner block"
            >
              {/* Viewfinder UI */}
              <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-pink-500/40 transition-all group-hover:border-pink-400 group-hover:scale-110 z-20" />
              <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-pink-500/40 transition-all group-hover:border-pink-400 group-hover:scale-110 z-20" />
              <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-pink-500/40 transition-all group-hover:border-pink-400 group-hover:scale-110 z-20" />
              <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-pink-500/40 transition-all group-hover:border-pink-400 group-hover:scale-110 z-20" />
              
              {imagePreview ? (
                <img src={imagePreview} alt="Selfie preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : (
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                    <Upload className="text-pink-400" size={28} />
                  </div>
                  <p className="text-zinc-300 font-bold text-lg mb-1">Upload Bare-Face Selfie</p>
                  <p className="text-zinc-600 text-sm">Tap to browse or take a photo</p>
                </div>
              )}

              {/* Scanning Overlay (Active during loading) */}
              {loading && (
                <div className="absolute inset-0 bg-pink-500/20 flex flex-col items-center justify-center z-30 backdrop-blur-sm">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent absolute top-1/2 -translate-y-1/2 animate-scan shadow-[0_0_15px_rgba(236,72,153,1)]" />
                  <span className="text-white font-mono tracking-widest text-sm font-bold mt-16 animate-pulse drop-shadow-md">ANALYZING MELANIN LEVELS...</span>
                </div>
              )}
            </label>
            
            {imagePreview && !loading && (
              <button 
                onClick={handleScan}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:opacity-90 transition-opacity"
              >
                START COSMIC ANALYSIS
              </button>
            )}

            <div className="text-center space-y-4 mt-6">
              <p className="text-sm text-yellow-300 font-bold bg-yellow-500/20 inline-block px-5 py-2.5 rounded-xl border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.15)] leading-relaxed">
                ⚠️ Pro Tip: Use a raw, unedited photo under natural daylight.<br/>Beauty filters and artificial lighting will alter your cosmic tone analysis.
              </p>
              <p className="text-sm text-zinc-400 font-medium tracking-wide">
                * Photos are processed locally and deleted instantly. We do not store your face data.
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* The Premium Aura Card */}
            <div className={`w-full p-8 md:p-10 rounded-[2rem] bg-gradient-to-br ${result.theme} shadow-2xl relative overflow-hidden mb-8 border border-white/30 ring-1 ring-black/5`}>
              
              {/* Giant Background Text Watermark */}
              <div className="absolute -bottom-6 -right-4 text-[140px] font-black opacity-10 leading-none select-none tracking-tighter" style={{ color: 'white' }}>
                {result.season.split(' ')[0]}
              </div>

              {/* Decorative Glow Elements */}
              <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/40 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-black/20 rounded-full blur-[80px]"></div>
              
              {/* Premium SVG Noise Texture */}
              <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
              
              <div className="relative z-10">
                {/* Official Branding Header for Social Sharing Context */}
                <div className={`flex items-center gap-2 mb-6 ${result.cardText} opacity-60`}>
                  <ScanFace size={14} />
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase">K-Beauty Personal Color Analysis</span>
                </div>

                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <h3 className={`text-5xl md:text-6xl font-black ${result.cardText} tracking-tighter drop-shadow-sm leading-none`}>{result.season}</h3>
                    <div className={`${result.cardText} opacity-80 font-bold tracking-[0.2em] text-xs uppercase mt-2`}>{result.kor} • PERSONAL COLOR</div>
                  </div>
                  <div className={`px-4 py-1.5 bg-white/30 backdrop-blur-md rounded-full text-xs font-black ${result.cardText} shadow-sm border border-white/40 uppercase tracking-wider`}>
                    100% Match
                  </div>
                </div>
                
                {/* Gradient Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent my-8"></div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className={`${result.cardText} opacity-60`} size={14} />
                      <div className={`${result.cardText} opacity-70 text-xs font-bold tracking-widest uppercase`}>Your Idol Twin</div>
                    </div>
                    <div className={`text-4xl font-black ${result.cardText} tracking-tight drop-shadow-sm leading-none`}>
                      {result.idol.split('(')[0].trim()}
                    </div>
                    <div className={`text-sm font-bold ${result.cardText} opacity-70 mt-2 tracking-wide`}>
                      ({result.idol.split('(')[1]}
                    </div>
                  </div>
                  
                  <div className="flex-1 md:text-right">
                    <div className={`${result.cardText} opacity-70 text-xs font-bold mb-3 tracking-widest uppercase`}>Your Palette</div>
                    <div className="inline-flex gap-2 p-2.5 rounded-2xl bg-black/10 backdrop-blur-md shadow-inner border border-white/30">
                      {result.bestColors.map((c, i) => (
                        <div key={i} className="w-8 h-8 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-[2.5px] border-white/90 transform hover:scale-110 transition-transform cursor-default" style={{backgroundColor: c.hex}}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mb-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
              <Share2 size={18} /> SHARE AURA CARD TO INSTAGRAM
            </button>
            
            {/* Palette Breakdown */}
            <div className="mb-8 border-t border-zinc-800 pt-8">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <Palette className={result.textColor} size={20} /> Your Custom Palette
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {result.bestColors.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5 shadow-sm">
                    <div className="w-10 h-10 rounded-full shadow-inner border border-white/20" style={{backgroundColor: c.hex}}></div>
                    <div className="text-[10px] font-bold text-center text-zinc-400 leading-tight uppercase tracking-wider">{c.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Text */}
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-3 flex items-center gap-2 text-white">
                <Sparkles className={result.textColor} size={20} /> Tone Analysis
              </h4>
              <p className="text-zinc-300 leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/5">
                {result.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {result.tags.map((t, i) => (
                  <span key={i} className={`px-4 py-1.5 ${t.bg} ${t.text} rounded-full text-xs font-bold border border-white/5`}>{t.label}</span>
                ))}
              </div>
            </div>

            {/* Product Recommendations */}
            <div className="border-t border-zinc-800 pt-8">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <CheckCircle2 className="text-green-400" size={20} /> Your 5-Step Makeup Kit (Olive Young)
              </h4>
              <div className="space-y-3">
                {result.products.map((p, i) => (
                  <a key={i} href="https://global.oliveyoung.com/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-black/40 hover:bg-black/60 transition-colors border border-white/5 group relative overflow-hidden">
                    <div className={`w-14 h-14 rounded-xl shrink-0 bg-gradient-to-br ${result.theme} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                      <span className={`${result.cardText} font-black opacity-50`}>0{i+1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-zinc-200 group-hover:text-white">{p.name}</div>
                      <div className="text-sm text-zinc-500 mt-1">{p.shade}</div>
                    </div>
                    <div className={`${result.textColor} font-bold`}>{p.price}</div>
                    
                    {/* Fake affiliate link UI hint */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                       <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-bold">BUY</span>
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-center text-xs text-zinc-500 mt-4">Disclosure: We earn a small commission from these links at no extra cost to you.</p>
            </div>

            <button onClick={() => setStep(1)} className="w-full mt-8 py-4 rounded-xl border border-zinc-700 hover:bg-white/5 transition-colors text-zinc-400 font-bold tracking-wide">
              RESCAN PHOTO
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

