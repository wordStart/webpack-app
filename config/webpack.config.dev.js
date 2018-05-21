// 开发环境配置文件
const webpackBase = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const config = require('./config');

module.exports = webpackMerge(webpackBase, {
  devServer: {
    contentBase: config.devServerOutputPath,
    overlay: {
    	error: true,
    	warnings: true,
    },
  },
});