import nextI18NextConfig from './next-i18next.config.js';

const nextConfig = {
  ...nextI18NextConfig,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'realstate-7417f.firebasestorage.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
