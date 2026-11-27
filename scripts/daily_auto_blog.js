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
  for (let attempt = 0; attempt < keys.length * 4; attempt++) {
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
        const text = data.candidates[0].content.parts[0].text;
        if (text.trim().length < 1200) {
          console.warn(`Response too short (${text.trim().length} chars), retrying...`);
          await sleep(1500);
          continue;
        }
        return text;
      }
    } catch (err) {
      console.error(`Fetch exception (...${key.slice(-4)}):`, err.message);
      await sleep(2500);
    }
  }
  throw new Error("All Gemini API keys exhausted or failed.");
}

function sanitizeAndRebuildMarkdown(raw, meta) {
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

  // First try direct gray-matter parse
  try {
    const parsed = matter(cleaned);
    if (parsed.data && parsed.data.title && parsed.data.slug && parsed.content.trim().length > 100) {
      // Rebuild frontmatter cleanly to guarantee 100% valid YAML
      const safeFm = [
        '---',
        `title: ${JSON.stringify(String(parsed.data.title).trim())}`,
        `slug: ${JSON.stringify(meta.slug)}`,
        `date: ${JSON.stringify(meta.date)}`,
        `excerpt: ${JSON.stringify(String(parsed.data.excerpt || meta.defaultExcerpt).trim())}`,
        `author: "K-Oracle"`,
        `tags: ${JSON.stringify(meta.tags)}`,
        '---',
        '',
        parsed.content.trim()
      ].join('\n');
      return safeFm;
    }
  } catch (e) {
    // Fallback regex extraction when inner quotes break YAML
  }

  // Regex fallback extraction
  const fmSplit = cleaned.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  let body = cleaned;
  let extractedTitle = meta.defaultTitle;
  let extractedExcerpt = meta.defaultExcerpt;

  if (fmSplit) {
    const fmBlock = fmSplit[1];
    body = fmSplit[2].trim();
    const tMatch = fmBlock.match(/^title:\s*(.+)$/m);
    if (tMatch) {
      extractedTitle = tMatch[1].trim().replace(/^["']|["']$/g, '').replace(/"/g, "'");
    }
    const eMatch = fmBlock.match(/^excerpt:\s*(.+)$/m);
    if (eMatch) {
      extractedExcerpt = eMatch[1].trim().replace(/^["']|["']$/g, '').replace(/"/g, "'");
    }
  }

  return [
    '---',
    `title: ${JSON.stringify(extractedTitle)}`,
    `slug: ${JSON.stringify(meta.slug)}`,
    `date: ${JSON.stringify(meta.date)}`,
    `excerpt: ${JSON.stringify(extractedExcerpt)}`,
    `author: "K-Oracle"`,
    `tags: ${JSON.stringify(meta.tags)}`,
    '---',
    '',
    body
  ].join('\n');
}

async function runForDate(todayStr, keys, keyIdxRef) {
  console.log(`\n=============================================================`);
  console.log(`🤖 K-ORACLE DAILY BLOG AUTO-PUBLISHER`);
  console.log(`📅 Target Date: ${todayStr} (KST)`);
  console.log(`=============================================================`);

  const blogDir = path.join(__dirname, '../src/content/blog');
  const existingFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const { idolsDB } = require('../src/data/idols');

  const sajuCandidates = [];
  const beautyCandidates = [];
  const usedGroupsToday = new Set();

  // Select 2 Saju and 2 Beauty idols with Group Diversity (4 distinct groups per day)
  for (const idol of idolsDB) {
    const { member, group } = parseNameAndGroup(idol.name);
    const groupSlug = slugifyName(group);
    const memberSlug = slugifyName(member);
    const slugPart = `${groupSlug}-${memberSlug}`;

    const hasSaju = existingFiles.some(
      f => f.includes('saju') && (f.startsWith(`${slugPart}-`) || (memberSlug.length > 2 && f.includes(`-${memberSlug}-saju`)))
    );
    const hasBeauty = existingFiles.some(
      f => (f.includes('personal-color') || f.includes('beauty')) && (f.startsWith(`${slugPart}-`) || (memberSlug.length > 2 && f.includes(`-${memberSlug}-personal-color`)))
    );

    if (!hasSaju && sajuCandidates.length < 2 && !usedGroupsToday.has(group)) {
      sajuCandidates.push(idol);
      usedGroupsToday.add(group);
      continue;
    }
    if (!hasBeauty && beautyCandidates.length < 2 && !usedGroupsToday.has(group) && !sajuCandidates.some(s => s.name === idol.name)) {
      beautyCandidates.push(idol);
      usedGroupsToday.add(group);
      continue;
    }

    if (sajuCandidates.length >= 2 && beautyCandidates.length >= 2) break;
  }

  console.log(`\nSelected ${todayStr} 4-Idol Diverse Lineup:`);
  console.log(`  [Saju 1]:   ${sajuCandidates[0].name} (${sajuCandidates[0].dob})`);
  console.log(`  [Saju 2]:   ${sajuCandidates[1].name} (${sajuCandidates[1].dob})`);
  console.log(`  [Beauty 1]: ${beautyCandidates[0].name}`);
  console.log(`  [Beauty 2]: ${beautyCandidates[1].name}\n`);

  const tasks = [];

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

  for (let bIdx = 0; bIdx < beautyCandidates.length; bIdx++) {
    const idol = beautyCandidates[bIdx];
    const { member, group } = parseNameAndGroup(idol.name);
    const slugBase = `${slugifyName(group)}-${slugifyName(member)}-personal-color-analysis`;
    const seasonObj = seasonPresets[(bIdx + todayStr.charCodeAt(todayStr.length - 1)) % seasonPresets.length];
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
  const CONCURRENCY = 3;

  for (let tIdx = 0; tIdx < tasks.length; tIdx++) {
    const task = tasks[tIdx];
    console.log(`\n[${todayStr}] [${tIdx + 1}/4] Processing ${task.type.toUpperCase()}: ${task.idol}...`);

    for (let i = 0; i < languages.length; i += CONCURRENCY) {
      const langBatch = languages.slice(i, i + CONCURRENCY);
      await Promise.all(langBatch.map(async (lang) => {
        const fullSlug = `${task.slugBase}-${lang.code}`;
        const fileName = `${fullSlug}.md`;
        const filePath = path.join(blogDir, fileName);

        if (fs.existsSync(filePath)) {
          console.log(`  - Exists: ${fileName}`);
          return;
        }

        let systemPrompt = '';
        if (task.type === 'beauty') {
          systemPrompt = `You are an expert K-Beauty consultant and Personal Color analyst for K-Oracle (thekoracle.com).
Write an editorial-grade Personal Color analysis blog post about ${task.idol}.
Official Personal Color: **${task.season} (${task.korSeason})**.

CRITICAL LANGUAGE RULE: Write the entire post (title, excerpt, headings, body, table, and FAQ) perfectly in ${lang.name}. Only keep YAML keys in English. Do NOT use double quotes inside your title or excerpt text.

CRITICAL STRUCTURE:
## TL;DR (Quick Answer)
## Visual Proof: Best vs Worst Styling
## Makeup & Hair Recipe (Must use Markdown Table: Category | Recommended Shade / Product Type | Why It Works)
## Frequently Asked Questions (Use ### for each question)

Frontmatter format:
---
title: "Catchy Editorial Headline in ${lang.name}"
slug: "${fullSlug}"
date: "${todayStr}"
excerpt: "Compelling 2-3 sentence meta summary in ${lang.name}."
author: "K-Oracle"
tags: ${JSON.stringify(task.tags)}
---`;
        } else {
          systemPrompt = `You are an authoritative Korean Saju master and global cultural analyst for K-Oracle (thekoracle.com).
Write a captivating Saju destiny analysis blog post about ${task.idol} (Born: ${task.dob}).

CRITICAL LANGUAGE RULE: Write the entire post perfectly in ${lang.name}. Only keep YAML keys in English. Do NOT use double quotes inside your title or excerpt text.
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
slug: "${fullSlug}"
date: "${todayStr}"
excerpt: "Compelling 2-3 sentence meta summary in ${lang.name}."
author: "K-Oracle"
tags: ${JSON.stringify(task.tags)}
---`;
        }

        try {
          const raw = await callGemini(systemPrompt, keys, keyIdxRef);
          const cleaned = sanitizeAndRebuildMarkdown(raw, {
            slug: fullSlug,
            date: todayStr,
            tags: task.tags,
            defaultTitle: task.type === 'beauty'
              ? `${task.idol} Personal Color Analysis: ${task.season} Styling Blueprint`
              : `${task.idol} Saju Destiny Analysis: Four Pillars Blueprint`,
            defaultExcerpt: task.type === 'beauty'
              ? `Discover ${task.idol}'s official ${task.season} personal color palette, K-Beauty makeup recipe, and iconic styling.`
              : `Explore ${task.idol}'s Korean Saju Four Pillars of Destiny chart, elemental balance, and Daewoon luck cycles.`
          });
          const parsed = matter(cleaned);
          if (!parsed.data.title || !parsed.data.slug) {
            throw new Error("Frontmatter validation failed");
          }
          fs.writeFileSync(filePath, cleaned, 'utf8');
          console.log(`  ✓ Created: ${fileName}`);
          successCount++;
        } catch (err) {
          console.error(`  ✗ Error creating ${fileName}:`, err.message);
        }
      }));
      await sleep(800);
    }
  }

  console.log(`\n✅ [${todayStr}] Daily Automation Complete: ${successCount} posts generated.`);
  return successCount;
}

async function main() {
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
    console.warn("⚠️ [SKIPPED] GEMINI_API_KEY is not configured yet in GitHub Secrets or .env.local.");
    process.exit(0);
  }

  const keys = apiKeysStr.split(',').map(k => k.trim()).filter(Boolean);
  const keyIdxRef = { current: 0 };

  const datesList = process.env.AUTO_DATES
    ? process.env.AUTO_DATES.split(',').map(d => d.trim()).filter(Boolean)
    : [process.env.AUTO_DATE || getTodayKST()];

  let totalGenerated = 0;
  for (const d of datesList) {
    totalGenerated += await runForDate(d, keys, keyIdxRef);
  }

  console.log(`\n=============================================================`);
  console.log(`🎉 ALL BATCHES COMPLETE: ${totalGenerated} total posts generated across ${datesList.length} day(s).`);
  console.log(`=============================================================\n`);
}

main().catch(err => {
  console.error("FATAL ERROR:", err);
  process.exit(1);
});
