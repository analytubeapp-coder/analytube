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
        <Link href="/" className="flex items-center">
            <Image
              src="/logoo.svg"
              alt="Logo"
              width={150}
              height={80}
              className="translate-y-[-2.5px]"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-10 text-[16px] font-semibold text-black!">
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/about" className="hover:text-white transition">About Us</Link>
            <Link href="/#faq" className="hover:text-white transition">FAQ</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center space-x-4 text-[16px] font-medium relative text-black!">
          {!user ? (
            <>
              <Link href="/signup" className="hover:text-white transition">
                Sign up
              </Link>

              <Link
                href="/signin"
                className="
                  bg-[#121212] hover:bg-[#121212]/90
                  text-white! px-6 py-3 rounded-full
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
              <div className="relative w-11 h-11 rounded-full bg-white/10 overflow-hidden cursor-pointer hover:bg-white/20 transition">
  {profile?.avatar_url ? (
    <Image
      src={profile.avatar_url}
      alt="User avatar"
      fill
      className="object-cover"
    />
  ) : (
    <div className="flex items-center justify-center w-full h-full">
      <User size={22} color="white" />
    </div>
  )}
</div>

              {isDropdownOpen && (
  <div
    className="
      absolute right-0 top-[45px]
      w-64 rounded-2xl shadow-xl py-4 z-50
      bg-[#181818] backdrop-blur-xl 
      border border-white/20 transition-all duration-150 pointer-events-auto
    "
  >
    {/* USER INFO */}
    <div className="px-5 pb-4 border-b border-white/10">
      <div className="flex items-center space-x-3">
        {/* User Name & Email */}
        <p className="font-medium text-white/90 text-[15px] leading-relaxed">
          {profile?.full_name || "User"}
        </p>
        <p className="text-[13px] text-white/90 truncate">{user?.email}</p>
      </div>

      {/* PLAN */}
      <p className="text-[15px] mt-3 font-medium text-[#f9c03f]">
        {(!profile?.plan || profile?.plan === "free") && (
          <span className="text-[#f9c03f]">Free</span>
        )}
        {profile?.plan === "starter" && (
          <span className="text-[#f9c03f]">Starter</span>
        )}
        {profile?.plan === "creator" && (
          <span className="text-[#f9c03f]">Creator</span>
        )}
        {profile?.plan === "pro" && (
          <span className="text-[#f9c03f]">Pro</span>
        )}
      </p>
    </div>

    {/* PROFILE */}
    <Link
      href="/profile"
      className="
        block px-5 py-3 text-white/90 text-[15px] font-medium 
        hover:bg-white/10 transition rounded-xl
      "
    >
      Profile
    </Link>

    {/* SIGN OUT */}
    <button
      onClick={handleLogout}
      className="
        block w-full text-left px-5 py-3 text-red-400 text-[15px] font-medium 
        hover:bg-white/10 transition rounded-xl
      "
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