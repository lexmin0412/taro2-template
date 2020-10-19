const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const plugins = require('./plugins/index')

const config = {
	projectName: 'Taro2.x项目模板',
	date: '2020-3-10',
	designWidth: 750,
	deviceRatio: {
		640: 2.34 / 2,
		750: 1,
		828: 1.81 / 2,
	},
	defineConstants: {},
	// 解析alias路径
	alias: {
		'~/': path.resolve(__dirname, '..', 'src/'),
		'~/assets': path.resolve(__dirname, '..', 'src/assets'),
		'~/components': path.resolve(__dirname, '..', 'src/components'),
		'~/config': path.resolve(__dirname, '..', 'src/config'),
		'~/constants': path.resolve(__dirname, '..', 'src/constants'),
		'~/enums': path.resolve(__dirname, '..', 'src/enums'),
		'~/interceptors': path.resolve(__dirname, '..', 'src/interceptors'),
		'~/interfaces': path.resolve(__dirname, '..', 'src/interfaces'),
		'~/models': path.resolve(__dirname, '..', 'src/models'),
		'~/pages': path.resolve(__dirname, '..', 'src/pages'),
		'~/services': path.resolve(__dirname, '..', 'src/services'),
		'~/store': path.resolve(__dirname, '..', 'src/store'),
		'~/styles': path.resolve(__dirname, '..', 'src/styles'),
		'~/utils': path.resolve(__dirname, '..', 'src/utils'),
	},
	sourceRoot: 'src',
	outputRoot: 'dist',
	// sass配置
	sass: {
		// 全局注入scss文件
		resource: [
			'src/styles/classes.scss',
			'src/styles/mixin.scss',
			'src/styles/theme.scss',
			'src/styles/var.scss',
		],
		// 指定项目根目录，这样在resource字段中就不需要重复书写path.resolve了
		projectDirectory: path.resolve(__dirname, '..'),
	},
	uglify: {
		enable: true,
		// config: {
		// 	// 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
		// }
		config: {
			nameCache: null, // or specify a name cache object
			toplevel: false,
			ie8: false,
			warnings: false,
		},
	},
	plugins: plugins,
	babel: {
		sourceMap: true,
		presets: [
			[
				'env',
				{
					modules: false,
				},
			],
		],
		plugins: [
			'transform-decorators-legacy',
			'transform-class-properties',
			'transform-object-rest-spread',
			[
				'transform-runtime',
				{
					// async/await支持 替代taro1.x的tarojs/await
					helpers: false,
					polyfill: false,
					regenerator: true,
					moduleName: 'babel-runtime',
				},
			],
		],
	},
	mini: {
		postcss: {
			autoprefixer: {
				enable: true,
				config: {
					browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
				},
			},
			pxtransform: {
				enable: true,
				config: {},
			},
			url: {
				enable: true,
				config: {
					limit: 10240, // 本地图片转base64上限（单位byte）
				},
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]',
				},
			},
		},
	},
	h5: {
		publicPath: '/',
		staticDirectory: 'static',
		router: {
			mode: 'browser', // 或者是 'hash'
			basename: '/h5', // 添加basesname为/h5后 使用taro路由跳转后的路径为 /h5/url 但在地址栏输入 url 和 /h5/url 都可以访问到对应的页面
			customRoutes: {
				// 自定义路由 跳转时还是需要使用app.tsx中定义的路由 但是地址栏会表现为自定义的路由 且通过地址栏输入可以访问到对应的页面
				'/pages/index/index': '/index',
				'/pages/lab/index': '/lab/index',
				'/pages/user/index': '/user/index',
			},
		},
		// js文件名添加hash
		output: {
			filename: 'js/[name].[hash:8].js',
			chunkFilename: 'js/[name].[chunkhash:8].js',
		},
		// css文件名添加hash
		miniCssExtractPluginOption: {
			filename: 'css/[name].[hash:8].css',
			chunkFilename: 'css/[id].[chunkhash:8].css',
		},
		postcss: {
			autoprefixer: {
				enable: true,
				config: {
					browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
				},
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]',
				},
			},
		},
		// 配置需要额外的编译的源码模块 经过这一配置之后，代码中引入的处于 `node_modules/taro-ui/` 路径下的源码文件均会经过taro的编译处理。
		esnextModules: ['taro-ui', 'taro-cui'],
	},
}

module.exports = function (merge) {
	console.log('当前编译环境', process.env.BUILD_ENV)

	const BUILD_ENV = process.env.BUILD_ENV

	if (BUILD_ENV && !fs.existsSync(`config/${BUILD_ENV}.js`)) {
		console.error(
			chalk.red(
				`当前运行 ${BUILD_ENV} 环境，请先创建 config/${BUILD_ENV}.js 后重试，配置文件内容请参考 https://github.com/cathe-zhang/taro-template/blob/master/README.md#开启本地调试`
			)
		)
		return
	}

	let currentConfig = {}
	switch (BUILD_ENV) {
		case 'local':
			currentConfig = require('./local')
			break
		case 'dev':
			currentConfig = require('./dev')
			break
		case 'test':
			currentConfig = require('./test')
			break
		case 'uat':
			currentConfig = require('./uat')
			break
		default:
			currentConfig = require('./pro')
			break
	}
	return merge({}, config, currentConfig)
}
