"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Flag the user as having paid successfully
    localStorage.setItem('hasPaid', 'true');
    
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900/50 p-10 rounded-3xl border border-yellow-500/30 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-yellow-500" size={40} />
        </div>
        <h1 className="text-3xl font-black text-white mb-4">Payment Successful!</h1>
        <p className="text-zinc-400 mb-8 text-lg">
          Your K-ORACLE premium report has been unlocked.
        </p>
        
        <div className="flex items-center justify-center gap-3 text-yellow-500 font-bold">
          <Loader2 className="animate-spin" size={20} />
          Redirecting to your reading in {countdown}...
        </div>
      </div>
    </div>
  );
}
