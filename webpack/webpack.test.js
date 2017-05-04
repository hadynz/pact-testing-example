const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return Merge(CommonConfig, {
    devServer: {
      port: 3000,
      publicPath: '/',
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'server/index.integration-test.html',
        inject: 'body',
        filename: 'index.html'
      }),
    ]
  });
};
