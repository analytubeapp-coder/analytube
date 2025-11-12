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

      {/* Header */}
            <section className="relative bg-[#e94c88] pt-40 pb-24">
              {/* Decorative shapes */}
              <div className="absolute bottom-35 right-80 w-10 h-10 bg-white opacity-40 rotate-65"></div>
              <div className="absolute top-30 right-20 w-14 h-14 bg-white opacity-40 rounded-full"></div>
              <div className="absolute bottom-20 left-100 w-10 h-10 bg-white opacity-40 rotate-35"></div>
      
              <div className="absolute top-25 left-20">
                <Image src="/term.svg" alt="Contact" width={200} height={200} />
              </div>
      
              <h1 className="text-center text-5xl font-extrabold text-white leading-relaxed">
                Get questions?
                <br />
                We'll answer.
              </h1>
            </section>

      <section className="py-16 bg-[#ffffff]">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-12 space-y-8 text-center">
          <p className="text-lg text-gray-700 font-medium">
            Fill out this form and we will get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ✅ حذف input ایمیل */}

            <input
              type="text"
              placeholder="Subject*"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e94c88]"
            />
            <textarea
              placeholder="Message*"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e94c88]"
            ></textarea>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-green-600 text-sm">
                Message sent successfully.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          <p className="text-sm text-gray-600">
            For support inquiries, contact us at{" "}
            <a
              href="mailto:analytubeapp@gmail.com"
              className="text-purple font-semibold"
            >
              analytubeapp@gmail.com
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
