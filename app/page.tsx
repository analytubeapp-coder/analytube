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
<section className="relative py-40 md:py-52 px-6 md:px-12">
  <div className="max-w-[100rem] mx-auto flex flex-col-reverse md:flex-row items-center gap-16">

    {/* LEFT — Text */}
    <div className="w-full md:w-1/2 text-left">
      <h1 className="text-[25px] md:text-[70px] font-bold mb-6 leading-[1.15]">
        Professional Email For<br />
        Your Brand. Without<br />
        A New Inbox.
      </h1>

      <p className="text-[14px] md:text-[20px] mt-10">
        Create branded email addresses for your business and receive all messages directly in
        <br className="hidden md:block" />
        your existing Gmail or Outlook no new inbox, no learning curve, no hassle.
      </p>

      <div className="mt-12">
        <button className="px-8 py-4 bg-[#5b65dc] text-white text-[20px] font-semibold rounded-full hover:bg-[#5b65dc]/80 transition">
          Get Started
        </button>
      </div>
    </div>

    {/* RIGHT — Image */}
<div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
  
  <img
    src="/header.svg"
    alt="Hero Image"
    className="w-full max-w-[580px]"
  />

  {/* ⭐ Stars INSIDE the image */}
  <div className="absolute bottom-43 left-56 w-[96px] h-[48px] flex justify-end items-center pointer-events-none">
    <img src="/star.svg" className="star star-1" alt="star" />
    <img src="/star.svg" className="star star-2" alt="star" />
  </div>

</div>



  </div>
</section>


      {/* Section 2 */}
<section className="bg-[#5B65DC] mt-32 py-24 px-6 md:px-12">
  <div className="max-w-[100rem] mx-auto text-center text-white">
    
    <h2 className="text-[32px] md:text-[52px] font-bold mb-6 leading-[1.15]">
      What Can [YourBrand]
      Do For Your Email?
    </h2>

    <p className="text-base md:text-[20px] mb-16 max-w-4xl mx-auto opacity-90">
      It instantly makes your business look more professional and credible, giving customers, partners,
      <br className="hidden md:block" />
      and clients the confidence to take you seriously from the very first email.
    </p>

{/* Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 max-w-[68rem] mx-auto justify-items-center">

  {/* Card 1 */}
  <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[15rem]
                  flex flex-col items-center text-center">
    <img
      src="1.svg"
      alt="Secure Delivery"
      className="w-10 h-10 mb-8"
    />
    <p className="font-regular text-[30px] leading-[1.1]">
      Secure<br />Delivery
    </p>
  </div>

  {/* Card 2 */}
  <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[15rem]
                  flex flex-col items-center text-center">
    <img
      src="2.svg"
      alt="Instant Setup"
      className="w-10 h-10 mb-8"
    />
    <p className="font-regular text-[30px] leading-[1.1]">
      Instant<br />Setup
    </p>
  </div>

  {/* Card 3 */}
  <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[15rem]
                  flex flex-col items-center text-center">
    <img
      src="3.svg"
      alt="Brand Boost"
      className="w-10 h-10 mb-8"
    />
    <p className="font-regular text-[30px] leading-[1.1]">
      Brand<br />Boost
    </p>
  </div>

  {/* Card 4 */}
  <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[15rem]
                  flex flex-col items-center text-center">
    <img
      src="4.svg"
      alt="Easy Integration"
      className="w-10 h-10 mb-8"
    />
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
        “Why businesses choose
        <br className="hidden md:block" />
        [YourBrand] for
        <br className="hidden md:block" />
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
    
    <h2 className="text-[25px] md:text-[52px] font-bold mb-8 leading-[1.2]">
      A professional email address
      <br className="hidden md:block" />
      is the smallest change that makes the
      <br className="hidden md:block" />
      biggest difference for your brand
    </h2>

    <p className="text-[14px] md:text-[20px] text-black/80 leading-relaxed">
      It’s the detail that quietly transforms how your business is perceived. A professional email
      <br className="hidden md:block" />
      address builds trust before conversations begin, adds legitimacy to every message, and positions your brand
      <br className="hidden md:block" />
      as established and reliable — without changing how you work or adding new tools.
    </p>

  </div>
</section>

      <Footer />
    </div>
  );
}