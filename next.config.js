/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Enable static optimization where possible
  staticPageGenerationTimeout: 120,
  // Configure headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            // Enable caching for static assets
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Special case for dynamic routes
        source: '/((?!_next/static|images|fonts).*)',
        headers: [
          {
            key: 'Cache-Control',
            // Enable caching but revalidate periodically
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
  // Optimize production builds
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Optimize chunks
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks more aggressively
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            enforce: true,
            reuseExistingChunk: true,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig; 