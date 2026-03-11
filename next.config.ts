import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV !== 'production',
      hmrRefreshes: process.env.NODE_ENV !== 'production',
    },
  },
};

export default nextConfig;
