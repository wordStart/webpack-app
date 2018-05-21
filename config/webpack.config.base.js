// 最基础的配置文件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 引入多页面文件列表
const config = require('./config.js');
// 通过html-webpack-plugin生成的html集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {};

// 生成多页面集合
config.HTMLDirs.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}.html`,
    template: path.resolve(__dirname, `../app/html/${page}.html`),
    chunks: [page, 'commons'],
  });
  HTMLPlugins.push(htmlPlugin);
  Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
});
module.exports = {
  entry: Entries,
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name]/[name].bundle.[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // 设置css的publicPath
          publicPath: config.cssPluginPath,
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: config.imgOutputPath,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, "../"),
    }),
    new ExtractTextPlugin("./css/[name]/[name].css"),
    ...HTMLPlugins,
  ],
};