const fs = require('fs');
const path = require('path');

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'fr', name: 'French' }
];

const postsToGenerate = [
  // --- 2026-11-07 ---
  {
    type: 'beauty',
    date: '2026-11-07',
    idol: 'NewJeans Haerin',
    group: 'NewJeans',
    member: 'Haerin',
    season: 'Summer Cool',
    korSeason: '여름 쿨톤',
    slugBase: 'newjeans-haerin-personal-color-analysis',
    tags: ['Personal Color', 'K-Beauty', 'Makeup', 'NewJeans', 'Haerin', 'Summer Cool'],
    details: 'Iconic cat-eyes, lavender water-glow, dusty berry-rose lips, cool ash accents, ethereal summer mute radiance.'
  },
  {
    type: 'beauty',
    date: '2026-11-07',
    idol: 'NewJeans Danielle',
    group: 'NewJeans',
    member: 'Danielle',
    season: 'Autumn Warm',
    korSeason: '가을 웜톤',
    slugBase: 'newjeans-danielle-personal-color-analysis',
    tags: ['Personal Color', 'K-Beauty', 'Makeup', 'NewJeans', 'Danielle', 'Autumn Warm'],
    details: 'Disney princess aura, honey-gold skin, terracotta coral tints, caramel highlights, warm toasted peach glow.'
  },
  {
    type: 'saju',
    date: '2026-11-07',
    idol: 'RIIZE Eunseok',
    group: 'RIIZE',
    member: 'Eunseok',
    slugBase: 'riize-eunseok-saju-analysis',
    tags: ['Saju', 'Korean Astrology', 'Four Pillars of Destiny', 'RIIZE', 'Eunseok'],
    dob: '2001-03-19',
    details: 'Calm regal charisma, hidden comedic wit, strong grounding Earth and Metal stems, steadfast artistic discipline.'
  },
  {
    type: 'saju',
    date: '2026-11-07',
    idol: 'Stray Kids Seungmin',
    group: 'Stray Kids',
    member: 'Seungmin',
    slugBase: 'stray-kids-seungmin-saju-analysis',
    tags: ['Saju', 'Korean Astrology', 'Four Pillars of Destiny', 'Stray Kids', 'Seungmin'],
    dob: '2000-09-22',
    details: 'Relentless vocal perfectionism, crystalline precision, balanced Water and Metal pillars, enduring longevity and vocal power.'
  },

  // --- 2026-11-08 ---
  {
    type: 'beauty',
    date: '2026-11-08',
    idol: 'Stray Kids Hyunjin',
    group: 'Stray Kids',
    member: 'Hyunjin',
    season: 'Autumn Warm',
    korSeason: '가을 웜톤',
    slugBase: 'stray-kids-hyunjin-personal-color-analysis',
    tags: ['Personal Color', 'K-Beauty', 'Makeup', 'Stray Kids', 'Hyunjin', 'Autumn Warm'],
    details: 'Versace prince charisma, golden hour sultriness, smoky brick terracotta, bronzed contours, rich espresso waves.'
  },
  {
    type: 'beauty',
    date: '2026-11-08',
    idol: 'RIIZE Anton',
    group: 'RIIZE',
    member: 'Anton',
    season: 'Spring Warm',
    korSeason: '봄 웜톤',
    slugBase: 'riize-anton-personal-color-analysis',
    tags: ['Personal Color', 'K-Beauty', 'Makeup', 'RIIZE', 'Anton', 'Spring Warm'],
    details: 'Cello prince boyish glow, juicy peach glow tint, warm apricot blush, honeyed natural base, youthful spring radiance.'
  },
  {
    type: 'saju',
    date: '2026-11-08',
    idol: 'ZEROBASEONE Ricky',
    group: 'ZEROBASEONE',
    member: 'Ricky',
    slugBase: 'zerobaseone-ricky-saju-analysis',
    tags: ['Saju', 'Korean Astrology', 'Four Pillars of Destiny', 'ZEROBASEONE', 'Ricky'],
    dob: '2004-05-20',
    details: 'Young and Rich tall and handsome persona, blazing Fire star, sharp Metal precision, undeniable global visual starpower.'
  },
  {
    type: 'saju',
    date: '2026-11-08',
    idol: 'BOYNEXTDOOR Woonhak',
    group: 'BOYNEXTDOOR',
    member: 'Woonhak',
    slugBase: 'boynextdoor-woonhak-saju-analysis',
    tags: ['Saju', 'Korean Astrology', 'Four Pillars of Destiny', 'BOYNEXTDOOR', 'Woonhak'],
    dob: '2006-11-29',
    details: 'Infectious golden maknae vitality, overflowing creative Output stars, dynamic Fire and Wood energy, explosive stage cheer.'
  },

  // --- 2026-11-09 ---
  {
    type: 'beauty',
    date: '2026-11-09',
    idol: 'IVE Leeseo',
    group: 'IVE',
    member: 'Leeseo',
    season: 'Winter Cool',
    korSeason: '겨울 쿨톤',
    slugBase: 'ive-leeseo-personal-color-analysis',
    tags: ['Personal Color', 'K-Beauty', 'Makeup', 'IVE', 'Leeseo', 'Winter Cool'],
    details: 'High-contrast royal chic, vivid magenta and icy plum, obsidian black hair, crystal highlighter, sharp striking gaze.'
  },
  {
    type: 'beauty',
    date: '2026-11-09',
    idol: 'ENHYPEN Heeseung',
    group: 'ENHYPEN',
    member: 'Heeseung',
    season: 'Winter Cool',
    korSeason: '겨울 쿨톤',
    slugBase: 'enhypen-heeseung-personal-color-analysis',
    tags: ['Personal Color', 'K-Beauty', 'Makeup', 'ENHYPEN', 'Heeseung', 'Winter Cool'],
    details: 'Prada luxury edge, sharp contrast features, icy burgundy velvet tints, monochrome tailoring, cool vampy charisma.'
  },
  {
    type: 'saju',
    date: '2026-11-09',
    idol: 'NMIXX Jiwoo',
    group: 'NMIXX',
    member: 'Jiwoo',
    slugBase: 'nmixx-jiwoo-saju-analysis',
    tags: ['Saju', 'Korean Astrology', 'Four Pillars of Destiny', 'NMIXX', 'Jiwoo'],
    dob: '2005-04-13',
    details: 'Spring blossom energy, lightning-fast dance dexterity, resilient Wood Day Master with playful Fire sparks, versatile artistic soul.'
  },
  {
    type: 'saju',
    date: '2026-11-09',
    idol: 'TWS Kyungmin',
    group: 'TWS',
    member: 'Kyungmin',
    slugBase: 'tws-kyungmin-saju-analysis',
    tags: ['Saju', 'Korean Astrology', 'Four Pillars of Destiny', 'TWS', 'Kyungmin'],
    dob: '2007-10-02',
    details: 'Fresh high-energy charisma, razor-sharp rhythm, autumn Gold and Water harmony, fast-rising powerhouse stage presence.'
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callGemini(prompt, keys, keyIdxRef) {
  for (let attempt = 0; attempt < keys.length * 2; attempt++) {
    const key = keys[keyIdxRef.current % keys.length];
    keyIdxRef.current++;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 8192, temperature: 0.7 }
        })
      });

      const data = await res.json();
      if (data.error) {
        console.error(`API Error on key ...${key.slice(-4)}:`, data.error.message);
        await sleep(1500);
        continue;
      }

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.error(`Fetch exception on key ...${key.slice(-4)}:`, err.message);
      await sleep(2000);
    }
  }
  throw new Error("All Gemini API keys failed after multiple attempts.");
}

