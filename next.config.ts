import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { // Allow any images to be served from firebase
    domains: ['firebasestorage.googleapis.com'],
    // Allow images from DALL-E API in order to use Next.js Image component
    remotePatterns: [{
      protocol: 'https',
      hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      port: '',
      pathname: '/**',
    }],
  },
};

export default nextConfig;
