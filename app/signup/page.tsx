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

  // ---------------- GOOGLE SIGNUP ----------------
  const handleGoogleSignUp = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: process.env.NEXT_PUBLIC_SITE_URL },
    });
    if (error) setError("Google sign-up failed. Please try again.");
  };

  // ---------------- EMAIL SIGNUP ----------------
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
      options: { emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL },
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
      {/* ---------------- PAGE ---------------- */}
      <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2">

        {/* ---------------- LEFT / FORM ---------------- */}
        <div className="flex items-center justify-center px-8 md:px-16">
          <div className="w-full max-w-md space-y-8 text-center">

            <h1 className="text-2xl md:text-3xl font-bold text-black">
              Sign up to CheckEmailHealth
            </h1>

            <p className="text-black/70">
              Access your account using Google or a secure magic link.
            </p>

            {/* Google */}
            <button
              onClick={handleGoogleSignUp}
              className="
                w-full border border-gray-300 rounded-full py-3 
                flex items-center justify-center gap-3 text-black text-base 
                bg-white hover:bg-gray-50 transition
              "
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <div className="text-center text-black/60 text-sm">or</div>

            {/* Email */}
            <form onSubmit={handleEmailSignUp} className="space-y-5">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="
                  w-full rounded-md px-4 py-3 border border-gray-300
                  text-black outline-none
                  focus:ring-2 focus:ring-[#5b65dc]/20
                "
                required
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {message && <p className="text-green-600 text-sm">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full bg-[#5b65dc] hover:bg-[#5b65dc]/80 
                  text-white font-semibold rounded-full py-3 
                  transition disabled:opacity-60
                "
              >
                {loading ? "Sending..." : "Sign Up"}
              </button>
            </form>

            {/* FOOTER TEXT */}
            <div className="space-y-1 leading-snug">
              <p className="text-sm text-black/60">
                By continuing, you agree to our{" "}
                <a href="/terms" className="underline!">Terms</a> and{" "}
                <a href="/privacy" className="underline!">Privacy Policy</a>.
              </p>

              <p className="text-sm text-black/60">
                Already have an account?{" "}
                <a href="/signin" className="underline!">Sign in</a>
              </p>
            </div>

          </div>
        </div>

        {/* ---------------- RIGHT / IMAGE (DESKTOP ONLY) ---------------- */}
        <div className="hidden md:block h-screen relative overflow-hidden">

          <video
           autoPlay
           muted
           loop
           playsInline
           preload="metadata"
           aria-hidden="true"
           className="absolute inset-0 w-full h-full object-cover rounded-tl-[30px] rounded-bl-[30px]"
           >
            <source src="/A.mp4" type="video/mp4" />
           </video>

        </div>

      </div>
    </>
  );
}