import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizePackageImports: [
      "date-fns",
      "lodash",
      "lucide-react",
      "iconoir-react",
    ],
  },
  devIndicators: false,
};

export default nextConfig;
