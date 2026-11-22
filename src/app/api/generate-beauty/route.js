export const maxDuration = 60;
import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

function getDefaultStylingExtras(tone = 'Winter Cool', lang = 'en') {
  const t = (tone || '').toUpperCase();
  const isEs = lang === 'es';
  const isKo = lang === 'ko';

  if (t.includes('SPRING')) {
    return {
      wardrobe: {
        dos: isKo
          ? ['아이보리, 피치 코랄, 웜 베이지 계열의 가벼운 실크 및 코튼 소재', '햇살을 머금은 듯한 라이트 옐로우와 프레시 민트 포인트 니트', '얼굴빛을 화사하게 살려주는 골드 버튼 트위드 자켓']
          : isEs
          ? ['Blusas de seda y algodón en tonos marfil, durazno coral y beige cálido', 'Prendas de punto en amarillo claro y menta fresca', 'Chaquetas de tweed con botones dorados brillantes']
          : ['Ivory, peach coral, and warm cream silk or crisp cotton tops near the face', 'Sunlit butter yellow and fresh apple-mint knitwear accents', 'Light camel and warm beige tailoring with polished gold buttons'],
        donts: isKo
          ? ['얼굴을 창백하고 칙칙하게 만드는 올블랙 및 차콜 그레이 터틀넥', '차가운 푸른빛이 도는 마젠타 및 네온 퍼플', '무겁고 매트한 다크 브라운 가죽 아우터']
          : isEs
          ? ['Cuellos altos en negro total o gris carbón que apagan tu luz', 'Tonos magenta fríos y púrpura neón', 'Abrigos pesados de cuero marrón oscuro mate']
          : ['Stark all-black or charcoal gray high-neck tops that drain your natural warmth', 'Icy blue-based magenta and neon purple tones', 'Heavy, matte dark-brown or muted olive outerwear'],
      },
      hair: {
        targetShade: isKo ? '밀크티 브라운 & 허니 골드 베이지' : 'Milk Tea Brown & Honey Apricot Beige',
        bleachLevel: isKo ? '레벨 8~9 (부드러운 브라이트닝 1회)' : 'Level 8-9 (Single Soft Lift / Golden Base)',
        tonerFormula: '8.33 Golden Honey + 9.4 Warm Apricot (20 Vol)',
      },
    };
  }

  if (t.includes('SUMMER')) {
    return {
      wardrobe: {
        dos: isKo
          ? ['라벤더, 파우더 블루, 소프트 로즈 핑크 계열의 쉬폰 및 린넨 소재', '우아하고 맑은 오프화이트와 쿨 그레이 슬랙스 매치', '은은한 광택의 실버 주얼리와 파스텔 트위드 셋업']
          : isEs
          ? ['Gasa y lino suave en lavanda, azul polvo y rosa empolvado', 'Blanco suave y pantalones gris frío de corte fluido', 'Conjuntos pastel con accesorios de plata satinada']
          : ['Powder blue, soft lavender, and dusty rose chiffon or fine linen layers', 'Cool off-white and pearl gray fluid tailoring', 'Muted Mauve and periwinkle knits paired with brushed silver jewelry'],
        donts: isKo
          ? ['피부의 노란기를 부각시키는 머스타드 옐로우 및 테라코타 오렌지', '지나치게 대비가 강한 원색 블랙 & 네온 컬러', '무거운 골드 스팽글이나 카키 브라운 소재']
          : isEs
          ? ['Amarillo mostaza y naranja terracota que enfatizan la fatiga', 'Contrastes extremos en negro puro y colores neón', 'Lentejuelas doradas pesadas o marrón caqui']
          : ['Mustard yellow, burnt orange, and terracotta shades that clash with cool undertones', 'Harsh high-contrast jet black or neon warm colors', 'Heavy yellow-gold sequins and earthy khaki browns'],
      },
      hair: {
        targetShade: isKo ? '애쉬 그레이 브라운 & 소프트 라벤더 애쉬' : 'Soft Ash Brown & Misty Rose taupe',
        bleachLevel: isKo ? '레벨 7~8 (붉은기 중화 베이스)' : 'Level 7-8 (Red/Orange Neutralized Cool Base)',
        tonerFormula: '7.11 Cool Ash + 8.2 Pearl Violet (10 Vol)',
      },
    };
  }

  if (t.includes('AUTUMN')) {
    return {
      wardrobe: {
        dos: isKo
          ? ['카멜, 테라코타, 올리브 그린, 에스프레소 브라운의 캐시미어 및 스웨이드', '고급스러운 골드 브론즈 광택의 새틴 셔츠와 트렌치코트', '깊이감 있는 버건디와 머스타드 포인트 레이어링']
          : isEs
          ? ['Cachemira y gamuza en camel, terracota, verde oliva y café expreso', 'Camisas satinadas bronce dorado y gabardinas clásicas', 'Capas profundas en borgoña cálido y mostaza']
          : ['Camel, terracotta, olive green, and espresso brown cashmere or suede textures', 'Warm bronze satin blouses and structured classic trench coats', 'Deep spice, warm burgundy, and antique gold layering pieces'],
        donts: isKo
          ? ['얼굴만 동동 떠 보이게 만드는 창백한 파스텔 블루 및 아이시 핑크', '푸른빛이 강한 형광 화이트 셔츠', '차가운 실버 메탈릭 소재']
          : isEs
          ? ['Azul pastel pálido y rosa hielo que apagan tu piel', 'Camisas blancas fluorescentes con subtono azulado', 'Tejidos metálicos plateados fríos']
          : ['Icy pastel blue and baby pink that make golden skin look washed out', 'Stark blue-based optical white shirts', 'Cold chrome-silver metallic fabrics'],
      },
      hair: {
        targetShade: isKo ? '다크 초콜릿 브라운 & 메이플 코퍼 골드' : 'Rich Espresso Chocolate & Maple Auburn',
        bleachLevel: isKo ? '레벨 5~6 (노블레스 무탈색 딥 염색)' : 'Level 5-6 (No-Bleach Rich Warm Deposit)',
        tonerFormula: '5.35 Warm Chocolate + 6.43 Copper Gold (20 Vol)',
      },
    };
  }

  // Default: WINTER COOL
  return {
    wardrobe: {
      dos: isKo
        ? ['선명한 트루 블랙, 광학 화이트, 로열 네이비의 구조적인 테일러링', '아이시 플럼, 마젠타, 에메랄드 그린의 고대비 포인트 스타일링', '가죽, 실크 새틴 및 플래티넘 실버 주얼리 매치']
        : isEs
        ? ['Sastrería estructurada en negro puro, blanco óptico y azul marino real', 'Acentos de alto contraste en ciruela frío, magenta y esmeralda', 'Cuero, satén de seda y joyería de platino o plata brillante']
        : ['Crisp jet black, optical pure white, and royal navy structured tailoring', 'High-contrast icy plum, ruby crimson, and emerald jewel-tone accents', 'Sleek leather, liquid silk satin, and high-shine platinum/silver hardware'],
      donts: isKo
        ? ['이목구비를 흐릿하게 만드는 탁한 베이지, 카키, 황토색 니트', '애매한 파스텔 옐로우 및 피치 오렌지', '빈티지 브론즈 및 옐로우 골드 액세서리']
        : isEs
        ? ['Beige apagado, caqui y tonos tierra que restan definición', 'Amarillo pastel tibio y naranja durazno', 'Accesorios de bronce vintage y oro amarillo']
        : ['Muddy beige, dusty khaki, and earthy mustard tones that blur your sharp features', 'Muted warm peach and washed-out warm pastels', 'Brushed antique brass and yellow-gold accessories near the face'],
    },
    hair: {
      targetShade: isKo ? '블루 블랙 & 다크 플럼 에스프레소' : 'Blue-Black Obsidian & Midnight Plum',
      bleachLevel: isKo ? '레벨 3~4 (고광택 글로스 코팅, 탈색 불필요)' : 'Level 3-4 (High-Gloss Cool Deposit, No Bleach)',
      tonerFormula: '3.0 Jet Black + 4.11 Midnight Blue Ash Gloss (10 Vol)',
    },
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { tone, lang } = body;

    const langMap = {
      en: 'English',
      es: 'Spanish',
      th: 'Thai',
      id: 'Indonesian',
      ja: 'Japanese',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      pl: 'Polish',
      ru: 'Russian',
      vi: 'Vietnamese',
      fr: 'French',
      ko: 'Korean',
    };
    const targetLanguage = langMap[lang] || 'English';
    const extras = getDefaultStylingExtras(tone, lang);

    const apiKeys = process.env.GEMINI_API_KEY
      ? process.env.GEMINI_API_KEY.split(',').map((k) => k.trim())
      : [];

    if (apiKeys.length === 0 || !apiKeys[0]) {
      console.warn('No Gemini API key found, returning structured fallback beauty report.');
      const fallbackData = {
        reportText: `[CATEGORY: Cheongdam Celebrity Match]\nYour ${tone || 'Winter Cool'} undertone shares the luminous, camera-ready clarity of K-Pop royalty. By keeping contrast aligned with your natural melanin balance, your facial contours appear naturally lifted.\n\n[CATEGORY: Signature Color Palette]\n- Best 1: [HEX: #E6E6FA] Icy Lavender\n- Best 2: [HEX: #0F52BA] Royal Sapphire\n- Best 3: [HEX: #DC143C] Velvet Crimson\n\n[CATEGORY: Makeup Blueprint]\n- **Base:** Semi-glow cushion foundation one half-tone brighter at the center of the face.\n- **Eye:** Cool mauve and silver micro-shimmer palette.\n- **Lip:** Blurred berry-plum gradient lip tint.\n\n[CATEGORY: Accessory & Hair]\nHigh-shine silver or white gold jewelry elevates your skin clarity immediately.`,
        ...extras,
      };
      return NextResponse.json({ success: true, data: fallbackData, ...fallbackData });
    }

    // CACHE CHECK
    const cacheKey = `beauty:v2:${tone}:${lang}`;
    if (redis) {
      try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          const merged = { ...extras, ...parsed };
          return NextResponse.json({ success: true, data: merged, ...merged });
        }
      } catch (e) {
        console.error('Redis Cache Error:', e);
      }
    }

    const prompt = `You are an elite Cheongdam-dong celebrity stylist in Seoul. Your tone is chic, luxurious, and highly professional.
  POETIC & EDITORIAL RULE: Describe the client's personal color, aura, and styling concepts using intuitive, cinematic, and poetic metaphors. Make the reading flow like a captivating, high-end fashion magazine editorial.
  LEGAL & LIABILITY RULE: Never give definitive financial, legal, or medical advice.
  HUMAN-LIKE WRITING RULE: Write in a natural, passionate tone as a real human expert speaking directly to the user. Avoid AI clichés ("In conclusion", "Moreover", "Let us dive into").
Client Details:
- Personal Color: ${tone}

Create a bespoke styling report. Structure the report exactly like this:

[MOOD_SCORES: 80,40,90,60,50]
(Output 5 numbers 0-100 representing this tone's: Lovely, Chic, Elegant, Natural, Glamorous vibe)

[CATEGORY: Cheongdam Celebrity Match]
Which K-Pop idols or actresses share this exact skin tone and aesthetic? Give 3 examples and explain their signature styling secrets.

[CATEGORY: Signature Color Palette]
List 6 Best (Must-wear) colors and 3 Worst (Avoid) colors.
IMPORTANT: Next to every color name, provide its hex code in this format: [HEX: #FFB6C1].

[CATEGORY: Makeup Blueprint]
- **Base:** Dewy or matte? Which foundation shade?
- **Eye:** Eyeshadow palette recommendations (name 2 real K-beauty products).
- **Lip:** 2 real lip tint shades to buy immediately.

[CATEGORY: Accessory & Hair]
Silver, gold, or rose gold? Best hair dye color and styling formula?

Language: ${targetLanguage}.
CRITICAL: Limit each section to 200-250 words. Make it sound expensive and extremely actionable.`;

    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    };

    const fallbackModels = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest'];
    let lastError = null;
    let data = null;
    let response = null;

    for (const currentKey of apiKeys) {
      if (response && response.ok) break;
      for (const currentModel of fallbackModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${currentKey}`;
          response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
          });
          data = await response.json();

          if (response.ok) {
            lastError = null;
            break;
          } else {
            lastError = data;
          }
        } catch (err) {
          lastError = err;
        }
      }
    }

    if (!response || !response.ok) {
      throw new Error(`Gemini API error after retries: ${JSON.stringify(lastError)}`);
    }

    let reportText = data.candidates[0].content.parts[0].text;
    let moodScores = [85, 78, 92, 74, 88];
    const moodMatch = reportText.match(/\[MOOD_SCORES:\s*([\d,\s]+)\]/i);
    if (moodMatch) {
      const nums = moodMatch[1].split(',').map((n) => parseInt(n.trim(), 10)).filter((n) => !isNaN(n));
      if (nums.length >= 5) moodScores = nums.slice(0, 5);
      reportText = reportText.replace(moodMatch[0], '').trim();
    }

    const finalData = {
      reportText,
      moodScores,
      tone: tone || 'Winter Cool',
      ...extras,
    };

    if (redis) {
      try {
        await redis.set(cacheKey, JSON.stringify(finalData), 'EX', 2592000);
      } catch (e) {
        console.error('Redis Cache Set Error:', e);
      }
    }

    return NextResponse.json({ success: true, data: finalData, ...finalData });
  } catch (error) {
    console.error('Beauty API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
