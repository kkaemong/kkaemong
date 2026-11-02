import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 큰 PNG를 AVIF/WebP로 변환해서 내려준다
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600],
    imageSizes: [320, 480, 640],
  },
};

export default nextConfig;
