const fs = require('fs');

let c = fs.readFileSync('src/app/blog/[slug]/page.js', 'utf8');

const jsonLdCode = `
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
      />`;

c = c.replace('return (\n    <div className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-500 selection:text-black pb-24 overflow-hidden">', jsonLdCode);

fs.writeFileSync('src/app/blog/[slug]/page.js', c);
