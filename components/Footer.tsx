"use client";
import Image from "next/image";
import Link from "next/link";
import { useSupabaseAuth } from "@/lib/SupabaseProvider";

export default function Footer() {
  const { user } = useSupabaseAuth(); // از context وضعیت کاربر می‌گیریم (در صورت نیاز)

  return (
    <footer className="bg-[#171443] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
        
        {/* Logo */}
        <div className="mb-10 md:mb-0">
          <Image
            src="/logo-white.svg"
            alt="AnalyTube Logo"
            width={150}
            height={50}
            priority
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-12 text-sm">
          <div>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="hover:text-lime-400">Dashboard</Link></li>
              <li><Link href="/blog" className="hover:text-lime-400">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-lime-400">Contact Us</Link></li>
              <li><Link href="/pricing" className="hover:text-lime-400">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-lime-400">About Us</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              <li><Link href="/terms" className="hover:text-lime-400">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-lime-400">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-gray-300 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-6">
        <p>© {new Date().getFullYear()} AnalyTube. Not affiliated with YouTube or Google.</p>

        <div className="flex items-center gap-4">
          <a
            href="mailto:support@analytube.com"
            className="hover:underline text-white"
          >
            support@analytube.com
          </a>
        </div>
      </div>
    </footer>
  );
}
