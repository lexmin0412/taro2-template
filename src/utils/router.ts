/**
 * 跳转方法工具类
 */

import Taro from '@tarojs/taro'

interface IRoute {
	/**
	 * 页面路径
	 */
	url: string
	/**
	 * 页面跳转参数
	 */
	query?: {
		[key: string]: any
	}
}

interface IBack {
	delta?: number
}

class APPRouter {
	/**
	 * 前进
	 */
	navigateTo = (obj: IRoute) => {
		const url = this.joinUrl(obj)
		Taro.navigateTo({
			url,
		})
	}

	/**
	 * 重定向
	 */
	redirectTo = (obj: IRoute) => {
		const url = this.joinUrl(obj)
		Taro.redirectTo({
			url,
		})
	}

	/**
	 * 切换到tab页面
	 */
	switchTab = (obj: IRoute) => {
		const url = this.joinUrl(obj)
		Taro.switchTab({
			url,
		})
	}

	/**
	 * 返回页面栈中的页面
	 */
	navigateBack(obj: IBack) {
		if (process.env.TARO_ENV === 'weapp') {
			// 微信小程序
			Taro.navigateBack({
				delta: obj.delta || 1,
			})
		} else if (process.env.TARO_ENV === 'h5') {
			window.history.go(-(obj.delta || 1))
		}
	}

	/**
	 * 重载应用并打开指定页面
	 */
	reLaunch = (obj: IRoute) => {
		const url = this.joinUrl(obj)

		if (process.env.TARO_ENV === 'weapp') {
			Taro.reLaunch({
				url,
			})
		} else {
			const pages = Taro.getCurrentPages()

			// 要重载的页面是否在页面栈中已存在
			const existedIndex = pages.findIndex(item => {
				if (item) {
					const path = item.props.location.path
					return obj.url && obj.url.startsWith(path)
				}
			})
			// 如果存在则直接返回
			if (existedIndex > -1) {
				Taro.navigateBack({
					delta: pages.length - existedIndex - 1,
				})
			} else {
				// 否则replace
				const relaunchUrl = `${window.location.origin}${url.slice(1)}`
				window.location.replace(relaunchUrl)
			}
		}
	}

	/**
	 * 拼接url
	 */
	joinUrl(params: IRoute) {
		const { url, query } = params
		if (query && Object.keys(query).length) {
			const paramsStr = this.joinParams(query)
			return `${url}${paramsStr}`
		} else {
			return url
		}
	}

	/**
	 * 将对象形式的参数拼接成字符串形式
	 */
	joinParams(paramsObj) {
		// 对象不为空且属性数量大于0
		if (paramsObj && Object.keys(paramsObj).length > 0) {
			let paramStr = ''
			for (const key in paramsObj) {
				if (paramsObj.hasOwnProperty(key)) {
					const element = paramsObj[key]
					paramStr = `${paramStr}${paramStr ? '&' : '?'}${key}=${element}`
				}
			}
			return paramStr
		}
		return ''
	}
}

export default new APPRouter()
