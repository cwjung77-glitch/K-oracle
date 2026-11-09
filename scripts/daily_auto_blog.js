const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

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

const seasonPresets = [
  { season: 'Spring Warm', korSeason: '봄 웜톤' },
  { season: 'Summer Cool', korSeason: '여름 쿨톤' },
  { season: 'Autumn Warm', korSeason: '가을 웜톤' },
  { season: 'Winter Cool', korSeason: '겨울 쿨톤' }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getTodayKST() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().split('T')[0];
}

function slugifyName(name) {
  return name.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function parseNameAndGroup(rawName) {
  const match = rawName.match(/^(.+?)\s*\((.+?)\)$/);
  if (match) {
    return { member: match[1].trim(), group: match[2].trim(), fullName: rawName };
  }
  return { member: rawName.trim(), group: 'K-Pop', fullName: rawName };
}

async function callGemini(prompt, keys, keyIdxRef) {
  for (let attempt = 0; attempt < keys.length * 3; attempt++) {
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
        console.error(`Gemini API key error (...${key.slice(-4)}):`, data.error.message);
        await sleep(2000);
        continue;
      }

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.error(`Fetch exception (...${key.slice(-4)}):`, err.message);
      await sleep(2500);
    }
  }
  throw new Error("All Gemini API keys exhausted or failed.");
}

function cleanMarkdown(raw) {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```markdown')) {
    cleaned = cleaned.replace(/^```markdown\r?\n/, '').replace(/\r?\n```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\r?\n/, '').replace(/\r?\n```$/, '');
  }
  cleaned = cleaned.trim();
  if (!cleaned.startsWith('---')) {
    cleaned = '---\n' + cleaned;
  }
  return cleaned;
}

