"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // -------------------- GOOGLE SIGNUP (UNCHANGED) --------------------
  const handleGoogleSignUp = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    });
    if (error) setError("Google sign-up failed. Please try again.");
  };

  // -------------------- EMAIL SIGNUP (UNCHANGED) --------------------
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    });

    if (error) {
      setError("Failed to send confirmation email. Try again later.");
    } else {
      setMessage("Magic link sent! Check your inbox to confirm your account.");
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <>
      {/* AURORA FIXED BACKGROUND */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">

        {/* Purple */}
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

        {/* Gold */}
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

      {/* Dark overlay */}
      <div className="fixed inset-0 z-0 bg-black/50"></div>

      {/* -------------------- MAIN CONTENT -------------------- */}
      <div className="flex items-center justify-center min-h-screen px-6 py-20 text-white">

        <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-10">

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Create your AnalyTube Account
          </h2>

          {/* Google Signup */}
          <button
            onClick={handleGoogleSignUp}
            className="
              w-full border border-white/20 rounded-full py-3 
              flex items-center justify-center gap-3 text-base 
              bg-white/5 hover:bg-white/10 transition
            "
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="text-center text-white/60 text-sm my-6">or</div>

          {/* EMAIL FORM */}
          <form onSubmit={handleEmailSignUp} className="space-y-5">

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full rounded-lg px-4 py-3 bg-white/10 border border-white/20 
                text-white placeholder-white/40 outline-none
                focus:ring-2 focus:ring-[#fcc978]
              "
              required
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {message && <p className="text-green-400 text-sm">{message}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full font-semibold rounded-full py-3 text-black text-lg 
                transition
                ${loading ? "bg-[#fcc978] cursor-not-allowed" : "bg-[#f9c03f] hover:bg-[#fcc978]"}
              `}
            >
              {loading ? "Sending..." : "Sign Up"}
            </button>
          </form>

          {/* Terms */}
          <p className="text-[13px] text-white/60 mt-8 text-center">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline">Terms</a> and{" "}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>

          {/* Already have an account */}
          <p className="text-[13px] text-white/60 mt-2 text-center">
            Already have an account?{" "}
            <a href="/signin" className="underline">Sign in</a>
          </p>

        </div>
      </div>
    </>
  );
}