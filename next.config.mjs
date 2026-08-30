/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // TODO: Yohan/Énergies Plus — remplacer les photos Unsplash (placeholders)
    // par des visuels fournis, puis retirer les hôtes distants ci-dessous.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  eslint: {
    dirs: ["app", "components", "lib", "data", "types"],
  },
};

export default nextConfig;
