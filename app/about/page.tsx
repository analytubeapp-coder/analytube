"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const verticalDuration = 0.6;
  const horizontalDuration = 0.8;
  const horizontalDelay = verticalDuration + 0.08;

  return (
    <>
      <main className="min-h-screen w-full bg-white text-black relative">
        <Navbar />

        {/* CONTENT */}
        <section className="py-20 md:py-52 md:pb-60">
          <div className="max-w-7xl mx-auto px-6 space-y-[10rem] md:space-y-[24rem]">
            {/* SECTION 01 ------------------------------------------------ */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-start relative">
              {/* number + line */}
              <div className="flex flex-col items-center relative mb-10 md:mb-0">
                <span className="text-7xl md:text-8xl font-extrabold text-black">
                  01
                </span>

                <div className="w-5 h-5 rounded-full bg-[#5b65dc] absolute top-[150%] hidden md:block" />

                <motion.div
                  className="bg-[#5b65dc] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                  initial={{ height: 0 }}
                  whileInView={{ height: 500 }}
                  transition={{ duration: verticalDuration }}
                  viewport={{ once: true }}
                />

                <motion.div
                  className="bg-[#5b65dc] h-1 absolute top-[calc(150%+500px)] left-1/2 hidden md:block"
                  initial={{ width: 0 }}
                  whileInView={{ width: "800px" }}
                  transition={{
                    delay: horizontalDelay,
                    duration: horizontalDuration,
                  }}
                  viewport={{ once: true }}
                />
              </div>

              {/* text */}
              <div className="md:col-span-2 md:max-w-[700px]">
                <h2 className="text-3xl md:text-5xl text-black font-extrabold mb-6">
                  Who We Are
                </h2>

                <p className="text-black mb-4 leading-relaxed text-[20px]">
                  CheckEmailHealth is a simple, focused tool built to help businesses, founders, and technical teams understand and improve their email deliverability without complexity.
                  We specialize in analyzing email authentication and domain-level configurations that directly impact whether emails reach the inbox or end up in spam.
                </p>

                <p className="text-black mb-4 leading-relaxed text-[20px]">
                  We believe email health should be clear, accessible, and actionable — not hidden behind confusing dashboards or technical jargon.
                  That’s why CheckEmailHealth is designed as a single-purpose platform: to quickly analyze critical email settings like SPF, DKIM, DMARC, and forwarding configurations, and turn them into easy-to-understand insights.
                </p>

                <p className="text-black leading-relaxed text-[20px]">
                  Our product is built for startups, small businesses, agencies, and growing teams that rely on email for sales, support, and daily communication — and need a reliable way to protect their domain reputation and inbox placement.
                </p>
              </div>
            </div>

            {/* SECTION 02 ------------------------------------------------ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 items-start relative">
              {/* text */}
              <div className="md:col-span-2 order-2 md:order-1">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-black">
                  Our Mission
                </h2>

                <p className="text-black mb-4 leading-relaxed text-[20px]">
                  Our mission is to make email deliverability simple, transparent, and reliable for every business — regardless of size or technical expertise.
                </p>

                <p className="text-black mb-2 leading-relaxed text-[20px]">
                  Email issues often go unnoticed until they start damaging communication, customer trust, and revenue.
                  Misconfigured SPF, DKIM, DMARC, or forwarding rules can silently harm deliverability, lower open rates, and send critical emails to spam without warning.
                </p>

                <p className="text-black mt-4 leading-relaxed text-[20px]">
                  CheckEmailHealth exists to change that. We aim to help businesses detect email configuration issues early, understand what’s affecting their email performance, and take clear steps to fix problems before they impact real conversations. By providing fast, accurate, and easy-to-read email health checks, we empower teams to stay proactive instead of reactive.
                </p>
              </div>

              {/* number + line */}
              <div className="flex flex-col items-center relative mb-10 md:mb-0 order-1 md:order-2">
                <span className="text-7xl md:text-8xl font-extrabold text-black">
                  02
                </span>

                <div className="w-5 h-5 rounded-full bg-[#5b65dc] absolute top-[150%] hidden md:block" />

                <motion.div
                  className="bg-[#5b65dc] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                  initial={{ height: 0 }}
                  whileInView={{ height: 440 }}
                  transition={{ duration: verticalDuration }}
                  viewport={{ once: true }}
                />

                <motion.div
                  className="bg-[#5b65dc] h-1 absolute top-[calc(150%+440px)] right-1/2 hidden md:block"
                  initial={{ width: 0 }}
                  whileInView={{ width: "800px" }}
                  transition={{
                    delay: horizontalDelay,
                    duration: horizontalDuration,
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </div>

            {/* SECTION 03 ------------------------------------------------ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 items-start relative">
              {/* number */}
              <div className="flex flex-col items-center relative mb-10 md:mb-0">
                <span className="text-7xl md:text-8xl font-extrabold text-black">
                  03
                </span>

                <div className="w-5 h-5 rounded-full bg-[#5b65dc] absolute top-[150%] hidden md:block" />

                <motion.div
                  className="bg-[#5b65dc] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                  initial={{ height: 0 }}
                  whileInView={{ height: 420 }}
                  transition={{ duration: verticalDuration }}
                  viewport={{ once: true }}
                />

                <motion.div
                  className="bg-[#5b65dc] h-1 absolute top-[calc(150%+420px)] left-1/2 hidden md:block"
                  initial={{ width: 0 }}
                  whileInView={{ width: "800px" }}
                  transition={{
                    delay: horizontalDelay,
                    duration: horizontalDuration,
                  }}
                  viewport={{ once: true }}
                />
              </div>

              {/* text */}
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-black">
                  Our Promise
                </h2>

                <p className="text-[20px] mb-4 leading-relaxed text-black">
                  We promise clarity, simplicity, and respect for your data.
                </p>
                  

                <p className="text-[20px] mb-2 leading-relaxed text-black">
                  CheckEmailHealth does not read, store, or access your email content.
                  We only analyze publicly available domain configurations to evaluate email authentication and deliverability risks. Your privacy and trust come first.
                </p>

                <p className="text-[20px] text-black mt-4 mb-4 leading-relaxed">
                  We also promise to keep the platform focused and efficient — no unnecessary features, no bloated dashboards, and no hidden complexity.
                  Every result, recommendation, and insight is designed to be practical, understandable, and immediately useful.
                </p>

                <p className="text-black leading-relaxed text-[20px]">
                  Our goal is to help you send emails with confidence, protect your domain reputation,
                  and ensure your business communication remains reliable, professional, and spam-free — every day.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}