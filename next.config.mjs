/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/US_Naturalization_Test',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
