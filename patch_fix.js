const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');
content = content.replace("import { Sparkles,, Moon, Palette, Zap, Lock, Globe, Mail } User } from 'lucide-react';", "import { Sparkles, Moon, Palette, Zap, Lock, Globe, Mail, User } from 'lucide-react';");
fs.writeFileSync('src/app/page.js', content);
