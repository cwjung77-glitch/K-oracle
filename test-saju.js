async function run() {
  const res = await fetch('http://localhost:3000/api/generate-saju', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan: 'compatibility', idolName: 'Karina', userName: 'Test User', birthData: '1990-01-01 12:00', gender: 'male', lang: 'en' })
  });
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response:", text.substring(0, 200));
}
run();
