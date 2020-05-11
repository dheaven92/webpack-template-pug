const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')
const imageminMozjpeg = require('imagemin-mozjpeg')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  plugins: [
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 50,
          progressive: true,
          arithmetic: false
        }),
        imageminPngquant({
          floyd: 0.5,
          speed: 2
        }),
        imageminSvgo({
          plugins: [
            { removeTitle: true },
            { convertPathData: false }
          ]
        })
      ]
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
