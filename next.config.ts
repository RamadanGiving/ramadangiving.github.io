import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath will be automatically injected by GitHub Pages action
  // Uncomment the following line if deploying manually:
  // basePath: process.env.NODE_ENV === 'production' ? '/ramadangiving.github.io' : '',
  trailingSlash: true,
};

export default nextConfig;
