import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { productId, email, activeTab } = body;

    console.log(`[Gumroad Checkout] Routing for ${activeTab} report (${productId})`);

    let gumroadUrl = "";

    // Map productId to Gumroad URL
    if (activeTab === 'beauty') {
      gumroadUrl = "https://jungler82.gumroad.com/l/dcgyl"; // $9.99
    } else {
      if (productId === 'q4' || productId === 'compatibility') {
        gumroadUrl = "https://jungler82.gumroad.com/l/unhqnj"; // $4.99
      }
      else if (productId === 'fullyear') {
        gumroadUrl = "https://jungler82.gumroad.com/l/chtgks"; // $9.99
      }
      else if (productId === 'bundle') {
        gumroadUrl = "https://jungler82.gumroad.com/l/zvlaq"; // $11.99
      }
      else {
        // Fallback to daily $0.99
        gumroadUrl = "https://jungler82.gumroad.com/l/zildp"; 
      }
    }

    return NextResponse.json({ 
      success: true, 
      checkoutUrl: gumroadUrl,
      message: "Redirecting to Gumroad Checkout"
    });

  } catch (error) {
    console.error('[Checkout Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
