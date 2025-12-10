import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      // فقط Supabase (اگر واقعاً لازم داری، همین یکی کافی است)
      {
        protocol: "https",
        hostname: "orybvrxrlehjactaflwo.supabase.co",
      },
    ],
  },

  turbopack: {
    resolveAlias: {
      tap: false,
      fastbench: false,
      desm: false,
      "pino-elasticsearch": false,
      "why-is-node-running": false,
    },
  },

  experimental: {
    turbopack: true,
  },
};

export default nextConfig;