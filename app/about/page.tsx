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
      {/* AURORA FIXED BACKGROUND */}
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      
              {/* هاله بنفش — کشیده، انتزاعی، قابل‌تشخیص */}
              <div
                className="
                  absolute top-[35%] left-[55%]
                  w-[550px] md:w-[2000px] h-[450px] md:h-[650px]
                  -translate-x-1/2 -translate-y-1/2
                  rotate-[25deg]
                  rounded-[9999px] blur-[150px] opacity-60
                "
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(170,110,255,0.55), transparent 90%)",
                }}
              ></div>
      
              {/* هاله برنزی — بزرگ‌تر، نزدیک‌تر، واضح‌تر */}
              <div
                className="
                  absolute top-[60%] left-[40%]
                  w-[550px] md:w-[1200px] h-[450px] md:h-[650px]
                  -translate-x-1/2 -translate-y-1/2
                  rotate-[-30deg]
                  rounded-[9999px] blur-[150px] opacity-60
                "
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,180,100,0.55), transparent 90%)",
                }}
              ></div>
      
            </div>
      
            <main className="min-h-screen w-full text-white relative">
        <Navbar />


      {/* CONTENT */}
      <section className="py-15 md:py-40 md:pb-46">
        <div className="max-w-7xl mx-auto px-6 space-y-[10rem] md:space-y-[20rem]">
          {/* SECTION 01 ------------------------------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 items-start relative">
            {/* number + line */}
            <div className="flex flex-col items-center relative">
              <span className="text-7xl md:text-8xl font-extrabold text-white/90">
                01
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
                className="bg-[#fcc978] h-1 absolute top-[calc(150%+280px)] left-1/2 hidden md:block"
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
              <h2 className="text-3xl md:text-4xl text-white/90 font-extrabold mb-6">
                Who We Are
              </h2>

              <p className="text-white/90 mb-4 leading-relaxed text-[19px]">
                SOPMakerAI is a purpose built platform designed to simplify how businesses create, manage, and standardize their SOPs.
                We believe that well documented processes unlock a company’s true operational potential reducing errors, improving training, and enabling scalable growth.
              </p>

              <p className="text-white/90 leading-relaxed text-[19px]">
                Our team is a mix of AI engineers, operations specialists, workflow architects, and product designers.
                After years of watching teams struggle with time consuming, repetitive documentation work,
                we built SOPMakerAI to turn that friction into a fast, intuitive, and intelligent experience.
              </p>
            </div>
          </div>

          {/* SECTION 02 ------------------------------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 items-start relative">
            {/* text */}
            <div className="md:col-span-2 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white/90">
              Our Mission
              </h2>

              <p className="text-white/90 mb-4 leading-relaxed text-[19px]">
                Our mission is to give every business whether a small startup or a growing enterprise access to clear, repeatable,
                and measurable operational processes without spending hours writing and editing documents.
              </p>

              <ul className="list-disc list-inside text-white/90 space-y-2 leading-relaxed text-[19px]">
                <li>
                  <b>Faster standardization</b> : Enabling teams to create professional, high quality SOPs in minutes rather than days.
                </li>
                <li>
                  <b>Process automation</b> : Transforming your internal knowledge into structured, actionable workflows.
                </li>
                <li>
                  <b>Less error, more productivity</b> : Helping teams work with clarity, consistency, and confidence.
                </li>
              </ul>

              <p className="text-white/90 mt-4 leading-relaxed text-[19px]">
                We believe strong processes build strong companies. SOPMakerAI exists to make that foundation accessible, intelligent, and effortless for everyone.
              </p>
            </div>

            {/* number + line */}
            <div className="flex flex-col items-center relative order-1 md:order-2">
              <span className="text-7xl md:text-8xl font-extrabold text-white/90">
                02
              </span>

              <div className="w-5 h-5 rounded-full bg-[#fcc978] absolute top-[150%] hidden md:block" />

              <motion.div
                className="bg-[#fcc978] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                initial={{ height: 0 }}
                whileInView={{ height: 410 }}
                transition={{ duration: verticalDuration }}
                viewport={{ once: true }}
              />

              <motion.div
                className="bg-[#fcc978] h-1 absolute top-[calc(150%+410px)] right-1/2 hidden md:block"
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
            <div className="flex flex-col items-center relative">
              <span className="text-7xl md:text-8xl font-extrabold text-white/90">
                03
              </span>

              <div className="w-5 h-5 rounded-full bg-[#fcc978] absolute top-[150%] hidden md:block" />

              <motion.div
                className="bg-[#fcc978] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
                initial={{ height: 0 }}
                whileInView={{ height: 370 }}
                transition={{ duration: verticalDuration }}
                viewport={{ once: true }}
              />

              <motion.div
                className="bg-[#fcc978] h-1 absolute top-[calc(150%+370px)] left-1/2 hidden md:block"
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
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white/90">
                Our Promise
              </h2>

              <p className="text-[19px] mb-4 leading-relaxed text-white/90">
                We’re committed to providing a platform that not only speeds up documentation, but genuinely elevates the quality of your operations.
              </p>

              <p className="text-[19px] mb-2 leading-relaxed text-white/90">
                Here's what you can expect from us:
              </p>

              <ul className="list-disc list-inside text-[19px] text-white/90 space-y-2 leading-relaxed">
                <li>Accuracy and clarity: AI generated SOPs written with structure, precision, and real world applicability.</li>
                <li>Continuous improvement: Insights, suggestions, and updates that evolve alongside your business.</li>
                <li>Reliability: A tool you can trust to support daily operations, onboarding, and long-term growth.</li>
              </ul>

              <p className="text-[19px] text-white/90 mt-4 leading-relaxed">
                Your processes matter and we’re here to help you document, refine, and scale them with confidence.
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