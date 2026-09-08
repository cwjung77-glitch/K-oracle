const fs = require('fs');
let c = fs.readFileSync('src/components/features/CheckoutModal.jsx', 'utf8');

const replacement = `
export default function CheckoutModal({ isOpen, onClose, onSuccess, activeTab, selectedPlan }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState('card'); // 'card' or 'digital'

  if (!isOpen) return null;

  const isBeauty = activeTab === 'beauty';
  
  let productName = "2027 Full Destiny Report";
  let price = "$4.99";
  
  if (isBeauty) {
    productName = "K-Beauty Deep Dive Report";
    price = "$9.99";
  } else {
    if (selectedPlan === 'q4') {
      productName = "2027 Q4 Finale Report";
      price = "$2.99";
    } else if (selectedPlan === 'fullyear') {
      productName = "2028 Full Year Report";
      price = "$4.99";
    } else {
      productName = "27+28 Bundle Report";
      price = "$5.99";
    }
  }

  const themeColor = isBeauty ? "text-pink-400" : "text-yellow-500";
`;

c = c.replace(/export default function CheckoutModal.*?const themeColor = isBeauty \? "text-pink-400" : "text-yellow-500";/s, replacement.trim());

// Update fetch call body
c = c.replace(/productId: isBeauty \? 'prod_beauty' : 'prod_saju'/, `productId: isBeauty ? 'prod_beauty' : selectedPlan`);

// Uncomment redirect
c = c.replace(/\/\/ window\.location\.href = data\.checkoutUrl; \/\/ In real life, redirect here./, 'window.location.href = data.checkoutUrl;');
// Comment out onSuccess (as they will be redirected)
c = c.replace(/onSuccess\(\); \/\/ Simulate successful return from checkout for MVP/, '// onSuccess();');

fs.writeFileSync('src/components/features/CheckoutModal.jsx', c);
