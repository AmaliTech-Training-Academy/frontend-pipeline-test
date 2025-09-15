import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure standalone output so Dockerfile can copy .next/standalone + server.js
  output: "standalone",
};

export default nextConfig;
