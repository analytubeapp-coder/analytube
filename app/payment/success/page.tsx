"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // handle order_id or query params here if needed
  }, []);

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