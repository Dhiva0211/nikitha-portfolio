import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  bundlePagesRouterDependencies: true,
  experimental: {
    dynamicIO: true,
  },
};

export default nextConfig;
