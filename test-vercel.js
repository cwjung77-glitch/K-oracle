async function run() {
  const res = await fetch('https://k-oracle-omega.vercel.app/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: 'compatibility', email: 'test@test.com', activeTab: 'saju' })
  });
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response:", text);
}
run();
