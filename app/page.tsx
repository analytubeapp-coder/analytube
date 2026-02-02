"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/Price";
import Faq from "@/components/Faq";


export default function Home() {
  return (
    <div className="antialiased bg-white text-black">
      <Navbar />

      {/* Hero Section */}
<section className="relative py-20 md:py-52 px-6 md:px-12">
  <div className="max-w-[100rem] mx-auto flex flex-col-reverse md:flex-row items-center gap-16">

    {/* LEFT — Text */}
    <div className="w-full text-left">
      <h1 className="text-[28px] md:text-[56px] mt-4 md:mt-10 font-bold mb-6 leading-[1.15]">
        Check Your Email Health in Seconds
        <br className="hidden md:block" />
        Keep Your Business Communication
        <br className="hidden md:block" />
        Reliable and Spam-Free
      </h1>

      <p className="text-[16px] md:text-[20px] mt-4 md:mt-10">
        Instantly analyze <strong>SPF</strong>, <strong>DKIM</strong>, <strong>DMARC</strong>, and forwarding settings to ensure your emails always reach the inbox,
        <br className="hidden md:block" />
        stay out of spam, and maintain smooth, reliable business communication.
      </p>

      <div className="mt-12">
        <button className="px-6 md:px-8 py-3 md:py-4 bg-[#5b65dc] text-white text-[16px] md:text-[20px] font-semibold rounded-full hover:bg-[#5b65dc]/80 transition">
          Start Free Check
        </button>
      </div>
    </div>

    {/* RIGHT — Image */}
<div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
  
  {/*
  <img
    src="/header.svg"
    alt="Hero Image"
    className="w-full max-w-[580px]"
  />
  */}

  {/* ⭐ Stars INSIDE the image */}
  <div className="absolute bottom-43 left-56 w-[96px] h-[48px] flex justify-end items-center pointer-events-none">
    <img src="/star.svg" className="star star-1" alt="star" />
    <img src="/star.svg" className="star star-2" alt="star" />
  </div>

</div>
  </div>
</section>


    {/* Section 2 */}
<section className="bg-[#5B65DC] mt-10 md:mt-32 py-24 px-6 md:px-12">
  <div className="max-w-[100rem] mx-auto text-center text-white">
    
    <h2 className="text-[26px] md:text-[56px] font-bold mb-6 leading-[1.15]">
      What We Can Do For You
    </h2>

    <p className="text-base text-[16px] md:text-[20px] mb-16 max-w-7xl mx-auto opacity-90">
      Discover how CheckEmailHealth helps you keep your emails safe, deliverable, and your business communication reliable. Instantly identify
      <br className="hidden md:block" />
      issues like SPF, DKIM, DMARC, and forwarding misconfigurations to ensure every message reaches its recipient.

    </p>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-[150rem] mx-auto justify-items-center">

      {/* Card 1 */}
      <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[60rem] flex flex-col items-center text-center min-h-[200px] hover:scale-105 transition-transform">
        <img src="1.svg" alt="Email Health Check" className="w-10 h-10 mb-4" />
        <h3 className="text-[18px] md:text-[22px] font-bold mb-2">Email Health Check</h3>
        <p className="text-white/90 text-[14px] md:text-[18px] leading-relaxed">
          Analyze your domain's email setup and detect issues affecting deliverability in seconds.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[60rem] flex flex-col items-center text-center min-h-[200px] hover:scale-105 transition-transform">
        <img src="2.svg" alt="Spam Risk Detection" className="w-10 h-10 mb-4" />
        <h3 className="text-[18px] md:text-[22px] font-bold mb-2">Spam Risk Detection</h3>
        <p className="text-white/90 text-[14px] md:text-[18px] leading-relaxed">
          Identify problems that may cause your emails to land in spam instead of the inbox.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[60rem] flex flex-col items-center text-center min-h-[200px] hover:scale-105 transition-transform">
        <img src="3.svg" alt="Configuration Insights" className="w-10 h-10 mb-4" />
        <h3 className="text-[18px] md:text-[22px] font-bold mb-2">Configuration Insights</h3>
        <p className="text-white/90 text-[14px] md:text-[18px] leading-relaxed">
          Check SPF, DKIM, DMARC, and forwarding settings with clear, easy-to-understand results.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[60rem] flex flex-col items-center text-center min-h-[200px] hover:scale-105 transition-transform">
        <img src="4.svg" alt="Fix Suggestions" className="w-10 h-10 mb-4" />
        <h3 className="text-[18px] md:text-[22px] font-bold mb-2">Fix Suggestions</h3>
        <p className="text-white/90 text-[14px] md:text-[18px] leading-relaxed">
          Get practical suggestions to fix issues and improve email reliability instantly.
        </p>
      </div>

    </div>
  </div>
</section>

{/* Section */}
<section className="bg-white mt-10 md:mt-40 mb-40 py-32 px-6 md:px-12">
  <div className="max-w-[100rem] mx-auto">

    {/* Right aligned content */}
    <div className="max-w-[52rem] ml-auto text-left">

      <h3 className="text-[26px] md:text-[48px] font-bold leading-[1.2] mb-4">
        Why Email Health and Deliverability<br className="hidden md:block" />
        Matter for Your Business
      </h3>

      <p className="text-base text-[16px] md:text-[20px] text-black leading-relaxed space-y-4">
        Email deliverability issues can silently damage your business communication, reduce response rates, and cause important messages to land in spam without you even noticing.
        <br />
        Misconfigured SPF, DKIM, DMARC, or email forwarding settings are some of the most common reasons emails fail to reach the inbox.
        <br />
        CheckEmailHealth helps you quickly identify these problems and understand exactly what’s affecting your email performance, so you can protect your domain reputation and ensure reliable email delivery.
      </p>

    </div>
  </div>
</section>

     {/* Faq Section */}

     <section className="bg-white md:mt-32">
      <Faq />
     </section>


      {/* Price Section */}
      <Price />

      {/* Final Section */}
<section className="bg-white py-32 px-6 md:px-12">
  <div className="max-w-7xl mx-auto text-center">

    {/* Headline */}
    <h2 className="text-[26px] md:text-[52px] font-bold mb-8 leading-[1.2]">
      Take Control of Your Email Health
      <br className="hidden md:block" />
      and Deliverability to Protect Your Business
      <br className="hidden md:block" />
      Communication and Domain Reputation
    </h2>

    {/* Description */}
    <p className="text-[14px] md:text-[20px] text-black/80 leading-relaxed mb-12">
      Email deliverability issues often remain hidden until they start impacting open rates, reply rates, and customer trust.
      <br className="hidden md:block" />
      Problems with SPF, DKIM, DMARC, or email forwarding configurations can silently damage your domain reputation and cause critical business
      <br className="hidden md:block" />
      emails to land in spam folders. CheckEmailHealth gives you a fast and reliable way to analyze your email setup, identify deliverability risks,
      <br className="hidden md:block" />
      and take action before email issues affect your sales, support, and day-to-day business communication.
    </p>

    {/* CTA Button */}
    <button className="px-6 md:px-8 py-3 md:py-4 bg-[#5B65DC] text-white text-[16px] md:text-[20px] font-semibold rounded-full hover:bg-[#5B65DC]/80 transition">
      Start Free Check
    </button>

  </div>
</section>

      <Footer />
    </div>
  );
}