"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/Price";

export default function Home() {
  return (
    <div className="antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white text-black py-32 px-6 text-center">
        <h1 className="text-[32px] md:text-[64px] font-bold mb-6 leading-[1.1]">
          PROFESSIONAL EMAIL FOR<br />
          YOUR BRAND. WITHOUT<br />
          A NEW INBOX.
        </h1>
        <p className="text-[18px] md:text-[22px] max-w-4xl mx-auto mb-8">
          Create branded email addresses for your business and receive all messages directly<br />
          in your existing Gmail or Outlook — no new inbox, no learning curve, no hassle.
        </p>
        <a
          href="#pricing"
          className="inline-block bg-yellow-400 text-black font-semibold px-8 py-4 rounded-lg hover:bg-yellow-300 transition"
        >
          Get Started
        </a>
      </section>

      {/* Section 2 */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">What can [YourBrand] do for your email?</h2>
        <p className="text-lg max-w-3xl mx-auto mb-12">
          It instantly makes your business look more professional and credible, giving customers, partners, and clients the confidence to take you seriously from the very first email.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-3">🔒</div>
            <p className="font-semibold">Secure</p>
            <p>Delivery</p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-3">⚡</div>
            <p className="font-semibold">Instant</p>
            <p>Setup</p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-3">🚀</div>
            <p className="font-semibold">Brand</p>
            <p>Boost</p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <div className="text-3xl mb-3">🔗</div>
            <p className="font-semibold">Easy</p>
            <p>Integration</p>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <Price />

      <Footer />
    </div>
  );
}