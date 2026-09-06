"use client";

import React from 'react';
import { UserCircle2, AlertCircle } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm bg-[#0a0a0a] rounded-3xl border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-8 text-center relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
          >
            ✕
          </button>
          
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
            <UserCircle2 size={32} className="text-zinc-400" />
          </div>
          
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Login Coming Soon</h2>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
            <AlertCircle size={18} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200/80 leading-relaxed">
              Social login and account features will be available in the official launch. For this beta MVP, you can experience all free scans and premium reports without signing up!
            </p>
          </div>

          <div className="space-y-3 opacity-50 grayscale pointer-events-none">
            <div className="w-full py-3.5 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2">
              Continue with Apple
            </div>
            <div className="w-full py-3.5 rounded-xl bg-zinc-800 text-white font-bold flex items-center justify-center gap-2">
              Continue with Google
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-6 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
