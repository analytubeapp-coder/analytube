import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "orybvrxrlehjactaflwo.supabase.co" },
      { protocol: "https", hostname: "yt3.ggpht.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },

  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },

  // جلوگیری از ارورهای pino و پکیج‌های Node در Webpack
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      tap: false,
      fastbench: false,
      "pino-elasticsearch": false,
      "why-is-node-running": false,
      desm: false,
    };

    return config;
  },
};

export default nextConfig;