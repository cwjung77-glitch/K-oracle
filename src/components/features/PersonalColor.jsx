"use client";

import React, { useState } from 'react';
import { Camera, Sparkles, CheckCircle2, ScanFace, Upload, Share2, Palette, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';

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
      kor: "遊??쒗넠",
      theme: "from-orange-200 via-yellow-100 to-amber-200",
      textColor: "text-orange-400",
      cardText: "text-orange-900",
      femaleIdols: ["Suzy", "Sana (TWICE)", "Joy (Red Velvet)", "Nayeon (TWICE)", "Minji (NewJeans)", "Eunchae (LE SSERAFIM)", "Rei (IVE)", "Winter (aespa)", "Chuu", "Yuqi ((G)I-DLE)", "Yeri (Red Velvet)", "Ningning (aespa)", "Sakura (LE SSERAFIM)", "Ryujin (ITZY)", "Yujin (Kep1er)", "Jiwon (fromis_9)", "YooA (Oh My Girl)", "Lia (ITZY)", "Dayeon (Kep1er)", "Tsuki (Billlie)"],
        maleIdols: ["V (BTS)", "Cha Eunwoo (ASTRO)", "Minhyun", "Jungwoo (NCT)", "Sunoo (ENHYPEN)", "Soobin (TXT)", "Jaehyun (BOYNEXTDOOR)", "DK (SEVENTEEN)", "Jeno (NCT)", "Doyoung (NCT)", "Rowoon", "Huening Kai (TXT)", "Taehyun (TXT)", "Jake (ENHYPEN)", "Anton (RIIZE)", "Eunseok (RIIZE)", "Seungkwan (SEVENTEEN)", "Hoshi (SEVENTEEN)", "Han (Stray Kids)", "Seungmin (Stray Kids)"],
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
        {name: "LANEIGE Neo Cushion Matte", shade: "#02 Ryan (Warm Beige)", price: "$24.00"},
        {name: "Etude Double Lasting Foundation", shade: "#Beige", price: "$28.50"},
        {name: "Innisfree Dewy Tint Lip Balm", shade: "#Natural Red", price: "$12.00"},
        {name: "Rom&nd Han All Flat Brow", shade: "#Mild Woody", price: "$10.50"},
        {name: "Beauty of Joseon Relief Sun", shade: "#Tone-up Sun Cream", price: "$21.00"}
      ]
    },
    {
      season: "SUMMER COOL",
      kor: "?щ쫫 荑⑦넠",
      theme: "from-pink-200 via-purple-100 to-blue-200",
      textColor: "text-pink-400",
      cardText: "text-indigo-900",
      femaleIdols: ["Wonyoung (IVE)", "Irene (Red Velvet)", "Chaewon (LE SSERAFIM)", "Hanni (NewJeans)", "Sullyoon (NMIXX)", "An Yujin (IVE)", "Miyeon ((G)I-DLE)", "Haerin (NewJeans)", "Isa (STAYC)", "Arin (Oh My Girl)", "Binnie (Oh My Girl)", "Wendy (Red Velvet)", "Yeseo (Kep1er)", "J (STAYC)", "Sieun (STAYC)", "Xiaoting (Kep1er)", "Jiwoo (NMIXX)", "Haewon (NMIXX)", "Seeun (STAYC)", "Natty (KISS OF LIFE)"],
      maleIdols: ["Jungkook (BTS)", "Wonbin (RIIZE)", "Beomgyu (TXT)", "Mark (NCT)", "Taemin (SHINee)", "Baekhyun (EXO)", "Joshua (SEVENTEEN)", "Sunghoon (ENHYPEN)", "Sohee (RIIZE)", "Renjun (NCT)", "Chenle (NCT)", "I.N (Stray Kids)", "Wonwoo (SEVENTEEN)", "Vernon (SEVENTEEN)", "Dino (SEVENTEEN)", "Jungwon (ENHYPEN)", "Ni-ki (ENHYPEN)", "Taesan (BOYNEXTDOOR)", "Leehan (BOYNEXTDOOR)", "Hyunsuk (TREASURE)"],
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
        {name: "LANEIGE Neo Cushion Matte", shade: "#01 Stone (Cool Ivory)", price: "$24.00"},
        {name: "Etude Play 101 Stick", shade: "#Cool Shading", price: "$19.00"},
        {name: "Innisfree Dewy Tint Balm", shade: "#02 Melon Coral", price: "$14.00"},
        {name: "Laneige Homme BB Cream", shade: "#Light Tone", price: "$26.00"},
        {name: "Etude Bare Edge Brow", shade: "#Light Gray", price: "$9.50"}
      ]
    },
    {
      season: "AUTUMN WARM",
      kor: "媛???쒗넠",
      theme: "from-amber-700 via-orange-800 to-red-900",
      textColor: "text-amber-500",
      cardText: "text-amber-100",
      femaleIdols: ["Jennie (BLACKPINK)", "Seulgi (Red Velvet)", "Kazuha (LE SSERAFIM)", "Danielle (NewJeans)", "Giselle (aespa)", "Ros챕 (BLACKPINK)", "Hwasa (MAMAMOO)", "Gaeul (IVE)", "Yeji (ITZY)", "Minnie ((G)I-DLE)", "Soyeon ((G)I-DLE)", "Lisa (BLACKPINK)", "Yunjin (LE SSERAFIM)", "Chaeryeong (ITZY)", "Momo (TWICE)", "Mina (TWICE)", "Tzuyu (TWICE)", "Jihyo (TWICE)", "Sumin (STAYC)", "Julie (KISS OF LIFE)"],
      maleIdols: ["Kai (EXO)", "Mingyu (SEVENTEEN)", "Yeonjun (TXT)", "Haechan (NCT)", "Hyunjin (Stray Kids)", "Jimin (BTS)", "Jeonghan (SEVENTEEN)", "Jay (ENHYPEN)", "Jaehyun (NCT)", "Johnny (NCT)", "Yuta (NCT)", "S.Coups (SEVENTEEN)", "Jun (SEVENTEEN)", "Bang Chan (Stray Kids)", "Changbin (Stray Kids)", "RM (BTS)", "J-Hope (BTS)", "Haruto (TREASURE)", "Yoshi (TREASURE)", "Asahi (TREASURE)"],
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
        {name: "LANEIGE Neo Cushion Matte", shade: "#03 Jeffrey (Deep Warm)", price: "$24.00"},
        {name: "Etude Contour Powder", shade: "#Warm Contour", price: "$22.00"},
        {name: "Innisfree Dewy Tint Lip Balm", shade: "#Brick Red", price: "$12.50"},
        {name: "Missha M Perfect Cover BB", shade: "#Natural", price: "$32.00"},
        {name: "Too Cool For School", shade: "#Artclass Shading", price: "$16.00"}
      ]
    },
    {
      season: "WINTER COOL",
      kor: "寃⑥슱 荑⑦넠",
      theme: "from-fuchsia-900 via-purple-900 to-indigo-950",
      textColor: "text-fuchsia-400",
      cardText: "text-fuchsia-100",
      femaleIdols: ["Karina (aespa)", "Jisoo (BLACKPINK)", "Chaeyoung (TWICE)", "Hyein (NewJeans)", "Yuna (ITZY)", "Leeseo (IVE)", "Shuhua ((G)I-DLE)", "Kyujin (NMIXX)", "Yoon (STAYC)", "Lily (NMIXX)", "Moonbyul (MAMAMOO)", "Solar (MAMAMOO)", "Eunbi (沅뚯?鍮?", "Liz (IVE)", "Bae (NMIXX)", "Jeongyeon (TWICE)", "Dahyun (TWICE)", "Seoyeon (fromis_9)", "Nakyung (fromis_9)", "Belle (KISS OF LIFE)"],
      maleIdols: ["Sehun (EXO)", "Taeyong (NCT)", "Felix (Stray Kids)", "Sungchan (RIIZE)", "Lee Know (Stray Kids)", "Suga (BTS)", "Minghao (SEVENTEEN)", "Heeseung (ENHYPEN)", "Shotaro (RIIZE)", "Jin (BTS)", "Ten (NCT)", "Xiaojun (WayV)", "Hendery (WayV)", "Woozi (SEVENTEEN)", "Woonhak (BOYNEXTDOOR)", "Riwoo (BOYNEXTDOOR)", "Jihoon (TREASURE)", "Junkyu (TREASURE)", "Doyoung (TREASURE)", "Jeongwoo (TREASURE)"],
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
        {name: "LANEIGE Neo Cushion Matte", shade: "#04 Damien (Cool Deep)", price: "$24.00"},
        {name: "Etude Double Lasting Foundation", shade: "#Cool Ivory", price: "$28.50"},
        {name: "Innisfree Dewy Tint Lip Balm", shade: "#Plum Red", price: "$12.00"},
        {name: "Missha M Perfect Cover BB", shade: "#Clear", price: "$35.00"},
        {name: "Wakemake Pen Liner", shade: "#02 Brown (Subtle)", price: "$14.00"}
      ]
    }
  ];

  const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());
  
  const [uploadedFile, setUploadedFile] = useState(null);
  const [gender, setGender] = useState('F');

  
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const handleShareInstagram = async () => {
    const card = document.getElementById('aura-card');
    if (!card) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(card, { backgroundColor: '#09090b', scale: 2, useCORS: true, allowTaint: true });
      canvas.toBlob(async (blob) => {
        if(!blob) { setIsDownloading(false); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'K-Oracle_AuraCard.png';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { try { document.body.removeChild(a); } catch(e){} }, 2000);
        setIsDownloading(false);
      }, 'image/png');
    } catch(e) { setIsDownloading(false); }
  };

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
    <div className="w-full max-w-md mx-auto bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-[0_0_50px_rgba(236,72,153,0.05)] relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold border border-pink-500/20 mb-4 tracking-widest uppercase">
            <ScanFace size={14} /> Cosmic Tone Scanner
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight"><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 drop-shadow-md">K-Beauty</span> <span className="text-zinc-200">Personal Color</span></h2>
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
                <AlertTriangle size={16} className="inline-block mr-1.5 -mt-0.5" /> Pro Tip: Use a raw, unedited photo under natural daylight.<br/>Beauty filters and artificial lighting will alter your cosmic tone analysis.
              </p>
              <p className="text-sm text-zinc-400 font-medium tracking-wide">
                * Photos are processed locally and deleted instantly. We do not store your face data.
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* The Premium Aura Card */}
            <div id="aura-card" className={`w-full p-6 md:p-10 rounded-3xl bg-gradient-to-br ${result.theme} shadow-2xl relative overflow-hidden mb-8 border border-white/30 ring-1 ring-black/5`}>
              
              {/* Giant Background Text Watermark */}
              <div className="absolute -bottom-6 -right-4 text-[140px] font-black opacity-10 leading-none select-none tracking-tighter" style={{ color: 'white' }}>
                {result.season.split(' ')[0]}
              </div>

              {/* Decorative Glow Elements */}
              <div data-html2canvas-ignore="true" className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
              <div data-html2canvas-ignore="true" className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-black/20 rounded-full blur-[80px]"></div>
              
              {/* Premium SVG Noise Texture */}
              <div data-html2canvas-ignore="true" className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
              
              <div className="relative z-10">
                {/* Official Branding Header for Social Sharing Context */}
                <div className={`flex items-center gap-2 mb-6 ${result.cardText} opacity-60`}>
                  <ScanFace size={14} />
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase">K-Beauty Personal Color Analysis</span>
                </div>

                <div className="flex flex-col items-center mb-8 w-full text-center">
                    <h3 className={`text-[2.75rem] leading-[1.1] md:text-5xl font-black md:leading-none ${result.cardText} tracking-tighter drop-shadow-sm`}>
                      {result.season}
                    </h3>
                    <div className="mt-4 w-full flex justify-center">
                      <div className={`inline-block px-4 py-1.5 bg-white/30 backdrop-blur-md rounded-full text-[11px] md:text-xs font-black ${result.cardText} shadow-sm border border-white/40 uppercase tracking-wider`}>
                        100% Match
                      </div>
                    </div>
                  </div>
                
                {/* Gradient Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent my-6 md:my-8"></div>
                
                <div className="flex flex-col gap-6 md:flex-row md:gap-8 justify-between items-start md:items-end">
                  <div className="w-full text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className={`${result.cardText} opacity-60`} size={14} />
                      <div className={`${result.cardText} opacity-70 text-xs font-bold tracking-widest uppercase`}>Your Idol Twin</div>
                    </div>
                    <div className={`text-3xl md:text-4xl font-black ${result.cardText} tracking-tight drop-shadow-sm leading-none`}>
                      {result.idol.split('(')[0].trim()}
                    </div>
                    <div className={`text-sm font-bold ${result.cardText} opacity-70 mt-2 tracking-wide`}>
                      ({result.idol.split('(')[1]}
                    </div>
                  </div>
                  
                  <div className="w-full text-center">
                    <div className={`${result.cardText} opacity-70 text-xs font-bold mb-3 tracking-widest uppercase text-center`}>Your Palette</div>
                    <div className="inline-flex flex-wrap gap-1.5 md:gap-2 p-2 md:p-2.5 rounded-2xl bg-black/10 backdrop-blur-md shadow-inner border border-white/30">
                      {result.bestColors.map((c, i) => (
                        <div key={i} className="w-6 h-6 md:w-8 md:h-8 shrink-0 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-2 md:border-[2.5px] border-white/90 transform hover:scale-110 transition-transform cursor-default" style={{backgroundColor: c.hex}}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button onClick={handleShareInstagram} disabled={isDownloading} className="w-full mb-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50">
              {isDownloading ? "GENERATING..." : <><Share2 size={18} /> SAVE AURA CARD (IMAGE)</>}
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
                <CheckCircle2 className="text-green-400" size={20} /> Your 5-Step Makeup Kit (YesStyle)
              </h4>
              <div className="space-y-3">
                {result.products.map((p, i) => {
                  let q = p.name.toLowerCase();
                  let brand = p.name.split(' ')[0];
                  if (q.includes('rom&nd') || q.includes('romand')) brand = 'romand';
                  else if (q.includes('peripera')) brand = 'peripera';
                  else if (q.includes('3ce')) brand = '3ce';
                  else if (q.includes('etude')) brand = 'etude';
                  else if (q.includes('too cool for school')) brand = 'too cool for school';
                  else if (q.includes('dasique')) brand = 'dasique';
                  else if (q.includes('clio')) brand = 'clio';
                  else if (q.includes('amuse')) brand = 'amuse';
                  else if (q.includes('laka')) brand = 'laka';
                  else if (q.includes('hince')) brand = 'hince';
                  else if (q.includes('wakemake')) brand = 'wakemake';
                  else if (q.includes('laneige')) brand = 'laneige';
                  else if (q.includes('innisfree')) brand = 'innisfree';
                  else if (q.includes('missha')) brand = 'missha';
                  else if (q.includes('beauty of joseon')) brand = 'beauty of joseon';

                  return (
                  <a key={i} href={`https://www.yesstyle.com/en/list.html?q=${encodeURIComponent(brand)}&rco=KVIBE777`} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-black/40 hover:bg-black/60 transition-colors border border-white/5 group relative overflow-hidden">
                    <div className={`w-14 h-14 rounded-xl shrink-0 bg-gradient-to-br ${result.theme} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                      <span className={`${result.cardText} font-black opacity-50`}>0{i+1}</span>
                    </div>
                    <div className="w-full text-center">
                      <div className="font-bold text-zinc-200 group-hover:text-white">{p.name}</div>
                      <div className="text-sm text-zinc-500 mt-1">{p.shade}</div>
                    </div>
                    <div className={`${result.textColor} font-bold`}>{p.price}</div>
                    
                    {/* Fake affiliate link UI hint */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                       <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-bold">BUY</span>
                    </div>
                  </a>
                  );
                })}
              </div>
              <p className="text-center text-xs text-zinc-500 mt-4">Disclosure: We earn a small commission from these links at no extra cost to you.</p>
            </div>

            <button onClick={() => setStep(1)} className="w-full mt-8 py-4 rounded-xl border border-zinc-700 hover:bg-white/5 transition-colors text-zinc-400 font-bold tracking-wide">
              RESCAN PHOTO
            </button>
          </div>
        )}
      </div>

      {generatedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md flex flex-col items-center">
            <button 
              onClick={() => setGeneratedImage(null)}
              className="absolute -top-12 right-0 text-white font-bold text-xl bg-white/20 w-10 h-10 rounded-full flex items-center justify-center"
            >
              ×
            </button>
            <div className="bg-white text-black font-black text-center py-2 px-6 rounded-t-2xl w-full">
              📸 LONG PRESS IMAGE TO SAVE
            </div>
            <img src={generatedImage} alt="Your Aura Card" className="w-full rounded-b-2xl shadow-2xl" />
            <div className="text-white/60 text-sm mt-4 text-center">
              If long press doesn't work, take a screenshot!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}