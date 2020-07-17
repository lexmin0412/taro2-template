const pluginList = [
	'@tarojs/plugin-uglify',
	'@tarojs/plugin-sass',
	[
		// 环境变量检查插件
		'taro-plugin-check-env',
		{
			// 配置需要检查的环境变量
			ENV_LIST: {
				CUSTOMIZE_ENV: '自定义环境变量',
				API_HOST: '接口API域名',
				APPID: '小程序APPID',
				API_MAP_QQ: '腾讯地图API/WebService域名',
				KEY_MAP_QQ: '腾讯地图Key',
			},
		},
	],
	[
		// 入口文件初始化插件
		'taro-plugin-init-app',
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
		'taro-plugin-mp'
	)
}

module.exports = pluginList
