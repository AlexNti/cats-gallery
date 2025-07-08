import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/cats-gallery",
        permanent: false, // set to true if it's a permanent redirect (like in production)
      },
    ];
  },
};

export default nextConfig;
