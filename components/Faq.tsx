"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is [YourBrand]?",
      a: "[YourBrand] lets you create professional branded email addresses that deliver directly to your existing inbox Gmail or Outlook without adding a new inbox.",
    },
    {
      q: "Do I need technical skills to set it up?",
      a: "Not at all. Setup is fast, simple, and requires no technical knowledge.",
    },
    {
      q: "Can I use my own domain?",
      a: "Yes! Connect your existing domain and start sending professional emails immediately.",
    },
    {
      q: "Will my emails be secure?",
      a: "Absolutely. We ensure secure delivery with full encryption and trusted email standards.",
    },
    {
      q: "Can I integrate with Gmail or Outlook?",
      a: "Yes, [YourBrand] works seamlessly with your existing Gmail or Outlook account.",
    },
    {
      q: "How much does it cost?",
      a: "Our flexible plans start at just $5 per month per email.",
    },
  ];

  return (
    <section
  id="faq"
  className="bg-[#5B65DC] py-24 px-6 md:px-12 scroll-mt-[20vh]"
>
      <div className="max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left: Title */}
        <div className="text-left">
          <h3 className="text-[30px] md:text-[52px] font-bold leading-[1.2] text-white">
            Frequently<br />Asked Questions
          </h3>
        </div>

        {/* Right: FAQ items */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur rounded-xl px-5 py-4"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-[18px] md:text-[20px] font-semibold text-white">
                  {item.q}
                </span>
                <span className="text-xl text-white/70">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-3 text-white/80 text-[18px] leading-[1.7] animate-fadeIn">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}