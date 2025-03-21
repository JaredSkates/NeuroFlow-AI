import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { // Allow any images to be served from firebase
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
