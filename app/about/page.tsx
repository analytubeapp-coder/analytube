"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function About() {
  const verticalDuration = 0.6;
  const horizontalDuration = 0.8;
  const horizontalDelay = verticalDuration + 0.08;

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="relative bg-[#bfd62e] pt-50 pb-24">
        {/* Decorative shapes */}
        <div className="absolute bottom-35 right-80 w-10 h-10 bg-white opacity-40 rotate-65"></div>
        <div className="absolute top-30 right-20 w-14 h-14 bg-white opacity-40 rounded-full"></div>
        <div className="absolute bottom-20 left-100 w-10 h-10 bg-white opacity-40 rotate-35"></div>

        <div className="absolute top-25 left-20">
          <Image src="/term.svg" alt="Contact" width={200} height={200} />
        </div>

        <h1 className="text-center text-5xl font-extrabold text-white">
          About Us
        </h1>
      </section>

      {/* Content */}
      <section className="py-60 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-[30rem]">
          {/* SECTION 01 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative">
            {/* number with line */}
            <div className="flex flex-col items-center relative">
              <span className="text-8xl font-extrabold text-black">01</span>

              {/* circle */}
              <div className="w-5 h-5 rounded-full bg-[#bfd62e] absolute top-[150%] -translate-y-1/2" />

              {/* vertical line */}
              <motion.div
                className="bg-[#bfd62e] w-1 absolute top-[150%] left-1/2 -translate-x-1/2"
                initial={{ height: 0 }}
                whileInView={{ height: 230 }}
                transition={{ duration: verticalDuration, ease: "easeOut" }}
                viewport={{ once: true }}
              />

              {/* horizontal line */}
              <motion.div
                className="bg-[#bfd62e] h-1 absolute top-[calc(150%+230px)] left-1/2"
                initial={{ width: 0 }}
                whileInView={{ width: "800px" }}
                transition={{
                  delay: horizontalDelay,
                  duration: horizontalDuration,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              />
            </div>

            {/* text */}
            <div className="md:col-span-2">
              <h2 className="text-4xl font-extrabold mb-6">Who We Are</h2>
              <p className="text-[#414141] mb-4">
                At AnalyTube, we’re passionate about helping YouTube creators grow
                with clarity, confidence, and actionable insights. We realized that
                while YouTube provides a lot of raw data, it is often confusing,
                incomplete, and difficult to compare across competitors. Many
                creators end up overwhelmed instead of empowered.
              </p>
              <p className="text-[#414141]">
                That’s why we built AnalyTube a simple yet powerful analytics
                platform designed to make YouTube performance tracking accessible,
                accurate, and easy to understand. Whether you’re a beginner just
                starting your channel or a professional creator managing millions of
                subscribers, AnalyTube is here to simplify your journey.
              </p>
            </div>
          </div>

          {/* SECTION 02 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative">
            {/* text */}
            <div className="md:col-span-2 order-2 md:order-1">
              <h2 className="text-4xl font-extrabold mb-6">Our Mission</h2>
              <p className="text-[#414141] mb-4">
                Our mission is to give every creator the tools they need to stop
                guessing and start growing. We believe that creators deserve insights
                that are:
              </p>
              <ul className="list-disc list-inside text-[#414141] space-y-2">
                <li>
                  <b>Accurate</b> – based on real public data and proven industry
                  benchmarks.
                </li>
                <li>
                  <b>Easy to understand</b> – clear dashboards, no unnecessary
                  complexity.
                </li>
                <li>
                  <b>Immediately actionable</b> – insights you can apply to your
                  channel today.
                </li>
              </ul>
              <p className="text-[#414141] mt-4">
                AnalyTube delivers competitor analysis, reliable revenue estimation,
                and growth tracking in one streamlined platform. We don’t just
                provide numbers we provide clarity, so you can focus on what really
                matters: creating content and connecting with your audience.
              </p>
            </div>

            {/* number with line */}
            <div className="flex flex-col items-center relative order-1 md:order-2">
              <span className="text-8xl font-extrabold text-black">02</span>

              {/* circle */}
              <div className="w-5 h-5 rounded-full bg-[#bfd62e] absolute top-[150%] -translate-y-1/2" />

              {/* vertical line */}
              <motion.div
                className="bg-[#bfd62e] w-1 absolute top-[150%] left-1/2 -translate-x-1/2"
                initial={{ height: 0 }}
                whileInView={{ height: 280 }}
                transition={{ duration: verticalDuration, ease: "easeOut" }}
                viewport={{ once: true }}
              />

              {/* horizontal line to left */}
              <motion.div
                className="bg-[#bfd62e] h-1 absolute top-[calc(150%+280px)] right-1/2"
                initial={{ width: 0 }}
                whileInView={{ width: "800px" }}
                transition={{
                  delay: horizontalDelay,
                  duration: horizontalDuration,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              />
            </div>
          </div>

          {/* SECTION 03 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative">
            {/* number with line */}
            <div className="flex flex-col items-center relative">
              <span className="text-8xl font-extrabold text-black">03</span>

              {/* circle */}
              <div className="w-5 h-5 rounded-full bg-[#bfd62e] absolute top-[150%] -translate-y-1/2" />

              {/* vertical line */}
              <motion.div
                className="bg-[#bfd62e] w-1 absolute top-[150%] left-1/2 -translate-x-1/2"
                initial={{ height: 0 }}
                whileInView={{ height: 300 }}
                transition={{ duration: verticalDuration, ease: "easeOut" }}
                viewport={{ once: true }}
              />

              {/* horizontal line */}
              <motion.div
                className="bg-[#bfd62e] h-1 absolute top-[calc(150%+300px)] left-1/2"
                initial={{ width: 0 }}
                whileInView={{ width: "800px" }}
                transition={{
                  delay: horizontalDelay,
                  duration: horizontalDuration,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              />
            </div>

            {/* text */}
            <div className="md:col-span-2">
              <h2 className="text-4xl font-extrabold mb-6">Our Promise</h2>
              <p className="text-[#414141] mb-4">
                We promise to level the playing field for YouTube creators
                worldwide. In the past, advanced analytics and competitive insights
                were tools only available to large agencies and top influencers. With
                AnalyTube, we bring those same capabilities to every creator,
                regardless of size.
              </p>
              <p className="text-[#414141] mb-2">Our goal is simple:</p>
              <ul className="list-disc list-inside text-[#414141] space-y-2">
                <li>Empower creators to make smarter decisions.</li>
                <li>Provide analytics without the fluff.</li>
                <li>Build a platform that grows alongside your channel.</li>
              </ul>
              <p className="text-[#414141] mt-4">
                At AnalyTube, we believe every creator deserves a fair chance at
                success. By analyzing, comparing, and planning smarter, you can
                achieve sustainable and long-term growth on YouTube and we’ll be
                with you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
