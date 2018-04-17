const path = require('path');
const webpack = require('webpack');
//will create new html page using index.html
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: './index.html',
  filename: 'new_index.html',
  //will insert script tag in new HTML file's body
  inject: 'body'
});

module.exports = {
  entry: './index.js',
  mode: 'development',
  module: {
    rules: [
      {
        //test if file ends in .js to to pass through loader
        test: /\.jsx?$/,
        //excludes node_module directory
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig],
  //creates new JS file to send transformed JS
  output:{
    filename:'webpack_bundle.js',
    path: __dirname,

  }
};