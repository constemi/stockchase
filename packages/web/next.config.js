const withTM = require('next-transpile-modules')([
  '@react-financial-charts/core',
  '@react-financial-charts/axes',
  '@react-financial-charts/scales',
  '@react-financial-charts/series',
  '@react-financial-charts/utils',
  '@react-financial-charts/annotations',
])

module.exports = withTM({
  future: {
    webpack5: true,
  },
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
})
