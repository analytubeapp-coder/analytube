//payment/failed/page.tsx

"use client"
import { useRouter } from "next/navigation";

export default function FailedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-4 text-lg">There was an issue with your payment. Please try again.</p>
      <button
        onClick={() => router.push("/pricing")}
        className="mt-6 px-6 py-3 bg-gray-300 text-black rounded-full"
      >
        Try Again
      </button>
    </div>
  );
}