// next.config.js
const path = require('path');
const withImages = require('next-images')

module.exports = withImages({
  future: {
    webpack5: true,
  },
  exclude: path.resolve(__dirname, './src/static'),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})