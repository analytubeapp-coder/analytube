"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero + Pricing */}
      <main className="flex-1 relative overflow-hidden">
        <section className="max-w-6xl mx-auto px-6 pt-40 pb-32 grid md:grid-cols-2 gap-20 items-center">
          {/* Left Side (Text) */}
          <div>
            <h1 className="text-5xl md:text-5xl font-extrabold leading-tight mb-6">
              Know your rivals, <br /> grow your channel.
            </h1>
            <p className="text-gray-600 text-base md:text-lg mb-10 max-w-md">
              Stop guessing. Analyze your channel, track performance, and uncover
              competitor strategies all in one smart, simple dashboard.
            </p>
          </div>

          {/* Right Side (Pricing Card) */}
          <div className="bg-white shadow-2xl rounded-3xl p-12 w-full max-w-sm ml-auto relative z-10">
            {/* Billing Switch */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-500">Billing</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer select-none"
              >
                <span
                  className={!isYearly ? "text-gray-700" : "text-gray-400"}
                >
                  Monthly
                </span>
                <div
                  className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    isYearly ? "bg-[#bfd62e]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      isYearly ? "translate-x-5" : ""
                    }`}
                  />
                </div>
                <span className={isYearly ? "text-gray-700" : "text-gray-400"}>
                  Yearly
                </span>
              </button>
            </div>

            {/* Price */}
            <div className="mb-2">
              <p className="text-6xl font-extrabold text-gray-900">
                {isYearly ? "$7" : "$14"}
                <span className="text-base font-normal text-gray-500">
                  /month
                </span>
              </p>
            </div>

            {/* Discount text */}
            <p
              className={`text-green-600 text-sm font-medium mb-5 h-4 transition-opacity duration-300 ${
                isYearly ? "opacity-100" : "opacity-0"
              }`}
            >
              YOU SAVE 50%
            </p>

            {/* Features */}
            <ul className="text-sm text-gray-700 text-left mb-8 space-y-2">
              <li>✓ Competitor Analysis</li>
              <li>✓ Revenue Estimation (Shorts vs Longs)</li>
              <li>✓ Growth Tracking & Insights</li>
              <li>✓ Export & PDF Reports</li>
            </ul>

            {/* CTA Button */}
            <button className="bg-[#bfd62e] hover:bg-[#a6bd29] text-white font-semibold py-3 px-6 rounded-full w-full text-center transition-all duration-200">
              Subscribe
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Includes 3 free channel analyses. Upgrade for unlimited insights.
            </p>
          </div>
        </section>

        {/* Decorative Icons */}
        <Image
          src="/arrow.svg"
          alt="arrow"
          width={50}
          height={50}
          className="absolute top-150 right-234 opacity-100"
        />
        <Image
          src="/icon.svg"
          alt="icon"
          width={40}
          height={40}
          className="absolute top-32 right-194 opacity-100 animate-bounce"
        />
      </main>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-20">
          Smarter insights. Simpler tools. Faster growth.
        </h2>

        <div className="grid md:grid-cols-2 gap-10 pb-10">
          {[
            {
              icon: "/competitor.svg",
              title: "Competitor Insights",
              text: "See how your rivals grow, which videos drive their success, and where you can outperform them.",
            },
            {
              icon: "/revenue.svg",
              title: "Revenue Accuracy",
              text: "Separate Shorts vs. Long-form earnings for the most realistic income estimation available.",
            },
            {
              icon: "/growth.svg",
              title: "Growth Tracking",
              text: "Monitor your channel's progress with clear data on views, subscribers, CTR, and engagement.",
            },
            {
              icon: "/simple.svg",
              title: "Simple by Design",
              text: "No clutter, no confusion. Just the data you need presented in a clean, easy-to-use dashboard.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl flex flex-col items-start bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={50}
                height={50}
                className="mb-8"
              />
              <h3 className="font-semibold text-lg mb-3 text-left">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 text-left">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
