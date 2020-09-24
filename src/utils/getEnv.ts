/**
 * 获取运行华宁
 */

class GetEnv {
	/**
	 * 是否是微信h5
	 */
	isWechatH5 = () => {
		if (navigator) {
			const userAgent: any = navigator.userAgent.toLowerCase()
			return userAgent.match(/MicroMessenger/i) == 'micromessenger'
		}
		return false
	}
}

export default new GetEnv()
