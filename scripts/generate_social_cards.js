const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Generates viral social media teaser cards (Instagram Carousel & TikTok slides)
// from generated K-Oracle blog posts.

function generateSocialCards() {
  const blogDir = path.join(__dirname, '../src/content/blog');
  const outDir = path.join(__dirname, '../public/social-cards');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const enFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('-en.md'));
  console.log(`Analyzing ${enFiles.length} English blog posts for viral social assets...`);

  const cardManifest = [];

  // Pick the top 20 most iconic posts
  const selected = enFiles.slice(-20);

  for (const fileName of selected) {
    const filePath = path.join(blogDir, fileName);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    const isBeauty = fileName.includes('personal-color') || fileName.includes('beauty');
    const title = data.title || '';
    const idol = data.tags ? data.tags.slice(3, 5).join(' ') : 'K-Pop Star';

    // Extract TL;DR or key points
    const tldrMatch = content.match(/## TL;DR[^\n]*\n+([\s\S]*?)(?=\n##|$)/);
    const hook = tldrMatch ? tldrMatch[1].replace(/\*\*/g, '').trim().slice(0, 180) + '...' : data.excerpt || '';

    const card = {
      slug: data.slug || fileName.replace('.md', ''),
      type: isBeauty ? 'BEAUTY' : 'SAJU',
      idol,
      title,
      hook,
      date: data.date,
      tags: data.tags || [],
      callToAction: isBeauty 
        ? "Get Your Cheongdam K-Beauty Tone Scan at thekoracle.com (Code: KVIBE777)"
        : "Check Your Cosmic Compatibility with Idol at thekoracle.com",
      socialFormat: "1080x1350 (IG Carousel)",
      slides: [
        { slide: 1, type: "COVER", headline: title, badge: isBeauty ? "K-BEAUTY PERSONAL COLOR" : "KOREAN ASTROLOGY (SAJU)" },
        { slide: 2, type: "ANALYSIS", text: hook },
        { slide: 3, type: "VERDICT", text: isBeauty ? "Best vs Worst Styling Palette" : "Four Pillars & Daewoon 10-Year Flow" },
        { slide: 4, type: "CTA", text: "Link in Bio: thekoracle.com", promoCode: "KVIBE777 (YesStyle)" }
      ]
    };

    cardManifest.push(card);
  }

  const manifestPath = path.join(outDir, 'viral_cards_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(cardManifest, null, 2), 'utf8');
  console.log(`✅ Viral social card manifest generated with ${cardManifest.length} viral cards at:`);
  console.log(`   ${manifestPath}`);
}

generateSocialCards();
