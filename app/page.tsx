"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/Price";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <header className="min-h-screen flex items-center pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl md:text-[58px] font-bold leading-tight text-[#000000]">
              Create High Performance <br />
              YouTube Thumbnails <br />
              Automatically.
            </h1>

            <p className="text-lg md:text-xl font-medium text-[#403d39] mt-6 max-w-2xl leading-relaxed">
              Generate scroll stopping, high CTR thumbnails powered by advanced<br />
              AI trained on creator proven design patterns.<br />
              No editing skills required.
            </p>

            <div className="flex gap-4 mt-10">
              <a
                href="/signup"
                className="px-8 py-4 rounded-full bg-[#f9c03f] hover:bg-[#fcc978] text-white! text-[20px] font-semibold transition"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* 3 Cards – Clean, Balanced, Soft Shadow */}
<section className="pt-24 pb-32 bg-white">

  {/* SECTION TITLE */}
  <div className="max-w-7xl mx-auto px-6 text-center mb-20">
    <h2 className="text-3xl md:text-[42px] font-bold leading-tight">
      Powerful Tools to Accelerate Your YouTube Growth
    </h2>
  </div>

  {/* CARD GRID */}
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
    {[
      {
        title: "Smart YouTube Insights",
        text:
          "Access a powerful set of AI-driven tools designed to grow your channel faster and more efficiently. From smarter content suggestions to optimized upload timing and retention insights, everything works together to sharpen your strategy and keep you ahead of competitors.",
        icon: "/card1.svg",
      },
      {
        title: "AI Revenue Forecasting",
        text:
          "Get clear and reliable revenue predictions powered by advanced AI. By analyzing your uploads, watch time, audience patterns, and seasonal trends, our system gives you accurate forecasts so you can plan ahead with confidence and optimize your monetization strategy.",
        icon: "/card2.svg",
      },
      {
        title: "Advanced Growth Tools",
        text:
          "Access a powerful set of AI-driven tools designed to grow your channel faster and more efficiently. From smarter content suggestions to optimized upload timing and retention insights, everything works together to refine your strategy and keep you ahead of competitors.",
        icon: "/card3.svg",
      },
    ].map((item, idx) => (
      <div
        key={idx}
        className="
          p-12 rounded-[10px] h-full
          bg-white
          shadow-[0_4px_12px_rgba(0,0,0,0.04)]
          hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          transition-all duration-300
          flex flex-col items-start
        "
      >
        <img src={item.icon} width={60} height={60} className="mb-8" />
        <h3 className="font-semibold text-[20px] mb-2">{item.title}</h3>
        <p className="text-[18px] text-[#403d39] font-meduim leading-relaxed">{item.text}</p>
      </div>
    ))}
  </div>
</section>

      {/* Middle Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <h3 className="text-[42px] font-bold mb-6">
              Make Viral Thumbnails<br />
              in seconds
            </h3>
            <p className="text-[#403d39] leading-relaxed text-[18px]">
              Create eye catching thumbnails that boost your CTR instantly.
Our AI analyzes proven creator design patterns and trending styles to generate high quality, viral ready thumbnails from just your video title or idea. No design skills needed.
Just type, generate, and publish with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CREATORS CHOOSE (Title + 4 Minimal Cards) */}
<section className="py-28 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h3 className="text-center text-3xl md:text-[42px] font-bold mb-16">
      Why Creators choose ——
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
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
            border border-[#E9ECEF]
            bg-white
            h-[220px]
          "
        >
          <img
            src={item.icon}
            alt=""
            className="w-12 h-12 md:w-14 md:h-14 mb-8"
          />

          {/* BOTH WORDS EXACT SAME STYLE */}
          <div className="flex flex-col leading-tight">
            <span className="text-[18px] md:text-[22px] font-regular text-[#111]">
              {item.words[0]}
            </span>
            <span className="text-[18px] md:text-[22px] font-regular text-[#111] mt-1">
              {item.words[1]}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      <Price />

      {/* CTA SECTION */}
<section className="py-32 bg-white">
  <div className="max-w-5xl mx-auto px-6 text-center">

    <h2 className="text-[3xl] md:text-5xl font-bold mb-6">
      Start Creating Better Thumbnails Today
    </h2>

    <p className="text-[18px] text-[#403d39] max-w-2xl mx-auto leading-relaxed mb-10">
      Join thousands of creators using AI-powered tools to boost their CTR,
  grow their audience, and save hours every week all while producing
  high-quality thumbnails that stand out and drive real results.
    </p>

    <a
      href="/signup"
      className="
        px-6 py-4 
        bg-[#F9C03F] hover:bg-[#FCC978] 
        text-white! text-[20px] font-semibold 
        rounded-full 
        transition
      "
    >
      Start Free Trial
    </a>

  </div>
</section>

      <Footer />
    </>
  );
}