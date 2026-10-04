import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://thekoracle.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "K-Oracle Saju | Ancient Korean Astrology & Cosmic Blueprint",
    template: "%s | K-Oracle Saju"
  },
  description: "Discover your true destiny, K-Pop idol compatibility, and beauty aura with K-Oracle Saju. Premium Four Pillars of Destiny (Saju) analysis.",
  keywords: ["k-oracle", "k-oracle saju", "saju oracle", "korean astrology", "kpop compatibility", "four pillars of destiny"],
  verification: {
    google: "NWFd1BBHryk6Y4wUhL95WOAa1s4CjMwolOT9ulW3KlQ",
  },
};

import { GoogleAnalytics } from '@next/third-parties/google'

import Script from 'next/script';


export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://thekoracle.com/#website',
      'url': 'https://thekoracle.com/',
      'name': 'K-Oracle & K-Beauty',
      'description': 'Premium Korean Saju Astrology and Personal Color Analysis.',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://thekoracle.com/#software',
      'name': 'K-Oracle Personal Color AI',
      'url': 'https://thekoracle.com/',
      'applicationCategory': 'LifestyleApplication',
      'applicationSubCategory': 'Beauty',
      'operatingSystem': 'Web',
      'description': 'AI Korean 12-season personal color analysis from a selfie. Find your perfect makeup and K-Pop celebrity twin.',
      'offers': {
        '@type': 'Offer',
        'price': '4.99',
        'priceCurrency': 'USD'
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="fo-verify" content="a3dbfbf2-262f-4ef6-9a39-4937464bd3d2" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5395815436840186" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <GoogleAnalytics gaId="G-VKB8KNJP9W" />
        <Script src="https://gumroad.com/js/gumroad.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}


