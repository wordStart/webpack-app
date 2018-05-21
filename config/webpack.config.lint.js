// 使用 ESLint 代码检查时的配置文件
const webpackBase = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const config = require('./config');

module.exports = webpackMerge(webpackBase, {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
          emitWarning: true,
        },
      },
    ],
  },
  devServer: {
    contentBase: config.devServerOutputPath,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});