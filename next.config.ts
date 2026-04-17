import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 specific optimizations
  reactStrictMode: true,
  reactCompiler: true,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
