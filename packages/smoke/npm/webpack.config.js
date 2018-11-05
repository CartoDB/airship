const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // The web component loader requires a public path
    publicPath: 'dist/'
  },
  module: {
    rules: [
      // Use a sass loader to process sass files
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      // Use a css loader to inject css files
      {
        test: /\.css$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
        ]
      },
      // Use a url loader to load font files
      {
        test: /\.(ttf|woff|svg)$/,
        use: {
          loader: "url-loader",
        },
      },
    ]
  }
};
