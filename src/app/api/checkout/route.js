import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { productId, email, activeTab } = body;

    console.log(`[Lemon Squeezy Server] Creating checkout for ${activeTab} report (${productId}) -> Email: ${email}`);

    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    
    if (!apiKey || !storeId) {
      console.warn("Missing Lemon Squeezy Env Vars, falling back to mock");
      return NextResponse.json({ 
        success: true, 
        checkoutUrl: 'https://k-oracle.lemonsqueezy.com/checkout/buy/saju-2027?mock=true',
      });
    }

    // Map productId to Variant ID
    let variantId = "";
    if (activeTab === 'beauty') {
      variantId = "2103674"; // Beauty
    } else {
      if (productId === 'q4') variantId = "2103661";
      else if (productId === 'fullyear') variantId = "2103670";
      else variantId = "2103672"; // Bundle
    }

    // Calculate domain for redirect based on request origin
    // Fallback to localhost if origin is undefined
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const returnUrl = `${origin}/success`;

    // Call Lemon Squeezy API
    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            product_options: {
              redirect_url: returnUrl
            },
            checkout_data: {
              email: email,
              custom: {
                tab: activeTab
              }
            }
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: storeId.toString()
              }
            },
            variant: {
              data: {
                type: "variants",
                id: variantId.toString()
              }
            }
          }
        }
      })
    });

    const resData = await response.json();

    if (!response.ok) {
      console.error("Lemon Squeezy API Error:", resData);
      throw new Error("Payment gateway failed to initialize");
    }

    const checkoutUrl = resData.data.attributes.url;

    return NextResponse.json({ 
      success: true, 
      checkoutUrl: checkoutUrl,
      message: "Checkout session created successfully via Lemon Squeezy API"
    });

  } catch (error) {
    console.error('[Checkout Error]', error);
    return NextResponse.json({ success: false, error: 'Payment gateway failed' }, { status: 500 });
  }
}
