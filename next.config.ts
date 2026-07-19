import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ftp.goit.study" },
      { protocol: "https", hostname: "www.nytimes.com" },
      { protocol: "https", hostname: "media4.giphy.com" },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