function cleanMarkdown(raw) {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```markdown')) {
    cleaned = cleaned.replace(/^```markdown\r?\n/, '').replace(/\r?\n```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\r?\n/, '').replace(/\r?\n```$/, '');
  }
  return cleaned.trim();
}

async function run() {
  const envPath = path.join(__dirname, '../.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const keyMatch = envContent.match(/GEMINI_API_KEY=(.+)/);
  if (!keyMatch) {
    console.error("GEMINI_API_KEY not found in .env.local");
    process.exit(1);
  }

  const keys = keyMatch[1].split(',').map(k => k.trim()).filter(Boolean);
  const keyIdxRef = { current: 0 };
  const blogDir = path.join(__dirname, '../src/content/blog');

  console.log(`=================================================================`);
  console.log(`Starting Batch Generation: 11/7, 11/8, 11/9 (12 Topics x 12 Langs = 144 Posts)`);
  console.log(`Using ${keys.length} API key(s) with gemini-2.5-flash`);
  console.log(`=================================================================\n`);

  let generatedCount = 0;
  let skippedCount = 0;

  for (let tIdx = 0; tIdx < postsToGenerate.length; tIdx++) {
    const post = postsToGenerate[tIdx];
    console.log(`\n------------------------------------------------------------`);
    console.log(`[${tIdx + 1}/${postsToGenerate.length}] ${post.date} | ${post.type.toUpperCase()} | ${post.idol}`);
    console.log(`------------------------------------------------------------`);

    for (const lang of languages) {
      const fileName = `${post.slugBase}-${lang.code}.md`;
      const filePath = path.join(blogDir, fileName);

      if (fs.existsSync(filePath)) {
        console.log(`  ✓ Skipping (already exists): ${fileName}`);
        skippedCount++;
        continue;
      }

      console.log(`  -> Generating ${fileName} (${lang.name})...`);

      let systemPrompt = '';
      if (post.type === 'beauty') {
        systemPrompt = `You are an expert K-Beauty consultant and Personal Color analyst for K-Oracle (thekoracle.com).
Write a high-end, editorial-grade Personal Color analysis blog post about ${post.idol} (${post.group} ${post.member}).
CRITICAL CONSISTENCY RULE: Official Personal Color is strictly **${post.season} (${post.korSeason})**.
Key stylistic visual nuances: ${post.details}.

CRITICAL LANGUAGE RULE: Write the ENTIRE blog post (title, excerpt, headings, body, table, and FAQ) perfectly in ${lang.name}. Only keep the YAML keys in English (title:, slug:, date:, excerpt:, author:, tags:).

CRITICAL STRUCTURE RULE:
1. Standard Markdown with YAML frontmatter.
2. ONLY use ## for main section headers. DO NOT use ### for main headers.
3. Must use a Markdown table for makeup/hair recommendations.
4. Headers sequence (localized into ${lang.name}):
## TL;DR (Quick Answer)
## Visual Proof: Best vs Worst Styling
## Makeup & Hair Recipe (Must use Markdown Table with columns: Category | Recommended Shade / Product Type | Why It Works)
## Frequently Asked Questions (Use ### for each question)

Anti-bot/Tone: Professional luxury beauty editor tone, no robotic filler words, never use "AI" or meta words like "SEO".

YAML Frontmatter format:
---
title: "Catchy Editorial Headline in ${lang.name}"
slug: "${post.slugBase}-${lang.code}"
date: "${post.date}"
excerpt: "Compelling 2-3 sentence meta summary in ${lang.name}."
author: "K-Oracle"
tags: ${JSON.stringify(post.tags)}
---`;
      } else {
        systemPrompt = `You are an authoritative Korean Saju (Four Pillars of Destiny) master and global cultural analyst for K-Oracle (thekoracle.com).
Write a captivating, deeply insightful Saju destiny analysis blog post about ${post.idol} (${post.group} ${post.member}).
Birth Date: ${post.dob}. Key astrological nuances: ${post.details}.

CRITICAL LANGUAGE RULE: Write the ENTIRE blog post (title, excerpt, headings, body, table, and FAQ) perfectly in ${lang.name}. Only keep the YAML keys in English (title:, slug:, date:, excerpt:, author:, tags:).

CRITICAL STRUCTURE RULE:
1. Standard Markdown with YAML frontmatter.
2. ONLY use ## for main section headers.
3. Headers sequence (localized into ${lang.name}):
## TL;DR (Quick Answer)
[Insert the exact callout block below]
## Cosmic Blueprint: ${post.idol}'s Four Pillars Chart (Must use Markdown Table: Pillar | Heavenly Stem | Earthly Branch | Elemental Metaphor)
## Deep Dive: The Core Energy
## The Path to Destiny
## Frequently Asked Questions (Use ### for each question)

Insert this block right after TL;DR:
> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.

Astrology Terms: Always use Korean romanization (Saju, Daewoon, Gap, Eul, Byeong, Jeong, Mu, Gi, Gyeong, Sin, Im, Gye / Ja, Chuk, In, Myo, Jin, Sa, Oh, Mi, Sin, Yu, Sul, Hae), NEVER Chinese Pinyin (no Bazi, no Jia, no Zi).

YAML Frontmatter format:
---
title: "Catchy Mystical Headline in ${lang.name}"
slug: "${post.slugBase}-${lang.code}"
date: "${post.date}"
excerpt: "Compelling 2-3 sentence meta summary in ${lang.name}."
author: "K-Oracle"
tags: ${JSON.stringify(post.tags)}
---`;
      }

      try {
        const rawContent = await callGemini(systemPrompt, keys, keyIdxRef);
        const finalContent = cleanMarkdown(rawContent);
        fs.writeFileSync(filePath, finalContent, 'utf8');
        console.log(`     ✓ Created: ${fileName} (${finalContent.length} bytes)`);
        generatedCount++;
        await sleep(1000); // polite rate limit spacing
      } catch (err) {
        console.error(`     ✗ Failed to generate ${fileName}:`, err.message);
      }
    }
  }

  console.log(`\n=================================================================`);
  console.log(`Batch Generation Finished! Generated: ${generatedCount}, Skipped: ${skippedCount}`);
  console.log(`=================================================================`);
}

run().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
