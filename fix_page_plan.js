const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8');

c = c.replace(/onClick=\{\(\) => setShowCheckout\(true\)\} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold text-zinc-300">Select Plan<\/button>/g, (match, offset) => {
  // First match is Q4 (around offset 5000-8000), Second is Full Year (around 10000+)
  if (offset < 10000) {
    return 'onClick={() => { setSelectedPlan("q4"); setShowCheckout(true); }} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold text-zinc-300">Select Plan</button>';
  } else {
    return 'onClick={() => { setSelectedPlan("fullyear"); setShowCheckout(true); }} className="w-full py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors font-bold text-zinc-300">Select Plan</button>';
  }
});

c = c.replace(/onClick=\{\(\) => setShowCheckout\(true\)\} className="w-full py-4 rounded-xl bg-yellow-500/, 'onClick={() => { setSelectedPlan("bundle"); setShowCheckout(true); }} className="w-full py-4 rounded-xl bg-yellow-500');

c = c.replace(/<CheckoutModal\s*\n\s*isOpen=\{showCheckout\}\s*\n\s*onClose=\{\(\) => setShowCheckout\(false\)\}\s*\n\s*activeTab=\{activeTab\}/, '<CheckoutModal \n          isOpen={showCheckout} \n          onClose={() => setShowCheckout(false)} \n          activeTab={activeTab} \n          selectedPlan={selectedPlan}');

fs.writeFileSync('src/app/page.js', c);
