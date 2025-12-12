import type { NextConfig } from "next";

const assetPrefix = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

const nextConfig: NextConfig = {
  assetPrefix,
};

export default nextConfig;
