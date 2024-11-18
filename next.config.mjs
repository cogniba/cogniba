/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/app/:path*",
      },
    ];
  },
  async redirects() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/app/:path*",
          destination: "https://app.cogniba.com/:path*",
          permanent: true,
        },
      ];
    } else {
      return [];
    }
  },
};

export default nextConfig;
