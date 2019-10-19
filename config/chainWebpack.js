const cdn = require('./cdn');
const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { isProduction } = require('./entry');
module.exports = (config) => {
  if (isProduction) {
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
  }
  config.plugin('html').tap((args) => {
    args[0].cdn = cdn;
    return args;
  });
  config
    .plugin('ScriptExtHtmlWebpackPlugin')
    .after('html')
    .use('script-ext-html-webpack-plugin', [
      {
        inline: /runtime\..*\.js$/,
      },
    ])
    .end();
  const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
  types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)));
  config.module
    .rule('vue')
    .use('vue-loader')
    .loader('vue-loader')
    .tap((options) => {
      options.compilerOptions.preserveWhitespace = true;
      return options;
    })
    .end();
  config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
  config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin());
  config.when(!isProduction, (config) => config.devtool('cheap-source-map'));
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, '../src/styles/var.scss')],
    });
}
