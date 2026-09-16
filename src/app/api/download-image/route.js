import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { dataUrl } = await req.json();
    
    if (!dataUrl) {
      return NextResponse.json({ error: "Missing dataUrl" }, { status: 400 });
    }

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="K-Oracle_Talisman.png"',
      },
    });
  } catch (error) {
    console.error("Error generating image download:", error);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
