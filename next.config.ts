import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
