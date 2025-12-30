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
                  We are a dedicated team passionate about simplifying rental experiences in Canada.
                  Our goal is to help tenants navigate contracts, avoid scams, and make confident decisions.
                </p>

                <p className="text-black mb-4 leading-relaxed text-[20px]">
                  [YourBrand] was created to provide clear, actionable guidance for renters,
                  removing confusion and unnecessary stress. Our digital tools, checklists, and guides
                  are designed to help you every step of the way.
                </p>

                <p className="text-black leading-relaxed text-[20px]">
                  We believe informed renters make better choices. By offering expert tips, resources, and
                  easy-to-follow instructions, we aim to empower Canadians to secure safe and fair housing.
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
                  Our mission is to make renting in Canada safer, simpler, and more transparent
                  for every tenant, whether you're new to renting or experienced.
                </p>

                <p className="text-black mb-2 leading-relaxed text-[20px]">
                  We focus on three main principles:
                </p>

                <ul className="list-disc list-inside text-black space-y-2 leading-relaxed text-[20px]">
                 <li><b>Clarity:</b> We provide easy-to-understand guides and resources.</li>
                  <li><b>Security:</b> Our tips help you avoid scams and protect your deposits.</li>
                  <li><b>Confidence:</b> Empowering tenants to make informed decisions every step of the way.</li>
                </ul>

                <p className="text-black mt-4 leading-relaxed text-[20px]">
                  By combining practical tools with expert knowledge, we remove uncertainty and create
                  a seamless rental experience. Our goal is to help tenants feel secure, prepared, and confident
                  in their housing journey.
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

                <motion.div
                  className="bg-[#5b65dc] h-1 absolute top-[calc(150%+410px)] right-1/2 hidden md:block"
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
                  We promise to make every resource practical, trustworthy, and immediately useful.
                </p>

                <p className="text-[20px] mb-2 leading-relaxed text-black">
                  [YourBrand] delivers clear guidance without extra complexity or learning curves.
                  Everything is designed to integrate seamlessly into your renting process.
                </p>

                <ul className="list-disc list-inside text-[19px] text-black space-y-2 leading-relaxed">
                  <li>Practical, step-by-step guides.
                    </li>
                  <li>Easy-to-use checklists and templates.</li>
                  <li>Tips verified to prevent common mistakes and scams.</li>
                </ul>

                <p className="text-[20px] text-black mt-4 mb-4 leading-relaxed">
                  What changes is your confidence and control. By following our advice,
                  tenants can avoid pitfalls, save money, and enjoy a stress-free renting experience.
                </p>

                <p className="text-black leading-relaxed text-[20px]">
                  Our goal is not to overwhelm you with features. Our goal is to simplify your journey —
                  making renting in Canada smooth, safe, and professional.
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