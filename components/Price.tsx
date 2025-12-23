"use client";

import { useState } from "react";

export default function PricingSection() {
  const [billing, setBilling] = useState("yearly");

  const prices = {
    yearly: {
      starter: 9,
      creator: 15,
      pro: 32,
      saveStarter: "save $60",
      saveCreator: "save $108",
      savePro: "save $204",
    },
    monthly: {
      starter: 14,
      creator: 24,
      pro: 49,
    },
  };

  const p = billing === "yearly" ? prices.yearly : prices.monthly;

  return (
    <section className="py-52">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-10 text-black">
          Accelerate Your Growth With [YourBrand]
        </h2>

        {/* BILLING TOGGLE */}
        <div className="flex justify-center mb-20">
          <div
            className="
              flex p-1 rounded-full text-[18px] select-none
              bg-[#eeeffd]/30 backdrop-blur-xl border border-[#5b65dc]/20
            "
          >
            <button
              onClick={() => setBilling("monthly")}
              className={`
                px-4 py-2 rounded-full transition
                ${
                  billing === "monthly"
                    ? "bg-[#5b65dc] text-white font-semibold"
                    : "text-black"
                }
              `}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`
                px-4 py-2 rounded-full transition
                ${
                  billing === "yearly"
                    ? "bg-[#5b65dc] text-white font-semibold"
                    : "text-black"
                }
              `}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 py-0">

          {/* CARD — 1 */}
<div
  className="
    p-14 rounded-[20px] h-full
    bg-[#eeeffd]/30 backdrop-blur-xl
    border border-[#5b65dc]/20
    shadow-[0_8px_24px_rgba(0,0,0,0.15)]
    hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]
    transition-all duration-300
    flex flex-col text-black
  "
>
            {/* Title + Save */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[24px] font-bold text-black">Starter</h3>
              {billing === "yearly" && (
                <span className="text-[20px] font-medium text-[#5b65dc]">
                  {prices.yearly.saveStarter}
                </span>
              )}
            </div>

            {/* PRICE */}
            <div className="flex items-end gap-2 mb-10">
              <span className="text-[62px] font-bold leading-none">${p.starter}</span>
              <span className="text-[18px] text-black/80 mb-2">/month</span>
            </div>

            {/* FEATURES — 1 */}
<ul className="text-left text-[18px] text-black/80 leading-relaxed space-y-3 mb-12">
  <li>• asdfghj</li>
  <li>• dfghj</li>
  <li>• Svgbhj</li>
  <li>• qwertyu</li>
  <li>• Stsdfgh</li>
  <li>• dfghj</li>
</ul>

            {/* BUTTON */}
            <button
              onClick={() => window.location.href = "/signup"}
              className="
                mt-auto block px-1 py-3 w-[140px]
                border border-[2.5px] border-[#5b65dc]
                text-black text-[18px]
                rounded-full font-semibold transition mx-auto text-center
              "
            >
              Subscribe
            </button>
          </div>

          {/* CARD — 2 */}
<div
  className="
    p-14 rounded-[20px] h-full
    bg-[#eeeffd]/80 backdrop-blur-xl
    border border-[#5b65dc] border-[3px]
    shadow-[0_8px_24px_rgba(91,101,220,0.25)]
    hover:shadow-[0_12px_32px_rgba(91,101,220,0.35)]
    transition-all duration-300
    flex flex-col text-black
  "
>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[24px] font-bold">Pro</h3>
              {billing === "yearly" && (
                <span className="text-[20px] font-medium text-[#5b65dc]">
                  {prices.yearly.saveCreator}
                </span>
              )}
            </div>

            <div className="flex items-end gap-2 mb-10">
              <span className="text-[58px] font-bold leading-none">${p.creator}</span>
              <span className="text-[18px] text-black/80 mb-2">/month</span>
            </div>

            {/* FEATURES — 2 */}
<ul className="text-left text-[18px] text-black/80 leading-relaxed space-y-3 mb-12">
  <li>• uuuuuuuu</li>
  <li>• oooooooo</li>
  <li>• kkkkkkk</li>
  <li>• jjjjjj</li>
  <li>• mnhhhhh</li>
  <li>• hhhhhhh</li>
  <li>• jjjjjjjj</li>
</ul>

            <button
              onClick={() => window.location.href = "/signup"}
              className="
                mt-auto block px-1 py-3 w-[140px]
                bg-[#5b65dc] hover:bg-[#5b65dc]/80
                text-white text-[20px] rounded-full
                font-semibold transition mx-auto text-center
              "
            >
              Subscribe
            </button>
          </div>

          {/* CARD — 3 */}
<div
  className="
    p-14 rounded-[20px] h-full
    bg-[#eeeffd]/30 backdrop-blur-xl
    border border-[#5b65dc]/20
    shadow-[0_8px_24px_rgba(0,0,0,0.15)]
    hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]
    transition-all duration-300
    flex flex-col text-black
  "
>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[24px] font-bold">Studio</h3>
              {billing === "yearly" && (
                <span className="text-[20px] font-medium text-[#5b65dc]">
                  {prices.yearly.savePro}
                </span>
              )}
            </div>

            <div className="flex items-end gap-2 mb-10">
              <span className="text-[58px] font-bold leading-none">${p.pro}</span>
              <span className="text-[18px] text-black/80 mb-2">/month</span>
            </div>

            {/* FEATURES — 3*/}
<ul className="text-left text-[18px] text-black/80 leading-relaxed space-y-3 mb-12">
  <li>• iiiiiiiiii</li>
  <li>• iiiiiiii</li>
  <li>• kkkkkkkk</li>
  <li>• oooooooo</li>
  <li>• kkkkkkkk</li>
  <li>• mmmmmmmmm</li>
  <li>• yyyyyyy</li>
  <li>• uuuuuu</li>
</ul>

            <button
              onClick={() => window.location.href = "/signup"}
              className="
                mt-auto block px-1 py-3 w-[140px]
                border border-[2.5px] border-[#5b65dc]
                text-black text-[18px] rounded-full
                hover:text-black
                font-semibold transition mx-auto text-center
              "
            >
              Subscribe
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}