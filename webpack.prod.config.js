const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'production',
  entry: './src/index.jsx',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      PORT: '6200',
      STATE: null
    })
  ],
})
