"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThumbnailGenerator from "@/components/ThumbnailGenerator";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* MAIN THUMBNAIL GENERATOR */}
      <section className="bg-white pt-44 pb-24">
        <div className="w-full flex flex-col items-center px-6">
          <h1 className="text-3xl md:text-[36px] font-bold mb-14 text-center">
            Upload an Image to Generate Thumbnail
          </h1>

          <ThumbnailGenerator />
        </div>
      </section>

      {/* Features Section (3 top cards) */}
      <section className="py-40 bg-white pt-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "/icon-feature1.svg",
              title: "AI-Powered Thumbnail Generator",
              text: "Turn simple ideas into high-performing thumbnails automatically, optimized for clicks and engagement.",
            },
            {
              icon: "/icon-feature2.svg",
              title: "Thumbnail Enhancer",
              text: "Improve your existing thumbnails with AI sharpening, color boosting, cleanup and professional styling.",
            },
            {
              icon: "/icon-feature3.svg",
              title: "Ready-Made Templates",
              text: "Choose from YouTube-optimized templates designed for gaming, vlogs, education, tech, and more.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl flex flex-col items-start bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
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
              Your YouTube Thumbnails <br />
              Professional, Fast, and Fully AI-Driven
            </h2>

            <p className="text-base md:text-[16px] text-[#414141] max-w-lg">
              Create thumbnails that stand out in under 30 seconds. Upload an
              image or start with text, then let AI handle colors, layout, text
              styling and background enhancement. Perfect for creators who want
              better thumbnails without wasting hours on design.
            </p>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <img
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
              title: "Boost Your Click-Through Rate",
              text: "Eye-catching designs tailored to maximize CTR and keep your channel growing.",
            },
            {
              icon: "/icon-feature5.svg",
              title: "Lightning-Fast Generation",
              text: "Get multiple thumbnail variations in seconds using advanced image-generation AI.",
            },
            {
              icon: "/icon-feature6.svg",
              title: "Creator-Focused Simplicity",
              text: "A clean, intuitive interface made specifically for YouTubers. No design skills required.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl flex flex-col items-start bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
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

      <Footer />
    </>
  );
}