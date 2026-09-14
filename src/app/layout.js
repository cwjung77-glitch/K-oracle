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
  title: "K-Oracle | Ancient Saju & Cosmic Blueprint",
  description: "Discover your destiny, deep chemistry, and beauty aura with K-Oracle's premium Saju analysis.",
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
