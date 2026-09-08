"use client";

"use client";

import React, { useState } from 'react';
import { Lock, ShieldCheck, Loader2, CreditCard, Smartphone } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, onSuccess, activeTab, selectedPlan }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState('card'); // 'card' or 'digital'

  if (!isOpen) return null;

  const isBeauty = activeTab === 'beauty';
  
  let productName = "2027 Full Destiny Report";
  let price = "$4.99";
  
  if (isBeauty) {
    productName = "K-Beauty Deep Dive Report";
    price = "$9.99";
  } else {
    if (selectedPlan === 'q4') {
      productName = "2027 Q4 Finale Report";
      price = "$2.99";
    } else if (selectedPlan === 'fullyear') {
      productName = "2028 Full Year Report";
      price = "$4.99";
    } else {
      productName = "27+28 Bundle Report";
      price = "$5.99";
    }
  }

  const themeColor = isBeauty ? "text-pink-400" : "text-yellow-500";
  const bgTheme = isBeauty ? "bg-pink-500" : "bg-yellow-500";
  const hoverTheme = isBeauty ? "hover:bg-pink-600" : "hover:bg-yellow-600";

  const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const email = e.target && e.target[0] ? e.target[0].value : 'user@example.com';
      // Call our Next.js API Route for Lemon Squeezy integration
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activeTab: activeTab,
          email: email,
          productId: isBeauty ? 'prod_beauty' : selectedPlan
        })
      });

      const data = await response.json();

      if (data.success) {
        console.log("Redirecting to Lemon Squeezy Checkout URL:", data.checkoutUrl);
        window.location.href = data.checkoutUrl;
        setIsProcessing(false);
        // onSuccess();
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert("Payment Error: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#0a0a0a] rounded-3xl border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-zinc-900/50 p-6 border-b border-zinc-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">K-ORACLE Premium</h2>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">✕</button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className={`text-sm font-bold tracking-widest uppercase mb-1 ${themeColor}`}>{productName}</p>
              <div className="text-4xl font-black text-white tracking-tighter">{price}</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handlePay} className="p-6">
          
          {/* Payment Method Toggle */}
          <div className="flex gap-2 mb-6">
            <button 
              type="button" 
              onClick={() => setMethod('card')}
              className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${method === 'card' ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-transparent border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
            >
              <CreditCard size={18} /> Card
            </button>
            <button 
              type="button" 
              onClick={() => setMethod('digital')}
              className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${method === 'digital' ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-transparent border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
            >
              <Smartphone size={18} /> Pay
            </button>
          </div>

          {method === 'card' ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2">Email</label>
                <input type="email" required placeholder="you@example.com" className="w-full px-4 py-3.5 bg-zinc-100 rounded-xl border-2 border-transparent focus:border-zinc-400 outline-none transition-all text-zinc-900 placeholder-zinc-500 font-medium shadow-inner" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2">Card Details</label>
                <div className="border-2 border-transparent rounded-xl overflow-hidden focus-within:border-zinc-400 transition-all bg-zinc-100 shadow-inner">
                  <input type="text" required placeholder="Card number" className="w-full px-4 py-3.5 border-b border-zinc-300 outline-none text-zinc-900 bg-transparent placeholder-zinc-500 font-medium" />
                  <div className="flex">
                    <input type="text" required placeholder="MM / YY" className="w-1/2 px-4 py-3.5 border-r border-zinc-300 outline-none text-zinc-900 bg-transparent placeholder-zinc-500 font-medium" />
                    <input type="text" required placeholder="CVC" className="w-1/2 px-4 py-3.5 outline-none text-zinc-900 bg-transparent placeholder-zinc-500 font-medium" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              <button type="button" onClick={handlePay} className="w-full py-4 rounded-xl bg-white text-black font-black flex items-center justify-center gap-2 text-lg hover:bg-zinc-200 transition-colors">
                  Pay
              </button>
              <button type="button" onClick={handlePay} className="w-full py-4 rounded-xl bg-zinc-800 text-white font-black flex items-center justify-center gap-2 text-lg hover:bg-zinc-700 transition-colors">
                G Pay
              </button>
              <div className="text-center text-xs text-zinc-500 font-medium">Fast and secure checkout</div>
            </div>
          )}

          {method === 'card' && (
            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full mt-8 ${bgTheme} ${hoverTheme} text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]`}
            >
              {isProcessing ? (
                <><Loader2 className="animate-spin" size={20} /> Processing...</>
              ) : (
                <><Lock size={18} /> Pay {price}</>
              )}
            </button>
          )}
          
          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-bold uppercase tracking-widest">
            <ShieldCheck size={14} /> Secured by Lemon Squeezy
          </div>
        </form>
      </div>
    </div>
  );
}
