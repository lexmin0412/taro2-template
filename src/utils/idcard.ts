/**
 * 身份证相关工具类
 */

class IDCard {
	/**
	 * 分析身份证，计算年龄，性别
	 * @param {string} identityCard 身份证号码
	 * @param {string} isEncrypt 是否脱敏 脱敏则不校验格式
	 */
	getIDCardInfo = (idCardNo: string, isEncrypt?: string) => {
		console.log('idcard', idCardNo)

		/**
		 * 解析完成的信息对象
		 */
		const msgObj = {
			/**
			 * 是否合法
			 */
			isValid: true,
			/**
			 * 性别 1-男 0-女
			 */
			sex: '1',
			/**
			 * 年龄 number
			 */
			age: 0,
			/**
			 * 出生日期 格式 YYYY-MM-DD
			 */
			birthday: '',
		}

		if (
			!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCardNo) &&
			!isEncrypt
		) {
			console.warn('into reg')
			msgObj.isValid = false
			return msgObj
		}

		const getCardInfos = (idNo: string) => {
			const cardInfos = {
				yearBirth: '',
				monthBirth: '',
				dayBirth: '',
			}
			if (idNo.length === 15) {
				cardInfos.yearBirth = `19${idNo.substring(6, 8)}`
				cardInfos.monthBirth = idNo.substring(8, 10)
				cardInfos.dayBirth = idNo.substring(10, 12)
			} else {
				cardInfos.yearBirth = idNo.substring(6, 10)
				cardInfos.monthBirth = idNo.substring(10, 12)
				cardInfos.dayBirth = idNo.substring(12, 14)
			}
			return cardInfos
		}

		// 获取用户身份证号码
		const userCard = idCardNo

		// 获取性别
		if (parseInt(userCard.substr(userCard.length - 2, 1)) % 2 === 1) {
			msgObj.sex = '1'
		} else {
			msgObj.sex = '0'
		}
		// 获取出生年月日
		const cardInfos = getCardInfos(userCard)
		if (
			Number(cardInfos.yearBirth) < 1900 ||
			Number(cardInfos.yearBirth) > new Date().getFullYear() ||
			Number(cardInfos.monthBirth) > 12 ||
			Number(cardInfos.dayBirth) > 31
		) {
			msgObj.isValid = false
		}
		const yearBirth = cardInfos.yearBirth
		const monthBirth = cardInfos.monthBirth
		const dayBirth = cardInfos.dayBirth
		// 获取当前年月日并计算年龄
		const myDate = new Date()
		const monthNow = myDate.getMonth() + 1
		const dayNow = myDate.getDay()
		let age = myDate.getFullYear() - Number(yearBirth)
		if (
			monthNow < parseInt(monthBirth) ||
			(monthNow === parseInt(monthBirth) && dayNow < parseInt(dayBirth))
		) {
			age--
		}
		// 得到年龄
		msgObj.age = age
		msgObj.birthday = `${yearBirth}-${monthBirth}-${dayBirth}`

		// 返回解析信息对象
		return msgObj
	}
}

export default new IDCard()
