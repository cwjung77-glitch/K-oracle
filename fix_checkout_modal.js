const fs = require('fs');
let c = fs.readFileSync('src/components/features/CheckoutModal.jsx', 'utf8').replace(/\r\n/g, '\n');

const newForm = `        {/* Form */}
        <form onSubmit={handlePay} className="p-6">
          <div className="space-y-4 animate-in fade-in duration-300">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              To ensure the highest level of security and global compliance, your payment will be processed securely by our official merchant of record, <strong className="text-white">Lemon Squeezy</strong>.
            </p>
            
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2">Email for Receipt & Access</label>
              <input type="email" id="email" name="email" required placeholder="you@example.com" className="w-full px-4 py-3.5 bg-zinc-900 rounded-xl border border-zinc-700 focus:border-zinc-400 outline-none transition-all text-white placeholder-zinc-500 font-medium" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            className={\`w-full mt-8 \${bgTheme} \${hoverTheme} text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]\`}
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin" size={20} /> Redirecting...</>
            ) : (
              <><ShieldCheck size={18} /> Proceed to Secure Checkout</>
            )}
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-bold uppercase tracking-widest">
            <Lock size={14} /> 256-bit Secure Encryption
          </div>
        </form>`;

// Find everything from {/* Form */} to the end of the form.
const regex = /\{\/\* Form \*\/\}\n\s*<form onSubmit=\{handlePay\} className="p-6">[\s\S]*?<\/form>/;
c = c.replace(regex, newForm);

// Also remove the `method` state since it's no longer needed
c = c.replace(/const \[method, setMethod\] = useState\('card'\); \/\/ 'card' or 'digital'\n/, '');

fs.writeFileSync('src/components/features/CheckoutModal.jsx', c);
