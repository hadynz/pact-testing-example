const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '../src/index.js')
  ],

  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0']
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './webpack/static/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
  ]
};
