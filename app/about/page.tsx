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

      <section className="relative bg-[#fcc978] pt-50 pb-24">
        {/* Decorative shapes */}
        <div className="hidden md:block absolute bottom-35 right-80 w-10 h-10 bg-white opacity-40 rotate-65"></div>
        <div className="hidden md:block absolute top-30 right-20 w-14 h-14 bg-white opacity-40 rounded-full"></div>
        <div className="hidden md:block absolute bottom-20 left-100 w-10 h-10 bg-white opacity-40 rotate-35"></div>

        <div className="hidden md:block absolute top-25 left-20">
          <Image src="/term.svg" alt="Term" width={200} height={200} />
        </div>

        <h1 className="text-center text-5xl font-extrabold text-white leading-tight">
          About Us
        </h1>
      </section>

      {/* CONTENT */}
      <section className="py-15 md:py-30 bg-white md:pb-46">
        <div className="max-w-6xl mx-auto px-6 space-y-40 md:space-y-[28rem]">
          {/* SECTION 01 ------------------------------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative">
            {/* number + line */}
            <div className="flex flex-col items-center relative">
              <span className="text-7xl md:text-8xl font-extrabold text-black">
                01
              </span>

              <div className="w-5 h-5 rounded-full bg-[#fcc978] absolute top-[150%] hidden md:block" />

              <motion.div
                className="bg-[#fcc978] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                initial={{ height: 0 }}
                whileInView={{ height: 230 }}
                transition={{ duration: verticalDuration }}
                viewport={{ once: true }}
              />

              <motion.div
                className="bg-[#fcc978] h-1 absolute top-[calc(150%+230px)] left-1/2 hidden md:block"
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
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Who We Are
              </h2>

              <p className="text-[#414141] mb-4 leading-relaxed">
                At ––, we help creators design scroll stopping YouTube thumbnails effortlessly.
Most creators struggle with design tools, lack ideas, or simply don’t have time
to consistently create high quality visuals. –– uses AI trained on modern
YouTube design trends to instantly generate professional concepts helping you
save hours of editing while producing thumbnails that actually perform.
              </p>

              <p className="text-[#414141] leading-relaxed">
                Our goal is to make high performing thumbnail creation simple, fast, and
accessible for every creator whether you’re launching your first video or
already managing a growing channel. We believe great design shouldn’t be behind
a skill barrier; our tools let you focus on the content while we handle visuals
optimized for audience engagement.
              </p>
            </div>
          </div>

          {/* SECTION 02 ------------------------------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative">
            {/* text */}
            <div className="md:col-span-2 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Our Mission
              </h2>

              <p className="text-[#414141] mb-4 leading-relaxed">
                Our mission is to empower creators with AI tools that remove
                guesswork and deliver consistently high-performing thumbnails.
                We believe creators deserve tools that are:
              </p>

              <ul className="list-disc list-inside text-[#414141] space-y-2 leading-relaxed">
                <li>
                  <b>Smart</b> – powered by real YouTube design patterns and CTR data.
                </li>
                <li>
                  <b>Simple</b> – no design experience required.
                </li>
                <li>
                  <b>Instant</b> – ready-to-use thumbnails within seconds.
                </li>
              </ul>

              <p className="text-[#414141] mt-4 leading-relaxed">
                –– generates multiple high quality concepts instantly, giving you options in
emotion, color, layout, and style so you can choose what fits your video best.
Every generation is built using patterns proven to increase click-through-rate,
ensuring your content gets discovered faster and reaches the audience it
deserves.
              </p>
            </div>

            {/* number + line */}
            <div className="flex flex-col items-center relative order-1 md:order-2">
              <span className="text-7xl md:text-8xl font-extrabold text-black">
                02
              </span>

              <div className="w-5 h-5 rounded-full bg-[#fcc978] absolute top-[150%] hidden md:block" />

              <motion.div
                className="bg-[#fcc978] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                initial={{ height: 0 }}
                whileInView={{ height: 280 }}
                transition={{ duration: verticalDuration }}
                viewport={{ once: true }}
              />

              <motion.div
                className="bg-[#fcc978] h-1 absolute top-[calc(150%+280px)] right-1/2 hidden md:block"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative">
            {/* number */}
            <div className="flex flex-col items-center relative">
              <span className="text-7xl md:text-8xl font-extrabold text-black">
                03
              </span>

              <div className="w-5 h-5 rounded-full bg-[#fcc978] absolute top-[150%] hidden md:block" />

              <motion.div
                className="bg-[#fcc978] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                initial={{ height: 0 }}
                whileInView={{ height: 300 }}
                transition={{ duration: verticalDuration }}
                viewport={{ once: true }}
              />

              <motion.div
                className="bg-[#fcc978] h-1 absolute top-[calc(150%+300px)] left-1/2 hidden md:block"
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
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Our Promise
              </h2>

              <p className="text-[#414141] mb-4 leading-relaxed">
                We promise to give creators the ability to produce powerful,
                high impact thumbnails without needing expert design skills.
                Great visuals should be accessible to everyone.
              </p>

              <p className="text-[#414141] mb-2 leading-relaxed">
                What we stand for:
              </p>

              <ul className="list-disc list-inside text-[#414141] space-y-2 leading-relaxed">
                <li>Boosting click-through-rate with ease.</li>
                <li>Consistent, creator-focused improvements.</li>
                <li>Tools that level the playing field for all channels.</li>
              </ul>

              <p className="text-[#414141] mt-4 leading-relaxed">
                –– is committed to helping you grow with studio quality thumbnails and an AI
system that improves with trends so you can attract viewers and build your
channel with confidence. Our promise is to continually enhance the tools you
use, offering better styles, deeper customization, and smarter generation with
every update.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}