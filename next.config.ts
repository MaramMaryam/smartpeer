import type { NextConfig } from "next";

module.exports = {
  allowedDevOrigins: ['192.168.50.220'],
}

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
};

export default nextConfig;
