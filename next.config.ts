import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns : [
      {
        protocol: 'https',
        hostname : "mosaic.scdn.co",
      },
      {
        protocol : "https",
        hostname  :"i.scdn.co"
      }
    ]
  }
};

export default nextConfig;
