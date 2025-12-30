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
    <div className="w-full md:w-3/4 text-left">
      <h1 className="text-[25px] md:text-[68px] font-bold mb-6 leading-[1.15]">
        Move In Confidently<br />
        Avoid Rental Scams &<br />
        Legal Mistakes in Canada!
      </h1>

      <p className="text-[14px] md:text-[20px] mt-10">
        “5 actionable guides + trackers to protect your deposit,
        <br className="hidden md:block" />
        understand your rental rights, and survive rental life in Canada.”
      </p>

      <div className="mt-12">
        <button className="px-8 py-4 bg-[#5b65dc] text-white text-[20px] font-semibold rounded-full hover:bg-[#5b65dc]/80 transition">
          Get Your Kit Now
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
      What [YourBrandName] Can Do For You?
    </h2>

    <p className="text-base md:text-[20px] mb-16 max-w-7xl mx-auto opacity-90">
      Everything you need to rent safely in Canada understand your tenant rights, avoid common scams, manage deposits and payments,
      <br className="hidden md:block" />
      and enjoy a smooth move in and move-out experience all in one simple, easy-to-use kit.
    </p>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-[150rem] mx-auto justify-items-center">

      {/* Card 1 */}
      <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[30rem] flex flex-col items-center text-center min-h-[250px] hover:scale-105 transition-transform">
        <img src="1.svg" alt="Know Your Rights" className="w-10 h-10 mb-4" />
        <h3 className="text-[18px] md:text-[23px] font-bold mb-2">Know Your Rights</h3>
        <p className="text-white/90 text-[14px] md:text-[18px] leading-relaxed">
          Understand your tenant rights and responsibilities in Canada.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[30rem] flex flex-col items-center text-center min-h-[250px] hover:scale-105 transition-transform">
        <img src="2.svg" alt="Avoid Rental Scams" className="w-10 h-10 mb-4" />
        <h3 className="text-[18px] md:text-[23px] font-bold mb-2">Avoid Rental Scams</h3>
        <p className="text-white/90 text-[14px] md:text-[18px] leading-relaxed">
          Learn the most common scams and how to spot fraudulent landlords.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[30rem] flex flex-col items-center text-center min-h-[250px] hover:scale-105 transition-transform">
        <img src="3.svg" alt="Track Payments" className="w-10 h-10 mb-4" />
        <h3 className="text-[18px] md:text-[23px] font-bold mb-2">Track Payments & Deposits</h3>
        <p className="text-white/90 text-[14px] md:text-[18px] leading-relaxed">
          Manage rent payments & deposits with simple templates.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white/10 backdrop-blur p-8 rounded-2xl w-full max-w-[30rem] flex flex-col items-center text-center min-h-[250px] hover:scale-105 transition-transform">
        <img src="4.svg" alt="Smooth Move" className="w-10 h-10 mb-4" />
        <h3 className="text-[18px] md:text-[23px] font-bold mb-2">Smooth Move-In & Move-Out</h3>
        <p className="text-white/90 text-[14px] md:text-[18px] leading-relaxed">
          Step-by-step checklist for a hassle-free moving experience.
        </p>
      </div>

    </div>
  </div>
</section>

{/* Section */}
<section className="bg-white mt-40 mb-40 py-32 px-6 md:px-12">
  <div className="max-w-[100rem] mx-auto">

    {/* Right aligned content */}
    <div className="max-w-[52rem] ml-auto text-left">

      <h3 className="text-[28px] md:text-[52px] font-bold leading-[1.2] mb-8">
        "Take Control of Your Rental<br className="hidden md:block" />
        Experience in Canada"
      </h3>

      <p className="text-base md:text-[20px] text-black leading-relaxed space-y-4">
        Renting in Canada doesn’t have to be stressful. Avoid costly mistakes, rental scams, and confusing paperwork with one simple, easy-to-use toolkit.
        <br className="hidden md:block" />
        The Canada Rental Survival Kit gives you everything you need to move in confidently: clear guides on your tenant rights, ready-to-use templates for deposits and payments, and checklists to keep your move smooth and hassle-free.
        <br className="hidden md:block" />
        Whether it’s your first rental or you’re moving across provinces, this kit ensures you’re protected, informed, and fully prepared so you can focus on making your new place feel like home.
        <strong> Get your kit today and move in confidently!</strong>
      </p>

    </div>
  </div>
</section>

{/* Faq Section */}
      <Faq />

      {/* Price Section */}
      <Price />

      {/* Final Section */}
<section className="bg-white py-32 px-6 md:px-12">
  <div className="max-w-6xl mx-auto text-center">

    {/* Headline */}
    <h2 className="text-[25px] md:text-[52px] font-bold mb-8 leading-[1.2]">
      Move In Confidently, Protect Your Deposit,
      <br className="hidden md:block" />
      Avoid Rental Scams, and Master Your Rental Experience Across Canada
    </h2>

    {/* Description */}
    <p className="text-[14px] md:text-[20px] text-black/80 leading-relaxed mb-12">
      The Canada Rental Survival Kit is your all-in-one toolkit for a stress-free rental experience. 
      <br className="hidden md:block" />
      Inside, you’ll find clear, easy-to-follow guides on your tenant rights, ready-to-use templates to track deposits and payments, and step-by-step checklists to ensure a smooth move-in and move-out. 
      <br className="hidden md:block" />
      Whether it’s your first rental or you’re relocating across provinces, this kit equips you with everything you need to stay informed, avoid common pitfalls, and enjoy your new home confidently.
    </p>

    {/* CTA Button */}
    <button className="px-10 py-5 bg-[#5B65DC] text-white text-[20px] font-semibold rounded-full hover:bg-[#5B65DC]/80 transition">
      Get Your Kit Now
    </button>

  </div>
</section>

      <Footer />
    </div>
  );
}