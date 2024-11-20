const isDevelopment = process.env.NODE_ENV !== "production";

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
  async redirects() {
    return isDevelopment
      ? []
      : [
          {
            source: "/app/:path*",
            destination: `${process.env.NEXT_PUBLIC_APP_URL}/:path*`,
            permanent: true,
          },
        ];
  },
  async rewrites() {
    return [
      {
        source: isDevelopment ? "/app/:path*" : "/:path*",
        has: isDevelopment
          ? []
          : [
              {
                type: "host",
                value: "app.cogniba.com",
              },
            ],
        destination: "/app/:path*",
      },
    ];
  },
};

export default nextConfig;
