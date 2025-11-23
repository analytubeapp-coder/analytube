//app/api/nowpayments/create-payment/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { plan, userId } = await req.json();

    if (!userId) return NextResponse.json({ error: "User ID missing" }, { status: 400 });

    const price = plan === "yearly" ? 84 : 14;

    // ذخیره userId و plan داخل order_id
    const order_id = `${userId}__${plan}__${Date.now()}`;

    const body = {
      price_amount: price,
      price_currency: "usd",
      pay_currency: "any",
      order_id,
      order_description: `Analytube subscription - ${plan}`,
      ipn_callback_url: "https://analytubeapp.com/api/nowpayments/webhook",
    };

    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
console.log("NOWPayments invoice response:", JSON.stringify(data, null, 2));

// 🔍 اگر NOWPayments خطا برگرداند (مثلاً API key غلط باشد)
if (!data.invoice_url) {
  return NextResponse.json(
    { error: "NOWPayments error", details: data },
    { status: 400 }
  );
}

// ✔ اگر همه‌چیز OK بود
return NextResponse.json({ url: data.invoice_url });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}