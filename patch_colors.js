const fs = require('fs');
let content = fs.readFileSync('src/components/features/PersonalColor.jsx', 'utf8');

// Update Aura Card slice
content = content.replace("result.bestColors.slice(0, 5).map", "result.bestColors.slice(0, 3).map");

// Now we need to add 6 colors to each colorPool.
// Let's just do a regex replace for each colorPool array.
const springAdd = ", {hex:'#FFB347', name:'Pastel Orange'}, {hex:'#FADADD', name:'Pale Pink'}, {hex:'#FFFACD', name:'Lemon Chiffon'}, {hex:'#FF7F50', name:'Coral Pink'}, {hex:'#F8B878', name:'Apricot'}, {hex:'#FFD1DC', name:'Pastel Pink'}]";
const summerAdd = ", {hex:'#F0F8FF', name:'Ice Blue'}, {hex:'#FFB7C5', name:'Cherry Blossom'}, {hex:'#E6E6FA', name:'Lavender Mist'}, {hex:'#98FF98', name:'Mint Green'}, {hex:'#DA70D6', name:'Orchid'}, {hex:'#7FFFD4', name:'Aquamarine'}]";
const autumnAdd = ", {hex:'#E2725B', name:'Terracotta'}, {hex:'#C04000', name:'Mahogany'}, {hex:'#964B00', name:'Brown Mocha'}, {hex:'#B87333', name:'Copper'}, {hex:'#FFDB58', name:'Mustard'}, {hex:'#8B4513', name:'Rust'}]";
const winterAdd = ", {hex:'#0F52BA', name:'Sapphire'}, {hex:'#E0115F', name:'Ruby'}, {hex:'#50C878', name:'Emerald'}, {hex:'#191970', name:'Midnight Blue'}, {hex:'#9966CC', name:'Amethyst'}, {hex:'#FF0090', name:'Magenta'}]";

// Instead of parsing, we can just replace the end bracket `]` of each specific array if we know a unique string near it.
// Spring Warm ends with: {hex:'#FFDEAD', name:'Navajo White'}]
content = content.replace("{hex:'#FFDEAD', name:'Navajo White'}]", "{hex:'#FFDEAD', name:'Navajo White'}" + springAdd);

// Summer Cool ends with: {hex:'#CCCCFF', name:'Periwinkle'}]
content = content.replace("{hex:'#CCCCFF', name:'Periwinkle'}]", "{hex:'#CCCCFF', name:'Periwinkle'}" + summerAdd);

// Autumn Warm ends with: {hex:'#FF7F50', name:'Coral'}]
// Wait, is there another Coral? "Coral" in Autumn ends the color pool.
// Let's replace the first one that matches the Autumn pool ending.
content = content.replace("{hex:'#FF7F50', name:'Coral'}],\n        tagPool: [{bg:'bg-amber-500/20'", "{hex:'#FF7F50', name:'Coral'}" + autumnAdd + ",\n        tagPool: [{bg:'bg-amber-500/20'");

// Winter Cool ends with: {hex:'#F5F5F5', name:'White Smoke'}]
content = content.replace("{hex:'#F5F5F5', name:'White Smoke'}]", "{hex:'#F5F5F5', name:'White Smoke'}" + winterAdd);

fs.writeFileSync('src/components/features/PersonalColor.jsx', content);
console.log("Colors added and Aura Card slice updated to 3!");
