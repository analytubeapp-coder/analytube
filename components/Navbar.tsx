"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useSupabaseAuth } from "@/lib/SupabaseProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const { user } = useSupabaseAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, avatar_url, plan")
          .eq("id", user.id)
          .single();
        setProfile(data);
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className="
        w-full fixed top-0 left-0 z-50
        backdrop-blur-[5px]
        border-b border-white/10
      "
    >
      <div className="w-full px-6 md:px-20 py-4 md:py-5 flex items-center justify-between gap-6 md:gap-16">

        {/* LEFT */}
        <div className="flex items-center space-x-16">
         {/* <Link href="/" className="flex items-center">
            <Image
              src="/logoo.svg"
              alt="AnalyTube Logo"
              width={150}
              height={80}
              className="translate-y-[-2px]"
              priority
            />
          </Link> */}

          <div className="hidden md:flex items-center space-x-10 text-[16px] font-medium text-white!">
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/about" className="hover:text-white transition">About Us</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center space-x-4 text-[16px] font-medium relative text-white!">
          {!user ? (
            <>
              <Link href="/signup" className="hover:text-white transition">
                Sign up
              </Link>

              <Link
                href="/signin"
                className="
                  bg-[#121212] hover:bg-white/5
                  text-white px-6 py-3 rounded-full
                  backdrop-blur-md border border-white/20
                  font-semibold transition
                "
              >
                Log in
              </Link>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt="User avatar"
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User size={22} color="white" />
                )}
              </div>

              {isDropdownOpen && (
                <div
                  className="
                    absolute right-0 top-[50px]
                    w-56 rounded-2xl shadow-xl py-3 z-50
                    bg-[rgba(20,20,20,0.85)]
                    backdrop-blur-xl border border-white/10
                  "
                >
                  <div className="px-4 pb-3 border-b border-white/10">
                    <p className="font-semibold text-white">
                      {profile?.full_name || "User"}
                    </p>
                    <p className="text-xs text-gray-300 truncate">{user?.email}</p>
                    <p className="text-xs mt-1 text-purple-300">
                      {profile?.plan === "pro" ? "⭐ Pro Plan" : "Free Plan"}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-white/90 hover:bg-white/10 transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 transition"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          className="
            md:hidden px-6 py-4 space-y-4 text-sm font-medium text-white
            bg-[rgba(20,20,20,0.95)] backdrop-blur-2xl
            border-t border-white/10
          "
        >
          <Link href="/blog" className="block hover:text-white">Blog</Link>
          <Link href="/pricing" className="block hover:text-white">Pricing</Link>
          <Link href="/about" className="block hover:text-white">About Us</Link>

          {!user ? (
            <>
              <Link href="/signup" className="block hover:text-white">Sign up</Link>

              <Link
                href="/signin"
                className="
                  block bg-white/10 hover:bg-white/20
                  text-center px-4 py-3 rounded-full font-semibold
                  border border-white/20
                "
              >
                Log in
              </Link>
            </>
          ) : (
            <div className="pt-3 border-t border-white/10">
              <Link href="/profile" className="block hover:text-white">Profile</Link>

              <button
                onClick={handleLogout}
                className="block text-left text-red-400 hover:text-red-500"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}