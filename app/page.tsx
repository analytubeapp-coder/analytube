"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/Price";

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
    <h1 className="text-[32px] md:text-[62px] font-bold leading-[1.25] text-white">
      Create High Performance SOPs. <span className="text-[#fcc978]">Automatically.</span>
    </h1>

  </header>

        {/* 3 Cards – Dark Aurora Style */}
<section className="pt-24 pb-32">

  {/* SECTION TITLE */}
  <div className="max-w-7xl mx-auto px-6 text-center mb-20">
    <h2 className="text-3xl md:text-[42px] font-bold leading-tight text-white">
      Powerful AI Tools for Creating Exceptional SOPs
    </h2>
  </div>

  {/* CARD GRID */}
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
    {[
      {
        title: "AI-Generated SOP Blueprints",
        text:
          "Our engine creates fully structured SOPs tailored to your business: objectives, scope, roles, workflow, KPIs, risks, templates, and more. Designed for compliance, clarity, and real world execution.",
        icon: "/card1.svg",
      },
      {
        title: "Live Preview & Export",
        text: "Preview your SOP instantly in a clean dashboard view, then export it to DOCX, PDF, or SVG workflow diagrams with one click. Give your team a professional, consistent documentation system.",
        icon: "/card2.svg",
      },
      {
        title: "AI Suggestions & Insights",
        text: "Receive auto generated improvements, missing sections, risk insights, role suggestions, training tips, and implementation guidance making your SOPs stronger, safer, and more actionable.",
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
        Build Complete SOPs in Seconds
      </h3>

      <p className="text-white/75 leading-relaxed text-xl md:text-[22px] mx-auto">
        Just describe your process our AI automatically generates a comprehensive SOP including workflow,<br />
        roles, procedures, tools, risk matrix, KPIs, and training material.
        Perfect for startups, agencies, teams, and operational scaling.
      </p>
    </div>
  </div>
</section>

        {/* WHY CREATORS CHOOSE (Aurora Dark Cards) */}
<section className="py-28">
  <div className="max-w-6xl mx-auto px-6">
    
    {/* TITLE */}
    <h3 className="text-center text-3xl md:text-[42px] font-bold mb-16 text-white">
      Why Teams Choose SOP Maker AI
    </h3>

    {/* CARDS GRID */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-5">
      {[
        { icon: "/icon-feature1.svg", words: ["Complete", "Documentation"] },
        { icon: "/icon-feature2.svg", words: ["Operational", "Clarity"] },
        { icon: "/icon-feature3.svg", words: ["Automated", "Workflows"] },
        { icon: "/icon-feature4.svg", words: ["Consistent", "Execution"] },
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