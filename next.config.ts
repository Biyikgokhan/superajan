import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/odeme",
        destination: "/giris",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
