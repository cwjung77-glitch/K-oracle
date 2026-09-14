const fs = require('fs');

let c = fs.readFileSync('src/app/layout.js', 'utf8');

const newMetadata = `export const metadata = {
  title: "K-Oracle | Ancient Saju & Cosmic Blueprint",
  description: "Discover your destiny, deep chemistry, and beauty aura with K-Oracle's premium Saju analysis.",
  verification: {
    google: "NWFd1BBHryk6Y4wUhL95WOAa1s4CjMwolOT9ulW3KlQ",
  },
};`;

c = c.replace(/export const metadata = {[\s\S]*?};/, newMetadata);

fs.writeFileSync('src/app/layout.js', c);
