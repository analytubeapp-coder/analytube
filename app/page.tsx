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
      <section className="relative py-54 px-6 md:px-12">
        <div className="max-w-[100rem] mx-auto flex flex-col-reverse md:flex-row items-center">
          {/* Text */}
          <div className="w-full text-left">
            <h1 className="text-[25px] md:text-[68px] font-bold mb-6 leading-[1.15]">
              PROFESSIONAL EMAIL FOR<br />
              YOUR BRAND. WITHOUT<br />
              A NEW INBOX.
            </h1>
            <p className="text-[14px] md:text-[22px] mb-8">
              Create branded email addresses for your business and receive all messages directly in <br />
              your existing Gmail or Outlook — no new inbox, no learning curve, no hassle.
            </p>

{/* Email Signup Box */}
<div className="mt-12 relative max-w-[38rem] w-full">
  <input
    type="email"
    placeholder="Enter your email"
    className="w-full px-6 py-5 pr-40 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5b65dc]/20"
  />
  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-[#5b65dc] text-white font-semibold rounded-full hover:bg-[#5b65dc]/80 transition">
    Get Started
  </button>
</div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
<section className="bg-[#5B65DC] mt-32 py-24 px-6 md:px-12">
  <div className="max-w-[100rem] mx-auto text-center text-white">
    
    <h2 className="text-[32px] md:text-[52px] font-bold mb-6 leading-[1.15]">
      What Can [YourBrand]<br />
      Do For Your Email?
    </h2>

    <p className="text-base md:text-[20px] mb-16 max-w-4xl mx-auto opacity-90">
      It instantly makes your business look more professional and credible, giving customers, partners,<br />
      and clients the confidence to take you seriously from the very first email.
    </p>

    {/* Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
                gap-y-6 gap-x-4 
                max-w-[68rem] mx-auto justify-items-center">
  
  <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[15rem]">
    <div className="text-4xl mb-5">🔒</div>
    <p className="font-regular text-[30px] leading-[1.1]">
      Secure<br />Delivery
    </p>
  </div>

  <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[15rem]">
    <div className="text-4xl mb-5">⚡</div>
    <p className="font-regular text-[30px] leading-[1.1]">
      Instant<br />Setup
    </p>
  </div>

  <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[15rem]">
    <div className="text-4xl mb-5">🚀</div>
    <p className="font-regular text-[30px] leading-[1.1]">
      Brand<br />Boost
    </p>
  </div>

  <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[15rem]">
    <div className="text-4xl mb-5">🔗</div>
    <p className="font-regular text-[30px] leading-[1.1]">
      Easy<br />Integration
    </p>
  </div>
</div>
  </div>
</section>

{/* Testimonial Section */}
<section className="bg-white mt-40 mb-40 py-32 px-6 md:px-12">
  <div className="max-w-[100rem] mx-auto">

    {/* Right aligned content */}
    <div className="max-w-[52rem] ml-auto text-left">

      <h3 className="text-[28px] md:text-[52px] font-bold leading-[1.2] mb-8">
        “Why businesses choose<br />
        [YourBrand] for<br />
        professional email”
      </h3>

      <p className="text-base md:text-[20px] leading-[1.6] text-black">
        Switching to <span className="font-semibold">[YourBrand]</span> was a complete
        game-changer. Our emails now carry real authority, and clients trust us
        instantly. Setup was seamless — no new inbox, no headaches, just
        professional communication from day one.
      </p>

    </div>
  </div>
</section>

{/* Faq Section */}
      <Faq />

      {/* Price Section */}
      <Price />

      {/* Professional Email Highlight Section */}
<section className="bg-white py-32 px-6 md:px-12">
  <div className="max-w-5xl mx-auto text-center">
    
    <h2 className="text-[32px] md:text-[52px] font-bold mb-8 leading-[1.2]">
      A professional email address<br />
      is the smallest change that makes the<br />
      biggest difference for your brand
    </h2>

    <p className="text-base md:text-[20px] text-black/80 leading-relaxed">
      It’s the detail that quietly transforms how your business is perceived. A professional email<br />
      address builds trust before conversations begin, adds legitimacy to every message, and positions your brand<br />
      as established and reliable — without changing how you work or adding new tools.
    </p>

  </div>
</section>

      <Footer />
    </div>
  );
}