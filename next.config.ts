import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["date-fns", "lodash", "iconoir-react"],
  },
  output: "standalone",
  // devIndicators: false,
  // turbopack: { root: __dirname },
};

export default nextConfig;
