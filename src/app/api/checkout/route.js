import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { productId, email, activeTab } = body;

    console.log(`[Lemon Squeezy Server] Creating checkout for ${activeTab} report -> Email: ${email}`);

    // In a real production environment, you would use the Lemon Squeezy API here:
    // const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', { ... })
    // using process.env.LEMON_SQUEEZY_API_KEY
    
    // For this MVP demonstration, we simulate the API response delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Determine the mock URL based on the product
    const mockCheckoutUrl = activeTab === 'beauty' 
      ? 'https://k-oracle.lemonsqueezy.com/checkout/buy/beauty-deep-dive?mock=true'
      : 'https://k-oracle.lemonsqueezy.com/checkout/buy/saju-2027?mock=true';

    return NextResponse.json({ 
      success: true, 
      checkoutUrl: mockCheckoutUrl,
      message: "Checkout session created successfully via Lemon Squeezy API"
    });

  } catch (error) {
    console.error('[Checkout Error]', error);
    return NextResponse.json({ success: false, error: 'Payment gateway failed' }, { status: 500 });
  }
}
