import re

with open("src/components/features/SajuCompatibility.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add states
if "const [timeUnknown, setTimeUnknown] = useState(false);" not in content:
    content = content.replace("const [time, setTime] = useState('12:00');", 
                              "const [time, setTime] = useState('12:00');\n  const [timeUnknown, setTimeUnknown] = useState(false);")
    content = content.replace("const [customTime, setCustomTime] = useState('12:00');", 
                              "const [customTime, setCustomTime] = useState('12:00');\n  const [customTimeUnknown, setCustomTimeUnknown] = useState(false);")

# Update localStorage savings to account for unknown
content = content.replace("localStorage.setItem('userTime', time);", "localStorage.setItem('userTime', timeUnknown ? 'Unknown' : time);")

# Replace first time input
time1_old = """<input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400" />"""
time1_new = """
                  <div className="flex flex-col gap-2">
                    <input type={timeUnknown ? "text" : "time"} value={timeUnknown ? (lang === 'es' ? "Desconocida" : "Unknown") : time} disabled={timeUnknown} onChange={(e) => setTime(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400 disabled:opacity-50" />
                    <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer w-max">
                      <input type="checkbox" checked={timeUnknown} onChange={(e) => setTimeUnknown(e.target.checked)} className="accent-violet-500 w-3 h-3" />
                      {lang === 'es' ? 'No sé la hora' : "I don't know my birth time"}
                    </label>
                  </div>
"""
content = content.replace(time1_old, time1_new.strip())

# Replace second time input
time2_old = """<input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400" />"""
time2_new = """
                      <div className="flex flex-col gap-2">
                        <input type={customTimeUnknown ? "text" : "time"} value={customTimeUnknown ? (lang === 'es' ? "Desconocida" : "Unknown") : customTime} disabled={customTimeUnknown} onChange={(e) => setCustomTime(e.target.value)} style={{ colorScheme: "dark" }} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-400 disabled:opacity-50" />
                        <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer w-max">
                          <input type="checkbox" checked={customTimeUnknown} onChange={(e) => setCustomTimeUnknown(e.target.checked)} className="accent-violet-500 w-3 h-3" />
                          {lang === 'es' ? 'No sé la hora' : "I don't know the birth time"}
                        </label>
                      </div>
"""
content = content.replace(time2_old, time2_new.strip())

with open("src/components/features/SajuCompatibility.jsx", "w", encoding="utf-8") as f:
    f.write(content)
