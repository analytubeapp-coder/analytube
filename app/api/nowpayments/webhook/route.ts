import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("NOWPayments Webhook:", body);

    // اینجا بعدا چک می‌کنیم signature معتبره یا نه
    // بعدش داخل دیتابیس ثبت می‌کنیم

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }
}