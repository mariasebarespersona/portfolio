import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // The portfolio now lives at mariasebares.com. tumai.us keeps working and
      // sends everything on permanently, so old links and anything the old
      // address had earned follow the move instead of being stranded.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?tumai\\.us" }],
        destination: "https://www.mariasebares.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
