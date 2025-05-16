const nextConfig = {
  images: {
    domains: [
      "cdn.shopify.com",
      "images.unsplash.com",
      // add any other domains you need here
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 