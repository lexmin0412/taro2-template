/**
 * 底部Tabbar
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './Tabbar.scss'

/**
 * 组件内部属性
 */
interface IState {
	tabList: Array<{
		id: number
		router: string
		text: string
	}>
}

class Tabbar extends Component<{}, IState> {
	constructor(props) {
		super(props)
		this.state = {
			tabList: [
				{
					id: 1,
					router: '/pages/home/index',
					text: '首页',
				},
				{
					id: 2,
					router: '/pages/lab/index',
					text: '实验室',
				},
				{
					id: 2,
					router: '/pages/user/index',
					text: '个人中心',
				},
			],
		}
	}

	handleTabItemClick(item) {
		const { router } = item
		Taro.redirectTo({
			url: router,
		})
	}

	render() {
		const { tabList } = this.state
		return (
			<View className='tabbar-comp'>
				{tabList.map(tabItem => {
					return (
						<View
							className='tab-item'
							onClick={this.handleTabItemClick.bind(this, tabItem)}
						>
							{tabItem.text}
						</View>
					)
				})}
			</View>
		)
	}
}

export default Tabbar
