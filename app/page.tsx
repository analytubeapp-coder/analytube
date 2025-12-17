"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/Price";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
    const router = useRouter();
const [loading, setLoading] = useState(false);

const handleStartFree = async () => {
  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // not logged in
  if (!user) {
    router.push("/signup");
    return;
  }

  // logged in → check profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, channel_name, channel_category, channel_language")
    .eq("id", user.id)
    .single();

  if (
    !profile ||
    !profile.full_name ||
    !profile.channel_name ||
    !profile.channel_category ||
    !profile.channel_language
  ) {
    router.push("/onboarding");
  } else {
    router.push("/dashboard");
  }
};
return (
<>
{/* AURORA FIXED BACKGROUND */}
<div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">

{/* هاله بنفش */}
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

{/* هاله برنزی */}
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
<header className="min-h-screen flex flex-col items-center justify-center text-center pt-28 gap-8">
{/* TITLE */}
<h1 className="text-[32px] md:text-[68px] font-bold leading-[1.3] text-white max-w-6xl">
text <span className="text-[#f9c03f]"> text</span> text.
</h1>

{/* SUBHEADLINE */}
<p className="text-white/80 text-lg md:text-[24px] font-regular max-w-5xl leading-relaxed">
text <br/>
text
</p>

{/* CTA BUTTONS */}
<div className="flex gap-4 mt-4">
<button
  onClick={handleStartFree}
  disabled={loading}
  className="px-8 py-4 bg-[#f9c03f] rounded-[10px] text-[24px] font-semibold hover:bg-[#fcc978] transition disabled:opacity-70"
>
  {loading ? "Loading..." : "start free"}
</button>
</div>

</header>

{/* 3 Cards */}
<section className="pt-32 pb-32">
<div className="max-w-7xl mx-auto px-6 text-center mb-20">
<h2 className="text-3xl md:text-[42px] font-bold leading-tight text-white">
text
</h2>
</div>

<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
{[
{
title: "text",
text: "text",
icon: "/card1.svg",
},
{
title: "text",
text: "text",
icon: "/card2.svg",
},
{
title: "text",
text: "text",
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
<h3 className="font-semibold text-[22px] mb-3 text-white">
{item.title}
</h3>
<p className="text-[20px] text-white/80 leading-relaxed">
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
text
</h3>

<p className="text-white/80 leading-relaxed text-xl md:text-[22px] max-w-5xl mx-auto">
text <br/>
text
</p>
</div>
</div>
</section>

{/* WHY TEAMS CHOOSE */}
<section className="py-28">
<div className="max-w-6xl mx-auto px-6">
<h3 className="text-center text-3xl md:text-[42px] font-bold mb-16 text-white">
text
</h3>

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
h-[240px]
"
>
<img src={item.icon} className="w-12 h-12 md:w-14 md:h-14 mb-6 brightness-110" />
<div className="flex flex-col leading-tight text-white">
<span className="text-[20px] md:text-[28px] font-regular">{item.words[0]}</span>
<span className="text-[20px] md:text-[28px] font-regular mt-1 mb-1">{item.words[1]}</span>
</div>
</div>
))}
</div>
</div>
</section>

{/* PRICE */}
<Price />
<Footer />
</main>
</>
);
}