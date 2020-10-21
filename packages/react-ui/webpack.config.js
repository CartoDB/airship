const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'asreactui.js',
    library: 'AsReactUi',
    libraryTarget: 'umd'
  },
  externals: [
    {
      react: 'react',
      'react-dom': 'react-dom',
    },
    /^@material-ui\/.+$/,
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
     }
    ]
  }
};
