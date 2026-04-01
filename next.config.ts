import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/paul-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
