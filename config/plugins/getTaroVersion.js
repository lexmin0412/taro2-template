const path = require('path')

/**
 * 获取node_modules/taro脚手架依赖路径
 */
const getCliPath = () => {
	return path.resolve(__dirname, './../../node_modules/@tarojs/cli/')
}

/**
 * 获取taro version
 */
const getTaroVersion = () => {
	return require(path.join(getCliPath(), 'package.json')).version
}

/**
 * 获取taro版本号
 */
module.exports = getTaroVersion
