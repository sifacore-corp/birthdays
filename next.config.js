/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    // Load sass files by @import filename.scss instead of typing the full paths.
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
}

module.exports = nextConfig
