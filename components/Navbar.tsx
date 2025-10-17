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
  const { user } = useSupabaseAuth(); // ✅ وضعیت لاگین کاربر از Context

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
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left side: Logo + Links */}
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="AnalyTube Logo"
              width={150}
              height={50}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-800">
            <Link href="/dashboard" className="hover:text-purple">
              Dashboard
            </Link>
            <Link href="/blog" className="hover:text-purple">
              Blog
            </Link>
            <Link href="/pricing" className="hover:text-purple">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-purple">
              About Us
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center space-x-4 text-sm font-medium relative">
          {!user ? (
            <>
              <Link href="/signup" className="font-semibold hover:text-purple">
                Sign up
              </Link>
              <Link
                href="/signin"
                className="bg-black text-white! px-4 py-2 rounded-md font-semibold hover:bg-gray-800"
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
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
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

              {/* Dropdown */}
{isDropdownOpen && (
  <div
    className="
      absolute right-0 top-[45px]
      w-56 bg-white rounded-2xl shadow-xl py-3 z-50
      transition-all duration-150
    "
  >
    <div className="px-4 pb-3 border-b border-gray-100">
      {/* نام کامل */}
      <p className="font-semibold text-gray-900 pb-2">
        {profile?.full_name || "User"}
      </p>

      {/* ایمیل */}
      <p className="text-xs text-gray-500 truncate">{user?.email}</p>

      {/* وضعیت اشتراک */}
      <p
        className={`mt-1 text-xs font-medium ${
          profile?.plan === "pro" ? "text-green-600" : "text-gray-500"
        }`}
      >
        {profile?.plan === "pro" ? "⭐ Pro Plan" : "Free Plan"}
      </p>
    </div>

    {/* لینک پروفایل */}
    <Link
      href="/profile"
      className="block px-4 py-2 hover:bg-gray-50 cursor-pointer"
      onClick={() => setIsDropdownOpen(false)}
    >
      Profile
    </Link>

    {/* خروج */}
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 cursor-pointer"
    >
      Sign out
    </button>
  </div>
)}


            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-sm font-medium text-text">
          <Link href="/dashboard" className="block hover:text-purple">
            Dashboard
          </Link>
          <Link href="/blog" className="block hover:text-purple">
            Blog
          </Link>
          <Link href="/pricing" className="block hover:text-purple">
            Pricing
          </Link>
          <Link href="/about" className="block hover:text-purple">
            About Us
          </Link>

          {!user ? (
            <>
              <Link
                href="/signup"
                className="block font-semibold hover:text-purple"
              >
                Sign up
              </Link>
              <Link
                href="/signin"
                className="block bg-black text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-gray-800"
              >
                Log in
              </Link>
            </>
          ) : (
            <div className="pt-4 border-t">
              <Link
                href="/profile"
                className="block hover:text-purple"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block hover:text-purple"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
              <div
                onClick={handleLogout}
                className="block text-red-600 hover:text-red-700 cursor-pointer"
              >
                Sign out
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
