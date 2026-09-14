import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/content/blog');
  try {
    const files = fs.readdirSync(contentDir);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => ({
        slug: file.replace('.md', ''),
      }));
  } catch(e) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const filePath = path.join(process.cwd(), 'src/content/blog', slug + '.md');
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      title: data.title + ' | K-Oracle Blog',
      description: data.excerpt,
      keywords: data.tags?.join(', '),
      openGraph: {
        title: data.title,
        description: data.excerpt,
        type: 'article',
      }
    };
  } catch (e) {
    return { title: 'Post Not Found | K-Oracle Blog' };
  }
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const filePath = path.join(process.cwd(), 'src/content/blog', slug + '.md');
  
  let content = '';
  let data = {};
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);
    content = parsed.content;
    data = parsed.data;
  } catch (err) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Post not found.</h1>
      </div>
    );
  }

  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.excerpt,
    author: {
      '@type': 'Organization',
      name: data.author,
    },
    datePublished: data.date,
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-500 selection:text-black pb-24 overflow-hidden">
      {/* AEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[80%] bg-yellow-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      
      <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-black tracking-widest cursor-pointer whitespace-nowrap">
            <span className="text-yellow-500">K</span>-ORACLE
          </Link>
          <div className="flex items-center gap-6 text-sm font-bold">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">App</Link>
            <Link href="/blog" className="text-yellow-500">Blog</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 relative z-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-yellow-500 transition-colors mb-12 font-bold text-sm">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        
        <article>
          <header className="mb-12">
            <div className="flex gap-2 mb-6 flex-wrap">
              {data.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-yellow-500 tracking-wider uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">
              {data.title}
            </h1>
            <div className="flex items-center gap-4 text-zinc-400 font-bold">
              <span>{data.author}</span>
              <span>&bull;</span>
              <span>{data.date}</span>
            </div>
          </header>

          <div className="prose prose-invert prose-yellow prose-lg max-w-none 
            prose-headings:font-black prose-headings:tracking-tight 
            prose-p:text-zinc-300 prose-p:leading-relaxed 
            prose-a:text-yellow-500 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>

        <div className="mt-20 p-8 bg-gradient-to-br from-zinc-900 to-black border border-yellow-500/30 rounded-3xl text-center">
          <h3 className="text-2xl font-black mb-4">Discover Your Own Cosmic Blueprint</h3>
          <p className="text-zinc-400 mb-6">Let K-Oracle decode your destiny just like the stars of K-Pop.</p>
          <Link href="/" className="inline-block px-8 py-4 bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            Analyze My Saju
          </Link>
        </div>
      </main>
    </div>
  );
}