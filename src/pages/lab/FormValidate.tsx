/**
 * 表单验证测试
 */

import Taro, { Config, useState } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import toast from '~/utils/toast'
import _validator from '~/utils/validator'

import './FormValidate.scss'

const FormValidate = () => {
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')

	/**
	 * 表单验证
	 */
	const handleValidate = () => {
		const funcs = _validator.funcs
		const validResult = _validator.validate(
			{
				phone: [
					{
						errMsg: '请输入手机号',
						test: funcs._notEmpty,
					},
					{
						errMsg: '请输入正确长度的手机号',
						test: val => val.length === 11,
					},
				],
				address: [
					{
						errMsg: '请输入地址',
						test: funcs._notEmpty,
					},
				],
			},
			true,
			{
				phone,
				address,
			}
		)
		if (validResult.success) {
			toast.show('验证成功')
		} else {
			console.error('validResult', validResult)
		}
	}

	const handleInput = (type, e) => {
		switch (type) {
			case 'phone':
				setPhone(e.detail.value)
				break
			case 'address':
				setAddress(e.detail.value)
				break
			default:
				break
		}
	}

	return (
		<View className='FormValidate-page'>
			<View>表单验证测试</View>
			<Button onClick={handleValidate}>验证</Button>
			<Input
				type='number'
				placeholder='请输入手机号'
				onInput={e => handleInput('phone', e)}
			/>
			<Input
				type='text'
				placeholder='请输入地址'
				onInput={e => handleInput('address', e)}
			/>
		</View>
	)
}

FormValidate.config = {
	navigationBarTitleText: '表单验证测试',
} as Config

export default observer(FormValidate)
