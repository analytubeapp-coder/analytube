"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/lib/SupabaseProvider";
import { useRouter } from "next/navigation";

export default function Contact() {
  const { user } = useSupabaseAuth();
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ بازیابی مقادیر ذخیره‌شده بعد از بازگشت از لاگین
  useEffect(() => {
    const savedSubject = localStorage.getItem("contact_subject");
    const savedMessage = localStorage.getItem("contact_message");

    if (savedSubject) setSubject(savedSubject);
    if (savedMessage) setMessage(savedMessage);

    // پاکشون کن که دفعه بعدی نمونه
    localStorage.removeItem("contact_subject");
    localStorage.removeItem("contact_message");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!subject || !message) {
      setError("Please fill out all fields.");
      return;
    }

    if (!user) {
      // ✅ اگر لاگین نکرده، فرم رو ذخیره کن
      localStorage.setItem("contact_subject", subject);
      localStorage.setItem("contact_message", message);
      router.push("/signin?redirect=contact");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, subject, message }), // ✅ ایمیل از supabase گرفته می‌شود
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setSuccess(true);
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* 🌈 AURORA BACKGROUND */}
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
        {/* Purple Gradient */}
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

        {/* Gold Gradient */}
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
        {/* Dark Overlay to enhance readability */}
        <div className="fixed inset-0 z-[-1] bg-black/50"></div>

        <section className="py-46 bg-transparent">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-xl shadow-lg p-12 space-y-8">
            <h1 className="text-[40px] font-bold text-center text-white leading-[1.3]">
              Get questions? <br />
              We'll answer.
            </h1>

            <p className="text-lg text-center text-white/80">
              We are here to help! Please fill out the form below, and we'll get back to you soon.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <input
                type="text"
                placeholder="Subject*"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-white/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fcc978] text-white"
              />

              {/* Message */}
              <textarea
                placeholder="Message*"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-white/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fcc978] text-white"
              />

              {/* Error or Success Messages */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && (
                <p className="text-green-600 text-sm">Message sent successfully!</p>
              )}

              {/* Submit Button */}
              <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#f9c03f] hover:bg-[#f9c03f]/90 text-black font-semibold py-3 px-8 rounded-full transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              </div>
            </form>

            <p className="text-sm text-white/70 text-center">
              For support inquiries, contact us at{" "}
              <a
                href="mailto:analytubeapp@gmail.com"
                className="text-[#F9C03F] font-semibold"
              >
                support@aithum.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}