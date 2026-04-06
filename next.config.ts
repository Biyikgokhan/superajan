import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/odeme",
        destination: "https://app.superajan.com/login",
        permanent: false,
      },
      {
        source: "/giris",
        destination: "https://app.superajan.com/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
