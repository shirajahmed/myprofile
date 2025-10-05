/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/ws',
        destination: `http://localhost:${process.env.WS_PORT || 3001}`,
      },
    ];
  },
};

module.exports = nextConfig;
