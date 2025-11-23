//app/api/nowpayments/webhook/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Webhook received:", body);

    const status = body.payment_status;
    const orderId = body.order_id;

    if (!orderId) {
      return NextResponse.json({ error: "No order_id" }, { status: 400 });
    }

    // order_id = userId__plan__timestamp
    const [userId, plan] = orderId.split("__");

    if (status === "finished") {
      const now = new Date();
      let endDate = new Date(now);

      if (plan === "monthly") {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (plan === "yearly") {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      const { error } = await supabase
        .from("users")
        .update({
          plan,
          subscription_start: now.toISOString(),
          subscription_end: endDate.toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;

      console.log(`Subscription activated for user: ${userId}, plan: ${plan}`);
    } else {
      console.log("Payment not finished:", status);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}