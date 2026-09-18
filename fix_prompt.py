import re

with open('scripts/generate_blog.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Humanizer Prompt
old_prompt = 'CRITICAL INSTRUCTION: Do NOT use the word "AI" or "Artificial Intelligence" anywhere in your response. Also, NEVER output meta-terms like "SEO", "GEO", or "AEO" in the text or headings (e.g., do NOT write "AEO Section"). Keep the language 100% natural and mystical for a human reader. We want to preserve the mystical and ancient feel of Saju. Refer to our system as "K-Oracle" or "ancient system".'

new_prompt = 'CRITICAL INSTRUCTION: Do NOT use the word "AI" or "Artificial Intelligence" anywhere in your response. Also, NEVER output meta-terms like "SEO", "GEO", or "AEO" in the text or headings (e.g., do NOT write "AEO Section"). \n\n  HUMAN-LIKE WRITING & ANTI-BOT RULE: Write in a highly engaging, conversational, and passionate tone, as if a real human expert/fan is writing. You MUST completely avoid typical AI transition phrases and filler words (e.g., "In conclusion", "Moreover", "Let\\'s dive into", "It is important to remember", "Furthermore"). Use varied sentence lengths and natural pacing to bypass AI detectors. We want to preserve the mystical and ancient feel of Saju. Refer to our system as "K-Oracle" or "ancient system".'

content = content.replace(old_prompt, new_prompt)

with open('scripts/generate_blog.js', 'w', encoding='utf-8') as f:
    f.write(content)
