import re

with open("src/components/features/DeepDiveReport.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Pass dailyVibe to fetch
if "dailyVibe:" not in content:
    # First, get cachedDailyVibe right inside the component or inside handleGenerateReport
    # We can fetch it from localStorage 'daily_result'
    # Wait, the fetch is inside handleGenerateReport
    
    # Let's add extraction of dailyVibe
    replacement = """
    const handleGenerateReport = async (e) => {
      e.preventDefault();
      setIsGenerating(true);
      setError(false);

      let dailyVibe = "";
      try {
        const cachedDaily = localStorage.getItem('daily_result');
        if (cachedDaily) {
           dailyVibe = JSON.parse(cachedDaily).data.vibe;
        }
      } catch(e) {}
    """
    content = content.replace("const handleGenerateReport = async (e) => {\n    e.preventDefault();\n    setIsGenerating(true);\n    setError(false);", replacement)
    
    # Now modify the fetch body
    old_body = 'body: JSON.stringify({ plan: localStorage.getItem("purchasedPlan"), idolName: localStorage.getItem("idolName"), userName: localStorage.getItem("userName") || "The Client" || "bundle", birthData: (localStorage.getItem("userDob") || "1995-10-15") + " " + (localStorage.getItem("userTime") || "12:00"), gender: localStorage.getItem("userGender") || "female", lang })'
    new_body = 'body: JSON.stringify({ plan: localStorage.getItem("purchasedPlan"), idolName: localStorage.getItem("idolName"), userName: localStorage.getItem("userName") || "The Client" || "bundle", birthData: (localStorage.getItem("userDob") || "1995-10-15") + " " + (localStorage.getItem("userTime") || "12:00"), gender: localStorage.getItem("userGender") || "female", lang, dailyVibe })'
    
    content = content.replace(old_body, new_body)

with open("src/components/features/DeepDiveReport.jsx", "w", encoding="utf-8") as f:
    f.write(content)
