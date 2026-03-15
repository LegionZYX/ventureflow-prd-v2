import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 禁用 Turbopack CSS 处理问题
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
