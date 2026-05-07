import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This helps if you're using high-res images in your sequence
  images: {
    unoptimized: true,
  },
  // Optional: speeds up builds if you have hundreds of files in /public
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
