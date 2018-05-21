// 一些全局的配置，比如 HTML 文件的路径、publicPath 等
const fs = require('fs');
const path = require('path');
// 获取所有页面 生成多页面的集合
function getFileNameList(path) {
	let fileList = [];
	let dirList = fs.readdirSync(path);
	dirList.forEach(item => {
		if (item.indexOf('html') > -1) {
			fileList.push(item.split('.')[0]);
		}
  });
	return fileList;
}
const AppPath = path.resolve(__dirname, '../app/html');
let HTMLDirs = getFileNameList(AppPath);
module.exports = {
  HTMLDirs: HTMLDirs,
	cssPublicPath:"../",
	imgOutputPath:"../dist/img/",
	devServerOutputPath:"../dist",
};