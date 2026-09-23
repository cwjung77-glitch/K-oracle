import re

with open("src/components/features/SajuCompatibility.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace lang undefined
content = content.replace("{lang === 'es' ? 'No sé la hora' : \"I don't know my birth time\"}", "\"Time Unknown (시간 모름)\"")
content = content.replace("{lang === 'es' ? 'No sé la hora' : \"I don't know the birth time\"}", "\"Time Unknown (시간 모름)\"")
content = content.replace("value={timeUnknown ? (lang === 'es' ? \"Desconocida\" : \"Unknown\") : time}", "value={timeUnknown ? \"Unknown\" : time}")
content = content.replace("value={customTimeUnknown ? (lang === 'es' ? \"Desconocida\" : \"Unknown\") : customTime}", "value={customTimeUnknown ? \"Unknown\" : customTime}")


with open("src/components/features/SajuCompatibility.jsx", "w", encoding="utf-8") as f:
    f.write(content)
