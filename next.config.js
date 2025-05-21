/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack for development
  turbopack: {},

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
};

// Only apply Webpack config if explicitly using Webpack
if (process.env.NEXT_WEBPACK === 'true') {
  nextConfig.webpack = (config, { dev, isServer }) => {
    // Only apply custom splitChunks on production Webpack builds
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            enforce: true,
            reuseExistingChunk: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 10,
            enforce: true,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  };
}

module.exports = nextConfig; 