'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function BlogNavbar() {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('kOracleLang');
    if (saved) setLang(saved);

    // Sync dropdown badge if current blog post URL has a specific language suffix
    if (pathname && pathname.startsWith('/blog/')) {
      const m = pathname.match(/-(en|es|th|id|ja|de|it|pt|pl|ru|vi|fr)$/);
      if (m && m[1]) {
        setLang(m[1]);
      }
    }
  }, [pathname]);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('kOracleLang', newLang);

    // If on a specific blog post, navigate directly to its localized sibling slug!
    if (pathname && pathname.startsWith('/blog/') && pathname !== '/blog') {
      const slug = pathname.replace('/blog/', '');
      const match = slug.match(/(.+)-(en|es|th|id|ja|de|it|pt|pl|ru|vi|fr)$/);
      if (match) {
        const baseSlug = match[1];
        router.push(`/blog/${baseSlug}-${newLang}`);
        return;
      }
    }

    window.location.reload();
  };

  return (
    <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-black tracking-widest cursor-pointer whitespace-nowrap">
          <span className="text-yellow-500">K</span>-ORACLE
        </Link>
        <div className="flex items-center gap-4 md:gap-6 text-sm font-bold">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">Saju &amp; Beauty App</Link>
          <Link href="/idols" className="text-zinc-400 hover:text-white transition-colors">Idols</Link>
          <Link href="/blog" className="text-yellow-500">Blog</Link>
          {mounted && (
            <LanguageSwitcher lang={lang} setLang={handleLangChange} showKo={false} />
          )}
        </div>
      </div>
    </nav>
  );
}
