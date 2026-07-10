/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  reactCompiler: true,
};

export default nextConfig;
