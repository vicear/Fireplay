const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['images.rawg.io'], // Dominio de RAWG API
  },
});
