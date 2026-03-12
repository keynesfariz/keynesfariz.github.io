import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
      hmrRefreshes: process.env.NODE_ENV === 'development',
    },
  },
};

export default nextConfig;
