const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'asapi.js',
    library: 'AsApi',
    libraryTarget: 'umd'
  }
};