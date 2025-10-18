"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";


export default function Home() {
    const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
    const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // ✅ حالت لودینگ
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true); // ✅ شروع لودینگ

    try {
      // درج در Supabase (اختیاری)
      await supabase.from("search_history").insert([
        { query: query.trim(), created_at: new Date().toISOString() },
      ]);
    } catch (err) {
      console.error("❌ Error saving search:", err);
    }

    // ✅ هدایت به داشبورد با پارامتر channel
    setTimeout(() => {
      router.push(`/dashboard?channel=${encodeURIComponent(query.trim())}`);
    }, 800);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };


  return (
    <>

    {loading && (
  <div className="fixed inset-0 bg-white/90 flex flex-col items-center justify-center z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#bfd62e] mb-4"></div>
    <p className="text-gray-700 font-medium">Loading channel data...</p>
  </div>
)}

      <Navbar />

      {/* Hero Section */}
      <section className="bg-white text-black pt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left side: Title + Subtitle + Search */}
          <div className="pt-24">
            <h1 className="text-4xl md:text-4xl font-extrabold leading-snug mb-6">
              Clear, Accurate YouTube <br />
              Insights That Help You <br />
              Grow Faster
            </h1>

            <p className="text-base md:text-lg text-[#414141] mb-8 max-w-lg">
              Stop guessing. Analyze your channel, track real performance, and
              uncover competitor strategies all in one simple dashboard.
            </p>

            {/* Search Box */}
            <div className="flex items-center w-full max-w-lg bg-[#f5f5f5] rounded-full overflow-hidden mt-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-grow bg-transparent px-8 py-3 text-sm md:text-base focus:outline-none"
                placeholder="Search Channel or paste URL"
              />
              <button
                onClick={handleSearch}
                className="bg-[#bfd62e] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#a6bd29] transition"
              >
                <Search size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Right side: Illustration */}
          <div className="relative flex justify-center md:justify-end pt-16">
            <Image
              src="/woman.svg"
              alt="Creator Woman"
              width={400}
              height={400}
              className="rounded-xl relative z-10"
            />
            <Image
              src="/star.svg"
              alt="Star"
              width={50}
              height={50}
              className="absolute -top--4 right-80"
            />
            <Image
              src="/star.svg"
              alt="Star"
              width={50}
              height={50}
              className="absolute bottom-10 left-0"
            />
          </div>
        </div>
      </section>

      {/* Features Section (3 top cards) */}
      <section className="py-42 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "/icon-feature1.svg",
              title: "Competitor insights",
              text: "See what makes top creators grow and discover strategies you can apply to your own channel.",
            },
            {
              icon: "/icon-feature2.svg",
              title: "Revenue estimation",
              text: "Understand real earning potential from both long videos and Shorts with accurate CPM data.",
            },
            {
              icon: "/icon-feature3.svg",
              title: "Simple & clean design",
              text: "Get clear insights without complexity, in a dashboard that's easy to use every day.",
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
              All your YouTube insights. <br />
              None of the complexity.
            </h2>
            <p className="text-base text-[#414141] max-w-lg">
              With AnalyTube, you get everything you need to understand your
              channel at a glance. From accurate revenue estimates for both
              Shorts and long videos to subscriber growth tracking and
              competitor analysis — all in one simple, powerful dashboard.
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
      <section className="py-30 bg-white">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-20">
          Why creators choose AnalyTube
        </h2>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "/icon-feature4.svg",
              title: "Accuracy",
              text: "Get reliable earning estimates powered by YouTube’s public data, so you can trust the numbers you see.",
            },
            {
              icon: "/icon-feature5.svg",
              title: "Speed",
              text: "Enjoy instant analysis results in seconds, helping you make faster and smarter content decisions.",
            },
            {
              icon: "/icon-feature6.svg",
              title: "Trust",
              text: "Built for creators first — with clear insights, transparency, and no unnecessary data noise.",
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

      {/* Final CTA Section */}
      <section className="pt-20 pb-40 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-10">
          Ready to analyze your first channel?
        </h2>
        <div className="flex items-center w-full max-w-xl mx-auto bg-[#f5f5f5] rounded-full overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow bg-transparent px-8 py-3 text-sm md:text-base focus:outline-none"
            placeholder="Search Channel or paste URL"
          />
          <button
            onClick={handleSearch}
            className="bg-[#bfd62e] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#a6bd29] transition"
          >
            <Search size={20} className="text-white" />
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
