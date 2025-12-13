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

  // ⛔️ Turbopack برای build خاموش
  experimental: {},

  // ✅ این مهمه
  serverExternalPackages: ["pino", "thread-stream"],
};

export default nextConfig;