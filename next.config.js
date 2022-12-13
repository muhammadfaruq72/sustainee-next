/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: { esmExternals: "loose" },
};

module.exports = nextConfig;
