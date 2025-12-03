"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/Price";
import ThumbnailGenerator from "@/components/ThumbnailGenerator";

export default function Home() {
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

  {/* HERO */}
  <header className="min-h-screen flex flex-col items-center justify-center text-center pt-58 gap-10">

    {/* TITLE */}
    <h1 className="text-[32px] md:text-[64px] font-bold leading-[1.25] text-white">
      Create High Performance <br />
      YouTube <span className="text-[#fcc978]">Thumbnails</span> Automatically.
    </h1>

    {/* THUMBNAIL GENERATOR */}
    <div className="w-full max-w-4xl flex justify-center">
      <ThumbnailGenerator />
    </div>

  </header>

        {/* 3 Cards – Dark Aurora Style */}
<section className="pt-24 pb-32">

  {/* SECTION TITLE */}
  <div className="max-w-7xl mx-auto px-6 text-center mb-20">
    <h2 className="text-3xl md:text-[42px] font-bold leading-tight text-white">
      Powerful Tools to Accelerate Your YouTube Growth
    </h2>
  </div>

  {/* CARD GRID */}
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
    {[
      {
        title: "Intelligent Thumbnail Engine",
        text:
          "Our AI studies audience behavior, color contrast, emotions, and visual patterns to generate thumbnails engineered for maximum clicks. Every design is optimized to boost CTR and drive predictable, real engagement.",
        icon: "/card1.svg",
      },
      {
        title: "Adaptive AI Style Generator",
        text:
          "Instantly create studio grade thumbnails in any style from cinematic gaming to bold MrBeast layouts. The engine adapts to your visuals and delivers high impact designs with minimal input.",
        icon: "/card2.svg",
      },
      {
        title: "Automatic Pro Enhancement",
        text:
          "Lighting, cutouts, backgrounds, and composition are all refined automatically for a polished, professional look. Your thumbnails are enhanced end-to-end and optimized for top tier YouTube performance.",
        icon: "/card3.svg",
      },
    ].map((item, idx) => (
      <div
        key={idx}
        className="
          p-12 rounded-[14px] h-full
          bg-white/5 backdrop-blur-xl 
          border border-white/10
          shadow-[0_0_25px_rgba(0,0,0,0.25)]
          hover:shadow-[0_0_45px_rgba(0,0,0,0.4)]
          transition-all duration-300
          flex flex-col items-start
        "
      >
        <img src={item.icon} width={60} height={60} className="mb-8" />
        <h3 className="font-semibold text-[21px] mb-3 text-white">
          {item.title}
        </h3>
        <p className="text-[17px] text-white/75 leading-relaxed">
          {item.text}
        </p>
      </div>
    ))}
  </div>
</section>

        {/* Middle Section */}
<section className="py-32">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 place-items-center">
    <div className="text-center">
      <h3 className="text-3xl md:text-[62px] font-bold mb-6 text-white">
        Make Viral Thumbnails in seconds
      </h3>

      <p className="text-white/75 leading-relaxed text-xl md:text-[22px] mx-auto">
        Generate eye catching thumbnails that instantly boost your video clicks. Powered by AI trained on trending styles, <br />
        proven creator patterns and high-performing visuals. Just write your idea AI does the rest.
      </p>
    </div>
  </div>
</section>

        {/* WHY CREATORS CHOOSE (Aurora Dark Cards) */}
<section className="py-28">
  <div className="max-w-6xl mx-auto px-6">
    
    {/* TITLE */}
    <h3 className="text-center text-3xl md:text-[42px] font-bold mb-16 text-white">
      Why Creators Choose ——
    </h3>

    {/* CARDS GRID */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-5">
      {[
        { icon: "/icon-feature1.svg", words: ["Higher", "Engagement"] },
        { icon: "/icon-feature2.svg", words: ["Faster", "Workflow"] },
        { icon: "/icon-feature3.svg", words: ["Smarter", "Decisions"] },
        { icon: "/icon-feature4.svg", words: ["Consistent", "Quality"] },
      ].map((item, idx) => (
        <div
          key={idx}
          className="
            flex flex-col items-center text-center 
            p-8 md:p-10 
            rounded-xl
            bg-white/5 backdrop-blur-md
            border border-white/10
            shadow-[0_0_20px_rgba(0,0,0,0.35)]
            hover:shadow-[0_0_35px_rgba(0,0,0,0.55)]
            transition-all duration-300
            h-[220px]
          "
        >

          {/* ICON */}
          <img
            src={item.icon}
            className="w-12 h-12 md:w-14 md:h-14 mb-6 brightness-110"
          />

          {/* TEXT BLOCK (with bottom spacing) */}
          <div className="flex flex-col leading-tight text-white">
            <span className="text-[20px] md:text-[28px] font-regular">
              {item.words[0]}
            </span>

            {/* فاصله از پایین کارت */}
            <span className="text-[20px] md:text-[28px] font-regular mt-1 mb-1">
              {item.words[1]}
            </span>
          </div>

        </div>
      ))}
    </div>
  </div>
</section>

        <Price />
        <Footer />

      </main>
    </>
  );
}