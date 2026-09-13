const fs = require('fs');
let c = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

if (!c.includes('const [showRequestIdol, setShowRequestIdol] = useState(false);')) {
  c = c.replace(/const \[gender, setGender\] = useState\('female'\);/, "const [gender, setGender] = useState('female');\n  const [showRequestIdol, setShowRequestIdol] = useState(false);\n  const [requestName, setRequestName] = useState('');\n  const [requestStatus, setRequestStatus] = useState('');");
}

c = c.replace(
  /<span className="text-xs text-yellow-500 cursor-pointer hover:underline">\+ Request Missing Idol<\/span>/g,
  '<span onClick={() => setShowRequestIdol(true)} className="text-xs text-yellow-500 cursor-pointer hover:underline">+ Request Missing Idol</span>'
);

const formUI = `              {showRequestIdol && (
                <div className="mt-2 p-4 bg-zinc-900 border border-yellow-500/30 rounded-xl animate-in fade-in slide-in-from-top-2 mb-4">
                  {requestStatus ? (
                    <div className="text-yellow-500 text-sm font-bold text-center py-2">{requestStatus}</div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-zinc-400">Request a new idol to be added</span>
                        <button onClick={() => setShowRequestIdol(false)} className="text-xs text-zinc-500 hover:text-zinc-300">Close</button>
                      </div>
                      <div className="flex gap-2">
                        <input type="text" value={requestName} onChange={(e) => setRequestName(e.target.value)} placeholder="Type Idol and Group Name..." className="flex-1 bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500" />
                        <button onClick={() => { if(requestName.trim()) { setRequestStatus('Request sent to Oracle AI! 🚀'); setTimeout(() => { setShowRequestIdol(false); setRequestStatus(''); setRequestName(''); }, 3000); } }} className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400">Send</button>
                      </div>
                    </div>
                  )}
                </div>
              )}`;

c = c.replace(
  /<div className="relative">\s*<input/,
  formUI + '\n                <div className="relative">\n                  <input'
);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', c);
