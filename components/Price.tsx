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
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-10 text-white">
          Accelerate your growth with AI tools
        </h2>

        {/* BILLING TOGGLE */}
        <div className="flex justify-center mb-20">
          <div
            className="
              flex p-1 rounded-full text-[18px] select-none
              bg-white/10 backdrop-blur-xl border border-white/10
            "
          >
            <button
              onClick={() => setBilling("monthly")}
              className={`
                px-4 py-2 rounded-full transition
                ${
                  billing === "monthly"
                    ? "bg-[#121212] text-white font-semibold"
                    : "text-white/80"
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
                    ? "bg-[#121212] text-white font-semibold"
                    : "text-white/80"
                }
              `}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-0">

          {/* CARD — STARTER */}
          <div
            className="
              p-14 rounded-[20px] h-full
              bg-white/5 backdrop-blur-xl
              border border-white/10
              shadow-[0_0_25px_rgba(0,0,0,0.4)]
              hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]
              transition-all duration-300
              flex flex-col text-white
            "
          >
            {/* Title + Save */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[24px] font-bold text-white">Starter</h3>
              {billing === "yearly" && (
                <span className="text-[20px] font-semibold text-[#F9C03F]">
                  {prices.yearly.saveStarter}
                </span>
              )}
            </div>

            {/* PRICE */}
            <div className="flex items-end gap-2 mb-10">
              <span className="text-[62px] font-bold leading-none">${p.starter}</span>
              <span className="text-[18px] text-white/70 mb-2">/month</span>
            </div>

            {/* FEATURES — STARTER */}
<ul className="text-left text-[18px] text-white/80 leading-relaxed space-y-3 mb-12">
  <li>• 10 Generations per day</li>
  <li>• Full script generation</li>
  <li>• SEO-optimized titles & tags</li>
  <li>• Hook & CTA suggestions</li>
  <li>• Standard speed</li>
  <li>• Email support</li>
</ul>

            {/* BUTTON */}
            <button
              onClick={() => window.location.href = "/signup"}
              className="
                mt-auto block px-1 py-3 w-[140px]
                border border-[2.5px] border-[#F9C03F]
                text-white text-[18px]
                rounded-full font-semibold transition mx-auto text-center
                hover:bg-[#F9C03F] hover:text-black
              "
            >
              Subscribe
            </button>
          </div>

          {/* CARD — Pro (FEATURED) */}
          <div
            className="
              p-14 rounded-[20px] h-full
              bg-white/10 backdrop-blur-xl
              border border-[#F9C03F] border-[3px]
              shadow-[0_0_20px_rgba(249,192,63,0.35)]
              hover:shadow-[0_0_30px_rgba(249,192,63,0.55)]
              transition-all duration-300
              flex flex-col text-white
            "
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[24px] font-bold">Pro</h3>
              {billing === "yearly" && (
                <span className="text-[20px] font-bold text-[#F9C03F]">
                  {prices.yearly.saveCreator}
                </span>
              )}
            </div>

            <div className="flex items-end gap-2 mb-10">
              <span className="text-[58px] font-bold leading-none">${p.creator}</span>
              <span className="text-[18px] text-white/70 mb-2">/month</span>
            </div>

            {/* FEATURES — Pro */}
<ul className="text-left text-[18px] text-white/80 leading-relaxed space-y-3 mb-12">
  <li>• Unlimited generations</li>
  <li>• Advanced SEO analysis</li>
  <li>• Monetization optimization</li>
  <li>• Thumbnail text & hooks</li>
  <li>• Trend-aware suggestions</li>
  <li>• Faster generation speed</li>
  <li>• Priority support</li>
</ul>

            <button
              onClick={() => window.location.href = "/signup"}
              className="
                mt-auto block px-1 py-3 w-[140px]
                bg-[#F9C03F] hover:bg-[#ffd873]
                text-black text-[20px] rounded-full
                font-semibold transition mx-auto text-center
              "
            >
              Subscribe
            </button>
          </div>

          {/* CARD — Studio */}
          <div
            className="
              p-14 rounded-[20px] h-full
              bg-white/5 backdrop-blur-xl
              border border-white/10
              shadow-[0_0_25px_rgba(0,0,0,0.4)]
              hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]
              transition-all duration-300
              flex flex-col text-white
            "
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[24px] font-bold">Studio</h3>
              {billing === "yearly" && (
                <span className="text-[20px] font-bold text-[#F9C03F]">
                  {prices.yearly.savePro}
                </span>
              )}
            </div>

            <div className="flex items-end gap-2 mb-10">
              <span className="text-[58px] font-bold leading-none">${p.pro}</span>
              <span className="text-[18px] text-white/70 mb-2">/month</span>
            </div>

            {/* FEATURES — Business*/}
<ul className="text-left text-[18px] text-white/80 leading-relaxed space-y-3 mb-12">
  <li>• Unlimited generations</li>
  <li>• Advanced SEO analysis</li>
  <li>• Monetization optimization</li>
  <li>• Thumbnail text & hooks</li>
  <li>• Trend-aware suggestions</li>
  <li>• Faster generation speed</li>
  <li>• Priority support</li>
  <li>• Team collaboration</li>
</ul>

            <button
              onClick={() => window.location.href = "/signup"}
              className="
                mt-auto block px-1 py-3 w-[140px]
                border border-[2.5px] border-[#F9C03F]
                text-white text-[18px] rounded-full
                hover:bg-[#F9C03F] hover:text-black
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