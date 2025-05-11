// next.config.ts
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public",
  reactStrictMode: true,
  images: {
    domains: ["images.rawg.io"], // Dominio de RAWG API
  },
  experimental: {
    turbo: true, // Habilitar Turbopack (nuevo compilador de Next.js)
  },
});

export default nextConfig;
