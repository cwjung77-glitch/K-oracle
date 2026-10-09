const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'src/content/blog/enhypen-sunghoon-saju-analysis.md');
let text = fs.readFileSync(f, 'utf8');

const oldSection = `*   **Year Pillar: Im-O (壬午)**
    *   **Heavenly Stem:** Im Water (壬水) - Yang Water. This is like a vast ocean or a mighty river. It speaks to a broad perspective, intelligence, adaptability, and often a calm, profound exterior. It hints at his public persona being grand, impactful, and globally aware.
    *   **Earthly Branch:** O Fire (?火) - Yang Fire. This is a blazing sun or a strong fire. Fire represents passion, energy, ambition, and a desire for recognition. The clash between Im Water and O Fire in his year pillar is intense ??Water tries to extinguish Fire. This suggests an inner conflict or a dynamic push-pull between his calm, deep nature and an underlying, fiery ambition that wants to burst forth and be seen. This could be the source of his intense drive despite his composed demeanor.

*   **Month Pillar: Im-Ja (壬子)**
    *   **Heavenly Stem:** Im Water (壬水) - Yang Water. Another Im Water! This doubles down on the themes from his year pillar, emphasizing a strong, unyielding presence, deep thoughts, and perhaps a slightly reserved nature. This pillar relates to career and social environment, suggesting his professional life will be marked by adaptability, strategic thinking, and a profound connection with his work.
    *   **Earthly Branch:** Ja Water (子水) - Yang Water. And more Water! Ja Water is the peak of winter, pure, cold Water. It signifies intelligence, intuition, and a very strong will. The combination of Im Water and Ja Water makes this pillar incredibly strong in Water energy, practically a cosmic flood. This reinforces his sharp mind and deep emotional capacity, making him highly sensitive and artistic.

*   **Day Pillar: Gye-Mi (癸未)** - This represents Sunghoon?s core self.
    *   **Heavenly Stem:** Gye Water (癸水) - Yin Water. This is the rain, the mist, the morning dew. It?s gentle, nourishing, and highly adaptable, but also quiet, introspective, and perhaps a little mysterious. This is the "Ice Prince" core ??elegant, cool on the outside, but deeply sensitive inside.
    *   **Earthly Branch:** Mi Earth (未土) - Yin Earth. This is dry, warm earth, like a desert or a dusty plain. It provides a foundation, but it's not the most fertile ground for Water. However, it gives him a grounded, practical side. He isn't just dreaming; he knows how to endure and build a foundation.

### The Big Picture: A Tidal Wave Meets a Desert

When you look at the whole chart, you see a massive amount of Water energy crashing against Fire and Earth.

1.  **The Dominance of Water:** With three Water elements in prominent positions, Sunghoon is deeply intuitive, emotional, and artistic. He feels things intensely, even if he doesn't always show it. This is the source of his natural grace and ability to convey emotion through performance.
2.  **The Inner Conflict:** The strong clash between Water (his core nature) and Fire (ambition/passion) in his Year Pillar is key. He's naturally calm and introspective, but there's a burning desire for success pushing him out of his comfort zone. It's the friction that creates a star.
3.  **The Need for Balance:** His chart desperately needs Wood to channel that massive Water energy and feed the Fire, or more Earth to contain it. In Saju, when a chart is this skewed, finding balance is the key to true success.

## Deep Dive: The Core Energy`;

const newSection = `| Pillar | Year Pillar | Month Pillar | Day Pillar |
|---|---|---|---|
| **Heavenly Stems** | Im Water | Im Water | Gye Water |
| **Earthly Branches** | O Fire | Ja Rat | Mi Goat |
| **Primary Energy** | Yang Water & Fire | Yang Water | Yin Water & Earth |

## Deep Dive: The Core Energy

When you look at the whole chart, you see a massive amount of Water energy crashing against Fire and Earth. 

With three Water elements in prominent positions, Sunghoon is deeply intuitive, emotional, and artistic. He feels things intensely, even if he doesn't always show it. This is the source of his natural grace and ability to convey emotion through performance.

His "Ice Prince" core is elegant and cool on the outside, but deeply sensitive inside. The clash between Water (his core nature) and Fire (ambition/passion) in his Year Pillar creates a burning desire for success pushing him out of his comfort zone. It's the friction that creates a star.
`;

text = text.replace(oldSection, newSection);

// Also fix the ### headings
text = text.replace(/### What does this mean for Sunghoon\?/g, '## The Path to Destiny\n### What does this mean for Sunghoon?');
text = text.replace(/### 1\. The Figure Skater to Idol Pipeline/g, '## Frequently Asked Questions\n\n### 1. The Figure Skater to Idol Pipeline');

fs.writeFileSync(f, text, 'utf8');
console.log('Fixed Sunghoon');
