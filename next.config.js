const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['page.tsx'],
};

const pwa = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
};

module.exports = withPWA({ ...nextConfig, pwa });
