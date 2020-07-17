module.exports = {
	defineConstants: {
		APP_CONF:
			process.env.TARO_ENV === 'h5'
				? {
						CUSTOMIZE_ENV: '"uat"',
						API_HOST: '"https://xx.com/"',
						APPID: '"wx0b32dc740be4b1f5"',
						API_MAP_QQ: '"https://apis.map.qq.com"',
						KEY_MAP_QQ: '"UQPBZ-RCU36-K2YS3-EMV6Y-JI6JJ-3WBUM"',
				  }
				: {
						CUSTOMIZE_ENV: 'uat',
						API_HOST: 'https://xx.com/',
						APPID: 'wx0b32dc740be4b1f5',
						API_MAP_QQ: 'https://apis.map.qq.com',
						KEY_MAP_QQ: 'UQPBZ-RCU36-K2YS3-EMV6Y-JI6JJ-3WBUM',
				  },
	},
}
