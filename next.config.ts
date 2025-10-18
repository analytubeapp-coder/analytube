import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // ⚡ مهم! اجازه میده تصاویر مستقیم لود شن، بدون بهینه‌سازی لوکال
    remotePatterns: [
      // Supabase (avatars, etc.)
      {
        protocol: "https",
        hostname: "orybvrxrlehjactaflwo.supabase.co",
      },
      // YouTube channel avatars (profile pictures)
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
      },
      // YouTube video thumbnails
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      // Optional: Googleusercontent (some YouTube assets use this)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
};

export default nextConfig;
