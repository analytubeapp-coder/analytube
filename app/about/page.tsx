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
      <section className="py-15 md:py-60 md:pb-60">
        <div className="max-w-7xl mx-auto px-6 space-y-[10rem] md:space-y-[24rem]">
          {/* SECTION 01 ------------------------------------------------ */}
<div className="grid grid-cols-1 md:grid-cols-3 items-start relative">
  {/* number + line */}
  <div className="flex flex-col items-center relative">
    <span className="text-7xl md:text-8xl font-extrabold text-white/90">
      01
    </span>

    <div className="w-5 h-5 rounded-full bg-[#fcc978] absolute top-[150%] hidden md:block" />

    <motion.div
      className="bg-[#fcc978] w-1 absolute top-[150%] left-1/2 -translate-x-1/2 hidden md:block"
      initial={{ height: 0 }}
      whileInView={{ height: 340 }}
      transition={{ duration: verticalDuration }}
      viewport={{ once: true }}
    />

    <motion.div
      className="bg-[#fcc978] h-1 absolute top-[calc(150%+340px)] left-1/2 hidden md:block"
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
    <h2 className="text-3xl md:text-5xl text-white/90 font-extrabold mb-6">
      Who We Are
    </h2>

    <p className="text-white/90 mb-4 leading-relaxed text-[20px]">
      Tubly Ai is a next-generation platform designed to empower creators to turn ideas into viral YouTube videos effortlessly. 
      We combine AI, content strategy, and design to make video creation fast and intuitive for everyone. Our goal is to remove barriers and complexity from content creation so that creators can focus purely on creativity.
    </p>

    <p className="text-white/90 leading-relaxed text-[20px]">
      Our team includes AI engineers, video strategists, and creative designers who are passionate about simplifying content creation 
      while boosting engagement and growth for creators of all levels. With Tubly Ai, every user gains access to tools that were previously available only to large production studios.
    </p>
  </div>
</div>

{/* SECTION 02 ------------------------------------------------ */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-1 items-start relative">
  {/* text */}
  <div className="md:col-span-2 order-2 md:order-1">
    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white/90">
      Our Mission
    </h2>

    <p className="text-white/90 mb-4 leading-relaxed text-[20px]">
      Our mission is to make video creation fast, intelligent, and accessible. 
      Tubly Ai provides AI-powered scripts, SEO optimized titles, thumbnails, and CTAs so creators can focus on producing amazing content. 
      We want to democratize professional-level video creation for every creator, from hobbyists to full-time YouTubers.
    </p>

    <ul className="list-disc list-inside text-white/90 space-y-2 leading-relaxed text-[20px]">
      <li><b>Speed:</b> Create professional, engaging videos in minutes instead of hours.</li>
      <li><b>Optimization:</b> Titles, tags, and CTAs designed to maximize views and engagement.</li>
      <li><b>Growth:</b> Insights and analytics that help your channel reach its full potential.</li>
    </ul>

    <p className="text-white/90 mt-4 leading-relaxed text-[20px]">
      We believe in empowering creators to focus on their passion while Tubly Ai handles the technical optimization and growth strategy. 
      Every feature we build is focused on saving time, increasing engagement, and helping creators succeed in a highly competitive landscape.
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

    <motion.div className="bg-[#fcc978] h-1 absolute top-[calc(150%+410px)] right-1/2 hidden md:block"
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
      whileInView={{ height: 440 }}
      transition={{ duration: verticalDuration }}
      viewport={{ once: true }}
    />

    <motion.div
      className="bg-[#fcc978] h-1 absolute top-[calc(150%+440px)] left-1/2 hidden md:block"
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
    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white/90">
      Our Promise
    </h2>

    <p className="text-[20px] mb-4 leading-relaxed text-white/90">
      We are dedicated to helping creators produce high quality content efficiently while maximizing channel growth and engagement. 
      Every tool and feature in Tubly Ai is designed to save time, increase viewership, and simplify the creative process.
    </p>

    <p className="text-[20px] mb-2 leading-relaxed text-white/90">
      Here's what you can expect from Tubly Ai:
    </p>

    <ul className="list-disc list-inside text-[19px] text-white/90 space-y-2 leading-relaxed">
      <li>Accuracy and clarity: AI-powered scripts, titles, thumbnails, CTAs crafted to maximize results.</li>
      <li>Continuous improvement: AI suggestions and updates that evolve with your channel.</li>
      <li>Reliability: A trusted AI tool to help you create, optimize, and grow your content every day.</li>
      <li>User-first approach: Designed with creators’ workflow and experience as the top priority.</li>
      <li>Scalability: Supports channels of all sizes, from single creators to multi-person studios.</li>
    </ul>

    <p className="text-[20px] text-white/90 mt-4 leading-relaxed">
      Tubly Ai is here to help you turn ideas into viral content confidently, every time. 
      Our commitment is to make your creative process smarter, faster, and more rewarding.
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