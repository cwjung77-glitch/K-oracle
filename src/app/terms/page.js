import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Terms of Service' };

export default function TermsofServicePage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans p-8 md:p-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">&larr; Back to Home</Link>
        <h1 className="text-4xl font-black text-white mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-zinc max-w-none">
          
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
  <p className="mb-4">By accessing K-Oracle, you agree to be bound by these Terms of Service.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Disclaimer</h2>
  <p className="mb-4">All fortune-telling, astrology (Saju), and beauty readings are for entertainment purposes only. They do not constitute medical, legal, or financial advice.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Intellectual Property</h2>
  <p className="mb-4">All content on this website is the property of K-Oracle and protected by copyright laws.</p>

        </div>
      </div>
    </div>
  );
}