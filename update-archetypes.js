const fs = require('fs');
let route = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

const oldKarmic = 'const karmicArchetypes = ["a Royal Scholar", "a Wandering Merchant", "a Fierce Warrior", "a Palace Healer", "an Exiled Noble", "a Temple Monk", "a Mystic Shaman", "a Wealthy Landlord", "a Rebel Leader", "a Master Artisan"];';

const newKarmic = const karmicArchetypes = [
  "a Royal Scholar", "a Wandering Merchant", "a Fierce Warrior", "a Palace Healer", "an Exiled Noble", 
  "a Temple Monk", "a Mystic Shaman", "a Wealthy Landlord", "a Rebel Leader", "a Master Artisan",
  "a Court Musician", "a Shadow Assassin", "a Silk Weaver", "a Royal Astronomer", "a Border Guard",
  "a Masked Dancer", "a Feng Shui Master", "a Fallen Prince", "a Hidden Queen", "a Blacksmith of Legends",
  "a Traveling Poet", "a Sea Captain", "a Royal Tea Brewer", "a Calligraphy Master", "a Head Eunuch",
  "a Tiger Hunter", "a Herbalist in the Deep Mountains", "a Corrupt Magistrate", "a Righteous Outlaw", "a Book Smuggler",
  "a Royal Food Taster", "a Keeper of the Royal Tombs", "a Blind Fortune Teller", "a Gisaeng (Courtesan) of High Arts", "a Royal Architect",
  "a Spy for the King", "a Deserted Soldier", "a Pearl Diver", "a Keeper of the Sacred Fire", "a Diplomat to Ming",
  "a Master of Swords", "a Royal Falconer", "a Matchmaker for the Elite", "a Keeper of Forbidden Books", "a Dragon Boat Racer",
  "a Salt Merchant", "a Royal Mapmaker", "a Keeper of Royal Hounds", "a Master of Fireworks", "a Secret Emissary"
];;

const oldRel = 'const relArchetypes = ["Tragic Star-Crossed Lovers", "Rival Warlords", "Master and Loyal Apprentice", "Secret Royal Siblings", "Betrayed Comrades", "Reincarnated Soulmates"];';

const newRel = const relArchetypes = [
  "Tragic Star-Crossed Lovers", "Rival Warlords", "Master and Loyal Apprentice", "Secret Royal Siblings", "Betrayed Comrades", 
  "Reincarnated Soulmates", "A King and a Hidden Rebel", "Two Spies on Opposite Sides", "A Monk and a Temptress", "A General and a Captive",
  "A Poet and a Muse", "Two Merchants on the Silk Road", "A Healer and a Dying Prince", "A Shaman and a Cursed Noble", "A Blacksmith and a Warrior",
  "A Gisaeng and a Secret Envoy", "Two Princes Fighting for the Throne", "A Matchmaker and a Heartbroken Client", "A Pirate and a Royal Admiral", "A Royal Tutor and a Rebellious Student",
  "A Court Musician and a Deaf Painter", "A Forbidden Palace Romance", "Two Assassins Bound by Blood", "A Queen and her Loyal Knight", "A Traveling Merchant and an Innkeeper",
  "A Ghost and a Shaman", "A Farmer and a Heavenly Fairy", "Two Scholars Debating to the Death", "A Runaway Slave and a Noble", "A King and a Prophet"
];;

route = route.replace(oldKarmic, newKarmic);
route = route.replace(oldRel, newRel);

// Inject explanation for Westerners having Joseon past lives
const oldKarmaPrompt1 = '1. Analyze their past life incarnation based on the birth date. CRITICAL RULE: Their fixed past life incarnation is: " in the Joseon Dynasty". You MUST use this exact identity. Do not invent a different past life occupation.';
const newKarmaPrompt1 = '1. Analyze their past life incarnation based on the birth date. CRITICAL RULE: Their fixed past life incarnation is: " in the Joseon Dynasty". You MUST use this exact identity.\nCRITICAL TONE RULE FOR PAST LIFE: Since the user is Western, explain that their soul is drawn to K-Astrology today because their deep karmic roots actually trace back to this specific ancient Korean past life. Do not make it sound like a cheap fantasy novel; frame it as a profound, mystical revelation of their soul\\'s Eastern origin.';

route = route.replace(oldKarmaPrompt1, newKarmaPrompt1);

const oldKarmaPrompt2 = '1. Analyze their past life relationship karma based on both birth dates. CRITICAL RULE: Their fixed past life relationship was: " in the Joseon Dynasty". You MUST use this exact relationship.';
const newKarmaPrompt2 = '1. Analyze their past life relationship karma based on both birth dates. CRITICAL RULE: Their fixed past life relationship was: " in the Joseon Dynasty". You MUST use this exact relationship.\nCRITICAL TONE RULE FOR PAST LIFE: Since the user is Western, explain that they feel an inexplicable pull to this person because their souls were intertwined in ancient Korea. Frame this past life not as a fantasy novel, but as a profound, mystical karmic root.';

route = route.replace(oldKarmaPrompt2, newKarmaPrompt2);

fs.writeFileSync('src/app/api/generate-saju/route.js', route);
console.log('Archetypes expanded and prompts updated');
