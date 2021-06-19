const withTM = require('next-transpile-modules')([
  '@react-financial-charts/core',
  '@react-financial-charts/axes',
  '@react-financial-charts/scales',
  '@react-financial-charts/series',
  '@react-financial-charts/utils',
  '@react-financial-charts/annotations',
])

const generateNextConf = (pluginOptions = {}) => (nextConfig = {}) => {
  const extension = pluginOptions.extension || /\.js$/

  return Object.assign(
    {},
    nextConfig,
    withTM({
      webpack5: true,
      webpack: (config, options) => {
        config.experiments = {
          topLevelAwait: true,
        }

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }

        return config
      },
      typescript: {
        ignoreDevErrors: true,
        ignoreBuildErrors: true,
      },
      trailingSlash: false,
    }),
  )
}

module.exports = generateNextConf()
