import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.netdinbrut.ro"
          }
        ],
        destination: "https://netdinbrut.ro/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
