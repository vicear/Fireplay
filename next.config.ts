/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
        pathname: "/media/**",
      },
    ],
  },
  experimental: {
    turbo: false,
  },
};

module.exports = nextConfig;
