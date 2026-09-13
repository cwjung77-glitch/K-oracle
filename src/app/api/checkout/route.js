import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { productId, email, activeTab } = body;

    console.log(`[Lemon Squeezy Server] Creating checkout for ${activeTab} report (${productId}) -> Email: ${email}`);

    // HARDCODED FOR MVP DEPLOYMENT (Vercel doesn't have the env vars yet)
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY || "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIxYjQ4ZTFmODk4MTA2NDg5ODI1MTE5NjcwMWM3MDZkY2JhNGY1YjIyOGI2YTlmNzcxYjg0NzYyMzJkNGZlNGI1NjNmYjZjN2NjOTc2ZWRjNiIsImlhdCI6MTc4ODg0ODAyOC4wNTg2NzYsIm5iZiI6MTc4ODg0ODAyOC4wNTg2NzgsImV4cCI6MTgwNDQ2NDAwMC4wNDA4OTEsInN1YiI6Ijc5MjM2MDIiLCJzY29wZXMiOltdfQ.5cVg4fjVxiVU_EC0ZNAKzZ73PiHC7YFSqRlTNwt2prdsdD7tJrzTL2op457utzl36wTOw41SNwrtgmORClpzQCGE3bCpWZx_aQags_Uu0qXvmignJoGhGeGLj4bSvJ1qhfwKBYLj8ksmnUPw-V5sBmMjJ8p24e4INtEiiyeNliNJPEWvVJVehW2CIz4tStj2i0tZE5copxWH1eUaaiMQw9qjdCjpLEtwAUpTpza7qbz_CJZUA-0B2OWfLGJMcBV8I_Z5cIkMPBHHILhjfi76xHgecrz_10jG9oYlfg6dONuNC7wzZFyapLCdFaie2-92NkNp8GdfmL4wee82deh4g2BKwBrBaTfyd8zf4ZIhjgT63fI6m_ayLlUmVr5W43Dt6Dhz0craQr9vSY-jiwVIxT7hpseJadTB4VvCbK13BOoHEzEsqsOhCKVrCANQoMCoV8Pyby2FUScRDlctpyYLV2K7yeWyEe6CJetJpYgrCJGlaH6WVDTPHlORW_6uQ24N3RCt7l2rbWB8RuTQ9Q7Y8jCPtKeTZfSvNW4Kx9xyLktdzj2z_ind0L2BvlE6xbJ6nOPUNpHEVCcJvWEhlyeiCSVbKd8a5b9zbGIr95P1-V9gGEa40pZavJF66s-tZpS-Tb9Z2irkfi-gdM7zbFdK2VoJhPNk3UehMlW2ZXT8uX8";
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID || "469778";
    
    // Map productId to Variant ID
    let variantId = "";
    if (activeTab === 'beauty') {
      variantId = "2103674"; // Beauty
    } else {
      if (productId === 'q4') variantId = "2103661";
      else if (productId === 'fullyear') variantId = "2103670";
      else if (productId === 'compatibility') variantId = "2103661"; // Mapping to $2.99 tier for MVP
      else variantId = "2103672"; // Bundle
    }

    // Calculate domain for redirect based on request origin
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
      return NextResponse.json({ success: false, error: JSON.stringify(resData) }, { status: 500 });
    }

    const checkoutUrl = resData.data.attributes.url;

    return NextResponse.json({ 
      success: true, 
      checkoutUrl: checkoutUrl,
      message: "Checkout session created successfully via Lemon Squeezy API"
    });

  } catch (error) {
    console.error('[Checkout Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
