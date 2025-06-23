/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
=======
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      bufferutil: false,
      'utf-8-validate': false,
    };
    return config;
  },
>>>>>>> origin/wcthwq-codex/revisar-y-desarrollar-webapp-inmobiliaria
};

module.exports = nextConfig;
