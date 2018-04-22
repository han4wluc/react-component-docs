
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = [];
if(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'){
  entry.push('webpack-dev-server/client?http://0.0.0.0:8080');
  entry.push('webpack/hot/only-dev-server');
}
entry.push(path.resolve(__dirname, './componentDocs.js'));
// entry.push(path.resolve(process.cwd(), 'cache/componentDocs.js'));

module.exports = {

  mode: 'development',
  entry: entry,
  output: {
    path: path.resolve(__dirname, '/'),
    publicPath: '/',
    filename: 'index.js'
  },

  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html'
    })
  ],

  module: {
    rules: [{
      test: /\.js$/,// A regexp to test the require path. accepts either js or jsx
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        // This is a feature of `babel-loader` for Webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
        plugins: ['transform-decorators-legacy', 'react-hot-loader/babel'],
        presets: ['es2015', 'stage-2', 'react'],
      },
    },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }
    ],
  },
};
