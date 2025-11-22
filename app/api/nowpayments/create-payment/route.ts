import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { plan } = await req.json(); // دریافت "monthly" یا "yearly"

    const price = plan === "yearly" ? 84 : 14; // تعیین قیمت بسته به انتخاب

    const body = {
      price_amount: price, // مقدار قیمت
      price_currency: "usd", // ارز قیمت
      pay_currency: "usdttrc20", // ارزی که کاربر پرداخت میکنه
      order_id: `order_${Date.now()}`, // ID منحصر به فرد برای هر سفارش
      order_description: `Analytube subscription - ${plan}`, // توضیحات سفارش
      ipn_callback_url: "https://analytubeapp.com/api/nowpayments/webhook", // URL برای دریافت وضعیت پرداخت
    };

    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY!, // استفاده از API Key
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // ارسال داده‌های درخواست
    });

    const data = await res.json(); // دریافت پاسخ از NOWPayments

    console.log("NOWPayments invoice response:", data);

    return NextResponse.json({ url: data.invoice_url }); // برگرداندن URL پرداخت به کاربر
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}