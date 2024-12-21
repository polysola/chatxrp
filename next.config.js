/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output:'export',
  swcMinify: true,

  //   assetPrefix: './',
  images: {
    unoptimized: true,
    domains: ["oaidalleapiprodscus.blob.core.windows.net"],
  },

  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },
};

module.exports = nextConfig;
