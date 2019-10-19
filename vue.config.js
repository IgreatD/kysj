const { chainWebpack, devServer, configureWebpack } = require('./config');
module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_NAME : '/',
  outputDir: `dist/${process.env.VUE_APP_BASE_NAME}`,
  devServer,
  chainWebpack: (config) => {
    chainWebpack(config);
  },
  configureWebpack: (config) => {
    configureWebpack(config);
  },
  /*  pages: {
    index: 'src/main.ts',
    'web-news': 'src/web-news/index.ts',
  }, */
};
