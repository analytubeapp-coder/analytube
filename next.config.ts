import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "orybvrxrlehjactaflwo.supabase.co",
      },
    ],
  },

  // فقط برای سایلنس کردن ارور Turbopack
  turbopack: {},

  experimental: {},
};

export default nextConfig;