/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "ichef.bbci.co.uk" }],
  },
};

export default nextConfig;
