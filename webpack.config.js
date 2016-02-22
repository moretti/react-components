const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './playground/index',
  ],
  output: {
    publicPath: '/static/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?module&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'],
        exclude: /node_modules/,
      },
    ],
  },
  postcss: [
    require('postcss-import'),
    require('postcss-custom-properties')(),
    require('postcss-calc'),
    require('postcss-color-function')(),
    require('postcss-media-minmax')(),
    require('postcss-custom-media')(),
    require('autoprefixer'),
  ],
  resolve: {
    alias: {
      COSMOS_COMPONENTS: path.join(__dirname, 'playground/components'),
      COSMOS_FIXTURES: path.join(__dirname, 'playground/fixtures'),
    },
  },
};
