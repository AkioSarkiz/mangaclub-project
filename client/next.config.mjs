/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i2.wp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.mangaread.org",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
