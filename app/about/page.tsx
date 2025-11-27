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
      <section className="relative bg-[#E94C88] pt-50 pb-24">
        {/* Decorative shapes */}
        <div className="hidden md:block absolute bottom-35 right-80 w-10 h-10 bg-white opacity-40 rotate-65"></div>
        <div className="hidden md:block absolute top-30 right-20 w-14 h-14 bg-white opacity-40 rounded-full"></div>
        <div className="hidden md:block absolute bottom-20 left-100 w-10 h-10 bg-white opacity-40 rotate-35"></div>

        <div className="hidden md:block absolute top-25 left-20">
          <Image src="/term.svg" alt="Contact" width={200} height={200} />
        </div>

        <h1 className="text-center text-5xl font-extrabold text-white">
          About Us
        </h1>
      </section>

      {/* Content */}
      <section className="py-20 md:py-60 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-32 md:space-y-[30rem]">
          {/* SECTION 01 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative">
            {/* number with line */}
            <div className="flex flex-col items-center relative">
              <span className="text-8xl font-extrabold text-black">01</span>

              {/* circle */}
              <div className="w-5 h-5 rounded-full bg-[#E94C88] absolute top-[150%] -translate-y-1/2 hidden md:block" />

              {/* vertical line */}
              <motion.div
                className="bg-[#E94C88] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                initial={{ height: 0 }}
                whileInView={{ height: 230 }}
                transition={{ duration: verticalDuration, ease: "easeOut" }}
                viewport={{ once: true }}
              />

              {/* horizontal line */}
              <motion.div
                className="bg-[#E94C88] h-1 absolute top-[calc(150%+230px)] left-1/2 hidden md:block"
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
                At ThumbForge AI, we’re dedicated to helping creators design
                scroll-stopping YouTube thumbnails effortlessly. We saw that many
                creators struggle with design tools, lack inspiration, or simply
                don’t have the time to create high-quality thumbnails consistently.
                That’s why we built an AI system that understands YouTube visual
                trends and instantly generates eye-catching concepts.
              </p>
              <p className="text-[#414141]">
                Our goal is to make professional thumbnail creation simple, fast,
                and accessible for every creator whether you’re launching your
                first video or already building a large audience. ThumbForge AI
                helps you create powerful visuals that increase clicks, improve
                viewer retention, and boost your channel’s overall performance.
              </p>
            </div>
          </div>

          {/* SECTION 02 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative py-2 md:py-2">
            {/* text */}
            <div className="md:col-span-2 order-2 md:order-1">
              <h2 className="text-4xl font-extrabold mb-6">Our Mission</h2>
              <p className="text-[#414141] mb-4">
                Our mission is to empower creators with AI-driven tools that remove
                guesswork and deliver consistently high-performing thumbnails. We
                believe creators deserve solutions that are:
              </p>
              <ul className="list-disc list-inside text-[#414141] space-y-2">
                <li>
                  <b>Smart</b> – powered by real YouTube style analysis and proven
                  CTR patterns.
                </li>
                <li>
                  <b>Simple to use</b> – no design skills or editing experience
                  required.
                </li>
                <li>
                  <b>Instantly useful</b> – thumbnails you can use right away to
                  improve visibility and engagement.
                </li>
              </ul>
              <p className="text-[#414141] mt-4">
                ThumbForge AI creates multiple professional concepts in seconds,
                giving you a variety of styles, emotions, and layouts to choose
                from. We help you focus on your content while our AI takes care of
                the visuals that drive clicks and growth.
              </p>
            </div>

            {/* number with line */}
            <div className="flex flex-col items-center relative order-1 md:order-2">
              <span className="text-8xl font-extrabold text-black">02</span>

              {/* circle */}
              <div className="w-5 h-5 rounded-full bg-[#E94C88] absolute top-[150%] -translate-y-1/2 hidden md:block" />

              {/* vertical line */}
              <motion.div
                className="bg-[#E94C88] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                initial={{ height: 0 }}
                whileInView={{ height: 280 }}
                transition={{ duration: verticalDuration, ease: "easeOut" }}
                viewport={{ once: true }}
              />

              {/* horizontal line to left */}
              <motion.div
                className="bg-[#E94C88] h-1 absolute top-[calc(150%+280px)] right-1/2 hidden md:block"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative py-2 md:py-2">
            {/* number with line */}
            <div className="flex flex-col items-center relative">
              <span className="text-8xl font-extrabold text-black">03</span>

              {/* circle */}
              <div className="w-5 h-5 rounded-full bg-[#E94C88] absolute top-[150%] -translate-y-1/2 hidden md:block" />

              {/* vertical line */}
              <motion.div
                className="bg-[#E94C88] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                initial={{ height: 0 }}
                whileInView={{ height: 300 }}
                transition={{ duration: verticalDuration, ease: "easeOut" }}
                viewport={{ once: true }}
              />

              {/* horizontal line */}
              <motion.div
                className="bg-[#E94C88] h-1 absolute top-[calc(150%+300px)] left-1/2 hidden md:block"
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
                We promise to give every creator the ability to produce powerful,
                high-impact thumbnails without needing advanced design knowledge.
                Great visuals shouldn’t be limited to big studios or expert editors
                our AI makes professional quality available to everyone.
              </p>
              <p className="text-[#414141] mb-2">Here’s what we stand for:</p>
              <ul className="list-disc list-inside text-[#414141] space-y-2">
                <li>Helping creators boost click-through-rate with ease.</li>
                <li>Delivering consistent, creator-focused improvements.</li>
                <li>Building tools that level the playing field for all channels.</li>
              </ul>
              <p className="text-[#414141] mt-4">
                ThumbForge AI is committed to supporting your growth with reliable,
                studio-quality thumbnails and an evolving AI engine that adapts to
                new trends. We’re here to help you stand out, attract viewers, and
                grow with confidence one thumbnail at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}