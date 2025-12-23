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
      <section className="py-15 md:py-52 md:pb-60">
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
      whileInView={{ height: 340 }}
      transition={{ duration: verticalDuration }}
      viewport={{ once: true }}
    />

    <motion.div
      className="bg-[#5b65dc] h-1 absolute top-[calc(150%+340px)] left-1/2 hidden md:block"
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
      We are a team focused on one simple idea: email should work for your brand — not against it.
    </p>

    <p className="text-black mb-4 leading-relaxed text-[20px]">
      [YourBrand] was built to remove unnecessary complexity from professional email.
No new dashboards. No extra inboxes. No learning curves.
Just a clean, reliable way to use your own domain while keeping the tools you already trust.
    </p>

    <p className="text-black leading-relaxed text-[20px]">
      We believe professionalism starts with the smallest details,
and a proper email address is often the first signal of credibility your business sends.
That first impression should always work in your favor.
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
      Our mission is to make professional email accessible to every business from solo founders to growing teams without technical barriers.
</p>
<p className="text-black mb-2 leading-relaxed text-[20px]">
We focus on three core principles:
    </p>

    <ul className="list-disc list-inside text-black space-y-2 leading-relaxed text-[20px]">
      <li><b>Simplicity:</b> Professional email should take minutes, not days.</li>
      <li><b>Trust:</b> Every message should reinforce credibility and legitimacy.</li>
      <li><b>Compatibility:</b> Your workflow should stay exactly the same.</li>
    </ul>

    <p className="text-black mt-4 leading-relaxed text-[20px]">
      By routing branded emails directly to Gmail or Outlook,
we eliminate friction while preserving the familiarity users rely on every day.
No disruption. No compromises.
Because tools should adapt to people not the other way around.
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
      whileInView={{ height: 410 }}
      transition={{ duration: verticalDuration }}
      viewport={{ once: true }}
    />

    <motion.div className="bg-[#5b65dc] h-1 absolute top-[calc(150%+410px)] right-1/2 hidden md:block"
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
      whileInView={{ height: 440 }}
      transition={{ duration: verticalDuration }}
      viewport={{ once: true }}
    />

    <motion.div
      className="bg-[#5b65dc] h-1 absolute top-[calc(150%+440px)] left-1/2 hidden md:block"
      initial={{ width: 0 }}
      whileInView={{ width: "800px" }}
      transition={{
        delay: horizontalDelay,
        duration: horizontalDuration, }}
      viewport={{ once: true }}
    />
  </div>

  {/* text */}
  <div className="md:col-span-2">
    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-black">
      Our Promise
    </h2>

    <p className="text-[20px] mb-4 leading-relaxed text-black">
      We promise to stay invisible in the best way possible.
    </p>

    <p className="text-[20px] mb-2 leading-relaxed text-black">
      [YourBrand] is built to quietly elevate how your business is perceived,
without forcing you to adapt, migrate, or relearn anything.
    </p>

    <ul className="list-disc list-inside text-[19px] text-black space-y-2 leading-relaxed">
      <li>You keep the inbox you trust.</li>
      <li>You keep the workflow you know.</li>
      <li>You keep the speed you rely on.</li>
    </ul>

    <p className="text-[20px] text-black mt-4 mb-4 leading-relaxed">
      What changes is how your emails are received with greater confidence, stronger authority,
and instant trust from the very first message.</p>

<p className="text-black leading-relaxed text-[20px]">
Our goal is not to add more features.<br />
Our goal is to remove friction — permanently.
So your communication feels effortless, yet unmistakably professional.
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