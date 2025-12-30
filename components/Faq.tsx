"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
  {
    q: "Who is this kit for?",
    a: "The Canada Rental Survival Kit is perfect for anyone renting in Canada—first-time renters, people moving across provinces, or those who want to stay protected and informed."
  },
  {
    q: "Which provinces does it cover?",
    a: "The kit currently includes general guidance applicable across Canada, with province-specific sections starting with Ontario. More provinces will be added soon."
  },
  {
    q: "What’s included in the kit?",
    a: "You’ll get clear guides on tenant rights, ready-to-use templates for deposits and payments, and checklists to make moving in and out stress-free."
  },
  {
    q: "Is this a legal service?",
    a: "No, the kit provides guidance and templates based on publicly available information. It’s not a substitute for professional legal advice."
  },
  {
    q: "How do I access the kit after purchase?",
    a: "After purchase, you’ll get instant access to downloadable files directly on the website—no emails or extra steps required."
  },
  {
    q: "Can I use it for multiple rentals?",
    a: "Absolutely! The templates and checklists are reusable, so you can use them for any rental property across Canada."
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