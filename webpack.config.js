const path = require('path')
const webpack = require('webpack')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'javascripts/build.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}
