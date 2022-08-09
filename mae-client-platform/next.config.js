/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: "/public/Landing.html",
      destination: "/pages/api/Landing.js",
    },
  ],
}

module.exports = nextConfig
