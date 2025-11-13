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

  // --- Sign up with Google ---
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

  // --- Sign up with Email (Magic Link) ---
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // 👇 اینجا از signInWithOtp استفاده می‌کنیم به‌جای signUp
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
    <div className="flex h-screen">
      {/* سمت چپ */}
      <div
        className="w-3/10 flex flex-col py-40 px-16 relative"
        style={{ backgroundColor: "#E94C88" }}
      >
        <h1 className="mb-8">
          <span className="block text-xl text-white font-bold mb-2">
            Welcome to,
          </span>
          <span className="block text-4xl text-white font-extrabold">
            AnalyTube!
          </span>
        </h1>
        <div className="w-30 h-0.5 bg-white mb-10"></div>
        <p className="text-white text-sm max-w-sm">
          Sign Up to get instant YouTube channel insight, accurate revenue
          estimates, and easy growth tracking. Start now and take your channel
          to the next level.
        </p>

        {/* دایره */}
        <div className="absolute bottom-20 right-[-80px] w-40 h-40 border-[30px] border-white rounded-full"></div>
      </div>

      {/* سمت راست */}
      <div className="w-3/5 flex flex-col justify-center items-center">
        <div className="w-80">
          <h2 className="text-xl font-bold text-center mb-4">
            Sign Up to AnalyTube
          </h2>
          <p className="text-center text-sm mb-8">
            Create your account for smarter analyze.
          </p>

          {/* دکمه گوگل */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full border border-gray-300 rounded-full py-2 flex items-center justify-center gap-2 text-sm mb-10 hover:bg-gray-50 text-gray-700"
          >
            <img src="/google-icon.svg" alt="Google" className="w-4 h-4" />
            Sign up with Google
          </button>

          <div className="text-center text-gray-400 text-sm mb-10">or</div>

          {/* ثبت نام با ایمیل */}
          <form onSubmit={handleEmailSignUp}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 text-gray-700"
              required
            />

            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            {message && <p className="text-green-600 text-xs mb-4">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold rounded-full py-2 transition-colors duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#E94C88] hover:bg-[#a6bd29]"
              }`}
            >
              {loading ? "Sending..." : "Sign Up"}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-8 text-center">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline!">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline!">
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Already have an account?{" "}
            <a href="/signin" className="underline!">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
