// 生产环境配置文件
const webpackBase = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
module.exports = webpackMerge(webpackBase, {
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: '/public/[name].bundle.js',
		}),
	],
});
