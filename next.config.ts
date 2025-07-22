import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next.config.js
  async redirects() {
    return [
      {
        source: "/",
        destination: "/user",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
