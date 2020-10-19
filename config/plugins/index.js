const compareVersion = require('./compareVersion')
const getTaroVersion = require('./getTaroVersion')

const pluginList = [
	[
		// 环境变量检查插件
		'@tarox/plugin-check-env',
		{
			// 配置需要检查的环境变量
			ENV_LIST: {
				API_HOST: '接口API域名',
				APPID: '小程序APPID',
				API_MAP_QQ: '腾讯地图API/WebService域名',
				KEY_MAP_QQ: '腾讯地图Key',
			},
			taroVersion: {
				h5: '2.2.13',
				weapp: '2.2.13',
			},
		},
	],
	[
		// 入口文件初始化插件
		'@tarox/plugin-init-app',
		{
			// 配置首页路由
			homeRoute: 'pages/home/index',
			// 需要打包的页面
			includePages: [
				'pages/home/index',
				'pages/classify/index',
				'pages/classify/searchResult',
				'pages/details/index',
			],
		},
	],
]

// 小程序添加 taro-plugin-mp 插件
if (process.env.TARO_ENV === 'weapp') {
	pluginList.push(
		// 小程序project.config.json文件生成插件
		'@tarox/plugin-mp'
	)
}

// 获取当前项目的taro版本号
const taroVersion = getTaroVersion()

// 小程序使用的是2.2.11，taro2.2.8以上的版本官方将uglify/scss插件被分离出了两个插件，所以这里需要插入
const shouldPushUglifyNSassPlugin = compareVersion(taroVersion, '2.2.8') >= 0
console.log(
	'当前taro版本',
	taroVersion,
	`${shouldPushUglifyNSassPlugin ? '' : '不'}需要单独引入 uglify 和 sass 插件`
)

if (shouldPushUglifyNSassPlugin) {
	pluginList.unshift(['@tarojs/plugin-uglify'])
	pluginList.unshift(['@tarojs/plugin-sass'])
}

module.exports = pluginList
