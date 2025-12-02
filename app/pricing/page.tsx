"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Price from "@/components/Price";

export default function PricePage() {
  return (
    <>
      {/* AURORA FIXED BACKGROUND */}
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      
              {/* هاله بنفش — کشیده، انتزاعی، قابل‌تشخیص */}
              <div
                className="
                  absolute top-[35%] left-[55%]
                  w-[900px] h-[450px]
                  -translate-x-1/2 -translate-y-1/2
                  rotate-[25deg]
                  rounded-[9999px] blur-[160px] opacity-60
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
                  w-[1000px] h-[550px]
                  -translate-x-1/2 -translate-y-1/2
                  rotate-[-30deg]
                  rounded-[9999px] blur-[100px] opacity-60
                "
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,180,100,0.55), transparent 90%)",
                }}
              ></div>
      
            </div>
      
        <Navbar />

      <Price />

      <Footer />
    </>
  );
}