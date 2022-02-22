import Taro, { Config, useState } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtNoticebar, AtTag } from 'taro-ui'
import {
	HdPaging,
	HdBackToTop,
	HdCard,
	HdCountdown,
	HdModal,
	HdNodata,
	HdTabs,
} from 'taro-ui-hd'

import Tabbar from '~/components/Tabbar/Tabbar'
import counter from '~/store/counter'
import QQMapWSService from '~/services/qqMap/ws.service'
import LianouService from '~/services/root/drug.service'
import './index.scss'

export const Index = () => {
	const [testState, setTestState] = useState<string>('')
	const [modalVisible, setModalVisible] = useState<boolean>(false)

	const increment = () => {
		setTestState(`${testState}expand`)
		counter.increment()
	}

	const decrement = () => {
		counter.decrement()
	}

	const incrementAsync = () => {
		counter.incrementAsync()
	}

	// 手机号输入
	const handleInput = (type, e) => {
		console.log('type', type, e)
	}

	const handleJSONPTest = async () => {
		const result = await QQMapWSService.geocoder({
			location: `28.2532,112.87887`,
			get_poi: 0,
		})
		console.log('result', result)
	}

	const handleProxyText = async () => {
		const result = await LianouService.queryDiseaseByDrugName({
			ComName: '阿莫西林胶囊',
		})
		console.log('result', result)
	}

	const handleBackToTop = () => {}

	/**
	 * 弹窗关闭
	 */
	const handleModalClose = () => {
		setModalVisible(false)
	}

	/**
	 * handleTabChange
	 */
	const handleTabChange = e => {
		console.log('handleTabChange', e)
	}

	const handleOk = () => {
		setModalVisible(false)
	}

	return (
		<View className='index'>
			<AtNoticebar>这是 NoticeBar 通告栏</AtNoticebar>
			<AtTag size='small'>标签</AtTag>
			<Input
				onInput={e => handleInput('mobile', e)}
				type='number'
				placeholder='请输入手机号'
			/>
			{/* <Button onClick={this.queryMobile.bind(this)}>查询手机号归属地</Button> */}
			{/* <View>归属地：{mobileText}</View> */}
			<Button onClick={() => handleJSONPTest()} className='button-jsonp'>
				jsonp 测试
			</Button>
			<Button onClick={() => handleProxyText()}>本地代理 测试</Button>
			<Button onClick={increment}>+</Button>
			<Button onClick={decrement}>-</Button>
			<Button onClick={incrementAsync}>Add Async</Button>
			<Button onClick={incrementAsync}>{testState}</Button>
			<Text>{counter.counter}</Text>
			<HdPaging hasMore />
			<HdBackToTop visible color='#ff4a4a' onClick={handleBackToTop} />
			<HdCard>这是卡片内容哦</HdCard>
			<HdCountdown leftTime={50000} />
			<HdModal
				positionType='center'
				title='弹窗标题'
				visible={modalVisible}
				onClose={handleModalClose}
				mask
				maskClosable
				showfooter
				onOk={handleOk}
			>
				这是弹窗内容
			</HdModal>
			<HdTabs
				currentTab={1}
				list={[
					{
						text: 'tab1',
						id: 1,
					},
					{
						text: 'tab2',
						id: 2,
					},
				]}
				onChange={handleTabChange}
			/>
			<HdNodata height={600} text='测试缺省文字' />
			<Tabbar />
		</View>
	)
}

Index.config = {
	navigationBarTitleText: '首页',
} as Config

export default observer(Index)
