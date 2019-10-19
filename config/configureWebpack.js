const TerserPlugin = require('terser-webpack-plugin');
const {
  isProduction
} = require('./entry');
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css', 'json', 'html'];
module.exports = (config) => {
  if (isProduction) {
    /* config.plugins.push(
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: true,
      }),
    ), */
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            compress: true,
            output: {
              comments: false,
              beautify: false
            }
          },
        }),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000, // unit: b
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            minChunks: 1,
            priority: 10,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `chunk-${packageName.replace('@', '')}`;
            },
          },
          styles: {
            name: 'chunk-styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    };
  }
};
