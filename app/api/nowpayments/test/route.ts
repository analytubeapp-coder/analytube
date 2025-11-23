import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.nowpayments.io/v1/status", {
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
      },
    });

    const data = await res.json();
    return NextResponse.json({ ok: true, data });

  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}