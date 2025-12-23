"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/Price";

export default function PricePage() {
  return (
    <>
      <main className="min-h-screen w-full bg-white relative">
        <Navbar />

      <Price />

      <Footer />
      </main>
    </>
  );
}