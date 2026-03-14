import { withContentCollections } from '@content-collections/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  experimental: {
    viewTransition: true,
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
      hmrRefreshes: process.env.NODE_ENV === 'development',
    },
  },
};

export default withContentCollections(nextConfig);
