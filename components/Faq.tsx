"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
  {
    q: "What is an email health check?",
    a: "An email health check analyzes your domain’s email configuration to identify issues that affect deliverability. It checks essential settings like SPF, DKIM, DMARC, and email forwarding to ensure your emails reach the inbox instead of spam."
  },
  {
    q: "Why do my emails go to spam?",
    a: "Emails often land in spam due to misconfigured authentication records, poor domain reputation, or incorrect forwarding setups. Even small configuration issues can cause email providers to flag your messages as untrusted."
  },
  {
    q: "What does CheckEmailHealth analyze?",
    a: "CheckEmailHealth scans your domain’s email setup, including SPF, DKIM, DMARC, and forwarding configurations. It highlights potential risks, explains what’s wrong, and shows how these issues impact your email deliverability."
  },
  {
    q: "Do I need technical knowledge to use this tool?",
    a: "No. CheckEmailHealth is designed to be simple and easy to use. You only need to enter your domain and run the check. The results are clear, readable, and focused on what actually matters."
  },
  {
    q: "Do you store my email data or messages?",
    a: "No. CheckEmailHealth does not store your emails or read message content. The tool only analyzes public domain configurations and generates a report based on those settings."
  },
  {
    q: "Is this tool free to use?",
    a: "You can run a free email health check to see basic results. Paid plans unlock more detailed insights, extended checks, and advanced recommendations to improve your email reliability."
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
          <h3 className="text-[22px] md:text-[52px] font-bold leading-[1.2] text-white">
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
                <span className="text-[16px] md:text-[20px] font-semibold text-white">
                  {item.q}
                </span>
                <span className="text-xl text-white/70">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-3 text-white/80 text-[14px] md:text-[18px] font-regular leading-[1.7] animate-fadeIn">
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