'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PersonalColorPage() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    setIsUploading(true);
    // Simulate a brief loading state before showing a "coming soon" or payment prompt
    setTimeout(() => {
      alert("결제 및 AI 분석 모듈 연동 대기 중입니다. (PG사 연동 후 활성화 예정)");
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-500 selection:text-white pb-24 overflow-hidden">
      
      {/* Pink/Purple Cosmic Aurora Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-pink-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[80%] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      
      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-black tracking-widest cursor-pointer whitespace-nowrap">
            <span className="text-yellow-500">K</span>-ORACLE
          </Link>
          <div className="flex items-center gap-6 text-sm font-bold">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">App</Link>
            <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 font-bold text-sm uppercase tracking-widest">
            Premium AI Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">True Colors</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Upload a selfie and let our K-Beauty AI determine your exact 12-season personal color palette, best makeup shades, and K-Pop celebrity twin.
          </p>
        </div>

        {/* Upload & Pricing Section */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            {/* Left: Uploader */}
            <div className="flex-1 w-full">
              <div 
                className="border-2 border-dashed border-zinc-700 hover:border-pink-500/50 bg-black/50 rounded-2xl p-12 text-center transition-colors cursor-pointer group flex flex-col items-center justify-center min-h-[300px]"
                onClick={handleUploadClick}
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-zinc-800 group-hover:bg-pink-500/20 flex items-center justify-center transition-colors">
                  <svg className="w-8 h-8 text-zinc-400 group-hover:text-pink-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">Upload a Selfie</h3>
                <p className="text-sm text-zinc-500">Natural lighting, no makeup preferred.</p>
                <p className="text-xs text-zinc-600 mt-2">JPG, PNG up to 5MB</p>
              </div>
            </div>

            {/* Right: Info & CTA */}
            <div className="flex-1 w-full space-y-8">
              <div>
                <h2 className="text-3xl font-black mb-2">Premium Report</h2>
                <div className="text-4xl font-black text-pink-400 mb-4">$9.99 <span className="text-lg text-zinc-500 line-through ml-2">$29.99</span></div>
                <p className="text-zinc-400 leading-relaxed">
                  Get a comprehensive 15-page PDF report analyzing your contrast levels, undertones, and seasonal palette.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  'Exact 12-Season Classification',
                  'Best & Worst Color Swatches',
                  'K-Beauty Makeup Recommendations',
                  'Jewelry & Hair Color Guide',
                  'Your K-Pop Celebrity Twin'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                    <svg className="w-5 h-5 text-pink-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <button 
                onClick={handleUploadClick}
                disabled={isUploading}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black rounded-xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] disabled:opacity-50 flex justify-center items-center"
              >
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                  </span>
                ) : (
                  "Unlock My Colors ($9.99)"
                )}
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
