import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Contact Us' };

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans p-8 md:p-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">&larr; Back to Home</Link>
        <h1 className="text-4xl font-black text-white mb-8">Contact Us</h1>
        <div className="prose prose-invert prose-zinc max-w-none">
          
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Get in Touch</h2>
  <p className="mb-4">If you have any questions, business inquiries, or feedback regarding your premium reports, please contact our support team.</p>
  <p className="mb-4"><strong>Email:</strong> support@thekoracle.com</p>
  <p className="mb-4">We aim to respond to all inquiries within 24-48 hours.</p>

        </div>
      </div>
    </div>
  );
}