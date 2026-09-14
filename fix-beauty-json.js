const fs = require('fs');

let route = fs.readFileSync('src/app/api/generate-beauty/route.js', 'utf8');

const replacement = 
    let aiData = {};
    const t = tone.toUpperCase();
    
    if (t === 'SPRING WARM' || t.includes('SPRING')) {
      aiData = {
        wardrobe: {
          dos: isEs ? ["Tonos pastel calidos.", "Telas ligeras como el algodon.", "Accesorios de oro rosa."] : ["Warm pastel tones.", "Lightweight fabrics like cotton.", "Rose gold accessories."],
          donts: isEs ? ["Evita colores oscuros y pesados.", "Telas rigidas.", "Plata pura."] : ["Avoid heavy dark colors.", "Stiff, rigid fabrics.", "Pure silver."]
        },
        hair: { targetShade: isEs ? "Marron Caramelo" : "Caramel Brown", bleachLevel: isEs ? "Nivel 5" : "Level 5", tonerFormula: isEs ? "Base calida" : "Warm base" }
      };
    } else if (t === 'AUTUMN WARM' || t.includes('AUTUMN')) {
      aiData = {
        wardrobe: {
          dos: isEs ? ["Tonos tierra profundos.", "Texturas ricas como ante.", "Accesorios de oro amarillo."] : ["Deep earth tones.", "Rich textures like suede.", "Yellow gold accessories."],
          donts: isEs ? ["Colores neon brillantes.", "Telas demasiado brillantes.", "Tonos frios y palidos."] : ["Bright neon colors.", "Overly shiny fabrics.", "Pale, cool tones."]
        },
        hair: { targetShade: isEs ? "Castano Cobrizo" : "Auburn Chestnut", bleachLevel: isEs ? "Nivel 6" : "Level 6", tonerFormula: isEs ? "Base roja/naranja" : "Red/Orange base" }
      };
    } else if (t === 'SUMMER COOL' || t.includes('SUMMER')) {
      aiData = {
        wardrobe: {
          dos: isEs ? ["Tonos apagados y polvorientos.", "Telas suaves y fluidas.", "Plata delicada."] : ["Dusty, muted tones.", "Soft, flowing fabrics.", "Delicate silver."],
          donts: isEs ? ["Contraste severo.", "Naranja brillante.", "Oro pesado."] : ["Harsh contrast.", "Bright orange.", "Heavy gold."]
        },
        hair: { targetShade: isEs ? "Marron Ceniza Claro" : "Light Ash Brown", bleachLevel: isEs ? "Nivel 8" : "Level 8", tonerFormula: isEs ? "Base azul/violeta" : "Blue/Violet base" }
      };
    } else {
      // Default to Winter Cool
      aiData = {
        wardrobe: {
          dos: isEs ? ["Usa bloques de color de alto contraste.", "Materiales como seda y saten.", "Blanco puro o negro azabache."] : ["Use high-contrast color blocking.", "Silk and satin materials.", "Pure white or pitch black."],
          donts: isEs ? ["Evita tonos tierra opacos.", "Lino aspero.", "Patrones florales pequenos."] : ["Avoid muddy earth tones.", "Rough linen.", "Small floral patterns."]
        },
        hair: { targetShade: isEs ? "Azul Ceniza Negro" : "Ash Blue Black", bleachLevel: isEs ? "Nivel 6-7" : "Level 6-7", tonerFormula: isEs ? "Base violeta" : "Violet base" }
      };
    }
;

// Use regex to replace the old if (lang === 'es') {...} else {...} block
const regex = /let aiData = {};\s*if\s*\(lang\s*===\s*'es'\)\s*\{[\s\S]*?tonerFormula:\s*"Violet base to cancel brass"\s*\}\s*};\s*\}/;
route = route.replace(regex, replacement.trim());
fs.writeFileSync('src/app/api/generate-beauty/route.js', route);
console.log("Success");
