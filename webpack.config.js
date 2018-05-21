// 主配置文件，根据环境变量引用相应的环境的配置
// 获取环境命令
const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig, "");
module.exports = require(`./config/webpack.config.${env}.js`);