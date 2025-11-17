"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="w-full flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-sm font-medium">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logoo.svg"
              alt="AnalyTube Logo"
              width={130}
              height={40}
              className="translate-y-[-1px]"
              priority
            />
          </Link>

          {[
            { href: "/blog", label: "Blogs" },
            { href: "/contact", label: "Contact Us" },
            { href: "/pricing", label: "Pricing" },
            { href: "/about", label: "About" },
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms & Conditions" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#E94C88] transition whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}

          <span className="text-gray-500 text-xs whitespace-nowrap">
            © 2025 AnalyTube
          </span>

        </div>

      </div>
    </footer>
  );
}