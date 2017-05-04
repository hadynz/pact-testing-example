const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

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

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-0', 'react-hmre']
            }
          }
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
};
