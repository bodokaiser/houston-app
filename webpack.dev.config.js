const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx'
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
})
