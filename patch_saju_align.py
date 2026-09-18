import re

with open("src/app/api/generate-saju/route.js", "r", encoding="utf-8") as f:
    content = f.read()

# Add dailyVibe to destructured body
if "const { birthData, gender, lang, plan, userName, idolName: bodyIdolName" in content:
    content = content.replace("const { birthData, gender, lang, plan, userName, idolName: bodyIdolName } = body;", 
                              "const { birthData, gender, lang, plan, userName, idolName: bodyIdolName, dailyVibe } = body;")

# Inject alignment prompt
alignment_prompt = """
  Generate "Today's Fortune" (Daily Horoscope) for today: ${todayStr}.
  ${dailyVibe ? `CRITICAL ALIGNMENT RULE: The user has already received this free daily vibe today: "${dailyVibe}". Your fortune MUST perfectly align with this vibe and expand on it so there are no contradictions.` : ''}
"""

content = content.replace("""  <FORTUNE>\n  Generate "Today's Fortune" (Daily Horoscope) for today: ${todayStr}.""", 
                          """  <FORTUNE>""" + alignment_prompt)
                          
content = content.replace("""  <FORTUNE>\n  Generate "Relationship Fortune for Today" (3 sentences).""", 
                          """  <FORTUNE>\n  Generate "Relationship Fortune for Today" (3 sentences).\n  ${dailyVibe ? `CRITICAL ALIGNMENT RULE: The user has already received this free daily vibe today: "${dailyVibe}". Your fortune MUST perfectly align with this vibe and expand on it so there are no contradictions.` : ''}""")

with open("src/app/api/generate-saju/route.js", "w", encoding="utf-8") as f:
    f.write(content)
