const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['page.tsx'],
};

module.exports = withPWA({ ...nextConfig, pwa: { dest: 'public', runtimeCaching } });
