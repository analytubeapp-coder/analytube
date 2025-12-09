"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/Price";

export default function Home() {
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
Create High Performance <span className="text-[#f9c03f]"> SOPs.</span> Automatically.
</h1>

{/* SUBHEADLINE */}
<p className="text-white/80 text-lg md:text-[24px] font-regular max-w-5xl leading-relaxed">
Turn complex processes into clean, professional SOPs complete with workflows, <br/>
KPIs, risks, and roles. Generate world class documentation in seconds using advanced AI.
</p>

{/* CTA BUTTONS */}
<div className="flex gap-4 mt-4">
<a
href="/dashboard"
className="px-8 py-4 bg-[#f9c03f] rounded-[10px] text-[24px] font-semibold hover:bg-[#fcc978] transition"
>
Generate SOP
</a>
</div>

</header>

{/* 3 Cards */}
<section className="pt-32 pb-32">
<div className="max-w-7xl mx-auto px-6 text-center mb-20">
<h2 className="text-3xl md:text-[42px] font-bold leading-tight text-white">
Powerful AI Tools for Creating Exceptional SOPs
</h2>
</div>

<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
{[
{
title: "AI Generated SOP Blueprints",
text: "Generate complete SOP structures objectives, workflow, roles, tools, KPIs, risk matrix, and controls. Built for clarity and compliance.",
icon: "/card1.svg",
},
{
title: "Live Preview & Export",
text: "Preview SOPs instantly in a clean professional layout. Export to DOCX, PDF, and SVG workflow diagrams with one click.",
icon: "/card2.svg",
},
{
title: "AI Suggestions & Insights",
text: "Receive automatic recommendations, missing elements, risk insights, training suggestions, and optimization guidance.",
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
Build Complete SOPs in Seconds
</h3>

<p className="text-white/80 leading-relaxed text-xl md:text-[22px] max-w-5xl mx-auto">
Describe your process the AI transforms it into a complete SOP: workflow diagrams, <br/>
roles, procedures, KPIs, risks, tools, training, and implementation notes.
</p>
</div>
</div>
</section>

{/* WHY TEAMS CHOOSE */}
<section className="py-28">
<div className="max-w-6xl mx-auto px-6">
<h3 className="text-center text-3xl md:text-[42px] font-bold mb-16 text-white">
Why Teams Choose SOP Maker AI
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