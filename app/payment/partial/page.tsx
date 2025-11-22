//payment/partial/page.tsx

"use client"
import { useRouter } from "next/navigation";

export default function PartialPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-600">Payment Partially Completed</h1>
      <p className="mt-4 text-lg">Your payment is still pending. Please complete your payment to finalize the subscription.</p>
      <button
        onClick={() => router.push("/pricing")}
        className="mt-6 px-6 py-3 bg-gray-300 text-black rounded-full"
      >
        Complete Payment
      </button>
    </div>
  );
}