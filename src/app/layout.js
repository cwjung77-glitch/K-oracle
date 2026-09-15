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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
