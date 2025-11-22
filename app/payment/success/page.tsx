//payment/success/page.tsx

"use client"
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // در اینجا می‌توانید داده‌های پرداخت رو از URL دریافت کنید و ذخیره کنید
    // این معمولاً با استفاده از query params انجام می‌شود، مثل order_id
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg">Thank you for subscribing to AnalyTube.</p>
      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 px-6 py-3 bg-[#E94C88] text-white rounded-full"
      >
        Go to Dashboard
      </button>
    </div>
  );
}