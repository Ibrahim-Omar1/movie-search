 // Start of Selection
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    dynamicIO: true,
    reactCompiler: {
      compilationMode: 'all',
    },
  },
  logging: {
    fetches: { 
      // only log fetches in development
      fullUrl: true,
      hmrRefreshes: true,
    },
    incomingRequest: true,
  },
  // remove console in production
  compiler:{
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
    minimumCacheTTL: 86400, // cache for 1 day
  },
};

export default nextConfig;
