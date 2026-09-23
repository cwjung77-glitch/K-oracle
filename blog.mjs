import fs from 'fs';
import { execSync } from 'child_process';

const idol = process.argv.slice(2).join(' ').trim();

if (!idol) {
  console.error("\n❌ 아이돌 이름이 제공되지 않았습니다.");
  console.error("👉 사용법: node blog.mjs `"아이돌 이름`"");
  console.error("👉 예시: node blog.mjs `"BTS Jungkook`"\n");
  process.exit(1);
}

console.log(`\n⏳ [${idol}] 블로그 포스트 생성 중... 잠시만 기다려주세요.`);

async function main() {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
  if (!apiKeyMatch) { 
    console.error("❌ .env.local 파일에서 GEMINI_API_KEY를 찾을 수 없습니다."); 
    process.exit(1); 
  }
  const apiKeys = apiKeyMatch[1].split(',').map(k => k.trim());
  const fallbackModels = ['gemini-2.5-flash', 'gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
  
  const today = new Date().toISOString().split('T')[0];
  const prompt = `You are an elite, highly opinionated Gen-Z Korean Saju master and K-Pop expert.
Write a 1200-word SEO-optimized blog post analyzing the Saju (Four Pillars of Destiny / Korean Astrology) of ${idol}.

CRITICAL INSTRUCTIONS:
1. OUTPUT ONLY EXACT MARKDOWN. Do NOT wrap in backtick markdown fences. Start exactly with "---" for the frontmatter.
2. DO NOT USE ANY CODE BLOCKS IN THE BODY TEXT. Just use normal markdown.
3. Frontmatter format:
---
title: "Decoding [Idol Name]'s Saju: Cosmic Secrets Behind the K-Pop Star"
slug: "[group-member-saju-analysis]"
date: "${today}"
excerpt: "A 2-sentence engaging teaser."
author: "K-Oracle"
tags: ["[Group Name]", "[Member Name]", "Saju Analysis", "K-Pop Astrology"]
---
4. Body must include: ## TL;DR, ## Cosmic Blueprint, ## Day Master, ## Love Career Destiny, ## FAQ (3 Q&As), ## Key Takeaways (3 bullets - NO "Conclusion" section)
5. TERMINOLOGY: You MUST use Korean Saju terms, NOT Chinese BaZi pinyin. 
   - Heavenly Stems: Gap, Eul, Byeong, Jeong, Mu, Gi, Gyeong, Sin, Im, Gye (e.g., "Gi Earth" NOT "Ji Earth", "Byeong Fire" NOT "Bing Fire").
   - Earthly Branches: Ja, Chuk, In, Myo, Jin, Sa, O, Mi, Sin, Yu, Sul, Hae (e.g., "Myo Wood" NOT "Mao Wood", "Sin Metal" NOT "Shen Metal").
6. VERY IMPORTANT: You MUST insert this EXACT block of text (word for word, character for character) immediately after the text of the TL;DR section:
> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.
7. TONE: Gen-Z, blunt, mystical, ZERO AI scent. No "In conclusion", no "Embrace", no "cosmic energy brings".
8. End with exactly this disclaimer:
*Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.*`;

  let success = false;
  
  for (const GEMINI_API_KEY of apiKeys) {
    if (success) break;
    for (const model of fallbackModels) {
      if (success) break;
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 8192 }
          })
        });
        
        if (!response.ok) { 
          const errText = await response.text();
          console.warn(`⚠️ [${model}] API 응답 실패: ${response.status} - ${errText.substring(0, 50)}`);
          continue; 
        }
        
        const data = await response.json();
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Remove markdown backticks if accidentally added by model
        text = text.replace(/^```markdown\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '');
        
        if (!text.trim().startsWith('---')) {
          const mdStart = text.indexOf('---');
          if (mdStart !== -1) {
            text = text.slice(mdStart);
          } else { 
            console.warn(`⚠️ [${model}] Markdown frontmatter (---)를 찾을 수 없습니다. 재시도합니다.`);
            continue; 
          }
        }
        
        const slugMatch = text.match(/slug:\s*["']?([^"'\n]+)["']?/);
        if (!slugMatch) { 
          console.warn(`⚠️ [${model}] slug 값을 찾을 수 없습니다. 재시도합니다.`);
          continue; 
        }
        
        let slug = slugMatch[1].trim().replace(/^["']|["']$/g,'').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
        
        // Replace Chinese characters in file
        const chineseTerms = [
            { c: 'Jia', k: 'Gap' }, { c: 'Yi', k: 'Eul' }, { c: 'Bing', k: 'Byeong' }, { c: 'Ding', k: 'Jeong' },
            { c: 'Wu', k: 'Mu' }, { c: 'Ji', k: 'Gi' }, { c: 'Geng', k: 'Gyeong' }, { c: 'Xin', k: 'Sin' },
            { c: 'Ren', k: 'Im' }, { c: 'Gui', k: 'Gye' },
            { c: 'Zi', k: 'Ja' }, { c: 'Chou', k: 'Chuk' }, { c: 'Yin', k: 'In' }, { c: 'Mao', k: 'Myo' },
            { c: 'Chen', k: 'Jin' }, { c: 'Si', k: 'Sa' }, { c: 'Wu', k: 'O' }, { c: 'Wei', k: 'Mi' },
            { c: 'Shen', k: 'Sin' }, { c: 'You', k: 'Yu' }, { c: 'Xu', k: 'Sul' }, { c: 'Hai', k: 'Hae' }
        ];
        
        chineseTerms.forEach(t => {
            const regex = new RegExp(`\\b${t.c}\\b`, 'g');
            text = text.replace(regex, t.k);
            const lowerRegex = new RegExp(`\\b${t.c.toLowerCase()}\\b`, 'g');
            text = text.replace(lowerRegex, t.k.toLowerCase());
        });
        
        const filePath = `src/content/blog/${slug}.md`;
        fs.writeFileSync(filePath, text, 'utf8');
        
        console.log(`✅ [성공] 마크다운 생성 완료: ${filePath}`);
        
        console.log(`🚀 GitHub에 자동 배포를 시작합니다...`);
        execSync(`git add "${filePath}"`, { stdio: 'inherit' });
        execSync(`git commit -m "feat: Add blog post for ${idol} (Terminal)"`, { stdio: 'inherit' });
        execSync(`git push`, { stdio: 'inherit' });
        
        console.log(`\n🎉 모든 작업이 완료되었습니다! Vercel에서 약 2분 후 확인하실 수 있습니다.`);
        success = true;
      } catch(err) {
        console.error(`⚠️ 에러 발생: ${err.message}`);
      }
    }
  }
  
  if (!success) {
    console.error("❌ 생성 실패: 모든 API Key와 모델을 시도했지만 글을 생성하지 못했습니다.");
    process.exit(1);
  }
}

main();
