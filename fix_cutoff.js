const fs = require('fs');
const path = require('path');

// 1. Hongjoong
let f = path.join(__dirname, 'src/content/blog/ateez-hongjoong-saju-analysis.md');
let text = fs.readFileSync(f, 'utf8').trim();
if (text.endsWith('|')) {
    text = text.replace(/\|\s*$/, '| **Heavenly Stems** | Gyeong Metal | Jeong Fire | Gi Earth |\n| **Earthly Branches** | In Tiger | Yu Rooster | Chuk Ox |\n| **Primary Energy** | Yang Metal | Yin Fire & Metal | Yin Earth & Metal |\n\n## Deep Dive: The Core Energy\n\nHongjoong is driven by immense passion and discipline. The combination of Fire and Metal makes him an extraordinary leader who can organize and inspire.\n\n## The Path to Destiny\n\nHis current and upcoming Daewoon cycles will continue to bolster his artistic influence globally.\n\n## Frequently Asked Questions\n\n### Why is Hongjoong such a great leader?\nHis Saju chart possesses a rare mix of charismatic Fire and structured Metal, allowing him to enforce discipline while radiating warmth.');
    fs.writeFileSync(f, text, 'utf8');
}

// 2. Baekhyun
f = path.join(__dirname, 'src/content/blog/exo-baekhyun-saju-analysis.md');
text = fs.readFileSync(f, 'utf8').trim();
if (text.endsWith('makes')) {
    text += ' him an exceptional entrepreneur. It signifies taking one\'s creative talents and directly monetizing them into a successful business empire.\n\n### What elements balance Baekhyun\'s chart best?\nHe thrives with Earth to stabilize his energetic output and Wood to provide continuous inspiration for his Fire energy.';
    fs.writeFileSync(f, text, 'utf8');
}

// 3. Jaehyun
f = path.join(__dirname, 'src/content/blog/nct-jaehyun-saju-analysis-destiny.md');
text = fs.readFileSync(f, 'utf8').trim();
if (text.endsWith('Celestial')) {
    text = text.replace(/\|\s*Pillar\s*\|\s*Celestial$/, '| Pillar | Year Pillar | Month Pillar | Day Pillar |\n|---|---|---|---|\n| **Heavenly Stems** | Jeong Fire | Im Water | Gyeong Metal |\n| **Earthly Branches** | Chuk Ox | In Tiger | Ja Rat |\n\n## Deep Dive: The Core Energy\n\nJaehyun has a powerful and refined aura, governed by structured Metal and deep Water. He possesses quiet confidence and exceptional aesthetic sensibilities.\n\n## The Path to Destiny\n\nHe is destined for steady, long-lasting success rather than sudden, fleeting fame.\n\n## Frequently Asked Questions\n\n### Why is Jaehyun known for his classic visuals and aura?\nHis Day Master gives him a dignified, timeless presence that naturally commands attention without being loud.');
    fs.writeFileSync(f, text, 'utf8');
}

// 4. Zhang Hao
f = path.join(__dirname, 'src/content/blog/zerobaseone-zhang-hao-saju-analysis.md');
text = fs.readFileSync(f, 'utf8').trim();
if (text.endsWith('Yin Water & Earth')) {
    text += ' | Yang Earth & Water | *Time Unknown* |\n\n## Deep Dive: The Core Energy\n\nZhang Hao is guided by an immense core energy that blends profound emotional depth with sturdy leadership. He is naturally charismatic and excels in bringing harmony to complex environments.\n\n## Frequently Asked Questions\n\n### Why is Zhang Hao a born center?\nHis Earth-Water balance allows him to remain completely unbothered and grounded while radiating deep talent.\n\n### What elements balance him?\nHe benefits from Wood energy to continue growing his global influence.';
    fs.writeFileSync(f, text, 'utf8');
}

console.log('Fixed cut off files.');
