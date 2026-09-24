"use client";

import React, { useState } from 'react';
import { Lock, ShieldCheck, Loader2, CreditCard, Smartphone, AlertCircle } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, onSuccess, activeTab, selectedPlan }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  if (!isOpen) return null;

  const isBeauty = activeTab === 'beauty';
  const isDaily = activeTab === 'daily';
  
  let productName = "2026 Full Destiny Report";
  let price = "$4.99";
  
  if (isBeauty) {
    productName = "K-Beauty Deep Dive Report";
    price = "$9.99";
  } else if (isDaily || selectedPlan === 'daily') {
    productName = "Daily Cosmic Fortune";
    price = "$0.99";
  } else {
    if (selectedPlan === 'q4') {
      productName = "2026 Q4 Finale";
      price = "$4.99";
    } else if (selectedPlan === 'compatibility') {
      productName = "Deep Chemistry & Compatibility Report";
      price = "$4.99";
    } else if (selectedPlan === 'fullyear') {
      productName = "2027 Full Year";
      price = "$9.99";
    } else {
      productName = "26+27 VIP Masterplan";
      price = "$11.99";
    }
  }

  const themeColor = isBeauty ? "text-pink-400" : isDaily ? "text-fuchsia-400" : "text-yellow-500";
  const bgTheme = isBeauty ? "bg-pink-500" : isDaily ? "bg-fuchsia-500" : "bg-yellow-500";
  const hoverTheme = isBeauty ? "hover:bg-pink-600" : isDaily ? "hover:bg-fuchsia-600" : "hover:bg-yellow-600";

  const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg("");
    
    try {
      const email = e.target && e.target.email ? e.target.email.value : 'cwjung77@gmail.com';
      try {
        localStorage.setItem('purchasedProduct', activeTab);
        localStorage.setItem('purchasedPlan', selectedPlan || 'bundle');
      } catch(err) {
        console.warn("localStorage disabled", err);
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedPlan || 'bundle',
          email,
          activeTab
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setErrorMsg("Failed to initialize checkout. Please try again.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMsg(err.name === 'AbortError' ? "Request timed out. Please try again." : "Something went wrong. Please check your connection.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className={themeColor} size={24} />
              K-ORACLE Premium
            </h3>
            <button 
              onClick={onClose}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="mt-4">
            <p className={`text-sm font-black uppercase tracking-wider ${themeColor}`}>
              {productName}
            </p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">{price}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handlePay} className="p-6">
          <div className="space-y-4 animate-in fade-in duration-300">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              To ensure the highest level of security and global compliance, your payment will be processed securely by our official merchant of record, <strong className="text-white">Gumroad</strong>.
            </p>
            
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm flex gap-2 items-center">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                EMAIL FOR RECEIPT & ACCESS
              </label>
              <input 
                type="email" 
                name="email"
                required
                placeholder="cwjung77@gmail.com"
                defaultValue="cwjung77@gmail.com"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full flex items-center justify-center gap-2 ${bgTheme} text-zinc-900 font-black text-lg py-4 px-6 rounded-xl ${hoverTheme} transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(234,179,8,0.2)]`}
            >
              {isProcessing ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  <ShieldCheck size={24} />
                  Proceed to Secure Checkout
                </>
              )}
            </button>
          </div>
          
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-medium tracking-wide">
            <Lock size={12} />
            256-BIT SECURE ENCRYPTION
          </p>
        </form>
      </div>
    </div>
  );
}