"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

  // Restore saved form after login redirect
  useEffect(() => {
    const savedSubject = localStorage.getItem("contact_subject");
    const savedMessage = localStorage.getItem("contact_message");

    if (savedSubject) setSubject(savedSubject);
    if (savedMessage) setMessage(savedMessage);

    localStorage.removeItem("contact_subject");
    localStorage.removeItem("contact_message");
  }, []);

  // Auto-hide success message
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 4000);
    return () => clearTimeout(timer);
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSuccess(false);

    if (!subject.trim() || !message.trim()) {
      setError("Please fill in both the subject and message so we can help you properly.");
      return;
    }

    if (!user) {
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
        body: JSON.stringify({
          email: user.email,
          subject: subject.trim(),
          message: message.trim(),
        }),
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

      <main className="min-h-screen w-full bg-white relative">
        <section className="py-46">
          <div className="max-w-3xl mx-auto px-6 space-y-8">

            <h1 className="text-[24px] md:text-[44px] font-bold text-center text-black leading-[1.3]">
              Get Questions?
              <br />
              We'll Answer.
            </h1>

            <p className="text-[16px] text-center text-black">
              We are here to help. Fill out the form below and our team will get
              back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Subject *"
                value={subject}
                disabled={loading}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#5b65dc]/20"
              />

              <textarea
                placeholder="Message *"
                rows={7}
                value={message}
                disabled={loading}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-[#5b65dc]/20"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && (
                <p className="text-green-600 text-sm">
                  Message sent successfully!
                </p>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#5b65dc] hover:bg-[#5b65dc]/80 text-white text-[18px] font-semibold py-4 px-8 rounded-full transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>

            <p className="text-[16px] text-gray-600 text-center">
              For support inquiries, contact us at{" "}
              <a href="mailto:support@checkemailhealth.com" className="text-[#5b65dc] font-semibold">
                support@checkemailhealth.com
              </a>
            </p>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}