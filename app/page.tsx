"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [heroQuery, setHeroQuery] = useState("");
  const [ctaQuery, setCtaQuery] = useState("");
  const router = useRouter();

const handleSearch = (query: string) => {
  const trimmed = query.trim();
  if (!trimmed) return;
  router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
};

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
<section className="bg-white text-black pt-64 pb-32">
  <div className="w-full px-6 text-center">

    <h1 className="text-[36px] md:text-[48px] font-extrabold leading-tight mb-7 mx-auto">
  Clear, Actionable YouTube Analytics<br />
  Accelerate Your Channel <span className="text-[#E94C88]">Growth</span>
</h1>

<p className="text-base md:text-[17px] text-[#414141] mb-14 max-w-3xl mx-auto">
  Stop guessing and start growing. Analyze your YouTube channel performance, track subscriber growth, and uncover competitor strategies all in one powerful, easy to use dashboard.
</p>

    <div className="flex items-center w-full max-w-[650px] mx-auto bg-[#f5f5f5] rounded-full overflow-hidden">
      <input
        value={heroQuery}
        onChange={(e) => setHeroQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch(heroQuery)}
        className="flex-grow bg-transparent px-8 py-3 text-sm md:text-base focus:outline-none"
        placeholder="Search Channel or paste URL"
      />
      <button
        onClick={() => handleSearch(heroQuery)}
        className="bg-[#E94C88] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition"
      >
        <Search size={20} className="text-white" />
      </button>
    </div>

  </div>
</section>

      {/* Features Section (3 top cards) */}
      <section className="py-34 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
    icon: "/icon-feature1.svg",
    title: "Actionable Competitor Insights",
    text: "Discover what drives growth for top creators, identify successful content strategies, and apply insights directly to your channel for maximum impact.",
  },
  {
    icon: "/icon-feature2.svg",
    title: "Accurate Revenue Estimates",
    text: "Understand your true earning potential with precise analytics and CPM data, enabling smarter monetization decisions.",
  },
  {
    icon: "/icon-feature3.svg",
    title: "Intuitive Dashboard Design",
    text: "Access all your key YouTube metrics in a clean, organized interface that’s built for creators, saving time and reducing complexity.",
  },
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl flex flex-col items-start bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={50}
                height={50}
                className="mb-8"
              />
              <h3 className="font-semibold text-lg mb-3 text-left">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 text-left">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Middle Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-[36px] font-extrabold mb-6">
  Complete YouTube Analytics. <br />
  No Confusion. Just Growth.
</h2>

<p className="text-base md:text-[16px] text-[#414141] max-w-lg">
  AnalyTube gives you a holistic view of your YouTube channel. Track subscriber growth, monitor video performance, and gain actionable insights into audience engagement. Make data-driven decisions faster and optimize your content strategy effortlessly.
</p>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <Image
              src="/shape.svg"
              alt="Creator shape"
              width={330}
              height={330}
              className="rounded-x2 relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-42 bg-white">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-20">
          Why creators choose AnalyTube
        </h2>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
    icon: "/icon-feature4.svg",
    title: "Reliable Accuracy",
    text: "Powered by YouTube’s public data, our analytics provide trustworthy insights you can rely on to make critical decisions.",
  },
  {
    icon: "/icon-feature5.svg",
    title: "Lightning-fast Analysis",
    text: "Get instant analytics on your channel performance, reducing guesswork and enabling immediate strategic actions.",
  },
  {
    icon: "/icon-feature6.svg",
    title: "Creator-first Transparency",
    text: "Designed for creators with clarity and simplicity in mind, delivering insights without unnecessary noise or complexity.",
  },
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl flex flex-col items-start bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={50}
                height={50}
                className="mb-8"
              />
              <h3 className="font-semibold text-lg mb-3 text-left">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 text-left">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pt-20 pb-30 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-10">
  Start Growing Your YouTube Channel Today
</h2>

        <div className="flex items-center w-full max-w-xl mx-auto bg-[#f5f5f5] rounded-full overflow-hidden">
          <input
            value={ctaQuery}
            onChange={(e) => setCtaQuery(e.target.value)}
            className="flex-grow bg-transparent px-8 py-3 text-sm md:text-base focus:outline-none"
            placeholder="Search Channel or paste URL"
          />
          <button
  onClick={() => handleSearch(ctaQuery)}
  className="bg-[#E94C88] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition"
>
  <Search size={20} className="text-white" />
</button>
        </div>
      </section>

      <Footer />
    </>
  );
}