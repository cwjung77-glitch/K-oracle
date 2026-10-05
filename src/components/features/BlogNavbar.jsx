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
  }, []);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('kOracleLang', newLang);
    
    // If we are on a specific post, redirect to the new language slug
    if (pathname && pathname.startsWith('/blog/') && pathname !== '/blog') {
      const slug = pathname.replace('/blog/', '');
      // Extract base slug (remove existing lang suffix if present)
      const match = slug.match(/(.+)-(en|es|th|id|ja|de|it|pt|pl|ru|vi|fr)$/);
      const baseSlug = match ? match[1] : slug;
      
      // Navigate to the localized slug. The BlogFilter logic ensures it falls back gracefully if it doesn't exist,
      // but the server route /blog/[slug] will return a 404 if the markdown file doesn't exist!
      // Wait, if we redirect them to /blog/slug-es and it doesn't exist, they will get a 404.
      // So actually, changing language on a post SHOULD redirect them to the index page /blog so they can see what's available!
      // OR we can just reload the index. Let's redirect to /blog.
      router.push('/blog');
      return;
    }
    
    // If on the blog index, just reload to let BlogFilter pick up the new language
    window.location.reload();
  };

  return (
    <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-black tracking-widest cursor-pointer whitespace-nowrap">
          <span className="text-yellow-500">K</span>-ORACLE
        </Link>
        <div className="flex items-center gap-4 md:gap-6 text-sm font-bold">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">App</Link>
          <Link href="/blog" className="text-yellow-500">Blog</Link>
          {mounted && (
            <LanguageSwitcher lang={lang} setLang={handleLangChange} showKo={false} />
          )}
        </div>
      </div>
    </nav>
  );
}
