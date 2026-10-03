import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans p-8 md:p-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">&larr; Back to Home</Link>
        <h1 className="text-4xl font-black text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-zinc max-w-none">
          
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
  <p className="mb-4">Welcome to K-Oracle. We are committed to protecting your personal information and your right to privacy.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Information We Collect</h2>
  <p className="mb-4">We do not collect any personal information unless you voluntarily provide it to us (e.g., when making a purchase or filling out a form). For payments, we use Gumroad, a secure third-party payment processor.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Third-Party Advertising (Google AdSense)</h2>
  <p className="mb-4">We use Google AdSense to display ads on our site. Google, as a third-party vendor, uses cookies to serve ads on our site based on prior visits. Users may opt-out of personalized advertising by visiting Google's Ads Settings.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Contact Us</h2>
  <p className="mb-4">If you have questions about this policy, you can contact us at cwjung77@gmail.com.</p>

        </div>
      </div>
    </div>
  );
}