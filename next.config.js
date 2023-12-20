/** @type {import('next').NextConfig} */
// const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['gsap'])
const nextConfig = {
  reactStrictMode: true,
 
}

// module.exports = withPlugins([withTM({transpileModules: ['gsap']})], nextConfig)
module.exports = withTM({})