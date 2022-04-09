/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
    domains: [
      'local-laravel-shop.com',
      'local-rad-stack.com',
      'portfolio85.s3.us-east-2.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