async function main() {
  const todayStr = process.env.AUTO_DATE || getTodayKST();
  console.log(`\n=============================================================`);
  console.log(`🤖 K-ORACLE DAILY BLOG AUTO-PUBLISHER`);
  console.log(`📅 Target Date: ${todayStr} (KST)`);
  console.log(`=============================================================`);

  // Load API keys
  let apiKeysStr = process.env.GEMINI_API_KEY;
  if (!apiKeysStr) {
    try {
      const envPath = path.join(__dirname, '../.env.local');
      const envContent = fs.readFileSync(envPath, 'utf8');
      const m = envContent.match(/GEMINI_API_KEY=(.+)/);
      if (m) apiKeysStr = m[1].trim();
    } catch (e) {}
  }

  if (!apiKeysStr) {
    console.error("FATAL: GEMINI_API_KEY not found in environment or .env.local");
    process.exit(1);
  }

  const keys = apiKeysStr.split(',').map(k => k.trim()).filter(Boolean);
  const keyIdxRef = { current: 0 };
  const blogDir = path.join(__dirname, '../src/content/blog');
  const existingFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

  // Load idols DB
  const { idolsDB } = require('../src/data/idols');

  // Select 2 Saju and 2 Beauty idols that haven't been posted yet
  const sajuCandidates = [];
  const beautyCandidates = [];

  for (const idol of idolsDB) {
    const { member, group } = parseNameAndGroup(idol.name);
    const slugPart = `${slugifyName(group)}-${slugifyName(member)}`;
    const altSlugPart = slugifyName(member);

    const hasSaju = existingFiles.some(f => f.includes('saju') && (f.includes(slugPart) || f.includes(altSlugPart)));
    const hasBeauty = existingFiles.some(f => (f.includes('personal-color') || f.includes('beauty')) && (f.includes(slugPart) || f.includes(altSlugPart)));

    if (!hasSaju && sajuCandidates.length < 2) {
      sajuCandidates.push(idol);
    }
    if (!hasBeauty && beautyCandidates.length < 2 && !sajuCandidates.some(s => s.name === idol.name)) {
      beautyCandidates.push(idol);
    }

    if (sajuCandidates.length >= 2 && beautyCandidates.length >= 2) break;
  }

  console.log(`\nSelected Today's 4 Lineup:`);
  console.log(`  [Saju 1]:   ${sajuCandidates[0].name} (${sajuCandidates[0].dob})`);
  console.log(`  [Saju 2]:   ${sajuCandidates[1].name} (${sajuCandidates[1].dob})`);
  console.log(`  [Beauty 1]: ${beautyCandidates[0].name}`);
  console.log(`  [Beauty 2]: ${beautyCandidates[1].name}\n`);

  const tasks = [];

  // 1. Saju Posts
  for (const idol of sajuCandidates) {
    const { member, group } = parseNameAndGroup(idol.name);
    const slugBase = `${slugifyName(group)}-${slugifyName(member)}-saju-analysis`;
    tasks.push({
      type: 'saju',
      idol: `${group} ${member}`,
      group,
      member,
      dob: idol.dob,
      slugBase,
      tags: ['Saju', 'Korean Astrology', 'Four Pillars of Destiny', group, member]
    });
  }

  // 2. Beauty Posts
  for (let bIdx = 0; bIdx < beautyCandidates.length; bIdx++) {
    const idol = beautyCandidates[bIdx];
    const { member, group } = parseNameAndGroup(idol.name);
    const slugBase = `${slugifyName(group)}-${slugifyName(member)}-personal-color-analysis`;
    const seasonObj = seasonPresets[(bIdx + tasks.length) % seasonPresets.length];
    tasks.push({
      type: 'beauty',
      idol: `${group} ${member}`,
      group,
      member,
      season: seasonObj.season,
      korSeason: seasonObj.korSeason,
      slugBase,
      tags: ['Personal Color', 'K-Beauty', 'Makeup', group, member, seasonObj.season]
    });
  }

  let successCount = 0;

  for (let tIdx = 0; tIdx < tasks.length; tIdx++) {
    const task = tasks[tIdx];
    console.log(`\n[${tIdx + 1}/4] Processing ${task.type.toUpperCase()}: ${task.idol}...`);

    for (const lang of languages) {
      const fileName = `${task.slugBase}-${lang.code}.md`;
      const filePath = path.join(blogDir, fileName);

      if (fs.existsSync(filePath)) {
        console.log(`  - Exists: ${fileName}`);
        continue;
      }

      let systemPrompt = '';
      if (task.type === 'beauty') {
        systemPrompt = `You are an expert K-Beauty consultant and Personal Color analyst for K-Oracle (thekoracle.com).
Write an editorial-grade Personal Color analysis blog post about ${task.idol}.
Official Personal Color: **${task.season} (${task.korSeason})**.

CRITICAL LANGUAGE RULE: Write the entire post (title, excerpt, headings, body, table, and FAQ) perfectly in ${lang.name}. Only keep YAML keys in English.

CRITICAL STRUCTURE:
## TL;DR (Quick Answer)
## Visual Proof: Best vs Worst Styling
## Makeup & Hair Recipe (Must use Markdown Table: Category | Recommended Shade / Product Type | Why It Works)
## Frequently Asked Questions (Use ### for each question)

Frontmatter format:
---
title: "Catchy Editorial Headline in ${lang.name}"
slug: "${task.slugBase}-${lang.code}"
date: "${todayStr}"
excerpt: "Compelling 2-3 sentence meta summary in ${lang.name}."
author: "K-Oracle"
tags: ${JSON.stringify(task.tags)}
---`;
      } else {
        systemPrompt = `You are an authoritative Korean Saju master and global cultural analyst for K-Oracle (thekoracle.com).
Write a captivating Saju destiny analysis blog post about ${task.idol} (Born: ${task.dob}).

CRITICAL LANGUAGE RULE: Write the entire post perfectly in ${lang.name}. Only keep YAML keys in English.
Astrology Terms: Use Korean romanizations (Saju, Daewoon, Gap, Eul, Byeong, Jeong, Mu, Gi, Gyeong, Sin, Im, Gye / Ja, Chuk, In, Myo, Jin, Sa, Oh, Mi, Sin, Yu, Sul, Hae), NEVER Chinese Pinyin.

CRITICAL STRUCTURE:
## TL;DR (Quick Answer)

> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.

## Cosmic Blueprint: ${task.idol}'s Four Pillars Chart (Markdown Table: Pillar | Heavenly Stem | Earthly Branch | Elemental Metaphor)
## Deep Dive: The Core Energy
## The Path to Destiny
## Frequently Asked Questions (Use ### for each question)

Frontmatter format:
---
title: "Catchy Mystical Headline in ${lang.name}"
slug: "${task.slugBase}-${lang.code}"
date: "${todayStr}"
excerpt: "Compelling 2-3 sentence meta summary in ${lang.name}."
author: "K-Oracle"
tags: ${JSON.stringify(task.tags)}
---`;
      }

      try {
        const raw = await callGemini(systemPrompt, keys, keyIdxRef);
        const cleaned = cleanMarkdown(raw);
        // Validate with gray-matter
        const parsed = matter(cleaned);
        if (!parsed.data.title || !parsed.data.slug) {
          throw new Error("Frontmatter validation failed");
        }
        fs.writeFileSync(filePath, cleaned, 'utf8');
        console.log(`  ✓ Created: ${fileName}`);
        successCount++;
        await sleep(1000);
      } catch (err) {
        console.error(`  ✗ Error creating ${fileName}:`, err.message);
      }
    }
  }

  console.log(`\n=============================================================`);
  console.log(`✅ Daily Automation Complete: ${successCount} posts generated.`);
  console.log(`=============================================================\n`);
}

main().catch(err => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
